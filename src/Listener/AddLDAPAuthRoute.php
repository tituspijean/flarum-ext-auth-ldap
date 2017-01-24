<?php
/*
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Flarum\Auth\LDAP\Listener;

use Flarum\Event\ConfigureForumRoutes;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Event\PrepareApiAttributes;
use Flarum\Api\Serializer\ForumSerializer;

use Flarum\Foundation\Application;
use Flarum\Settings\SettingsRepositoryInterface;
use Symfony\Component\HttpFoundation\Session\Session;

class AddLDAPAuthRoute
{
	/**
	 * @var SettingsRepositoryInterface
	 */
	protected $settings;

	/**
	 * @var Application
	 */
	protected $app;

	/**
	 * @var Session
	 */
	protected $session;

	/**
	 * @param SettingsRepositoryInterface $settings
	 */
	public function __construct(SettingsRepositoryInterface $settings, Session $session, Application $app)
	{
		$this->settings = $settings;
		$this->app = $app;
		$this->session = $session;
	}

	/**
	 * @param Dispatcher $events
	 */
	public function subscribe(Dispatcher $events)
	{
		$events->listen(PrepareApiAttributes::class, [$this, 'addAttributes']);
		$events->listen(ConfigureForumRoutes::class, [$this, 'configureForumRoutes']);
	}

	/**
	 * @param PrepareApiAttributes $event
	 */
	public function addAttributes(PrepareApiAttributes $event)
	{
		if ($event->isSerializer(ForumSerializer::class)) {
			$event->attributes['LDAPSPName'] = $this->settings->get('flarum-ext-auth-ldap.sp_name');
			$event->attributes['LDAPOnlyUse'] = $this->settings->get('flarum-ext-auth-ldap.only_use_ldap');
			$event->attributes['LDAPRegistrationUrl'] = $this->settings->get('flarum-ext-auth-ldap.registration_url');
		}
	}

	/**
	 * @param ConfigureForumRoutes $event
	 */
	public function configureForumRoutes(ConfigureForumRoutes $event)
	{
		$event->get('/auth/ldap', 'auth.ldap', 'Flarum\Auth\LDAP\LDAPAuthController');
		$event->post('/auth/ldap', 'auth.ldap', 'Flarum\Auth\LDAP\LDAPAuthController');
	}
}
