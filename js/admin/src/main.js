import app from 'flarum/app';

import LDAPSettingsModal from 'flarum/auth/ldap/components/LDAPSettingsModal';

app.initializers.add('flarum-auth-ldap', () => {
  app.extensionSettings['flarum-auth-ldap'] = () => app.modal.show(new LDAPSettingsModal());
});
