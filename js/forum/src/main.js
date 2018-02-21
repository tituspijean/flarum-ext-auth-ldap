import { extend, override } from 'flarum/extend';
import app from 'flarum/app';
import HeaderSecondary from 'flarum/components/HeaderSecondary';
import LogInButtons from 'flarum/components/LogInButtons';
import LogInButton from 'flarum/components/LogInButton';
import Button from 'flarum/components/Button';
import ItemList from 'flarum/utils/ItemList';

app.initializers.add('tituspijean-flarum-ext-auth-ldap', () => {

	extend(HeaderSecondary.prototype, 'items', function(items) {
		const onlyUseLDAP = app.forum.attribute( 'onlyUseLDAP' );

		if( onlyUseLDAP == true ) {
			if (items.has('signUp')) {
				items.remove('signUp');
			}

			if (items.has('logIn')) {
				const width = 600;
      				const height = 400;
      				const $window = $(window);
				items.replace('logIn', Button.component({
					children: app.translator.trans('flarum-ext-auth-ldap.forum.log_in'),
					className: 'Button Button--link',
					onclick: () =>       window.open(app.forum.attribute('baseUrl') + '/auth/ldap', 'logInPopup',
       								`width=${width},` +
        							`height=${height},` +
        							`top=${$window.height() / 2 - height / 2},` +
        							`left=${$window.width() / 2 - width / 2},` +
        							'status=no,scrollbars=no,resizable=yes')
				}), 0);
			}
		}
	});

	extend(LogInButtons.prototype, 'items', function(items) {
		items.add('ldap',
			<LogInButton
			className="Button LogInButton--ldap"
			icon="address-book"
			path="/auth/ldap">
			{app.translator.trans('flarum-ext-auth-ldap.forum.log_in_with')}
			</LogInButton>
		);
  	});

});
