<?php namespace TitusPiJean\Flarum\Auth\LDAP;

use TitusPiJean\Flarum\Auth\LDAP\Listeners;
use Illuminate\Contracts\Events\Dispatcher;
use Adldap;

return function (Dispatcher $events) {
    $events->subscribe(Listeners\AddClientAssets::class);
    $events->subscribe(Listeners\AddLDAPAuthRoute::class);
    $events->subscribe(Listeners\AddApiAttributes::class);
};
