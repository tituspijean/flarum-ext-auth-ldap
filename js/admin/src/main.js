import app from 'flarum/app';
import addLDAPPane from "flarum/auth/ldap/addLDAPPane";

app.initializers.add('flarum-auth-ldap', app => {
  addLDAPPane();
});
