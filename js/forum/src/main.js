import { extend } from 'flarum/extend';
import app from 'flarum/app';
import LogInButtons from 'flarum/components/LogInButtons';
import LogInButton from 'flarum/components/LogInButton';

app.initializers.add('flarum-auth-ldap', () => {
  extend(LogInButtons.prototype, 'items', function(items) {
    items.add('ldap',
      <LogInButton
        className="Button LogInButton--ldap"
        icon="address-book"
        path="/auth/ldap">
        {app.translator.trans('flarum-auth-ldap.forum.log_in_with', {name})}
      </LogInButton>
    );
  });
});
