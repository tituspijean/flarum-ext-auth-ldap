import { extend } from 'flarum/extend';
import app from 'flarum/app';

import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import LogInButtons from 'flarum/components/LogInButtons';
import extractText from 'flarum/utils/extractText';
import ItemList from 'flarum/utils/ItemList';
import Stream from 'flarum/utils/Stream';

const translationPrefix = 'tituspijean-auth-ldap.forum.';
const translationErrorsPrefix = 'tituspijean-auth-ldap.forum.errors.';

export default class LDAPLogInModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    /**
     * The value of the identification input.
     *
     * @type {Function}
     */
    this.identification = Stream(this.attrs.identification || '');

    /**
     * The value of the password input.
     *
     * @type {Function}
     */
    this.password = Stream(this.attrs.password || '');

    /**
     * The value of the remember me input.
     *
     * @type {Function}
     */
    this.remember = Stream(!!this.attrs.remember);
  }

  className() {
    return 'LogInModal Modal--small';
  }

  title() {
    return app.translator.trans(translationPrefix + 'log_in_with', {server: app.forum.attribute('tituspijean-auth-ldap.method_name')});
  }

  content() {
    return [
      <div className="Modal-body">
        {this.body()}
      </div>,
      <div className="Modal-footer">
        {this.footer()}
      </div>
    ];
  }

  body() {
    return [
      //<LogInButtons/>,

      <div className="Form Form--centered">
        {this.fields().toArray()}
      </div>
    ];
  }

  fields() {
    const items = new ItemList();

    const idLabel = app.translator.trans('core.forum.log_in.username_or_email_placeholder');
    const passwordLabel = app.translator.trans('core.forum.log_in.password_placeholder');

    items.add('identification', <div className="Form-group">
    {idLabel}
      <input className="FormControl" name="identification" type="text" placeholder={idLabel}
        bidi={this.identification}
        disabled={this.attrs.loading} />
    </div>, 30);

    items.add('password', <div className="Form-group">
    {passwordLabel}
      <input className="FormControl" name="password" type="password" placeholder={passwordLabel}
        bidi={this.password}
        disabled={this.attrs.loading} />
    </div>, 20);

    /*items.add('remember', <div className="Form-group">
      <div>
        <label className="checkbox">
          <input type="checkbox" bidi={this.remember} disabled={this.loading} />
          {app.translator.trans('core.forum.log_in.remember_me_label')}
        </label>
      </div>
    </div>, 10);*/

    items.add('submit', <div className="Form-group">
      {Button.component(
        {
          className: 'Button Button--primary Button--block',
          name: 'submit_log_in',
          type: 'submit',
          loading: this.attrs.loading,
        },
        app.translator.trans('core.forum.log_in.submit_button')
      )}
    </div>, -10);

    return items;
  }

  footer() {
    return [
      /*<p className="LogInModal-forgotPassword">
        <a onclick={this.forgotPassword.bind(this)}>{app.translator.trans('core.forum.log_in.forgot_password_link')}</a>
      </p>,

      app.forum.attribute('allowSignUp') ? (
        <p className="LogInModal-signUp">
          {app.translator.trans('core.forum.log_in.sign_up_text', {a: <a onclick={this.signUp.bind(this)}/>})}
        </p>
      ) : ''*/
    ];
  }

  onready() {
    this.$('[name=' + (this.identification() ? 'password' : 'identification') + ']').select();
  }

  /**
   * Attempt to log in a user to LDAP
   */
  login(body, options = {}) {
    return app.request({
      method: 'POST',
      url: app.forum.attribute('baseUrl') + '/auth/ldap',
      body,
      ...options,
    });
  }
 
  onsubmit(e) {
    e.preventDefault();

    this.loading = true;
    $('input[name="identification"]').prop("disabled", true );
    $('input[name="password"]').prop("disabled", true );
    $('button[name="submit_log_in"]').prop("disabled", true );

    const identification = this.identification();
    const password = this.password();
    const remember = this.remember();
    const csrfToken = app.session.csrfToken;
    const data = {
      identification,
      password,
      remember,
      csrfToken
    };
    const options = {
      errorHandler: this.onerror.bind(this),
      modifyText: this.modifyResponse.bind(this),
    };
    this.login(
      data,
      options
    ).catch(() => {});
  }

  /*
   * To ensure the request on complete will re-enable elements on the login popup or enable the sign up modal depending on the response condition.
   */
  modifyResponse(response) {
    $('input[name="identification"]').prop("disabled", false );
    $('input[name="password"]').prop("disabled", false );
    $('button[name="submit_log_in"]').prop("disabled", false );

    if (response.indexOf('app.authenticationComplete') >= 0) {
      response.replace( /(^.*\{|\}.*$)/g, '' );
      var matches = response.match(/[^{\}]+(?=})/g);
      if (matches.length > 0) {
        app.authenticationComplete(JSON.parse("{"+matches[0]+"}"));
      }
    } else if (response.indexOf(app.translator.trans(translationErrorsPrefix+'core_csrf_token_mismatch')) >= 0) {
      // Identify the default csrf_token_mismatch response that is sent in html. Oddly this does not prompt onerror method, will manually invoke onerror method.
      this.onerror({
        alert: {
          content: app.translator.trans(translationErrorsPrefix + 'csrf_token_mismatch'),
          controls: false,
          dismissible: false,
          type: "error"
        },
        status: 400,
        response: {
          errors: [{
            code: 'csrf_token_mismatch',
            status: 400
          }]
        }
      });
    }
    this.loaded();
    return response;
  }

  onerror(error) {
    var code_error = null;
    if (error.response.errors && error.response.errors.length > 0) {
      code_error = error.response.errors[0].code;
    }
    if (error.status === 401) {
      switch(code_error) {
        case 'search_filter_is_invalid':
          error.alert.content = app.translator.trans(translationErrorsPrefix + code_error, {server: app.forum.attribute('tituspijean-auth-ldap.method_name')});
          break;
        case 'not_authenticated':
          error.alert.content = app.translator.trans(translationErrorsPrefix + code_error, {server: app.forum.attribute('tituspijean-auth-ldap.method_name')});
          break;
        case 'account.invalid_inputs':
          error.alert.content = app.translator.trans(translationErrorsPrefix + code_error);
          break;
        case 'account.not_found':
          error.alert.content = app.translator.trans(translationErrorsPrefix + code_error, {server: app.forum.attribute('tituspijean-auth-ldap.method_name')});
          break;
        case 'account.incorrect_details':
          error.alert.content = app.translator.trans(translationErrorsPrefix + code_error);
          break;
        case 'account.password_expired':
          error.alert.content = app.translator.trans(translationErrorsPrefix + code_error);
          break;
        case 'account.disabled':
          error.alert.content = app.translator.trans(translationErrorsPrefix + code_error, {server: app.forum.attribute('tituspijean-auth-ldap.method_name')});
          break;
        case 'account.expired':
          error.alert.content = app.translator.trans(translationErrorsPrefix + code_error, {server: app.forum.attribute('tituspijean-auth-ldap.method_name')});
          break;
        case 'account.locked':
          error.alert.content = app.translator.trans(translationErrorsPrefix + code_error, {server: app.forum.attribute('tituspijean-auth-ldap.method_name')});
          break;
        case 'domains.no_domains':
          error.alert.content = app.translator.trans(translationErrorsPrefix + code_error);
          break;
        case 'domains.empty_host':
          error.alert.content = app.translator.trans(translationErrorsPrefix + code_error, {domain_index: error.response.errors[0].domain_index});
          break;
        case 'domains.empty_base_dn':
          error.alert.content = app.translator.trans(translationErrorsPrefix + code_error, {domain_index: error.response.errors[0].domain_index});
          break;
        case 'domains.empty_user_username':
          error.alert.content = app.translator.trans(translationErrorsPrefix + code_error, {server: app.forum.attribute('tituspijean-auth-ldap.method_name'),
          domain_index: error.response.errors[0].domain_index});
          break;
        case 'domains.empty_search_field':
          error.alert.content = app.translator.trans(translationErrorsPrefix + code_error, {server: app.forum.attribute('tituspijean-auth-ldap.method_name'),
          domain_index: error.response.errors[0].domain_index});
          break;
        case 'domains.username_field_does_not_exist':
          error.alert.content = app.translator.trans(translationErrorsPrefix + code_error, {server: app.forum.attribute('tituspijean-auth-ldap.method_name'),
          data: error.response.errors[0].data,
          domain_index: error.response.errors[0].domain_index});
          break;
        case 'domains.mail_field_does_not_exist':
          error.alert.content = app.translator.trans(translationErrorsPrefix + code_error, {server: app.forum.attribute('tituspijean-auth-ldap.method_name'),
          data: error.response.errors[0].data,
          domain_index: error.response.errors[0].domain_index});
          break;
        default:
          
      }
    }
    super.onerror(error);
  }
}
