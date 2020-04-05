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
    $redirectUri = $this->url->to('forum')->route('auth.ldap');

    $body = $request->getParsedBody();
    $params = array_only($body, ['identification', 'password']);
    $uid = array_get($params, 'identification');
    $password = array_get($params, 'password');
    $config = [
      'hosts'             => explode(',', $this->settings->get($settingsPrefix.'hosts')),
      'base_dn'           => $this->settings->get($settingsPrefix.'base_dn'),
      'username'          => $this->settings->get($settingsPrefix.'admin_dn'),
      'password'          => $this->settings->get($settingsPrefix.'admin_password'),
      'port'              => intval($this->settings->get($settingsPrefix.'port')),
      'follow_referrals'  => boolval($this->settings->get($settingsPrefix.'follow_referrals')),
      'use_ssl'           => boolval($this->settings->get($settingsPrefix.'use_ssl')),
      'use_tls'           => boolval($this->settings->get($settingsPrefix.'use_tls')),
      'timeout'           => 5
    ];
    $filter = $this->settings->get($settingsPrefix.'filter');
    $uid_dn = "uid=".$uid.",".$config['base_dn'];

    if (! $this->settings->get($settingsPrefix.'use_admin')) {
      $config['username'] = $uid_dn;
      $config['password'] = $password;
    }

    $connection = new Connection($config);

    if (!isset($filter) || $filter != '') {
      try {
        $user = $connection->query()
          ->setDn($config['base_dn'])
          ->where('uid', '=', $uid)
          ->rawFilter($filter)
          ->firstOrFail();
      } catch (Exception $e) {
        throw new LdapRecordException("This user is not allowed to log in.");
      }
    } else {
      $user = $connection->query()
        ->setDn($config['base_dn'])
        ->where('uid', '=', $uid)
        ->firstOrFail();
    }

    try {
      if ($connection->auth()->attempt($uid_dn, $password, $bindAsUser = true)) {
        $suggestions = [
          'username' => $uid,
          'email' => $user->mail[0]
          //'avatar' => $user->getJpegPhoto();
        ];
        $payload = (array) $user;
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
      } else {
        throw new LdapRecordException("Incorrect credentials.");
      }
    } catch (Exception $e) {
      throw $e;
    }
  }
}
