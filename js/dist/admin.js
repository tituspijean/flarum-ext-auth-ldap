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
/******/ 	return __webpack_require__(__webpack_require__.s = "./admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./admin.js":
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");
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

/***/ "./src/admin/components/LDAPSettingsModal.js":
/*!***************************************************!*\
  !*** ./src/admin/components/LDAPSettingsModal.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LDAPSettingsModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/SettingsModal */ "flarum/components/SettingsModal");
/* harmony import */ var flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2__);



var settingsPrefix = 'tituspijean-auth-ldap.';
var translationPrefix = 'tituspijean-auth-ldap.admin.settings.';

var LDAPSettingsModal = /*#__PURE__*/function (_SettingsModal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(LDAPSettingsModal, _SettingsModal);

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
    })]), m('.Form-group', [m('label', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      state: [true, '1'].indexOf(this.setting(settingsPrefix + 'follow_referrals')()) !== -1,
      onchange: this.setting(settingsPrefix + 'follow_referrals')
    }, app.translator.trans(translationPrefix + 'follow_referrals')))]), m('.Form-group', [m('label', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      state: [true, '1'].indexOf(this.setting(settingsPrefix + 'use_ssl')()) !== -1,
      onchange: this.setting(settingsPrefix + 'use_ssl')
    }, app.translator.trans(translationPrefix + 'use_ssl')))]), m('.Form-group', [m('label', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2___default.a.component({
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
    })]), m('.Form-group', [m('label', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      state: [true, '1'].indexOf(this.setting(settingsPrefix + 'onlyUse')()) !== -1,
      onchange: this.setting(settingsPrefix + 'onlyUse')
    }, app.translator.trans(translationPrefix + 'onlyUse')))])];
  };

  return LDAPSettingsModal;
}(flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_LDAPSettingsModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/LDAPSettingsModal */ "./src/admin/components/LDAPSettingsModal.js");


flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.initializers.add('tituspijean-auth-ldap', function (app) {
  app.extensionSettings['tituspijean-auth-ldap'] = function () {
    return app.modal.show(_components_LDAPSettingsModal__WEBPACK_IMPORTED_MODULE_1__["default"]);
  };
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

/***/ "flarum/components/SettingsModal":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['components/SettingsModal']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/SettingsModal'];

/***/ }),

/***/ "flarum/components/Switch":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Switch']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Switch'];

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map