import app from 'flarum/app';

import addLDAPPage from 'tituspijean/flarum-ext-auth-ldap/addLDAPPage';

app.initializers.add('tituspijean-flarum-ext-auth-ldap', app => {
  addLDAPPage();
});
