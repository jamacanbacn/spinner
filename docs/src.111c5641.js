parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"FM3j":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setLabels=A;var e=require("./index"),t=document.getElementById("spinner_wheel");t.addEventListener("click",C);var l=t.getContext("2d");l.font="20px Arial",l.textBaseline="middle",l.textAlign="center",l.lineWidth=1;var a=[["#b5d801","#87b91b","#6c921e","#4a5f1c","#394719"],["#129fea","#1585be","#1c678d","#1f455a","#1e333f"],["#6712eb","#5b23c3","#4e2a95","#3e2c62","#352b47"],["#ea9612","#c48122","#97682a","#634b2e","#4b3e2f"]],n=a[Math.floor(Math.random()*a.length)],r="white",i="black",o="transparent",f=2*Math.PI,c=t.width,d=c/2,h=d,s=d,u=d,b=6,g=.991,v=23,M=.4,m=.65,x=5e-4,P=function(e){return 180*e/Math.PI},p=function(e){return e*Math.PI/180},y=[],S=0,T=0,I=0,R=0,k=!1,w=!1;function A(e){if(!k){if(y=e,null==e||0===e.length)return l.clearRect(0,0,c,c),l.translate(d/2,d),l.fillStyle="#ffffff",l.fillText("No items added",u/2,0),void l.translate(-d/2,-d);I=1===y.length?Math.PI:0,S=f/y.length,T=S/2,q()}}function C(){k||null!=y&&0!==y.length&&(I=0,R=Math.random()*m+M,k=!0,_())}function _(){if(k){if((I+=R*=g)>=f&&(I=0),w=I%S<6*R,R<x){k=!1;var t=Math.floor((360-P(I)%360)/P(S));return(0,e.logResult)(y[t]),void q()}q(),requestAnimationFrame(_)}}function q(){l.clearRect(0,0,c,c);for(var e=0;e<y.length;e++){var t=I+S*e;l.beginPath(),l.arc(u,u,u,t,t+S,!1),l.arc(u,u,b,t+S,t,!0);var a=l.createRadialGradient(d,d,0,d,d,2.4*u);a.addColorStop(1,i),a.addColorStop(.3,B(e)),l.fillStyle=a,l.fill(),l.closePath(),l.beginPath(),l.moveTo(c-v,d),l.lineTo(c,d-v),l.lineTo(c,d+v),l.lineTo(c-v,d),l.fillStyle=k?w?r:o:i,l.fill(),l.stroke(),l.closePath(),l.translate(d,d),l.rotate(t+T),l.fillStyle=r,l.fillText(y[e],u/2,0,u),l.rotate(-(t+T)),l.translate(-d,-d)}}function B(e){return 0===e&&(e=Math.floor(n.length/2)),n[e%n.length]}
},{"./index":"Focm"}],"Focm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.clearResults=p,exports.logResult=m;var e=require("./wheel.js");function t(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var n=function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:document).getElementById(e)},r=function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:document).getElementsByClassName(e)},o=function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:document).querySelector(e)};function a(e){var t=document.importNode(n("template_option").content,!0),r=o(".wo_input",t);return r.value=e||"",r.addEventListener("blur",s),o(".wo_remove",t).addEventListener("click",c),o(".wo_clear",t).addEventListener("click",l),o(".wo_dupe",t).addEventListener("click",i),t}function u(e,t){var r=a(t);n("options").appendChild(r)}function i(e){var t=a(o(".wo_input",e.target.parentNode).value);n("options").insertBefore(t,e.target.parentNode),s()}function l(e){e.target.parentNode.getElementsByClassName("wo_input")[0].value="",s()}function c(e){var t=e.target.parentNode;t.parentNode.removeChild(t),s()}function d(){Array.from(r("wo_input")).forEach(function(e){e.value=""}),s()}function s(t){t&&t.preventDefault();var n=Array.from(r("wo_input")).reduce(function(e,t){return t&&t.value&&""!=t.value&&e.push(t.value),e},[]);(0,e.setLabels)(n)}n("resetBtn").addEventListener("click",d),n("addBtn").addEventListener("click",u),n("wheelForm").addEventListener("submit",s),d();var v=["Spin Again"];(0,e.setLabels)(v);var f=new Array(15).fill("");function p(){Array.from(r("resultsItem")).forEach(function(e){return e.parentNode.removeChild(e)})}function m(e){var t=document.createElement("li");t.appendChild(document.createTextNode(e)),t.className="resultsItem",n("resultsList").prepend(t)}[].concat(v,t(f)).forEach(function(e){return u(null,e)}),p();
},{"./wheel.js":"FM3j"}]},{},["Focm"], null)