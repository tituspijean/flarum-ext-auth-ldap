import { extend } from 'flarum/extend';
import app from 'flarum/app';
import LogInButtons from 'flarum/components/LogInButtons';
import LogInButton from 'flarum/components/LogInButton';

app.initializers.add('flarum-auth-saml2', () => {
	//Override secondary headers.
	/*extend(HeaderSecondary.prototype, 'items', function(items) {
		const onlyUseLDAP = app.forum.attribute( 'LDAPOnlyUseLDAP' );

		//Change header if specified.
		if( onlyUseLDAP == "true" ) {
			//Remove sign up link in case its not disable in administration.
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
		if( onlyUseLDAP == "true" ) {
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

	( function( app ) {
		const onlyUseLDAP = app.forum.attribute( 'LDAPOnlyUseLDAP' );
		const regUrl = app.forum.attribute( 'LDAPRegistrationUrl' );

		if( onlyUseSp == "true" ) {
			var signUp = document.querySelector( 'item-signUp' );
			var logIn = document.querySelector( 'item-logIn' );
			var logOut = document.querySelector( 'item-logOut' );

			if( signUp != undefined ) {
				if( regUrl && regUrl.length > 0 ) {
					signUp.addEventListener( "click", function( e ) {
						e.stopPropagation();
						window.location = app.forum.attribute( 'baseUrl' )
								+ '/auth/saml2?register';
					});
				} else {
					signUp.parentNode.removeChild( signUp );
				}
			}

			if( logIn != undefined ) {
				logIn.addEventListener( "click", function( e ) {
					e.stopPropagation();
					window.location = app.forum.attribute( 'baseUrl' )
							+ '/auth/saml2';
				});
			}

			if( logOut != undefined ) {
				logOut.addEventListener( "click", function( e ) {
					e.stopPropagation();
					window.location = app.forum.attribute( 'baseUrl' )
							+ '/auth/saml2';
				});
			}
		}
	})( app );

	extend(LogInButtons.prototype, 'items', function(items) {
		var spName = app.forum.attribute( 'LDAPName' );
		if( spName == undefined )
			spName = 'LDAP';

		items.add('LDAP',
			<LogInButton
				className="Button LogInButton--LDAP"
				icon="lock"
				path="/auth/ldap">
				{app.translator.trans('flarum-ext-auth-ldap.forum.log_in_with').replace( '%name%', spName )}
			</LogInButton>
		);
	});
}, -100);
