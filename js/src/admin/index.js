import app from 'flarum/app';

import LDAPSettingsModal from './components/LDAPSettingsModal';

app.initializers.add('tituspijean-auth-ldap', app => {
	app.extensionSettings['tituspijean-auth-ldap'] = () =>
    app.modal.show(LDAPSettingsModal);
});
