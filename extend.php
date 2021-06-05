<?php namespace TitusPiJean\Flarum\Auth\LDAP;

use Flarum\Extend;
use Flarum\Foundation\Application;
use Illuminate\Events\Dispatcher;

return [
  (new Extend\Locales(__DIR__ . '/locale')),
  (new Extend\Frontend('admin'))
    ->js(__DIR__.'/js/dist/admin.js'),
  (new Extend\Frontend('forum'))
    ->js(__DIR__.'/js/dist/forum.js')
    ->css(__DIR__.'/less/forum.less'),
  (new Extend\Routes('forum'))
    ->post('/auth/ldap', 'auth.ldap.post', Controllers\LDAPAuthController::class)
    ->get('/auth/ldap', 'auth.ldap.get', Controllers\LDAPAuthController::class),
  (new Extend\Settings)
    ->serializeToForum('tituspijean-auth-ldap.onlyUse', 'tituspijean-auth-ldap.onlyUse', 'boolVal', false)
    ->serializeToForum('tituspijean-auth-ldap.method_name', 'tituspijean-auth-ldap.method_name', 'strVal', 'LDAP'),
];
