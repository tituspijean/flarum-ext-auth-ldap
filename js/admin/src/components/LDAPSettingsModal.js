import SettingsModal from 'flarum/components/SettingsModal';

export default class LDAPSettingsModal extends SettingsModal {
  className() {
    return 'LDAPSettingsModal Modal--small';
  }

  title() {
    return app.translator.trans('flarum-ext-auth-ldap.admin.ldap_settings.title');
  }

  form() {
    return [
      <div className="Form-group">
        <label>{app.translator.trans('flarum-ext-auth-ldap.admin.ldap_settings.sp_name')}</label>
        <input className="FormControl" bidi={this.setting('flarum-auth-ldap.sp_name')}/>
      </div>,

      <div className="Form-group">
        <label>{app.translator.trans('flarum-ext-auth-ldap.admin.ldap_settings.registration_url')}</label>
        <input className="FormControl" bidi={this.setting('flarum-ext-auth-ldap.registration_url')}/>
      </div>,

      <div className="Form-group">
        <label>{app.translator.trans('flarum-ext-auth-ldap.admin.ldap_settings.only_use_ldap')}</label>
        <input className="FormControl" bidi={this.setting('flarum-ext-auth-ldap.only_use_ldap')}/>
      </div>
    ];
  }
}
