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
use LdapRecord\LdapRecordException;
use Flarum\Forum\Auth\Registration;

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
		$searchBaseDNs = $this->settings->get($settingsPrefix . 'base_dn');
		$filter = $this->settings->get($settingsPrefix . 'filter');
		$searchUserFields = $this->settings->get($settingsPrefix . 'search_user_fields');
		$ldapErrors = [];
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
							function (Registration $registration) use ($user, $userLdapUsername, $userLdapMail) {
								$registration->provide('username', $user[strtolower($userLdapUsername)][0]);
								if ($user[strtolower($userLdapMail)]) {
									$registration->provideTrustedEmail($user[strtolower($userLdapMail)][0]);
								}
								$registration->provideAvatar($user->getJpegPhoto());
								$registration->setPayload((array)$user['dn']);
							}
						);
					} else {
						throw new Exception("Authentication failed with these login and password.");
					}

				} catch (Exception $e) {
							$ldapErrors[] = $e->getMessage();
				}

			}
		}
		throw new LdapRecordException('LDAP error: (' . implode(', ', $ldapErrors) . ')');
	}
}
