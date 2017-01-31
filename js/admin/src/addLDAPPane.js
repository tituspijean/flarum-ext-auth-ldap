import {extend} from "flarum/extend";
import AdminNav from "flarum/components/AdminNav";
import AdminLinkButton from "flarum/components/AdminLinkButton";
import UploadPage from "flarum/auth/ldap/components/LDAPPage";

export default function () {
    app.routes['flarum-auth-ldap'] = {path: '/ldap', component: UploadPage.component()};
    app.extensionSettings['flarum-auth-ldap'] = () => m.route(app.route('flarum-auth-ldap'));
    extend(AdminNav.prototype, 'items', items => {
        items.add('flarum-auth-ldap', AdminLinkButton.component({
            href: app.route('flarum-auth-ldap'),
            icon: 'address-book',
            children: 'LDAP authentication',
            description: app.translator.trans('flarum-auth-ldap.admin.help_texts.description')
        }));
    });
}
