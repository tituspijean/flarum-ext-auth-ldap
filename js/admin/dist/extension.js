'use strict';

System.register('flarum/auth/ldap/components/LDAPSettingsModal', ['flarum/components/SettingsModal'], function (_export, _context) {
  "use strict";

  var SettingsModal, LDAPSettingsModal;
  return {
    setters: [function (_flarumComponentsSettingsModal) {
      SettingsModal = _flarumComponentsSettingsModal.default;
    }],
    execute: function () {
      LDAPSettingsModal = function (_SettingsModal) {
        babelHelpers.inherits(LDAPSettingsModal, _SettingsModal);

        function LDAPSettingsModal() {
          babelHelpers.classCallCheck(this, LDAPSettingsModal);
          return babelHelpers.possibleConstructorReturn(this, (LDAPSettingsModal.__proto__ || Object.getPrototypeOf(LDAPSettingsModal)).apply(this, arguments));
        }

        babelHelpers.createClass(LDAPSettingsModal, [{
          key: 'className',
          value: function className() {
            return 'LDAPSettingsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('flarum-ext-auth-ldap.admin.ldap_settings.title');
          }
        }, {
          key: 'form',
          value: function form() {
            return [m(
              'div',
              { className: 'Form-group' },
              m(
                'label',
                null,
                app.translator.trans('flarum-ext-auth-ldap.admin.ldap_settings.sp_name')
              ),
              m('input', { className: 'FormControl', bidi: this.setting('flarum-auth-ldap.sp_name') })
            ), m(
              'div',
              { className: 'Form-group' },
              m(
                'label',
                null,
                app.translator.trans('flarum-ext-auth-ldap.admin.ldap_settings.registration_url')
              ),
              m('input', { className: 'FormControl', bidi: this.setting('flarum-ext-auth-ldap.registration_url') })
            ), m(
              'div',
              { className: 'Form-group' },
              m(
                'label',
                null,
                app.translator.trans('flarum-ext-auth-ldap.admin.ldap_settings.only_use_ldap')
              ),
              m('input', { className: 'FormControl', bidi: this.setting('flarum-ext-auth-ldap.only_usr_ldap') })
            )];
          }
        }]);
        return LDAPSettingsModal;
      }(SettingsModal);

      _export('default', LDAPSettingsModal);
    }
  };
});;
'use strict';

System.register('flarum/auth/ldap/main', ['flarum/app', 'flarum/auth/ldap/components/LDAPSettingsModal'], function (_export, _context) {
  "use strict";

  var app, LDAPSettingsModal;
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumAuthLDAPComponentsLDAPSettingsModal) {
      LDAPSettingsModal = _flarumAuthLDAPComponentsLDAPSettingsModal.default;
    }],
    execute: function () {

      app.initializers.add('flarum-auth-ldap', function () {
        app.extensionSettings['flarum-auth-ldap'] = function () {
          return app.modal.show(new LDAPSettingsModal());
        };
      });
    }
  };
});
