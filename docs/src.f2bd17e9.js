parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"FM3j":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setLabels=k;var e=require("./index"),t=document.getElementById("spinner_wheel");t.addEventListener("click",C);var n=t.getContext("2d");function a(){var e=t.parentElement,a=Math.min(e.offsetWidth,e.offsetHeight);t.width=a,t.height=a,n.font="".concat(.022*a,"px Arial")}n.font="15px Arial",n.textBaseline="middle",n.textAlign="center",n.lineWidth=1,a(),window.addEventListener("resize",function(){a(),_()});var l=[["#0c79a8","#0e8ac0","#109cd8","#13acee","#2bb4f0"],["#43cd3e","#56d352","#6ad867","#7edd7b","#92e28f"],["#984907","#b05509","#c9600a","#e16c0b","#f37812"],["#640798","#7409b0","#840ac9","#940be1","#a212f3"]],r=l[Math.floor(Math.random()*l.length)],i="white",o="black",f="transparent",d=2*Math.PI,c=t.width,h=c/2,s=h,u=h,g=h,v=6,b=.991,m=23,M=.4,p=.65,x=5e-4,P=function(e){return 180*e/Math.PI},w=function(e){return e*Math.PI/180},y=[],S=0,T=0,I=0,A=0,E=!1,R=!1;function k(e){if(!E){if(y=e,null==e||0===e.length)return n.clearRect(0,0,c,c),n.translate(h/2,h),n.fillStyle="#ffffff",n.fillText("No items added",g/2,0),void n.translate(-h/2,-h);I=1===y.length?Math.PI:0,S=d/y.length,T=S/2,_()}}function C(){E||null!=y&&0!==y.length&&(I=0,A=Math.random()*p+M,E=!0,L())}function L(){if(E){if((I+=A*=b)>=d&&(I=0),R=I%S<6*A,A<x){E=!1;var t=Math.floor((360-P(I)%360)/P(S));return(0,e.logResult)(y[t]),void _()}_(),requestAnimationFrame(L)}}function _(){n.clearRect(0,0,c,c);for(var e=0;e<y.length;e++){var t=I+S*e;n.beginPath(),n.arc(g,g,g,t,t+S,!1),n.arc(g,g,v,t+S,t,!0);var a=n.createRadialGradient(h,h,0,h,h,2.4*g);a.addColorStop(1,o),a.addColorStop(.3,q(e)),n.fillStyle=a,n.fill(),n.closePath(),n.beginPath(),n.moveTo(c-m,h),n.lineTo(c,h-m),n.lineTo(c,h+m),n.lineTo(c-m,h),n.fillStyle=E?R?i:f:o,n.fill(),n.stroke(),n.closePath(),n.translate(h,h),n.rotate(t+T),n.fillStyle=i,n.fillText(y[e],g/4,0,g),n.rotate(-(t+T)),n.translate(-h,-h)}}function q(e){return 0===e&&(e=Math.floor(r.length/2)),r[e%r.length]}
},{"./index":"Focm"}],"Focm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.clearResults=E,exports.logResult=b;var e=require("./wheel.js");function t(e){return a(e)||o(e)||r(e)||n()}function n(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function r(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}function o(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function a(e){if(Array.isArray(e))return i(e)}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var u=function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:document).getElementById(e)},l=function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:document).getElementsByClassName(e)},c=function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:document).querySelector(e)};function s(e){var t=document.importNode(u("template_option").content,!0),n=c(".wo_input",t);return n.value=e||"",n.addEventListener("blur",y),c(".wo_remove",t).addEventListener("click",m),c(".wo_clear",t).addEventListener("click",p),c(".wo_dupe",t).addEventListener("click",f),t}function d(e,t){var n=s(t);u("options").appendChild(n)}function f(e){var t=s(c(".wo_input",e.target.parentNode).value);u("options").insertBefore(t,e.target.parentNode),y()}function p(e){e.target.parentNode.getElementsByClassName("wo_input")[0].value="",y()}function m(e){var t=e.target.parentNode;t.parentNode.removeChild(t),y()}function v(){Array.from(l("wo_input")).forEach(function(e){e.value=""}),y()}function y(t){t&&t.preventDefault();var n=Array.from(l("wo_input")).reduce(function(e,t){return t&&t.value&&""!=t.value&&e.push(t.value),e},[]);(0,e.setLabels)(n)}u("resetBtn").addEventListener("click",v),u("addBtn").addEventListener("click",d),u("wheelForm").addEventListener("submit",y),u("resultsBtn").addEventListener("click",E),v();var h=new URLSearchParams(window.location.search).get("items"),g=h&&h.length>0?h.split(","):["Spin Again"];(0,e.setLabels)(g);var w=new Array(10-g.length).fill("");function E(){Array.from(l("resultsItem")).forEach(function(e){return e.parentNode.removeChild(e)})}function b(e){var t=document.createElement("li");t.appendChild(document.createTextNode(e)),t.className="resultsItem",u("resultsList").prepend(t)}[].concat(t(g),t(w)).forEach(function(e){return d(null,e)}),E();
},{"./wheel.js":"FM3j"}]},{},["Focm"], null)