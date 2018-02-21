<?php namespace TitusPiJean\Flarum\Auth\LDAP;

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
    public function __construct(AuthenticationResponseFactory $authResponse, SettingsRepositoryInterface $settings)
    {
        $this->authResponse = $authResponse;
        $this->settings = $settings;
    }

    /**
     * @param Request $request
     * @return \Psr\Http\Message\ResponseInterface|RedirectResponse
     */
    public function handle(Request $request)
    {
        $actor = $request->getAttribute('actor');
        $body = $request->getParsedBody();
        $params = array_only($body, ['identification', 'password']);
        $uid = array_get($params, 'identification');
        $password = array_get($params, 'password');

        $config = [
            'domain_controllers'    => explode(',', $this->settings->get('flarum-auth-ldap.domain_controllers')),
            'base_dn'               => $this->settings->get('flarum-auth-ldap.base_dn'),
            'port'                  => intval($this->settings->get('flarum-auth-ldap.port')),
            'timeout'               => 5,
        ];

        // TEMPORARY TEST
        $uid = 'test';
        $password='12345678';

        $provider = new \Adldap\Connections\Provider($config);
        $uid_dn='uid='.$uid.','.$config['base_dn'];
        try {
            if ($provider->auth()->attempt($uid_dn, $password, $bindAsUser = true)) {
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
            return new Response("No username", 500);
        } catch (\Adldap\Exceptions\Auth\PasswordRequiredException $e) {
            return new Response("No password", 500);
        } catch (\Adldap\Exceptions\Auth\BindException $e) {
            return new Response("Could not bind", 500);
        }
        return new Response("Error", 500);
    }
}


// $ldap = $this->settings->get('flarum-ext-auth-ldap.address');
// if ($ldap == '') {
//     $this->settings->set('flarum-ext-auth-ldap.onlyUse', false);
//     return new TextResponse('LDAP domain is not set, Flarum login has been reactivated. Please configure LDAP extension. ', 500, []);
// }
// if (!isset($_SERVER['PHP_AUTH_USER']) && !isset($_SERVER['PHP_AUTH_PW'])) {
//     $r           = base64_encode("https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
//     $urlredirect = "https://" . $ldap . "/yunohost/sso/?r=" . $r;
//     $response    = new RedirectResponse($urlredirect);
//     $response    = $response->withHeader('Authorization', '');
//     return $response;
// } else {
//     $email = $request->getHeader('Email')[0];
//     $uid = $_SERVER['PHP_AUTH_USER'];
//
//     $identification = [
//         'username' => $uid,
//         'email' => $email
//     ];
//     $suggestions = [
//         'username' => $uid,
//         'email' => $email
//     ];
//     return $this->authResponse->make($request, $identification, $suggestions);
