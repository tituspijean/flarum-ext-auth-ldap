<?php namespace TitusPiJean\Flarum\Auth\LDAP\Controllers;

use Exception;
use Flarum\Forum\Auth\Registration;
use Flarum\Forum\Auth\ResponseFactory;
use Flarum\User\RegistrationToken;
use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response\RedirectResponse;
use Zend\Diactoros\Response\TextResponse;
use Adldap;

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
        $redirectUri = $this->url->to('forum')->route('auth.ldap');

        $actor = $request->getAttribute('actor');
        $body = $request->getParsedBody();

        $params = array_only($body, ['identification', 'password']);
        $uid = array_get($params, 'identification');
        $password = array_get($params, 'password');

        $settingsPrefix = 'tituspijean-auth-ldap.';
        $config = [
            'domain_controllers'    => explode(',', $this->settings->get($settingsPrefix.'domain_controllers')),
            'base_dn'               => $this->settings->get($settingsPrefix.'base_dn'),
            'account_prefix'        => $this->settings->get($settingsPrefix.'account_prefix'),
            'account_suffix'        => $this->settings->get($settingsPrefix.'account_suffix'),
            'admin_username'        => $this->settings->get($settingsPrefix.'admin_dn'),
            'admin_password'        => $this->settings->get($settingsPrefix.'admin_password'),
            'port'                  => intval($this->settings->get($settingsPrefix.'port')),
            'follow_referrals'      => boolval($this->settings->get($settingsPrefix.'follow_referrals')),
            'use_ssl'               => boolval($this->settings->get($settingsPrefix.'use_ssl')),
            'use_tls'               => boolval($this->settings->get($settingsPrefix.'use_tls')),
            'timeout'               => 5
        ];
        $uid_dn = "uid=".$uid.",".$config['base_dn'];
        try {
            $provider = new \Adldap\Connections\Provider($config);
            $provider->auth()->attempt($uid_dn, $password, $bindAsUser = true);
            $user = $provider->search()->findByDn($uid_dn);
            $identification = [
              'username' => $uid
            ];
            $suggestions = [
              'username' => $uid,
              'email' => $user->mail[0]
              //'avatar' => $user->getJpegPhoto();
            ];
            $payload = get_object_vars($user);
            $token = RegistrationToken::generate('ldap', $uid, $suggestions, $payload);
            return $this->response->make(
              'ldap', $uid,
              function (Registration $registration) use ($user, $token) {
                $registration
                  ->provide('username', $user['username'])
                  ->provideTrustedEmail($user['mail'][0])
                  ->setPayload($payload);
              }
            );
        } catch (\Adldap\Auth\UsernameRequiredException $e) {
            return new TextResponse("No username for LDAP authentication", 401);
        } catch (\Adldap\Auth\PasswordRequiredException $e) {
            return new TextResponse("No password for LDAP authentication", 401);
        } catch (\Adldap\Auth\BindException $e) {
            return new TextResponse("Could not bind to LDAP server", 401);
        } catch (Exception $e) {
            return new TextResponse("Unspecified error during LDAP authentication", 500);
        }
    }
}
