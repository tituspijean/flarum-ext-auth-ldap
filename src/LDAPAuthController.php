<?php
/*
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Flarum\Auth\LDAP;

use Flarum\Forum\AuthenticationResponseFactory;
use Flarum\Http\Controller\ControllerInterface;
use Flarum\Settings\SettingsRepositoryInterface;
use Psr\Http\Message\ServerRequestInterface as Request;
use Zend\Diactoros\Response\RedirectResponse;

class LDAPAuthController implements ControllerInterface
{
	/**
	 * @var AuthenticationResponseFactory
	 */
	protected $authResponse;

	/**
	 * @var SettingsRepositoryInterface
	 */
	protected $settings;

	/**
	 * @param AuthenticationResponseFactory $authResponse
	 * @param SettingsRepositoryInterface $settings
	 */
	public function __construct( AuthenticationResponseFactory $authResponse, SettingsRepositoryInterface $settings )
	{
		$this->authResponse = $authResponse;
		$this->settings = $settings;
	}

	/**
	 * @param Request $request
	 * @return \Psr\Http\Message\ResponseInterface|RedirectResponse
	 */
	public function handle( Request $request )
	{
		$actor = $request->getAttribute('actor');
		$body = $request->getParsedBody();
		$params = array_only($body, ['identification', 'password']);
		$uid = array_get($params, 'identification');
		$password = array_get($params, 'password');
		$uid = 'test';
		$username='uid='.$uid.',ou=users,dc=yunohost,dc=org';
		$password='12345678';

		// TO DO : USE EXTENSION VARIABLE STORAGE
		// Create the configuration array.
		$config = [
		    // Mandatory Configuration Options
		    'domain_controllers'    => ['localhost'],
		    'base_dn'               => 'ou=users,dc=yunohost,dc=org',
		    //'admin_username'        => $username,
		    //'admin_password'        => $password,

		    // Optional Configuration Options
		    'account_prefix'        => '',
		    'account_suffix'        => '',
		    //'admin_account_suffix'  => '@acme.org',
		    'port'                  => 389,
		    'follow_referrals'      => true,
		    //'use_ssl'               => false,
		    //'use_tls'               => false,php
		    'timeout'               => 5,

		    // Custom LDAP Options
		    //'custom_options'        => [
			// See: http://php.net/ldap_set_option
			//LDAP_OPT_X_TLS_REQUIRE_CERT => LDAP_OPT_X_TLS_HARD
		    //]
		];

		// Create a new Adldap Provider instance.
		$provider = new \Adldap\Connections\Provider($config);
		// Try to bind.
try {
    $provider->auth()->bind($username, $password);

     // Successfully bound to server.
} catch (\Adldap\Exceptions\Auth\BindException $e) {
    // There was an issue binding to the LDAP server.
}
		try {
		    if ($provider->auth()->attempt($username, $password, $bindAsUser = true)) {
			// Credentials were correct.
			$user = $provider->search()->findBy('uid', $uid);
			$identification = [
				'username' => $uid
			];
			$suggestions = [
				'username' => $user->getDisplayName(),
				'email' => $user->mail[0]
				//'avatar' => $user->getJpegPhoto();
			];
			return $this->authResponse->make($request, $identification, $suggestions);
			}

		} catch (\Adldap\Exceptions\Auth\UsernameRequiredException $e) {
		    	// The user didn't supply a username.
			return new Response("No username", 500);

		} catch (\Adldap\Exceptions\Auth\PasswordRequiredException $e) {
			// The user didn't supply a password.
			return new Response("No password", 500);
		} catch (\Adldap\Exceptions\Auth\BindException $e) {
    			// There was an issue binding / connecting to the server.
			return new Response("Could not bind", 500);
		}


        return new Response("Error", 500);

	}
}

