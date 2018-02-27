'use strict';

System.register('tituspijean-auth-ldap/components/LDAPSettingsModal', ['flarum/app', 'flarum/components/SettingsModal', 'flarum/components/Switch'], function (_export, _context) {
	"use strict";

	var app, SettingsModal, Switch, settingsPrefix, translationPrefix, LDAPSettingsModal;
	return {
		setters: [function (_flarumApp) {
			app = _flarumApp.default;
		}, function (_flarumComponentsSettingsModal) {
			SettingsModal = _flarumComponentsSettingsModal.default;
		}, function (_flarumComponentsSwitch) {
			Switch = _flarumComponentsSwitch.default;
		}],
		execute: function () {
			settingsPrefix = 'tituspijean-auth-ldap.';
			translationPrefix = 'tituspijean-auth-ldap.admin.settings.';

			LDAPSettingsModal = function (_SettingsModal) {
				babelHelpers.inherits(LDAPSettingsModal, _SettingsModal);

				function LDAPSettingsModal() {
					babelHelpers.classCallCheck(this, LDAPSettingsModal);
					return babelHelpers.possibleConstructorReturn(this, (LDAPSettingsModal.__proto__ || Object.getPrototypeOf(LDAPSettingsModal)).apply(this, arguments));
				}

				babelHelpers.createClass(LDAPSettingsModal, [{
					key: 'title',
					value: function title() {
						return app.translator.trans(translationPrefix + 'title');
					}
				}, {
					key: 'form',
					value: function form() {
						return [m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.method_name')), m('input.FormControl', {
							bidi: this.setting(settingsPrefix + 'method_name'),
							placeholder: 'LDAP'
						})]), m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.domain_controllers')), m('input.FormControl', {
							bidi: this.setting(settingsPrefix + 'domain_controllers'),
							placeholder: 'localhost'
						})]), m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.base_dn')), m('input.FormControl', {
							bidi: this.setting(settingsPrefix + 'base_dn'),
							placeholder: 'ou=users,dc=yunohost,dc=org'
						})]), m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.port')), m('input.FormControl', {
							bidi: this.setting(settingsPrefix + 'port'),
							placeholder: '389'
						})]), m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.account_prefix')), m('input.FormControl', {
							bidi: this.setting(settingsPrefix + 'account_prefix'),
							placeholder: ''
						})]), m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.account_suffix')), m('input.FormControl', {
							bidi: this.setting(settingsPrefix + 'account_suffix'),
							placeholder: ''
						})]), m('.Form-group', [m('label', Switch.component({
							state: [true, '1'].indexOf(this.setting(settingsPrefix + 'follow_referrals')()) !== -1,
							onchange: this.setting(settingsPrefix + 'follow_referrals'),
							children: app.translator.trans(translationPrefix + 'follow_referrals')
						}))]), m('.Form-group', [m('label', Switch.component({
							state: [true, '1'].indexOf(this.setting(settingsPrefix + 'use_ssl')()) !== -1,
							onchange: this.setting(settingsPrefix + 'use_ssl'),
							children: app.translator.trans(translationPrefix + 'use_ssl')
						}))]), m('.Form-group', [m('label', Switch.component({
							state: [true, '1'].indexOf(this.setting(settingsPrefix + 'use_tls')()) !== -1,
							onchange: this.setting(settingsPrefix + 'use_tls'),
							children: app.translator.trans(translationPrefix + 'use_tls')
						}))]), m('.Form-group', [m('label', Switch.component({
							state: [true, '1'].indexOf(this.setting(settingsPrefix + 'onlyUse')()) !== -1,
							onchange: this.setting(settingsPrefix + 'onlyUse'),
							children: app.translator.trans(translationPrefix + 'onlyUse')
						}))])];
					}
				}]);
				return LDAPSettingsModal;
			}(SettingsModal);

			_export('default', LDAPSettingsModal);
		}
	};
});;
'use strict';

System.register('tituspijean-auth-ldap/main', ['flarum/extend', 'flarum/app', 'tituspijean-auth-ldap/components/LDAPSettingsModal'], function (_export, _context) {
	"use strict";

	var extend, app, LDAPSettingsModal;
	return {
		setters: [function (_flarumExtend) {
			extend = _flarumExtend.extend;
		}, function (_flarumApp) {
			app = _flarumApp.default;
		}, function (_tituspijeanAuthLdapComponentsLDAPSettingsModal) {
			LDAPSettingsModal = _tituspijeanAuthLdapComponentsLDAPSettingsModal.default;
		}],
		execute: function () {

			app.initializers.add('tituspijean-auth-ldap', function (app) {
				app.extensionSettings['tituspijean-auth-ldap'] = function () {
					return app.modal.show(new LDAPSettingsModal());
				};
			});
		}
	};
});