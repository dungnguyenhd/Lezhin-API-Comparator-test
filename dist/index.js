!function(n,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e(require("react"));else if("function"==typeof define&&define.amd)define([],e);else{var t="object"==typeof exports?e(require("react")):e(n.React);for(var r in t)("object"==typeof exports?exports:n)[r]=t[r]}}(self,(n=>(()=>{"use strict";var e={579:(n,e,t)=>{var r=t(84);n.exports=r},84:(n,e,t)=>{t.r(e),t.d(e,{default:()=>L});var r=t(250),o=t.n(r),a=function(n){return"array"===n||"[object Array]"===Object.prototype.toString.call(n)},c=function(n){return"[object Object]"===Object.prototype.toString.call(n)},s=function(n){return"array"===n||"object"===n},l=function(n){return 1===n?{textIndent:"20px"}:{textIndent:"".concat(20*n,"px")}},i=function(n){var e=Object.prototype.toString.call(n);return(e=e.match(/(?!\[).+(?=\])/g)[0].split(" ")[1]).toLowerCase()},u=function(n){return c(n)||a(n)},p=function(n,e){return Object.prototype.toString.call(n)===Object.prototype.toString.call(e)};function f(){return f=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},f.apply(this,arguments)}function d(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function m(n){var e,t,c=n.name,s=n.value,i=n.type,u=n.line,p=n.showIndex,m=n.needComma,y=n.level,h=void 0===y?1:y,b=n.lineType,j=n.lastLineType,g=n.lastLine,x=void 0===g?null:g,E=(e=(0,r.useState)(!0),t=2,function(n){if(Array.isArray(n))return n}(e)||function(n,e){var t=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=t){var r,o,a=[],c=!0,s=!1;try{for(t=t.call(n);!(c=(r=t.next()).done)&&(a.push(r.value),!e||a.length!==e);c=!0);}catch(n){s=!0,o=n}finally{try{c||null==t.return||t.return()}finally{if(s)throw o}}return a}}(e,t)||function(n,e){if(n){if("string"==typeof n)return d(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?d(n,e):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),w=E[0],S=E[1];return o().createElement("div",{className:"c-json-line"},o().createElement("p",{className:"c-json-p c-line-".concat(b),onClick:function(){return S(!w)},style:l(h)},o().createElement("span",{className:"c-json-mark"},u),o().createElement("span",{className:"c-of-".concat(b)}),o().createElement("span",{className:"c-json-content"},p&&o().createElement("span",{className:"c-json-key"},c,": "),o().createElement("span",{className:"c-json-pt"},a(i)?"[":"{")),!w&&o().createElement("span",{className:"c-json-pt"},a(i)?"...]":"...}",m?",":"")),o().createElement("div",{style:{display:w?"block":"none"}},s.map((function(n,e){return o().createElement(v,f({key:e,level:h+1},n))})),o().createElement("p",{className:"c-json-feet c-json-p c-line-".concat(b),style:l(h)},x&&o().createElement("span",{className:"c-json-mark"},x),j&&o().createElement("span",{className:"c-of-".concat(j)}),o().createElement("span",{className:"c-json-pt"},a(i)?"]":"}",m?",":""))))}function y(n){var e=n.name,t=n.value,r=n.line,a=n.showIndex,c=n.type,s=n.lineType,i=n.needComma,u=n.level,p=void 0===u?1:u;return o().createElement("p",{className:"c-json-p c-line-".concat(s),style:l(p)},o().createElement("span",{className:"c-json-mark"},r),o().createElement("span",{className:"c-of-".concat(s)}),o().createElement("span",{className:"c-json-content"},a&&o().createElement("span",{className:"c-json-key"},e,": "),o().createElement("span",{className:"c-json-".concat(c)},t),o().createElement("span",{className:"c-json-comma"},i?",":"")))}function v(n){var e=n.type;return s(e)?o().createElement(m,n):o().createElement(y,n)}var h=t(379),b=t.n(h),j=t(795),g=t.n(j),x=t(569),E=t.n(x),w=t(565),S=t.n(w),N=t(216),O=t.n(N),k=t(589),T=t.n(k),A=t(725),I={};function C(){return C=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},C.apply(this,arguments)}function M(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}I.styleTagTransform=T(),I.setAttributes=S(),I.insert=E().bind(null,"head"),I.domAPI=g(),I.insertStyleElement=O(),b()(A.Z,I),A.Z&&A.Z.locals&&A.Z.locals;const L=function(n){var e,t,s=n.oldData,l=n.newData,f=(e=(0,r.useState)([]),t=2,function(n){if(Array.isArray(n))return n}(e)||function(n,e){var t=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=t){var r,o,a=[],c=!0,s=!1;try{for(t=t.call(n);!(c=(r=t.next()).done)&&(a.push(r.value),!e||a.length!==e);c=!0);}catch(n){s=!0,o=n}finally{try{c||null==t.return||t.return()}finally{if(s)throw o}}return a}}(e,t)||function(n,e){if(n){if("string"==typeof n)return M(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?M(n,e):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),d=f[0],m=f[1];return(0,r.useEffect)((function(){var n,e,t,r,o,f;m((t=[],r=1,o=function n(e,t){var o=[];if(u(e)){var a="object"===i(e),c=Object.keys(e),s=c.length;return c.forEach((function(c,l){var p=i(e[c]);o.push({name:c,line:r++,value:n(e[c],t),type:p,showIndex:a,needComma:s!==l+1,lineType:t,lastLineType:t,lastLine:u(e[c])?r++:null})})),o}switch(i(e)){case"number":case"boolean":case"regexp":return e.toString();case"null":return"null";case"undefined":return"undefined";case"function":return" ƒ() {...}";default:return'"'.concat(e.toString(),'"')}},f=function(n,e,t,a,c){return{name:n,line:r++,value:o(e,c),type:i(e),showIndex:t,needComma:a,lineType:c,lastLineType:c,lastLine:u(e)?r++:null}},p(n=s,e=l)&&u(e)?function n(e,t,o){var s=Object.keys(e),l=Object.keys(t),i=c(t),d=s.filter((function(n){return!l.some((function(e){return e===n}))})),m=s.filter((function(n){return l.some((function(e){return e===n}))})),y=l.filter((function(n){return!s.some((function(e){return e===n}))}));d.forEach((function(n,t){var r=!0;0===m.length&&0===y.length&&t===d.length-1&&(r=!1),o.push(f(n,e[n],i,r,"del"))})),m.forEach((function(c,s){var l=!0;if(0===y.length&&s===m.length-1&&(l=!1),e[c]===t[c])o.push(f(c,t[c],i,l,"none"));else if(p(e[c],t[c]))if(u(t[c])){var d=f(c,a(e[c])?[]:{},i,l,"none");o.push(d),r-=1,n(e[c],t[c],d.value),d.lastLine=r++}else o.push(f(c,e[c],i,!0,"del")),o.push(f(c,t[c],i,l,"add"));else o.push(f(c,e[c],i,!0,"del")),o.push(f(c,t[c],i,l,"add"))})),y.forEach((function(n,e){o.push(f(n,t[n],i,y.length!==e+1,"add"))}))}(n,e,t):n===e?t.push(f(0,e,!1,!1,"none")):(t.push(f(0,n,!1,!0,"del")),t.push(f(1,e,!1,!1,"add"))),t))}),[s,l]),o().createElement("pre",{className:"c-json-view"},o().createElement("p",{className:"c-json-outter"},a(l)?"[":"{"),d.map((function(n,e){return o().createElement(v,C({key:e},n))})),o().createElement("p",{className:"c-json-outter"},a(l)?"]":"}"))}},725:(n,e,t)=>{t.d(e,{Z:()=>s});var r=t(81),o=t.n(r),a=t(645),c=t.n(a)()(o());c.push([n.id,".c-json-view {\n  display: block;\n  width: 100%;\n  padding: 10px 10px 10px 40px;\n  background-color: #fbfbfb;\n  box-sizing: border-box;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  overflow: hidden;\n}\n\n.c-json-line,\n.c-json-p,\n.c-json-feet {\n  position: relative;\n  text-align: left;\n  padding: 0;\n  margin: 0;\n  padding: 2px 0;\n}\n\n.c-json-line {\n  padding: 0;\n}\n\n.c-line-del {\n  background-color: #ffeef0;\n}\n\n.c-line-add {\n  background-color: #e6ffed;\n}\n\n.c-line-none {}\n\n.c-of-del:after {\n  content: '-';\n  position: absolute;\n  left: 5px;\n  top: 3px;\n  width: 10px;\n  height: 15px;\n  z-index: 5;\n  text-indent: 0;\n  color: #ff6f6f;\n}\n\n.c-of-add:after {\n  content: '+';\n  position: absolute;\n  left: 5px;\n  top: 3px;\n  width: 10px;\n  height: 15px;\n  z-index: 5;\n  color: #3eb93e;\n  text-indent: 0;\n}\n\n.c-json-p {\n  cursor: pointer;\n}\n\n.c-json-outter {\n  transform: translateX(-35px);\n}\n\n.c-json-mark {\n  position: absolute;\n  left: -30px;\n  top: 2px;\n  text-indent: 0;\n  font-size: 12px;\n  color: #545454;\n  z-index: 5;\n  user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -webkit-user-select: none;\n}\n\n.c-json-content {\n  font-size: 14px;\n}\n\n.c-json-content .c-json-key {\n  font-size: 15px;\n  color: #5cadff;\n}\n\n.c-json-items {\n  color: #b1b1b1;\n}\n\n.c-json-comma {\n  color: #5cadff;\n}\n\n.c-json-pt {\n  color: #5cadff;\n}\n\n.c-json-number {\n  color: #ae81ff;\n}\n\n.c-json-string {\n  color: #a6e22e;\n}\n\n.c-json-null,\n.c-json-boolean,\n.c-json-undefined,\n.c-json-regexp,\n.c-json-date,\n.c-json-set,\n.c-json-map,\n.c-json-error,\n.c-json-symbol,\n.c-json-function {\n  background-color: #f7f7f7;\n  border-radius: 3px;\n  padding: 0px 2px;\n  border: 1px solid #dedede;\n}\n\n.c-json-boolean {\n  color: #6f73ff;\n}\n\n.c-json-null {\n  color: #66d9ef;\n}\n\n.c-json-undefined {\n  color: #f92672;\n}\n\n.c-json-date {\n  color: #09d3ac;\n}\n\n.c-json-regexp {\n  color: #2ea021;\n}\n\n.c-json-function {\n  color: #a2af3d;\n}\n\n.c-json-symbol {\n  color: #fd3db8;\n}\n\n.c-json-error {\n  color: #afafaf;\n}\n\n.c-json-set,\n.c-json-map {\n  color: #f56847;\n}",""]);const s=c},645:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",r=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),r&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),r&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,r,o,a){"string"==typeof n&&(n=[[null,n,void 0]]);var c={};if(r)for(var s=0;s<this.length;s++){var l=this[s][0];null!=l&&(c[l]=!0)}for(var i=0;i<n.length;i++){var u=[].concat(n[i]);r&&c[u[0]]||(void 0!==a&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=a),t&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=t):u[2]=t),o&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=o):u[4]="".concat(o)),e.push(u))}},e}},81:n=>{n.exports=function(n){return n[1]}},379:n=>{var e=[];function t(n){for(var t=-1,r=0;r<e.length;r++)if(e[r].identifier===n){t=r;break}return t}function r(n,r){for(var a={},c=[],s=0;s<n.length;s++){var l=n[s],i=r.base?l[0]+r.base:l[0],u=a[i]||0,p="".concat(i," ").concat(u);a[i]=u+1;var f=t(p),d={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==f)e[f].references++,e[f].updater(d);else{var m=o(d,r);r.byIndex=s,e.splice(s,0,{identifier:p,updater:m,references:1})}c.push(p)}return c}function o(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,o){var a=r(n=n||[],o=o||{});return function(n){n=n||[];for(var c=0;c<a.length;c++){var s=t(a[c]);e[s].references--}for(var l=r(n,o),i=0;i<a.length;i++){var u=t(a[i]);0===e[u].references&&(e[u].updater(),e.splice(u,1))}a=l}}},569:n=>{var e={};n.exports=function(n,t){var r=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},216:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},565:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},795:n=>{n.exports=function(n){var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(r,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},589:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}},250:e=>{e.exports=n}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={id:n,exports:{}};return e[n](a,a.exports,r),a.exports}r.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return r.d(e,{a:e}),e},r.d=(n,e)=>{for(var t in e)r.o(e,t)&&!r.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:e[t]})},r.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),r.r=n=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},r.nc=void 0;var o=r(579);return o.default})()));