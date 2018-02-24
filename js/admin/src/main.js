import { extend } from 'flarum/extend';
import app from 'flarum/app';

import LDAPSettingsModal from 'tituspijean/flarum-ext-auth-ldap/components/LDAPSettingsModal';

app.initializers.add('tituspijean-auth-ldap', app => {
	app.extensionSettings['tituspijean-auth-ldap'] = () => app.modal.show(new LDAPSettingsModal());
});
