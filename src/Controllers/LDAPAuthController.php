<?php namespace TitusPiJean\Flarum\Auth\LDAP\Controllers;

use Exception;
use Illuminate\Support\Arr;
use Psr\Http\Server\RequestHandlerInterface;
use Flarum\Forum\Auth\ResponseFactory;
use Psr\Http\Message\ServerRequestInterface as Request;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Http\UrlGenerator;
use Psr\Http\Message\ResponseInterface;
use LdapRecord\Connection;
use Flarum\Forum\Auth\Registration;
use Laminas\Diactoros\Response\JsonResponse;
use Flarum\Core\Exception\ValidationException;

class LDAPAuthController implements RequestHandlerInterface
{
	protected $response;
	protected $settings;
	protected $url;

	public function __construct(ResponseFactory $response, SettingsRepositoryInterface $settings, UrlGenerator $url)
	{
		$this->response = $response;
		$this->settings = $settings;
		$this->url = $url;
	}

	public function handle(Request $request): ResponseInterface
	{
		$settingsPrefix = 'tituspijean-auth-ldap.';

		$body = $request->getParsedBody();
		$params = Arr::only($body, ['identification', 'password']);
		$id = Arr::get($params, 'identification');
		$password = Arr::get($params, 'password');

		return $this->processDomains($id, $password);
	}

	public function processDomains(string $id, string $password): ResponseInterface
	{
		if (empty($id) || empty($password)) {
			$contents = [
				"errors" => array(["status" => 401, "code" => "account.invalid_inputs"]),
			];
			return new JsonResponse($contents, 401);
		}
		$domains = json_decode($this->settings->get('tituspijean-auth-ldap.domains'), true);

		$domainsCount = $domains? count($domains): 0;
		if ($domainsCount == 0) {
			$contents = [
				"errors" => array(["status" => 401, "code" => "domains.no_domains"]),
			];
			return new JsonResponse($contents, 401);
		} 
		$ldapErrors = [];
		for ($index = 0; $index < $domainsCount; $index++) {
			$domain = $domains[$index];
			if (empty($domain['host'])) {
				$contents = [
					"errors" => array(["status" => 401, "code" => "domains.empty_host", "domain_index" => $index+1])
				];
				return new JsonResponse($contents, 401);
			}
			$config = [
				'hosts' => explode(',', $domain['host']),
				'username' => $domain['admin']['dn'],
				'password' => $domain['admin']['password'],
				'port' => intval($domain['port']),
				'follow_referrals' => boolval($domain['followReferrals']),
				'use_ssl' => boolval($domain['useSSL']),
				'use_tls' => boolval($domain['useTLS']),
				'timeout' => 5
			];
			$userLdapUsername = $domain['user']['username'];
			if (empty($userLdapUsername)) {
				$contents = [
					"errors" => array(["status" => 401, "code" => "domains.empty_user_username", "domain_index" => $index+1]),
				];
				return new JsonResponse($contents, 401);
			} else {
				// For use with Nicknames extension enabled
				$searchNicknameFields = $domain['user']['nicknames'];
	
				$searchBaseDNs = $domain['baseDN'];
				if (empty($searchBaseDNs)) {
					$contents = [
						"errors" => array(["status" => 401, "code" => "domains.empty_base_dn", "domain_index" => $index+1]),
					];
					return new JsonResponse($contents, 401);
				} 
				$filter = $domain['filter'];
				$searchUserFields = $domain['searchFields'];
				if (empty($searchUserFields)) {
					$contents = [
						"errors" => array(["status" => 401, "code" => "domains.empty_search_field", "domain_index" => $index+1]),
					];
					return new JsonResponse($contents, 401);
				} 
				$userLdapMail = $domain['user']['mail'];

				$connection = new Connection($config);

				foreach (explode(';', $searchBaseDNs) as $searchBaseDN) {
					foreach ($searchUserFields as $searchUserField) {
						try {

							if (!isset($filter) || $filter != '') {
								$user = $connection->query()
									->setDn($searchBaseDN)
									->where($searchUserField, '=', $id)
									->rawFilter($filter)
									->firstOrFail();
							} else {
								$user = $connection->query()
									->setDn($searchBaseDN)
									->where($searchUserField, '=', $id)
									->firstOrFail();
							}
							if ($connection->auth()->attempt($user['dn'], $password, $bindAsUser = true)) {
								if (!array_key_exists(strtolower($userLdapUsername), $user)) {
									// Prevent response showing exception for null username field
									$contents = [
										"errors" => array(["status" => 401, "code" => "domains.username_field_does_not_exist", "data" => $userLdapUsername], "domain_index" => $index+1),
									];
									return new JsonResponse($contents, 401);
								}
								if (!empty($userLdapMail) && !array_key_exists(strtolower($userLdapMail), $user)) {
									$contents = [
										"errors" => array(["status" => 401, "code" => "domains.mail_field_does_not_exist", "data" => $userLdapMail, "domain_index" => $index+1]),
									];
									return new JsonResponse($contents, 401);
								}
								return $this->response->make(
									'ldap',
									$user[strtolower($userLdapUsername)][0],
									function (Registration $registration) use ($user, $userLdapUsername, $userLdapMail, $searchNicknameFields) {
										$foundNickname = [];
										foreach ($searchNicknameFields as $searchNicknameField) {
											if (array_key_exists(strtolower($searchNicknameField), $user)) {
												array_push($foundNickname, $user[strtolower($searchNicknameField)][0]);
											}
										}
										$registration
											->suggest('isLDAP', true)
											->provide('username', $user[strtolower($userLdapUsername)][0])
											//->provideAvatar($user->getJpegPhoto())
											->setPayload((array)$user['dn']);
										if (count($foundNickname) > 0) {
											$registration
												->provide('nickname', implode(" ", $foundNickname));
										}
										if (!empty($userLdapMail)) {
											$registration
												->provideTrustedEmail($user[strtolower($userLdapMail)][0]);
										}
									}
								);
							} else {
								$error = $connection->getLdapConnection()->getDiagnosticMessage();
	
								if (strpos($error, '532') !== false) {
									throw new Exception("account.password_expired");
								} elseif (strpos($error, '533') !== false) {
									throw new Exception("account.disabled");
								} elseif (strpos($error, '701') !== false) {
									throw new Exception("account.expired");
								} elseif (strpos($error, '775') !== false) {
									throw new Exception("account.locked");
								}
	
								throw new Exception("account.incorrect_details");
							}
						} catch (Exception $e) {
							$ldapErrors[] = $e->getMessage();
						}
					}
				}
			}
		}

		if ($this->settings->get($settingsPrefix . 'display_detailed_error')) {
			$isFound = false;
			foreach ($ldapErrors as $ldapError) {
				if (strpos($ldapError, 'No LDAP query results') !== false) {
					// Ignore so that all LDAP user search fields is checked
				} else if (strpos($ldapError, 'ldap_search():') !== false) {
					//  LDAP search filter is invalid
					$isFound = true;
					$contents = [
						"errors" => array(["status" => 401, "code" => 'search_filter_is_invalid']),
					];
					break;
				} else if (strpos($ldapError, 'ldap_bind():') !== false) {
					// Cannot communicate to LDAP server correctly check settings
					$isFound = true;
					$contents = [
						"errors" => array(["status" => 401, "code" => 'not_authenticated']),
					];
					break;
				} else {
					$isFound = true;
					$contents = [
						"errors" => array(["status" => 401, "code" => $ldapError]),
					];
					break;
				}
			}
			if (!$isFound) {
				$contents = [
					"errors" => array(["status" => 401, "code" => 'account.not_found']),
				];
			}
		} else {
			// Override errors with vague response
			$contents = [
				"errors" => array(["status" => 401, "code" => 'account.incorrect_details']),
			];
		}
		return new JsonResponse($contents, 401);
	}
}
