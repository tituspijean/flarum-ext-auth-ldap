'use strict';

System.register('flarum/auth/saml2/main', ['flarum/extend', 'flarum/app', 'flarum/components/LogInButtons', 'flarum/components/LogInButton'], function (_export, _context) {
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
				//Override secondary headers.
				/*extend(HeaderSecondary.prototype, 'items', function(items) {
    	const onlyUseSp = app.forum.attribute( 'LDAPOnlyUseLDAP' );
    		//Change header if specified.
    	if( onlyUseSp == "true" ) {
    		//Remove sign up link in case its not disabled in administration.
    		if (items.has('signUp')) {
    			items.remove('signUp');
    		}
    			//Change behavior of the global login link
    		if (items.has('logIn')) {
    			items.replace('logIn', Button.component({
    				children: app.translator.trans('flarum-ext-auth-ldap.forum.ldap_log_in'),
    				className: 'Button Button--link',
    				onclick: () => window.location.href = app.forum.attribute('baseUrl')
    							+ '/auth/ldap'
    			}), 0);
    		}
    	}
    });*/

				//Override Session dropdown.
				/*extend(SessionDropdown.prototype, 'items', function (items) {
    	const onlyUseSp = app.forum.attribute( 'LDAPOnlyUseLDAP' );
    		//Change logout behavior if specified.
    	if( onlyUseSp == "true" ) {
    		if (items.has('logOut')) {
    			items.replace('logOut', Button.component({
    					icon: 'sign-out',
    					children: app.translator.trans('flarum-ext-auth-ldap.forum.ldap_log_out'),
    					onclick: () => window.location = app.forum.attribute('baseUrl')
    						+ '/auth/ldap?out'
    				}),
    				-100);
    		}
    	}
    });*/

				(function (app) {
					var onlyUseSp = app.forum.attribute('LDAPOnlyUseLDAP');
					var regUrl = app.forum.attribute('LDAPRegistrationUrl');

					if (onlyUseSp == "true") {
						var signUp = document.querySelector('item-signUp');
						var logIn = document.querySelector('item-logIn');
						var logOut = document.querySelector('item-logOut');

						if (signUp != undefined) {
							if (regUrl && regUrl.length > 0) {
								signUp.addEventListener("click", function (e) {
									e.stopPropagation();
									window.location = app.forum.attribute('baseUrl') + '/auth/ldap?register';
								});
							} else {
								signUp.parentNode.removeChild(signUp);
							}
						}

						if (logIn != undefined) {
							logIn.addEventListener("click", function (e) {
								e.stopPropagation();
								window.location = app.forum.attribute('baseUrl') + '/auth/ldap';
							});
						}

						if (logOut != undefined) {
							logOut.addEventListener("click", function (e) {
								e.stopPropagation();
								window.location = app.forum.attribute('baseUrl') + '/auth/ldap';
							});
						}
					}
				})(app);

				extend(LogInButtons.prototype, 'items', function (items) {
					var spName = app.forum.attribute('LDAPName');
					if (spName == undefined) spName = 'LDAP';

					items.add('ldap', m(
						LogInButton,
						{
							className: 'Button LogInButton-ldap',
							icon: 'lock',
							path: '/auth/ldap' },
						app.translator.trans('flarum-ext-auth-ldap.forum.log_in_with').replace('%name%', spName)
					));
				});
			}, -100);
		}
	};
});
