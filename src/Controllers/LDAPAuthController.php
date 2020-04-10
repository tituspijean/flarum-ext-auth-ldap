<?php namespace TitusPiJean\Flarum\Auth\LDAP\Controllers;

use Exception;
use Psr\Http\Server\RequestHandlerInterface;
use Flarum\Forum\Auth\ResponseFactory;
use Psr\Http\Message\ServerRequestInterface as Request;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Http\UrlGenerator;
use Psr\Http\Message\ResponseInterface;
use LdapRecord\Connection;
use LdapRecord\LdapRecordException;
use Flarum\Forum\Auth\Registration;
use Flarum\User\RegistrationToken;

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
		$params = array_only($body, ['identification', 'password']);
		$uid = array_get($params, 'identification');
		$password = array_get($params, 'password');
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
		$searchBaseDNs = $this->settings->get($settingsPrefix . 'base_dn');
		$filter = $this->settings->get($settingsPrefix . 'filter');
		$searchUserFields = $this->settings->get($settingsPrefix . 'search_user_fields');
		$allowedUser = false;
		$userLdapMail = $this->settings->get($settingsPrefix . 'user_mail');
		$userLdapUsername = $this->settings->get($settingsPrefix . 'user_username');

		foreach (explode(';', $searchBaseDNs) as $searchBaseDN) {
			foreach (explode(',', $searchUserFields) as $searchUserField) {
				$current_dn = $searchUserField . "=" . $uid . "," . $searchBaseDN;

				if (!$this->settings->get($settingsPrefix . 'use_admin')) {
					$config['username'] = $current_dn;
					$config['password'] = $password;
				}

				$connection = new Connection($config);
				try {
					if (!isset($filter) || $filter != '') {
						$user = $connection->query()
							->setDn($searchBaseDN)
							->where($searchUserField, '=', $uid)
							->rawFilter($filter)
							->firstOrFail();
					} else {
						$user = $connection->query()
							->setDn($searchBaseDN)
							->where($searchUserField, '=', $uid)
							->firstOrFail();
					}

					if ($connection->auth()->attempt($current_dn, $password, $bindAsUser = true)) {
						$payload = (array)$user;
						return $this->response->make(
							'ldap',
							$uid,
							function (Registration $registration) use ($user, $payload, $userLdapUsername, $userLdapMail) {
								$registration
									->provide('username', $user[$userLdapUsername][0])
									->provideTrustedEmail($user[$userLdapMail][0])
									//->provideAvatar($user->getJpegPhoto())
									->setPayload($payload);
							}
						);
					}

					break;
				} catch (Exception $e) {
					// Empty: need to test all fields
				}
			}
		}
		if (!$allowedUser) {
			throw new LdapRecordException("This user is not allowed to log in.");
		}
	}
}
