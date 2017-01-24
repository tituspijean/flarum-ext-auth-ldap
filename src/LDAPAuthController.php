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
use Adldap\Adldap;

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
		$redirectUri = (string) $request->getAttribute( 'originalUri', $request->getUri() )->withQuery( '' );

		$session = $request->getAttribute( 'session' );

		$queryParams = $request->getQueryParams();
		$out = array_key_exists( 'out', $queryParams );

		// TO DO : USE EXTENSION VARIABLE STORAGE
		$configuration = array(
			//'user_id_key' => '',
			//'account_suffix' => '',
			//'person_filter' => array('category' => 'objectCategory', 'person' => 'person'),
			'base_dn' => 'ou=users,dc=yunohost,dc=org',
			'domain_controllers' => array('localhost'),
    			//'admin_username' => 'administrator',
    			//'admin_password' => 'password',
    			//'real_primarygroup' => true,
    			//'use_ssl' => false,
    			//'use_tls' => false,
    			//'recursive_groups' => true,
    			'ad_port' => '389',
    			'sso' => false,
		);

		// Try to bind.
		$adldap = false;
		$exception = false;
		if (is_array($options['domain_controllers']) && !empty($options['domain_controllers'][0])) {
    			try {
				$adldap = new adLDAP($options);
			} catch (adLDAPException $e) {
				$exception = $e;
			}
		}

		// Handle log in.
		// TO DO : ACTUALLY GET LOGIN AND PASSWORD FROM FLARUM'S FORM
		$username = (!empty($_POST['username'])) ? $_POST['username'] : '';
		$info = false;
		if ($adldap && !empty($username)) {
			$password = $_POST['password']
			try {
				$adldap->authenticate($username, $password);
				$info = $adldap->user()->info($username, ['*']);
				if (isset($info[0])) {
					$info = $info[0];
				}
			} catch (\adLDAP\Exceptions\adLDAPException $e) {
				$exception = $e;
			}
		}

		// TO DO : JUMP DIRECTLY TO LOG OUT IF REQUESTED
		if( $out ) {
			$returnTo = $redirectUri;
			$paramters = array();
			$nameId = unserialize( $session->get( 'LDAPNameId' ) );
			$sessionIndex = unserialize( $session->get( 'LDAPSessionIndex' ) );

			$auth->logout( $returnTo, $paramters, $nameId, $sessionIndex );

		}

		// HERE CODE FOR LOGIN AND SET $LDAPUserdata IF SUCCESSFULL
		// SERIALIZATION IS FROM THE SAML2 EXT. IS IT NEEDED HERE ?

		$LDAPUserdata = unserialize( $session->get( 'LDAPUserdata' ) );

		if( $LDAPUserdata == null ) {
			$auth->login( $redirectUri );
			exit();
		}

		$identification = [
			'ldap_uid' => $LDAPUserdata[ 'uid' ][ 0 ]
		];
		$suggestions = [
			'username' => $LDAPUserdata[ 'username' ][ 0 ],
			'email' => $LDAPUserdata[ 'mail' ][ 0 ]
		];

		return $this->authResponse->make( $request, $identification, $suggestions );
	}
}
