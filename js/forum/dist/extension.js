'use strict';

System.register('flarum/auth/ldap/main', ['flarum/extend', 'flarum/app', 'flarum/components/LogInButtons', 'flarum/components/LogInButton'], function (_export, _context) {
  "use strict";

  var extend, app, LogInButtons, LogInButton;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumComponentsLogInButtons) {
      LogInButtons = _flarumComponentsLogInButtons.default;
    }, function (_flarumComponentsLogInButton) {
      LogInButton = _flarumComponentsLogInButton.default;
    }],
    execute: function () {

      app.initializers.add('flarum-auth-ldap', function () {
        extend(LogInButtons.prototype, 'items', function (items) {
          items.add('ldap', m(
            LogInButton,
            {
              className: 'Button LogInButton--ldap',
              icon: 'address-book',
              path: '/auth/ldap' },
            app.translator.trans('flarum-auth-ldap.forum.log_in_with', { name: name })
          ));
        });
      });
    }
  };
});