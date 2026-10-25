<?php namespace tituspijean\Flarum\Auth\LDAP;

use Flarum\Extend;
use Flarum\Frontend\Document;
use Flarum\User\Event\RegisteringFromProvider;
use Flarum\User\RegistrationToken;
use Flarum\User\User;

return [
  (new Extend\Frontend('admin'))
    ->content(function (Document $document) {
      $document->head[] = '
        <script src="/assets/extensions/tituspijean-auth-ldap/jquery.min.js"></script>
        <script src="/assets/extensions/tituspijean-auth-ldap/select2.min.js"></script>
        <link href="/assets/extensions/tituspijean-auth-ldap/select2.min.css" rel="stylesheet">
      ';
    }),
  (new Extend\Frontend('forum'))
    ->content(function (Document $document) {
      $document->head[] = '
        <script src="/assets/extensions/tituspijean-auth-ldap/jquery.min.js"></script>
        <script src="/assets/extensions/tituspijean-auth-ldap/select2.min.js"></script>
        <link href="/assets/extensions/tituspijean-auth-ldap/select2.min.css" rel="stylesheet">
      ';
    }),
  (new Extend\Locales(__DIR__ . '/locale')),
  (new Extend\Frontend('admin'))
    ->js(__DIR__.'/js/dist/admin.js'),
  (new Extend\Frontend('forum'))
    ->js(__DIR__.'/js/dist/forum.js')
    ->css(__DIR__.'/less/forum.less'),
  (new Extend\Routes('forum'))
    ->post('/auth/ldap', 'auth.ldap.post', Controllers\LDAPAuthController::class)
    ->get('/auth/ldap', 'auth.ldap.get', Controllers\LDAPAuthController::class)
    ->post('/register/ldap', 'register.ldap.post', Controllers\LDAPRegisterController::class),
  (new Extend\Settings)
    ->serializeToForum('tituspijean-auth-ldap.onlyUse', 'tituspijean-auth-ldap.onlyUse', 'boolVal', false)
    ->serializeToForum('tituspijean-auth-ldap.display_detailed_error', 'tituspijean-auth-ldap.display_detailed_error', 'boolVal', false)
    ->serializeToForum('tituspijean-auth-ldap.method_name', 'tituspijean-auth-ldap.method_name', 'strVal', 'LDAP'),
  (new Extend\Event)
    ->listen(RegisteringFromProvider::class, function (RegisteringFromProvider $event) {
      if ($event->provider == 'ldap' && $event->payload) {
        if (is_array($event->payload) && array_key_exists('permission', $event->payload)) {
          $assignPermission = array_map('intval', $event->payload['permission']['groups']);
          // Because the User ID doesn't exist yet, the group attached must be done after saving User into Database
          $event->user->afterSave(function (User $user) use ($assignPermission) {
              $user->groups()->attach($assignPermission);
          });
        }
      }
    })
];
