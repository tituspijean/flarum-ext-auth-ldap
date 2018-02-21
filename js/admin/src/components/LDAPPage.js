import Component from "flarum/Component";
import Button from "flarum/components/Button";
import saveSettings from "flarum/utils/saveSettings";
import Alert from "flarum/components/Alert";
import FieldSet from "flarum/components/FieldSet";
import Select from "flarum/components/Select";
import Switch from "flarum/components/Switch";

export default class LDAPPage extends Component {

    init() {
        this.loading = false;

        this.fields = [
            'address'
        ];

        this.checkboxes = [
            'onlyUse'
        ];

        this.values = {};

        this.settingsPrefix = 'flarum-ext-auth-ldap';

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
                            m('legend', {}, app.translator.trans('flarum-ext-auth-ldap.admin.settings.title')),
                            m('label', {}, app.translator.trans('flarum-ext-auth-ldap.admin.settings.address')),
                            m('input', {
                                className: 'FormControl',
                                value: this.values.address(),
                                oninput: m.withAttr('value', this.values.address)
                            }),
                            Switch.component({
                                        state: this.values.onlyUse() || false,
                                        children: app.translator.trans('flarum-ext-auth-ldap.admin.settings.onlyUse'),
                                        onchange: this.values.onlyUse
                                    })
			]),
                            Button.component({
                                 type: 'submit',
                                 className: 'Button Button--primary',
                                 children: app.translator.trans('flarum-ext-auth-ldap.admin.buttons.save'),
                                 loading: this.loading,
                                 disabled: !this.changed()
                            })
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
