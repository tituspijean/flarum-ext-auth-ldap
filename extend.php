<?php namespace TitusPiJean\Flarum\Auth\LDAP;

use Flarum\Extend;
use Flarum\Foundation\Application;
use Illuminate\Events\Dispatcher;

return [
  (new Extend\Frontend('forum'))
    ->js(__DIR__.'/js/dist/forum.js')
    ->css(__DIR__.'/less/forum.less'),
  (new Extend\Frontend('admin'))
    ->js(__DIR__.'/js/dist/admin.js'),
  (new Extend\Locales(__DIR__ . '/locale')),
  (new Extend\Routes('forum'))
    ->post('/auth/ldap', 'auth.ldap', Controllers\LDAPAuthController::class)
    ->get('/auth/ldap', 'auth.ldap', Controllers\LDAPAuthController::class),
  function (Dispatcher $events, Application $app) {
      $events->subscribe(Listeners\AddApiAttributes::class);
  },
];
