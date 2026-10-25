import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Button from 'flarum/common/components/Button';
import Group from 'flarum/common/models/Group';
import textContrastClass from 'flarum/common/helpers/textContrastClass';

interface LdapDomain {
  host: string
  port: number
  version: number
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
  permission: {
    groups: string[]
  }
  followReferrals: boolean
  useSSL: boolean
  useTLS: boolean
  isEnabled: boolean
}

interface PermissionGroup {
  id: number
  text: string
  color: string
  icon: string
  isHidden: boolean
  namePlural: string
  nameSingular: string
}
const settingsPrefix = 'tituspijean-auth-ldap';
const translationPrefix = 'tituspijean-auth-ldap.admin.settings.';
const ldapDomainsSettingKey = settingsPrefix+'.domains';
const ldapNicknameAvailableFields = [
  // Full Name
  'cn',
  'commonName',
  'displayName',
  'name',
  // Title
  'title',
  'personalTitle',
  // First Name
  'givenName',
  // Middle Initial
  'initials',
  // Last Name
  'sn',
  'surname',
];
const ldapEmailAvailableFields = [
  // Email Address
  'mail',
  'rfc822Mailbox ',
];
const ldapUsernameAvailableFields = [
  // User ID
  'mailNickname',
  'sAMAccountName',
  'uid',
  'userPrincipalName',
];
const ldapSearchUsernameAvailableFields = [
  // User ID
  'mailNickname',
  'sAMAccountName',
  'uid',
  'userPrincipalName',
  // Email Address
  'mail',
  'rfc822Mailbox ',
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

app.initializers.add(settingsPrefix, () => {
  app.registry
    .for(settingsPrefix)
    .registerSetting(
      {
        setting: settingsPrefix + '.method_name',
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

        // Get all available permission groups
        let permissionGroupList = app.store.all('groups').filter((group) => {
          if (group.id() === Group.MEMBER_ID || group.id() === Group.GUEST_ID) {
            // Do not suggest "virtual" groups
            return false;
          } else {
            return true;
          }
        });
        let allPermissionGroupList:PermissionGroup[] = [];
        permissionGroupList.forEach((permissionGroup) => {
          let modelPermissionGroup: PermissionGroup[] = {
            id: permissionGroup.data.id,
            text: permissionGroup.data.attributes.namePlural,
            color: permissionGroup.data.attributes.color,
            icon: permissionGroup.data.attributes.icon,
            isHidden: permissionGroup.data.attributes.isHidden,
            namePlural: permissionGroup.data.attributes.namePlural,
            nameSingular: permissionGroup.data.attributes.nameSingular
          };
          allPermissionGroupList.push(modelPermissionGroup);
        })
        let availablePermissionGroupList = {results: allPermissionGroupList};
        return m('.Form-group', [
          m('label', app.translator.trans(translationPrefix + 'domains.title')),
          m('.helpText', app.translator.trans(translationPrefix + 'domains.description')),
          m('table', {style:'table-layout:fixed;color:#000000;'}, [
            m('tbody', [
              ldapDomains.map((rule, index) => m('table', {
                border: '1px solid black',
                'style': rule.isEnabled || rule.isEnabled == undefined ?'background-color: #ffffff':'background-color: #F88379',
              }, [
                m('thead', m('tr', [
                  m('th', app.translator.trans(translationPrefix + 'domains.banner', {index: index+1, isEnabled: rule.isEnabled || rule.isEnabled == undefined ? app.translator.trans(translationPrefix + 'domains.is_enabled.enabled'): app.translator.trans(translationPrefix + 'domains.is_enabled.disabled')})),
                  m('th', Button.component({
                    className: 'Button Button--icon',
                    icon: 'fas fa-times',
                    onclick: () => {
                      ldapDomains.splice(index, 1);
                        this.setting(ldapDomainsSettingKey)(ldapDomains.length > 0 ? JSON.stringify(ldapDomains) : '');
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
                          style: "background-color:#e8ecf2;color:#000000",
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
                          type: 'number',
                          style: "background-color:#e8ecf2;color:#000000",
                          value: rule.port || 389,
                          placeholder: '389',
                          onchange: (event: InputEvent) => {
                              rule.port = Number((event.target as HTMLInputElement).value);
                              this.setting(ldapDomainsSettingKey)(JSON.stringify(ldapDomains));
                          },
                        })),
                      ]),
                      m('tr', [
                        m('td', { colspan: 2, class: 'helpText'}, app.translator.trans(translationPrefix + 'domains.data.port_help')),
                      ]),
                      m('tr', [
                        m('td', app.translator.trans(translationPrefix + 'domains.data.version')),
                        m('td', m('input.FormControl', {
                          type: 'number',
                          style: "background-color:#e8ecf2;color:#000000",
                          value: rule.version || 3,
                          placeholder: '3',
                          onchange: (event: InputEvent) => {
                            rule.version = Number((event.target as HTMLInputElement).value);
                              this.setting(ldapDomainsSettingKey)(JSON.stringify(ldapDomains));
                          },
                        })),
                      ]),
                      m('tr', [
                        m('td', { colspan: 2, class: 'helpText'}, app.translator.trans(translationPrefix + 'domains.data.version_help')),
                      ]),
                      m('tr', [
                        m('td', app.translator.trans(translationPrefix + 'domains.data.base_dn')),
                        m('td', m('input.FormControl', {
                          type: 'text',
                          style: "background-color:#e8ecf2;color:#000000",
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
                          style: "background-color:#e8ecf2;color:#000000",
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
                          style: "background-color:#e8ecf2;color:#000000",
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
                          style: "background-color:#e8ecf2;color:#000000",
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
                            oncreate: ({dom}) => $(dom).select2({
                              width: '100%',
                              multiple: true,
                              data: _sort(ldapSearchUsernameAvailableFields, rule.searchFields),
                              templateResult: (value) => {
                                var output = '<span style="color:#000000;">';
                                output += value.text+"</span>";
                                return output;
                              },
                              escapeMarkup: (m) => {
                                return m;
                              },
                            }).on("change", function() {
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
                          })
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
                            oncreate: ({dom}) => $(dom).select2({
                              width: '100%',
                              allowClear: true,
                              placeholder: '',
                              templateResult: (value) => {
                                var output = '<span style="color:#000000;">';
                                output += value.text+"</span>";
                                return output;
                              },
                              escapeMarkup: (m) => {
                                return m;
                              },
                            }).on("change", function() {
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
                            oncreate: ({dom}) => $(dom).select2({
                              width: '100%',
                              allowClear: true,
                              placeholder: '',
                              templateResult: (value) => {
                                var output = '<span style="color:#000000;">';
                                output += value.text+"</span>";
                                return output;
                              },
                              escapeMarkup: (m) => {
                                return m;
                              },
                            }).on("change", function() {
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
                            oncreate: ({dom}) => $(dom).select2({
                              width: '100%',
                              multiple: true,
                              data: _sort(ldapNicknameAvailableFields, rule.user.nicknameFields),
                              templateResult: (value) => {
                                var output = '<span style="color:#000000;">';
                                output += value.text+"</span>";
                                return output;
                              },
                              escapeMarkup: (m) => {
                                return m;
                              },
                            }).on("change", function() {
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
                          })
                        )
                      ]),
                      m('tr', [
                        m('td', { colspan: 2, class: 'helpText'}, app.translator.trans(translationPrefix + 'domains.data.user_nickname_fields_help')),
                      ]),
                      m('tr', [
                        m('td', app.translator.trans(translationPrefix + 'domains.data.permission_groups')),
                        m('td',
                          m('select', {
                            oncreate: ({dom}) => $(dom).select2({
                              templateResult: (value) => {
                                var output = '<span style="color:#000000;">'
                                if(value.icon){
                                  output += '<i class="fa fa-lg '+value.icon.toLowerCase()+'"></i> ';
                                }
                                output += value.text+"</span>";
                                return output;
                              },
                              templateSelection: (value) => {
                                var output = '<span style="padding: 5px 10px 5px 10px; background-color:'+value.color+';" class="'+textContrastClass(value.color)+'">'
                                if(value.icon){
                                  output += '<i class="fa fa-lg '+value.icon.toLowerCase()+'"></i> ';
                                }
                                output += value.text+"</span>";
                                return output;
                              },
                              escapeMarkup: (m) => {
                                return m;
                              },
                              width: '100%',
                              multiple: true,
                              data:  $.map(availablePermissionGroupList, function (obj) {
                              obj.text = obj.text || obj.name; // replace name with the property used for the text
                              return obj;
                            })}).on("change", function() {
                              this.dispatchEvent(new CustomEvent('edit', {"detail": $(this).val()}));
                            }).on('select2:select', function(e){
                              var id = e.params.data.id;
                              var option = $(e.target).children('[value='+id+']');
                              option.detach();
                              $(e.target).append(option).change();
                            }).val((rule.permission && rule.permission.groups) || []).trigger("change"),
                            onedit: (event: InputEvent) => {
                              if (rule.permission) {
                                rule.permission.groups = event.detail;
                              } else {
                                rule.permission = {groups: event.detail};
                              }
                              this.setting(ldapDomainsSettingKey)(JSON.stringify(ldapDomains));
                            }
                          })
                        )
                      ]),
                      m('tr', [
                        m('td', { colspan: 2, class: 'helpText'}, app.translator.trans(translationPrefix + 'domains.data.permission_groups_help')),
                      ]),
                      m('tr', [
                        m('td', app.translator.trans(translationPrefix + 'domains.data.is_enabled')),
                        m('td', m('input', {
                          type: 'checkbox',
                          checked: rule.isEnabled || rule.isEnabled == undefined,
                          onchange: (event: InputEvent) => {
                              rule.isEnabled = (event.target as HTMLInputElement).checked;
                              this.setting(ldapDomainsSettingKey)(JSON.stringify(ldapDomains));
                          },
                        })),
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
                    port: 389,
                    version: 3,
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
                    permission: {
                      groups: [],
                    },
                    followReferrals: false,
                    useSSL: false,
                    useTLS: false,
                    isEnabled: true
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
        setting: settingsPrefix + '.onlyUse',
        label: app.translator.trans(translationPrefix + 'onlyUse'),
        type: 'boolean',
        default: false,
      }
    )
    .registerSetting(
      {
        setting: settingsPrefix + '.display_detailed_error',
        label: app.translator.trans(translationPrefix + 'display_detailed_error'),
        type: 'boolean',
        default: false,
      }
    )
});
