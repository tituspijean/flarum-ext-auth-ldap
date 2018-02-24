import app from 'flarum/app';
import SettingsModal from 'flarum/components/SettingsModal';
import Switch from 'flarum/components/Switch';

const settingsPrefix = 'tituspijean-flarum-ext-auth-ldap.';
const translationPrefix = 'tituspijean-flarum-ext-auth-ldap.admin.settings.';

export default class LDAPSettingsModal extends SettingsModal {
	title() {
		return app.translator.trans(translationPrefix + 'title');
	}

	form() {
		return [
			m('.Form-group', [
				m('label', app.translator.trans(translationPrefix + 'field.domain_controllers')),
				m('input.FormControl', {
					bidi: this.setting(settingsPrefix + 'domain_controllers'),
					placeholder: 'localhost',
				}),
			]),
			m('.Form-group', [
				m('label', app.translator.trans(translationPrefix + 'field.base_dn')),
				m('input.FormControl', {
					bidi: this.setting(settingsPrefix + 'base_dn'),
					placeholder: 'ou=users,dc=yunohost,dc=org',
				}),
			]),
			m('.Form-group', [
				m('label', app.translator.trans(translationPrefix + 'field.port')),
				m('input.FormControl', {
					bidi: this.setting(settingsPrefix + 'port'),
					placeholder: '389',
				}),
			]),
			m('.Form-group', [
				m('label', app.translator.trans(translationPrefix + 'field.account_prefix')),
				m('input.FormControl', {
					bidi: this.setting(settingsPrefix + 'account_prefix'),
					placeholder: '',
				}),
			]),
			m('.Form-group', [
				m('label', app.translator.trans(translationPrefix + 'field.account_suffix')),
				m('input.FormControl', {
					bidi: this.setting(settingsPrefix + 'account_suffix'),
					placeholder: '',
				}),
			]),
			m('.Form-group', [
				m('label', Switch.component({
					state: [true, '1'].indexOf(this.setting(settingsPrefix + 'follow_referrals')()) !== -1,
					onchange: this.setting(settingsPrefix + 'follow_referrals'),
					children: app.translator.trans(translationPrefix + 'follow_referrals'),
				})),
			]),
			m('.Form-group', [
				m('label', Switch.component({
					state: [true, '1'].indexOf(this.setting(settingsPrefix + 'use_ssl')()) !== -1,
					onchange: this.setting(settingsPrefix + 'use_ssl'),
					children: app.translator.trans(translationPrefix + 'use_ssl'),
				})),
			]),
			m('.Form-group', [
				m('label', Switch.component({
					state: [true, '1'].indexOf(this.setting(settingsPrefix + 'use_tls')()) !== -1,
					onchange: this.setting(settingsPrefix + 'use_tls'),
					children: app.translator.trans(translationPrefix + 'use_tls'),
				})),
			]),
			// m('.Form-group', [
			// 	m('label', Switch.component({
			// 		state: [true, '1'].indexOf(this.setting(settingsPrefix + 'onlyUse')()) !== -1,
			// 		onchange: this.setting(settingsPrefix + 'onlyUse'),
			// 		children: app.translator.trans(translationPrefix + 'onlyUse'),
			// 	})),
			// ]),
		];
	}
}
