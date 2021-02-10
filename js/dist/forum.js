module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "./forum.js":
/*!******************!*\
  !*** ./forum.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");
/*
 * This file is part of Flarum.
 *
 * (c) Toby Zerner <toby.zerner@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


/***/ }),

/***/ "./src/forum/components/LDAPLogInModal.js":
/*!************************************************!*\
  !*** ./src/forum/components/LDAPLogInModal.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LDAPLogInModal)
/* harmony export */ });
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
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/utils/Stream */ "flarum/utils/Stream");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_9__);










var translationPrefix = 'tituspijean-auth-ldap.forum.';

var LDAPLogInModal = /*#__PURE__*/function (_Modal) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__.default)(LDAPLogInModal, _Modal);

  function LDAPLogInModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = LDAPLogInModal.prototype;

  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    /**
     * The value of the identification input.
     *
     * @type {Function}
     */


    this.identification = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_9___default()(this.attrs.identification || '');
    /**
     * The value of the password input.
     *
     * @type {Function}
     */

    this.password = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_9___default()(this.attrs.password || '');
    /**
     * The value of the remember me input.
     *
     * @type {Function}
     */

    this.remember = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_9___default()(!!this.attrs.remember);
  };

  _proto.className = function className() {
    return 'LogInModal Modal--small';
  };

  _proto.title = function title() {
    return flarum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans(translationPrefix + 'log_in_with', {
      server: flarum_app__WEBPACK_IMPORTED_MODULE_2___default().forum.attribute('LDAP_method_name')
    });
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
    var items = new (flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_8___default())();
    items.add('identification', m("div", {
      className: "Form-group"
    }, m("input", {
      className: "FormControl",
      name: "identification",
      type: "text",
      placeholder: flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_7___default()(flarum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('core.forum.log_in.username_or_email_placeholder')),
      bidi: this.identification,
      disabled: this.attrs.loading
    })), 30);
    items.add('password', m("div", {
      className: "Form-group"
    }, m("input", {
      className: "FormControl",
      name: "password",
      type: "password",
      placeholder: flarum_utils_extractText__WEBPACK_IMPORTED_MODULE_7___default()(flarum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('core.forum.log_in.password_placeholder')),
      bidi: this.password,
      disabled: this.attrs.loading
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
    }, flarum_components_Button__WEBPACK_IMPORTED_MODULE_5___default().component({
      className: 'Button Button--primary Button--block',
      type: 'submit',
      loading: this.attrs.loading
    }, flarum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('core.forum.log_in.submit_button'))), -10);
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
    var url = flarum_app__WEBPACK_IMPORTED_MODULE_2___default().forum.attribute('baseUrl') + '/auth/ldap';
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
    var csrfToken = (flarum_app__WEBPACK_IMPORTED_MODULE_2___default().session.csrfToken);
    this.ldaplogin({
      identification: identification,
      password: password,
      remember: remember,
      csrfToken: csrfToken
    }, {
      errorHandler: this.onerror.bind(this)
    });
  };

  _proto.onerror = function onerror(error) {
    if (error.status === 401) {
      error.alert.children = flarum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('core.forum.log_in.invalid_login_message');
    }

    _Modal.prototype.onerror.call(this, error);
  };

  return LDAPLogInModal;
}((flarum_components_Modal__WEBPACK_IMPORTED_MODULE_3___default()));



/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
flarum_app__WEBPACK_IMPORTED_MODULE_1___default().initializers.add('tituspijean-auth-ldap', function () {
  (0,flarum_extend__WEBPACK_IMPORTED_MODULE_0__.extend)((flarum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'items', addLoginLink);
  (0,flarum_extend__WEBPACK_IMPORTED_MODULE_0__.extend)((flarum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'items', removeIfOnlyUse);
  (0,flarum_extend__WEBPACK_IMPORTED_MODULE_0__.extend)((flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_5___default().prototype), 'content', overrideModal);
  (0,flarum_extend__WEBPACK_IMPORTED_MODULE_0__.extend)((flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_3___default().prototype), 'accountItems', removeProfileActions);
  (0,flarum_extend__WEBPACK_IMPORTED_MODULE_0__.extend)((flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_3___default().prototype), 'settingsItems', checkRemoveAccountSection);

  function overrideModal() {
    if (flarum_app__WEBPACK_IMPORTED_MODULE_1___default().forum.attribute('onlyUseLDAP')) {
      (flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_5___default().prototype.content) = _components_LDAPLogInModal__WEBPACK_IMPORTED_MODULE_6__.default.prototype.content;
      (flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_5___default().prototype.title) = _components_LDAPLogInModal__WEBPACK_IMPORTED_MODULE_6__.default.prototype.title;
      (flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_5___default().prototype.body) = _components_LDAPLogInModal__WEBPACK_IMPORTED_MODULE_6__.default.prototype.body;
      (flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_5___default().prototype.fields) = _components_LDAPLogInModal__WEBPACK_IMPORTED_MODULE_6__.default.prototype.fields;
      (flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_5___default().prototype.footer) = _components_LDAPLogInModal__WEBPACK_IMPORTED_MODULE_6__.default.prototype.footer;
      (flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_5___default().prototype.onsubmit) = _components_LDAPLogInModal__WEBPACK_IMPORTED_MODULE_6__.default.prototype.onsubmit;
    }
  }

  function addLoginLink(items) {
    if (items.has('logIn')) {
      items.add('logInLDAP', flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default().component({
        className: 'Button Button--link',
        onclick: function onclick() {
          return flarum_app__WEBPACK_IMPORTED_MODULE_1___default().modal.show(_components_LDAPLogInModal__WEBPACK_IMPORTED_MODULE_6__.default);
        }
      }, flarum_app__WEBPACK_IMPORTED_MODULE_1___default().translator.trans(translationPrefix + 'log_in_with', {
        server: flarum_app__WEBPACK_IMPORTED_MODULE_1___default().forum.attribute('LDAP_method_name')
      })), 0);
    }
  }

  function removeIfOnlyUse(items) {
    if (flarum_app__WEBPACK_IMPORTED_MODULE_1___default().forum.attribute('onlyUseLDAP')) {
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
    if (items.has('account') && items.get('account').children.length === 0) {
      items.remove('account');
    }
  }
});

/***/ }),

/***/ "flarum/app":
/*!********************************************!*\
  !*** external "flarum.core.compat['app']" ***!
  \********************************************/
/***/ ((module) => {

module.exports = flarum.core.compat['app'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/HeaderSecondary":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['components/HeaderSecondary']" ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = flarum.core.compat['components/HeaderSecondary'];

/***/ }),

/***/ "flarum/components/LogInButtons":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['components/LogInButtons']" ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = flarum.core.compat['components/LogInButtons'];

/***/ }),

/***/ "flarum/components/LogInModal":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['components/LogInModal']" ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = flarum.core.compat['components/LogInModal'];

/***/ }),

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = flarum.core.compat['components/Modal'];

/***/ }),

/***/ "flarum/components/SettingsPage":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['components/SettingsPage']" ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = flarum.core.compat['components/SettingsPage'];

/***/ }),

/***/ "flarum/components/SignUpModal":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['components/SignUpModal']" ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = flarum.core.compat['components/SignUpModal'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/***/ ((module) => {

module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/utils/ItemList":
/*!*******************************************************!*\
  !*** external "flarum.core.compat['utils/ItemList']" ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = flarum.core.compat['utils/ItemList'];

/***/ }),

/***/ "flarum/utils/Stream":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['utils/Stream']" ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = flarum.core.compat['utils/Stream'];

/***/ }),

/***/ "flarum/utils/extractText":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['utils/extractText']" ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = flarum.core.compat['utils/extractText'];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./forum.js");
/******/ })()
;
//# sourceMappingURL=forum.js.map