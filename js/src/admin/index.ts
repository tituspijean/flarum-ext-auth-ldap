import app from 'flarum/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Button from 'flarum/common/components/Button';

interface LdapDomain {
  host: string
  port: number
  baseDN: string
  filter: string
  admin: {
    dn: string
    password: string
  }
  searchFields: string[]
  user: {
    username: string
    mail: string
    nicknameFields: string[]
  }
  followReferrals: boolean
  useSSL: boolean
  useTLS: boolean
}
const settingsPrefix = 'tituspijean-auth-ldap.';
const translationPrefix = 'tituspijean-auth-ldap.admin.settings.';
const ldapDomainsSettingKey = settingsPrefix+'domains';
const ldapNicknameAvailableFields = [
  // Full Name
  'cn',
  'commonname',
  'displayname',
  'name',
  // First Name
  'givenname',
  // Middle Initial
  'initials',
  // Last Name
  'sn',
  'surname',
  // Title
  'title',
];
const ldapEmailAvailableFields = [
  // Email Address
  'mail',
  'rfc822mailbox',
];
const ldapUsernameAvailableFields = [
  // User ID
  'mailnickname',
  'samaccountname',
  'uid',
  'userprincipalname',
];
const ldapSearchUsernameAvailableFields = [
  // User ID
  'mailnickname',
  'samaccountname',
  'uid',
  'userprincipalname',
  // Email Address
  'mail',
  'rfc822mailbox',
];

const _sort = (list = [], selected = []) => {
  // Must have the list sorted first before options are created, due to Select2 will sort array based on the list order.
  for (let i = 0; i < selected.length; i++) {
    const foundIndex = list.indexOf(selected[i]);
    if (foundIndex > 0) {
      list.splice(i, 0, list.splice(list.indexOf(selected[i]), 1)[0]);
    }
  }
  return list;
}

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
      function (this: ExtensionPage) {
        let ldapDomains: LdapDomain[];

        try {
          ldapDomains = JSON.parse(this.setting(ldapDomainsSettingKey)());
        } catch (e) {
          // do nothing, we'll reset to something usable
        }

        // @ts-ignore variable used before assignment, it's fine
        if (!Array.isArray(ldapDomains)) {
          ldapDomains = [];
        }

        return m('.Form-group', [
          m('label', app.translator.trans(translationPrefix + 'domains.title')),
          m('.helpText', app.translator.trans(translationPrefix + 'domains.description')),
          m('table', {style:'table-layout:fixed'}, [
            m('tbody', [
              ldapDomains.map((rule, index) => m('table', {
                border: '1px solid black',
              }, [
                m('thead', m('tr', [
                  m('th', app.translator.trans(translationPrefix + 'domains.banner', {index: index+1})),
                  m('th', Button.component({
                    className: 'Button Button--icon',
                    icon: 'fas fa-times',
                    onclick: () => {
                      ldapDomains.splice(index, 1);
                        this.setting(ldapDomainsSettingKey)(ldapDomains.length > 0 ? JSON.stringify(ldapDomains) : null);
                    },
                  })
                  )
                ])),
                m('tbody', [
                  m('table', [
                    m('thead', m('tr', [
                      m('th', { width: '30%' }),
                      m('th', { width: '70%' }),
                    ])),
                    m('tbody', [
                      m('tr', [
                        m('th', { colspan: 2 }, app.translator.trans(translationPrefix + 'domains.header.server')),
                      ]),
                      m('tr', [
                        m('td', app.translator.trans(translationPrefix + 'domains.data.host')),
                        m('td', m('input.FormControl', {
                          type: 'text',
                          value: rule.host || '',
                          placeholder: 'localhost',
                          onchange: (event: InputEvent) => {
                              rule.host = (event.target as HTMLInputElement).value;
                              this.setting(ldapDomainsSettingKey)(JSON.stringify(ldapDomains));
                          },
                        })),
                      ]),
                      m('tr', [
                        m('td', { colspan: 2, class: 'helpText'}, app.translator.trans(translationPrefix + 'domains.data.host_help')),
                      ]),
                      m('tr', [
                        m('td', app.translator.trans(translationPrefix + 'domains.data.port')),
                        m('td', m('input.FormControl', {
                          type: 'text',
                          value: rule.port || '',
                          placeholder: '389',
                          onchange: (event: InputEvent) => {
                              rule.port = (event.target as HTMLInputElement).value;
                              this.setting(ldapDomainsSettingKey)(JSON.stringify(ldapDomains));
                          },
                        })),
                      ]),
                      m('tr', [
                        m('td', app.translator.trans(translationPrefix + 'domains.data.base_dn')),
                        m('td', m('input.FormControl', {
                          type: 'text',
                          value: rule.baseDN || '',
                          placeholder: 'ou=users,dc=yunohost,dc=org',
                          onchange: (event: InputEvent) => {
                              rule.baseDN = (event.target as HTMLInputElement).value;
                              this.setting(ldapDomainsSettingKey)(JSON.stringify(ldapDomains));
                          },
                        })),
                      ]),
                      m('tr', [
                        m('td', { colspan: 2, class: 'helpText'}, app.translator.trans(translationPrefix + 'domains.data.base_dn_help')),
                      ]),
                      m('tr', [
                        m('td', app.translator.trans(translationPrefix + 'domains.data.filter')),
                        m('td', m('input.FormControl', {
                          type: 'text',
                          value: rule.filter || '',
                          placeholder: '(&(objectClass=posixAccount)(permission=cn=flarum.main,ou=permission,dc=yunohost,dc=org)',
                          onchange: (event: InputEvent) => {
                              rule.filter = (event.target as HTMLInputElement).value;
                              this.setting(ldapDomainsSettingKey)(JSON.stringify(ldapDomains));
                          },
                        })),
                      ]),
                      m('tr', [
                        m('td', { colspan: 2, class: 'helpText'}, app.translator.trans(translationPrefix + 'domains.data.filter_help')),
                      ]),
                      m('tr', [
                        m('td', app.translator.trans(translationPrefix + 'domains.data.follow_referrals')),
                        m('td', m('input', {
                          type: 'checkbox',
                          checked: rule.followReferrals,
                          onchange: (event: InputEvent) => {
                              rule.followReferrals = (event.target as HTMLInputElement).checked;
                              this.setting(ldapDomainsSettingKey)(JSON.stringify(ldapDomains));
                          },
                        })),
                      ]),
                      m('tr', [
                        m('td', app.translator.trans(translationPrefix + 'domains.data.use_ssl')),
                        m('td', m('input', {
                          type: 'checkbox',
                          checked: rule.useSSL,
                          onchange: (event: InputEvent) => {
                              rule.useSSL = (event.target as HTMLInputElement).checked;
                              this.setting(ldapDomainsSettingKey)(JSON.stringify(ldapDomains));
                          },
                        })),
                      ]),
                      m('tr', [
                        m('td', app.translator.trans(translationPrefix + 'domains.data.use_tls')),
                        m('td', m('input', {
                          type: 'checkbox',
                          checked: rule.useTLS,
                          onchange: (event: InputEvent) => {
                              rule.useTLS = (event.target as HTMLInputElement).checked;
                              this.setting(ldapDomainsSettingKey)(JSON.stringify(ldapDomains));
                          },
                        })),
                      ]),
                      m('tr', [
                        m('th', { colspan: 2 }, app.translator.trans(translationPrefix + 'domains.header.admin')),
                      ]),
                      m('tr', [
                        m('td', app.translator.trans(translationPrefix + 'domains.data.admin_dn')),
                        m('td', m('input.FormControl', {
                          type: 'text',
                          value: rule.admin.dn || '',
                          placeholder: 'cn=admin,dc=yunohost,dc=org',
                          onchange: (event: InputEvent) => {
                              rule.admin.dn = (event.target as HTMLInputElement).value;
                              this.setting(ldapDomainsSettingKey)(JSON.stringify(ldapDomains));
                          },
                        })),
                      ]),
                      m('tr', [
                        m('td', { colspan: 2, class: 'helpText'}, app.translator.trans(translationPrefix + 'domains.data.admin_dn_help')),
                      ]),
                      m('tr', [
                        m('td', app.translator.trans(translationPrefix + 'domains.data.admin_password')),
                        m('td', m('input.FormControl', {
                          type: 'text',
                          value: rule.admin.password || '',
                          placeholder: 'password',
                          onchange: (event: InputEvent) => {
                              rule.admin.password = (event.target as HTMLInputElement).value;
                              this.setting(ldapDomainsSettingKey)(JSON.stringify(ldapDomains));
                          },
                        })),
                      ]),
                      m('tr', [
                        m('td', { colspan: 2, class: 'helpText'}, app.translator.trans(translationPrefix + 'domains.data.admin_password_help')),
                      ]),
                      m('tr', [
                        m('th', { colspan: 2 }, app.translator.trans(translationPrefix + 'domains.header.search_fields')),
                      ]),
                      m('tr', [
                        m('td', { colspan: 2 }, app.translator.trans(translationPrefix + 'domains.header.search_fields_description')),
                      ]),
                      m('tr', [
                        m('td', app.translator.trans(translationPrefix + 'domains.data.search_user_fields')),
                        m('td',
                          m('select', {
                            oncreate: ({dom}) => $(dom).select2({ width: '100%', multiple: true }).on("change", function() {
                              this.dispatchEvent(new CustomEvent('edit', {"detail": $(this).val()}));
                            }).on('select2:select', function(e){
                              var id = e.params.data.id;
                              var option = $(e.target).children('[value='+id+']');
                              option.detach();
                              $(e.target).append(option).change();
                            }).val(rule.searchFields || []).trigger("change"),
                            onedit: (event: InputEvent) => {
                              rule.searchFields = event.detail;
                              this.setting(ldapDomainsSettingKey)(JSON.stringify(ldapDomains));
                            }
                          }, [
                            _sort(ldapSearchUsernameAvailableFields, rule.searchFields).map(field => [
                              m('option', { value: field }, field)
                            ])
                          ])
                        )
                      ]),
                      m('tr', [
                        m('td', { colspan: 2, class: 'helpText'}, app.translator.trans(translationPrefix + 'domains.data.search_user_fields_help')),
                      ]),
                      m('tr', [
                        m('th', { colspan: 2 }, app.translator.trans(translationPrefix + 'domains.header.flarum')),
                      ]),
                      m('tr', [
                        m('td', { colspan: 2 }, app.translator.trans(translationPrefix + 'domains.header.flarum_description')),
                      ]),
                      m('tr', [
                        m('td', app.translator.trans(translationPrefix + 'domains.data.user_username')),
                        m('td',
                          m('select', {
                            value: rule.user.username || '',
                            oncreate: ({dom}) => $(dom).select2({ width: '100%', allowClear: true, placeholder: '' }).on("change", function() {
                              this.dispatchEvent(new CustomEvent('edit', {"detail": this.value}));
                            }),
                            onedit: (event: InputEvent) => {
                              rule.user.username = event.detail;
                              this.setting(ldapDomainsSettingKey)(JSON.stringify(ldapDomains));
                            }
                          },
                            [
                              ldapUsernameAvailableFields.map(field => [
                                m('option', { value: field }, field)
                              ])
                            ]
                          )
                        )
                      ]),
                      m('tr', [
                        m('td', app.translator.trans(translationPrefix + 'domains.data.user_mail')),
                        m('td',
                          m('select', {
                            value: rule.user.mail || '',
                            oncreate: ({dom}) => $(dom).select2({ width: '100%', allowClear: true, placeholder: '' }).on("change", function() {
                              this.dispatchEvent(new CustomEvent('edit', {"detail": this.value}));
                            }),
                            onedit: (event: InputEvent) => {
                              rule.user.mail = event.detail;
                              this.setting(ldapDomainsSettingKey)(JSON.stringify(ldapDomains));
                            }
                          },
                            [
                              ldapEmailAvailableFields.map(field => [
                                m('option', { value: field }, field)
                              ])
                            ]
                          )
                        )
                      ]),
                      m('tr', [
                        m('td', { colspan: 2, class: 'helpText'}, app.translator.trans(translationPrefix + 'domains.data.user_mail_help')),
                      ]),
                      m('tr', [
                        m('td', app.translator.trans(translationPrefix + 'domains.data.user_nickname_fields')),
                        m('td',
                          m('select', {
                            oncreate: ({dom}) => $(dom).select2({ width: '100%', multiple: true }).on("change", function() {
                              this.dispatchEvent(new CustomEvent('edit', {"detail": $(this).val()}));
                            }).on('select2:select', function(e){
                              var id = e.params.data.id;
                              var option = $(e.target).children('[value='+id+']');
                              option.detach();
                              $(e.target).append(option).change();
                            }).val(rule.user.nicknameFields || []).trigger("change"),
                            onedit: (event: InputEvent) => {
                              rule.user.nicknameFields = event.detail;
                              this.setting(ldapDomainsSettingKey)(JSON.stringify(ldapDomains));
                            }
                          },
                            [
                              _sort(ldapNicknameAvailableFields, rule.user.nicknameFields).map(field => [
                                m('option', { value: field }, field)
                              ])
                            ]
                          )
                        )
                      ]),
                      m('tr', [
                        m('td', { colspan: 2, class: 'helpText'}, app.translator.trans(translationPrefix + 'domains.data.user_nickname_fields_help')),
                      ])
                    ])
                  ])
                ])
              ])),
              m('tr', m('td', Button.component({
                className: 'Button Button--block',
                onclick: () => {
                  ldapDomains.push({
                    host: '',
                    port: '',
                    baseDN: '',
                    filter: '',
                    admin: {
                      dn: '',
                      password: '',
                    },
                    searchFields: [],
                    user: {
                      username: '',
                      mail: '',
                      nicknameFields: [],
                    },
                    followReferrals: false,
                    useSSL: false,
                    useTLS: false
                  });

                  this.setting(ldapDomainsSettingKey)(JSON.stringify(ldapDomains));
                },
              }, app.translator.trans(translationPrefix + 'domains.add'))))
            ]),
          ]),
        ]);
      }
    )
    .registerSetting(
      {
        setting: settingsPrefix + 'onlyUse',
        label: app.translator.trans(translationPrefix + 'onlyUse'),
        type: 'boolean',
        default: false,
      }
    )
    .registerSetting(
      {
        setting: settingsPrefix + 'display_detailed_error',
        label: app.translator.trans(translationPrefix + 'display_detailed_error'),
        type: 'boolean',
        default: false,
      }
    )
});
