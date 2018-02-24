<?php namespace TitusPiJean\Flarum\Auth\LDAP\Controllers;

use Flarum\Forum\AuthenticationResponseFactory;
use Flarum\Http\Controller\ControllerInterface;
use Flarum\Settings\SettingsRepositoryInterface;
use Psr\Http\Message\ServerRequestInterface as Request;
use Zend\Diactoros\Response\RedirectResponse;
use Zend\Diactoros\Response\TextResponse;
use Adldap;

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

        $settingsPrefix = 'tituspijean-flarum-ext-auth-ldap.';
        $config = [
            'domain_controllers'    => explode(',', $this->settings->get($settingsPrefix.'domain_controllers')),
            'base_dn'               => $this->settings->get($settingsPrefix.'base_dn'),
            'account_prefix'        => $this->settings->get($settingsPrefix.'account_prefix'),
            'account_suffix'        => $this->settings->get($settingsPrefix.'account_suffix'),
            'port'                  => intval($this->settings->get($settingsPrefix.'port')),
            'follow_referrals'      => boolval($this->settings->get($settingsPrefix.'follow_referrals')),
            'use_ssl'               => boolval($this->settings->get($settingsPrefix.'use_ssl')),
            'use_tls'               => boolval($this->settings->get($settingsPrefix.'use_tls')),
            'timeout'               => 5
        ];
        $uid_dn = "uid=".$uid.",".$config['base_dn'];
        try {
            $provider = new \Adldap\Connections\Provider($config);
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
            return new TextResponse("No username for LDAP authentication", 500);
        } catch (\Adldap\Exceptions\Auth\PasswordRequiredException $e) {
            return new TextResponse("No password for LDAP authentication", 500);
        } catch (\Adldap\Exceptions\Auth\BindException $e) {
            return new TextResponse("Could not bind to LDAP server", 500);
        }
        return new TextResponse("Unspecified error during LDAP authentication", 500);
    }
}
