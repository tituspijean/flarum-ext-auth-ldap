import Component from "flarum/Component";
import Button from "flarum/components/Button";
import saveSettings from "flarum/utils/saveSettings";
import Alert from "flarum/components/Alert";
import Select from "flarum/components/Select";
import Switch from "flarum/components/Switch";

export default class LDAPPage extends Component {

    init() {
        this.loading = false;

        this.fields = [
            'name',
            'domain_controllers',
            'base_dn',
            'port',
        ];

        this.checkboxes = [
            'only_use'
        ];

        this.values = {};

        this.settingsPrefix = 'flarum-auth-ldap';

        const settings = app.data.settings;

        this.fields.forEach(key =>
            this.values[key] = m.prop(settings[this.addPrefix(key)])
        );
        this.checkboxes.forEach(key =>
            this.values[key] = m.prop(settings[this.addPrefix(key)] === '1')
        );
    }

    view() {
        return [
            m('div', {className: 'LDAPPage'}, [
                m('div', {className: 'container'}, [
                    m('form', {onsubmit: this.onsubmit.bind(this)}, [
                        m('fieldset', {className: 'LDAPPage-preferences'}, [
                            m('legend', {}, app.translator.trans('flarum-auth-ldap.admin.settings.title')),
                            m('label', {}, app.translator.trans('flarum-auth-ldap.admin.settings.name')),
                            m('input', {
                                className: 'FormControl',
                                value: this.values.name() || 'LDAP',
                                oninput: m.withAttr('value', this.values.name)
                            }),
                            m('label', {}, app.translator.trans('flarum-auth-ldap.admin.settings.domain_controllers')),
                            m('input', {
                                className: 'FormControl',
                                value: this.values.domain_controllers() || 'localhost',
                                oninput: m.withAttr('value', this.values.domain_controllers)
                            }),
                            m('label', {}, app.translator.trans('flarum-auth-ldap.admin.settings.base_dn')),
                            m('input', {
                                className: 'FormControl',
                                value: this.values.base_dn() || 'ou=users,dc=yunohost,dc=org',
                                oninput: m.withAttr('value', this.values.base_dn)
                            }),
                            m('label', {}, app.translator.trans('flarum-auth-ldap.admin.settings.port')),
                            m('input', {
                                className: 'FormControl',
                                value: this.values.port() || 389,
                                oninput: m.withAttr('value', this.values.port)
                            }),
                            Switch.component({
                                state: this.values.only_use() || false,
                                children: app.translator.trans('flarum-auth-ldap.admin.settings.only_use'),
                                onchange: this.values.only_use
                            }),
                            Button.component({
                                 type: 'submit',
                                 className: 'Button Button--primary',
                                 children: app.translator.trans('flarum-auth-ldap.admin.buttons.save'),
                                 loading: this.loading,
                                 disabled: !this.changed()
                            })
                        ])
                    ])
                ])
            ])
        ];
    }

    changed() {
        var fieldsCheck = this.fields.some(key => this.values[key]() !== app.data.settings[this.addPrefix(key)]);
        var checkboxesCheck = this.checkboxes.some(key => this.values[key]() !== (app.data.settings[this.addPrefix(key)] == '1'));
        return fieldsCheck || checkboxesCheck;
    }

    onsubmit(e) {
        e.preventDefault();

        if (this.loading) return;

        this.loading = true;

        app.alerts.dismiss(this.successAlert);

        const settings = {};

        this.fields.forEach(key => settings[this.addPrefix(key)] = this.values[key]());
        this.checkboxes.forEach(key => settings[this.addPrefix(key)] = this.values[key]());

        saveSettings(settings)
            .then(() => {
                app.alerts.show(this.successAlert = new Alert({
                    type: 'success',
                    children: app.translator.trans('core.admin.basics.saved_message')
                }));
            })
            .catch(() => {
            })
            .then(() => {
                this.loading = false;
                m.redraw();
            });
    }

    addPrefix(key) {
        return this.settingsPrefix + '.' + key;
    }
}
