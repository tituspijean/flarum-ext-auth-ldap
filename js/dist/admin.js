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

/***/ "./admin.js":
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");
/*
 * This file is part of Flarum.
 *
 * (c) Toby Zerner <toby.zerner@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


/***/ }),

/***/ "./src/admin/components/LDAPSettingsModal.js":
/*!***************************************************!*\
  !*** ./src/admin/components/LDAPSettingsModal.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LDAPSettingsModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/SettingsModal */ "flarum/components/SettingsModal");
/* harmony import */ var flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2__);



var settingsPrefix = 'tituspijean-auth-ldap.';
var translationPrefix = 'tituspijean-auth-ldap.admin.settings.';

var LDAPSettingsModal = /*#__PURE__*/function (_SettingsModal) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__.default)(LDAPSettingsModal, _SettingsModal);

  function LDAPSettingsModal() {
    return _SettingsModal.apply(this, arguments) || this;
  }

  var _proto = LDAPSettingsModal.prototype;

  _proto.title = function title() {
    return app.translator.trans(translationPrefix + 'title');
  };

  _proto.form = function form() {
    return [m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.method_name')), m('input.FormControl', {
      bidi: this.setting(settingsPrefix + 'method_name'),
      placeholder: 'LDAP'
    })]), m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.hosts')), m('input.FormControl', {
      bidi: this.setting(settingsPrefix + 'hosts'),
      placeholder: 'localhost'
    })]), m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.base_dn')), m('input.FormControl', {
      bidi: this.setting(settingsPrefix + 'base_dn'),
      placeholder: 'ou=users,dc=yunohost,dc=org'
    })]), m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.filter')), m('input.FormControl', {
      bidi: this.setting(settingsPrefix + 'filter'),
      placeholder: '(&(objectClass=posixAccount)(permission=cn=flarum.main,ou=permission,dc=yunohost,dc=org)'
    })]), m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.port')), m('input.FormControl', {
      bidi: this.setting(settingsPrefix + 'port'),
      placeholder: '389'
    })]), m('.Form-group', [m('label', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2___default().component({
      state: [true, '1'].indexOf(this.setting(settingsPrefix + 'follow_referrals')()) !== -1,
      onchange: this.setting(settingsPrefix + 'follow_referrals')
    }, app.translator.trans(translationPrefix + 'follow_referrals')))]), m('.Form-group', [m('label', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2___default().component({
      state: [true, '1'].indexOf(this.setting(settingsPrefix + 'use_ssl')()) !== -1,
      onchange: this.setting(settingsPrefix + 'use_ssl')
    }, app.translator.trans(translationPrefix + 'use_ssl')))]), m('.Form-group', [m('label', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2___default().component({
      state: [true, '1'].indexOf(this.setting(settingsPrefix + 'use_tls')()) !== -1,
      onchange: this.setting(settingsPrefix + 'use_tls')
    }, app.translator.trans(translationPrefix + 'use_tls')))]), m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.admin_dn')), m('input.FormControl', {
      bidi: this.setting(settingsPrefix + 'admin_dn'),
      placeholder: 'cn=admin,dc=yunohost,dc=org'
    })]), m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.admin_password')), m('input.FormControl', {
      type: 'password',
      bidi: this.setting(settingsPrefix + 'admin_password'),
      placeholder: 'password'
    })]), m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.search_user_fields')), m('input.FormControl', {
      bidi: this.setting(settingsPrefix + 'search_user_fields'),
      placeholder: 'cn,mail'
    })]), m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.user_mail')), m('input.FormControl', {
      bidi: this.setting(settingsPrefix + 'user_mail'),
      placeholder: 'mail'
    })]), m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.user_username')), m('input.FormControl', {
      bidi: this.setting(settingsPrefix + 'user_username'),
      placeholder: 'uid'
    })]), m('.Form-group', [m('label', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2___default().component({
      state: [true, '1'].indexOf(this.setting(settingsPrefix + 'onlyUse')()) !== -1,
      onchange: this.setting(settingsPrefix + 'onlyUse')
    }, app.translator.trans(translationPrefix + 'onlyUse')))])];
  };

  return LDAPSettingsModal;
}((flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_1___default()));



/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_LDAPSettingsModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/LDAPSettingsModal */ "./src/admin/components/LDAPSettingsModal.js");


flarum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('tituspijean-auth-ldap', function (app) {
  app.extensionSettings['tituspijean-auth-ldap'] = function () {
    return app.modal.show(_components_LDAPSettingsModal__WEBPACK_IMPORTED_MODULE_1__.default);
  };
});

/***/ }),

/***/ "flarum/app":
/*!********************************************!*\
  !*** external "flarum.core.compat['app']" ***!
  \********************************************/
/***/ ((module) => {

module.exports = flarum.core.compat['app'];

/***/ }),

/***/ "flarum/components/SettingsModal":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['components/SettingsModal']" ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = flarum.core.compat['components/SettingsModal'];

/***/ }),

/***/ "flarum/components/Switch":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Switch']" ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = flarum.core.compat['components/Switch'];

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
/******/ 	return __webpack_require__("./admin.js");
/******/ })()
;
//# sourceMappingURL=admin.js.map