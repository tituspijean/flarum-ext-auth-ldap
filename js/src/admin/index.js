import app from 'flarum/app';

const settingsPrefix = 'tituspijean-auth-ldap.';
const translationPrefix = 'tituspijean-auth-ldap.admin.settings.';

app.initializers.add('tituspijean-auth-ldap', function(app) {
  app.extensionData
    .for('tituspijean-auth-ldap')
    .registerSetting(
      {
        setting: settingsPrefix + 'method_name',
        label: app.translator.trans(translationPrefix + 'method_name'),
        type: 'text',
        placeholder: 'YunoHost',
      }
    )
    .registerSetting(
      {
        setting: settingsPrefix + 'hosts',
        label: app.translator.trans(translationPrefix + 'hosts'),
        type: 'text',
        placeholder: 'localhost',
      }
    )
    .registerSetting(
      {
        setting: settingsPrefix + 'base_dn',
        label: app.translator.trans(translationPrefix + 'base_dn'),
        type: 'text',
        placeholder: 'ou=users,dc=yunohost,dc=org',
      }
    )
    .registerSetting(
      {
        setting: settingsPrefix + 'filter',
        label: app.translator.trans(translationPrefix + 'filter'),
        type: 'text',
        placeholder: '(&(objectClass=posixAccount)(permission=cn=flarum.main,ou=permission,dc=yunohost,dc=org)',
      }
    )
    .registerSetting(
      {
        setting: settingsPrefix + 'port',
        label: app.translator.trans(translationPrefix + 'port'),
        type: 'text',
        placeholder: '389',
      }
    )
    .registerSetting(
      {
        setting: settingsPrefix + 'follow_referrals',
        label: app.translator.trans(translationPrefix + 'follow_referrals'),
        type: 'boolean',
        default: false,
      }
    )
    .registerSetting(
      {
        setting: settingsPrefix + 'use_ssl',
        label: app.translator.trans(translationPrefix + 'use_ssl'),
        type: 'boolean',
        default: true,
      }
    )
    .registerSetting(
      {
        setting: settingsPrefix + 'use_tls',
        label: app.translator.trans(translationPrefix + 'use_tls'),
        type: 'boolean',
        default: true,
      }
    )
    .registerSetting(
      {
        setting: settingsPrefix + 'admin_dn',
        label: app.translator.trans(translationPrefix + 'admin_dn'),
        type: 'text',
        placeholder: 'cn=admin,dc=yunohost,dc=org',
      }
    )
    .registerSetting(
      {
        setting: settingsPrefix + 'admin_password',
        label: app.translator.trans(translationPrefix + 'admin_password'),
        type: 'password',
        placeholder: 'password',
      }
    )
    .registerSetting(
      {
        setting: settingsPrefix + 'search_user_fields',
        label: app.translator.trans(translationPrefix + 'search_user_fields'),
        type: 'text',
        placeholder: 'uid,mail',
      }
    )
    .registerSetting(
      {
        setting: settingsPrefix + 'user_mail',
        label: app.translator.trans(translationPrefix + 'user_mail'),
        type: 'text',
        placeholder: 'mail',
      }
    )
    .registerSetting(
      {
        setting: settingsPrefix + 'user_username',
        label: app.translator.trans(translationPrefix + 'user_username'),
        type: 'text',
        placeholder: 'uid',
      }
    )
    .registerSetting(
      {
        setting: settingsPrefix + 'onlyUse',
        label: app.translator.trans(translationPrefix + 'onlyUse'),
        type: 'boolean',
        placeholder: false,
      }
    )
});
