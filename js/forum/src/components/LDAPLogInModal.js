import app from "flarum/app";
import Modal from 'flarum/components/Modal';
import ForgotPasswordModal from 'flarum/components/ForgotPasswordModal';
import Alert from 'flarum/components/Alert';
import Button from 'flarum/components/Button';
import LogInButtons from 'flarum/components/LogInButtons';
import extractText from 'flarum/utils/extractText';

const translationPrefix = 'tituspijean-auth-ldap.forum.';

export default class LDAPLogInModal extends Modal {
  init() {
    super.init();

    /**
     * The value of the identification input.
     *
     * @type {Function}
     */
    this.identification = m.prop(this.props.identification || '');

    /**
     * The value of the password input.
     *
     * @type {Function}
     */
    this.password = m.prop(this.props.password || '');

    /**
     * The value of the remember me input.
     *
     * @type {Function}
     */
    this.remember = m.prop(!!this.props.remember);
  }

  className() {
    return 'LogInModal Modal--small';
  }

  title() {
    return app.translator.trans(translationPrefix + 'log_in_with') + ' ' +  app.forum.attribute('LDAP_method_name');
    }

  content() {
    return [
      <div className="Modal-body">

        <div className="Form Form--centered">
          <div className="Form-group">
            <input className="FormControl" name="identification" type="text" placeholder={extractText(app.translator.trans('core.forum.log_in.username_or_email_placeholder'))}
              bidi={this.identification}
              disabled={this.loading} />
          </div>

          <div className="Form-group">
            <input className="FormControl" name="password" type="password" placeholder={extractText(app.translator.trans('core.forum.log_in.password_placeholder'))}
              bidi={this.password}
              disabled={this.loading} />
          </div>

          <div className="Form-group">
            <div>
              <label className="checkbox">
                <input type="checkbox" bidi={this.remember} disabled={this.loading} />
                {app.translator.trans('core.forum.log_in.remember_me_label')}
              </label>
            </div>
          </div>

          <div className="Form-group">
            {Button.component({
              className: 'Button Button--primary Button--block',
              type: 'submit',
              loading: this.loading,
              children: app.translator.trans('core.forum.log_in.submit_button')
            })}
          </div>
        </div>
      </div>,
    ];
  }

  onready() {
    this.$('[name=' + (this.identification() ? 'password' : 'identification') + ']').select();
  }

  LDAPlogin(data, options = {}) {
      const width = 600;
      const height = 400;
      const $window = $(window);
      const url = app.forum.attribute('baseUrl') + '/auth/ldap';
      const name = "ldapauth";

      var form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", url);
      form.setAttribute("target", name);
      for (var i in data) {
          if (data.hasOwnProperty(i)) {
               var input = document.createElement('input');
               input.type = 'hidden';
               input.name = i;
               input.value = data[i];
               form.appendChild(input);
           }
      }
      document.body.appendChild(form);

      window.open("", name,
        `width=${width},` +
        `height=${height},` +
        `top=${$window.height() / 2 - height / 2},` +
        `left=${$window.width() / 2 - width / 2},` +
        'status=no,scrollbars=no,resizable=no');

      form.submit();
      document.body.removeChild(form);
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    const identification = this.identification();
    const password = this.password();
    const remember = this.remember();

    this.LDAPlogin({identification, password, remember}, {errorHandler: this.onerror.bind(this)})
      .then(
        () => window.location.reload(),
        this.loaded.bind(this)
      );
  }

  onerror(error) {
    if (error.status === 401) {
      error.alert.props.children = app.translator.trans('core.forum.log_in.invalid_login_message');
    }

    super.onerror(error);
  }
}
