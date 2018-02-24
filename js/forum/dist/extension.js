'use strict';

System.register('tituspijean/flarum-ext-auth-ldap/components/LDAPLogInModal', ['flarum/components/Modal', 'flarum/components/ForgotPasswordModal', 'flarum/components/Alert', 'flarum/components/Button', 'flarum/components/LogInButtons', 'flarum/utils/extractText'], function (_export, _context) {
  "use strict";

  var Modal, ForgotPasswordModal, Alert, Button, LogInButtons, extractText, LDAPLogInModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }, function (_flarumComponentsForgotPasswordModal) {
      ForgotPasswordModal = _flarumComponentsForgotPasswordModal.default;
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsLogInButtons) {
      LogInButtons = _flarumComponentsLogInButtons.default;
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText.default;
    }],
    execute: function () {
      LDAPLogInModal = function (_Modal) {
        babelHelpers.inherits(LDAPLogInModal, _Modal);

        function LDAPLogInModal() {
          babelHelpers.classCallCheck(this, LDAPLogInModal);
          return babelHelpers.possibleConstructorReturn(this, (LDAPLogInModal.__proto__ || Object.getPrototypeOf(LDAPLogInModal)).apply(this, arguments));
        }

        babelHelpers.createClass(LDAPLogInModal, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(LDAPLogInModal.prototype.__proto__ || Object.getPrototypeOf(LDAPLogInModal.prototype), 'init', this).call(this);

            /**
             * The value of the identification input.
             *
             * @type {Function}
             */
            this.identification = m.prop(this.props.identification || '');

            /**
             * The value of the password input.
             *
             * @type {Function}
             */
            this.password = m.prop(this.props.password || '');

            /**
             * The value of the remember me input.
             *
             * @type {Function}
             */
            this.remember = m.prop(!!this.props.remember);
          }
        }, {
          key: 'className',
          value: function className() {
            return 'LogInModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('core.forum.log_in.title');
          }
        }, {
          key: 'content',
          value: function content() {
            return [m(
              'div',
              { className: 'Modal-body' },
              m(LogInButtons, null),
              m(
                'div',
                { className: 'Form Form--centered' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m('input', { className: 'FormControl', name: 'identification', type: 'text', placeholder: extractText(app.translator.trans('core.forum.log_in.username_or_email_placeholder')),
                    bidi: this.identification,
                    disabled: this.loading })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m('input', { className: 'FormControl', name: 'password', type: 'password', placeholder: extractText(app.translator.trans('core.forum.log_in.password_placeholder')),
                    bidi: this.password,
                    disabled: this.loading })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'div',
                    null,
                    m(
                      'label',
                      { className: 'checkbox' },
                      m('input', { type: 'checkbox', bidi: this.remember, disabled: this.loading }),
                      app.translator.trans('core.forum.log_in.remember_me_label')
                    )
                  )
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  Button.component({
                    className: 'Button Button--primary Button--block',
                    type: 'submit',
                    loading: this.loading,
                    children: app.translator.trans('core.forum.log_in.submit_button')
                  })
                )
              )
            )];
          }
        }, {
          key: 'onready',
          value: function onready() {
            this.$('[name=' + (this.identification() ? 'password' : 'identification') + ']').select();
          }
        }, {
          key: 'LDAPlogin',
          value: function LDAPlogin(data) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return app.request(babelHelpers.extends({
              method: 'POST',
              url: app.forum.attribute('baseUrl') + '/auth/ldap',
              data: data
            }, options));
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            e.preventDefault();

            this.loading = true;

            var identification = this.identification();
            var password = this.password();
            var remember = this.remember();

            this.LDAPlogin({ identification: identification, password: password, remember: remember }, { errorHandler: this.onerror.bind(this) }).then(function () {
              return window.location.reload();
            }, this.loaded.bind(this));
          }
        }, {
          key: 'onerror',
          value: function onerror(error) {
            if (error.status === 401) {
              error.alert.props.children = app.translator.trans('core.forum.log_in.invalid_login_message');
            }

            babelHelpers.get(LDAPLogInModal.prototype.__proto__ || Object.getPrototypeOf(LDAPLogInModal.prototype), 'onerror', this).call(this, error);
          }
        }]);
        return LDAPLogInModal;
      }(Modal);

      _export('default', LDAPLogInModal);
    }
  };
});;
"use strict";

System.register("tituspijean/flarum-ext-auth-ldap/main", ["flarum/extend", "flarum/app", "flarum/components/HeaderSecondary", "flarum/components/SettingsPage", "flarum/components/Button", "tituspijean/flarum-ext-auth-ldap/components/LDAPLogInModal"], function (_export, _context) {
	"use strict";

	var extend, app, HeaderSecondary, SettingsPage, Button, LDAPLogInModal;
	return {
		setters: [function (_flarumExtend) {
			extend = _flarumExtend.extend;
		}, function (_flarumApp) {
			app = _flarumApp.default;
		}, function (_flarumComponentsHeaderSecondary) {
			HeaderSecondary = _flarumComponentsHeaderSecondary.default;
		}, function (_flarumComponentsSettingsPage) {
			SettingsPage = _flarumComponentsSettingsPage.default;
		}, function (_flarumComponentsButton) {
			Button = _flarumComponentsButton.default;
		}, function (_tituspijeanFlarumExtAuthLdapComponentsLDAPLogInModal) {
			LDAPLogInModal = _tituspijeanFlarumExtAuthLdapComponentsLDAPLogInModal.default;
		}],
		execute: function () {

			app.initializers.add('tituspijean-auth-ldap', function () {

				extend(HeaderSecondary.prototype, 'items', replaceLoginButton);
				extend(HeaderSecondary.prototype, 'items', removeSignupButton);

				extend(SettingsPage.prototype, 'accountItems', removeProfileActions);
				extend(SettingsPage.prototype, 'settingsItems', checkRemoveAccountSection);

				function replaceLoginButton(items) {
					if (!items.has('logIn')) {
						return;
					}

					items.replace('logIn', Button.component({
						children: app.translator.trans('core.forum.header.log_in_link'),
						className: 'Button Button--link',
						onclick: function onclick() {
							return app.modal.show(new LDAPLogInModal());
						}
					}), 0);
				}

				function removeSignupButton(items) {
					items.remove('signUp');
				}

				function removeProfileActions(items) {
					items.remove('changeEmail');
					items.remove('changePassword');
				}

				function checkRemoveAccountSection(items) {
					if (items.has('account') && items.get('account').props.children.length === 0) {
						items.remove('account');
					}
				}
			});
		}
	};
});