import { extend, override } from 'flarum/extend';
import app from 'flarum/app';

import HeaderSecondary from "flarum/components/HeaderSecondary";
import SettingsPage from "flarum/components/SettingsPage";
import Button from 'flarum/components/Button';

import LogInModal from "flarum/components/LogInModal";
import LDAPLogInModal from "./components/LDAPLogInModal";

const translationPrefix = 'tituspijean-auth-ldap.forum.';

app.initializers.add('tituspijean-auth-ldap', function() {

	extend(HeaderSecondary.prototype, 'items', addLoginLink);
	extend(HeaderSecondary.prototype, 'items', removeIfOnlyUse);
	extend(LogInModal.prototype, 'content', overrideModal);

	extend(SettingsPage.prototype, 'accountItems', removeProfileActions);
	extend(SettingsPage.prototype, 'settingsItems', checkRemoveAccountSection);

	function overrideModal() {
		if (app.forum.attribute('onlyUseLDAP')) {
			LogInModal.prototype.content = LDAPLogInModal.prototype.content
			LogInModal.prototype.title = LDAPLogInModal.prototype.title
			LogInModal.prototype.body = LDAPLogInModal.prototype.body
			LogInModal.prototype.fields = LDAPLogInModal.prototype.fields
			LogInModal.prototype.footer = LDAPLogInModal.prototype.footer
			LogInModal.prototype.onsubmit = LDAPLogInModal.prototype.onsubmit
		}
	}

	function addLoginLink(items) {
		if (items.has('logIn')) {
			items.add('logInLDAP',
				Button.component({
					children: app.translator.trans(translationPrefix + 'log_in_with', {server: app.forum.attribute('LDAP_method_name')}),
					className: 'Button Button--link',
					onclick: () => app.modal.show(new LDAPLogInModal())
				}), 0
			);
		}
	}

	function removeIfOnlyUse(items) {
		if (app.forum.attribute('onlyUseLDAP')) {
			if (items.has('signUp')) {
				items.remove('signUp');
			}
			if (items.has('logIn')) {
				items.remove('logIn');
			}
		}
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
