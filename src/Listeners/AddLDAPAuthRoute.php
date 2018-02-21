<?php

namespace TitusPiJean\Flarum\Auth\LDAP\Listeners;

use Flarum\Event\ConfigureForumRoutes;
use Illuminate\Contracts\Events\Dispatcher;

class AddLDAPAuthRoute
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureForumRoutes::class, [$this, 'configureForumRoutes']);
    }

    /**
     * @param ConfigureForumRoutes $event
     */
    public function configureForumRoutes(ConfigureForumRoutes $event)
    {
        $event->get('/auth/ldap', 'auth.ldap', 'TitusPiJean\Flarum\Auth\LDAP\Controllers\LDAPAuthController');
    }
}
