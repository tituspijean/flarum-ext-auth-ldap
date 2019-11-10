module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./forum.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./forum.js":
/*!******************!*\
  !*** ./forum.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");
/* empty/unused harmony star reexport *//*
 * This file is part of Flarum.
 *
 * (c) Toby Zerner <toby.zerner@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "./src/forum/components/LDAPLogInModal.js":
/*!************************************************!*\
  !*** ./src/forum/components/LDAPLogInModal.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LDAPLogInModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/SignUpModal */ "flarum/components/SignUpModal");
/* harmony import */ var flarum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_components_LogInButtons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/components/LogInButtons */ "flarum/components/LogInButtons");
/* harmony import */ var flarum_components_LogInButtons__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LogInButtons__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/utils/extractText */ "flarum/utils/extractText");
/* harmony import */ var flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_8__);









var translationPrefix = 'tituspijean-auth-ldap.forum.';

var LDAPLogInModal =
/*#__PURE__*/
function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(LDAPLogInModal, _Modal);

  function LDAPLogInModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = LDAPLogInModal.prototype;

  _proto.init = function init() {
    _Modal.prototype.init.call(this);
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
  };

  _proto.className = function className() {
    return 'LogInModal Modal--small';
  };

  _proto.title = function title() {
    return flarum_app__WEBPACK_IMPORTED_MODULE_2___default.a.translator.trans(translationPrefix + 'log_in_with') + ' ' + flarum_app__WEBPACK_IMPORTED_MODULE_2___default.a.forum.attribute('LDAP_method_name');
  };

  _proto.content = function content() {
    return [m("div", {
      className: "Modal-body"
    }, this.body()), m("div", {
      className: "Modal-footer"
    }, this.footer())];
  };

  _proto.body = function body() {
    return [//<LogInButtons/>,
    m("div", {
      className: "Form Form--centered"
    }, this.fields().toArray())];
  };

  _proto.fields = function fields() {
    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_8___default.a();
    items.add('identification', m("div", {
      className: "Form-group"
    }, m("input", {
      className: "FormControl",
      name: "identification",
      type: "text",
      placeholder: flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_7___default()(flarum_app__WEBPACK_IMPORTED_MODULE_2___default.a.translator.trans('core.forum.log_in.username_or_email_placeholder')),
      bidi: this.identification,
      disabled: this.loading
    })), 30);
    items.add('password', m("div", {
      className: "Form-group"
    }, m("input", {
      className: "FormControl",
      name: "password",
      type: "password",
      placeholder: flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_7___default()(flarum_app__WEBPACK_IMPORTED_MODULE_2___default.a.translator.trans('core.forum.log_in.password_placeholder')),
      bidi: this.password,
      disabled: this.loading
    })), 20);
    /*items.add('remember', <div className="Form-group">
      <div>
        <label className="checkbox">
          <input type="checkbox" bidi={this.remember} disabled={this.loading} />
          {app.translator.trans('core.forum.log_in.remember_me_label')}
        </label>
      </div>
    </div>, 10);*/

    items.add('submit', m("div", {
      className: "Form-group"
    }, flarum_components_Button__WEBPACK_IMPORTED_MODULE_5___default.a.component({
      className: 'Button Button--primary Button--block',
      type: 'submit',
      loading: this.loading,
      children: flarum_app__WEBPACK_IMPORTED_MODULE_2___default.a.translator.trans('core.forum.log_in.submit_button')
    })), -10);
    return items;
  };

  _proto.footer = function footer() {
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
  };

  _proto.onready = function onready() {
    this.$('[name=' + (this.identification() ? 'password' : 'identification') + ']').select();
  };

  _proto.ldaplogin = function ldaplogin(data, options) {
    if (options === void 0) {
      options = {};
    }

    var width = 600;
    var height = 400;
    var $window = $(window);
    var url = flarum_app__WEBPACK_IMPORTED_MODULE_2___default.a.forum.attribute('baseUrl') + '/auth/ldap';
    var name = "ldapauth";
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
    window.open("", name, "width=" + width + "," + ("height=" + height + ",") + ("top=" + ($window.height() / 2 - height / 2) + ",") + ("left=" + ($window.width() / 2 - width / 2) + ",") + 'status=no,scrollbars=no,resizable=no');
    form.submit();
    document.body.removeChild(form);
  };

  _proto.onsubmit = function onsubmit(e) {
    e.preventDefault();
    this.loading = true;
    var identification = this.identification();
    var password = this.password();
    var remember = this.remember();
    var csrfToken = flarum_app__WEBPACK_IMPORTED_MODULE_2___default.a.session.csrfToken;
    this.ldaplogin({
      identification: identification,
      password: password,
      remember: remember,
      csrfToken: csrfToken
    }, {
      errorHandler: this.onerror.bind(this)
    }).then(function () {
      return window.location.reload();
    }, this.loaded.bind(this));
  };

  _proto.onerror = function onerror(error) {
    if (error.status === 401) {
      error.alert.props.children = flarum_app__WEBPACK_IMPORTED_MODULE_2___default.a.translator.trans('core.forum.log_in.invalid_login_message');
    }

    _Modal.prototype.onerror.call(this, error);
  };

  return LDAPLogInModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_3___default.a);



/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/HeaderSecondary */ "flarum/components/HeaderSecondary");
/* harmony import */ var flarum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/SettingsPage */ "flarum/components/SettingsPage");
/* harmony import */ var flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/LogInModal */ "flarum/components/LogInModal");
/* harmony import */ var flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_LDAPLogInModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/LDAPLogInModal */ "./src/forum/components/LDAPLogInModal.js");







var translationPrefix = 'tituspijean-auth-ldap.forum.';
flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.initializers.add('tituspijean-auth-ldap', function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'items', addLoginLink);
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'items', removeIfOnlyUse);
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_5___default.a.prototype, 'content', overrideModal);
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_3___default.a.prototype, 'accountItems', removeProfileActions);
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_3___default.a.prototype, 'settingsItems', checkRemoveAccountSection);

  function overrideModal() {
    if (flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('onlyUseLDAP')) {
      flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_5___default.a.prototype.content = _components_LDAPLogInModal__WEBPACK_IMPORTED_MODULE_6__["default"].prototype.content;
      flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_5___default.a.prototype.title = _components_LDAPLogInModal__WEBPACK_IMPORTED_MODULE_6__["default"].prototype.title;
      flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_5___default.a.prototype.body = _components_LDAPLogInModal__WEBPACK_IMPORTED_MODULE_6__["default"].prototype.body;
      flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_5___default.a.prototype.fields = _components_LDAPLogInModal__WEBPACK_IMPORTED_MODULE_6__["default"].prototype.fields;
      flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_5___default.a.prototype.footer = _components_LDAPLogInModal__WEBPACK_IMPORTED_MODULE_6__["default"].prototype.footer;
      flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_5___default.a.prototype.onsubmit = _components_LDAPLogInModal__WEBPACK_IMPORTED_MODULE_6__["default"].prototype.onsubmit;
    }
  }

  function addLoginLink(items) {
    if (items.has('logIn')) {
      items.add('logInLDAP', flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
        children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans(translationPrefix + 'log_in_with') + ' ' + flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('LDAP_method_name'),
        className: 'Button Button--link',
        onclick: function onclick() {
          return flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.modal.show(new _components_LDAPLogInModal__WEBPACK_IMPORTED_MODULE_6__["default"]());
        }
      }), 0);
    }
  }

  function removeIfOnlyUse(items) {
    if (flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('onlyUseLDAP')) {
      if (items.has('signUp')) {
        items.remove('signUp');
      }

      if (items.has('logIn')) {
        items.remove('logIn');
      }
    }
  }

  function removeProfileActions(items) {
    items.remove('changeEmail');
    items.remove('changePassword');
  }

  function checkRemoveAccountSection(items) {
    if (items.has('account') && items.get('account').props.children.length === 0) {
      items.remove('account');
    }
  }
});

/***/ }),

/***/ "flarum/app":
/*!********************************************!*\
  !*** external "flarum.core.compat['app']" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['app'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/HeaderSecondary":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['components/HeaderSecondary']" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/HeaderSecondary'];

/***/ }),

/***/ "flarum/components/LogInButtons":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['components/LogInButtons']" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/LogInButtons'];

/***/ }),

/***/ "flarum/components/LogInModal":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['components/LogInModal']" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/LogInModal'];

/***/ }),

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Modal'];

/***/ }),

/***/ "flarum/components/SettingsPage":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['components/SettingsPage']" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/SettingsPage'];

/***/ }),

/***/ "flarum/components/SignUpModal":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['components/SignUpModal']" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/SignUpModal'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/utils/ItemList":
/*!*******************************************************!*\
  !*** external "flarum.core.compat['utils/ItemList']" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/ItemList'];

/***/ }),

/***/ "flarum/utils/extractText":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['utils/extractText']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/extractText'];

/***/ })

/******/ });
//# sourceMappingURL=forum.js.map