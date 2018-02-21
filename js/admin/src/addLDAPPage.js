import {extend} from "flarum/extend";
import AdminNav from "flarum/components/AdminNav";
import AdminLinkButton from "flarum/components/AdminLinkButton";
import LDAPPage from "tituspijean/flarum-ext-auth-ldap/components/LDAPPage";

export default function () {
    app.routes['tituspijean-flarum-ext-auth-ldap'] = {path: '/ldap', component: LDAPPage.component()};
    app.extensionSettings['tituspijean-flarum-ext-auth-ldap'] = () => m.route(app.route('tituspijean-flarum-ext-auth-ldap'));
    extend(AdminNav.prototype, 'items', items => {
        items.add('tituspijean-flarum-ext-auth-ldap', AdminLinkButton.component({
            href: app.route('tituspijean-flarum-ext-auth-ldap'),
            icon: 'address-book',
            children: 'LDAP authentication',
            description: app.translator.trans('flarum-ext-auth-ldap.admin.description')
        }));
    });
}
