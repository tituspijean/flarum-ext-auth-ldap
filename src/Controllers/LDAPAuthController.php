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
		$config = [
			'hosts' => explode(',', $this->settings->get($settingsPrefix . 'hosts')),
			'username' => $this->settings->get($settingsPrefix . 'admin_dn'),
			'password' => $this->settings->get($settingsPrefix . 'admin_password'),
			'port' => intval($this->settings->get($settingsPrefix . 'port')),
			'follow_referrals' => boolval($this->settings->get($settingsPrefix . 'follow_referrals')),
			'use_ssl' => boolval($this->settings->get($settingsPrefix . 'use_ssl')),
			'use_tls' => boolval($this->settings->get($settingsPrefix . 'use_tls')),
			'timeout' => 5
		];
		$ldapErrors = [];
		if (empty($id) || empty($password)) {
			$contents = [
				"errors" => array(["status" => 401, "code" => "account.invalid_inputs"]),
			];
			return new JsonResponse($contents, 401);
		} else {
			// For use with Nicknames extension enabled
			$searchNicknameFields = $this->settings->get($settingsPrefix . 'search_nickname_fields');

			$searchBaseDNs = $this->settings->get($settingsPrefix . 'base_dn');
			$filter = $this->settings->get($settingsPrefix . 'filter');
			$searchUserFields = $this->settings->get($settingsPrefix . 'search_user_fields');
			$userLdapMail = $this->settings->get($settingsPrefix . 'user_mail');
			$userLdapUsername = $this->settings->get($settingsPrefix . 'user_username');

			$connection = new Connection($config);

			foreach (explode(';', $searchBaseDNs) as $searchBaseDN) {
				foreach (explode(',', $searchUserFields) as $searchUserField) {

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
							return $this->response->make(
								'ldap',
								$user[strtolower($userLdapUsername)][0],
								function (Registration $registration) use ($user, $userLdapUsername, $userLdapMail, $searchNicknameFields) {
									$foundNickname = [];
									foreach (explode(',', $searchNicknameFields) as $searchNicknameField) {
										if (array_key_exists(strtolower($searchNicknameField), $user)) {
											array_push($foundNickname, $user[strtolower($searchNicknameField)][0]);
										}
									}
									if (count($foundNickname) == 0) {
										$registration
											->suggest('isLDAP', true)
											->provide('username', $user[strtolower($userLdapUsername)][0])
											->provideTrustedEmail($user[strtolower($userLdapMail)][0])
											//->provideAvatar($user->getJpegPhoto())
											->setPayload((array)$user['dn']);
										
									} else {
										$registration
											->suggest('isLDAP', true)
											->provide('username', $user[strtolower($userLdapUsername)][0])
											->provide('nickname', implode(" ", $foundNickname))
											->provideTrustedEmail($user[strtolower($userLdapMail)][0])
											//->provideAvatar($user->getJpegPhoto())
											->setPayload((array)$user['dn']);
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

		if ($this->settings->get($settingsPrefix . 'display_detailed_error')) {
			$isFound = false;
			foreach ($ldapErrors as $ldapError) {
				if (strpos($ldapError, 'No LDAP query results') !== false) {
					// Ignore so that all LDAP user search fields is checked
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
