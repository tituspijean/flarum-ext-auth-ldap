<?php namespace TitusPiJean\Flarum\Auth\LDAP;

use Flarum\Extend;
use Illuminate\Events\Dispatcher;
use Adldap;

return [
  (new Extend\Frontend('forum'))
    ->js(__DIR__.'/js/dist/forum.js')
    ->css(__DIR__.'/less/forum.less'),
  (new Extend\Frontend('admin'))
    ->js(__DIR__.'/js/dist/admin.js'),
  (new Extend\Locales(__DIR__ . '/locale')),
  (new Extend\Routes('forum'))
    ->post('/auth/ldap', 'auth.ldap', Controllers\LDAPAuthController::class),
];
