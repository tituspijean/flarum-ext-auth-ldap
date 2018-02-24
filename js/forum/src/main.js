import { extend } from "flarum/extend";
import app from "flarum/app";

import HeaderSecondary from "flarum/components/HeaderSecondary";
import SettingsPage from "flarum/components/SettingsPage";
import Button from 'flarum/components/Button';

import LDAPLogInModal from "tituspijean/flarum-ext-auth-ldap/components/LDAPLogInModal";

app.initializers.add('tituspijean-auth-ldap', function() {

	extend(HeaderSecondary.prototype, 'items', replaceLoginButton);
	extend(HeaderSecondary.prototype, 'items', removeSignupButton);

	extend(SettingsPage.prototype, 'accountItems', removeProfileActions);
	extend(SettingsPage.prototype, 'settingsItems', checkRemoveAccountSection);

	function replaceLoginButton(items) {
		if (!items.has('logIn')) {
			return;
		}

		items.replace('logIn',
		Button.component({
		          children: app.translator.trans('core.forum.header.log_in_link'),
		          className: 'Button Button--link',
		          onclick: () => app.modal.show(new LDAPLogInModal())
		        }), 0
		);
	}

	function removeSignupButton(items) {
		items.remove('signUp');
	}

	function removeProfileActions(items) {
		items.remove('changeEmail');
		items.remove('changePassword');
	}

	function checkRemoveAccountSection(items) {
		if (items.has('account') &&
			items.get('account').props.children.length === 0) {
			items.remove('account');
		}
	}
});
