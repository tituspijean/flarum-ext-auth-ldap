import { extend, override } from 'flarum/common/extend';
import app from 'flarum/common/app';

import HeaderSecondary from "flarum/components/HeaderSecondary";
import SettingsPage from "flarum/components/SettingsPage";
import Button from 'flarum/components/Button';

import LogInModal from "flarum/components/LogInModal";
import SignUpModal from "flarum/components/SignUpModal";
import LDAPLogInModal from "./components/LDAPLogInModal";
import Stream from 'flarum/utils/Stream';
import extractText from 'flarum/utils/extractText';

const translationPrefix = 'tituspijean-auth-ldap.forum.';

app.initializers.add('tituspijean-auth-ldap', () => {
  extend(HeaderSecondary.prototype, 'items', addLoginLink);
  extend(HeaderSecondary.prototype, 'items', removeIfOnlyUse);
  extend(LogInModal.prototype, 'content', overrideLogInModal);

  extend(SignUpModal.prototype, 'fields', function (items) {
    if (app.forum.attribute('displayNameDriver') === 'nickname' && this.isProvided('nickname')) {
      this.nickname = Stream(this.attrs.nickname || '');

      items.add(
        'nickname',
        <div className="Form-group">
          <input
            className="FormControl"
            name="nickname"
            type="text"
            placeholder={extractText(app.translator.trans('flarum-nicknames.forum.sign_up.nickname_placeholder'))}
            bidi={this.nickname}
            disabled={this.loading || this.isProvided('nickname')}
            required={app.forum.attribute('randomizeUsernameOnRegistration')}
          />
        </div>,
        25
      );
    }
  });

  SignUpModal.prototype.title = function() {
    if (this.attrs.isLDAP) {
      return app.translator.trans(translationPrefix + 'account_found', {server: app.forum.attribute('tituspijean-auth-ldap.method_name')});
    } else {
      return app.translator.trans('core.forum.sign_up.title');
    }
  }

  SignUpModal.prototype.footer = function() {
    if (this.attrs.isLDAP) {
      return [
      ];
    } else {
      return [
        <p className="SignUpModal-logIn">{app.translator.trans('core.forum.sign_up.log_in_text', { a: <a onclick={this.logIn.bind(this)} /> })}</p>,
      ];
    }
  }

  extend(SettingsPage.prototype, 'accountItems', removeProfileActions);
  extend(SettingsPage.prototype, 'settingsItems', checkRemoveAccountSection);

	function overrideLogInModal() {
		if (app.forum.attribute('tituspijean-auth-ldap.onlyUse')) {
			LogInModal.prototype.content = LDAPLogInModal.prototype.content
			LogInModal.prototype.title = LDAPLogInModal.prototype.title
			LogInModal.prototype.body = LDAPLogInModal.prototype.body
			LogInModal.prototype.fields = LDAPLogInModal.prototype.fields
			LogInModal.prototype.footer = LDAPLogInModal.prototype.footer
			LogInModal.prototype.onerror = LDAPLogInModal.prototype.onerror
			LogInModal.prototype.onready = LDAPLogInModal.prototype.onready
			LogInModal.prototype.onsubmit = LDAPLogInModal.prototype.onsubmit
		}
	}

	function addLoginLink(items) {
		if (items.has('logIn')) {
			items.add('logInLDAP',
				Button.component(
					{
						className: 'Button Button--link',
						onclick: () => app.modal.show(LDAPLogInModal)
					},
					app.translator.trans(translationPrefix + 'log_in_with', {server: app.forum.attribute('tituspijean-auth-ldap.method_name')})
				),
				0
			);
		}
	}

	function removeIfOnlyUse(items) {
		if (app.forum.attribute('tituspijean-auth-ldap.onlyUse')) {
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
		if (items.has('account') && items.get('account').children.length === 0) {
			items.remove('account');
		}
	}
});
