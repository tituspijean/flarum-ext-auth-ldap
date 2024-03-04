(()=>{var t={n:e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return t.d(o,{a:o}),o},d:(e,o)=>{for(var n in o)t.o(o,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:o[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};(()=>{"use strict";t.r(e);const o=flarum.core.compat["common/extend"],n=flarum.core.compat["common/app"];var r=t.n(n);const a=flarum.core.compat["components/HeaderSecondary"];var i=t.n(a);const s=flarum.core.compat["components/SettingsPage"];var c=t.n(s);const p=flarum.core.compat["components/Button"];var d=t.n(p);const l=flarum.core.compat["components/LogInModal"];var u=t.n(l);const f=flarum.core.compat["components/SignUpModal"];var h=t.n(f);function _(){return _=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t},_.apply(this,arguments)}function y(t,e){return y=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},y(t,e)}flarum.core.compat.extend;const b=flarum.core.compat.app;var g=t.n(b);const v=flarum.core.compat["components/Modal"];var x=t.n(v);flarum.core.compat["components/LogInButtons"];const k=flarum.core.compat["utils/extractText"];var w=t.n(k);const j=flarum.core.compat["utils/ItemList"];var N=t.n(j);const O=flarum.core.compat["utils/Stream"];var P=t.n(O),I="tituspijean-auth-ldap.forum.errors.",S=function(t){var e,o;function n(){return t.apply(this,arguments)||this}o=t,(e=n).prototype=Object.create(o.prototype),e.prototype.constructor=e,y(e,o);var r=n.prototype;return r.oninit=function(e){t.prototype.oninit.call(this,e),this.identification=P()(this.attrs.identification||""),this.password=P()(this.attrs.password||""),this.remember=P()(!!this.attrs.remember)},r.className=function(){return"LogInModal Modal--small"},r.title=function(){return g().translator.trans("tituspijean-auth-ldap.forum.log_in_with",{server:g().forum.attribute("tituspijean-auth-ldap.method_name")})},r.content=function(){return[m("div",{className:"Modal-body"},this.body()),m("div",{className:"Modal-footer"},this.footer())]},r.body=function(){return[m("div",{className:"Form Form--centered"},this.fields().toArray())]},r.fields=function(){var t=new(N()),e=g().translator.trans("core.forum.log_in.username_or_email_placeholder"),o=g().translator.trans("core.forum.log_in.password_placeholder");return t.add("identification",m("div",{className:"Form-group"},e,m("input",{className:"FormControl",name:"identification",type:"text",placeholder:e,bidi:this.identification,disabled:this.attrs.loading})),30),t.add("password",m("div",{className:"Form-group"},o,m("input",{className:"FormControl",name:"password",type:"password",placeholder:o,bidi:this.password,disabled:this.attrs.loading})),20),t.add("submit",m("div",{className:"Form-group"},d().component({className:"Button Button--primary Button--block",name:"submit_log_in",type:"submit",loading:this.attrs.loading},g().translator.trans("core.forum.log_in.submit_button"))),-10),t},r.footer=function(){return[]},r.onready=function(){this.$("[name="+(this.identification()?"password":"identification")+"]").select()},r.login=function(t,e){return void 0===e&&(e={}),g().request(_({method:"POST",url:g().forum.attribute("baseUrl")+"/auth/ldap",body:t},e))},r.onsubmit=function(t){t.preventDefault(),this.loading=!0,$('input[name="identification"]').prop("disabled",!0),$('input[name="password"]').prop("disabled",!0),$('button[name="submit_log_in"]').prop("disabled",!0);var e={identification:this.identification(),password:this.password(),remember:this.remember(),csrfToken:g().session.csrfToken},o={errorHandler:this.onerror.bind(this),modifyText:this.modifyResponse.bind(this)};this.login(e,o).catch((function(){}))},r.modifyResponse=function(t){if($('input[name="identification"]').prop("disabled",!1),$('input[name="password"]').prop("disabled",!1),$('button[name="submit_log_in"]').prop("disabled",!1),t.indexOf("app.authenticationComplete")>=0){t.replace(/(^.*\{|\}.*$)/g,"");var e=t.match(/[^{\}]+(?=})/g);e.length>0&&g().authenticationComplete(JSON.parse("{"+e[0]+"}"))}else t.indexOf(g().translator.trans(I+"core_csrf_token_mismatch"))>=0&&this.onerror({alert:{content:g().translator.trans(I+"csrf_token_mismatch"),controls:!1,dismissible:!1,type:"error"},status:400,response:{errors:[{code:"csrf_token_mismatch",status:400}]}});return this.loaded(),t},r.onerror=function(e){var o=null;if(e.response.errors&&e.response.errors.length>0&&(o=e.response.errors[0].code),401===e.status)switch(o){case"search_filter_is_invalid":case"not_authenticated":case"account.not_found":case"account.disabled":case"account.expired":case"account.locked":e.alert.content=g().translator.trans(I+o,{server:g().forum.attribute("tituspijean-auth-ldap.method_name")});break;case"account.invalid_inputs":case"account.incorrect_details":case"account.password_expired":case"domains.no_domains":e.alert.content=g().translator.trans(I+o);break;case"domains.empty_host":case"domains.empty_base_dn":e.alert.content=g().translator.trans(I+o,{domain_index:e.response.errors[0].domain_index});break;case"domains.empty_user_username":case"domains.empty_search_field":e.alert.content=g().translator.trans(I+o,{server:g().forum.attribute("tituspijean-auth-ldap.method_name"),domain_index:e.response.errors[0].domain_index});break;case"domains.username_field_does_not_exist":case"domains.mail_field_does_not_exist":e.alert.content=g().translator.trans(I+o,{server:g().forum.attribute("tituspijean-auth-ldap.method_name"),data:e.response.errors[0].data,domain_index:e.response.errors[0].domain_index})}t.prototype.onerror.call(this,e)},n}(x()),M="tituspijean-auth-ldap.forum.";r().initializers.add("tituspijean-auth-ldap",(function(){(0,o.extend)(i().prototype,"items",(function(t){t.has("logIn")&&t.add("logInLDAP",d().component({className:"Button Button--link",onclick:function(){return r().modal.show(S)}},r().translator.trans(M+"log_in_with",{server:r().forum.attribute("tituspijean-auth-ldap.method_name")})),0)})),(0,o.extend)(i().prototype,"items",(function(t){r().forum.attribute("tituspijean-auth-ldap.onlyUse")&&(t.has("signUp")&&t.remove("signUp"),t.has("logIn")&&t.remove("logIn"))})),(0,o.extend)(u().prototype,"content",(function(){r().forum.attribute("tituspijean-auth-ldap.onlyUse")&&(u().prototype.content=S.prototype.content,u().prototype.title=S.prototype.title,u().prototype.body=S.prototype.body,u().prototype.fields=S.prototype.fields,u().prototype.footer=S.prototype.footer,u().prototype.onerror=S.prototype.onerror,u().prototype.onready=S.prototype.onready,u().prototype.onsubmit=S.prototype.onsubmit)})),(0,o.extend)(h().prototype,"fields",(function(t){"nickname"===r().forum.attribute("displayNameDriver")&&this.isProvided("nickname")&&(this.nickname=P()(this.attrs.nickname||""),t.add("nickname",m("div",{className:"Form-group"},m("input",{className:"FormControl",name:"nickname",type:"text",placeholder:w()(r().translator.trans("flarum-nicknames.forum.sign_up.nickname_placeholder")),bidi:this.nickname,disabled:this.loading||this.isProvided("nickname"),required:r().forum.attribute("randomizeUsernameOnRegistration")})),25))})),h().prototype.title=function(){return this.attrs.isLDAP?r().translator.trans(M+"account_found",{server:r().forum.attribute("tituspijean-auth-ldap.method_name")}):r().translator.trans("core.forum.sign_up.title")},h().prototype.footer=function(){return this.attrs.isLDAP?[]:[m("p",{className:"SignUpModal-logIn"},r().translator.trans("core.forum.sign_up.log_in_text",{a:m("a",{onclick:this.logIn.bind(this)})}))]},(0,o.extend)(c().prototype,"accountItems",(function(t){t.remove("changeEmail"),t.remove("changePassword")})),(0,o.extend)(c().prototype,"settingsItems",(function(t){t.has("account")&&0===t.get("account").children.length&&t.remove("account")}))}))})(),module.exports=e})();
//# sourceMappingURL=forum.js.map