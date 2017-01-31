"use strict";

System.register("flarum/auth/ldap/addLDAPPane", ["flarum/extend", "flarum/components/AdminNav", "flarum/components/AdminLinkButton", "flarum/auth/ldap/components/LDAPPage"], function (_export, _context) {
    "use strict";

    var extend, AdminNav, AdminLinkButton, UploadPage;

    _export("default", function () {
        app.routes['flarum-auth-ldap'] = { path: '/ldap', component: UploadPage.component() };
        app.extensionSettings['flarum-auth-ldap'] = function () {
            return m.route(app.route('flarum-auth-ldap'));
        };
        extend(AdminNav.prototype, 'items', function (items) {
            items.add('flarum-auth-ldap', AdminLinkButton.component({
                href: app.route('flarum-auth-ldap'),
                icon: 'address-book',
                children: 'LDAP authentication',
                description: app.translator.trans('flarum-auth-ldap.admin.help_texts.description')
            }));
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsAdminNav) {
            AdminNav = _flarumComponentsAdminNav.default;
        }, function (_flarumComponentsAdminLinkButton) {
            AdminLinkButton = _flarumComponentsAdminLinkButton.default;
        }, function (_flarumAuthLdapComponentsLDAPPage) {
            UploadPage = _flarumAuthLdapComponentsLDAPPage.default;
        }],
        execute: function () {}
    };
});;
"use strict";

System.register("flarum/auth/ldap/components/LDAPPage", ["flarum/Component", "flarum/components/Button", "flarum/utils/saveSettings", "flarum/components/Alert", "flarum/components/Select", "flarum/components/Switch"], function (_export, _context) {
    "use strict";

    var Component, Button, saveSettings, Alert, Select, Switch, LDAPPage;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumUtilsSaveSettings) {
            saveSettings = _flarumUtilsSaveSettings.default;
        }, function (_flarumComponentsAlert) {
            Alert = _flarumComponentsAlert.default;
        }, function (_flarumComponentsSelect) {
            Select = _flarumComponentsSelect.default;
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch.default;
        }],
        execute: function () {
            LDAPPage = function (_Component) {
                babelHelpers.inherits(LDAPPage, _Component);

                function LDAPPage() {
                    babelHelpers.classCallCheck(this, LDAPPage);
                    return babelHelpers.possibleConstructorReturn(this, (LDAPPage.__proto__ || Object.getPrototypeOf(LDAPPage)).apply(this, arguments));
                }

                babelHelpers.createClass(LDAPPage, [{
                    key: "init",
                    value: function init() {
                        var _this2 = this;

                        this.loading = false;

                        this.fields = ['name', 'domain_controllers', 'base_dn', 'port'];

                        this.checkboxes = ['only_use'];

                        this.values = {};

                        this.settingsPrefix = 'flarum-auth-ldap';

                        var settings = app.data.settings;

                        this.fields.forEach(function (key) {
                            return _this2.values[key] = m.prop(settings[_this2.addPrefix(key)]);
                        });
                        this.checkboxes.forEach(function (key) {
                            return _this2.values[key] = m.prop(settings[_this2.addPrefix(key)] === '1');
                        });
                    }
                }, {
                    key: "view",
                    value: function view() {
                        return [m('div', { className: 'LDAPPage' }, [m('div', { className: 'container' }, [m('form', { onsubmit: this.onsubmit.bind(this) }, [m('fieldset', { className: 'LDAPPage-preferences' }, [m('legend', {}, app.translator.trans('flarum-auth-ldap.admin.settings.title')), m('label', {}, app.translator.trans('flarum-auth-ldap.admin.settings.name')), m('input', {
                            className: 'FormControl',
                            value: this.values.name() || 'LDAP',
                            oninput: m.withAttr('value', this.values.name)
                        }), m('label', {}, app.translator.trans('flarum-auth-ldap.admin.settings.domain_controllers')), m('input', {
                            className: 'FormControl',
                            value: this.values.domain_controllers() || 'localhost',
                            oninput: m.withAttr('value', this.values.domain_controllers)
                        }), m('label', {}, app.translator.trans('flarum-auth-ldap.admin.settings.base_dn')), m('input', {
                            className: 'FormControl',
                            value: this.values.base_dn() || 'ou=users,dc=yunohost,dc=org',
                            oninput: m.withAttr('value', this.values.base_dn)
                        }), m('label', {}, app.translator.trans('flarum-auth-ldap.admin.settings.port')), m('input', {
                            className: 'FormControl',
                            value: this.values.port() || 389,
                            oninput: m.withAttr('value', this.values.port)
                        }), Switch.component({
                            state: this.values.only_use() || false,
                            children: app.translator.trans('flarum-auth-ldap.admin.settings.only_use'),
                            onchange: this.values.only_use
                        }), Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            children: app.translator.trans('flarum-auth-ldap.admin.buttons.save'),
                            loading: this.loading,
                            disabled: !this.changed()
                        })])])])])];
                    }
                }, {
                    key: "changed",
                    value: function changed() {
                        var _this3 = this;

                        var fieldsCheck = this.fields.some(function (key) {
                            return _this3.values[key]() !== app.data.settings[_this3.addPrefix(key)];
                        });
                        var checkboxesCheck = this.checkboxes.some(function (key) {
                            return _this3.values[key]() !== (app.data.settings[_this3.addPrefix(key)] == '1');
                        });
                        return fieldsCheck || checkboxesCheck;
                    }
                }, {
                    key: "onsubmit",
                    value: function onsubmit(e) {
                        var _this4 = this;

                        e.preventDefault();

                        if (this.loading) return;

                        this.loading = true;

                        app.alerts.dismiss(this.successAlert);

                        var settings = {};

                        this.fields.forEach(function (key) {
                            return settings[_this4.addPrefix(key)] = _this4.values[key]();
                        });
                        this.checkboxes.forEach(function (key) {
                            return settings[_this4.addPrefix(key)] = _this4.values[key]();
                        });

                        saveSettings(settings).then(function () {
                            app.alerts.show(_this4.successAlert = new Alert({
                                type: 'success',
                                children: app.translator.trans('core.admin.basics.saved_message')
                            }));
                        }).catch(function () {}).then(function () {
                            _this4.loading = false;
                            m.redraw();
                        });
                    }
                }, {
                    key: "addPrefix",
                    value: function addPrefix(key) {
                        return this.settingsPrefix + '.' + key;
                    }
                }]);
                return LDAPPage;
            }(Component);

            _export("default", LDAPPage);
        }
    };
});;
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
            return app.translator.trans('flarum-auth-ldap.admin.settings.title');
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
                app.translator.trans('flarum-auth-ldap.admin.settings.name')
              ),
              m('input', { className: 'FormControl', bidi: this.setting('flarum-auth-ldap.name') })
            ), m(
              'div',
              { className: 'Form-group' },
              m(
                'label',
                null,
                app.translator.trans('flarum-auth-ldap.admin.settings.domains')
              ),
              m('input', { className: 'FormControl', bidi: this.setting('flarum-auth-ldap.domains') })
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

System.register('flarum/auth/ldap/main', ['flarum/app', 'flarum/auth/ldap/addLDAPPane'], function (_export, _context) {
  "use strict";

  var app, addLDAPPane;
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumAuthLdapAddLDAPPane) {
      addLDAPPane = _flarumAuthLdapAddLDAPPane.default;
    }],
    execute: function () {

      app.initializers.add('flarum-auth-ldap', function (app) {
        addLDAPPane();
      });
    }
  };
});