<?php namespace TitusPiJean\Flarum\Auth\LDAP\Controllers;

use Exception;
use Psr\Http\Server\RequestHandlerInterface;
use Flarum\Forum\Auth\ResponseFactory;
use Psr\Http\Message\ServerRequestInterface as Request;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Http\UrlGenerator;
use Psr\Http\Message\ResponseInterface;
use Adldap;
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
    $redirectUri = $this->url->to('forum')->route('auth.ldap');

    $body = $request->getParsedBody();
    $params = array_only($body, ['identification', 'password']);
    $uid = array_get($params, 'identification');
    $password = array_get($params, 'password');

    $config = [
        'hosts'             => explode(',', $this->settings->get($settingsPrefix.'hosts')),
        'base_dn'           => $this->settings->get($settingsPrefix.'base_dn'),
        'account_prefix'    => $this->settings->get($settingsPrefix.'account_prefix'),
        'account_suffix'    => $this->settings->get($settingsPrefix.'account_suffix'),
        'username'          => $this->settings->get($settingsPrefix.'admin_dn'),
        'password'          => $this->settings->get($settingsPrefix.'admin_password'),
        'port'              => intval($this->settings->get($settingsPrefix.'port')),
        'follow_referrals'  => boolval($this->settings->get($settingsPrefix.'follow_referrals')),
        'use_ssl'           => boolval($this->settings->get($settingsPrefix.'use_ssl')),
        'use_tls'           => boolval($this->settings->get($settingsPrefix.'use_tls')),
        'timeout'           => 5
    ];
    $uid_dn = "uid=".$uid.",".$config['base_dn'];
    try {
      $provider = new \Adldap\Connections\Provider($config);
      $provider->auth()->attempt($uid_dn, $password, $bindAsUser = true);
      $user = $provider->search()->findByDnOrFail($uid_dn);
      $suggestions = [
        'username' => $uid,
        'email' => $user->mail[0]
        //'avatar' => $user->getJpegPhoto();
      ];
      $payload = get_object_vars($user);
      return $this->response->make(
        'ldap', $uid,
        function (Registration $registration) use ($user, $payload) {
          $registration
            ->provide('username', $user['uid'][0])
            ->provideTrustedEmail($user['mail'][0])
            //->provideAvatar($user->getJpegPhoto())
            ->setPayload($payload);
        }
      );
    } catch (\Adldap\Auth\UsernameRequiredException $e) {
        throw new Exception("No username for LDAP authentication");
    } catch (\Adldap\Auth\PasswordRequiredException $e) {
        throw new Exception("No password for LDAP authentication");
    } catch (\Adldap\Auth\BindException $e) {
        throw new Exception("Could not bind to LDAP server");
    } catch (Exception $e) {
        throw new Exception("Unspecified error during LDAP authentication");
    }
  }
}
