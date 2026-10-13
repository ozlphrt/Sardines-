(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function Hg(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Gg={exports:{}},_c={},Wg={exports:{}},We={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _a=Symbol.for("react.element"),J_=Symbol.for("react.portal"),ex=Symbol.for("react.fragment"),tx=Symbol.for("react.strict_mode"),nx=Symbol.for("react.profiler"),ix=Symbol.for("react.provider"),rx=Symbol.for("react.context"),sx=Symbol.for("react.forward_ref"),ox=Symbol.for("react.suspense"),ax=Symbol.for("react.memo"),lx=Symbol.for("react.lazy"),Uf=Symbol.iterator;function cx(n){return n===null||typeof n!="object"?null:(n=Uf&&n[Uf]||n["@@iterator"],typeof n=="function"?n:null)}var jg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Xg=Object.assign,qg={};function oo(n,e,t){this.props=n,this.context=e,this.refs=qg,this.updater=t||jg}oo.prototype.isReactComponent={};oo.prototype.setState=function(n,e){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,e,"setState")};oo.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function Yg(){}Yg.prototype=oo.prototype;function hh(n,e,t){this.props=n,this.context=e,this.refs=qg,this.updater=t||jg}var fh=hh.prototype=new Yg;fh.constructor=hh;Xg(fh,oo.prototype);fh.isPureReactComponent=!0;var Ff=Array.isArray,$g=Object.prototype.hasOwnProperty,ph={current:null},Kg={key:!0,ref:!0,__self:!0,__source:!0};function Zg(n,e,t){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)$g.call(e,i)&&!Kg.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=t;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(n&&n.defaultProps)for(i in a=n.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:_a,type:n,key:s,ref:o,props:r,_owner:ph.current}}function ux(n,e){return{$$typeof:_a,type:n.type,key:e,ref:n.ref,props:n.props,_owner:n._owner}}function mh(n){return typeof n=="object"&&n!==null&&n.$$typeof===_a}function dx(n){var e={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(t){return e[t]})}var Of=/\/+/g;function Gc(n,e){return typeof n=="object"&&n!==null&&n.key!=null?dx(""+n.key):e.toString(36)}function wl(n,e,t,i,r){var s=typeof n;(s==="undefined"||s==="boolean")&&(n=null);var o=!1;if(n===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(n.$$typeof){case _a:case J_:o=!0}}if(o)return o=n,r=r(o),n=i===""?"."+Gc(o,0):i,Ff(r)?(t="",n!=null&&(t=n.replace(Of,"$&/")+"/"),wl(r,e,t,"",function(c){return c})):r!=null&&(mh(r)&&(r=ux(r,t+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Of,"$&/")+"/")+n)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Ff(n))for(var a=0;a<n.length;a++){s=n[a];var l=i+Gc(s,a);o+=wl(s,e,t,l,r)}else if(l=cx(n),typeof l=="function")for(n=l.call(n),a=0;!(s=n.next()).done;)s=s.value,l=i+Gc(s,a++),o+=wl(s,e,t,l,r);else if(s==="object")throw e=String(n),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Ca(n,e,t){if(n==null)return n;var i=[],r=0;return wl(n,i,"","",function(s){return e.call(t,s,r++)}),i}function hx(n){if(n._status===-1){var e=n._result;e=e(),e.then(function(t){(n._status===0||n._status===-1)&&(n._status=1,n._result=t)},function(t){(n._status===0||n._status===-1)&&(n._status=2,n._result=t)}),n._status===-1&&(n._status=0,n._result=e)}if(n._status===1)return n._result.default;throw n._result}var an={current:null},Tl={transition:null},fx={ReactCurrentDispatcher:an,ReactCurrentBatchConfig:Tl,ReactCurrentOwner:ph};function Qg(){throw Error("act(...) is not supported in production builds of React.")}We.Children={map:Ca,forEach:function(n,e,t){Ca(n,function(){e.apply(this,arguments)},t)},count:function(n){var e=0;return Ca(n,function(){e++}),e},toArray:function(n){return Ca(n,function(e){return e})||[]},only:function(n){if(!mh(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};We.Component=oo;We.Fragment=ex;We.Profiler=nx;We.PureComponent=hh;We.StrictMode=tx;We.Suspense=ox;We.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=fx;We.act=Qg;We.cloneElement=function(n,e,t){if(n==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+n+".");var i=Xg({},n.props),r=n.key,s=n.ref,o=n._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=ph.current),e.key!==void 0&&(r=""+e.key),n.type&&n.type.defaultProps)var a=n.type.defaultProps;for(l in e)$g.call(e,l)&&!Kg.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=t;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:_a,type:n.type,key:r,ref:s,props:i,_owner:o}};We.createContext=function(n){return n={$$typeof:rx,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},n.Provider={$$typeof:ix,_context:n},n.Consumer=n};We.createElement=Zg;We.createFactory=function(n){var e=Zg.bind(null,n);return e.type=n,e};We.createRef=function(){return{current:null}};We.forwardRef=function(n){return{$$typeof:sx,render:n}};We.isValidElement=mh;We.lazy=function(n){return{$$typeof:lx,_payload:{_status:-1,_result:n},_init:hx}};We.memo=function(n,e){return{$$typeof:ax,type:n,compare:e===void 0?null:e}};We.startTransition=function(n){var e=Tl.transition;Tl.transition={};try{n()}finally{Tl.transition=e}};We.unstable_act=Qg;We.useCallback=function(n,e){return an.current.useCallback(n,e)};We.useContext=function(n){return an.current.useContext(n)};We.useDebugValue=function(){};We.useDeferredValue=function(n){return an.current.useDeferredValue(n)};We.useEffect=function(n,e){return an.current.useEffect(n,e)};We.useId=function(){return an.current.useId()};We.useImperativeHandle=function(n,e,t){return an.current.useImperativeHandle(n,e,t)};We.useInsertionEffect=function(n,e){return an.current.useInsertionEffect(n,e)};We.useLayoutEffect=function(n,e){return an.current.useLayoutEffect(n,e)};We.useMemo=function(n,e){return an.current.useMemo(n,e)};We.useReducer=function(n,e,t){return an.current.useReducer(n,e,t)};We.useRef=function(n){return an.current.useRef(n)};We.useState=function(n){return an.current.useState(n)};We.useSyncExternalStore=function(n,e,t){return an.current.useSyncExternalStore(n,e,t)};We.useTransition=function(){return an.current.useTransition()};We.version="18.3.1";Wg.exports=We;var St=Wg.exports;const Jg=Hg(St);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var px=St,mx=Symbol.for("react.element"),gx=Symbol.for("react.fragment"),vx=Object.prototype.hasOwnProperty,_x=px.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,xx={key:!0,ref:!0,__self:!0,__source:!0};function e0(n,e,t){var i,r={},s=null,o=null;t!==void 0&&(s=""+t),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)vx.call(e,i)&&!xx.hasOwnProperty(i)&&(r[i]=e[i]);if(n&&n.defaultProps)for(i in e=n.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:mx,type:n,key:s,ref:o,props:r,_owner:_x.current}}_c.Fragment=gx;_c.jsx=e0;_c.jsxs=e0;Gg.exports=_c;var A=Gg.exports,id={},t0={exports:{}},Cn={},n0={exports:{}},i0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(n){function e(O,G){var z=O.length;O.push(G);e:for(;0<z;){var U=z-1>>>1,k=O[U];if(0<r(k,G))O[U]=G,O[z]=k,z=U;else break e}}function t(O){return O.length===0?null:O[0]}function i(O){if(O.length===0)return null;var G=O[0],z=O.pop();if(z!==G){O[0]=z;e:for(var U=0,k=O.length,ue=k>>>1;U<ue;){var de=2*(U+1)-1,fe=O[de],Se=de+1,De=O[Se];if(0>r(fe,z))Se<k&&0>r(De,fe)?(O[U]=De,O[Se]=z,U=Se):(O[U]=fe,O[de]=z,U=de);else if(Se<k&&0>r(De,z))O[U]=De,O[Se]=z,U=Se;else break e}}return G}function r(O,G){var z=O.sortIndex-G.sortIndex;return z!==0?z:O.id-G.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;n.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();n.unstable_now=function(){return o.now()-a}}var l=[],c=[],u=1,h=null,f=3,m=!1,g=!1,_=!1,p=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(O){for(var G=t(c);G!==null;){if(G.callback===null)i(c);else if(G.startTime<=O)i(c),G.sortIndex=G.expirationTime,e(l,G);else break;G=t(c)}}function y(O){if(_=!1,x(O),!g)if(t(l)!==null)g=!0,Q(M);else{var G=t(c);G!==null&&K(y,G.startTime-O)}}function M(O,G){g=!1,_&&(_=!1,d(I),I=-1),m=!0;var z=f;try{for(x(G),h=t(l);h!==null&&(!(h.expirationTime>G)||O&&!j());){var U=h.callback;if(typeof U=="function"){h.callback=null,f=h.priorityLevel;var k=U(h.expirationTime<=G);G=n.unstable_now(),typeof k=="function"?h.callback=k:h===t(l)&&i(l),x(G)}else i(l);h=t(l)}if(h!==null)var ue=!0;else{var de=t(c);de!==null&&K(y,de.startTime-G),ue=!1}return ue}finally{h=null,f=z,m=!1}}var C=!1,w=null,I=-1,S=5,T=-1;function j(){return!(n.unstable_now()-T<S)}function Y(){if(w!==null){var O=n.unstable_now();T=O;var G=!0;try{G=w(!0,O)}finally{G?Z():(C=!1,w=null)}}else C=!1}var Z;if(typeof v=="function")Z=function(){v(Y)};else if(typeof MessageChannel<"u"){var D=new MessageChannel,H=D.port2;D.port1.onmessage=Y,Z=function(){H.postMessage(null)}}else Z=function(){p(Y,0)};function Q(O){w=O,C||(C=!0,Z())}function K(O,G){I=p(function(){O(n.unstable_now())},G)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(O){O.callback=null},n.unstable_continueExecution=function(){g||m||(g=!0,Q(M))},n.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):S=0<O?Math.floor(1e3/O):5},n.unstable_getCurrentPriorityLevel=function(){return f},n.unstable_getFirstCallbackNode=function(){return t(l)},n.unstable_next=function(O){switch(f){case 1:case 2:case 3:var G=3;break;default:G=f}var z=f;f=G;try{return O()}finally{f=z}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(O,G){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var z=f;f=O;try{return G()}finally{f=z}},n.unstable_scheduleCallback=function(O,G,z){var U=n.unstable_now();switch(typeof z=="object"&&z!==null?(z=z.delay,z=typeof z=="number"&&0<z?U+z:U):z=U,O){case 1:var k=-1;break;case 2:k=250;break;case 5:k=1073741823;break;case 4:k=1e4;break;default:k=5e3}return k=z+k,O={id:u++,callback:G,priorityLevel:O,startTime:z,expirationTime:k,sortIndex:-1},z>U?(O.sortIndex=z,e(c,O),t(l)===null&&O===t(c)&&(_?(d(I),I=-1):_=!0,K(y,z-U))):(O.sortIndex=k,e(l,O),g||m||(g=!0,Q(M))),O},n.unstable_shouldYield=j,n.unstable_wrapCallback=function(O){var G=f;return function(){var z=f;f=G;try{return O.apply(this,arguments)}finally{f=z}}}})(i0);n0.exports=i0;var yx=n0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sx=St,An=yx;function ne(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,t=1;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r0=new Set,Zo={};function jr(n,e){zs(n,e),zs(n+"Capture",e)}function zs(n,e){for(Zo[n]=e,n=0;n<e.length;n++)r0.add(e[n])}var Li=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),rd=Object.prototype.hasOwnProperty,Mx=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,kf={},Bf={};function Ex(n){return rd.call(Bf,n)?!0:rd.call(kf,n)?!1:Mx.test(n)?Bf[n]=!0:(kf[n]=!0,!1)}function wx(n,e,t,i){if(t!==null&&t.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:t!==null?!t.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function Tx(n,e,t,i){if(e===null||typeof e>"u"||wx(n,e,t,i))return!0;if(i)return!1;if(t!==null)switch(t.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function ln(n,e,t,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=t,this.propertyName=n,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Gt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){Gt[n]=new ln(n,0,!1,n,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var e=n[0];Gt[e]=new ln(e,1,!1,n[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(n){Gt[n]=new ln(n,2,!1,n.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){Gt[n]=new ln(n,2,!1,n,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){Gt[n]=new ln(n,3,!1,n.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(n){Gt[n]=new ln(n,3,!0,n,null,!1,!1)});["capture","download"].forEach(function(n){Gt[n]=new ln(n,4,!1,n,null,!1,!1)});["cols","rows","size","span"].forEach(function(n){Gt[n]=new ln(n,6,!1,n,null,!1,!1)});["rowSpan","start"].forEach(function(n){Gt[n]=new ln(n,5,!1,n.toLowerCase(),null,!1,!1)});var gh=/[\-:]([a-z])/g;function vh(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var e=n.replace(gh,vh);Gt[e]=new ln(e,1,!1,n,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var e=n.replace(gh,vh);Gt[e]=new ln(e,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(n){var e=n.replace(gh,vh);Gt[e]=new ln(e,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(n){Gt[n]=new ln(n,1,!1,n.toLowerCase(),null,!1,!1)});Gt.xlinkHref=new ln("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(n){Gt[n]=new ln(n,1,!1,n.toLowerCase(),null,!0,!0)});function _h(n,e,t,i){var r=Gt.hasOwnProperty(e)?Gt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Tx(e,t,r,i)&&(t=null),i||r===null?Ex(e)&&(t===null?n.removeAttribute(e):n.setAttribute(e,""+t)):r.mustUseProperty?n[r.propertyName]=t===null?r.type===3?!1:"":t:(e=r.attributeName,i=r.attributeNamespace,t===null?n.removeAttribute(e):(r=r.type,t=r===3||r===4&&t===!0?"":""+t,i?n.setAttributeNS(i,e,t):n.setAttribute(e,t))))}var Fi=Sx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ra=Symbol.for("react.element"),ps=Symbol.for("react.portal"),ms=Symbol.for("react.fragment"),xh=Symbol.for("react.strict_mode"),sd=Symbol.for("react.profiler"),s0=Symbol.for("react.provider"),o0=Symbol.for("react.context"),yh=Symbol.for("react.forward_ref"),od=Symbol.for("react.suspense"),ad=Symbol.for("react.suspense_list"),Sh=Symbol.for("react.memo"),Wi=Symbol.for("react.lazy"),a0=Symbol.for("react.offscreen"),zf=Symbol.iterator;function vo(n){return n===null||typeof n!="object"?null:(n=zf&&n[zf]||n["@@iterator"],typeof n=="function"?n:null)}var gt=Object.assign,Wc;function No(n){if(Wc===void 0)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/);Wc=e&&e[1]||""}return`
`+Wc+n}var jc=!1;function Xc(n,e){if(!n||jc)return"";jc=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(n,[],e)}else{try{e.call()}catch(c){i=c}n.call(e.prototype)}else{try{throw Error()}catch(c){i=c}n()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return n.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",n.displayName)),l}while(1<=o&&0<=a);break}}}finally{jc=!1,Error.prepareStackTrace=t}return(n=n?n.displayName||n.name:"")?No(n):""}function bx(n){switch(n.tag){case 5:return No(n.type);case 16:return No("Lazy");case 13:return No("Suspense");case 19:return No("SuspenseList");case 0:case 2:case 15:return n=Xc(n.type,!1),n;case 11:return n=Xc(n.type.render,!1),n;case 1:return n=Xc(n.type,!0),n;default:return""}}function ld(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case ms:return"Fragment";case ps:return"Portal";case sd:return"Profiler";case xh:return"StrictMode";case od:return"Suspense";case ad:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case o0:return(n.displayName||"Context")+".Consumer";case s0:return(n._context.displayName||"Context")+".Provider";case yh:var e=n.render;return n=n.displayName,n||(n=e.displayName||e.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case Sh:return e=n.displayName||null,e!==null?e:ld(n.type)||"Memo";case Wi:e=n._payload,n=n._init;try{return ld(n(e))}catch{}}return null}function Ax(n){var e=n.type;switch(n.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=e.render,n=n.displayName||n.name||"",e.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ld(e);case 8:return e===xh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function ur(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function l0(n){var e=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Cx(n){var e=l0(n)?"checked":"value",t=Object.getOwnPropertyDescriptor(n.constructor.prototype,e),i=""+n[e];if(!n.hasOwnProperty(e)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var r=t.get,s=t.set;return Object.defineProperty(n,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(n,e,{enumerable:t.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){n._valueTracker=null,delete n[e]}}}}function Pa(n){n._valueTracker||(n._valueTracker=Cx(n))}function c0(n){if(!n)return!1;var e=n._valueTracker;if(!e)return!0;var t=e.getValue(),i="";return n&&(i=l0(n)?n.checked?"true":"false":n.value),n=i,n!==t?(e.setValue(n),!0):!1}function kl(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function cd(n,e){var t=e.checked;return gt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??n._wrapperState.initialChecked})}function Vf(n,e){var t=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;t=ur(e.value!=null?e.value:t),n._wrapperState={initialChecked:i,initialValue:t,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function u0(n,e){e=e.checked,e!=null&&_h(n,"checked",e,!1)}function ud(n,e){u0(n,e);var t=ur(e.value),i=e.type;if(t!=null)i==="number"?(t===0&&n.value===""||n.value!=t)&&(n.value=""+t):n.value!==""+t&&(n.value=""+t);else if(i==="submit"||i==="reset"){n.removeAttribute("value");return}e.hasOwnProperty("value")?dd(n,e.type,t):e.hasOwnProperty("defaultValue")&&dd(n,e.type,ur(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(n.defaultChecked=!!e.defaultChecked)}function Hf(n,e,t){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+n._wrapperState.initialValue,t||e===n.value||(n.value=e),n.defaultValue=e}t=n.name,t!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,t!==""&&(n.name=t)}function dd(n,e,t){(e!=="number"||kl(n.ownerDocument)!==n)&&(t==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+t&&(n.defaultValue=""+t))}var Do=Array.isArray;function Rs(n,e,t,i){if(n=n.options,e){e={};for(var r=0;r<t.length;r++)e["$"+t[r]]=!0;for(t=0;t<n.length;t++)r=e.hasOwnProperty("$"+n[t].value),n[t].selected!==r&&(n[t].selected=r),r&&i&&(n[t].defaultSelected=!0)}else{for(t=""+ur(t),e=null,r=0;r<n.length;r++){if(n[r].value===t){n[r].selected=!0,i&&(n[r].defaultSelected=!0);return}e!==null||n[r].disabled||(e=n[r])}e!==null&&(e.selected=!0)}}function hd(n,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ne(91));return gt({},e,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function Gf(n,e){var t=e.value;if(t==null){if(t=e.children,e=e.defaultValue,t!=null){if(e!=null)throw Error(ne(92));if(Do(t)){if(1<t.length)throw Error(ne(93));t=t[0]}e=t}e==null&&(e=""),t=e}n._wrapperState={initialValue:ur(t)}}function d0(n,e){var t=ur(e.value),i=ur(e.defaultValue);t!=null&&(t=""+t,t!==n.value&&(n.value=t),e.defaultValue==null&&n.defaultValue!==t&&(n.defaultValue=t)),i!=null&&(n.defaultValue=""+i)}function Wf(n){var e=n.textContent;e===n._wrapperState.initialValue&&e!==""&&e!==null&&(n.value=e)}function h0(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function fd(n,e){return n==null||n==="http://www.w3.org/1999/xhtml"?h0(e):n==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var La,f0=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,t,i,r){MSApp.execUnsafeLocalFunction(function(){return n(e,t,i,r)})}:n}(function(n,e){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=e;else{for(La=La||document.createElement("div"),La.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=La.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;e.firstChild;)n.appendChild(e.firstChild)}});function Qo(n,e){if(e){var t=n.firstChild;if(t&&t===n.lastChild&&t.nodeType===3){t.nodeValue=e;return}}n.textContent=e}var Bo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Rx=["Webkit","ms","Moz","O"];Object.keys(Bo).forEach(function(n){Rx.forEach(function(e){e=e+n.charAt(0).toUpperCase()+n.substring(1),Bo[e]=Bo[n]})});function p0(n,e,t){return e==null||typeof e=="boolean"||e===""?"":t||typeof e!="number"||e===0||Bo.hasOwnProperty(n)&&Bo[n]?(""+e).trim():e+"px"}function m0(n,e){n=n.style;for(var t in e)if(e.hasOwnProperty(t)){var i=t.indexOf("--")===0,r=p0(t,e[t],i);t==="float"&&(t="cssFloat"),i?n.setProperty(t,r):n[t]=r}}var Px=gt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function pd(n,e){if(e){if(Px[n]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ne(137,n));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ne(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ne(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ne(62))}}function md(n,e){if(n.indexOf("-")===-1)return typeof e.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var gd=null;function Mh(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var vd=null,Ps=null,Ls=null;function jf(n){if(n=Sa(n)){if(typeof vd!="function")throw Error(ne(280));var e=n.stateNode;e&&(e=Ec(e),vd(n.stateNode,n.type,e))}}function g0(n){Ps?Ls?Ls.push(n):Ls=[n]:Ps=n}function v0(){if(Ps){var n=Ps,e=Ls;if(Ls=Ps=null,jf(n),e)for(n=0;n<e.length;n++)jf(e[n])}}function _0(n,e){return n(e)}function x0(){}var qc=!1;function y0(n,e,t){if(qc)return n(e,t);qc=!0;try{return _0(n,e,t)}finally{qc=!1,(Ps!==null||Ls!==null)&&(x0(),v0())}}function Jo(n,e){var t=n.stateNode;if(t===null)return null;var i=Ec(t);if(i===null)return null;t=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(n=n.type,i=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!i;break e;default:n=!1}if(n)return null;if(t&&typeof t!="function")throw Error(ne(231,e,typeof t));return t}var _d=!1;if(Li)try{var _o={};Object.defineProperty(_o,"passive",{get:function(){_d=!0}}),window.addEventListener("test",_o,_o),window.removeEventListener("test",_o,_o)}catch{_d=!1}function Lx(n,e,t,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(t,c)}catch(u){this.onError(u)}}var zo=!1,Bl=null,zl=!1,xd=null,Ix={onError:function(n){zo=!0,Bl=n}};function Nx(n,e,t,i,r,s,o,a,l){zo=!1,Bl=null,Lx.apply(Ix,arguments)}function Dx(n,e,t,i,r,s,o,a,l){if(Nx.apply(this,arguments),zo){if(zo){var c=Bl;zo=!1,Bl=null}else throw Error(ne(198));zl||(zl=!0,xd=c)}}function Xr(n){var e=n,t=n;if(n.alternate)for(;e.return;)e=e.return;else{n=e;do e=n,e.flags&4098&&(t=e.return),n=e.return;while(n)}return e.tag===3?t:null}function S0(n){if(n.tag===13){var e=n.memoizedState;if(e===null&&(n=n.alternate,n!==null&&(e=n.memoizedState)),e!==null)return e.dehydrated}return null}function Xf(n){if(Xr(n)!==n)throw Error(ne(188))}function Ux(n){var e=n.alternate;if(!e){if(e=Xr(n),e===null)throw Error(ne(188));return e!==n?null:n}for(var t=n,i=e;;){var r=t.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){t=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===t)return Xf(r),n;if(s===i)return Xf(r),e;s=s.sibling}throw Error(ne(188))}if(t.return!==i.return)t=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===t){o=!0,t=r,i=s;break}if(a===i){o=!0,i=r,t=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===t){o=!0,t=s,i=r;break}if(a===i){o=!0,i=s,t=r;break}a=a.sibling}if(!o)throw Error(ne(189))}}if(t.alternate!==i)throw Error(ne(190))}if(t.tag!==3)throw Error(ne(188));return t.stateNode.current===t?n:e}function M0(n){return n=Ux(n),n!==null?E0(n):null}function E0(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var e=E0(n);if(e!==null)return e;n=n.sibling}return null}var w0=An.unstable_scheduleCallback,qf=An.unstable_cancelCallback,Fx=An.unstable_shouldYield,Ox=An.unstable_requestPaint,Et=An.unstable_now,kx=An.unstable_getCurrentPriorityLevel,Eh=An.unstable_ImmediatePriority,T0=An.unstable_UserBlockingPriority,Vl=An.unstable_NormalPriority,Bx=An.unstable_LowPriority,b0=An.unstable_IdlePriority,xc=null,ui=null;function zx(n){if(ui&&typeof ui.onCommitFiberRoot=="function")try{ui.onCommitFiberRoot(xc,n,void 0,(n.current.flags&128)===128)}catch{}}var Qn=Math.clz32?Math.clz32:Gx,Vx=Math.log,Hx=Math.LN2;function Gx(n){return n>>>=0,n===0?32:31-(Vx(n)/Hx|0)|0}var Ia=64,Na=4194304;function Uo(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function Hl(n,e){var t=n.pendingLanes;if(t===0)return 0;var i=0,r=n.suspendedLanes,s=n.pingedLanes,o=t&268435455;if(o!==0){var a=o&~r;a!==0?i=Uo(a):(s&=o,s!==0&&(i=Uo(s)))}else o=t&~r,o!==0?i=Uo(o):s!==0&&(i=Uo(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=t&16),e=n.entangledLanes,e!==0)for(n=n.entanglements,e&=i;0<e;)t=31-Qn(e),r=1<<t,i|=n[t],e&=~r;return i}function Wx(n,e){switch(n){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function jx(n,e){for(var t=n.suspendedLanes,i=n.pingedLanes,r=n.expirationTimes,s=n.pendingLanes;0<s;){var o=31-Qn(s),a=1<<o,l=r[o];l===-1?(!(a&t)||a&i)&&(r[o]=Wx(a,e)):l<=e&&(n.expiredLanes|=a),s&=~a}}function yd(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function A0(){var n=Ia;return Ia<<=1,!(Ia&4194240)&&(Ia=64),n}function Yc(n){for(var e=[],t=0;31>t;t++)e.push(n);return e}function xa(n,e,t){n.pendingLanes|=e,e!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,e=31-Qn(e),n[e]=t}function Xx(n,e){var t=n.pendingLanes&~e;n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=e,n.mutableReadLanes&=e,n.entangledLanes&=e,e=n.entanglements;var i=n.eventTimes;for(n=n.expirationTimes;0<t;){var r=31-Qn(t),s=1<<r;e[r]=0,i[r]=-1,n[r]=-1,t&=~s}}function wh(n,e){var t=n.entangledLanes|=e;for(n=n.entanglements;t;){var i=31-Qn(t),r=1<<i;r&e|n[i]&e&&(n[i]|=e),t&=~r}}var et=0;function C0(n){return n&=-n,1<n?4<n?n&268435455?16:536870912:4:1}var R0,Th,P0,L0,I0,Sd=!1,Da=[],Ji=null,er=null,tr=null,ea=new Map,ta=new Map,qi=[],qx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Yf(n,e){switch(n){case"focusin":case"focusout":Ji=null;break;case"dragenter":case"dragleave":er=null;break;case"mouseover":case"mouseout":tr=null;break;case"pointerover":case"pointerout":ea.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ta.delete(e.pointerId)}}function xo(n,e,t,i,r,s){return n===null||n.nativeEvent!==s?(n={blockedOn:e,domEventName:t,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Sa(e),e!==null&&Th(e)),n):(n.eventSystemFlags|=i,e=n.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),n)}function Yx(n,e,t,i,r){switch(e){case"focusin":return Ji=xo(Ji,n,e,t,i,r),!0;case"dragenter":return er=xo(er,n,e,t,i,r),!0;case"mouseover":return tr=xo(tr,n,e,t,i,r),!0;case"pointerover":var s=r.pointerId;return ea.set(s,xo(ea.get(s)||null,n,e,t,i,r)),!0;case"gotpointercapture":return s=r.pointerId,ta.set(s,xo(ta.get(s)||null,n,e,t,i,r)),!0}return!1}function N0(n){var e=Pr(n.target);if(e!==null){var t=Xr(e);if(t!==null){if(e=t.tag,e===13){if(e=S0(t),e!==null){n.blockedOn=e,I0(n.priority,function(){P0(t)});return}}else if(e===3&&t.stateNode.current.memoizedState.isDehydrated){n.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}n.blockedOn=null}function bl(n){if(n.blockedOn!==null)return!1;for(var e=n.targetContainers;0<e.length;){var t=Md(n.domEventName,n.eventSystemFlags,e[0],n.nativeEvent);if(t===null){t=n.nativeEvent;var i=new t.constructor(t.type,t);gd=i,t.target.dispatchEvent(i),gd=null}else return e=Sa(t),e!==null&&Th(e),n.blockedOn=t,!1;e.shift()}return!0}function $f(n,e,t){bl(n)&&t.delete(e)}function $x(){Sd=!1,Ji!==null&&bl(Ji)&&(Ji=null),er!==null&&bl(er)&&(er=null),tr!==null&&bl(tr)&&(tr=null),ea.forEach($f),ta.forEach($f)}function yo(n,e){n.blockedOn===e&&(n.blockedOn=null,Sd||(Sd=!0,An.unstable_scheduleCallback(An.unstable_NormalPriority,$x)))}function na(n){function e(r){return yo(r,n)}if(0<Da.length){yo(Da[0],n);for(var t=1;t<Da.length;t++){var i=Da[t];i.blockedOn===n&&(i.blockedOn=null)}}for(Ji!==null&&yo(Ji,n),er!==null&&yo(er,n),tr!==null&&yo(tr,n),ea.forEach(e),ta.forEach(e),t=0;t<qi.length;t++)i=qi[t],i.blockedOn===n&&(i.blockedOn=null);for(;0<qi.length&&(t=qi[0],t.blockedOn===null);)N0(t),t.blockedOn===null&&qi.shift()}var Is=Fi.ReactCurrentBatchConfig,Gl=!0;function Kx(n,e,t,i){var r=et,s=Is.transition;Is.transition=null;try{et=1,bh(n,e,t,i)}finally{et=r,Is.transition=s}}function Zx(n,e,t,i){var r=et,s=Is.transition;Is.transition=null;try{et=4,bh(n,e,t,i)}finally{et=r,Is.transition=s}}function bh(n,e,t,i){if(Gl){var r=Md(n,e,t,i);if(r===null)ru(n,e,i,Wl,t),Yf(n,i);else if(Yx(r,n,e,t,i))i.stopPropagation();else if(Yf(n,i),e&4&&-1<qx.indexOf(n)){for(;r!==null;){var s=Sa(r);if(s!==null&&R0(s),s=Md(n,e,t,i),s===null&&ru(n,e,i,Wl,t),s===r)break;r=s}r!==null&&i.stopPropagation()}else ru(n,e,i,null,t)}}var Wl=null;function Md(n,e,t,i){if(Wl=null,n=Mh(i),n=Pr(n),n!==null)if(e=Xr(n),e===null)n=null;else if(t=e.tag,t===13){if(n=S0(e),n!==null)return n;n=null}else if(t===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;n=null}else e!==n&&(n=null);return Wl=n,null}function D0(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(kx()){case Eh:return 1;case T0:return 4;case Vl:case Bx:return 16;case b0:return 536870912;default:return 16}default:return 16}}var $i=null,Ah=null,Al=null;function U0(){if(Al)return Al;var n,e=Ah,t=e.length,i,r="value"in $i?$i.value:$i.textContent,s=r.length;for(n=0;n<t&&e[n]===r[n];n++);var o=t-n;for(i=1;i<=o&&e[t-i]===r[s-i];i++);return Al=r.slice(n,1<i?1-i:void 0)}function Cl(n){var e=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&e===13&&(n=13)):n=e,n===10&&(n=13),32<=n||n===13?n:0}function Ua(){return!0}function Kf(){return!1}function Rn(n){function e(t,i,r,s,o){this._reactName=t,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in n)n.hasOwnProperty(a)&&(t=n[a],this[a]=t?t(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ua:Kf,this.isPropagationStopped=Kf,this}return gt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Ua)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Ua)},persist:function(){},isPersistent:Ua}),e}var ao={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ch=Rn(ao),ya=gt({},ao,{view:0,detail:0}),Qx=Rn(ya),$c,Kc,So,yc=gt({},ya,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Rh,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==So&&(So&&n.type==="mousemove"?($c=n.screenX-So.screenX,Kc=n.screenY-So.screenY):Kc=$c=0,So=n),$c)},movementY:function(n){return"movementY"in n?n.movementY:Kc}}),Zf=Rn(yc),Jx=gt({},yc,{dataTransfer:0}),ey=Rn(Jx),ty=gt({},ya,{relatedTarget:0}),Zc=Rn(ty),ny=gt({},ao,{animationName:0,elapsedTime:0,pseudoElement:0}),iy=Rn(ny),ry=gt({},ao,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),sy=Rn(ry),oy=gt({},ao,{data:0}),Qf=Rn(oy),ay={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ly={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},cy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function uy(n){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(n):(n=cy[n])?!!e[n]:!1}function Rh(){return uy}var dy=gt({},ya,{key:function(n){if(n.key){var e=ay[n.key]||n.key;if(e!=="Unidentified")return e}return n.type==="keypress"?(n=Cl(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?ly[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Rh,charCode:function(n){return n.type==="keypress"?Cl(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Cl(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),hy=Rn(dy),fy=gt({},yc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Jf=Rn(fy),py=gt({},ya,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Rh}),my=Rn(py),gy=gt({},ao,{propertyName:0,elapsedTime:0,pseudoElement:0}),vy=Rn(gy),_y=gt({},yc,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),xy=Rn(_y),yy=[9,13,27,32],Ph=Li&&"CompositionEvent"in window,Vo=null;Li&&"documentMode"in document&&(Vo=document.documentMode);var Sy=Li&&"TextEvent"in window&&!Vo,F0=Li&&(!Ph||Vo&&8<Vo&&11>=Vo),ep=String.fromCharCode(32),tp=!1;function O0(n,e){switch(n){case"keyup":return yy.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function k0(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var gs=!1;function My(n,e){switch(n){case"compositionend":return k0(e);case"keypress":return e.which!==32?null:(tp=!0,ep);case"textInput":return n=e.data,n===ep&&tp?null:n;default:return null}}function Ey(n,e){if(gs)return n==="compositionend"||!Ph&&O0(n,e)?(n=U0(),Al=Ah=$i=null,gs=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return F0&&e.locale!=="ko"?null:e.data;default:return null}}var wy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function np(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e==="input"?!!wy[n.type]:e==="textarea"}function B0(n,e,t,i){g0(i),e=jl(e,"onChange"),0<e.length&&(t=new Ch("onChange","change",null,t,i),n.push({event:t,listeners:e}))}var Ho=null,ia=null;function Ty(n){K0(n,0)}function Sc(n){var e=xs(n);if(c0(e))return n}function by(n,e){if(n==="change")return e}var z0=!1;if(Li){var Qc;if(Li){var Jc="oninput"in document;if(!Jc){var ip=document.createElement("div");ip.setAttribute("oninput","return;"),Jc=typeof ip.oninput=="function"}Qc=Jc}else Qc=!1;z0=Qc&&(!document.documentMode||9<document.documentMode)}function rp(){Ho&&(Ho.detachEvent("onpropertychange",V0),ia=Ho=null)}function V0(n){if(n.propertyName==="value"&&Sc(ia)){var e=[];B0(e,ia,n,Mh(n)),y0(Ty,e)}}function Ay(n,e,t){n==="focusin"?(rp(),Ho=e,ia=t,Ho.attachEvent("onpropertychange",V0)):n==="focusout"&&rp()}function Cy(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Sc(ia)}function Ry(n,e){if(n==="click")return Sc(e)}function Py(n,e){if(n==="input"||n==="change")return Sc(e)}function Ly(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var ii=typeof Object.is=="function"?Object.is:Ly;function ra(n,e){if(ii(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;var t=Object.keys(n),i=Object.keys(e);if(t.length!==i.length)return!1;for(i=0;i<t.length;i++){var r=t[i];if(!rd.call(e,r)||!ii(n[r],e[r]))return!1}return!0}function sp(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function op(n,e){var t=sp(n);n=0;for(var i;t;){if(t.nodeType===3){if(i=n+t.textContent.length,n<=e&&i>=e)return{node:t,offset:e-n};n=i}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=sp(t)}}function H0(n,e){return n&&e?n===e?!0:n&&n.nodeType===3?!1:e&&e.nodeType===3?H0(n,e.parentNode):"contains"in n?n.contains(e):n.compareDocumentPosition?!!(n.compareDocumentPosition(e)&16):!1:!1}function G0(){for(var n=window,e=kl();e instanceof n.HTMLIFrameElement;){try{var t=typeof e.contentWindow.location.href=="string"}catch{t=!1}if(t)n=e.contentWindow;else break;e=kl(n.document)}return e}function Lh(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e&&(e==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||e==="textarea"||n.contentEditable==="true")}function Iy(n){var e=G0(),t=n.focusedElem,i=n.selectionRange;if(e!==t&&t&&t.ownerDocument&&H0(t.ownerDocument.documentElement,t)){if(i!==null&&Lh(t)){if(e=i.start,n=i.end,n===void 0&&(n=e),"selectionStart"in t)t.selectionStart=e,t.selectionEnd=Math.min(n,t.value.length);else if(n=(e=t.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var r=t.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!n.extend&&s>i&&(r=i,i=s,s=r),r=op(t,s);var o=op(t,i);r&&o&&(n.rangeCount!==1||n.anchorNode!==r.node||n.anchorOffset!==r.offset||n.focusNode!==o.node||n.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),n.removeAllRanges(),s>i?(n.addRange(e),n.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),n.addRange(e)))}}for(e=[],n=t;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<e.length;t++)n=e[t],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Ny=Li&&"documentMode"in document&&11>=document.documentMode,vs=null,Ed=null,Go=null,wd=!1;function ap(n,e,t){var i=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;wd||vs==null||vs!==kl(i)||(i=vs,"selectionStart"in i&&Lh(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Go&&ra(Go,i)||(Go=i,i=jl(Ed,"onSelect"),0<i.length&&(e=new Ch("onSelect","select",null,e,t),n.push({event:e,listeners:i}),e.target=vs)))}function Fa(n,e){var t={};return t[n.toLowerCase()]=e.toLowerCase(),t["Webkit"+n]="webkit"+e,t["Moz"+n]="moz"+e,t}var _s={animationend:Fa("Animation","AnimationEnd"),animationiteration:Fa("Animation","AnimationIteration"),animationstart:Fa("Animation","AnimationStart"),transitionend:Fa("Transition","TransitionEnd")},eu={},W0={};Li&&(W0=document.createElement("div").style,"AnimationEvent"in window||(delete _s.animationend.animation,delete _s.animationiteration.animation,delete _s.animationstart.animation),"TransitionEvent"in window||delete _s.transitionend.transition);function Mc(n){if(eu[n])return eu[n];if(!_s[n])return n;var e=_s[n],t;for(t in e)if(e.hasOwnProperty(t)&&t in W0)return eu[n]=e[t];return n}var j0=Mc("animationend"),X0=Mc("animationiteration"),q0=Mc("animationstart"),Y0=Mc("transitionend"),$0=new Map,lp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function fr(n,e){$0.set(n,e),jr(e,[n])}for(var tu=0;tu<lp.length;tu++){var nu=lp[tu],Dy=nu.toLowerCase(),Uy=nu[0].toUpperCase()+nu.slice(1);fr(Dy,"on"+Uy)}fr(j0,"onAnimationEnd");fr(X0,"onAnimationIteration");fr(q0,"onAnimationStart");fr("dblclick","onDoubleClick");fr("focusin","onFocus");fr("focusout","onBlur");fr(Y0,"onTransitionEnd");zs("onMouseEnter",["mouseout","mouseover"]);zs("onMouseLeave",["mouseout","mouseover"]);zs("onPointerEnter",["pointerout","pointerover"]);zs("onPointerLeave",["pointerout","pointerover"]);jr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));jr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));jr("onBeforeInput",["compositionend","keypress","textInput","paste"]);jr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));jr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));jr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Fo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Fy=new Set("cancel close invalid load scroll toggle".split(" ").concat(Fo));function cp(n,e,t){var i=n.type||"unknown-event";n.currentTarget=t,Dx(i,e,void 0,n),n.currentTarget=null}function K0(n,e){e=(e&4)!==0;for(var t=0;t<n.length;t++){var i=n[t],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;cp(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;cp(r,a,c),s=l}}}if(zl)throw n=xd,zl=!1,xd=null,n}function at(n,e){var t=e[Rd];t===void 0&&(t=e[Rd]=new Set);var i=n+"__bubble";t.has(i)||(Z0(e,n,2,!1),t.add(i))}function iu(n,e,t){var i=0;e&&(i|=4),Z0(t,n,i,e)}var Oa="_reactListening"+Math.random().toString(36).slice(2);function sa(n){if(!n[Oa]){n[Oa]=!0,r0.forEach(function(t){t!=="selectionchange"&&(Fy.has(t)||iu(t,!1,n),iu(t,!0,n))});var e=n.nodeType===9?n:n.ownerDocument;e===null||e[Oa]||(e[Oa]=!0,iu("selectionchange",!1,e))}}function Z0(n,e,t,i){switch(D0(e)){case 1:var r=Kx;break;case 4:r=Zx;break;default:r=bh}t=r.bind(null,e,t,n),r=void 0,!_d||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?n.addEventListener(e,t,{capture:!0,passive:r}):n.addEventListener(e,t,!0):r!==void 0?n.addEventListener(e,t,{passive:r}):n.addEventListener(e,t,!1)}function ru(n,e,t,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=Pr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}y0(function(){var c=s,u=Mh(t),h=[];e:{var f=$0.get(n);if(f!==void 0){var m=Ch,g=n;switch(n){case"keypress":if(Cl(t)===0)break e;case"keydown":case"keyup":m=hy;break;case"focusin":g="focus",m=Zc;break;case"focusout":g="blur",m=Zc;break;case"beforeblur":case"afterblur":m=Zc;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=Zf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=ey;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=my;break;case j0:case X0:case q0:m=iy;break;case Y0:m=vy;break;case"scroll":m=Qx;break;case"wheel":m=xy;break;case"copy":case"cut":case"paste":m=sy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=Jf}var _=(e&4)!==0,p=!_&&n==="scroll",d=_?f!==null?f+"Capture":null:f;_=[];for(var v=c,x;v!==null;){x=v;var y=x.stateNode;if(x.tag===5&&y!==null&&(x=y,d!==null&&(y=Jo(v,d),y!=null&&_.push(oa(v,y,x)))),p)break;v=v.return}0<_.length&&(f=new m(f,g,null,t,u),h.push({event:f,listeners:_}))}}if(!(e&7)){e:{if(f=n==="mouseover"||n==="pointerover",m=n==="mouseout"||n==="pointerout",f&&t!==gd&&(g=t.relatedTarget||t.fromElement)&&(Pr(g)||g[Ii]))break e;if((m||f)&&(f=u.window===u?u:(f=u.ownerDocument)?f.defaultView||f.parentWindow:window,m?(g=t.relatedTarget||t.toElement,m=c,g=g?Pr(g):null,g!==null&&(p=Xr(g),g!==p||g.tag!==5&&g.tag!==6)&&(g=null)):(m=null,g=c),m!==g)){if(_=Zf,y="onMouseLeave",d="onMouseEnter",v="mouse",(n==="pointerout"||n==="pointerover")&&(_=Jf,y="onPointerLeave",d="onPointerEnter",v="pointer"),p=m==null?f:xs(m),x=g==null?f:xs(g),f=new _(y,v+"leave",m,t,u),f.target=p,f.relatedTarget=x,y=null,Pr(u)===c&&(_=new _(d,v+"enter",g,t,u),_.target=x,_.relatedTarget=p,y=_),p=y,m&&g)t:{for(_=m,d=g,v=0,x=_;x;x=qr(x))v++;for(x=0,y=d;y;y=qr(y))x++;for(;0<v-x;)_=qr(_),v--;for(;0<x-v;)d=qr(d),x--;for(;v--;){if(_===d||d!==null&&_===d.alternate)break t;_=qr(_),d=qr(d)}_=null}else _=null;m!==null&&up(h,f,m,_,!1),g!==null&&p!==null&&up(h,p,g,_,!0)}}e:{if(f=c?xs(c):window,m=f.nodeName&&f.nodeName.toLowerCase(),m==="select"||m==="input"&&f.type==="file")var M=by;else if(np(f))if(z0)M=Py;else{M=Cy;var C=Ay}else(m=f.nodeName)&&m.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(M=Ry);if(M&&(M=M(n,c))){B0(h,M,t,u);break e}C&&C(n,f,c),n==="focusout"&&(C=f._wrapperState)&&C.controlled&&f.type==="number"&&dd(f,"number",f.value)}switch(C=c?xs(c):window,n){case"focusin":(np(C)||C.contentEditable==="true")&&(vs=C,Ed=c,Go=null);break;case"focusout":Go=Ed=vs=null;break;case"mousedown":wd=!0;break;case"contextmenu":case"mouseup":case"dragend":wd=!1,ap(h,t,u);break;case"selectionchange":if(Ny)break;case"keydown":case"keyup":ap(h,t,u)}var w;if(Ph)e:{switch(n){case"compositionstart":var I="onCompositionStart";break e;case"compositionend":I="onCompositionEnd";break e;case"compositionupdate":I="onCompositionUpdate";break e}I=void 0}else gs?O0(n,t)&&(I="onCompositionEnd"):n==="keydown"&&t.keyCode===229&&(I="onCompositionStart");I&&(F0&&t.locale!=="ko"&&(gs||I!=="onCompositionStart"?I==="onCompositionEnd"&&gs&&(w=U0()):($i=u,Ah="value"in $i?$i.value:$i.textContent,gs=!0)),C=jl(c,I),0<C.length&&(I=new Qf(I,n,null,t,u),h.push({event:I,listeners:C}),w?I.data=w:(w=k0(t),w!==null&&(I.data=w)))),(w=Sy?My(n,t):Ey(n,t))&&(c=jl(c,"onBeforeInput"),0<c.length&&(u=new Qf("onBeforeInput","beforeinput",null,t,u),h.push({event:u,listeners:c}),u.data=w))}K0(h,e)})}function oa(n,e,t){return{instance:n,listener:e,currentTarget:t}}function jl(n,e){for(var t=e+"Capture",i=[];n!==null;){var r=n,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Jo(n,t),s!=null&&i.unshift(oa(n,s,r)),s=Jo(n,e),s!=null&&i.push(oa(n,s,r))),n=n.return}return i}function qr(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function up(n,e,t,i,r){for(var s=e._reactName,o=[];t!==null&&t!==i;){var a=t,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=Jo(t,s),l!=null&&o.unshift(oa(t,l,a))):r||(l=Jo(t,s),l!=null&&o.push(oa(t,l,a)))),t=t.return}o.length!==0&&n.push({event:e,listeners:o})}var Oy=/\r\n?/g,ky=/\u0000|\uFFFD/g;function dp(n){return(typeof n=="string"?n:""+n).replace(Oy,`
`).replace(ky,"")}function ka(n,e,t){if(e=dp(e),dp(n)!==e&&t)throw Error(ne(425))}function Xl(){}var Td=null,bd=null;function Ad(n,e){return n==="textarea"||n==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Cd=typeof setTimeout=="function"?setTimeout:void 0,By=typeof clearTimeout=="function"?clearTimeout:void 0,hp=typeof Promise=="function"?Promise:void 0,zy=typeof queueMicrotask=="function"?queueMicrotask:typeof hp<"u"?function(n){return hp.resolve(null).then(n).catch(Vy)}:Cd;function Vy(n){setTimeout(function(){throw n})}function su(n,e){var t=e,i=0;do{var r=t.nextSibling;if(n.removeChild(t),r&&r.nodeType===8)if(t=r.data,t==="/$"){if(i===0){n.removeChild(r),na(e);return}i--}else t!=="$"&&t!=="$?"&&t!=="$!"||i++;t=r}while(t);na(e)}function nr(n){for(;n!=null;n=n.nextSibling){var e=n.nodeType;if(e===1||e===3)break;if(e===8){if(e=n.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return n}function fp(n){n=n.previousSibling;for(var e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="$"||t==="$!"||t==="$?"){if(e===0)return n;e--}else t==="/$"&&e++}n=n.previousSibling}return null}var lo=Math.random().toString(36).slice(2),li="__reactFiber$"+lo,aa="__reactProps$"+lo,Ii="__reactContainer$"+lo,Rd="__reactEvents$"+lo,Hy="__reactListeners$"+lo,Gy="__reactHandles$"+lo;function Pr(n){var e=n[li];if(e)return e;for(var t=n.parentNode;t;){if(e=t[Ii]||t[li]){if(t=e.alternate,e.child!==null||t!==null&&t.child!==null)for(n=fp(n);n!==null;){if(t=n[li])return t;n=fp(n)}return e}n=t,t=n.parentNode}return null}function Sa(n){return n=n[li]||n[Ii],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function xs(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(ne(33))}function Ec(n){return n[aa]||null}var Pd=[],ys=-1;function pr(n){return{current:n}}function ct(n){0>ys||(n.current=Pd[ys],Pd[ys]=null,ys--)}function st(n,e){ys++,Pd[ys]=n.current,n.current=e}var dr={},Qt=pr(dr),pn=pr(!1),kr=dr;function Vs(n,e){var t=n.type.contextTypes;if(!t)return dr;var i=n.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in t)r[s]=e[s];return i&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=e,n.__reactInternalMemoizedMaskedChildContext=r),r}function mn(n){return n=n.childContextTypes,n!=null}function ql(){ct(pn),ct(Qt)}function pp(n,e,t){if(Qt.current!==dr)throw Error(ne(168));st(Qt,e),st(pn,t)}function Q0(n,e,t){var i=n.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return t;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ne(108,Ax(n)||"Unknown",r));return gt({},t,i)}function Yl(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||dr,kr=Qt.current,st(Qt,n),st(pn,pn.current),!0}function mp(n,e,t){var i=n.stateNode;if(!i)throw Error(ne(169));t?(n=Q0(n,e,kr),i.__reactInternalMemoizedMergedChildContext=n,ct(pn),ct(Qt),st(Qt,n)):ct(pn),st(pn,t)}var wi=null,wc=!1,ou=!1;function J0(n){wi===null?wi=[n]:wi.push(n)}function Wy(n){wc=!0,J0(n)}function mr(){if(!ou&&wi!==null){ou=!0;var n=0,e=et;try{var t=wi;for(et=1;n<t.length;n++){var i=t[n];do i=i(!0);while(i!==null)}wi=null,wc=!1}catch(r){throw wi!==null&&(wi=wi.slice(n+1)),w0(Eh,mr),r}finally{et=e,ou=!1}}return null}var Ss=[],Ms=0,$l=null,Kl=0,Dn=[],Un=0,Br=null,bi=1,Ai="";function Tr(n,e){Ss[Ms++]=Kl,Ss[Ms++]=$l,$l=n,Kl=e}function ev(n,e,t){Dn[Un++]=bi,Dn[Un++]=Ai,Dn[Un++]=Br,Br=n;var i=bi;n=Ai;var r=32-Qn(i)-1;i&=~(1<<r),t+=1;var s=32-Qn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,bi=1<<32-Qn(e)+r|t<<r|i,Ai=s+n}else bi=1<<s|t<<r|i,Ai=n}function Ih(n){n.return!==null&&(Tr(n,1),ev(n,1,0))}function Nh(n){for(;n===$l;)$l=Ss[--Ms],Ss[Ms]=null,Kl=Ss[--Ms],Ss[Ms]=null;for(;n===Br;)Br=Dn[--Un],Dn[Un]=null,Ai=Dn[--Un],Dn[Un]=null,bi=Dn[--Un],Dn[Un]=null}var Tn=null,wn=null,dt=!1,Kn=null;function tv(n,e){var t=kn(5,null,null,0);t.elementType="DELETED",t.stateNode=e,t.return=n,e=n.deletions,e===null?(n.deletions=[t],n.flags|=16):e.push(t)}function gp(n,e){switch(n.tag){case 5:var t=n.type;return e=e.nodeType!==1||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(n.stateNode=e,Tn=n,wn=nr(e.firstChild),!0):!1;case 6:return e=n.pendingProps===""||e.nodeType!==3?null:e,e!==null?(n.stateNode=e,Tn=n,wn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(t=Br!==null?{id:bi,overflow:Ai}:null,n.memoizedState={dehydrated:e,treeContext:t,retryLane:1073741824},t=kn(18,null,null,0),t.stateNode=e,t.return=n,n.child=t,Tn=n,wn=null,!0):!1;default:return!1}}function Ld(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Id(n){if(dt){var e=wn;if(e){var t=e;if(!gp(n,e)){if(Ld(n))throw Error(ne(418));e=nr(t.nextSibling);var i=Tn;e&&gp(n,e)?tv(i,t):(n.flags=n.flags&-4097|2,dt=!1,Tn=n)}}else{if(Ld(n))throw Error(ne(418));n.flags=n.flags&-4097|2,dt=!1,Tn=n}}}function vp(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Tn=n}function Ba(n){if(n!==Tn)return!1;if(!dt)return vp(n),dt=!0,!1;var e;if((e=n.tag!==3)&&!(e=n.tag!==5)&&(e=n.type,e=e!=="head"&&e!=="body"&&!Ad(n.type,n.memoizedProps)),e&&(e=wn)){if(Ld(n))throw nv(),Error(ne(418));for(;e;)tv(n,e),e=nr(e.nextSibling)}if(vp(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(ne(317));e:{for(n=n.nextSibling,e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="/$"){if(e===0){wn=nr(n.nextSibling);break e}e--}else t!=="$"&&t!=="$!"&&t!=="$?"||e++}n=n.nextSibling}wn=null}}else wn=Tn?nr(n.stateNode.nextSibling):null;return!0}function nv(){for(var n=wn;n;)n=nr(n.nextSibling)}function Hs(){wn=Tn=null,dt=!1}function Dh(n){Kn===null?Kn=[n]:Kn.push(n)}var jy=Fi.ReactCurrentBatchConfig;function Mo(n,e,t){if(n=t.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(ne(309));var i=t.stateNode}if(!i)throw Error(ne(147,n));var r=i,s=""+n;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof n!="string")throw Error(ne(284));if(!t._owner)throw Error(ne(290,n))}return n}function za(n,e){throw n=Object.prototype.toString.call(e),Error(ne(31,n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function _p(n){var e=n._init;return e(n._payload)}function iv(n){function e(d,v){if(n){var x=d.deletions;x===null?(d.deletions=[v],d.flags|=16):x.push(v)}}function t(d,v){if(!n)return null;for(;v!==null;)e(d,v),v=v.sibling;return null}function i(d,v){for(d=new Map;v!==null;)v.key!==null?d.set(v.key,v):d.set(v.index,v),v=v.sibling;return d}function r(d,v){return d=or(d,v),d.index=0,d.sibling=null,d}function s(d,v,x){return d.index=x,n?(x=d.alternate,x!==null?(x=x.index,x<v?(d.flags|=2,v):x):(d.flags|=2,v)):(d.flags|=1048576,v)}function o(d){return n&&d.alternate===null&&(d.flags|=2),d}function a(d,v,x,y){return v===null||v.tag!==6?(v=fu(x,d.mode,y),v.return=d,v):(v=r(v,x),v.return=d,v)}function l(d,v,x,y){var M=x.type;return M===ms?u(d,v,x.props.children,y,x.key):v!==null&&(v.elementType===M||typeof M=="object"&&M!==null&&M.$$typeof===Wi&&_p(M)===v.type)?(y=r(v,x.props),y.ref=Mo(d,v,x),y.return=d,y):(y=Ul(x.type,x.key,x.props,null,d.mode,y),y.ref=Mo(d,v,x),y.return=d,y)}function c(d,v,x,y){return v===null||v.tag!==4||v.stateNode.containerInfo!==x.containerInfo||v.stateNode.implementation!==x.implementation?(v=pu(x,d.mode,y),v.return=d,v):(v=r(v,x.children||[]),v.return=d,v)}function u(d,v,x,y,M){return v===null||v.tag!==7?(v=Dr(x,d.mode,y,M),v.return=d,v):(v=r(v,x),v.return=d,v)}function h(d,v,x){if(typeof v=="string"&&v!==""||typeof v=="number")return v=fu(""+v,d.mode,x),v.return=d,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Ra:return x=Ul(v.type,v.key,v.props,null,d.mode,x),x.ref=Mo(d,null,v),x.return=d,x;case ps:return v=pu(v,d.mode,x),v.return=d,v;case Wi:var y=v._init;return h(d,y(v._payload),x)}if(Do(v)||vo(v))return v=Dr(v,d.mode,x,null),v.return=d,v;za(d,v)}return null}function f(d,v,x,y){var M=v!==null?v.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return M!==null?null:a(d,v,""+x,y);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Ra:return x.key===M?l(d,v,x,y):null;case ps:return x.key===M?c(d,v,x,y):null;case Wi:return M=x._init,f(d,v,M(x._payload),y)}if(Do(x)||vo(x))return M!==null?null:u(d,v,x,y,null);za(d,x)}return null}function m(d,v,x,y,M){if(typeof y=="string"&&y!==""||typeof y=="number")return d=d.get(x)||null,a(v,d,""+y,M);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Ra:return d=d.get(y.key===null?x:y.key)||null,l(v,d,y,M);case ps:return d=d.get(y.key===null?x:y.key)||null,c(v,d,y,M);case Wi:var C=y._init;return m(d,v,x,C(y._payload),M)}if(Do(y)||vo(y))return d=d.get(x)||null,u(v,d,y,M,null);za(v,y)}return null}function g(d,v,x,y){for(var M=null,C=null,w=v,I=v=0,S=null;w!==null&&I<x.length;I++){w.index>I?(S=w,w=null):S=w.sibling;var T=f(d,w,x[I],y);if(T===null){w===null&&(w=S);break}n&&w&&T.alternate===null&&e(d,w),v=s(T,v,I),C===null?M=T:C.sibling=T,C=T,w=S}if(I===x.length)return t(d,w),dt&&Tr(d,I),M;if(w===null){for(;I<x.length;I++)w=h(d,x[I],y),w!==null&&(v=s(w,v,I),C===null?M=w:C.sibling=w,C=w);return dt&&Tr(d,I),M}for(w=i(d,w);I<x.length;I++)S=m(w,d,I,x[I],y),S!==null&&(n&&S.alternate!==null&&w.delete(S.key===null?I:S.key),v=s(S,v,I),C===null?M=S:C.sibling=S,C=S);return n&&w.forEach(function(j){return e(d,j)}),dt&&Tr(d,I),M}function _(d,v,x,y){var M=vo(x);if(typeof M!="function")throw Error(ne(150));if(x=M.call(x),x==null)throw Error(ne(151));for(var C=M=null,w=v,I=v=0,S=null,T=x.next();w!==null&&!T.done;I++,T=x.next()){w.index>I?(S=w,w=null):S=w.sibling;var j=f(d,w,T.value,y);if(j===null){w===null&&(w=S);break}n&&w&&j.alternate===null&&e(d,w),v=s(j,v,I),C===null?M=j:C.sibling=j,C=j,w=S}if(T.done)return t(d,w),dt&&Tr(d,I),M;if(w===null){for(;!T.done;I++,T=x.next())T=h(d,T.value,y),T!==null&&(v=s(T,v,I),C===null?M=T:C.sibling=T,C=T);return dt&&Tr(d,I),M}for(w=i(d,w);!T.done;I++,T=x.next())T=m(w,d,I,T.value,y),T!==null&&(n&&T.alternate!==null&&w.delete(T.key===null?I:T.key),v=s(T,v,I),C===null?M=T:C.sibling=T,C=T);return n&&w.forEach(function(Y){return e(d,Y)}),dt&&Tr(d,I),M}function p(d,v,x,y){if(typeof x=="object"&&x!==null&&x.type===ms&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case Ra:e:{for(var M=x.key,C=v;C!==null;){if(C.key===M){if(M=x.type,M===ms){if(C.tag===7){t(d,C.sibling),v=r(C,x.props.children),v.return=d,d=v;break e}}else if(C.elementType===M||typeof M=="object"&&M!==null&&M.$$typeof===Wi&&_p(M)===C.type){t(d,C.sibling),v=r(C,x.props),v.ref=Mo(d,C,x),v.return=d,d=v;break e}t(d,C);break}else e(d,C);C=C.sibling}x.type===ms?(v=Dr(x.props.children,d.mode,y,x.key),v.return=d,d=v):(y=Ul(x.type,x.key,x.props,null,d.mode,y),y.ref=Mo(d,v,x),y.return=d,d=y)}return o(d);case ps:e:{for(C=x.key;v!==null;){if(v.key===C)if(v.tag===4&&v.stateNode.containerInfo===x.containerInfo&&v.stateNode.implementation===x.implementation){t(d,v.sibling),v=r(v,x.children||[]),v.return=d,d=v;break e}else{t(d,v);break}else e(d,v);v=v.sibling}v=pu(x,d.mode,y),v.return=d,d=v}return o(d);case Wi:return C=x._init,p(d,v,C(x._payload),y)}if(Do(x))return g(d,v,x,y);if(vo(x))return _(d,v,x,y);za(d,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,v!==null&&v.tag===6?(t(d,v.sibling),v=r(v,x),v.return=d,d=v):(t(d,v),v=fu(x,d.mode,y),v.return=d,d=v),o(d)):t(d,v)}return p}var Gs=iv(!0),rv=iv(!1),Zl=pr(null),Ql=null,Es=null,Uh=null;function Fh(){Uh=Es=Ql=null}function Oh(n){var e=Zl.current;ct(Zl),n._currentValue=e}function Nd(n,e,t){for(;n!==null;){var i=n.alternate;if((n.childLanes&e)!==e?(n.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),n===t)break;n=n.return}}function Ns(n,e){Ql=n,Uh=Es=null,n=n.dependencies,n!==null&&n.firstContext!==null&&(n.lanes&e&&(fn=!0),n.firstContext=null)}function zn(n){var e=n._currentValue;if(Uh!==n)if(n={context:n,memoizedValue:e,next:null},Es===null){if(Ql===null)throw Error(ne(308));Es=n,Ql.dependencies={lanes:0,firstContext:n}}else Es=Es.next=n;return e}var Lr=null;function kh(n){Lr===null?Lr=[n]:Lr.push(n)}function sv(n,e,t,i){var r=e.interleaved;return r===null?(t.next=t,kh(e)):(t.next=r.next,r.next=t),e.interleaved=t,Ni(n,i)}function Ni(n,e){n.lanes|=e;var t=n.alternate;for(t!==null&&(t.lanes|=e),t=n,n=n.return;n!==null;)n.childLanes|=e,t=n.alternate,t!==null&&(t.childLanes|=e),t=n,n=n.return;return t.tag===3?t.stateNode:null}var ji=!1;function Bh(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ov(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Pi(n,e){return{eventTime:n,lane:e,tag:0,payload:null,callback:null,next:null}}function ir(n,e,t){var i=n.updateQueue;if(i===null)return null;if(i=i.shared,Ze&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Ni(n,t)}return r=i.interleaved,r===null?(e.next=e,kh(i)):(e.next=r.next,r.next=e),i.interleaved=e,Ni(n,t)}function Rl(n,e,t){if(e=e.updateQueue,e!==null&&(e=e.shared,(t&4194240)!==0)){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,wh(n,t)}}function xp(n,e){var t=n.updateQueue,i=n.alternate;if(i!==null&&(i=i.updateQueue,t===i)){var r=null,s=null;if(t=t.firstBaseUpdate,t!==null){do{var o={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};s===null?r=s=o:s=s.next=o,t=t.next}while(t!==null);s===null?r=s=e:s=s.next=e}else r=s=e;t={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},n.updateQueue=t;return}n=t.lastBaseUpdate,n===null?t.firstBaseUpdate=e:n.next=e,t.lastBaseUpdate=e}function Jl(n,e,t,i){var r=n.updateQueue;ji=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var u=n.alternate;u!==null&&(u=u.updateQueue,a=u.lastBaseUpdate,a!==o&&(a===null?u.firstBaseUpdate=c:a.next=c,u.lastBaseUpdate=l))}if(s!==null){var h=r.baseState;o=0,u=c=l=null,a=s;do{var f=a.lane,m=a.eventTime;if((i&f)===f){u!==null&&(u=u.next={eventTime:m,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var g=n,_=a;switch(f=e,m=t,_.tag){case 1:if(g=_.payload,typeof g=="function"){h=g.call(m,h,f);break e}h=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=_.payload,f=typeof g=="function"?g.call(m,h,f):g,f==null)break e;h=gt({},h,f);break e;case 2:ji=!0}}a.callback!==null&&a.lane!==0&&(n.flags|=64,f=r.effects,f===null?r.effects=[a]:f.push(a))}else m={eventTime:m,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},u===null?(c=u=m,l=h):u=u.next=m,o|=f;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;f=a,a=f.next,f.next=null,r.lastBaseUpdate=f,r.shared.pending=null}}while(1);if(u===null&&(l=h),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=u,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Vr|=o,n.lanes=o,n.memoizedState=h}}function yp(n,e,t){if(n=e.effects,e.effects=null,n!==null)for(e=0;e<n.length;e++){var i=n[e],r=i.callback;if(r!==null){if(i.callback=null,i=t,typeof r!="function")throw Error(ne(191,r));r.call(i)}}}var Ma={},di=pr(Ma),la=pr(Ma),ca=pr(Ma);function Ir(n){if(n===Ma)throw Error(ne(174));return n}function zh(n,e){switch(st(ca,e),st(la,n),st(di,Ma),n=e.nodeType,n){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:fd(null,"");break;default:n=n===8?e.parentNode:e,e=n.namespaceURI||null,n=n.tagName,e=fd(e,n)}ct(di),st(di,e)}function Ws(){ct(di),ct(la),ct(ca)}function av(n){Ir(ca.current);var e=Ir(di.current),t=fd(e,n.type);e!==t&&(st(la,n),st(di,t))}function Vh(n){la.current===n&&(ct(di),ct(la))}var pt=pr(0);function ec(n){for(var e=n;e!==null;){if(e.tag===13){var t=e.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var au=[];function Hh(){for(var n=0;n<au.length;n++)au[n]._workInProgressVersionPrimary=null;au.length=0}var Pl=Fi.ReactCurrentDispatcher,lu=Fi.ReactCurrentBatchConfig,zr=0,mt=null,Rt=null,Ft=null,tc=!1,Wo=!1,ua=0,Xy=0;function Xt(){throw Error(ne(321))}function Gh(n,e){if(e===null)return!1;for(var t=0;t<e.length&&t<n.length;t++)if(!ii(n[t],e[t]))return!1;return!0}function Wh(n,e,t,i,r,s){if(zr=s,mt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Pl.current=n===null||n.memoizedState===null?Ky:Zy,n=t(i,r),Wo){s=0;do{if(Wo=!1,ua=0,25<=s)throw Error(ne(301));s+=1,Ft=Rt=null,e.updateQueue=null,Pl.current=Qy,n=t(i,r)}while(Wo)}if(Pl.current=nc,e=Rt!==null&&Rt.next!==null,zr=0,Ft=Rt=mt=null,tc=!1,e)throw Error(ne(300));return n}function jh(){var n=ua!==0;return ua=0,n}function oi(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ft===null?mt.memoizedState=Ft=n:Ft=Ft.next=n,Ft}function Vn(){if(Rt===null){var n=mt.alternate;n=n!==null?n.memoizedState:null}else n=Rt.next;var e=Ft===null?mt.memoizedState:Ft.next;if(e!==null)Ft=e,Rt=n;else{if(n===null)throw Error(ne(310));Rt=n,n={memoizedState:Rt.memoizedState,baseState:Rt.baseState,baseQueue:Rt.baseQueue,queue:Rt.queue,next:null},Ft===null?mt.memoizedState=Ft=n:Ft=Ft.next=n}return Ft}function da(n,e){return typeof e=="function"?e(n):e}function cu(n){var e=Vn(),t=e.queue;if(t===null)throw Error(ne(311));t.lastRenderedReducer=n;var i=Rt,r=i.baseQueue,s=t.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,t.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var u=c.lane;if((zr&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:n(i,c.action);else{var h={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=h,o=i):l=l.next=h,mt.lanes|=u,Vr|=u}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,ii(i,e.memoizedState)||(fn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,t.lastRenderedState=i}if(n=t.interleaved,n!==null){r=n;do s=r.lane,mt.lanes|=s,Vr|=s,r=r.next;while(r!==n)}else r===null&&(t.lanes=0);return[e.memoizedState,t.dispatch]}function uu(n){var e=Vn(),t=e.queue;if(t===null)throw Error(ne(311));t.lastRenderedReducer=n;var i=t.dispatch,r=t.pending,s=e.memoizedState;if(r!==null){t.pending=null;var o=r=r.next;do s=n(s,o.action),o=o.next;while(o!==r);ii(s,e.memoizedState)||(fn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),t.lastRenderedState=s}return[s,i]}function lv(){}function cv(n,e){var t=mt,i=Vn(),r=e(),s=!ii(i.memoizedState,r);if(s&&(i.memoizedState=r,fn=!0),i=i.queue,Xh(hv.bind(null,t,i,n),[n]),i.getSnapshot!==e||s||Ft!==null&&Ft.memoizedState.tag&1){if(t.flags|=2048,ha(9,dv.bind(null,t,i,r,e),void 0,null),Ot===null)throw Error(ne(349));zr&30||uv(t,e,r)}return r}function uv(n,e,t){n.flags|=16384,n={getSnapshot:e,value:t},e=mt.updateQueue,e===null?(e={lastEffect:null,stores:null},mt.updateQueue=e,e.stores=[n]):(t=e.stores,t===null?e.stores=[n]:t.push(n))}function dv(n,e,t,i){e.value=t,e.getSnapshot=i,fv(e)&&pv(n)}function hv(n,e,t){return t(function(){fv(e)&&pv(n)})}function fv(n){var e=n.getSnapshot;n=n.value;try{var t=e();return!ii(n,t)}catch{return!0}}function pv(n){var e=Ni(n,1);e!==null&&Jn(e,n,1,-1)}function Sp(n){var e=oi();return typeof n=="function"&&(n=n()),e.memoizedState=e.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:da,lastRenderedState:n},e.queue=n,n=n.dispatch=$y.bind(null,mt,n),[e.memoizedState,n]}function ha(n,e,t,i){return n={tag:n,create:e,destroy:t,deps:i,next:null},e=mt.updateQueue,e===null?(e={lastEffect:null,stores:null},mt.updateQueue=e,e.lastEffect=n.next=n):(t=e.lastEffect,t===null?e.lastEffect=n.next=n:(i=t.next,t.next=n,n.next=i,e.lastEffect=n)),n}function mv(){return Vn().memoizedState}function Ll(n,e,t,i){var r=oi();mt.flags|=n,r.memoizedState=ha(1|e,t,void 0,i===void 0?null:i)}function Tc(n,e,t,i){var r=Vn();i=i===void 0?null:i;var s=void 0;if(Rt!==null){var o=Rt.memoizedState;if(s=o.destroy,i!==null&&Gh(i,o.deps)){r.memoizedState=ha(e,t,s,i);return}}mt.flags|=n,r.memoizedState=ha(1|e,t,s,i)}function Mp(n,e){return Ll(8390656,8,n,e)}function Xh(n,e){return Tc(2048,8,n,e)}function gv(n,e){return Tc(4,2,n,e)}function vv(n,e){return Tc(4,4,n,e)}function _v(n,e){if(typeof e=="function")return n=n(),e(n),function(){e(null)};if(e!=null)return n=n(),e.current=n,function(){e.current=null}}function xv(n,e,t){return t=t!=null?t.concat([n]):null,Tc(4,4,_v.bind(null,e,n),t)}function qh(){}function yv(n,e){var t=Vn();e=e===void 0?null:e;var i=t.memoizedState;return i!==null&&e!==null&&Gh(e,i[1])?i[0]:(t.memoizedState=[n,e],n)}function Sv(n,e){var t=Vn();e=e===void 0?null:e;var i=t.memoizedState;return i!==null&&e!==null&&Gh(e,i[1])?i[0]:(n=n(),t.memoizedState=[n,e],n)}function Mv(n,e,t){return zr&21?(ii(t,e)||(t=A0(),mt.lanes|=t,Vr|=t,n.baseState=!0),e):(n.baseState&&(n.baseState=!1,fn=!0),n.memoizedState=t)}function qy(n,e){var t=et;et=t!==0&&4>t?t:4,n(!0);var i=lu.transition;lu.transition={};try{n(!1),e()}finally{et=t,lu.transition=i}}function Ev(){return Vn().memoizedState}function Yy(n,e,t){var i=sr(n);if(t={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null},wv(n))Tv(e,t);else if(t=sv(n,e,t,i),t!==null){var r=on();Jn(t,n,i,r),bv(t,e,i)}}function $y(n,e,t){var i=sr(n),r={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null};if(wv(n))Tv(e,r);else{var s=n.alternate;if(n.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,t);if(r.hasEagerState=!0,r.eagerState=a,ii(a,o)){var l=e.interleaved;l===null?(r.next=r,kh(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}t=sv(n,e,r,i),t!==null&&(r=on(),Jn(t,n,i,r),bv(t,e,i))}}function wv(n){var e=n.alternate;return n===mt||e!==null&&e===mt}function Tv(n,e){Wo=tc=!0;var t=n.pending;t===null?e.next=e:(e.next=t.next,t.next=e),n.pending=e}function bv(n,e,t){if(t&4194240){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,wh(n,t)}}var nc={readContext:zn,useCallback:Xt,useContext:Xt,useEffect:Xt,useImperativeHandle:Xt,useInsertionEffect:Xt,useLayoutEffect:Xt,useMemo:Xt,useReducer:Xt,useRef:Xt,useState:Xt,useDebugValue:Xt,useDeferredValue:Xt,useTransition:Xt,useMutableSource:Xt,useSyncExternalStore:Xt,useId:Xt,unstable_isNewReconciler:!1},Ky={readContext:zn,useCallback:function(n,e){return oi().memoizedState=[n,e===void 0?null:e],n},useContext:zn,useEffect:Mp,useImperativeHandle:function(n,e,t){return t=t!=null?t.concat([n]):null,Ll(4194308,4,_v.bind(null,e,n),t)},useLayoutEffect:function(n,e){return Ll(4194308,4,n,e)},useInsertionEffect:function(n,e){return Ll(4,2,n,e)},useMemo:function(n,e){var t=oi();return e=e===void 0?null:e,n=n(),t.memoizedState=[n,e],n},useReducer:function(n,e,t){var i=oi();return e=t!==void 0?t(e):e,i.memoizedState=i.baseState=e,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:e},i.queue=n,n=n.dispatch=Yy.bind(null,mt,n),[i.memoizedState,n]},useRef:function(n){var e=oi();return n={current:n},e.memoizedState=n},useState:Sp,useDebugValue:qh,useDeferredValue:function(n){return oi().memoizedState=n},useTransition:function(){var n=Sp(!1),e=n[0];return n=qy.bind(null,n[1]),oi().memoizedState=n,[e,n]},useMutableSource:function(){},useSyncExternalStore:function(n,e,t){var i=mt,r=oi();if(dt){if(t===void 0)throw Error(ne(407));t=t()}else{if(t=e(),Ot===null)throw Error(ne(349));zr&30||uv(i,e,t)}r.memoizedState=t;var s={value:t,getSnapshot:e};return r.queue=s,Mp(hv.bind(null,i,s,n),[n]),i.flags|=2048,ha(9,dv.bind(null,i,s,t,e),void 0,null),t},useId:function(){var n=oi(),e=Ot.identifierPrefix;if(dt){var t=Ai,i=bi;t=(i&~(1<<32-Qn(i)-1)).toString(32)+t,e=":"+e+"R"+t,t=ua++,0<t&&(e+="H"+t.toString(32)),e+=":"}else t=Xy++,e=":"+e+"r"+t.toString(32)+":";return n.memoizedState=e},unstable_isNewReconciler:!1},Zy={readContext:zn,useCallback:yv,useContext:zn,useEffect:Xh,useImperativeHandle:xv,useInsertionEffect:gv,useLayoutEffect:vv,useMemo:Sv,useReducer:cu,useRef:mv,useState:function(){return cu(da)},useDebugValue:qh,useDeferredValue:function(n){var e=Vn();return Mv(e,Rt.memoizedState,n)},useTransition:function(){var n=cu(da)[0],e=Vn().memoizedState;return[n,e]},useMutableSource:lv,useSyncExternalStore:cv,useId:Ev,unstable_isNewReconciler:!1},Qy={readContext:zn,useCallback:yv,useContext:zn,useEffect:Xh,useImperativeHandle:xv,useInsertionEffect:gv,useLayoutEffect:vv,useMemo:Sv,useReducer:uu,useRef:mv,useState:function(){return uu(da)},useDebugValue:qh,useDeferredValue:function(n){var e=Vn();return Rt===null?e.memoizedState=n:Mv(e,Rt.memoizedState,n)},useTransition:function(){var n=uu(da)[0],e=Vn().memoizedState;return[n,e]},useMutableSource:lv,useSyncExternalStore:cv,useId:Ev,unstable_isNewReconciler:!1};function Yn(n,e){if(n&&n.defaultProps){e=gt({},e),n=n.defaultProps;for(var t in n)e[t]===void 0&&(e[t]=n[t]);return e}return e}function Dd(n,e,t,i){e=n.memoizedState,t=t(i,e),t=t==null?e:gt({},e,t),n.memoizedState=t,n.lanes===0&&(n.updateQueue.baseState=t)}var bc={isMounted:function(n){return(n=n._reactInternals)?Xr(n)===n:!1},enqueueSetState:function(n,e,t){n=n._reactInternals;var i=on(),r=sr(n),s=Pi(i,r);s.payload=e,t!=null&&(s.callback=t),e=ir(n,s,r),e!==null&&(Jn(e,n,r,i),Rl(e,n,r))},enqueueReplaceState:function(n,e,t){n=n._reactInternals;var i=on(),r=sr(n),s=Pi(i,r);s.tag=1,s.payload=e,t!=null&&(s.callback=t),e=ir(n,s,r),e!==null&&(Jn(e,n,r,i),Rl(e,n,r))},enqueueForceUpdate:function(n,e){n=n._reactInternals;var t=on(),i=sr(n),r=Pi(t,i);r.tag=2,e!=null&&(r.callback=e),e=ir(n,r,i),e!==null&&(Jn(e,n,i,t),Rl(e,n,i))}};function Ep(n,e,t,i,r,s,o){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!ra(t,i)||!ra(r,s):!0}function Av(n,e,t){var i=!1,r=dr,s=e.contextType;return typeof s=="object"&&s!==null?s=zn(s):(r=mn(e)?kr:Qt.current,i=e.contextTypes,s=(i=i!=null)?Vs(n,r):dr),e=new e(t,s),n.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=bc,n.stateNode=e,e._reactInternals=n,i&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=r,n.__reactInternalMemoizedMaskedChildContext=s),e}function wp(n,e,t,i){n=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(t,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(t,i),e.state!==n&&bc.enqueueReplaceState(e,e.state,null)}function Ud(n,e,t,i){var r=n.stateNode;r.props=t,r.state=n.memoizedState,r.refs={},Bh(n);var s=e.contextType;typeof s=="object"&&s!==null?r.context=zn(s):(s=mn(e)?kr:Qt.current,r.context=Vs(n,s)),r.state=n.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Dd(n,e,s,t),r.state=n.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&bc.enqueueReplaceState(r,r.state,null),Jl(n,t,r,i),r.state=n.memoizedState),typeof r.componentDidMount=="function"&&(n.flags|=4194308)}function js(n,e){try{var t="",i=e;do t+=bx(i),i=i.return;while(i);var r=t}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:n,source:e,stack:r,digest:null}}function du(n,e,t){return{value:n,source:null,stack:t??null,digest:e??null}}function Fd(n,e){try{console.error(e.value)}catch(t){setTimeout(function(){throw t})}}var Jy=typeof WeakMap=="function"?WeakMap:Map;function Cv(n,e,t){t=Pi(-1,t),t.tag=3,t.payload={element:null};var i=e.value;return t.callback=function(){rc||(rc=!0,Xd=i),Fd(n,e)},t}function Rv(n,e,t){t=Pi(-1,t),t.tag=3;var i=n.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;t.payload=function(){return i(r)},t.callback=function(){Fd(n,e)}}var s=n.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(t.callback=function(){Fd(n,e),typeof i!="function"&&(rr===null?rr=new Set([this]):rr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),t}function Tp(n,e,t){var i=n.pingCache;if(i===null){i=n.pingCache=new Jy;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(t)||(r.add(t),n=fS.bind(null,n,e,t),e.then(n,n))}function bp(n){do{var e;if((e=n.tag===13)&&(e=n.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return n;n=n.return}while(n!==null);return null}function Ap(n,e,t,i,r){return n.mode&1?(n.flags|=65536,n.lanes=r,n):(n===e?n.flags|=65536:(n.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(e=Pi(-1,1),e.tag=2,ir(t,e,1))),t.lanes|=1),n)}var eS=Fi.ReactCurrentOwner,fn=!1;function rn(n,e,t,i){e.child=n===null?rv(e,null,t,i):Gs(e,n.child,t,i)}function Cp(n,e,t,i,r){t=t.render;var s=e.ref;return Ns(e,r),i=Wh(n,e,t,i,s,r),t=jh(),n!==null&&!fn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~r,Di(n,e,r)):(dt&&t&&Ih(e),e.flags|=1,rn(n,e,i,r),e.child)}function Rp(n,e,t,i,r){if(n===null){var s=t.type;return typeof s=="function"&&!tf(s)&&s.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(e.tag=15,e.type=s,Pv(n,e,s,i,r)):(n=Ul(t.type,null,i,e,e.mode,r),n.ref=e.ref,n.return=e,e.child=n)}if(s=n.child,!(n.lanes&r)){var o=s.memoizedProps;if(t=t.compare,t=t!==null?t:ra,t(o,i)&&n.ref===e.ref)return Di(n,e,r)}return e.flags|=1,n=or(s,i),n.ref=e.ref,n.return=e,e.child=n}function Pv(n,e,t,i,r){if(n!==null){var s=n.memoizedProps;if(ra(s,i)&&n.ref===e.ref)if(fn=!1,e.pendingProps=i=s,(n.lanes&r)!==0)n.flags&131072&&(fn=!0);else return e.lanes=n.lanes,Di(n,e,r)}return Od(n,e,t,i,r)}function Lv(n,e,t){var i=e.pendingProps,r=i.children,s=n!==null?n.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},st(Ts,En),En|=t;else{if(!(t&1073741824))return n=s!==null?s.baseLanes|t:t,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:n,cachePool:null,transitions:null},e.updateQueue=null,st(Ts,En),En|=n,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:t,st(Ts,En),En|=i}else s!==null?(i=s.baseLanes|t,e.memoizedState=null):i=t,st(Ts,En),En|=i;return rn(n,e,r,t),e.child}function Iv(n,e){var t=e.ref;(n===null&&t!==null||n!==null&&n.ref!==t)&&(e.flags|=512,e.flags|=2097152)}function Od(n,e,t,i,r){var s=mn(t)?kr:Qt.current;return s=Vs(e,s),Ns(e,r),t=Wh(n,e,t,i,s,r),i=jh(),n!==null&&!fn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~r,Di(n,e,r)):(dt&&i&&Ih(e),e.flags|=1,rn(n,e,t,r),e.child)}function Pp(n,e,t,i,r){if(mn(t)){var s=!0;Yl(e)}else s=!1;if(Ns(e,r),e.stateNode===null)Il(n,e),Av(e,t,i),Ud(e,t,i,r),i=!0;else if(n===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=t.contextType;typeof c=="object"&&c!==null?c=zn(c):(c=mn(t)?kr:Qt.current,c=Vs(e,c));var u=t.getDerivedStateFromProps,h=typeof u=="function"||typeof o.getSnapshotBeforeUpdate=="function";h||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&wp(e,o,i,c),ji=!1;var f=e.memoizedState;o.state=f,Jl(e,i,o,r),l=e.memoizedState,a!==i||f!==l||pn.current||ji?(typeof u=="function"&&(Dd(e,t,u,i),l=e.memoizedState),(a=ji||Ep(e,t,a,i,f,l,c))?(h||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,ov(n,e),a=e.memoizedProps,c=e.type===e.elementType?a:Yn(e.type,a),o.props=c,h=e.pendingProps,f=o.context,l=t.contextType,typeof l=="object"&&l!==null?l=zn(l):(l=mn(t)?kr:Qt.current,l=Vs(e,l));var m=t.getDerivedStateFromProps;(u=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==h||f!==l)&&wp(e,o,i,l),ji=!1,f=e.memoizedState,o.state=f,Jl(e,i,o,r);var g=e.memoizedState;a!==h||f!==g||pn.current||ji?(typeof m=="function"&&(Dd(e,t,m,i),g=e.memoizedState),(c=ji||Ep(e,t,c,i,f,g,l)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,g,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,g,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===n.memoizedProps&&f===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&f===n.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=g),o.props=i,o.state=g,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===n.memoizedProps&&f===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&f===n.memoizedState||(e.flags|=1024),i=!1)}return kd(n,e,t,i,s,r)}function kd(n,e,t,i,r,s){Iv(n,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&mp(e,t,!1),Di(n,e,s);i=e.stateNode,eS.current=e;var a=o&&typeof t.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,n!==null&&o?(e.child=Gs(e,n.child,null,s),e.child=Gs(e,null,a,s)):rn(n,e,a,s),e.memoizedState=i.state,r&&mp(e,t,!0),e.child}function Nv(n){var e=n.stateNode;e.pendingContext?pp(n,e.pendingContext,e.pendingContext!==e.context):e.context&&pp(n,e.context,!1),zh(n,e.containerInfo)}function Lp(n,e,t,i,r){return Hs(),Dh(r),e.flags|=256,rn(n,e,t,i),e.child}var Bd={dehydrated:null,treeContext:null,retryLane:0};function zd(n){return{baseLanes:n,cachePool:null,transitions:null}}function Dv(n,e,t){var i=e.pendingProps,r=pt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=n!==null&&n.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(n===null||n.memoizedState!==null)&&(r|=1),st(pt,r&1),n===null)return Id(e),n=e.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?(e.mode&1?n.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,n=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Rc(o,i,0,null),n=Dr(n,i,t,null),s.return=e,n.return=e,s.sibling=n,e.child=s,e.child.memoizedState=zd(t),e.memoizedState=Bd,n):Yh(e,o));if(r=n.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return tS(n,e,o,i,a,r,t);if(s){s=i.fallback,o=e.mode,r=n.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=or(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=or(a,s):(s=Dr(s,o,t,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=n.child.memoizedState,o=o===null?zd(t):{baseLanes:o.baseLanes|t,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=n.childLanes&~t,e.memoizedState=Bd,i}return s=n.child,n=s.sibling,i=or(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=t),i.return=e,i.sibling=null,n!==null&&(t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)),e.child=i,e.memoizedState=null,i}function Yh(n,e){return e=Rc({mode:"visible",children:e},n.mode,0,null),e.return=n,n.child=e}function Va(n,e,t,i){return i!==null&&Dh(i),Gs(e,n.child,null,t),n=Yh(e,e.pendingProps.children),n.flags|=2,e.memoizedState=null,n}function tS(n,e,t,i,r,s,o){if(t)return e.flags&256?(e.flags&=-257,i=du(Error(ne(422))),Va(n,e,o,i)):e.memoizedState!==null?(e.child=n.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=Rc({mode:"visible",children:i.children},r,0,null),s=Dr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Gs(e,n.child,null,o),e.child.memoizedState=zd(o),e.memoizedState=Bd,s);if(!(e.mode&1))return Va(n,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(ne(419)),i=du(s,i,void 0),Va(n,e,o,i)}if(a=(o&n.childLanes)!==0,fn||a){if(i=Ot,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Ni(n,r),Jn(i,n,r,-1))}return ef(),i=du(Error(ne(421))),Va(n,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=n.child,e=pS.bind(null,n),r._reactRetry=e,null):(n=s.treeContext,wn=nr(r.nextSibling),Tn=e,dt=!0,Kn=null,n!==null&&(Dn[Un++]=bi,Dn[Un++]=Ai,Dn[Un++]=Br,bi=n.id,Ai=n.overflow,Br=e),e=Yh(e,i.children),e.flags|=4096,e)}function Ip(n,e,t){n.lanes|=e;var i=n.alternate;i!==null&&(i.lanes|=e),Nd(n.return,e,t)}function hu(n,e,t,i,r){var s=n.memoizedState;s===null?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:t,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=t,s.tailMode=r)}function Uv(n,e,t){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(rn(n,e,i.children,t),i=pt.current,i&2)i=i&1|2,e.flags|=128;else{if(n!==null&&n.flags&128)e:for(n=e.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Ip(n,t,e);else if(n.tag===19)Ip(n,t,e);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}i&=1}if(st(pt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(t=e.child,r=null;t!==null;)n=t.alternate,n!==null&&ec(n)===null&&(r=t),t=t.sibling;t=r,t===null?(r=e.child,e.child=null):(r=t.sibling,t.sibling=null),hu(e,!1,r,t,s);break;case"backwards":for(t=null,r=e.child,e.child=null;r!==null;){if(n=r.alternate,n!==null&&ec(n)===null){e.child=r;break}n=r.sibling,r.sibling=t,t=r,r=n}hu(e,!0,t,null,s);break;case"together":hu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Il(n,e){!(e.mode&1)&&n!==null&&(n.alternate=null,e.alternate=null,e.flags|=2)}function Di(n,e,t){if(n!==null&&(e.dependencies=n.dependencies),Vr|=e.lanes,!(t&e.childLanes))return null;if(n!==null&&e.child!==n.child)throw Error(ne(153));if(e.child!==null){for(n=e.child,t=or(n,n.pendingProps),e.child=t,t.return=e;n.sibling!==null;)n=n.sibling,t=t.sibling=or(n,n.pendingProps),t.return=e;t.sibling=null}return e.child}function nS(n,e,t){switch(e.tag){case 3:Nv(e),Hs();break;case 5:av(e);break;case 1:mn(e.type)&&Yl(e);break;case 4:zh(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;st(Zl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(st(pt,pt.current&1),e.flags|=128,null):t&e.child.childLanes?Dv(n,e,t):(st(pt,pt.current&1),n=Di(n,e,t),n!==null?n.sibling:null);st(pt,pt.current&1);break;case 19:if(i=(t&e.childLanes)!==0,n.flags&128){if(i)return Uv(n,e,t);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),st(pt,pt.current),i)break;return null;case 22:case 23:return e.lanes=0,Lv(n,e,t)}return Di(n,e,t)}var Fv,Vd,Ov,kv;Fv=function(n,e){for(var t=e.child;t!==null;){if(t.tag===5||t.tag===6)n.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Vd=function(){};Ov=function(n,e,t,i){var r=n.memoizedProps;if(r!==i){n=e.stateNode,Ir(di.current);var s=null;switch(t){case"input":r=cd(n,r),i=cd(n,i),s=[];break;case"select":r=gt({},r,{value:void 0}),i=gt({},i,{value:void 0}),s=[];break;case"textarea":r=hd(n,r),i=hd(n,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(n.onclick=Xl)}pd(t,i);var o;t=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(t||(t={}),t[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Zo.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r?.[c],i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(t||(t={}),t[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(t||(t={}),t[o]=l[o])}else t||(s||(s=[]),s.push(c,t)),t=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Zo.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&at("scroll",n),s||a===l||(s=[])):(s=s||[]).push(c,l))}t&&(s=s||[]).push("style",t);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};kv=function(n,e,t,i){t!==i&&(e.flags|=4)};function Eo(n,e){if(!dt)switch(n.tailMode){case"hidden":e=n.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?n.tail=null:t.sibling=null;break;case"collapsed":t=n.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?e||n.tail===null?n.tail=null:n.tail.sibling=null:i.sibling=null}}function qt(n){var e=n.alternate!==null&&n.alternate.child===n.child,t=0,i=0;if(e)for(var r=n.child;r!==null;)t|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=n,r=r.sibling;else for(r=n.child;r!==null;)t|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=n,r=r.sibling;return n.subtreeFlags|=i,n.childLanes=t,e}function iS(n,e,t){var i=e.pendingProps;switch(Nh(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qt(e),null;case 1:return mn(e.type)&&ql(),qt(e),null;case 3:return i=e.stateNode,Ws(),ct(pn),ct(Qt),Hh(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(n===null||n.child===null)&&(Ba(e)?e.flags|=4:n===null||n.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Kn!==null&&($d(Kn),Kn=null))),Vd(n,e),qt(e),null;case 5:Vh(e);var r=Ir(ca.current);if(t=e.type,n!==null&&e.stateNode!=null)Ov(n,e,t,i,r),n.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ne(166));return qt(e),null}if(n=Ir(di.current),Ba(e)){i=e.stateNode,t=e.type;var s=e.memoizedProps;switch(i[li]=e,i[aa]=s,n=(e.mode&1)!==0,t){case"dialog":at("cancel",i),at("close",i);break;case"iframe":case"object":case"embed":at("load",i);break;case"video":case"audio":for(r=0;r<Fo.length;r++)at(Fo[r],i);break;case"source":at("error",i);break;case"img":case"image":case"link":at("error",i),at("load",i);break;case"details":at("toggle",i);break;case"input":Vf(i,s),at("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},at("invalid",i);break;case"textarea":Gf(i,s),at("invalid",i)}pd(t,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&ka(i.textContent,a,n),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&ka(i.textContent,a,n),r=["children",""+a]):Zo.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&at("scroll",i)}switch(t){case"input":Pa(i),Hf(i,s,!0);break;case"textarea":Pa(i),Wf(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Xl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=h0(t)),n==="http://www.w3.org/1999/xhtml"?t==="script"?(n=o.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof i.is=="string"?n=o.createElement(t,{is:i.is}):(n=o.createElement(t),t==="select"&&(o=n,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):n=o.createElementNS(n,t),n[li]=e,n[aa]=i,Fv(n,e,!1,!1),e.stateNode=n;e:{switch(o=md(t,i),t){case"dialog":at("cancel",n),at("close",n),r=i;break;case"iframe":case"object":case"embed":at("load",n),r=i;break;case"video":case"audio":for(r=0;r<Fo.length;r++)at(Fo[r],n);r=i;break;case"source":at("error",n),r=i;break;case"img":case"image":case"link":at("error",n),at("load",n),r=i;break;case"details":at("toggle",n),r=i;break;case"input":Vf(n,i),r=cd(n,i),at("invalid",n);break;case"option":r=i;break;case"select":n._wrapperState={wasMultiple:!!i.multiple},r=gt({},i,{value:void 0}),at("invalid",n);break;case"textarea":Gf(n,i),r=hd(n,i),at("invalid",n);break;default:r=i}pd(t,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?m0(n,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&f0(n,l)):s==="children"?typeof l=="string"?(t!=="textarea"||l!=="")&&Qo(n,l):typeof l=="number"&&Qo(n,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Zo.hasOwnProperty(s)?l!=null&&s==="onScroll"&&at("scroll",n):l!=null&&_h(n,s,l,o))}switch(t){case"input":Pa(n),Hf(n,i,!1);break;case"textarea":Pa(n),Wf(n);break;case"option":i.value!=null&&n.setAttribute("value",""+ur(i.value));break;case"select":n.multiple=!!i.multiple,s=i.value,s!=null?Rs(n,!!i.multiple,s,!1):i.defaultValue!=null&&Rs(n,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(n.onclick=Xl)}switch(t){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return qt(e),null;case 6:if(n&&e.stateNode!=null)kv(n,e,n.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ne(166));if(t=Ir(ca.current),Ir(di.current),Ba(e)){if(i=e.stateNode,t=e.memoizedProps,i[li]=e,(s=i.nodeValue!==t)&&(n=Tn,n!==null))switch(n.tag){case 3:ka(i.nodeValue,t,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&ka(i.nodeValue,t,(n.mode&1)!==0)}s&&(e.flags|=4)}else i=(t.nodeType===9?t:t.ownerDocument).createTextNode(i),i[li]=e,e.stateNode=i}return qt(e),null;case 13:if(ct(pt),i=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(dt&&wn!==null&&e.mode&1&&!(e.flags&128))nv(),Hs(),e.flags|=98560,s=!1;else if(s=Ba(e),i!==null&&i.dehydrated!==null){if(n===null){if(!s)throw Error(ne(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ne(317));s[li]=e}else Hs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;qt(e),s=!1}else Kn!==null&&($d(Kn),Kn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=t,e):(i=i!==null,i!==(n!==null&&n.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(n===null||pt.current&1?Pt===0&&(Pt=3):ef())),e.updateQueue!==null&&(e.flags|=4),qt(e),null);case 4:return Ws(),Vd(n,e),n===null&&sa(e.stateNode.containerInfo),qt(e),null;case 10:return Oh(e.type._context),qt(e),null;case 17:return mn(e.type)&&ql(),qt(e),null;case 19:if(ct(pt),s=e.memoizedState,s===null)return qt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Eo(s,!1);else{if(Pt!==0||n!==null&&n.flags&128)for(n=e.child;n!==null;){if(o=ec(n),o!==null){for(e.flags|=128,Eo(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=t,t=e.child;t!==null;)s=t,n=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=n,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,n=o.dependencies,s.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t=t.sibling;return st(pt,pt.current&1|2),e.child}n=n.sibling}s.tail!==null&&Et()>Xs&&(e.flags|=128,i=!0,Eo(s,!1),e.lanes=4194304)}else{if(!i)if(n=ec(o),n!==null){if(e.flags|=128,i=!0,t=n.updateQueue,t!==null&&(e.updateQueue=t,e.flags|=4),Eo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!dt)return qt(e),null}else 2*Et()-s.renderingStartTime>Xs&&t!==1073741824&&(e.flags|=128,i=!0,Eo(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(t=s.last,t!==null?t.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Et(),e.sibling=null,t=pt.current,st(pt,i?t&1|2:t&1),e):(qt(e),null);case 22:case 23:return Jh(),i=e.memoizedState!==null,n!==null&&n.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?En&1073741824&&(qt(e),e.subtreeFlags&6&&(e.flags|=8192)):qt(e),null;case 24:return null;case 25:return null}throw Error(ne(156,e.tag))}function rS(n,e){switch(Nh(e),e.tag){case 1:return mn(e.type)&&ql(),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return Ws(),ct(pn),ct(Qt),Hh(),n=e.flags,n&65536&&!(n&128)?(e.flags=n&-65537|128,e):null;case 5:return Vh(e),null;case 13:if(ct(pt),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(ne(340));Hs()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return ct(pt),null;case 4:return Ws(),null;case 10:return Oh(e.type._context),null;case 22:case 23:return Jh(),null;case 24:return null;default:return null}}var Ha=!1,Kt=!1,sS=typeof WeakSet=="function"?WeakSet:Set,ge=null;function ws(n,e){var t=n.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(i){_t(n,e,i)}else t.current=null}function Hd(n,e,t){try{t()}catch(i){_t(n,e,i)}}var Np=!1;function oS(n,e){if(Td=Gl,n=G0(),Lh(n)){if("selectionStart"in n)var t={start:n.selectionStart,end:n.selectionEnd};else e:{t=(t=n.ownerDocument)&&t.defaultView||window;var i=t.getSelection&&t.getSelection();if(i&&i.rangeCount!==0){t=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{t.nodeType,s.nodeType}catch{t=null;break e}var o=0,a=-1,l=-1,c=0,u=0,h=n,f=null;t:for(;;){for(var m;h!==t||r!==0&&h.nodeType!==3||(a=o+r),h!==s||i!==0&&h.nodeType!==3||(l=o+i),h.nodeType===3&&(o+=h.nodeValue.length),(m=h.firstChild)!==null;)f=h,h=m;for(;;){if(h===n)break t;if(f===t&&++c===r&&(a=o),f===s&&++u===i&&(l=o),(m=h.nextSibling)!==null)break;h=f,f=h.parentNode}h=m}t=a===-1||l===-1?null:{start:a,end:l}}else t=null}t=t||{start:0,end:0}}else t=null;for(bd={focusedElem:n,selectionRange:t},Gl=!1,ge=e;ge!==null;)if(e=ge,n=e.child,(e.subtreeFlags&1028)!==0&&n!==null)n.return=e,ge=n;else for(;ge!==null;){e=ge;try{var g=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var _=g.memoizedProps,p=g.memoizedState,d=e.stateNode,v=d.getSnapshotBeforeUpdate(e.elementType===e.type?_:Yn(e.type,_),p);d.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var x=e.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ne(163))}}catch(y){_t(e,e.return,y)}if(n=e.sibling,n!==null){n.return=e.return,ge=n;break}ge=e.return}return g=Np,Np=!1,g}function jo(n,e,t){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&n)===n){var s=r.destroy;r.destroy=void 0,s!==void 0&&Hd(e,t,s)}r=r.next}while(r!==i)}}function Ac(n,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var t=e=e.next;do{if((t.tag&n)===n){var i=t.create;t.destroy=i()}t=t.next}while(t!==e)}}function Gd(n){var e=n.ref;if(e!==null){var t=n.stateNode;switch(n.tag){case 5:n=t;break;default:n=t}typeof e=="function"?e(n):e.current=n}}function Bv(n){var e=n.alternate;e!==null&&(n.alternate=null,Bv(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&(delete e[li],delete e[aa],delete e[Rd],delete e[Hy],delete e[Gy])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function zv(n){return n.tag===5||n.tag===3||n.tag===4}function Dp(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||zv(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Wd(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.nodeType===8?t.parentNode.insertBefore(n,e):t.insertBefore(n,e):(t.nodeType===8?(e=t.parentNode,e.insertBefore(n,t)):(e=t,e.appendChild(n)),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=Xl));else if(i!==4&&(n=n.child,n!==null))for(Wd(n,e,t),n=n.sibling;n!==null;)Wd(n,e,t),n=n.sibling}function jd(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.insertBefore(n,e):t.appendChild(n);else if(i!==4&&(n=n.child,n!==null))for(jd(n,e,t),n=n.sibling;n!==null;)jd(n,e,t),n=n.sibling}var zt=null,$n=!1;function Oi(n,e,t){for(t=t.child;t!==null;)Vv(n,e,t),t=t.sibling}function Vv(n,e,t){if(ui&&typeof ui.onCommitFiberUnmount=="function")try{ui.onCommitFiberUnmount(xc,t)}catch{}switch(t.tag){case 5:Kt||ws(t,e);case 6:var i=zt,r=$n;zt=null,Oi(n,e,t),zt=i,$n=r,zt!==null&&($n?(n=zt,t=t.stateNode,n.nodeType===8?n.parentNode.removeChild(t):n.removeChild(t)):zt.removeChild(t.stateNode));break;case 18:zt!==null&&($n?(n=zt,t=t.stateNode,n.nodeType===8?su(n.parentNode,t):n.nodeType===1&&su(n,t),na(n)):su(zt,t.stateNode));break;case 4:i=zt,r=$n,zt=t.stateNode.containerInfo,$n=!0,Oi(n,e,t),zt=i,$n=r;break;case 0:case 11:case 14:case 15:if(!Kt&&(i=t.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Hd(t,e,o),r=r.next}while(r!==i)}Oi(n,e,t);break;case 1:if(!Kt&&(ws(t,e),i=t.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=t.memoizedProps,i.state=t.memoizedState,i.componentWillUnmount()}catch(a){_t(t,e,a)}Oi(n,e,t);break;case 21:Oi(n,e,t);break;case 22:t.mode&1?(Kt=(i=Kt)||t.memoizedState!==null,Oi(n,e,t),Kt=i):Oi(n,e,t);break;default:Oi(n,e,t)}}function Up(n){var e=n.updateQueue;if(e!==null){n.updateQueue=null;var t=n.stateNode;t===null&&(t=n.stateNode=new sS),e.forEach(function(i){var r=mS.bind(null,n,i);t.has(i)||(t.add(i),i.then(r,r))})}}function Hn(n,e){var t=e.deletions;if(t!==null)for(var i=0;i<t.length;i++){var r=t[i];try{var s=n,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:zt=a.stateNode,$n=!1;break e;case 3:zt=a.stateNode.containerInfo,$n=!0;break e;case 4:zt=a.stateNode.containerInfo,$n=!0;break e}a=a.return}if(zt===null)throw Error(ne(160));Vv(s,o,r),zt=null,$n=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){_t(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Hv(e,n),e=e.sibling}function Hv(n,e){var t=n.alternate,i=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(Hn(e,n),si(n),i&4){try{jo(3,n,n.return),Ac(3,n)}catch(_){_t(n,n.return,_)}try{jo(5,n,n.return)}catch(_){_t(n,n.return,_)}}break;case 1:Hn(e,n),si(n),i&512&&t!==null&&ws(t,t.return);break;case 5:if(Hn(e,n),si(n),i&512&&t!==null&&ws(t,t.return),n.flags&32){var r=n.stateNode;try{Qo(r,"")}catch(_){_t(n,n.return,_)}}if(i&4&&(r=n.stateNode,r!=null)){var s=n.memoizedProps,o=t!==null?t.memoizedProps:s,a=n.type,l=n.updateQueue;if(n.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&u0(r,s),md(a,o);var c=md(a,s);for(o=0;o<l.length;o+=2){var u=l[o],h=l[o+1];u==="style"?m0(r,h):u==="dangerouslySetInnerHTML"?f0(r,h):u==="children"?Qo(r,h):_h(r,u,h,c)}switch(a){case"input":ud(r,s);break;case"textarea":d0(r,s);break;case"select":var f=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var m=s.value;m!=null?Rs(r,!!s.multiple,m,!1):f!==!!s.multiple&&(s.defaultValue!=null?Rs(r,!!s.multiple,s.defaultValue,!0):Rs(r,!!s.multiple,s.multiple?[]:"",!1))}r[aa]=s}catch(_){_t(n,n.return,_)}}break;case 6:if(Hn(e,n),si(n),i&4){if(n.stateNode===null)throw Error(ne(162));r=n.stateNode,s=n.memoizedProps;try{r.nodeValue=s}catch(_){_t(n,n.return,_)}}break;case 3:if(Hn(e,n),si(n),i&4&&t!==null&&t.memoizedState.isDehydrated)try{na(e.containerInfo)}catch(_){_t(n,n.return,_)}break;case 4:Hn(e,n),si(n);break;case 13:Hn(e,n),si(n),r=n.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Zh=Et())),i&4&&Up(n);break;case 22:if(u=t!==null&&t.memoizedState!==null,n.mode&1?(Kt=(c=Kt)||u,Hn(e,n),Kt=c):Hn(e,n),si(n),i&8192){if(c=n.memoizedState!==null,(n.stateNode.isHidden=c)&&!u&&n.mode&1)for(ge=n,u=n.child;u!==null;){for(h=ge=u;ge!==null;){switch(f=ge,m=f.child,f.tag){case 0:case 11:case 14:case 15:jo(4,f,f.return);break;case 1:ws(f,f.return);var g=f.stateNode;if(typeof g.componentWillUnmount=="function"){i=f,t=f.return;try{e=i,g.props=e.memoizedProps,g.state=e.memoizedState,g.componentWillUnmount()}catch(_){_t(i,t,_)}}break;case 5:ws(f,f.return);break;case 22:if(f.memoizedState!==null){Op(h);continue}}m!==null?(m.return=f,ge=m):Op(h)}u=u.sibling}e:for(u=null,h=n;;){if(h.tag===5){if(u===null){u=h;try{r=h.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=h.stateNode,l=h.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=p0("display",o))}catch(_){_t(n,n.return,_)}}}else if(h.tag===6){if(u===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(_){_t(n,n.return,_)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===n)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===n)break e;for(;h.sibling===null;){if(h.return===null||h.return===n)break e;u===h&&(u=null),h=h.return}u===h&&(u=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Hn(e,n),si(n),i&4&&Up(n);break;case 21:break;default:Hn(e,n),si(n)}}function si(n){var e=n.flags;if(e&2){try{e:{for(var t=n.return;t!==null;){if(zv(t)){var i=t;break e}t=t.return}throw Error(ne(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Qo(r,""),i.flags&=-33);var s=Dp(n);jd(n,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Dp(n);Wd(n,a,o);break;default:throw Error(ne(161))}}catch(l){_t(n,n.return,l)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function aS(n,e,t){ge=n,Gv(n)}function Gv(n,e,t){for(var i=(n.mode&1)!==0;ge!==null;){var r=ge,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||Ha;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||Kt;a=Ha;var c=Kt;if(Ha=o,(Kt=l)&&!c)for(ge=r;ge!==null;)o=ge,l=o.child,o.tag===22&&o.memoizedState!==null?kp(r):l!==null?(l.return=o,ge=l):kp(r);for(;s!==null;)ge=s,Gv(s),s=s.sibling;ge=r,Ha=a,Kt=c}Fp(n)}else r.subtreeFlags&8772&&s!==null?(s.return=r,ge=s):Fp(n)}}function Fp(n){for(;ge!==null;){var e=ge;if(e.flags&8772){var t=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Kt||Ac(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Kt)if(t===null)i.componentDidMount();else{var r=e.elementType===e.type?t.memoizedProps:Yn(e.type,t.memoizedProps);i.componentDidUpdate(r,t.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&yp(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(t=null,e.child!==null)switch(e.child.tag){case 5:t=e.child.stateNode;break;case 1:t=e.child.stateNode}yp(e,o,t)}break;case 5:var a=e.stateNode;if(t===null&&e.flags&4){t=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&t.focus();break;case"img":l.src&&(t.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var h=u.dehydrated;h!==null&&na(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ne(163))}Kt||e.flags&512&&Gd(e)}catch(f){_t(e,e.return,f)}}if(e===n){ge=null;break}if(t=e.sibling,t!==null){t.return=e.return,ge=t;break}ge=e.return}}function Op(n){for(;ge!==null;){var e=ge;if(e===n){ge=null;break}var t=e.sibling;if(t!==null){t.return=e.return,ge=t;break}ge=e.return}}function kp(n){for(;ge!==null;){var e=ge;try{switch(e.tag){case 0:case 11:case 15:var t=e.return;try{Ac(4,e)}catch(l){_t(e,t,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){_t(e,r,l)}}var s=e.return;try{Gd(e)}catch(l){_t(e,s,l)}break;case 5:var o=e.return;try{Gd(e)}catch(l){_t(e,o,l)}}}catch(l){_t(e,e.return,l)}if(e===n){ge=null;break}var a=e.sibling;if(a!==null){a.return=e.return,ge=a;break}ge=e.return}}var lS=Math.ceil,ic=Fi.ReactCurrentDispatcher,$h=Fi.ReactCurrentOwner,Bn=Fi.ReactCurrentBatchConfig,Ze=0,Ot=null,Ct=null,Ht=0,En=0,Ts=pr(0),Pt=0,fa=null,Vr=0,Cc=0,Kh=0,Xo=null,cn=null,Zh=0,Xs=1/0,Ei=null,rc=!1,Xd=null,rr=null,Ga=!1,Ki=null,sc=0,qo=0,qd=null,Nl=-1,Dl=0;function on(){return Ze&6?Et():Nl!==-1?Nl:Nl=Et()}function sr(n){return n.mode&1?Ze&2&&Ht!==0?Ht&-Ht:jy.transition!==null?(Dl===0&&(Dl=A0()),Dl):(n=et,n!==0||(n=window.event,n=n===void 0?16:D0(n.type)),n):1}function Jn(n,e,t,i){if(50<qo)throw qo=0,qd=null,Error(ne(185));xa(n,t,i),(!(Ze&2)||n!==Ot)&&(n===Ot&&(!(Ze&2)&&(Cc|=t),Pt===4&&Yi(n,Ht)),gn(n,i),t===1&&Ze===0&&!(e.mode&1)&&(Xs=Et()+500,wc&&mr()))}function gn(n,e){var t=n.callbackNode;jx(n,e);var i=Hl(n,n===Ot?Ht:0);if(i===0)t!==null&&qf(t),n.callbackNode=null,n.callbackPriority=0;else if(e=i&-i,n.callbackPriority!==e){if(t!=null&&qf(t),e===1)n.tag===0?Wy(Bp.bind(null,n)):J0(Bp.bind(null,n)),zy(function(){!(Ze&6)&&mr()}),t=null;else{switch(C0(i)){case 1:t=Eh;break;case 4:t=T0;break;case 16:t=Vl;break;case 536870912:t=b0;break;default:t=Vl}t=Zv(t,Wv.bind(null,n))}n.callbackPriority=e,n.callbackNode=t}}function Wv(n,e){if(Nl=-1,Dl=0,Ze&6)throw Error(ne(327));var t=n.callbackNode;if(Ds()&&n.callbackNode!==t)return null;var i=Hl(n,n===Ot?Ht:0);if(i===0)return null;if(i&30||i&n.expiredLanes||e)e=oc(n,i);else{e=i;var r=Ze;Ze|=2;var s=Xv();(Ot!==n||Ht!==e)&&(Ei=null,Xs=Et()+500,Nr(n,e));do try{dS();break}catch(a){jv(n,a)}while(1);Fh(),ic.current=s,Ze=r,Ct!==null?e=0:(Ot=null,Ht=0,e=Pt)}if(e!==0){if(e===2&&(r=yd(n),r!==0&&(i=r,e=Yd(n,r))),e===1)throw t=fa,Nr(n,0),Yi(n,i),gn(n,Et()),t;if(e===6)Yi(n,i);else{if(r=n.current.alternate,!(i&30)&&!cS(r)&&(e=oc(n,i),e===2&&(s=yd(n),s!==0&&(i=s,e=Yd(n,s))),e===1))throw t=fa,Nr(n,0),Yi(n,i),gn(n,Et()),t;switch(n.finishedWork=r,n.finishedLanes=i,e){case 0:case 1:throw Error(ne(345));case 2:br(n,cn,Ei);break;case 3:if(Yi(n,i),(i&130023424)===i&&(e=Zh+500-Et(),10<e)){if(Hl(n,0)!==0)break;if(r=n.suspendedLanes,(r&i)!==i){on(),n.pingedLanes|=n.suspendedLanes&r;break}n.timeoutHandle=Cd(br.bind(null,n,cn,Ei),e);break}br(n,cn,Ei);break;case 4:if(Yi(n,i),(i&4194240)===i)break;for(e=n.eventTimes,r=-1;0<i;){var o=31-Qn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=Et()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*lS(i/1960))-i,10<i){n.timeoutHandle=Cd(br.bind(null,n,cn,Ei),i);break}br(n,cn,Ei);break;case 5:br(n,cn,Ei);break;default:throw Error(ne(329))}}}return gn(n,Et()),n.callbackNode===t?Wv.bind(null,n):null}function Yd(n,e){var t=Xo;return n.current.memoizedState.isDehydrated&&(Nr(n,e).flags|=256),n=oc(n,e),n!==2&&(e=cn,cn=t,e!==null&&$d(e)),n}function $d(n){cn===null?cn=n:cn.push.apply(cn,n)}function cS(n){for(var e=n;;){if(e.flags&16384){var t=e.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var i=0;i<t.length;i++){var r=t[i],s=r.getSnapshot;r=r.value;try{if(!ii(s(),r))return!1}catch{return!1}}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Yi(n,e){for(e&=~Kh,e&=~Cc,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var t=31-Qn(e),i=1<<t;n[t]=-1,e&=~i}}function Bp(n){if(Ze&6)throw Error(ne(327));Ds();var e=Hl(n,0);if(!(e&1))return gn(n,Et()),null;var t=oc(n,e);if(n.tag!==0&&t===2){var i=yd(n);i!==0&&(e=i,t=Yd(n,i))}if(t===1)throw t=fa,Nr(n,0),Yi(n,e),gn(n,Et()),t;if(t===6)throw Error(ne(345));return n.finishedWork=n.current.alternate,n.finishedLanes=e,br(n,cn,Ei),gn(n,Et()),null}function Qh(n,e){var t=Ze;Ze|=1;try{return n(e)}finally{Ze=t,Ze===0&&(Xs=Et()+500,wc&&mr())}}function Hr(n){Ki!==null&&Ki.tag===0&&!(Ze&6)&&Ds();var e=Ze;Ze|=1;var t=Bn.transition,i=et;try{if(Bn.transition=null,et=1,n)return n()}finally{et=i,Bn.transition=t,Ze=e,!(Ze&6)&&mr()}}function Jh(){En=Ts.current,ct(Ts)}function Nr(n,e){n.finishedWork=null,n.finishedLanes=0;var t=n.timeoutHandle;if(t!==-1&&(n.timeoutHandle=-1,By(t)),Ct!==null)for(t=Ct.return;t!==null;){var i=t;switch(Nh(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&ql();break;case 3:Ws(),ct(pn),ct(Qt),Hh();break;case 5:Vh(i);break;case 4:Ws();break;case 13:ct(pt);break;case 19:ct(pt);break;case 10:Oh(i.type._context);break;case 22:case 23:Jh()}t=t.return}if(Ot=n,Ct=n=or(n.current,null),Ht=En=e,Pt=0,fa=null,Kh=Cc=Vr=0,cn=Xo=null,Lr!==null){for(e=0;e<Lr.length;e++)if(t=Lr[e],i=t.interleaved,i!==null){t.interleaved=null;var r=i.next,s=t.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}t.pending=i}Lr=null}return n}function jv(n,e){do{var t=Ct;try{if(Fh(),Pl.current=nc,tc){for(var i=mt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}tc=!1}if(zr=0,Ft=Rt=mt=null,Wo=!1,ua=0,$h.current=null,t===null||t.return===null){Pt=1,fa=e,Ct=null;break}e:{var s=n,o=t.return,a=t,l=e;if(e=Ht,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=a,h=u.tag;if(!(u.mode&1)&&(h===0||h===11||h===15)){var f=u.alternate;f?(u.updateQueue=f.updateQueue,u.memoizedState=f.memoizedState,u.lanes=f.lanes):(u.updateQueue=null,u.memoizedState=null)}var m=bp(o);if(m!==null){m.flags&=-257,Ap(m,o,a,s,e),m.mode&1&&Tp(s,c,e),e=m,l=c;var g=e.updateQueue;if(g===null){var _=new Set;_.add(l),e.updateQueue=_}else g.add(l);break e}else{if(!(e&1)){Tp(s,c,e),ef();break e}l=Error(ne(426))}}else if(dt&&a.mode&1){var p=bp(o);if(p!==null){!(p.flags&65536)&&(p.flags|=256),Ap(p,o,a,s,e),Dh(js(l,a));break e}}s=l=js(l,a),Pt!==4&&(Pt=2),Xo===null?Xo=[s]:Xo.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var d=Cv(s,l,e);xp(s,d);break e;case 1:a=l;var v=s.type,x=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(rr===null||!rr.has(x)))){s.flags|=65536,e&=-e,s.lanes|=e;var y=Rv(s,a,e);xp(s,y);break e}}s=s.return}while(s!==null)}Yv(t)}catch(M){e=M,Ct===t&&t!==null&&(Ct=t=t.return);continue}break}while(1)}function Xv(){var n=ic.current;return ic.current=nc,n===null?nc:n}function ef(){(Pt===0||Pt===3||Pt===2)&&(Pt=4),Ot===null||!(Vr&268435455)&&!(Cc&268435455)||Yi(Ot,Ht)}function oc(n,e){var t=Ze;Ze|=2;var i=Xv();(Ot!==n||Ht!==e)&&(Ei=null,Nr(n,e));do try{uS();break}catch(r){jv(n,r)}while(1);if(Fh(),Ze=t,ic.current=i,Ct!==null)throw Error(ne(261));return Ot=null,Ht=0,Pt}function uS(){for(;Ct!==null;)qv(Ct)}function dS(){for(;Ct!==null&&!Fx();)qv(Ct)}function qv(n){var e=Kv(n.alternate,n,En);n.memoizedProps=n.pendingProps,e===null?Yv(n):Ct=e,$h.current=null}function Yv(n){var e=n;do{var t=e.alternate;if(n=e.return,e.flags&32768){if(t=rS(t,e),t!==null){t.flags&=32767,Ct=t;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{Pt=6,Ct=null;return}}else if(t=iS(t,e,En),t!==null){Ct=t;return}if(e=e.sibling,e!==null){Ct=e;return}Ct=e=n}while(e!==null);Pt===0&&(Pt=5)}function br(n,e,t){var i=et,r=Bn.transition;try{Bn.transition=null,et=1,hS(n,e,t,i)}finally{Bn.transition=r,et=i}return null}function hS(n,e,t,i){do Ds();while(Ki!==null);if(Ze&6)throw Error(ne(327));t=n.finishedWork;var r=n.finishedLanes;if(t===null)return null;if(n.finishedWork=null,n.finishedLanes=0,t===n.current)throw Error(ne(177));n.callbackNode=null,n.callbackPriority=0;var s=t.lanes|t.childLanes;if(Xx(n,s),n===Ot&&(Ct=Ot=null,Ht=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||Ga||(Ga=!0,Zv(Vl,function(){return Ds(),null})),s=(t.flags&15990)!==0,t.subtreeFlags&15990||s){s=Bn.transition,Bn.transition=null;var o=et;et=1;var a=Ze;Ze|=4,$h.current=null,oS(n,t),Hv(t,n),Iy(bd),Gl=!!Td,bd=Td=null,n.current=t,aS(t),Ox(),Ze=a,et=o,Bn.transition=s}else n.current=t;if(Ga&&(Ga=!1,Ki=n,sc=r),s=n.pendingLanes,s===0&&(rr=null),zx(t.stateNode),gn(n,Et()),e!==null)for(i=n.onRecoverableError,t=0;t<e.length;t++)r=e[t],i(r.value,{componentStack:r.stack,digest:r.digest});if(rc)throw rc=!1,n=Xd,Xd=null,n;return sc&1&&n.tag!==0&&Ds(),s=n.pendingLanes,s&1?n===qd?qo++:(qo=0,qd=n):qo=0,mr(),null}function Ds(){if(Ki!==null){var n=C0(sc),e=Bn.transition,t=et;try{if(Bn.transition=null,et=16>n?16:n,Ki===null)var i=!1;else{if(n=Ki,Ki=null,sc=0,Ze&6)throw Error(ne(331));var r=Ze;for(Ze|=4,ge=n.current;ge!==null;){var s=ge,o=s.child;if(ge.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(ge=c;ge!==null;){var u=ge;switch(u.tag){case 0:case 11:case 15:jo(8,u,s)}var h=u.child;if(h!==null)h.return=u,ge=h;else for(;ge!==null;){u=ge;var f=u.sibling,m=u.return;if(Bv(u),u===c){ge=null;break}if(f!==null){f.return=m,ge=f;break}ge=m}}}var g=s.alternate;if(g!==null){var _=g.child;if(_!==null){g.child=null;do{var p=_.sibling;_.sibling=null,_=p}while(_!==null)}}ge=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,ge=o;else e:for(;ge!==null;){if(s=ge,s.flags&2048)switch(s.tag){case 0:case 11:case 15:jo(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,ge=d;break e}ge=s.return}}var v=n.current;for(ge=v;ge!==null;){o=ge;var x=o.child;if(o.subtreeFlags&2064&&x!==null)x.return=o,ge=x;else e:for(o=v;ge!==null;){if(a=ge,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Ac(9,a)}}catch(M){_t(a,a.return,M)}if(a===o){ge=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,ge=y;break e}ge=a.return}}if(Ze=r,mr(),ui&&typeof ui.onPostCommitFiberRoot=="function")try{ui.onPostCommitFiberRoot(xc,n)}catch{}i=!0}return i}finally{et=t,Bn.transition=e}}return!1}function zp(n,e,t){e=js(t,e),e=Cv(n,e,1),n=ir(n,e,1),e=on(),n!==null&&(xa(n,1,e),gn(n,e))}function _t(n,e,t){if(n.tag===3)zp(n,n,t);else for(;e!==null;){if(e.tag===3){zp(e,n,t);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(rr===null||!rr.has(i))){n=js(t,n),n=Rv(e,n,1),e=ir(e,n,1),n=on(),e!==null&&(xa(e,1,n),gn(e,n));break}}e=e.return}}function fS(n,e,t){var i=n.pingCache;i!==null&&i.delete(e),e=on(),n.pingedLanes|=n.suspendedLanes&t,Ot===n&&(Ht&t)===t&&(Pt===4||Pt===3&&(Ht&130023424)===Ht&&500>Et()-Zh?Nr(n,0):Kh|=t),gn(n,e)}function $v(n,e){e===0&&(n.mode&1?(e=Na,Na<<=1,!(Na&130023424)&&(Na=4194304)):e=1);var t=on();n=Ni(n,e),n!==null&&(xa(n,e,t),gn(n,t))}function pS(n){var e=n.memoizedState,t=0;e!==null&&(t=e.retryLane),$v(n,t)}function mS(n,e){var t=0;switch(n.tag){case 13:var i=n.stateNode,r=n.memoizedState;r!==null&&(t=r.retryLane);break;case 19:i=n.stateNode;break;default:throw Error(ne(314))}i!==null&&i.delete(e),$v(n,t)}var Kv;Kv=function(n,e,t){if(n!==null)if(n.memoizedProps!==e.pendingProps||pn.current)fn=!0;else{if(!(n.lanes&t)&&!(e.flags&128))return fn=!1,nS(n,e,t);fn=!!(n.flags&131072)}else fn=!1,dt&&e.flags&1048576&&ev(e,Kl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Il(n,e),n=e.pendingProps;var r=Vs(e,Qt.current);Ns(e,t),r=Wh(null,e,i,n,r,t);var s=jh();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,mn(i)?(s=!0,Yl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Bh(e),r.updater=bc,e.stateNode=r,r._reactInternals=e,Ud(e,i,n,t),e=kd(null,e,i,!0,s,t)):(e.tag=0,dt&&s&&Ih(e),rn(null,e,r,t),e=e.child),e;case 16:i=e.elementType;e:{switch(Il(n,e),n=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=vS(i),n=Yn(i,n),r){case 0:e=Od(null,e,i,n,t);break e;case 1:e=Pp(null,e,i,n,t);break e;case 11:e=Cp(null,e,i,n,t);break e;case 14:e=Rp(null,e,i,Yn(i.type,n),t);break e}throw Error(ne(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Yn(i,r),Od(n,e,i,r,t);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Yn(i,r),Pp(n,e,i,r,t);case 3:e:{if(Nv(e),n===null)throw Error(ne(387));i=e.pendingProps,s=e.memoizedState,r=s.element,ov(n,e),Jl(e,i,null,t);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=js(Error(ne(423)),e),e=Lp(n,e,i,t,r);break e}else if(i!==r){r=js(Error(ne(424)),e),e=Lp(n,e,i,t,r);break e}else for(wn=nr(e.stateNode.containerInfo.firstChild),Tn=e,dt=!0,Kn=null,t=rv(e,null,i,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(Hs(),i===r){e=Di(n,e,t);break e}rn(n,e,i,t)}e=e.child}return e;case 5:return av(e),n===null&&Id(e),i=e.type,r=e.pendingProps,s=n!==null?n.memoizedProps:null,o=r.children,Ad(i,r)?o=null:s!==null&&Ad(i,s)&&(e.flags|=32),Iv(n,e),rn(n,e,o,t),e.child;case 6:return n===null&&Id(e),null;case 13:return Dv(n,e,t);case 4:return zh(e,e.stateNode.containerInfo),i=e.pendingProps,n===null?e.child=Gs(e,null,i,t):rn(n,e,i,t),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Yn(i,r),Cp(n,e,i,r,t);case 7:return rn(n,e,e.pendingProps,t),e.child;case 8:return rn(n,e,e.pendingProps.children,t),e.child;case 12:return rn(n,e,e.pendingProps.children,t),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,st(Zl,i._currentValue),i._currentValue=o,s!==null)if(ii(s.value,o)){if(s.children===r.children&&!pn.current){e=Di(n,e,t);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Pi(-1,t&-t),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}s.lanes|=t,l=s.alternate,l!==null&&(l.lanes|=t),Nd(s.return,t,e),a.lanes|=t;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(ne(341));o.lanes|=t,a=o.alternate,a!==null&&(a.lanes|=t),Nd(o,t,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}rn(n,e,r.children,t),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Ns(e,t),r=zn(r),i=i(r),e.flags|=1,rn(n,e,i,t),e.child;case 14:return i=e.type,r=Yn(i,e.pendingProps),r=Yn(i.type,r),Rp(n,e,i,r,t);case 15:return Pv(n,e,e.type,e.pendingProps,t);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Yn(i,r),Il(n,e),e.tag=1,mn(i)?(n=!0,Yl(e)):n=!1,Ns(e,t),Av(e,i,r),Ud(e,i,r,t),kd(null,e,i,!0,n,t);case 19:return Uv(n,e,t);case 22:return Lv(n,e,t)}throw Error(ne(156,e.tag))};function Zv(n,e){return w0(n,e)}function gS(n,e,t,i){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function kn(n,e,t,i){return new gS(n,e,t,i)}function tf(n){return n=n.prototype,!(!n||!n.isReactComponent)}function vS(n){if(typeof n=="function")return tf(n)?1:0;if(n!=null){if(n=n.$$typeof,n===yh)return 11;if(n===Sh)return 14}return 2}function or(n,e){var t=n.alternate;return t===null?(t=kn(n.tag,e,n.key,n.mode),t.elementType=n.elementType,t.type=n.type,t.stateNode=n.stateNode,t.alternate=n,n.alternate=t):(t.pendingProps=e,t.type=n.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=n.flags&14680064,t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=n.sibling,t.index=n.index,t.ref=n.ref,t}function Ul(n,e,t,i,r,s){var o=2;if(i=n,typeof n=="function")tf(n)&&(o=1);else if(typeof n=="string")o=5;else e:switch(n){case ms:return Dr(t.children,r,s,e);case xh:o=8,r|=8;break;case sd:return n=kn(12,t,e,r|2),n.elementType=sd,n.lanes=s,n;case od:return n=kn(13,t,e,r),n.elementType=od,n.lanes=s,n;case ad:return n=kn(19,t,e,r),n.elementType=ad,n.lanes=s,n;case a0:return Rc(t,r,s,e);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case s0:o=10;break e;case o0:o=9;break e;case yh:o=11;break e;case Sh:o=14;break e;case Wi:o=16,i=null;break e}throw Error(ne(130,n==null?n:typeof n,""))}return e=kn(o,t,e,r),e.elementType=n,e.type=i,e.lanes=s,e}function Dr(n,e,t,i){return n=kn(7,n,i,e),n.lanes=t,n}function Rc(n,e,t,i){return n=kn(22,n,i,e),n.elementType=a0,n.lanes=t,n.stateNode={isHidden:!1},n}function fu(n,e,t){return n=kn(6,n,null,e),n.lanes=t,n}function pu(n,e,t){return e=kn(4,n.children!==null?n.children:[],n.key,e),e.lanes=t,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function _S(n,e,t,i,r){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Yc(0),this.expirationTimes=Yc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Yc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function nf(n,e,t,i,r,s,o,a,l){return n=new _S(n,e,t,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=kn(3,null,null,e),n.current=s,s.stateNode=n,s.memoizedState={element:i,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Bh(s),n}function xS(n,e,t){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ps,key:i==null?null:""+i,children:n,containerInfo:e,implementation:t}}function Qv(n){if(!n)return dr;n=n._reactInternals;e:{if(Xr(n)!==n||n.tag!==1)throw Error(ne(170));var e=n;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(mn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ne(171))}if(n.tag===1){var t=n.type;if(mn(t))return Q0(n,t,e)}return e}function Jv(n,e,t,i,r,s,o,a,l){return n=nf(t,i,!0,n,r,s,o,a,l),n.context=Qv(null),t=n.current,i=on(),r=sr(t),s=Pi(i,r),s.callback=e??null,ir(t,s,r),n.current.lanes=r,xa(n,r,i),gn(n,i),n}function Pc(n,e,t,i){var r=e.current,s=on(),o=sr(r);return t=Qv(t),e.context===null?e.context=t:e.pendingContext=t,e=Pi(s,o),e.payload={element:n},i=i===void 0?null:i,i!==null&&(e.callback=i),n=ir(r,e,o),n!==null&&(Jn(n,r,o,s),Rl(n,r,o)),o}function ac(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function Vp(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var t=n.retryLane;n.retryLane=t!==0&&t<e?t:e}}function rf(n,e){Vp(n,e),(n=n.alternate)&&Vp(n,e)}function yS(){return null}var e_=typeof reportError=="function"?reportError:function(n){console.error(n)};function sf(n){this._internalRoot=n}Lc.prototype.render=sf.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(ne(409));Pc(n,e,null,null)};Lc.prototype.unmount=sf.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;Hr(function(){Pc(null,n,null,null)}),e[Ii]=null}};function Lc(n){this._internalRoot=n}Lc.prototype.unstable_scheduleHydration=function(n){if(n){var e=L0();n={blockedOn:null,target:n,priority:e};for(var t=0;t<qi.length&&e!==0&&e<qi[t].priority;t++);qi.splice(t,0,n),t===0&&N0(n)}};function of(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function Ic(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Hp(){}function SS(n,e,t,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=ac(o);s.call(c)}}var o=Jv(e,i,n,0,null,!1,!1,"",Hp);return n._reactRootContainer=o,n[Ii]=o.current,sa(n.nodeType===8?n.parentNode:n),Hr(),o}for(;r=n.lastChild;)n.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=ac(l);a.call(c)}}var l=nf(n,0,!1,null,null,!1,!1,"",Hp);return n._reactRootContainer=l,n[Ii]=l.current,sa(n.nodeType===8?n.parentNode:n),Hr(function(){Pc(e,l,t,i)}),l}function Nc(n,e,t,i,r){var s=t._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=ac(o);a.call(l)}}Pc(e,o,n,r)}else o=SS(t,e,n,r,i);return ac(o)}R0=function(n){switch(n.tag){case 3:var e=n.stateNode;if(e.current.memoizedState.isDehydrated){var t=Uo(e.pendingLanes);t!==0&&(wh(e,t|1),gn(e,Et()),!(Ze&6)&&(Xs=Et()+500,mr()))}break;case 13:Hr(function(){var i=Ni(n,1);if(i!==null){var r=on();Jn(i,n,1,r)}}),rf(n,1)}};Th=function(n){if(n.tag===13){var e=Ni(n,134217728);if(e!==null){var t=on();Jn(e,n,134217728,t)}rf(n,134217728)}};P0=function(n){if(n.tag===13){var e=sr(n),t=Ni(n,e);if(t!==null){var i=on();Jn(t,n,e,i)}rf(n,e)}};L0=function(){return et};I0=function(n,e){var t=et;try{return et=n,e()}finally{et=t}};vd=function(n,e,t){switch(e){case"input":if(ud(n,t),e=t.name,t.type==="radio"&&e!=null){for(t=n;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<t.length;e++){var i=t[e];if(i!==n&&i.form===n.form){var r=Ec(i);if(!r)throw Error(ne(90));c0(i),ud(i,r)}}}break;case"textarea":d0(n,t);break;case"select":e=t.value,e!=null&&Rs(n,!!t.multiple,e,!1)}};_0=Qh;x0=Hr;var MS={usingClientEntryPoint:!1,Events:[Sa,xs,Ec,g0,v0,Qh]},wo={findFiberByHostInstance:Pr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},ES={bundleType:wo.bundleType,version:wo.version,rendererPackageName:wo.rendererPackageName,rendererConfig:wo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Fi.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=M0(n),n===null?null:n.stateNode},findFiberByHostInstance:wo.findFiberByHostInstance||yS,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Wa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Wa.isDisabled&&Wa.supportsFiber)try{xc=Wa.inject(ES),ui=Wa}catch{}}Cn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=MS;Cn.createPortal=function(n,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!of(e))throw Error(ne(200));return xS(n,e,null,t)};Cn.createRoot=function(n,e){if(!of(n))throw Error(ne(299));var t=!1,i="",r=e_;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=nf(n,1,!1,null,null,t,!1,i,r),n[Ii]=e.current,sa(n.nodeType===8?n.parentNode:n),new sf(e)};Cn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(ne(188)):(n=Object.keys(n).join(","),Error(ne(268,n)));return n=M0(e),n=n===null?null:n.stateNode,n};Cn.flushSync=function(n){return Hr(n)};Cn.hydrate=function(n,e,t){if(!Ic(e))throw Error(ne(200));return Nc(null,n,e,!0,t)};Cn.hydrateRoot=function(n,e,t){if(!of(n))throw Error(ne(405));var i=t!=null&&t.hydratedSources||null,r=!1,s="",o=e_;if(t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),e=Jv(e,null,n,1,t??null,r,!1,s,o),n[Ii]=e.current,sa(n),i)for(n=0;n<i.length;n++)t=i[n],r=t._getVersion,r=r(t._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,r]:e.mutableSourceEagerHydrationData.push(t,r);return new Lc(e)};Cn.render=function(n,e,t){if(!Ic(e))throw Error(ne(200));return Nc(null,n,e,!1,t)};Cn.unmountComponentAtNode=function(n){if(!Ic(n))throw Error(ne(40));return n._reactRootContainer?(Hr(function(){Nc(null,null,n,!1,function(){n._reactRootContainer=null,n[Ii]=null})}),!0):!1};Cn.unstable_batchedUpdates=Qh;Cn.unstable_renderSubtreeIntoContainer=function(n,e,t,i){if(!Ic(t))throw Error(ne(200));if(n==null||n._reactInternals===void 0)throw Error(ne(38));return Nc(n,e,t,!1,i)};Cn.version="18.3.1-next-f1338f8080-20240426";function t_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t_)}catch(n){console.error(n)}}t_(),t0.exports=Cn;var wS=t0.exports,Gp=wS;id.createRoot=Gp.createRoot,id.hydrateRoot=Gp.hydrateRoot;const Wp=n=>{let e;const t=new Set,i=(u,h)=>{const f=typeof u=="function"?u(e):u;if(!Object.is(f,e)){const m=e;e=h??(typeof f!="object"||f===null)?f:Object.assign({},e,f),t.forEach(g=>g(e,m))}},r=()=>e,l={setState:i,getState:r,getInitialState:()=>c,subscribe:u=>(t.add(u),()=>t.delete(u)),destroy:()=>{t.clear()}},c=e=n(i,r,l);return l},TS=n=>n?Wp(n):Wp;var n_={exports:{}},i_={},r_={exports:{}},s_={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qs=St;function bS(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var AS=typeof Object.is=="function"?Object.is:bS,CS=qs.useState,RS=qs.useEffect,PS=qs.useLayoutEffect,LS=qs.useDebugValue;function IS(n,e){var t=e(),i=CS({inst:{value:t,getSnapshot:e}}),r=i[0].inst,s=i[1];return PS(function(){r.value=t,r.getSnapshot=e,mu(r)&&s({inst:r})},[n,t,e]),RS(function(){return mu(r)&&s({inst:r}),n(function(){mu(r)&&s({inst:r})})},[n]),LS(t),t}function mu(n){var e=n.getSnapshot;n=n.value;try{var t=e();return!AS(n,t)}catch{return!0}}function NS(n,e){return e()}var DS=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?NS:IS;s_.useSyncExternalStore=qs.useSyncExternalStore!==void 0?qs.useSyncExternalStore:DS;r_.exports=s_;var US=r_.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dc=St,FS=US;function OS(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var kS=typeof Object.is=="function"?Object.is:OS,BS=FS.useSyncExternalStore,zS=Dc.useRef,VS=Dc.useEffect,HS=Dc.useMemo,GS=Dc.useDebugValue;i_.useSyncExternalStoreWithSelector=function(n,e,t,i,r){var s=zS(null);if(s.current===null){var o={hasValue:!1,value:null};s.current=o}else o=s.current;s=HS(function(){function l(m){if(!c){if(c=!0,u=m,m=i(m),r!==void 0&&o.hasValue){var g=o.value;if(r(g,m))return h=g}return h=m}if(g=h,kS(u,m))return g;var _=i(m);return r!==void 0&&r(g,_)?(u=m,g):(u=m,h=_)}var c=!1,u,h,f=t===void 0?null:t;return[function(){return l(e())},f===null?void 0:function(){return l(f())}]},[e,t,i,r]);var a=BS(n,s[0],s[1]);return VS(function(){o.hasValue=!0,o.value=a},[a]),GS(a),a};n_.exports=i_;var WS=n_.exports;const jS=Hg(WS),{useDebugValue:XS}=Jg,{useSyncExternalStoreWithSelector:qS}=jS;const YS=n=>n;function $S(n,e=YS,t){const i=qS(n.subscribe,n.getState,n.getServerState||n.getInitialState,e,t);return XS(i),i}const jp=n=>{const e=typeof n=="function"?TS(n):n,t=(i,r)=>$S(e,i,r);return Object.assign(t,e),t},KS=n=>n?jp(n):jp;function ZS(n,e){let t;try{t=n()}catch{return}return{getItem:r=>{var s;const o=l=>l===null?null:JSON.parse(l,e?.reviver),a=(s=t.getItem(r))!=null?s:null;return a instanceof Promise?a.then(o):o(a)},setItem:(r,s)=>t.setItem(r,JSON.stringify(s,e?.replacer)),removeItem:r=>t.removeItem(r)}}const pa=n=>e=>{try{const t=n(e);return t instanceof Promise?t:{then(i){return pa(i)(t)},catch(i){return this}}}catch(t){return{then(i){return this},catch(i){return pa(i)(t)}}}},QS=(n,e)=>(t,i,r)=>{let s={getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:p=>p,version:0,merge:(p,d)=>({...d,...p}),...e},o=!1;const a=new Set,l=new Set;let c;try{c=s.getStorage()}catch{}if(!c)return n((...p)=>{console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`),t(...p)},i,r);const u=pa(s.serialize),h=()=>{const p=s.partialize({...i()});let d;const v=u({state:p,version:s.version}).then(x=>c.setItem(s.name,x)).catch(x=>{d=x});if(d)throw d;return v},f=r.setState;r.setState=(p,d)=>{f(p,d),h()};const m=n((...p)=>{t(...p),h()},i,r);let g;const _=()=>{var p;if(!c)return;o=!1,a.forEach(v=>v(i()));const d=((p=s.onRehydrateStorage)==null?void 0:p.call(s,i()))||void 0;return pa(c.getItem.bind(c))(s.name).then(v=>{if(v)return s.deserialize(v)}).then(v=>{if(v)if(typeof v.version=="number"&&v.version!==s.version){if(s.migrate)return s.migrate(v.state,v.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return v.state}).then(v=>{var x;return g=s.merge(v,(x=i())!=null?x:m),t(g,!0),h()}).then(()=>{d?.(g,void 0),o=!0,l.forEach(v=>v(g))}).catch(v=>{d?.(void 0,v)})};return r.persist={setOptions:p=>{s={...s,...p},p.getStorage&&(c=p.getStorage())},clearStorage:()=>{c?.removeItem(s.name)},getOptions:()=>s,rehydrate:()=>_(),hasHydrated:()=>o,onHydrate:p=>(a.add(p),()=>{a.delete(p)}),onFinishHydration:p=>(l.add(p),()=>{l.delete(p)})},_(),g||m},JS=(n,e)=>(t,i,r)=>{let s={storage:ZS(()=>localStorage),partialize:_=>_,version:0,merge:(_,p)=>({...p,..._}),...e},o=!1;const a=new Set,l=new Set;let c=s.storage;if(!c)return n((..._)=>{console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`),t(..._)},i,r);const u=()=>{const _=s.partialize({...i()});return c.setItem(s.name,{state:_,version:s.version})},h=r.setState;r.setState=(_,p)=>{h(_,p),u()};const f=n((..._)=>{t(..._),u()},i,r);r.getInitialState=()=>f;let m;const g=()=>{var _,p;if(!c)return;o=!1,a.forEach(v=>{var x;return v((x=i())!=null?x:f)});const d=((p=s.onRehydrateStorage)==null?void 0:p.call(s,(_=i())!=null?_:f))||void 0;return pa(c.getItem.bind(c))(s.name).then(v=>{if(v)if(typeof v.version=="number"&&v.version!==s.version){if(s.migrate)return[!0,s.migrate(v.state,v.version)];console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,v.state];return[!1,void 0]}).then(v=>{var x;const[y,M]=v;if(m=s.merge(M,(x=i())!=null?x:f),t(m,!0),y)return u()}).then(()=>{d?.(m,void 0),m=i(),o=!0,l.forEach(v=>v(m))}).catch(v=>{d?.(void 0,v)})};return r.persist={setOptions:_=>{s={...s,..._},_.storage&&(c=_.storage)},clearStorage:()=>{c?.removeItem(s.name)},getOptions:()=>s,rehydrate:()=>g(),hasHydrated:()=>o,onHydrate:_=>(a.add(_),()=>{a.delete(_)}),onFinishHydration:_=>(l.add(_),()=>{l.delete(_)})},s.skipHydration||g(),m||f},eM=(n,e)=>"getStorage"in e||"serialize"in e||"deserialize"in e?QS(n,e):JS(n,e),tM=eM,Gn={cohesionStrength:1.5,separationStrength:2.2,alignmentStrength:1,neighborRadius:40,separationRadius:10.5,collisionRadius:4.5,individualWeight:.35,socialWeight:.7,bodyLength:5,maxTurnRate:2.5,maxRollAngle:.6,rollSpeed:5,undulationFrequency:3.2,undulationAmplitude:.22,accelerationRate:8,directionChangeInterval:12,turnSmoothness:.98,waveDelayFactor:.2,clusterBias:.8,edgeSpeedMultiplier:1.15,burstMultiplier:2.5,compressionStrength:4,baitBallDuration:3e3,recoveryDuration:4e3,seabedAvoidanceStrength:2.5,obstacleLookAheadDistance:40,preferredDepthBand:50,whirlpoolStrength:1.8,whirlpoolRadius:110,sharkScale:8.5},Wn={maxSpeed:80,maxForce:20,maxAcceleration:30},gu={fishCount:25e3,modelScale:1.8,lightingIntensity:2,metalness:.7,roughness:.5,envMapIntensity:.2,emissiveIntensity:.05,fogDensity:.007,fogColor:"#05101a",particleCount:1200,particleOpacity:.9,blueFilterIntensity:.5,selectedSpecies:"sardine",resolutionScale:1},Xp={showWalls:!1,showGridlines:!1,showSwimmableArea:!1,wallOpacity:.05,gridlineOpacity:1,gridSize:12,wallColor:"#4A90E2",gridlineColor:"#00FFFF",transparencyEnabled:!0,transparencyDistance:150},vu={enabled:!0,scale:60,positionX:0,positionY:-40,positionZ:0,rotationX:0,rotationY:0,rotationZ:0,receiveShadows:!0,castShadows:!1},nM={fps:0,memoryUsage:0,fishCount:0,isPaused:!1,averageSpeed:0,visibleFish:0,cullingEnabled:!1,averageSize:1,sizeRange:{min:1,max:1}},iM={position:{x:35,y:22,z:55},target:{x:0,y:20,z:0}},rM={sidebarVisible:!1,hudVisible:!0,fullscreen:!1,activeSection:"behavior",selectedBehaviorPreset:"default",selectedCameraPreset:"action"},nt=KS()(tM((n,e)=>({ui:rM,parameters:{behavior:Gn,physics:Wn,rendering:gu,walls:Xp,seaFloor:vu},predatorVisible:!1,predatorPosition:{x:0,y:0,z:0},sharkVisible:!0,sharkPatrol:!0,performance:nM,camera:iM,cameraToast:null,whirlpoolTrigger:0,actions:{triggerWhirlpool:()=>{n(t=>({whirlpoolTrigger:(t.whirlpoolTrigger||0)+1}))},updateParameter:(t,i,r)=>{n(s=>({parameters:{...s.parameters,[t]:{...s.parameters[t],[i]:r}}}))},togglePause:()=>{n(t=>({performance:{...t.performance,isPaused:!t.performance.isPaused}}))},setSharkVisible:t=>{n({sharkVisible:t})},setSharkPatrol:t=>{n({sharkPatrol:t})},resetSimulation:()=>{n(t=>({parameters:{behavior:Gn,physics:Wn,rendering:{...gu,fishCount:t.parameters.rendering.fishCount||25e3},walls:Xp,seaFloor:vu},ui:{...t.ui,selectedBehaviorPreset:"default"},performance:{...t.performance,isPaused:!1}}))},loadPreset:t=>{const r={calm:{behavior:{...Gn,cohesionStrength:.3,separationStrength:.6,alignmentStrength:.4,socialWeight:.3,individualWeight:.7,waveDelayFactor:.1,clusterBias:.2},physics:{...Wn,maxSpeed:30}},tight:{behavior:{...Gn,cohesionStrength:.8,separationStrength:.4,alignmentStrength:.9,socialWeight:.7,individualWeight:.3,separationRadius:6,collisionRadius:2.5,waveDelayFactor:.8,clusterBias:.9},physics:{...Wn,maxSpeed:50}},scattered:{behavior:{...Gn,cohesionStrength:.2,separationStrength:1.2,alignmentStrength:.3,socialWeight:.2,individualWeight:.8,neighborRadius:15,separationRadius:12,collisionRadius:6,waveDelayFactor:0,clusterBias:0},physics:{...Wn,maxSpeed:80}},aggressive:{behavior:{...Gn,cohesionStrength:.6,separationStrength:.3,alignmentStrength:1,socialWeight:.8,individualWeight:.2,maxTurnRate:2,accelerationRate:5,waveDelayFactor:.3,clusterBias:.6},physics:{...Wn,maxSpeed:60,maxForce:15}},gentle:{behavior:{...Gn,cohesionStrength:.5,separationStrength:.9,alignmentStrength:.7,socialWeight:.4,individualWeight:.6,maxTurnRate:1,accelerationRate:1.5,waveDelayFactor:.6,clusterBias:.4},physics:{...Wn,maxSpeed:25,maxForce:8}},chaotic:{behavior:{...Gn,cohesionStrength:.1,separationStrength:1.5,alignmentStrength:.2,socialWeight:.1,individualWeight:.9,directionChangeInterval:2,maxTurnRate:2.5,waveDelayFactor:0,clusterBias:.1},physics:{...Wn,maxSpeed:70,maxForce:20}},organized:{behavior:{...Gn,cohesionStrength:.7,separationStrength:.6,alignmentStrength:1,socialWeight:.8,individualWeight:.2,neighborRadius:30,turnSmoothness:.9,waveDelayFactor:.5,clusterBias:.7},physics:{...Wn,maxSpeed:45,maxForce:12}},minimal:{behavior:{...Gn,cohesionStrength:.6,separationStrength:1,alignmentStrength:.5,socialWeight:.5,individualWeight:.5,waveDelayFactor:.2,clusterBias:.3},physics:{...Wn,maxSpeed:35,maxForce:9}}}[t];r&&n(s=>({parameters:{...s.parameters,behavior:{...s.parameters.behavior,...r.behavior},physics:{...s.parameters.physics,...r.physics},rendering:s.parameters.rendering,walls:s.parameters.walls,seaFloor:s.parameters.seaFloor},ui:{...s.ui,selectedBehaviorPreset:t},performance:{...s.performance,isPaused:!1}}))},loadCameraPreset:t=>{const r={default:{position:{x:100,y:40,z:90},target:{x:0,y:20,z:0}},"single-fish":{position:{x:6,y:4.5,z:-14},target:{x:0,y:20,z:0}},follow:{position:{x:0,y:32,z:-75},target:{x:0,y:20,z:0}},action:{position:{x:35,y:22,z:55},target:{x:0,y:20,z:0}},"dolly-cam":{position:{x:68,y:16,z:0},target:{x:0,y:20,z:0}},close:{position:{x:4,y:2.5,z:-8},target:{x:0,y:20,z:0}}}[t];if(r){const o={default:{name:"Free Orbit Overview",desc:"Wide oceanic perspective with 360° rotation",icon:"🌐"},"single-fish":{name:"Single Sardine Focus",desc:"Companion camera tracking an individual fish",icon:"🐟"},follow:{name:"School Follow Orbit",desc:"Cinematic trailing camera tracking the bait ball",icon:"🌊"},action:{name:"Dynamic Action Cam",desc:"High-speed chase view undulating through the school",icon:"⚡"},"dolly-cam":{name:"Cinematic Dolly View",desc:"Smooth horizontal glide keeping the school centered",icon:"🎥"},close:{name:"Macro Detail View",desc:"Intimate close-up showing iridescent scales and fin movement",icon:"🔍"}}[t]||{name:t,desc:"Cinematic Camera",icon:"🎥"};n(a=>({camera:r,cameraToast:{preset:t,name:o.name,desc:o.desc,icon:o.icon,timestamp:Date.now()},ui:{...a.ui,selectedCameraPreset:t}})),t==="single-fish"&&console.log("Single fish camera mode activated")}},cycleCamera:()=>{const t=["default","single-fish","follow","action","dolly-cam","close"],i=e().ui.selectedCameraPreset,s=(t.indexOf(i)+1)%t.length,o=t[s];e().actions.loadCameraPreset(o)},clearCameraToast:()=>{n({cameraToast:null})},updateCamera:t=>{n(i=>({camera:t}))},toggleSidebar:()=>{n(t=>({ui:{...t.ui,sidebarVisible:!t.ui.sidebarVisible}}))},toggleHUD:()=>{n(t=>({ui:{...t.ui,hudVisible:!t.ui.hudVisible}}))},setActiveSection:t=>{n(i=>({ui:{...i.ui,activeSection:t}}))},updatePerformance:t=>{n(i=>({performance:{...i.performance,...t}}))},toggleWalls:()=>{n(t=>({parameters:{...t.parameters,walls:{...t.parameters.walls,showWalls:!t.parameters.walls.showWalls}}}))},toggleGridlines:()=>{n(t=>({parameters:{...t.parameters,walls:{...t.parameters.walls,showGridlines:!t.parameters.walls.showGridlines}}}))},updateWallParameter:(t,i)=>{n(r=>({parameters:{...r.parameters,walls:{...r.parameters.walls,[t]:i}}}))},toggleSeaFloor:()=>{n(t=>({parameters:{...t.parameters,seaFloor:{...t.parameters.seaFloor,enabled:!t.parameters.seaFloor.enabled}}}))},updateSeaFloorParameter:(t,i)=>{n(r=>({parameters:{...r.parameters,seaFloor:{...r.parameters.seaFloor,[t]:i}}}))}}}),{name:"sardines-simulation-storage",partialize:n=>({parameters:n.parameters,ui:n.ui}),onRehydrateStorage:()=>n=>{n&&(n.parameters.behavior={...Gn},n.parameters.seaFloor={...vu},n.parameters.rendering={...gu},n.parameters.physics={...Wn},n.ui.sidebarVisible=!1,n.ui.selectedCameraPreset="action",n.camera={position:{x:35,y:22,z:55},target:{x:0,y:20,z:0}},console.log("🌀 CIRCULAR FORMATIONS & SPEED RESET APPLIED"))}}));/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const af="158",Yr={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},$r={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},sM=0,qp=1,oM=2,o_=1,aM=2,Mi=3,Ui=0,vn=1,Zt=2,ar=0,Us=1,lc=2,Yp=3,$p=4,lM=5,Cr=100,cM=101,uM=102,Kp=103,Zp=104,dM=200,hM=201,fM=202,pM=203,Kd=204,Zd=205,mM=206,gM=207,vM=208,_M=209,xM=210,yM=211,SM=212,MM=213,EM=214,wM=0,TM=1,bM=2,cc=3,AM=4,CM=5,RM=6,PM=7,lf=0,LM=1,IM=2,lr=0,NM=1,DM=2,UM=3,FM=4,OM=5,Qp="attached",kM="detached",a_=300,Ys=301,$s=302,uc=303,Qd=304,Uc=306,Ks=1e3,dn=1001,dc=1002,xt=1003,Jd=1004,Fl=1005,un=1006,l_=1007,Gr=1008,cr=1009,BM=1010,zM=1011,cf=1012,c_=1013,Zi=1014,Zn=1015,Zs=1016,u_=1017,d_=1018,Ur=1020,VM=1021,hn=1023,HM=1024,GM=1025,Fr=1026,Qs=1027,WM=1028,h_=1029,jM=1030,f_=1031,p_=1033,_u=33776,xu=33777,yu=33778,Su=33779,Jp=35840,em=35841,tm=35842,nm=35843,XM=36196,im=37492,rm=37496,sm=37808,om=37809,am=37810,lm=37811,cm=37812,um=37813,dm=37814,hm=37815,fm=37816,pm=37817,mm=37818,gm=37819,vm=37820,_m=37821,Mu=36492,xm=36494,ym=36495,qM=36283,Sm=36284,Mm=36285,Em=36286,YM=2200,$M=2201,KM=2202,ma=2300,Js=2301,Eu=2302,bs=2400,As=2401,hc=2402,uf=2500,ZM=2501,QM=0,m_=1,eh=2,g_=3e3,Or=3001,JM=3200,eE=3201,df=0,tE=1,On="",yt="srgb",Wt="srgb-linear",hf="display-p3",Fc="display-p3-linear",fc="linear",lt="srgb",pc="rec709",mc="p3",Kr=7680,wm=519,nE=512,iE=513,rE=514,sE=515,oE=516,aE=517,lE=518,cE=519,th=35044,Tm="300 es",nh=1035,Ci=2e3,gc=2001;class gr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let bm=1234567;const Fs=Math.PI/180,eo=180/Math.PI;function ei(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Yt[n&255]+Yt[n>>8&255]+Yt[n>>16&255]+Yt[n>>24&255]+"-"+Yt[e&255]+Yt[e>>8&255]+"-"+Yt[e>>16&15|64]+Yt[e>>24&255]+"-"+Yt[t&63|128]+Yt[t>>8&255]+"-"+Yt[t>>16&255]+Yt[t>>24&255]+Yt[i&255]+Yt[i>>8&255]+Yt[i>>16&255]+Yt[i>>24&255]).toLowerCase()}function Vt(n,e,t){return Math.max(e,Math.min(t,n))}function ff(n,e){return(n%e+e)%e}function uE(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function dE(n,e,t){return n!==e?(t-n)/(e-n):0}function Yo(n,e,t){return(1-t)*n+t*e}function hE(n,e,t,i){return Yo(n,e,1-Math.exp(-t*i))}function fE(n,e=1){return e-Math.abs(ff(n,e*2)-e)}function pE(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function mE(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function gE(n,e){return n+Math.floor(Math.random()*(e-n+1))}function vE(n,e){return n+Math.random()*(e-n)}function _E(n){return n*(.5-Math.random())}function xE(n){n!==void 0&&(bm=n);let e=bm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function yE(n){return n*Fs}function SE(n){return n*eo}function ih(n){return(n&n-1)===0&&n!==0}function v_(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function vc(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function ME(n,e,t,i,r){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+i)/2),u=o((e+i)/2),h=s((e-i)/2),f=o((e-i)/2),m=s((i-e)/2),g=o((i-e)/2);switch(r){case"XYX":n.set(a*u,l*h,l*f,a*c);break;case"YZY":n.set(l*f,a*u,l*h,a*c);break;case"ZXZ":n.set(l*h,l*f,a*u,a*c);break;case"XZX":n.set(a*u,l*g,l*m,a*c);break;case"YXY":n.set(l*m,a*u,l*g,a*c);break;case"ZYZ":n.set(l*g,l*m,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ci(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function tt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const pf={DEG2RAD:Fs,RAD2DEG:eo,generateUUID:ei,clamp:Vt,euclideanModulo:ff,mapLinear:uE,inverseLerp:dE,lerp:Yo,damp:hE,pingpong:fE,smoothstep:pE,smootherstep:mE,randInt:gE,randFloat:vE,randFloatSpread:_E,seededRandom:xE,degToRad:yE,radToDeg:SE,isPowerOfTwo:ih,ceilPowerOfTwo:v_,floorPowerOfTwo:vc,setQuaternionFromProperEuler:ME,normalize:tt,denormalize:ci};class Ce{constructor(e=0,t=0){Ce.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Vt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ge{constructor(e,t,i,r,s,o,a,l,c){Ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],m=i[5],g=i[8],_=r[0],p=r[3],d=r[6],v=r[1],x=r[4],y=r[7],M=r[2],C=r[5],w=r[8];return s[0]=o*_+a*v+l*M,s[3]=o*p+a*x+l*C,s[6]=o*d+a*y+l*w,s[1]=c*_+u*v+h*M,s[4]=c*p+u*x+h*C,s[7]=c*d+u*y+h*w,s[2]=f*_+m*v+g*M,s[5]=f*p+m*x+g*C,s[8]=f*d+m*y+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*s,m=c*s-o*l,g=t*h+i*f+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(r*c-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=f*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=m*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(wu.makeScale(e,t)),this}rotate(e){return this.premultiply(wu.makeRotation(-e)),this}translate(e,t){return this.premultiply(wu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const wu=new Ge;function __(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ga(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function EE(){const n=ga("canvas");return n.style.display="block",n}const Am={};function $o(n){n in Am||(Am[n]=!0,console.warn(n))}const Cm=new Ge().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Rm=new Ge().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ja={[Wt]:{transfer:fc,primaries:pc,toReference:n=>n,fromReference:n=>n},[yt]:{transfer:lt,primaries:pc,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Fc]:{transfer:fc,primaries:mc,toReference:n=>n.applyMatrix3(Rm),fromReference:n=>n.applyMatrix3(Cm)},[hf]:{transfer:lt,primaries:mc,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Rm),fromReference:n=>n.applyMatrix3(Cm).convertLinearToSRGB()}},wE=new Set([Wt,Fc]),Je={enabled:!0,_workingColorSpace:Wt,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(n){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!n},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!wE.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=ja[e].toReference,r=ja[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return ja[n].primaries},getTransfer:function(n){return n===On?fc:ja[n].transfer}};function Os(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Tu(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Zr;class x_{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Zr===void 0&&(Zr=ga("canvas")),Zr.width=e.width,Zr.height=e.height;const i=Zr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Zr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ga("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Os(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Os(t[i]/255)*255):t[i]=Os(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let TE=0;class y_{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:TE++}),this.uuid=ei(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(bu(r[o].image)):s.push(bu(r[o]))}else s=bu(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function bu(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?x_.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let bE=0;class kt extends gr{constructor(e=kt.DEFAULT_IMAGE,t=kt.DEFAULT_MAPPING,i=dn,r=dn,s=un,o=Gr,a=hn,l=cr,c=kt.DEFAULT_ANISOTROPY,u=On){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bE++}),this.uuid=ei(),this.name="",this.source=new y_(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ce(0,0),this.repeat=new Ce(1,1),this.center=new Ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:($o("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Or?yt:On),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==a_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ks:e.x=e.x-Math.floor(e.x);break;case dn:e.x=e.x<0?0:1;break;case dc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ks:e.y=e.y-Math.floor(e.y);break;case dn:e.y=e.y<0?0:1;break;case dc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return $o("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===yt?Or:g_}set encoding(e){$o("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Or?yt:On}}kt.DEFAULT_IMAGE=null;kt.DEFAULT_MAPPING=a_;kt.DEFAULT_ANISOTROPY=1;class it{constructor(e=0,t=0,i=0,r=1){it.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],m=l[5],g=l[9],_=l[2],p=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,y=(m+1)/2,M=(d+1)/2,C=(u+f)/4,w=(h+_)/4,I=(g+p)/4;return x>y&&x>M?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=C/i,s=w/i):y>M?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=C/r,s=I/r):M<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(M),i=w/s,r=I/s),this.set(i,r,s,t),this}let v=Math.sqrt((p-g)*(p-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(p-g)/v,this.y=(h-_)/v,this.z=(f-u)/v,this.w=Math.acos((c+m+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class AE extends gr{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&($o("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Or?yt:On),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:un,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new kt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new y_(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hr extends AE{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class S_ extends kt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=xt,this.minFilter=xt,this.wrapR=dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class CE extends kt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=xt,this.minFilter=xt,this.wrapR=dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _n{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3];const f=s[o+0],m=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(h!==_||l!==f||c!==m||u!==g){let p=1-a;const d=l*f+c*m+u*g+h*_,v=d>=0?1:-1,x=1-d*d;if(x>Number.EPSILON){const M=Math.sqrt(x),C=Math.atan2(M,d*v);p=Math.sin(p*C)/M,a=Math.sin(a*C)/M}const y=a*v;if(l=l*p+f*y,c=c*p+m*y,u=u*p+g*y,h=h*p+_*y,p===1-a){const M=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=M,c*=M,u*=M,h*=M}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[o],f=s[o+1],m=s[o+2],g=s[o+3];return e[t]=a*g+u*h+l*m-c*f,e[t+1]=l*g+u*f+c*h-a*m,e[t+2]=c*g+u*m+a*f-l*h,e[t+3]=u*g-a*h-l*f-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),h=a(s/2),f=l(i/2),m=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*h+c*m*g,this._y=c*m*h-f*u*g,this._z=c*u*g+f*m*h,this._w=c*u*h-f*m*g;break;case"YXZ":this._x=f*u*h+c*m*g,this._y=c*m*h-f*u*g,this._z=c*u*g-f*m*h,this._w=c*u*h+f*m*g;break;case"ZXY":this._x=f*u*h-c*m*g,this._y=c*m*h+f*u*g,this._z=c*u*g+f*m*h,this._w=c*u*h-f*m*g;break;case"ZYX":this._x=f*u*h-c*m*g,this._y=c*m*h+f*u*g,this._z=c*u*g-f*m*h,this._w=c*u*h+f*m*g;break;case"YZX":this._x=f*u*h+c*m*g,this._y=c*m*h+f*u*g,this._z=c*u*g-f*m*h,this._w=c*u*h-f*m*g;break;case"XZY":this._x=f*u*h-c*m*g,this._y=c*m*h-f*u*g,this._z=c*u*g+f*m*h,this._w=c*u*h+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=i+a+h;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(u-l)*m,this._y=(s-c)*m,this._z=(o-r)*m}else if(i>a&&i>h){const m=2*Math.sqrt(1+i-a-h);this._w=(u-l)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(s+c)/m}else if(a>h){const m=2*Math.sqrt(1+a-i-h);this._w=(s-c)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+h-i-a);this._w=(o-r)/m,this._x=(s+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Vt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*i+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,i=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Pm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Pm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),h=2*(s*i-o*t);return this.x=t+l*c+o*h-a*u,this.y=i+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Au.copy(this).projectOnVector(e),this.sub(Au)}reflect(e){return this.sub(Au.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Vt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Au=new P,Pm=new _n;class hi{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,jn):jn.fromBufferAttribute(s,o),jn.applyMatrix4(e.matrixWorld),this.expandByPoint(jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Xa.copy(i.boundingBox)),Xa.applyMatrix4(e.matrixWorld),this.union(Xa)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(To),qa.subVectors(this.max,To),Qr.subVectors(e.a,To),Jr.subVectors(e.b,To),es.subVectors(e.c,To),ki.subVectors(Jr,Qr),Bi.subVectors(es,Jr),yr.subVectors(Qr,es);let t=[0,-ki.z,ki.y,0,-Bi.z,Bi.y,0,-yr.z,yr.y,ki.z,0,-ki.x,Bi.z,0,-Bi.x,yr.z,0,-yr.x,-ki.y,ki.x,0,-Bi.y,Bi.x,0,-yr.y,yr.x,0];return!Cu(t,Qr,Jr,es,qa)||(t=[1,0,0,0,1,0,0,0,1],!Cu(t,Qr,Jr,es,qa))?!1:(Ya.crossVectors(ki,Bi),t=[Ya.x,Ya.y,Ya.z],Cu(t,Qr,Jr,es,qa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const gi=[new P,new P,new P,new P,new P,new P,new P,new P],jn=new P,Xa=new hi,Qr=new P,Jr=new P,es=new P,ki=new P,Bi=new P,yr=new P,To=new P,qa=new P,Ya=new P,Sr=new P;function Cu(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Sr.fromArray(n,s);const a=r.x*Math.abs(Sr.x)+r.y*Math.abs(Sr.y)+r.z*Math.abs(Sr.z),l=e.dot(Sr),c=t.dot(Sr),u=i.dot(Sr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const RE=new hi,bo=new P,Ru=new P;class fi{constructor(e=new P,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):RE.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;bo.subVectors(e,this.center);const t=bo.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(bo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ru.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(bo.copy(e.center).add(Ru)),this.expandByPoint(bo.copy(e.center).sub(Ru))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const vi=new P,Pu=new P,$a=new P,zi=new P,Lu=new P,Ka=new P,Iu=new P;class co{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=vi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vi.copy(this.origin).addScaledVector(this.direction,t),vi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Pu.copy(e).add(t).multiplyScalar(.5),$a.copy(t).sub(e).normalize(),zi.copy(this.origin).sub(Pu);const s=e.distanceTo(t)*.5,o=-this.direction.dot($a),a=zi.dot(this.direction),l=-zi.dot($a),c=zi.lengthSq(),u=Math.abs(1-o*o);let h,f,m,g;if(u>0)if(h=o*l-a,f=o*a-l,g=s*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,m=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),m=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),m=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),m=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),m=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),m=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),m=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Pu).addScaledVector($a,f),m}intersectSphere(e,t){vi.subVectors(e.center,this.origin);const i=vi.dot(this.direction),r=vi.dot(vi)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,vi)!==null}intersectTriangle(e,t,i,r,s){Lu.subVectors(t,e),Ka.subVectors(i,e),Iu.crossVectors(Lu,Ka);let o=this.direction.dot(Iu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;zi.subVectors(this.origin,e);const l=a*this.direction.dot(Ka.crossVectors(zi,Ka));if(l<0)return null;const c=a*this.direction.dot(Lu.cross(zi));if(c<0||l+c>o)return null;const u=-a*zi.dot(Iu);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Be{constructor(e,t,i,r,s,o,a,l,c,u,h,f,m,g,_,p){Be.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,h,f,m,g,_,p)}set(e,t,i,r,s,o,a,l,c,u,h,f,m,g,_,p){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=m,d[7]=g,d[11]=_,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Be().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/ts.setFromMatrixColumn(e,0).length(),s=1/ts.setFromMatrixColumn(e,1).length(),o=1/ts.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=o*u,m=o*h,g=a*u,_=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=m+g*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=g+m*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,m=l*h,g=c*u,_=c*h;t[0]=f+_*a,t[4]=g*a-m,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=m*a-g,t[6]=_+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,m=l*h,g=c*u,_=c*h;t[0]=f-_*a,t[4]=-o*h,t[8]=g+m*a,t[1]=m+g*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,m=o*h,g=a*u,_=a*h;t[0]=l*u,t[4]=g*c-m,t[8]=f*c+_,t[1]=l*h,t[5]=_*c+f,t[9]=m*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,m=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-f*h,t[8]=g*h+m,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=m*h+g,t[10]=f-_*h}else if(e.order==="XZY"){const f=o*l,m=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+_,t[5]=o*u,t[9]=m*h-g,t[2]=g*h-m,t[6]=a*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(PE,e,LE)}lookAt(e,t,i){const r=this.elements;return Sn.subVectors(e,t),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),Vi.crossVectors(i,Sn),Vi.lengthSq()===0&&(Math.abs(i.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),Vi.crossVectors(i,Sn)),Vi.normalize(),Za.crossVectors(Sn,Vi),r[0]=Vi.x,r[4]=Za.x,r[8]=Sn.x,r[1]=Vi.y,r[5]=Za.y,r[9]=Sn.y,r[2]=Vi.z,r[6]=Za.z,r[10]=Sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],m=i[13],g=i[2],_=i[6],p=i[10],d=i[14],v=i[3],x=i[7],y=i[11],M=i[15],C=r[0],w=r[4],I=r[8],S=r[12],T=r[1],j=r[5],Y=r[9],Z=r[13],D=r[2],H=r[6],Q=r[10],K=r[14],O=r[3],G=r[7],z=r[11],U=r[15];return s[0]=o*C+a*T+l*D+c*O,s[4]=o*w+a*j+l*H+c*G,s[8]=o*I+a*Y+l*Q+c*z,s[12]=o*S+a*Z+l*K+c*U,s[1]=u*C+h*T+f*D+m*O,s[5]=u*w+h*j+f*H+m*G,s[9]=u*I+h*Y+f*Q+m*z,s[13]=u*S+h*Z+f*K+m*U,s[2]=g*C+_*T+p*D+d*O,s[6]=g*w+_*j+p*H+d*G,s[10]=g*I+_*Y+p*Q+d*z,s[14]=g*S+_*Z+p*K+d*U,s[3]=v*C+x*T+y*D+M*O,s[7]=v*w+x*j+y*H+M*G,s[11]=v*I+x*Y+y*Q+M*z,s[15]=v*S+x*Z+y*K+M*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],m=e[14],g=e[3],_=e[7],p=e[11],d=e[15];return g*(+s*l*h-r*c*h-s*a*f+i*c*f+r*a*m-i*l*m)+_*(+t*l*m-t*c*f+s*o*f-r*o*m+r*c*u-s*l*u)+p*(+t*c*h-t*a*m-s*o*h+i*o*m+s*a*u-i*c*u)+d*(-r*a*u-t*l*h+t*a*f+r*o*h-i*o*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],m=e[11],g=e[12],_=e[13],p=e[14],d=e[15],v=h*p*c-_*f*c+_*l*m-a*p*m-h*l*d+a*f*d,x=g*f*c-u*p*c-g*l*m+o*p*m+u*l*d-o*f*d,y=u*_*c-g*h*c+g*a*m-o*_*m-u*a*d+o*h*d,M=g*h*l-u*_*l-g*a*f+o*_*f+u*a*p-o*h*p,C=t*v+i*x+r*y+s*M;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/C;return e[0]=v*w,e[1]=(_*f*s-h*p*s-_*r*m+i*p*m+h*r*d-i*f*d)*w,e[2]=(a*p*s-_*l*s+_*r*c-i*p*c-a*r*d+i*l*d)*w,e[3]=(h*l*s-a*f*s-h*r*c+i*f*c+a*r*m-i*l*m)*w,e[4]=x*w,e[5]=(u*p*s-g*f*s+g*r*m-t*p*m-u*r*d+t*f*d)*w,e[6]=(g*l*s-o*p*s-g*r*c+t*p*c+o*r*d-t*l*d)*w,e[7]=(o*f*s-u*l*s+u*r*c-t*f*c-o*r*m+t*l*m)*w,e[8]=y*w,e[9]=(g*h*s-u*_*s-g*i*m+t*_*m+u*i*d-t*h*d)*w,e[10]=(o*_*s-g*a*s+g*i*c-t*_*c-o*i*d+t*a*d)*w,e[11]=(u*a*s-o*h*s-u*i*c+t*h*c+o*i*m-t*a*m)*w,e[12]=M*w,e[13]=(u*_*r-g*h*r+g*i*f-t*_*f-u*i*p+t*h*p)*w,e[14]=(g*a*r-o*_*r-g*i*l+t*_*l+o*i*p-t*a*p)*w,e[15]=(o*h*r-u*a*r+u*i*l-t*h*l-o*i*f+t*a*f)*w,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,f=s*c,m=s*u,g=s*h,_=o*u,p=o*h,d=a*h,v=l*c,x=l*u,y=l*h,M=i.x,C=i.y,w=i.z;return r[0]=(1-(_+d))*M,r[1]=(m+y)*M,r[2]=(g-x)*M,r[3]=0,r[4]=(m-y)*C,r[5]=(1-(f+d))*C,r[6]=(p+v)*C,r[7]=0,r[8]=(g+x)*w,r[9]=(p-v)*w,r[10]=(1-(f+_))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=ts.set(r[0],r[1],r[2]).length();const o=ts.set(r[4],r[5],r[6]).length(),a=ts.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Xn.copy(this);const c=1/s,u=1/o,h=1/a;return Xn.elements[0]*=c,Xn.elements[1]*=c,Xn.elements[2]*=c,Xn.elements[4]*=u,Xn.elements[5]*=u,Xn.elements[6]*=u,Xn.elements[8]*=h,Xn.elements[9]*=h,Xn.elements[10]*=h,t.setFromRotationMatrix(Xn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=Ci){const l=this.elements,c=2*s/(t-e),u=2*s/(i-r),h=(t+e)/(t-e),f=(i+r)/(i-r);let m,g;if(a===Ci)m=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===gc)m=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Ci){const l=this.elements,c=1/(t-e),u=1/(i-r),h=1/(o-s),f=(t+e)*c,m=(i+r)*u;let g,_;if(a===Ci)g=(o+s)*h,_=-2*h;else if(a===gc)g=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ts=new P,Xn=new Be,PE=new P(0,0,0),LE=new P(1,1,1),Vi=new P,Za=new P,Sn=new P,Lm=new Be,Im=new _n;class to{constructor(e=0,t=0,i=0,r=to.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Vt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Vt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Lm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Lm,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Im.setFromEuler(this),this.setFromQuaternion(Im,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}to.DEFAULT_ORDER="XYZ";class mf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let IE=0;const Nm=new P,ns=new _n,_i=new Be,Qa=new P,Ao=new P,NE=new P,DE=new _n,Dm=new P(1,0,0),Um=new P(0,1,0),Fm=new P(0,0,1),UE={type:"added"},FE={type:"removed"};class ft extends gr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:IE++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ft.DEFAULT_UP.clone();const e=new P,t=new to,i=new _n,r=new P(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Be},normalMatrix:{value:new Ge}}),this.matrix=new Be,this.matrixWorld=new Be,this.matrixAutoUpdate=ft.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new mf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ns.setFromAxisAngle(e,t),this.quaternion.multiply(ns),this}rotateOnWorldAxis(e,t){return ns.setFromAxisAngle(e,t),this.quaternion.premultiply(ns),this}rotateX(e){return this.rotateOnAxis(Dm,e)}rotateY(e){return this.rotateOnAxis(Um,e)}rotateZ(e){return this.rotateOnAxis(Fm,e)}translateOnAxis(e,t){return Nm.copy(e).applyQuaternion(this.quaternion),this.position.add(Nm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Dm,e)}translateY(e){return this.translateOnAxis(Um,e)}translateZ(e){return this.translateOnAxis(Fm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Qa.copy(e):Qa.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ao.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(Ao,Qa,this.up):_i.lookAt(Qa,Ao,this.up),this.quaternion.setFromRotationMatrix(_i),r&&(_i.extractRotation(r.matrixWorld),ns.setFromRotationMatrix(_i),this.quaternion.premultiply(ns.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(UE)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(FE)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_i.multiply(e.parent.matrixWorld)),e.applyMatrix4(_i),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t){let i=[];this[e]===t&&i.push(this);for(let r=0,s=this.children.length;r<s;r++){const o=this.children[r].getObjectsByProperty(e,t);o.length>0&&(i=i.concat(o))}return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ao,e,NE),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ao,DE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),m=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}ft.DEFAULT_UP=new P(0,1,0);ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const qn=new P,xi=new P,Nu=new P,yi=new P,is=new P,rs=new P,Om=new P,Du=new P,Uu=new P,Fu=new P;let Ja=!1;class Fn{constructor(e=new P,t=new P,i=new P){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),qn.subVectors(e,t),r.cross(qn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){qn.subVectors(r,t),xi.subVectors(i,t),Nu.subVectors(e,t);const o=qn.dot(qn),a=qn.dot(xi),l=qn.dot(Nu),c=xi.dot(xi),u=xi.dot(Nu),h=o*c-a*a;if(h===0)return s.set(-2,-1,-1);const f=1/h,m=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-m-g,g,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,yi),yi.x>=0&&yi.y>=0&&yi.x+yi.y<=1}static getUV(e,t,i,r,s,o,a,l){return Ja===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ja=!0),this.getInterpolation(e,t,i,r,s,o,a,l)}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,yi),l.setScalar(0),l.addScaledVector(s,yi.x),l.addScaledVector(o,yi.y),l.addScaledVector(a,yi.z),l}static isFrontFacing(e,t,i,r){return qn.subVectors(i,t),xi.subVectors(e,t),qn.cross(xi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qn.subVectors(this.c,this.b),xi.subVectors(this.a,this.b),qn.cross(xi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Fn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return Ja===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ja=!0),Fn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return Fn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;is.subVectors(r,i),rs.subVectors(s,i),Du.subVectors(e,i);const l=is.dot(Du),c=rs.dot(Du);if(l<=0&&c<=0)return t.copy(i);Uu.subVectors(e,r);const u=is.dot(Uu),h=rs.dot(Uu);if(u>=0&&h<=u)return t.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(is,o);Fu.subVectors(e,s);const m=is.dot(Fu),g=rs.dot(Fu);if(g>=0&&m<=g)return t.copy(s);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(rs,a);const p=u*g-m*h;if(p<=0&&h-u>=0&&m-g>=0)return Om.subVectors(s,r),a=(h-u)/(h-u+(m-g)),t.copy(r).addScaledVector(Om,a);const d=1/(p+_+f);return o=_*d,a=f*d,t.copy(i).addScaledVector(is,o).addScaledVector(rs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const M_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},el={h:0,s:0,l:0};function Ou(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class xe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=Je.workingColorSpace){return this.r=e,this.g=t,this.b=i,Je.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=Je.workingColorSpace){if(e=ff(e,1),t=Vt(t,0,1),i=Vt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Ou(o,s,e+1/3),this.g=Ou(o,s,e),this.b=Ou(o,s,e-1/3)}return Je.toWorkingColorSpace(this,r),this}setStyle(e,t=yt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){const i=M_[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Os(e.r),this.g=Os(e.g),this.b=Os(e.b),this}copyLinearToSRGB(e){return this.r=Tu(e.r),this.g=Tu(e.g),this.b=Tu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return Je.fromWorkingColorSpace($t.copy(this),e),Math.round(Vt($t.r*255,0,255))*65536+Math.round(Vt($t.g*255,0,255))*256+Math.round(Vt($t.b*255,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.fromWorkingColorSpace($t.copy(this),t);const i=$t.r,r=$t.g,s=$t.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Je.workingColorSpace){return Je.fromWorkingColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=yt){Je.fromWorkingColorSpace($t.copy(this),e);const t=$t.r,i=$t.g,r=$t.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Hi),this.setHSL(Hi.h+e,Hi.s+t,Hi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Hi),e.getHSL(el);const i=Yo(Hi.h,el.h,t),r=Yo(Hi.s,el.s,t),s=Yo(Hi.l,el.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const $t=new xe;xe.NAMES=M_;let OE=0;class ti extends gr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:OE++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=Us,this.side=Ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Kd,this.blendDst=Zd,this.blendEquation=Cr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new xe(0,0,0),this.blendAlpha=0,this.depthFunc=cc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Kr,this.stencilZFail=Kr,this.stencilZPass=Kr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Us&&(i.blending=this.blending),this.side!==Ui&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Kd&&(i.blendSrc=this.blendSrc),this.blendDst!==Zd&&(i.blendDst=this.blendDst),this.blendEquation!==Cr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==cc&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wm&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Kr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Kr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Kr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Qi extends ti{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=lf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new P,tl=new Ce;class Bt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=th,this.updateRange={offset:0,count:-1},this.gpuType=Zn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)tl.fromBufferAttribute(this,t),tl.applyMatrix3(e),this.setXY(t,tl.x,tl.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ci(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=tt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ci(t,this.array)),t}setX(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ci(t,this.array)),t}setY(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ci(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ci(t,this.array)),t}setW(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),i=tt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),i=tt(i,this.array),r=tt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),i=tt(i,this.array),r=tt(r,this.array),s=tt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==th&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}}class E_ extends Bt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class w_ extends Bt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class bn extends Bt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let kE=0;const In=new Be,ku=new ft,ss=new P,Mn=new hi,Co=new hi,Ut=new P;class Pn extends gr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kE++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(__(e)?w_:E_)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ge().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,t,i){return In.makeTranslation(e,t,i),this.applyMatrix4(In),this}scale(e,t,i){return In.makeScale(e,t,i),this.applyMatrix4(In),this}lookAt(e){return ku.lookAt(e),ku.updateMatrix(),this.applyMatrix4(ku.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ss).negate(),this.translate(ss.x,ss.y,ss.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new bn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Mn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new P,1/0);return}if(e){const i=this.boundingSphere.center;if(Mn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Co.setFromBufferAttribute(a),this.morphTargetsRelative?(Ut.addVectors(Mn.min,Co.min),Mn.expandByPoint(Ut),Ut.addVectors(Mn.max,Co.max),Mn.expandByPoint(Ut)):(Mn.expandByPoint(Co.min),Mn.expandByPoint(Co.max))}Mn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Ut.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ut));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ut.fromBufferAttribute(a,c),l&&(ss.fromBufferAttribute(e,c),Ut.add(ss)),r=Math.max(r,i.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,o=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bt(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let T=0;T<a;T++)c[T]=new P,u[T]=new P;const h=new P,f=new P,m=new P,g=new Ce,_=new Ce,p=new Ce,d=new P,v=new P;function x(T,j,Y){h.fromArray(r,T*3),f.fromArray(r,j*3),m.fromArray(r,Y*3),g.fromArray(o,T*2),_.fromArray(o,j*2),p.fromArray(o,Y*2),f.sub(h),m.sub(h),_.sub(g),p.sub(g);const Z=1/(_.x*p.y-p.x*_.y);isFinite(Z)&&(d.copy(f).multiplyScalar(p.y).addScaledVector(m,-_.y).multiplyScalar(Z),v.copy(m).multiplyScalar(_.x).addScaledVector(f,-p.x).multiplyScalar(Z),c[T].add(d),c[j].add(d),c[Y].add(d),u[T].add(v),u[j].add(v),u[Y].add(v))}let y=this.groups;y.length===0&&(y=[{start:0,count:i.length}]);for(let T=0,j=y.length;T<j;++T){const Y=y[T],Z=Y.start,D=Y.count;for(let H=Z,Q=Z+D;H<Q;H+=3)x(i[H+0],i[H+1],i[H+2])}const M=new P,C=new P,w=new P,I=new P;function S(T){w.fromArray(s,T*3),I.copy(w);const j=c[T];M.copy(j),M.sub(w.multiplyScalar(w.dot(j))).normalize(),C.crossVectors(I,j);const Z=C.dot(u[T])<0?-1:1;l[T*4]=M.x,l[T*4+1]=M.y,l[T*4+2]=M.z,l[T*4+3]=Z}for(let T=0,j=y.length;T<j;++T){const Y=y[T],Z=Y.start,D=Y.count;for(let H=Z,Q=Z+D;H<Q;H+=3)S(i[H+0]),S(i[H+1]),S(i[H+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Bt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,m=i.count;f<m;f++)i.setXYZ(f,0,0,0);const r=new P,s=new P,o=new P,a=new P,l=new P,c=new P,u=new P,h=new P;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),_=e.getX(f+1),p=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,p),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,p),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=t.count;f<m;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let m=0,g=0;for(let _=0,p=l.length;_<p;_++){a.isInterleavedBufferAttribute?m=l[_]*a.data.stride+a.offset:m=l[_]*u;for(let d=0;d<u;d++)f[g++]=c[m++]}return new Bt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Pn,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],m=e(f,i);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const m=c[h];u.push(m.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,m=h.length;f<m;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const km=new Be,Mr=new co,nl=new fi,Bm=new P,os=new P,as=new P,ls=new P,Bu=new P,il=new P,rl=new Ce,sl=new Ce,ol=new Ce,zm=new P,Vm=new P,Hm=new P,al=new P,ll=new P;class ht extends ft{constructor(e=new Pn,t=new Qi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){il.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(Bu.fromBufferAttribute(h,e),o?il.addScaledVector(Bu,u):il.addScaledVector(Bu.sub(t),u))}t.add(il)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),nl.copy(i.boundingSphere),nl.applyMatrix4(s),Mr.copy(e.ray).recast(e.near),!(nl.containsPoint(Mr.origin)===!1&&(Mr.intersectSphere(nl,Bm)===null||Mr.origin.distanceToSquared(Bm)>(e.far-e.near)**2))&&(km.copy(s).invert(),Mr.copy(e.ray).applyMatrix4(km),!(i.boundingBox!==null&&Mr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Mr)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,m=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const p=f[g],d=o[p.materialIndex],v=Math.max(p.start,m.start),x=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let y=v,M=x;y<M;y+=3){const C=a.getX(y),w=a.getX(y+1),I=a.getX(y+2);r=cl(this,d,e,i,c,u,h,C,w,I),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(a.count,m.start+m.count);for(let p=g,d=_;p<d;p+=3){const v=a.getX(p),x=a.getX(p+1),y=a.getX(p+2);r=cl(this,o,e,i,c,u,h,v,x,y),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const p=f[g],d=o[p.materialIndex],v=Math.max(p.start,m.start),x=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let y=v,M=x;y<M;y+=3){const C=y,w=y+1,I=y+2;r=cl(this,d,e,i,c,u,h,C,w,I),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let p=g,d=_;p<d;p+=3){const v=p,x=p+1,y=p+2;r=cl(this,o,e,i,c,u,h,v,x,y),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function BE(n,e,t,i,r,s,o,a){let l;if(e.side===vn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Ui,a),l===null)return null;ll.copy(a),ll.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(ll);return c<t.near||c>t.far?null:{distance:c,point:ll.clone(),object:n}}function cl(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,os),n.getVertexPosition(l,as),n.getVertexPosition(c,ls);const u=BE(n,e,t,i,os,as,ls,al);if(u){r&&(rl.fromBufferAttribute(r,a),sl.fromBufferAttribute(r,l),ol.fromBufferAttribute(r,c),u.uv=Fn.getInterpolation(al,os,as,ls,rl,sl,ol,new Ce)),s&&(rl.fromBufferAttribute(s,a),sl.fromBufferAttribute(s,l),ol.fromBufferAttribute(s,c),u.uv1=Fn.getInterpolation(al,os,as,ls,rl,sl,ol,new Ce),u.uv2=u.uv1),o&&(zm.fromBufferAttribute(o,a),Vm.fromBufferAttribute(o,l),Hm.fromBufferAttribute(o,c),u.normal=Fn.getInterpolation(al,os,as,ls,zm,Vm,Hm,new P),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new P,materialIndex:0};Fn.getNormal(os,as,ls,h.normal),u.face=h}return u}class uo extends Pn{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,m=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new bn(c,3)),this.setAttribute("normal",new bn(u,3)),this.setAttribute("uv",new bn(h,2));function g(_,p,d,v,x,y,M,C,w,I,S){const T=y/w,j=M/I,Y=y/2,Z=M/2,D=C/2,H=w+1,Q=I+1;let K=0,O=0;const G=new P;for(let z=0;z<Q;z++){const U=z*j-Z;for(let k=0;k<H;k++){const ue=k*T-Y;G[_]=ue*v,G[p]=U*x,G[d]=D,c.push(G.x,G.y,G.z),G[_]=0,G[p]=0,G[d]=C>0?1:-1,u.push(G.x,G.y,G.z),h.push(k/w),h.push(1-z/I),K+=1}}for(let z=0;z<I;z++)for(let U=0;U<w;U++){const k=f+U+H*z,ue=f+U+H*(z+1),de=f+(U+1)+H*(z+1),fe=f+(U+1)+H*z;l.push(k,ue,fe),l.push(ue,de,fe),O+=6}a.addGroup(m,O,S),m+=O,f+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new uo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function no(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function nn(n){const e={};for(let t=0;t<n.length;t++){const i=no(n[t]);for(const r in i)e[r]=i[r]}return e}function zE(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function T_(n){return n.getRenderTarget()===null?n.outputColorSpace:Je.workingColorSpace}const b_={clone:no,merge:nn};var VE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,HE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ni extends ti{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=VE,this.fragmentShader=HE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=no(e.uniforms),this.uniformsGroups=zE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class gf extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Be,this.projectionMatrix=new Be,this.projectionMatrixInverse=new Be,this.coordinateSystem=Ci}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class sn extends gf{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=eo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Fs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return eo*2*Math.atan(Math.tan(Fs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Fs*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const cs=-90,us=1;class GE extends ft{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new sn(cs,us,e,t);r.layers=this.layers,this.add(r);const s=new sn(cs,us,e,t);s.layers=this.layers,this.add(s);const o=new sn(cs,us,e,t);o.layers=this.layers,this.add(o);const a=new sn(cs,us,e,t);a.layers=this.layers,this.add(a);const l=new sn(cs,us,e,t);l.layers=this.layers,this.add(l);const c=new sn(cs,us,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Ci)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===gc)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(h,f,m),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class A_ extends kt{constructor(e,t,i,r,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Ys,super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class WE extends hr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&($o("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Or?yt:On),this.texture=new A_(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:un}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new uo(5,5,5),s=new ni({name:"CubemapFromEquirect",uniforms:no(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:vn,blending:ar});s.uniforms.tEquirect.value=t;const o=new ht(r,s),a=t.minFilter;return t.minFilter===Gr&&(t.minFilter=un),new GE(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}const zu=new P,jE=new P,XE=new Ge;class Ti{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=zu.subVectors(i,t).cross(jE.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(zu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||XE.getNormalMatrix(e),r=this.coplanarPoint(zu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Er=new fi,ul=new P;class vf{constructor(e=new Ti,t=new Ti,i=new Ti,r=new Ti,s=new Ti,o=new Ti){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ci){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],h=r[6],f=r[7],m=r[8],g=r[9],_=r[10],p=r[11],d=r[12],v=r[13],x=r[14],y=r[15];if(i[0].setComponents(l-s,f-c,p-m,y-d).normalize(),i[1].setComponents(l+s,f+c,p+m,y+d).normalize(),i[2].setComponents(l+o,f+u,p+g,y+v).normalize(),i[3].setComponents(l-o,f-u,p-g,y-v).normalize(),i[4].setComponents(l-a,f-h,p-_,y-x).normalize(),t===Ci)i[5].setComponents(l+a,f+h,p+_,y+x).normalize();else if(t===gc)i[5].setComponents(a,h,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Er.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Er.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Er)}intersectsSprite(e){return Er.center.set(0,0,0),Er.radius=.7071067811865476,Er.applyMatrix4(e.matrixWorld),this.intersectsSphere(Er)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(ul.x=r.normal.x>0?e.max.x:e.min.x,ul.y=r.normal.y>0?e.max.y:e.min.y,ul.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ul)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function C_(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function qE(n,e){const t=e.isWebGL2,i=new WeakMap;function r(c,u){const h=c.array,f=c.usage,m=n.createBuffer();n.bindBuffer(u,m),n.bufferData(u,h,f),c.onUploadCallback();let g;if(h instanceof Float32Array)g=n.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)g=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=n.UNSIGNED_SHORT;else if(h instanceof Int16Array)g=n.SHORT;else if(h instanceof Uint32Array)g=n.UNSIGNED_INT;else if(h instanceof Int32Array)g=n.INT;else if(h instanceof Int8Array)g=n.BYTE;else if(h instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:m,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version}}function s(c,u,h){const f=u.array,m=u.updateRange;n.bindBuffer(h,c),m.count===-1?n.bufferSubData(h,0,f):(t?n.bufferSubData(h,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):n.bufferSubData(h,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(n.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=i.get(c);(!f||f.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h===void 0?i.set(c,r(c,u)):h.version<c.version&&(s(h.buffer,c,u),h.version=c.version)}return{get:o,remove:a,update:l}}class Ea extends Pn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,h=e/a,f=t/l,m=[],g=[],_=[],p=[];for(let d=0;d<u;d++){const v=d*f-o;for(let x=0;x<c;x++){const y=x*h-s;g.push(y,-v,0),_.push(0,0,1),p.push(x/a),p.push(1-d/l)}}for(let d=0;d<l;d++)for(let v=0;v<a;v++){const x=v+c*d,y=v+c*(d+1),M=v+1+c*(d+1),C=v+1+c*d;m.push(x,y,C),m.push(y,M,C)}this.setIndex(m),this.setAttribute("position",new bn(g,3)),this.setAttribute("normal",new bn(_,3)),this.setAttribute("uv",new bn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ea(e.width,e.height,e.widthSegments,e.heightSegments)}}var YE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$E=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,KE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ZE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,QE=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,JE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ew=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,tw=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,nw=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,iw=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rw=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,sw=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ow=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,aw=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,lw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,cw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,uw=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dw=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,hw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,fw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,pw=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,mw=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,gw=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,vw=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,_w=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xw=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yw=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sw=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Mw="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ew=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,ww=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Tw=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,bw=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Aw=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Rw=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Pw=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lw=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Iw=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Nw=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Dw=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Uw=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Fw=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ow=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kw=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Bw=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,zw=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vw=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Hw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Gw=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ww=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	anisotropyV /= material.anisotropy;
	material.anisotropy = saturate( material.anisotropy );
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x - tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x + tbn[ 0 ] * anisotropyV.y;
#endif`,jw=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Xw=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,qw=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Yw=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$w=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Kw=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zw=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Qw=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Jw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,eT=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,nT=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,iT=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rT=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sT=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,oT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,aT=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,lT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,cT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,uT=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,dT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,pT=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,mT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_T=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yT=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ST=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,MT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ET=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,TT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,AT=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,CT=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,RT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,PT=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,LT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,IT=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,NT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,DT=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,UT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,FT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,OT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kT=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,BT=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,zT=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,VT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,HT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,GT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,WT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const jT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,XT=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,YT=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$T=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,KT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZT=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,QT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,JT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,e1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,t1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,n1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,i1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,r1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,s1=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,o1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,a1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,l1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,c1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,u1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,h1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,f1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,p1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,m1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,g1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,v1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,y1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,S1=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,M1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,E1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,w1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:YE,alphahash_pars_fragment:$E,alphamap_fragment:KE,alphamap_pars_fragment:ZE,alphatest_fragment:QE,alphatest_pars_fragment:JE,aomap_fragment:ew,aomap_pars_fragment:tw,begin_vertex:nw,beginnormal_vertex:iw,bsdfs:rw,iridescence_fragment:sw,bumpmap_pars_fragment:ow,clipping_planes_fragment:aw,clipping_planes_pars_fragment:lw,clipping_planes_pars_vertex:cw,clipping_planes_vertex:uw,color_fragment:dw,color_pars_fragment:hw,color_pars_vertex:fw,color_vertex:pw,common:mw,cube_uv_reflection_fragment:gw,defaultnormal_vertex:vw,displacementmap_pars_vertex:_w,displacementmap_vertex:xw,emissivemap_fragment:yw,emissivemap_pars_fragment:Sw,colorspace_fragment:Mw,colorspace_pars_fragment:Ew,envmap_fragment:ww,envmap_common_pars_fragment:Tw,envmap_pars_fragment:bw,envmap_pars_vertex:Aw,envmap_physical_pars_fragment:Bw,envmap_vertex:Cw,fog_vertex:Rw,fog_pars_vertex:Pw,fog_fragment:Lw,fog_pars_fragment:Iw,gradientmap_pars_fragment:Nw,lightmap_fragment:Dw,lightmap_pars_fragment:Uw,lights_lambert_fragment:Fw,lights_lambert_pars_fragment:Ow,lights_pars_begin:kw,lights_toon_fragment:zw,lights_toon_pars_fragment:Vw,lights_phong_fragment:Hw,lights_phong_pars_fragment:Gw,lights_physical_fragment:Ww,lights_physical_pars_fragment:jw,lights_fragment_begin:Xw,lights_fragment_maps:qw,lights_fragment_end:Yw,logdepthbuf_fragment:$w,logdepthbuf_pars_fragment:Kw,logdepthbuf_pars_vertex:Zw,logdepthbuf_vertex:Qw,map_fragment:Jw,map_pars_fragment:eT,map_particle_fragment:tT,map_particle_pars_fragment:nT,metalnessmap_fragment:iT,metalnessmap_pars_fragment:rT,morphcolor_vertex:sT,morphnormal_vertex:oT,morphtarget_pars_vertex:aT,morphtarget_vertex:lT,normal_fragment_begin:cT,normal_fragment_maps:uT,normal_pars_fragment:dT,normal_pars_vertex:hT,normal_vertex:fT,normalmap_pars_fragment:pT,clearcoat_normal_fragment_begin:mT,clearcoat_normal_fragment_maps:gT,clearcoat_pars_fragment:vT,iridescence_pars_fragment:_T,opaque_fragment:xT,packing:yT,premultiplied_alpha_fragment:ST,project_vertex:MT,dithering_fragment:ET,dithering_pars_fragment:wT,roughnessmap_fragment:TT,roughnessmap_pars_fragment:bT,shadowmap_pars_fragment:AT,shadowmap_pars_vertex:CT,shadowmap_vertex:RT,shadowmask_pars_fragment:PT,skinbase_vertex:LT,skinning_pars_vertex:IT,skinning_vertex:NT,skinnormal_vertex:DT,specularmap_fragment:UT,specularmap_pars_fragment:FT,tonemapping_fragment:OT,tonemapping_pars_fragment:kT,transmission_fragment:BT,transmission_pars_fragment:zT,uv_pars_fragment:VT,uv_pars_vertex:HT,uv_vertex:GT,worldpos_vertex:WT,background_vert:jT,background_frag:XT,backgroundCube_vert:qT,backgroundCube_frag:YT,cube_vert:$T,cube_frag:KT,depth_vert:ZT,depth_frag:QT,distanceRGBA_vert:JT,distanceRGBA_frag:e1,equirect_vert:t1,equirect_frag:n1,linedashed_vert:i1,linedashed_frag:r1,meshbasic_vert:s1,meshbasic_frag:o1,meshlambert_vert:a1,meshlambert_frag:l1,meshmatcap_vert:c1,meshmatcap_frag:u1,meshnormal_vert:d1,meshnormal_frag:h1,meshphong_vert:f1,meshphong_frag:p1,meshphysical_vert:m1,meshphysical_frag:g1,meshtoon_vert:v1,meshtoon_frag:_1,points_vert:x1,points_frag:y1,shadow_vert:S1,shadow_frag:M1,sprite_vert:E1,sprite_frag:w1},ce={common:{diffuse:{value:new xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new xe(16777215)},opacity:{value:1},center:{value:new Ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},ai={basic:{uniforms:nn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:nn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new xe(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:nn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new xe(0)},specular:{value:new xe(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:nn([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:nn([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new xe(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:nn([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:nn([ce.points,ce.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:nn([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:nn([ce.common,ce.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:nn([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:nn([ce.sprite,ce.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:nn([ce.common,ce.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:nn([ce.lights,ce.fog,{color:{value:new xe(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};ai.physical={uniforms:nn([ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new xe(0)},specularColor:{value:new xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const dl={r:0,b:0,g:0};function T1(n,e,t,i,r,s,o){const a=new xe(0);let l=s===!0?0:1,c,u,h=null,f=0,m=null;function g(p,d){let v=!1,x=d.isScene===!0?d.background:null;x&&x.isTexture&&(x=(d.backgroundBlurriness>0?t:e).get(x)),x===null?_(a,l):x&&x.isColor&&(_(x,1),v=!0);const y=n.xr.getEnvironmentBlendMode();y==="additive"?i.buffers.color.setClear(0,0,0,1,o):y==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||v)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Uc)?(u===void 0&&(u=new ht(new uo(1,1,1),new ni({name:"BackgroundCubeMaterial",uniforms:no(ai.backgroundCube.uniforms),vertexShader:ai.backgroundCube.vertexShader,fragmentShader:ai.backgroundCube.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(M,C,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.toneMapped=Je.getTransfer(x.colorSpace)!==lt,(h!==x||f!==x.version||m!==n.toneMapping)&&(u.material.needsUpdate=!0,h=x,f=x.version,m=n.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new ht(new Ea(2,2),new ni({name:"BackgroundMaterial",uniforms:no(ai.background.uniforms),vertexShader:ai.background.vertexShader,fragmentShader:ai.background.fragmentShader,side:Ui,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=Je.getTransfer(x.colorSpace)!==lt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,h=x,f=x.version,m=n.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function _(p,d){p.getRGB(dl,T_(n)),i.buffers.color.setClear(dl.r,dl.g,dl.b,d,o)}return{getClearColor:function(){return a},setClearColor:function(p,d=1){a.set(p),l=d,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,_(a,l)},render:g}}function b1(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},l=p(null);let c=l,u=!1;function h(D,H,Q,K,O){let G=!1;if(o){const z=_(K,Q,H);c!==z&&(c=z,m(c.object)),G=d(D,K,Q,O),G&&v(D,K,Q,O)}else{const z=H.wireframe===!0;(c.geometry!==K.id||c.program!==Q.id||c.wireframe!==z)&&(c.geometry=K.id,c.program=Q.id,c.wireframe=z,G=!0)}O!==null&&t.update(O,n.ELEMENT_ARRAY_BUFFER),(G||u)&&(u=!1,I(D,H,Q,K),O!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function f(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function m(D){return i.isWebGL2?n.bindVertexArray(D):s.bindVertexArrayOES(D)}function g(D){return i.isWebGL2?n.deleteVertexArray(D):s.deleteVertexArrayOES(D)}function _(D,H,Q){const K=Q.wireframe===!0;let O=a[D.id];O===void 0&&(O={},a[D.id]=O);let G=O[H.id];G===void 0&&(G={},O[H.id]=G);let z=G[K];return z===void 0&&(z=p(f()),G[K]=z),z}function p(D){const H=[],Q=[],K=[];for(let O=0;O<r;O++)H[O]=0,Q[O]=0,K[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:Q,attributeDivisors:K,object:D,attributes:{},index:null}}function d(D,H,Q,K){const O=c.attributes,G=H.attributes;let z=0;const U=Q.getAttributes();for(const k in U)if(U[k].location>=0){const de=O[k];let fe=G[k];if(fe===void 0&&(k==="instanceMatrix"&&D.instanceMatrix&&(fe=D.instanceMatrix),k==="instanceColor"&&D.instanceColor&&(fe=D.instanceColor)),de===void 0||de.attribute!==fe||fe&&de.data!==fe.data)return!0;z++}return c.attributesNum!==z||c.index!==K}function v(D,H,Q,K){const O={},G=H.attributes;let z=0;const U=Q.getAttributes();for(const k in U)if(U[k].location>=0){let de=G[k];de===void 0&&(k==="instanceMatrix"&&D.instanceMatrix&&(de=D.instanceMatrix),k==="instanceColor"&&D.instanceColor&&(de=D.instanceColor));const fe={};fe.attribute=de,de&&de.data&&(fe.data=de.data),O[k]=fe,z++}c.attributes=O,c.attributesNum=z,c.index=K}function x(){const D=c.newAttributes;for(let H=0,Q=D.length;H<Q;H++)D[H]=0}function y(D){M(D,0)}function M(D,H){const Q=c.newAttributes,K=c.enabledAttributes,O=c.attributeDivisors;Q[D]=1,K[D]===0&&(n.enableVertexAttribArray(D),K[D]=1),O[D]!==H&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,H),O[D]=H)}function C(){const D=c.newAttributes,H=c.enabledAttributes;for(let Q=0,K=H.length;Q<K;Q++)H[Q]!==D[Q]&&(n.disableVertexAttribArray(Q),H[Q]=0)}function w(D,H,Q,K,O,G,z){z===!0?n.vertexAttribIPointer(D,H,Q,O,G):n.vertexAttribPointer(D,H,Q,K,O,G)}function I(D,H,Q,K){if(i.isWebGL2===!1&&(D.isInstancedMesh||K.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const O=K.attributes,G=Q.getAttributes(),z=H.defaultAttributeValues;for(const U in G){const k=G[U];if(k.location>=0){let ue=O[U];if(ue===void 0&&(U==="instanceMatrix"&&D.instanceMatrix&&(ue=D.instanceMatrix),U==="instanceColor"&&D.instanceColor&&(ue=D.instanceColor)),ue!==void 0){const de=ue.normalized,fe=ue.itemSize,Se=t.get(ue);if(Se===void 0)continue;const De=Se.buffer,Re=Se.type,Ne=Se.bytesPerElement,ot=i.isWebGL2===!0&&(Re===n.INT||Re===n.UNSIGNED_INT||ue.gpuType===c_);if(ue.isInterleavedBufferAttribute){const ze=ue.data,B=ze.stride,jt=ue.offset;if(ze.isInstancedInterleavedBuffer){for(let we=0;we<k.locationSize;we++)M(k.location+we,ze.meshPerAttribute);D.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=ze.meshPerAttribute*ze.count)}else for(let we=0;we<k.locationSize;we++)y(k.location+we);n.bindBuffer(n.ARRAY_BUFFER,De);for(let we=0;we<k.locationSize;we++)w(k.location+we,fe/k.locationSize,Re,de,B*Ne,(jt+fe/k.locationSize*we)*Ne,ot)}else{if(ue.isInstancedBufferAttribute){for(let ze=0;ze<k.locationSize;ze++)M(k.location+ze,ue.meshPerAttribute);D.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let ze=0;ze<k.locationSize;ze++)y(k.location+ze);n.bindBuffer(n.ARRAY_BUFFER,De);for(let ze=0;ze<k.locationSize;ze++)w(k.location+ze,fe/k.locationSize,Re,de,fe*Ne,fe/k.locationSize*ze*Ne,ot)}}else if(z!==void 0){const de=z[U];if(de!==void 0)switch(de.length){case 2:n.vertexAttrib2fv(k.location,de);break;case 3:n.vertexAttrib3fv(k.location,de);break;case 4:n.vertexAttrib4fv(k.location,de);break;default:n.vertexAttrib1fv(k.location,de)}}}}C()}function S(){Y();for(const D in a){const H=a[D];for(const Q in H){const K=H[Q];for(const O in K)g(K[O].object),delete K[O];delete H[Q]}delete a[D]}}function T(D){if(a[D.id]===void 0)return;const H=a[D.id];for(const Q in H){const K=H[Q];for(const O in K)g(K[O].object),delete K[O];delete H[Q]}delete a[D.id]}function j(D){for(const H in a){const Q=a[H];if(Q[D.id]===void 0)continue;const K=Q[D.id];for(const O in K)g(K[O].object),delete K[O];delete Q[D.id]}}function Y(){Z(),u=!0,c!==l&&(c=l,m(c.object))}function Z(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:Y,resetDefaultState:Z,dispose:S,releaseStatesOfGeometry:T,releaseStatesOfProgram:j,initAttributes:x,enableAttribute:y,disableUnusedAttributes:C}}function A1(n,e,t,i){const r=i.isWebGL2;let s;function o(c){s=c}function a(c,u){n.drawArrays(s,c,u),t.update(u,s,1)}function l(c,u,h){if(h===0)return;let f,m;if(r)f=n,m="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[m](s,c,u,h),t.update(u,s,h)}this.setMode=o,this.render=a,this.renderInstances=l}function C1(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),d=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),x=f>0,y=o||e.has("OES_texture_float"),M=x&&y,C=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:d,maxFragmentUniforms:v,vertexTextures:x,floatFragmentTextures:y,floatVertexTextures:M,maxSamples:C}}function R1(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new Ti,a=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const m=h.length!==0||f||i!==0||r;return r=f,i=h.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,m){const g=h.clippingPlanes,_=h.clipIntersection,p=h.clipShadows,d=n.get(h);if(!r||g===null||g.length===0||s&&!p)s?u(null):c();else{const v=s?0:i,x=v*4;let y=d.clippingState||null;l.value=y,y=u(g,f,x,m);for(let M=0;M!==x;++M)y[M]=t[M];d.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,m,g){const _=h!==null?h.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const d=m+_*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(p===null||p.length<d)&&(p=new Float32Array(d));for(let x=0,y=m;x!==_;++x,y+=4)o.copy(h[x]).applyMatrix4(v,a),o.normal.toArray(p,y),p[y+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function P1(n){let e=new WeakMap;function t(o,a){return a===uc?o.mapping=Ys:a===Qd&&(o.mapping=$s),o}function i(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){const a=o.mapping;if(a===uc||a===Qd)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new WE(l.height/2);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class _f extends gf{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Cs=4,Gm=[.125,.215,.35,.446,.526,.582],Rr=20,Vu=new _f,Wm=new xe;let Hu=null,Gu=0,Wu=0;const Ar=(1+Math.sqrt(5))/2,ds=1/Ar,jm=[new P(1,1,1),new P(-1,1,1),new P(1,1,-1),new P(-1,1,-1),new P(0,Ar,ds),new P(0,Ar,-ds),new P(ds,0,Ar),new P(-ds,0,Ar),new P(Ar,ds,0),new P(-Ar,ds,0)];class rh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Hu=this._renderer.getRenderTarget(),Gu=this._renderer.getActiveCubeFace(),Wu=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ym(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Hu,Gu,Wu),e.scissorTest=!1,hl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ys||e.mapping===$s?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Hu=this._renderer.getRenderTarget(),Gu=this._renderer.getActiveCubeFace(),Wu=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:un,minFilter:un,generateMipmaps:!1,type:Zs,format:hn,colorSpace:Wt,depthBuffer:!1},r=Xm(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xm(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=L1(s)),this._blurMaterial=I1(s,e,t)}return r}_compileMaterial(e){const t=new ht(this._lodPlanes[0],e);this._renderer.compile(t,Vu)}_sceneToCubeUV(e,t,i,r){const a=new sn(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Wm),u.toneMapping=lr,u.autoClear=!1;const m=new Qi({name:"PMREM.Background",side:vn,depthWrite:!1,depthTest:!1}),g=new ht(new uo,m);let _=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,_=!0):(m.color.copy(Wm),_=!0);for(let d=0;d<6;d++){const v=d%3;v===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):v===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const x=this._cubeSize;hl(r,v*x,d>2?x:0,x,x),u.setRenderTarget(r),_&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Ys||e.mapping===$s;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ym()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qm());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new ht(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;hl(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Vu)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=jm[(r-1)%jm.length];this._blur(e,r-1,r,s,o)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new ht(this._lodPlanes[r],c),f=c.uniforms,m=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Rr-1),_=s/g,p=isFinite(s)?1+Math.floor(u*_):Rr;p>Rr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Rr}`);const d=[];let v=0;for(let w=0;w<Rr;++w){const I=w/_,S=Math.exp(-I*I/2);d.push(S),w===0?v+=S:w<p&&(v+=2*S)}for(let w=0;w<d.length;w++)d[w]=d[w]/v;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-i;const y=this._sizeLods[r],M=3*y*(r>x-Cs?r-x+Cs:0),C=4*(this._cubeSize-y);hl(t,M,C,3*y,2*y),l.setRenderTarget(t),l.render(h,Vu)}}function L1(n){const e=[],t=[],i=[];let r=n;const s=n-Cs+1+Gm.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-Cs?l=Gm[o-n+Cs-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],m=6,g=6,_=3,p=2,d=1,v=new Float32Array(_*g*m),x=new Float32Array(p*g*m),y=new Float32Array(d*g*m);for(let C=0;C<m;C++){const w=C%3*2/3-1,I=C>2?0:-1,S=[w,I,0,w+2/3,I,0,w+2/3,I+1,0,w,I,0,w+2/3,I+1,0,w,I+1,0];v.set(S,_*g*C),x.set(f,p*g*C);const T=[C,C,C,C,C,C];y.set(T,d*g*C)}const M=new Pn;M.setAttribute("position",new Bt(v,_)),M.setAttribute("uv",new Bt(x,p)),M.setAttribute("faceIndex",new Bt(y,d)),e.push(M),r>Cs&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Xm(n,e,t){const i=new hr(n,e,t);return i.texture.mapping=Uc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function hl(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function I1(n,e,t){const i=new Float32Array(Rr),r=new P(0,1,0);return new ni({name:"SphericalGaussianBlur",defines:{n:Rr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:xf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ar,depthTest:!1,depthWrite:!1})}function qm(){return new ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ar,depthTest:!1,depthWrite:!1})}function Ym(){return new ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ar,depthTest:!1,depthWrite:!1})}function xf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function N1(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===uc||l===Qd,u=l===Ys||l===$s;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return t===null&&(t=new rh(n)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{const h=a.image;if(c&&h&&h.height>0||u&&h&&r(h)){t===null&&(t=new rh(n));const f=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",s),f.texture}else return null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function D1(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function U1(n,e,t,i){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,d=_.length;p<d;p++)e.remove(_[p])}f.removeEventListener("dispose",o),delete r[f.id];const m=s.get(f);m&&(e.remove(m),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)e.update(f[g],n.ARRAY_BUFFER);const m=h.morphAttributes;for(const g in m){const _=m[g];for(let p=0,d=_.length;p<d;p++)e.update(_[p],n.ARRAY_BUFFER)}}function c(h){const f=[],m=h.index,g=h.attributes.position;let _=0;if(m!==null){const v=m.array;_=m.version;for(let x=0,y=v.length;x<y;x+=3){const M=v[x+0],C=v[x+1],w=v[x+2];f.push(M,C,C,w,w,M)}}else if(g!==void 0){const v=g.array;_=g.version;for(let x=0,y=v.length/3-1;x<y;x+=3){const M=x+0,C=x+1,w=x+2;f.push(M,C,C,w,w,M)}}else return;const p=new(__(f)?w_:E_)(f,1);p.version=_;const d=s.get(h);d&&e.remove(d),s.set(h,p)}function u(h){const f=s.get(h);if(f){const m=h.index;m!==null&&f.version<m.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function F1(n,e,t,i){const r=i.isWebGL2;let s;function o(f){s=f}let a,l;function c(f){a=f.type,l=f.bytesPerElement}function u(f,m){n.drawElements(s,m,a,f*l),t.update(m,s,1)}function h(f,m,g){if(g===0)return;let _,p;if(r)_=n,p="drawElementsInstanced";else if(_=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",_===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}_[p](s,m,a,f*l,g),t.update(m,s,g)}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=h}function O1(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function k1(n,e){return n[0]-e[0]}function B1(n,e){return Math.abs(e[1])-Math.abs(n[1])}function z1(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,o=new it,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,h){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,_=g!==void 0?g.length:0;let p=s.get(u);if(p===void 0||p.count!==_){let H=function(){Z.dispose(),s.delete(u),u.removeEventListener("dispose",H)};var m=H;p!==void 0&&p.texture.dispose();const x=u.morphAttributes.position!==void 0,y=u.morphAttributes.normal!==void 0,M=u.morphAttributes.color!==void 0,C=u.morphAttributes.position||[],w=u.morphAttributes.normal||[],I=u.morphAttributes.color||[];let S=0;x===!0&&(S=1),y===!0&&(S=2),M===!0&&(S=3);let T=u.attributes.position.count*S,j=1;T>e.maxTextureSize&&(j=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const Y=new Float32Array(T*j*4*_),Z=new S_(Y,T,j,_);Z.type=Zn,Z.needsUpdate=!0;const D=S*4;for(let Q=0;Q<_;Q++){const K=C[Q],O=w[Q],G=I[Q],z=T*j*4*Q;for(let U=0;U<K.count;U++){const k=U*D;x===!0&&(o.fromBufferAttribute(K,U),Y[z+k+0]=o.x,Y[z+k+1]=o.y,Y[z+k+2]=o.z,Y[z+k+3]=0),y===!0&&(o.fromBufferAttribute(O,U),Y[z+k+4]=o.x,Y[z+k+5]=o.y,Y[z+k+6]=o.z,Y[z+k+7]=0),M===!0&&(o.fromBufferAttribute(G,U),Y[z+k+8]=o.x,Y[z+k+9]=o.y,Y[z+k+10]=o.z,Y[z+k+11]=G.itemSize===4?o.w:1)}}p={count:_,texture:Z,size:new Ce(T,j)},s.set(u,p),u.addEventListener("dispose",H)}let d=0;for(let x=0;x<f.length;x++)d+=f[x];const v=u.morphTargetsRelative?1:1-d;h.getUniforms().setValue(n,"morphTargetBaseInfluence",v),h.getUniforms().setValue(n,"morphTargetInfluences",f),h.getUniforms().setValue(n,"morphTargetsTexture",p.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}else{const g=f===void 0?0:f.length;let _=i[u.id];if(_===void 0||_.length!==g){_=[];for(let y=0;y<g;y++)_[y]=[y,0];i[u.id]=_}for(let y=0;y<g;y++){const M=_[y];M[0]=y,M[1]=f[y]}_.sort(B1);for(let y=0;y<8;y++)y<g&&_[y][1]?(a[y][0]=_[y][0],a[y][1]=_[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(k1);const p=u.morphAttributes.position,d=u.morphAttributes.normal;let v=0;for(let y=0;y<8;y++){const M=a[y],C=M[0],w=M[1];C!==Number.MAX_SAFE_INTEGER&&w?(p&&u.getAttribute("morphTarget"+y)!==p[C]&&u.setAttribute("morphTarget"+y,p[C]),d&&u.getAttribute("morphNormal"+y)!==d[C]&&u.setAttribute("morphNormal"+y,d[C]),r[y]=w,v+=w):(p&&u.hasAttribute("morphTarget"+y)===!0&&u.deleteAttribute("morphTarget"+y),d&&u.hasAttribute("morphNormal"+y)===!0&&u.deleteAttribute("morphNormal"+y),r[y]=0)}const x=u.morphTargetsRelative?1:1-v;h.getUniforms().setValue(n,"morphTargetBaseInfluence",x),h.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:l}}function V1(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const R_=new kt,P_=new S_,L_=new CE,I_=new A_,$m=[],Km=[],Zm=new Float32Array(16),Qm=new Float32Array(9),Jm=new Float32Array(4);function ho(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=$m[r];if(s===void 0&&(s=new Float32Array(r),$m[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Lt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function It(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Oc(n,e){let t=Km[e];t===void 0&&(t=new Int32Array(e),Km[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function H1(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function G1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2fv(this.addr,e),It(t,e)}}function W1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;n.uniform3fv(this.addr,e),It(t,e)}}function j1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4fv(this.addr,e),It(t,e)}}function X1(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Lt(t,i))return;Jm.set(i),n.uniformMatrix2fv(this.addr,!1,Jm),It(t,i)}}function q1(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Lt(t,i))return;Qm.set(i),n.uniformMatrix3fv(this.addr,!1,Qm),It(t,i)}}function Y1(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Lt(t,i))return;Zm.set(i),n.uniformMatrix4fv(this.addr,!1,Zm),It(t,i)}}function $1(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function K1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2iv(this.addr,e),It(t,e)}}function Z1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3iv(this.addr,e),It(t,e)}}function Q1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4iv(this.addr,e),It(t,e)}}function J1(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function eb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2uiv(this.addr,e),It(t,e)}}function tb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3uiv(this.addr,e),It(t,e)}}function nb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4uiv(this.addr,e),It(t,e)}}function ib(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2D(e||R_,r)}function rb(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||L_,r)}function sb(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||I_,r)}function ob(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||P_,r)}function ab(n){switch(n){case 5126:return H1;case 35664:return G1;case 35665:return W1;case 35666:return j1;case 35674:return X1;case 35675:return q1;case 35676:return Y1;case 5124:case 35670:return $1;case 35667:case 35671:return K1;case 35668:case 35672:return Z1;case 35669:case 35673:return Q1;case 5125:return J1;case 36294:return eb;case 36295:return tb;case 36296:return nb;case 35678:case 36198:case 36298:case 36306:case 35682:return ib;case 35679:case 36299:case 36307:return rb;case 35680:case 36300:case 36308:case 36293:return sb;case 36289:case 36303:case 36311:case 36292:return ob}}function lb(n,e){n.uniform1fv(this.addr,e)}function cb(n,e){const t=ho(e,this.size,2);n.uniform2fv(this.addr,t)}function ub(n,e){const t=ho(e,this.size,3);n.uniform3fv(this.addr,t)}function db(n,e){const t=ho(e,this.size,4);n.uniform4fv(this.addr,t)}function hb(n,e){const t=ho(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function fb(n,e){const t=ho(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function pb(n,e){const t=ho(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function mb(n,e){n.uniform1iv(this.addr,e)}function gb(n,e){n.uniform2iv(this.addr,e)}function vb(n,e){n.uniform3iv(this.addr,e)}function _b(n,e){n.uniform4iv(this.addr,e)}function xb(n,e){n.uniform1uiv(this.addr,e)}function yb(n,e){n.uniform2uiv(this.addr,e)}function Sb(n,e){n.uniform3uiv(this.addr,e)}function Mb(n,e){n.uniform4uiv(this.addr,e)}function Eb(n,e,t){const i=this.cache,r=e.length,s=Oc(t,r);Lt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||R_,s[o])}function wb(n,e,t){const i=this.cache,r=e.length,s=Oc(t,r);Lt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||L_,s[o])}function Tb(n,e,t){const i=this.cache,r=e.length,s=Oc(t,r);Lt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||I_,s[o])}function bb(n,e,t){const i=this.cache,r=e.length,s=Oc(t,r);Lt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||P_,s[o])}function Ab(n){switch(n){case 5126:return lb;case 35664:return cb;case 35665:return ub;case 35666:return db;case 35674:return hb;case 35675:return fb;case 35676:return pb;case 5124:case 35670:return mb;case 35667:case 35671:return gb;case 35668:case 35672:return vb;case 35669:case 35673:return _b;case 5125:return xb;case 36294:return yb;case 36295:return Sb;case 36296:return Mb;case 35678:case 36198:case 36298:case 36306:case 35682:return Eb;case 35679:case 36299:case 36307:return wb;case 35680:case 36300:case 36308:case 36293:return Tb;case 36289:case 36303:case 36311:case 36292:return bb}}class Cb{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.setValue=ab(t.type)}}class Rb{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.size=t.size,this.setValue=Ab(t.type)}}class Pb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const ju=/(\w+)(\])?(\[|\.)?/g;function eg(n,e){n.seq.push(e),n.map[e.id]=e}function Lb(n,e,t){const i=n.name,r=i.length;for(ju.lastIndex=0;;){const s=ju.exec(i),o=ju.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){eg(t,c===void 0?new Cb(a,n,e):new Rb(a,n,e));break}else{let h=t.map[a];h===void 0&&(h=new Pb(a),eg(t,h)),t=h}}}class Ol{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);Lb(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function tg(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Ib=37297;let Nb=0;function Db(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function Ub(n){const e=Je.getPrimaries(Je.workingColorSpace),t=Je.getPrimaries(n);let i;switch(e===t?i="":e===mc&&t===pc?i="LinearDisplayP3ToLinearSRGB":e===pc&&t===mc&&(i="LinearSRGBToLinearDisplayP3"),n){case Wt:case Fc:return[i,"LinearTransferOETF"];case yt:case hf:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function ng(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Db(n.getShaderSource(e),o)}else return r}function Fb(n,e){const t=Ub(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Ob(n,e){let t;switch(e){case NM:t="Linear";break;case DM:t="Reinhard";break;case UM:t="OptimizedCineon";break;case FM:t="ACESFilmic";break;case OM:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function kb(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Oo).join(`
`)}function Bb(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function zb(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Oo(n){return n!==""}function ig(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function rg(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Vb=/^[ \t]*#include +<([\w\d./]+)>/gm;function sh(n){return n.replace(Vb,Gb)}const Hb=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Gb(n,e){let t=Ve[e];if(t===void 0){const i=Hb.get(e);if(i!==void 0)t=Ve[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return sh(t)}const Wb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sg(n){return n.replace(Wb,jb)}function jb(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function og(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Xb(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===o_?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===aM?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Mi&&(e="SHADOWMAP_TYPE_VSM"),e}function qb(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ys:case $s:e="ENVMAP_TYPE_CUBE";break;case Uc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Yb(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case $s:e="ENVMAP_MODE_REFRACTION";break}return e}function $b(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case lf:e="ENVMAP_BLENDING_MULTIPLY";break;case LM:e="ENVMAP_BLENDING_MIX";break;case IM:e="ENVMAP_BLENDING_ADD";break}return e}function Kb(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Zb(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Xb(t),c=qb(t),u=Yb(t),h=$b(t),f=Kb(t),m=t.isWebGL2?"":kb(t),g=Bb(s),_=r.createProgram();let p,d,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Oo).join(`
`),p.length>0&&(p+=`
`),d=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Oo).join(`
`),d.length>0&&(d+=`
`)):(p=[og(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Oo).join(`
`),d=[m,og(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==lr?"#define TONE_MAPPING":"",t.toneMapping!==lr?Ve.tonemapping_pars_fragment:"",t.toneMapping!==lr?Ob("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,Fb("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Oo).join(`
`)),o=sh(o),o=ig(o,t),o=rg(o,t),a=sh(a),a=ig(a,t),a=rg(a,t),o=sg(o),a=sg(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Tm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Tm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const x=v+p+o,y=v+d+a,M=tg(r,r.VERTEX_SHADER,x),C=tg(r,r.FRAGMENT_SHADER,y);r.attachShader(_,M),r.attachShader(_,C),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function w(j){if(n.debug.checkShaderErrors){const Y=r.getProgramInfoLog(_).trim(),Z=r.getShaderInfoLog(M).trim(),D=r.getShaderInfoLog(C).trim();let H=!0,Q=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,M,C);else{const K=ng(r,M,"vertex"),O=ng(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Program Info Log: `+Y+`
`+K+`
`+O)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(Z===""||D==="")&&(Q=!1);Q&&(j.diagnostics={runnable:H,programLog:Y,vertexShader:{log:Z,prefix:p},fragmentShader:{log:D,prefix:d}})}r.deleteShader(M),r.deleteShader(C),I=new Ol(r,_),S=zb(r,_)}let I;this.getUniforms=function(){return I===void 0&&w(this),I};let S;this.getAttributes=function(){return S===void 0&&w(this),S};let T=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=r.getProgramParameter(_,Ib)),T},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Nb++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=M,this.fragmentShader=C,this}let Qb=0;class Jb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new eA(e),t.set(e,i)),i}}class eA{constructor(e){this.id=Qb++,this.code=e,this.usedTimes=0}}function tA(n,e,t,i,r,s,o){const a=new mf,l=new Jb,c=[],u=r.isWebGL2,h=r.logarithmicDepthBuffer,f=r.vertexTextures;let m=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return S===0?"uv":`uv${S}`}function p(S,T,j,Y,Z){const D=Y.fog,H=Z.geometry,Q=S.isMeshStandardMaterial?Y.environment:null,K=(S.isMeshStandardMaterial?t:e).get(S.envMap||Q),O=K&&K.mapping===Uc?K.image.height:null,G=g[S.type];S.precision!==null&&(m=r.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const z=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,U=z!==void 0?z.length:0;let k=0;H.morphAttributes.position!==void 0&&(k=1),H.morphAttributes.normal!==void 0&&(k=2),H.morphAttributes.color!==void 0&&(k=3);let ue,de,fe,Se;if(G){const Tt=ai[G];ue=Tt.vertexShader,de=Tt.fragmentShader}else ue=S.vertexShader,de=S.fragmentShader,l.update(S),fe=l.getVertexShaderID(S),Se=l.getFragmentShaderID(S);const De=n.getRenderTarget(),Re=Z.isInstancedMesh===!0,Ne=!!S.map,ot=!!S.matcap,ze=!!K,B=!!S.aoMap,jt=!!S.lightMap,we=!!S.bumpMap,Pe=!!S.normalMap,Le=!!S.displacementMap,ut=!!S.emissiveMap,Oe=!!S.metalnessMap,Ue=!!S.roughnessMap,Ke=S.anisotropy>0,wt=S.clearcoat>0,Nt=S.iridescence>0,R=S.sheen>0,E=S.transmission>0,V=Ke&&!!S.anisotropyMap,ie=wt&&!!S.clearcoatMap,ee=wt&&!!S.clearcoatNormalMap,re=wt&&!!S.clearcoatRoughnessMap,_e=Nt&&!!S.iridescenceMap,ae=Nt&&!!S.iridescenceThicknessMap,he=R&&!!S.sheenColorMap,L=R&&!!S.sheenRoughnessMap,oe=!!S.specularMap,J=!!S.specularColorMap,be=!!S.specularIntensityMap,ye=E&&!!S.transmissionMap,Te=E&&!!S.thicknessMap,ve=!!S.gradientMap,me=!!S.alphaMap,je=S.alphaTest>0,N=!!S.alphaHash,le=!!S.extensions,te=!!H.attributes.uv1,$=!!H.attributes.uv2,se=!!H.attributes.uv3;let Ee=lr;return S.toneMapped&&(De===null||De.isXRRenderTarget===!0)&&(Ee=n.toneMapping),{isWebGL2:u,shaderID:G,shaderType:S.type,shaderName:S.name,vertexShader:ue,fragmentShader:de,defines:S.defines,customVertexShaderID:fe,customFragmentShaderID:Se,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,instancing:Re,instancingColor:Re&&Z.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:De===null?n.outputColorSpace:De.isXRRenderTarget===!0?De.texture.colorSpace:Wt,map:Ne,matcap:ot,envMap:ze,envMapMode:ze&&K.mapping,envMapCubeUVHeight:O,aoMap:B,lightMap:jt,bumpMap:we,normalMap:Pe,displacementMap:f&&Le,emissiveMap:ut,normalMapObjectSpace:Pe&&S.normalMapType===tE,normalMapTangentSpace:Pe&&S.normalMapType===df,metalnessMap:Oe,roughnessMap:Ue,anisotropy:Ke,anisotropyMap:V,clearcoat:wt,clearcoatMap:ie,clearcoatNormalMap:ee,clearcoatRoughnessMap:re,iridescence:Nt,iridescenceMap:_e,iridescenceThicknessMap:ae,sheen:R,sheenColorMap:he,sheenRoughnessMap:L,specularMap:oe,specularColorMap:J,specularIntensityMap:be,transmission:E,transmissionMap:ye,thicknessMap:Te,gradientMap:ve,opaque:S.transparent===!1&&S.blending===Us,alphaMap:me,alphaTest:je,alphaHash:N,combine:S.combine,mapUv:Ne&&_(S.map.channel),aoMapUv:B&&_(S.aoMap.channel),lightMapUv:jt&&_(S.lightMap.channel),bumpMapUv:we&&_(S.bumpMap.channel),normalMapUv:Pe&&_(S.normalMap.channel),displacementMapUv:Le&&_(S.displacementMap.channel),emissiveMapUv:ut&&_(S.emissiveMap.channel),metalnessMapUv:Oe&&_(S.metalnessMap.channel),roughnessMapUv:Ue&&_(S.roughnessMap.channel),anisotropyMapUv:V&&_(S.anisotropyMap.channel),clearcoatMapUv:ie&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:ee&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:he&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:L&&_(S.sheenRoughnessMap.channel),specularMapUv:oe&&_(S.specularMap.channel),specularColorMapUv:J&&_(S.specularColorMap.channel),specularIntensityMapUv:be&&_(S.specularIntensityMap.channel),transmissionMapUv:ye&&_(S.transmissionMap.channel),thicknessMapUv:Te&&_(S.thicknessMap.channel),alphaMapUv:me&&_(S.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Pe||Ke),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,vertexUv1s:te,vertexUv2s:$,vertexUv3s:se,pointsUvs:Z.isPoints===!0&&!!H.attributes.uv&&(Ne||me),fog:!!D,useFog:S.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:Z.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:U,morphTextureStride:k,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&j.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ee,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Ne&&S.map.isVideoTexture===!0&&Je.getTransfer(S.map.colorSpace)===lt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Zt,flipSided:S.side===vn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:le&&S.extensions.derivatives===!0,extensionFragDepth:le&&S.extensions.fragDepth===!0,extensionDrawBuffers:le&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:le&&S.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function d(S){const T=[];if(S.shaderID?T.push(S.shaderID):(T.push(S.customVertexShaderID),T.push(S.customFragmentShaderID)),S.defines!==void 0)for(const j in S.defines)T.push(j),T.push(S.defines[j]);return S.isRawShaderMaterial===!1&&(v(T,S),x(T,S),T.push(n.outputColorSpace)),T.push(S.customProgramCacheKey),T.join()}function v(S,T){S.push(T.precision),S.push(T.outputColorSpace),S.push(T.envMapMode),S.push(T.envMapCubeUVHeight),S.push(T.mapUv),S.push(T.alphaMapUv),S.push(T.lightMapUv),S.push(T.aoMapUv),S.push(T.bumpMapUv),S.push(T.normalMapUv),S.push(T.displacementMapUv),S.push(T.emissiveMapUv),S.push(T.metalnessMapUv),S.push(T.roughnessMapUv),S.push(T.anisotropyMapUv),S.push(T.clearcoatMapUv),S.push(T.clearcoatNormalMapUv),S.push(T.clearcoatRoughnessMapUv),S.push(T.iridescenceMapUv),S.push(T.iridescenceThicknessMapUv),S.push(T.sheenColorMapUv),S.push(T.sheenRoughnessMapUv),S.push(T.specularMapUv),S.push(T.specularColorMapUv),S.push(T.specularIntensityMapUv),S.push(T.transmissionMapUv),S.push(T.thicknessMapUv),S.push(T.combine),S.push(T.fogExp2),S.push(T.sizeAttenuation),S.push(T.morphTargetsCount),S.push(T.morphAttributeCount),S.push(T.numDirLights),S.push(T.numPointLights),S.push(T.numSpotLights),S.push(T.numSpotLightMaps),S.push(T.numHemiLights),S.push(T.numRectAreaLights),S.push(T.numDirLightShadows),S.push(T.numPointLightShadows),S.push(T.numSpotLightShadows),S.push(T.numSpotLightShadowsWithMaps),S.push(T.numLightProbes),S.push(T.shadowMapType),S.push(T.toneMapping),S.push(T.numClippingPlanes),S.push(T.numClipIntersection),S.push(T.depthPacking)}function x(S,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),S.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),S.push(a.mask)}function y(S){const T=g[S.type];let j;if(T){const Y=ai[T];j=b_.clone(Y.uniforms)}else j=S.uniforms;return j}function M(S,T){let j;for(let Y=0,Z=c.length;Y<Z;Y++){const D=c[Y];if(D.cacheKey===T){j=D,++j.usedTimes;break}}return j===void 0&&(j=new Zb(n,T,S,s),c.push(j)),j}function C(S){if(--S.usedTimes===0){const T=c.indexOf(S);c[T]=c[c.length-1],c.pop(),S.destroy()}}function w(S){l.remove(S)}function I(){l.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:y,acquireProgram:M,releaseProgram:C,releaseShaderCache:w,programs:c,dispose:I}}function nA(){let n=new WeakMap;function e(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function t(s){n.delete(s)}function i(s,o,a){n.get(s)[o]=a}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function iA(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function ag(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function lg(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(h,f,m,g,_,p){let d=n[e];return d===void 0?(d={id:h.id,object:h,geometry:f,material:m,groupOrder:g,renderOrder:h.renderOrder,z:_,group:p},n[e]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=m,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=_,d.group=p),e++,d}function a(h,f,m,g,_,p){const d=o(h,f,m,g,_,p);m.transmission>0?i.push(d):m.transparent===!0?r.push(d):t.push(d)}function l(h,f,m,g,_,p){const d=o(h,f,m,g,_,p);m.transmission>0?i.unshift(d):m.transparent===!0?r.unshift(d):t.unshift(d)}function c(h,f){t.length>1&&t.sort(h||iA),i.length>1&&i.sort(f||ag),r.length>1&&r.sort(f||ag)}function u(){for(let h=e,f=n.length;h<f;h++){const m=n[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function rA(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new lg,n.set(i,[o])):r>=s.length?(o=new lg,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function sA(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new xe};break;case"SpotLight":t={position:new P,direction:new P,color:new xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new xe,groundColor:new xe};break;case"RectAreaLight":t={color:new xe,position:new P,halfWidth:new P,halfHeight:new P};break}return n[e.id]=t,t}}}function oA(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let aA=0;function lA(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function cA(n,e){const t=new sA,i=oA(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new P);const s=new P,o=new Be,a=new Be;function l(u,h){let f=0,m=0,g=0;for(let Y=0;Y<9;Y++)r.probe[Y].set(0,0,0);let _=0,p=0,d=0,v=0,x=0,y=0,M=0,C=0,w=0,I=0,S=0;u.sort(lA);const T=h===!0?Math.PI:1;for(let Y=0,Z=u.length;Y<Z;Y++){const D=u[Y],H=D.color,Q=D.intensity,K=D.distance,O=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)f+=H.r*Q*T,m+=H.g*Q*T,g+=H.b*Q*T;else if(D.isLightProbe){for(let G=0;G<9;G++)r.probe[G].addScaledVector(D.sh.coefficients[G],Q);S++}else if(D.isDirectionalLight){const G=t.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity*T),D.castShadow){const z=D.shadow,U=i.get(D);U.shadowBias=z.bias,U.shadowNormalBias=z.normalBias,U.shadowRadius=z.radius,U.shadowMapSize=z.mapSize,r.directionalShadow[_]=U,r.directionalShadowMap[_]=O,r.directionalShadowMatrix[_]=D.shadow.matrix,y++}r.directional[_]=G,_++}else if(D.isSpotLight){const G=t.get(D);G.position.setFromMatrixPosition(D.matrixWorld),G.color.copy(H).multiplyScalar(Q*T),G.distance=K,G.coneCos=Math.cos(D.angle),G.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),G.decay=D.decay,r.spot[d]=G;const z=D.shadow;if(D.map&&(r.spotLightMap[w]=D.map,w++,z.updateMatrices(D),D.castShadow&&I++),r.spotLightMatrix[d]=z.matrix,D.castShadow){const U=i.get(D);U.shadowBias=z.bias,U.shadowNormalBias=z.normalBias,U.shadowRadius=z.radius,U.shadowMapSize=z.mapSize,r.spotShadow[d]=U,r.spotShadowMap[d]=O,C++}d++}else if(D.isRectAreaLight){const G=t.get(D);G.color.copy(H).multiplyScalar(Q),G.halfWidth.set(D.width*.5,0,0),G.halfHeight.set(0,D.height*.5,0),r.rectArea[v]=G,v++}else if(D.isPointLight){const G=t.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity*T),G.distance=D.distance,G.decay=D.decay,D.castShadow){const z=D.shadow,U=i.get(D);U.shadowBias=z.bias,U.shadowNormalBias=z.normalBias,U.shadowRadius=z.radius,U.shadowMapSize=z.mapSize,U.shadowCameraNear=z.camera.near,U.shadowCameraFar=z.camera.far,r.pointShadow[p]=U,r.pointShadowMap[p]=O,r.pointShadowMatrix[p]=D.shadow.matrix,M++}r.point[p]=G,p++}else if(D.isHemisphereLight){const G=t.get(D);G.skyColor.copy(D.color).multiplyScalar(Q*T),G.groundColor.copy(D.groundColor).multiplyScalar(Q*T),r.hemi[x]=G,x++}}v>0&&(e.isWebGL2||n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ce.LTC_FLOAT_1,r.rectAreaLTC2=ce.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ce.LTC_HALF_1,r.rectAreaLTC2=ce.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=f,r.ambient[1]=m,r.ambient[2]=g;const j=r.hash;(j.directionalLength!==_||j.pointLength!==p||j.spotLength!==d||j.rectAreaLength!==v||j.hemiLength!==x||j.numDirectionalShadows!==y||j.numPointShadows!==M||j.numSpotShadows!==C||j.numSpotMaps!==w||j.numLightProbes!==S)&&(r.directional.length=_,r.spot.length=d,r.rectArea.length=v,r.point.length=p,r.hemi.length=x,r.directionalShadow.length=y,r.directionalShadowMap.length=y,r.pointShadow.length=M,r.pointShadowMap.length=M,r.spotShadow.length=C,r.spotShadowMap.length=C,r.directionalShadowMatrix.length=y,r.pointShadowMatrix.length=M,r.spotLightMatrix.length=C+w-I,r.spotLightMap.length=w,r.numSpotLightShadowsWithMaps=I,r.numLightProbes=S,j.directionalLength=_,j.pointLength=p,j.spotLength=d,j.rectAreaLength=v,j.hemiLength=x,j.numDirectionalShadows=y,j.numPointShadows=M,j.numSpotShadows=C,j.numSpotMaps=w,j.numLightProbes=S,r.version=aA++)}function c(u,h){let f=0,m=0,g=0,_=0,p=0;const d=h.matrixWorldInverse;for(let v=0,x=u.length;v<x;v++){const y=u[v];if(y.isDirectionalLight){const M=r.directional[f];M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(d),f++}else if(y.isSpotLight){const M=r.spot[g];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(d),M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(d),g++}else if(y.isRectAreaLight){const M=r.rectArea[_];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(d),a.identity(),o.copy(y.matrixWorld),o.premultiply(d),a.extractRotation(o),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),_++}else if(y.isPointLight){const M=r.point[m];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(d),m++}else if(y.isHemisphereLight){const M=r.hemi[p];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(d),p++}}}return{setup:l,setupView:c,state:r}}function cg(n,e){const t=new cA(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(h){i.push(h)}function a(h){r.push(h)}function l(h){t.setup(i,h)}function c(h){t.setupView(i,h)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function uA(n,e){let t=new WeakMap;function i(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new cg(n,e),t.set(s,[l])):o>=a.length?(l=new cg(n,e),a.push(l)):l=a[o],l}function r(){t=new WeakMap}return{get:i,dispose:r}}class dA extends ti{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=JM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class hA extends ti{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const fA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function mA(n,e,t){let i=new vf;const r=new Ce,s=new Ce,o=new it,a=new dA({depthPacking:eE}),l=new hA,c={},u=t.maxTextureSize,h={[Ui]:vn,[vn]:Ui,[Zt]:Zt},f=new ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ce},radius:{value:4}},vertexShader:fA,fragmentShader:pA}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new Pn;g.setAttribute("position",new Bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ht(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=o_;let d=this.type;this.render=function(M,C,w){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||M.length===0)return;const I=n.getRenderTarget(),S=n.getActiveCubeFace(),T=n.getActiveMipmapLevel(),j=n.state;j.setBlending(ar),j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const Y=d!==Mi&&this.type===Mi,Z=d===Mi&&this.type!==Mi;for(let D=0,H=M.length;D<H;D++){const Q=M[D],K=Q.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;r.copy(K.mapSize);const O=K.getFrameExtents();if(r.multiply(O),s.copy(K.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/O.x),r.x=s.x*O.x,K.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/O.y),r.y=s.y*O.y,K.mapSize.y=s.y)),K.map===null||Y===!0||Z===!0){const z=this.type!==Mi?{minFilter:xt,magFilter:xt}:{};K.map!==null&&K.map.dispose(),K.map=new hr(r.x,r.y,z),K.map.texture.name=Q.name+".shadowMap",K.camera.updateProjectionMatrix()}n.setRenderTarget(K.map),n.clear();const G=K.getViewportCount();for(let z=0;z<G;z++){const U=K.getViewport(z);o.set(s.x*U.x,s.y*U.y,s.x*U.z,s.y*U.w),j.viewport(o),K.updateMatrices(Q,z),i=K.getFrustum(),y(C,w,K.camera,Q,this.type)}K.isPointLightShadow!==!0&&this.type===Mi&&v(K,w),K.needsUpdate=!1}d=this.type,p.needsUpdate=!1,n.setRenderTarget(I,S,T)};function v(M,C){const w=e.update(_);f.defines.VSM_SAMPLES!==M.blurSamples&&(f.defines.VSM_SAMPLES=M.blurSamples,m.defines.VSM_SAMPLES=M.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new hr(r.x,r.y)),f.uniforms.shadow_pass.value=M.map.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(C,null,w,f,_,null),m.uniforms.shadow_pass.value=M.mapPass.texture,m.uniforms.resolution.value=M.mapSize,m.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(C,null,w,m,_,null)}function x(M,C,w,I){let S=null;const T=w.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(T!==void 0)S=T;else if(S=w.isPointLight===!0?l:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const j=S.uuid,Y=C.uuid;let Z=c[j];Z===void 0&&(Z={},c[j]=Z);let D=Z[Y];D===void 0&&(D=S.clone(),Z[Y]=D),S=D}if(S.visible=C.visible,S.wireframe=C.wireframe,I===Mi?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:h[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,w.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const j=n.properties.get(S);j.light=w}return S}function y(M,C,w,I,S){if(M.visible===!1)return;if(M.layers.test(C.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&S===Mi)&&(!M.frustumCulled||i.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,M.matrixWorld);const Y=e.update(M),Z=M.material;if(Array.isArray(Z)){const D=Y.groups;for(let H=0,Q=D.length;H<Q;H++){const K=D[H],O=Z[K.materialIndex];if(O&&O.visible){const G=x(M,O,I,S);n.renderBufferDirect(w,null,Y,G,M,K)}}}else if(Z.visible){const D=x(M,Z,I,S);n.renderBufferDirect(w,null,Y,D,M,null)}}const j=M.children;for(let Y=0,Z=j.length;Y<Z;Y++)y(j[Y],C,w,I,S)}}function gA(n,e,t){const i=t.isWebGL2;function r(){let N=!1;const le=new it;let te=null;const $=new it(0,0,0,0);return{setMask:function(se){te!==se&&!N&&(n.colorMask(se,se,se,se),te=se)},setLocked:function(se){N=se},setClear:function(se,Ee,Xe,Tt,Ln){Ln===!0&&(se*=Tt,Ee*=Tt,Xe*=Tt),le.set(se,Ee,Xe,Tt),$.equals(le)===!1&&(n.clearColor(se,Ee,Xe,Tt),$.copy(le))},reset:function(){N=!1,te=null,$.set(-1,0,0,0)}}}function s(){let N=!1,le=null,te=null,$=null;return{setTest:function(se){se?Ne(n.DEPTH_TEST):ot(n.DEPTH_TEST)},setMask:function(se){le!==se&&!N&&(n.depthMask(se),le=se)},setFunc:function(se){if(te!==se){switch(se){case wM:n.depthFunc(n.NEVER);break;case TM:n.depthFunc(n.ALWAYS);break;case bM:n.depthFunc(n.LESS);break;case cc:n.depthFunc(n.LEQUAL);break;case AM:n.depthFunc(n.EQUAL);break;case CM:n.depthFunc(n.GEQUAL);break;case RM:n.depthFunc(n.GREATER);break;case PM:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}te=se}},setLocked:function(se){N=se},setClear:function(se){$!==se&&(n.clearDepth(se),$=se)},reset:function(){N=!1,le=null,te=null,$=null}}}function o(){let N=!1,le=null,te=null,$=null,se=null,Ee=null,Xe=null,Tt=null,Ln=null;return{setTest:function(rt){N||(rt?Ne(n.STENCIL_TEST):ot(n.STENCIL_TEST))},setMask:function(rt){le!==rt&&!N&&(n.stencilMask(rt),le=rt)},setFunc:function(rt,Jt,ri){(te!==rt||$!==Jt||se!==ri)&&(n.stencilFunc(rt,Jt,ri),te=rt,$=Jt,se=ri)},setOp:function(rt,Jt,ri){(Ee!==rt||Xe!==Jt||Tt!==ri)&&(n.stencilOp(rt,Jt,ri),Ee=rt,Xe=Jt,Tt=ri)},setLocked:function(rt){N=rt},setClear:function(rt){Ln!==rt&&(n.clearStencil(rt),Ln=rt)},reset:function(){N=!1,le=null,te=null,$=null,se=null,Ee=null,Xe=null,Tt=null,Ln=null}}}const a=new r,l=new s,c=new o,u=new WeakMap,h=new WeakMap;let f={},m={},g=new WeakMap,_=[],p=null,d=!1,v=null,x=null,y=null,M=null,C=null,w=null,I=null,S=new xe(0,0,0),T=0,j=!1,Y=null,Z=null,D=null,H=null,Q=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,G=0;const z=n.getParameter(n.VERSION);z.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(z)[1]),O=G>=1):z.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),O=G>=2);let U=null,k={};const ue=n.getParameter(n.SCISSOR_BOX),de=n.getParameter(n.VIEWPORT),fe=new it().fromArray(ue),Se=new it().fromArray(de);function De(N,le,te,$){const se=new Uint8Array(4),Ee=n.createTexture();n.bindTexture(N,Ee),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Xe=0;Xe<te;Xe++)i&&(N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY)?n.texImage3D(le,0,n.RGBA,1,1,$,0,n.RGBA,n.UNSIGNED_BYTE,se):n.texImage2D(le+Xe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,se);return Ee}const Re={};Re[n.TEXTURE_2D]=De(n.TEXTURE_2D,n.TEXTURE_2D,1),Re[n.TEXTURE_CUBE_MAP]=De(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Re[n.TEXTURE_2D_ARRAY]=De(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Re[n.TEXTURE_3D]=De(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ne(n.DEPTH_TEST),l.setFunc(cc),Oe(!1),Ue(qp),Ne(n.CULL_FACE),Le(ar);function Ne(N){f[N]!==!0&&(n.enable(N),f[N]=!0)}function ot(N){f[N]!==!1&&(n.disable(N),f[N]=!1)}function ze(N,le){return m[N]!==le?(n.bindFramebuffer(N,le),m[N]=le,i&&(N===n.DRAW_FRAMEBUFFER&&(m[n.FRAMEBUFFER]=le),N===n.FRAMEBUFFER&&(m[n.DRAW_FRAMEBUFFER]=le)),!0):!1}function B(N,le){let te=_,$=!1;if(N)if(te=g.get(le),te===void 0&&(te=[],g.set(le,te)),N.isWebGLMultipleRenderTargets){const se=N.texture;if(te.length!==se.length||te[0]!==n.COLOR_ATTACHMENT0){for(let Ee=0,Xe=se.length;Ee<Xe;Ee++)te[Ee]=n.COLOR_ATTACHMENT0+Ee;te.length=se.length,$=!0}}else te[0]!==n.COLOR_ATTACHMENT0&&(te[0]=n.COLOR_ATTACHMENT0,$=!0);else te[0]!==n.BACK&&(te[0]=n.BACK,$=!0);$&&(t.isWebGL2?n.drawBuffers(te):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(te))}function jt(N){return p!==N?(n.useProgram(N),p=N,!0):!1}const we={[Cr]:n.FUNC_ADD,[cM]:n.FUNC_SUBTRACT,[uM]:n.FUNC_REVERSE_SUBTRACT};if(i)we[Kp]=n.MIN,we[Zp]=n.MAX;else{const N=e.get("EXT_blend_minmax");N!==null&&(we[Kp]=N.MIN_EXT,we[Zp]=N.MAX_EXT)}const Pe={[dM]:n.ZERO,[hM]:n.ONE,[fM]:n.SRC_COLOR,[Kd]:n.SRC_ALPHA,[xM]:n.SRC_ALPHA_SATURATE,[vM]:n.DST_COLOR,[mM]:n.DST_ALPHA,[pM]:n.ONE_MINUS_SRC_COLOR,[Zd]:n.ONE_MINUS_SRC_ALPHA,[_M]:n.ONE_MINUS_DST_COLOR,[gM]:n.ONE_MINUS_DST_ALPHA,[yM]:n.CONSTANT_COLOR,[SM]:n.ONE_MINUS_CONSTANT_COLOR,[MM]:n.CONSTANT_ALPHA,[EM]:n.ONE_MINUS_CONSTANT_ALPHA};function Le(N,le,te,$,se,Ee,Xe,Tt,Ln,rt){if(N===ar){d===!0&&(ot(n.BLEND),d=!1);return}if(d===!1&&(Ne(n.BLEND),d=!0),N!==lM){if(N!==v||rt!==j){if((x!==Cr||C!==Cr)&&(n.blendEquation(n.FUNC_ADD),x=Cr,C=Cr),rt)switch(N){case Us:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case lc:n.blendFunc(n.ONE,n.ONE);break;case Yp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case $p:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Us:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case lc:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Yp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case $p:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}y=null,M=null,w=null,I=null,S.set(0,0,0),T=0,v=N,j=rt}return}se=se||le,Ee=Ee||te,Xe=Xe||$,(le!==x||se!==C)&&(n.blendEquationSeparate(we[le],we[se]),x=le,C=se),(te!==y||$!==M||Ee!==w||Xe!==I)&&(n.blendFuncSeparate(Pe[te],Pe[$],Pe[Ee],Pe[Xe]),y=te,M=$,w=Ee,I=Xe),(Tt.equals(S)===!1||Ln!==T)&&(n.blendColor(Tt.r,Tt.g,Tt.b,Ln),S.copy(Tt),T=Ln),v=N,j=!1}function ut(N,le){N.side===Zt?ot(n.CULL_FACE):Ne(n.CULL_FACE);let te=N.side===vn;le&&(te=!te),Oe(te),N.blending===Us&&N.transparent===!1?Le(ar):Le(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),l.setFunc(N.depthFunc),l.setTest(N.depthTest),l.setMask(N.depthWrite),a.setMask(N.colorWrite);const $=N.stencilWrite;c.setTest($),$&&(c.setMask(N.stencilWriteMask),c.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),c.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),wt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Ne(n.SAMPLE_ALPHA_TO_COVERAGE):ot(n.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(N){Y!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),Y=N)}function Ue(N){N!==sM?(Ne(n.CULL_FACE),N!==Z&&(N===qp?n.cullFace(n.BACK):N===oM?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ot(n.CULL_FACE),Z=N}function Ke(N){N!==D&&(O&&n.lineWidth(N),D=N)}function wt(N,le,te){N?(Ne(n.POLYGON_OFFSET_FILL),(H!==le||Q!==te)&&(n.polygonOffset(le,te),H=le,Q=te)):ot(n.POLYGON_OFFSET_FILL)}function Nt(N){N?Ne(n.SCISSOR_TEST):ot(n.SCISSOR_TEST)}function R(N){N===void 0&&(N=n.TEXTURE0+K-1),U!==N&&(n.activeTexture(N),U=N)}function E(N,le,te){te===void 0&&(U===null?te=n.TEXTURE0+K-1:te=U);let $=k[te];$===void 0&&($={type:void 0,texture:void 0},k[te]=$),($.type!==N||$.texture!==le)&&(U!==te&&(n.activeTexture(te),U=te),n.bindTexture(N,le||Re[N]),$.type=N,$.texture=le)}function V(){const N=k[U];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function ie(){try{n.compressedTexImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ee(){try{n.compressedTexImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function re(){try{n.texSubImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _e(){try{n.texSubImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ae(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function he(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function L(){try{n.texStorage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function oe(){try{n.texStorage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function J(){try{n.texImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function be(){try{n.texImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ye(N){fe.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),fe.copy(N))}function Te(N){Se.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),Se.copy(N))}function ve(N,le){let te=h.get(le);te===void 0&&(te=new WeakMap,h.set(le,te));let $=te.get(N);$===void 0&&($=n.getUniformBlockIndex(le,N.name),te.set(N,$))}function me(N,le){const $=h.get(le).get(N);u.get(le)!==$&&(n.uniformBlockBinding(le,$,N.__bindingPointIndex),u.set(le,$))}function je(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},U=null,k={},m={},g=new WeakMap,_=[],p=null,d=!1,v=null,x=null,y=null,M=null,C=null,w=null,I=null,S=new xe(0,0,0),T=0,j=!1,Y=null,Z=null,D=null,H=null,Q=null,fe.set(0,0,n.canvas.width,n.canvas.height),Se.set(0,0,n.canvas.width,n.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Ne,disable:ot,bindFramebuffer:ze,drawBuffers:B,useProgram:jt,setBlending:Le,setMaterial:ut,setFlipSided:Oe,setCullFace:Ue,setLineWidth:Ke,setPolygonOffset:wt,setScissorTest:Nt,activeTexture:R,bindTexture:E,unbindTexture:V,compressedTexImage2D:ie,compressedTexImage3D:ee,texImage2D:J,texImage3D:be,updateUBOMapping:ve,uniformBlockBinding:me,texStorage2D:L,texStorage3D:oe,texSubImage2D:re,texSubImage3D:_e,compressedTexSubImage2D:ae,compressedTexSubImage3D:he,scissor:ye,viewport:Te,reset:je}}function vA(n,e,t,i,r,s,o){const a=r.isWebGL2,l=r.maxTextures,c=r.maxCubemapSize,u=r.maxTextureSize,h=r.maxSamples,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let _;const p=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(R,E){return d?new OffscreenCanvas(R,E):ga("canvas")}function x(R,E,V,ie){let ee=1;if((R.width>ie||R.height>ie)&&(ee=ie/Math.max(R.width,R.height)),ee<1||E===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const re=E?vc:Math.floor,_e=re(ee*R.width),ae=re(ee*R.height);_===void 0&&(_=v(_e,ae));const he=V?v(_e,ae):_;return he.width=_e,he.height=ae,he.getContext("2d").drawImage(R,0,0,_e,ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+_e+"x"+ae+")."),he}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function y(R){return ih(R.width)&&ih(R.height)}function M(R){return a?!1:R.wrapS!==dn||R.wrapT!==dn||R.minFilter!==xt&&R.minFilter!==un}function C(R,E){return R.generateMipmaps&&E&&R.minFilter!==xt&&R.minFilter!==un}function w(R){n.generateMipmap(R)}function I(R,E,V,ie,ee=!1){if(a===!1)return E;if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let re=E;if(E===n.RED&&(V===n.FLOAT&&(re=n.R32F),V===n.HALF_FLOAT&&(re=n.R16F),V===n.UNSIGNED_BYTE&&(re=n.R8)),E===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(re=n.R8UI),V===n.UNSIGNED_SHORT&&(re=n.R16UI),V===n.UNSIGNED_INT&&(re=n.R32UI),V===n.BYTE&&(re=n.R8I),V===n.SHORT&&(re=n.R16I),V===n.INT&&(re=n.R32I)),E===n.RG&&(V===n.FLOAT&&(re=n.RG32F),V===n.HALF_FLOAT&&(re=n.RG16F),V===n.UNSIGNED_BYTE&&(re=n.RG8)),E===n.RGBA){const _e=ee?fc:Je.getTransfer(ie);V===n.FLOAT&&(re=n.RGBA32F),V===n.HALF_FLOAT&&(re=n.RGBA16F),V===n.UNSIGNED_BYTE&&(re=_e===lt?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT_4_4_4_4&&(re=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(re=n.RGB5_A1)}return(re===n.R16F||re===n.R32F||re===n.RG16F||re===n.RG32F||re===n.RGBA16F||re===n.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function S(R,E,V){return C(R,V)===!0||R.isFramebufferTexture&&R.minFilter!==xt&&R.minFilter!==un?Math.log2(Math.max(E.width,E.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?E.mipmaps.length:1}function T(R){return R===xt||R===Jd||R===Fl?n.NEAREST:n.LINEAR}function j(R){const E=R.target;E.removeEventListener("dispose",j),Z(E),E.isVideoTexture&&g.delete(E)}function Y(R){const E=R.target;E.removeEventListener("dispose",Y),H(E)}function Z(R){const E=i.get(R);if(E.__webglInit===void 0)return;const V=R.source,ie=p.get(V);if(ie){const ee=ie[E.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&D(R),Object.keys(ie).length===0&&p.delete(V)}i.remove(R)}function D(R){const E=i.get(R);n.deleteTexture(E.__webglTexture);const V=R.source,ie=p.get(V);delete ie[E.__cacheKey],o.memory.textures--}function H(R){const E=R.texture,V=i.get(R),ie=i.get(E);if(ie.__webglTexture!==void 0&&(n.deleteTexture(ie.__webglTexture),o.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(V.__webglFramebuffer[ee]))for(let re=0;re<V.__webglFramebuffer[ee].length;re++)n.deleteFramebuffer(V.__webglFramebuffer[ee][re]);else n.deleteFramebuffer(V.__webglFramebuffer[ee]);V.__webglDepthbuffer&&n.deleteRenderbuffer(V.__webglDepthbuffer[ee])}else{if(Array.isArray(V.__webglFramebuffer))for(let ee=0;ee<V.__webglFramebuffer.length;ee++)n.deleteFramebuffer(V.__webglFramebuffer[ee]);else n.deleteFramebuffer(V.__webglFramebuffer);if(V.__webglDepthbuffer&&n.deleteRenderbuffer(V.__webglDepthbuffer),V.__webglMultisampledFramebuffer&&n.deleteFramebuffer(V.__webglMultisampledFramebuffer),V.__webglColorRenderbuffer)for(let ee=0;ee<V.__webglColorRenderbuffer.length;ee++)V.__webglColorRenderbuffer[ee]&&n.deleteRenderbuffer(V.__webglColorRenderbuffer[ee]);V.__webglDepthRenderbuffer&&n.deleteRenderbuffer(V.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let ee=0,re=E.length;ee<re;ee++){const _e=i.get(E[ee]);_e.__webglTexture&&(n.deleteTexture(_e.__webglTexture),o.memory.textures--),i.remove(E[ee])}i.remove(E),i.remove(R)}let Q=0;function K(){Q=0}function O(){const R=Q;return R>=l&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+l),Q+=1,R}function G(R){const E=[];return E.push(R.wrapS),E.push(R.wrapT),E.push(R.wrapR||0),E.push(R.magFilter),E.push(R.minFilter),E.push(R.anisotropy),E.push(R.internalFormat),E.push(R.format),E.push(R.type),E.push(R.generateMipmaps),E.push(R.premultiplyAlpha),E.push(R.flipY),E.push(R.unpackAlignment),E.push(R.colorSpace),E.join()}function z(R,E){const V=i.get(R);if(R.isVideoTexture&&wt(R),R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){const ie=R.image;if(ie===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ne(V,R,E);return}}t.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+E)}function U(R,E){const V=i.get(R);if(R.version>0&&V.__version!==R.version){Ne(V,R,E);return}t.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+E)}function k(R,E){const V=i.get(R);if(R.version>0&&V.__version!==R.version){Ne(V,R,E);return}t.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+E)}function ue(R,E){const V=i.get(R);if(R.version>0&&V.__version!==R.version){ot(V,R,E);return}t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+E)}const de={[Ks]:n.REPEAT,[dn]:n.CLAMP_TO_EDGE,[dc]:n.MIRRORED_REPEAT},fe={[xt]:n.NEAREST,[Jd]:n.NEAREST_MIPMAP_NEAREST,[Fl]:n.NEAREST_MIPMAP_LINEAR,[un]:n.LINEAR,[l_]:n.LINEAR_MIPMAP_NEAREST,[Gr]:n.LINEAR_MIPMAP_LINEAR},Se={[nE]:n.NEVER,[cE]:n.ALWAYS,[iE]:n.LESS,[sE]:n.LEQUAL,[rE]:n.EQUAL,[lE]:n.GEQUAL,[oE]:n.GREATER,[aE]:n.NOTEQUAL};function De(R,E,V){if(V?(n.texParameteri(R,n.TEXTURE_WRAP_S,de[E.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,de[E.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,de[E.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,fe[E.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,fe[E.minFilter])):(n.texParameteri(R,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(R,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(E.wrapS!==dn||E.wrapT!==dn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(R,n.TEXTURE_MAG_FILTER,T(E.magFilter)),n.texParameteri(R,n.TEXTURE_MIN_FILTER,T(E.minFilter)),E.minFilter!==xt&&E.minFilter!==un&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),E.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,Se[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ie=e.get("EXT_texture_filter_anisotropic");if(E.magFilter===xt||E.minFilter!==Fl&&E.minFilter!==Gr||E.type===Zn&&e.has("OES_texture_float_linear")===!1||a===!1&&E.type===Zs&&e.has("OES_texture_half_float_linear")===!1)return;(E.anisotropy>1||i.get(E).__currentAnisotropy)&&(n.texParameterf(R,ie.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy)}}function Re(R,E){let V=!1;R.__webglInit===void 0&&(R.__webglInit=!0,E.addEventListener("dispose",j));const ie=E.source;let ee=p.get(ie);ee===void 0&&(ee={},p.set(ie,ee));const re=G(E);if(re!==R.__cacheKey){ee[re]===void 0&&(ee[re]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,V=!0),ee[re].usedTimes++;const _e=ee[R.__cacheKey];_e!==void 0&&(ee[R.__cacheKey].usedTimes--,_e.usedTimes===0&&D(E)),R.__cacheKey=re,R.__webglTexture=ee[re].texture}return V}function Ne(R,E,V){let ie=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ie=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ie=n.TEXTURE_3D);const ee=Re(R,E),re=E.source;t.bindTexture(ie,R.__webglTexture,n.TEXTURE0+V);const _e=i.get(re);if(re.version!==_e.__version||ee===!0){t.activeTexture(n.TEXTURE0+V);const ae=Je.getPrimaries(Je.workingColorSpace),he=E.colorSpace===On?null:Je.getPrimaries(E.colorSpace),L=E.colorSpace===On||ae===he?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,L);const oe=M(E)&&y(E.image)===!1;let J=x(E.image,oe,!1,u);J=Nt(E,J);const be=y(J)||a,ye=s.convert(E.format,E.colorSpace);let Te=s.convert(E.type),ve=I(E.internalFormat,ye,Te,E.colorSpace,E.isVideoTexture);De(ie,E,be);let me;const je=E.mipmaps,N=a&&E.isVideoTexture!==!0,le=_e.__version===void 0||ee===!0,te=S(E,J,be);if(E.isDepthTexture)ve=n.DEPTH_COMPONENT,a?E.type===Zn?ve=n.DEPTH_COMPONENT32F:E.type===Zi?ve=n.DEPTH_COMPONENT24:E.type===Ur?ve=n.DEPTH24_STENCIL8:ve=n.DEPTH_COMPONENT16:E.type===Zn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===Fr&&ve===n.DEPTH_COMPONENT&&E.type!==cf&&E.type!==Zi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=Zi,Te=s.convert(E.type)),E.format===Qs&&ve===n.DEPTH_COMPONENT&&(ve=n.DEPTH_STENCIL,E.type!==Ur&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=Ur,Te=s.convert(E.type))),le&&(N?t.texStorage2D(n.TEXTURE_2D,1,ve,J.width,J.height):t.texImage2D(n.TEXTURE_2D,0,ve,J.width,J.height,0,ye,Te,null));else if(E.isDataTexture)if(je.length>0&&be){N&&le&&t.texStorage2D(n.TEXTURE_2D,te,ve,je[0].width,je[0].height);for(let $=0,se=je.length;$<se;$++)me=je[$],N?t.texSubImage2D(n.TEXTURE_2D,$,0,0,me.width,me.height,ye,Te,me.data):t.texImage2D(n.TEXTURE_2D,$,ve,me.width,me.height,0,ye,Te,me.data);E.generateMipmaps=!1}else N?(le&&t.texStorage2D(n.TEXTURE_2D,te,ve,J.width,J.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,J.width,J.height,ye,Te,J.data)):t.texImage2D(n.TEXTURE_2D,0,ve,J.width,J.height,0,ye,Te,J.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){N&&le&&t.texStorage3D(n.TEXTURE_2D_ARRAY,te,ve,je[0].width,je[0].height,J.depth);for(let $=0,se=je.length;$<se;$++)me=je[$],E.format!==hn?ye!==null?N?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,me.width,me.height,J.depth,ye,me.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,ve,me.width,me.height,J.depth,0,me.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?t.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,me.width,me.height,J.depth,ye,Te,me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,$,ve,me.width,me.height,J.depth,0,ye,Te,me.data)}else{N&&le&&t.texStorage2D(n.TEXTURE_2D,te,ve,je[0].width,je[0].height);for(let $=0,se=je.length;$<se;$++)me=je[$],E.format!==hn?ye!==null?N?t.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,me.width,me.height,ye,me.data):t.compressedTexImage2D(n.TEXTURE_2D,$,ve,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?t.texSubImage2D(n.TEXTURE_2D,$,0,0,me.width,me.height,ye,Te,me.data):t.texImage2D(n.TEXTURE_2D,$,ve,me.width,me.height,0,ye,Te,me.data)}else if(E.isDataArrayTexture)N?(le&&t.texStorage3D(n.TEXTURE_2D_ARRAY,te,ve,J.width,J.height,J.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ye,Te,J.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,ve,J.width,J.height,J.depth,0,ye,Te,J.data);else if(E.isData3DTexture)N?(le&&t.texStorage3D(n.TEXTURE_3D,te,ve,J.width,J.height,J.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ye,Te,J.data)):t.texImage3D(n.TEXTURE_3D,0,ve,J.width,J.height,J.depth,0,ye,Te,J.data);else if(E.isFramebufferTexture){if(le)if(N)t.texStorage2D(n.TEXTURE_2D,te,ve,J.width,J.height);else{let $=J.width,se=J.height;for(let Ee=0;Ee<te;Ee++)t.texImage2D(n.TEXTURE_2D,Ee,ve,$,se,0,ye,Te,null),$>>=1,se>>=1}}else if(je.length>0&&be){N&&le&&t.texStorage2D(n.TEXTURE_2D,te,ve,je[0].width,je[0].height);for(let $=0,se=je.length;$<se;$++)me=je[$],N?t.texSubImage2D(n.TEXTURE_2D,$,0,0,ye,Te,me):t.texImage2D(n.TEXTURE_2D,$,ve,ye,Te,me);E.generateMipmaps=!1}else N?(le&&t.texStorage2D(n.TEXTURE_2D,te,ve,J.width,J.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ye,Te,J)):t.texImage2D(n.TEXTURE_2D,0,ve,ye,Te,J);C(E,be)&&w(ie),_e.__version=re.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function ot(R,E,V){if(E.image.length!==6)return;const ie=Re(R,E),ee=E.source;t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+V);const re=i.get(ee);if(ee.version!==re.__version||ie===!0){t.activeTexture(n.TEXTURE0+V);const _e=Je.getPrimaries(Je.workingColorSpace),ae=E.colorSpace===On?null:Je.getPrimaries(E.colorSpace),he=E.colorSpace===On||_e===ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const L=E.isCompressedTexture||E.image[0].isCompressedTexture,oe=E.image[0]&&E.image[0].isDataTexture,J=[];for(let $=0;$<6;$++)!L&&!oe?J[$]=x(E.image[$],!1,!0,c):J[$]=oe?E.image[$].image:E.image[$],J[$]=Nt(E,J[$]);const be=J[0],ye=y(be)||a,Te=s.convert(E.format,E.colorSpace),ve=s.convert(E.type),me=I(E.internalFormat,Te,ve,E.colorSpace),je=a&&E.isVideoTexture!==!0,N=re.__version===void 0||ie===!0;let le=S(E,be,ye);De(n.TEXTURE_CUBE_MAP,E,ye);let te;if(L){je&&N&&t.texStorage2D(n.TEXTURE_CUBE_MAP,le,me,be.width,be.height);for(let $=0;$<6;$++){te=J[$].mipmaps;for(let se=0;se<te.length;se++){const Ee=te[se];E.format!==hn?Te!==null?je?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,se,0,0,Ee.width,Ee.height,Te,Ee.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,se,me,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):je?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,se,0,0,Ee.width,Ee.height,Te,ve,Ee.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,se,me,Ee.width,Ee.height,0,Te,ve,Ee.data)}}}else{te=E.mipmaps,je&&N&&(te.length>0&&le++,t.texStorage2D(n.TEXTURE_CUBE_MAP,le,me,J[0].width,J[0].height));for(let $=0;$<6;$++)if(oe){je?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,J[$].width,J[$].height,Te,ve,J[$].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,me,J[$].width,J[$].height,0,Te,ve,J[$].data);for(let se=0;se<te.length;se++){const Xe=te[se].image[$].image;je?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,se+1,0,0,Xe.width,Xe.height,Te,ve,Xe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,se+1,me,Xe.width,Xe.height,0,Te,ve,Xe.data)}}else{je?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Te,ve,J[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,me,Te,ve,J[$]);for(let se=0;se<te.length;se++){const Ee=te[se];je?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,se+1,0,0,Te,ve,Ee.image[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,se+1,me,Te,ve,Ee.image[$])}}}C(E,ye)&&w(n.TEXTURE_CUBE_MAP),re.__version=ee.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function ze(R,E,V,ie,ee,re){const _e=s.convert(V.format,V.colorSpace),ae=s.convert(V.type),he=I(V.internalFormat,_e,ae,V.colorSpace);if(!i.get(E).__hasExternalTextures){const oe=Math.max(1,E.width>>re),J=Math.max(1,E.height>>re);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,re,he,oe,J,E.depth,0,_e,ae,null):t.texImage2D(ee,re,he,oe,J,0,_e,ae,null)}t.bindFramebuffer(n.FRAMEBUFFER,R),Ke(E)?f.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ie,ee,i.get(V).__webglTexture,0,Ue(E)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ie,ee,i.get(V).__webglTexture,re),t.bindFramebuffer(n.FRAMEBUFFER,null)}function B(R,E,V){if(n.bindRenderbuffer(n.RENDERBUFFER,R),E.depthBuffer&&!E.stencilBuffer){let ie=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(V||Ke(E)){const ee=E.depthTexture;ee&&ee.isDepthTexture&&(ee.type===Zn?ie=n.DEPTH_COMPONENT32F:ee.type===Zi&&(ie=n.DEPTH_COMPONENT24));const re=Ue(E);Ke(E)?f.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,re,ie,E.width,E.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,re,ie,E.width,E.height)}else n.renderbufferStorage(n.RENDERBUFFER,ie,E.width,E.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,R)}else if(E.depthBuffer&&E.stencilBuffer){const ie=Ue(E);V&&Ke(E)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ie,n.DEPTH24_STENCIL8,E.width,E.height):Ke(E)?f.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ie,n.DEPTH24_STENCIL8,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,R)}else{const ie=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let ee=0;ee<ie.length;ee++){const re=ie[ee],_e=s.convert(re.format,re.colorSpace),ae=s.convert(re.type),he=I(re.internalFormat,_e,ae,re.colorSpace),L=Ue(E);V&&Ke(E)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,L,he,E.width,E.height):Ke(E)?f.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,L,he,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,he,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function jt(R,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,R),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),z(E.depthTexture,0);const ie=i.get(E.depthTexture).__webglTexture,ee=Ue(E);if(E.depthTexture.format===Fr)Ke(E)?f.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ie,0,ee):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ie,0);else if(E.depthTexture.format===Qs)Ke(E)?f.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ie,0,ee):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function we(R){const E=i.get(R),V=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!E.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");jt(E.__webglFramebuffer,R)}else if(V){E.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[ie]),E.__webglDepthbuffer[ie]=n.createRenderbuffer(),B(E.__webglDepthbuffer[ie],R,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=n.createRenderbuffer(),B(E.__webglDepthbuffer,R,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function Pe(R,E,V){const ie=i.get(R);E!==void 0&&ze(ie.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&we(R)}function Le(R){const E=R.texture,V=i.get(R),ie=i.get(E);R.addEventListener("dispose",Y),R.isWebGLMultipleRenderTargets!==!0&&(ie.__webglTexture===void 0&&(ie.__webglTexture=n.createTexture()),ie.__version=E.version,o.memory.textures++);const ee=R.isWebGLCubeRenderTarget===!0,re=R.isWebGLMultipleRenderTargets===!0,_e=y(R)||a;if(ee){V.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(a&&E.mipmaps&&E.mipmaps.length>0){V.__webglFramebuffer[ae]=[];for(let he=0;he<E.mipmaps.length;he++)V.__webglFramebuffer[ae][he]=n.createFramebuffer()}else V.__webglFramebuffer[ae]=n.createFramebuffer()}else{if(a&&E.mipmaps&&E.mipmaps.length>0){V.__webglFramebuffer=[];for(let ae=0;ae<E.mipmaps.length;ae++)V.__webglFramebuffer[ae]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(re)if(r.drawBuffers){const ae=R.texture;for(let he=0,L=ae.length;he<L;he++){const oe=i.get(ae[he]);oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&R.samples>0&&Ke(R)===!1){const ae=re?E:[E];V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let he=0;he<ae.length;he++){const L=ae[he];V.__webglColorRenderbuffer[he]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[he]);const oe=s.convert(L.format,L.colorSpace),J=s.convert(L.type),be=I(L.internalFormat,oe,J,L.colorSpace,R.isXRRenderTarget===!0),ye=Ue(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,ye,be,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,V.__webglColorRenderbuffer[he])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),B(V.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ee){t.bindTexture(n.TEXTURE_CUBE_MAP,ie.__webglTexture),De(n.TEXTURE_CUBE_MAP,E,_e);for(let ae=0;ae<6;ae++)if(a&&E.mipmaps&&E.mipmaps.length>0)for(let he=0;he<E.mipmaps.length;he++)ze(V.__webglFramebuffer[ae][he],R,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,he);else ze(V.__webglFramebuffer[ae],R,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);C(E,_e)&&w(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(re){const ae=R.texture;for(let he=0,L=ae.length;he<L;he++){const oe=ae[he],J=i.get(oe);t.bindTexture(n.TEXTURE_2D,J.__webglTexture),De(n.TEXTURE_2D,oe,_e),ze(V.__webglFramebuffer,R,oe,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,0),C(oe,_e)&&w(n.TEXTURE_2D)}t.unbindTexture()}else{let ae=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(a?ae=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ae,ie.__webglTexture),De(ae,E,_e),a&&E.mipmaps&&E.mipmaps.length>0)for(let he=0;he<E.mipmaps.length;he++)ze(V.__webglFramebuffer[he],R,E,n.COLOR_ATTACHMENT0,ae,he);else ze(V.__webglFramebuffer,R,E,n.COLOR_ATTACHMENT0,ae,0);C(E,_e)&&w(ae),t.unbindTexture()}R.depthBuffer&&we(R)}function ut(R){const E=y(R)||a,V=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let ie=0,ee=V.length;ie<ee;ie++){const re=V[ie];if(C(re,E)){const _e=R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ae=i.get(re).__webglTexture;t.bindTexture(_e,ae),w(_e),t.unbindTexture()}}}function Oe(R){if(a&&R.samples>0&&Ke(R)===!1){const E=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],V=R.width,ie=R.height;let ee=n.COLOR_BUFFER_BIT;const re=[],_e=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=i.get(R),he=R.isWebGLMultipleRenderTargets===!0;if(he)for(let L=0;L<E.length;L++)t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+L,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+L,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let L=0;L<E.length;L++){re.push(n.COLOR_ATTACHMENT0+L),R.depthBuffer&&re.push(_e);const oe=ae.__ignoreDepthValues!==void 0?ae.__ignoreDepthValues:!1;if(oe===!1&&(R.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),he&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ae.__webglColorRenderbuffer[L]),oe===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[_e]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_e])),he){const J=i.get(E[L]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,J,0)}n.blitFramebuffer(0,0,V,ie,0,0,V,ie,ee,n.NEAREST),m&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,re)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),he)for(let L=0;L<E.length;L++){t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+L,n.RENDERBUFFER,ae.__webglColorRenderbuffer[L]);const oe=i.get(E[L]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+L,n.TEXTURE_2D,oe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}}function Ue(R){return Math.min(h,R.samples)}function Ke(R){const E=i.get(R);return a&&R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function wt(R){const E=o.render.frame;g.get(R)!==E&&(g.set(R,E),R.update())}function Nt(R,E){const V=R.colorSpace,ie=R.format,ee=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===nh||V!==Wt&&V!==On&&(Je.getTransfer(V)===lt?a===!1?e.has("EXT_sRGB")===!0&&ie===hn?(R.format=nh,R.minFilter=un,R.generateMipmaps=!1):E=x_.sRGBToLinear(E):(ie!==hn||ee!==cr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),E}this.allocateTextureUnit=O,this.resetTextureUnits=K,this.setTexture2D=z,this.setTexture2DArray=U,this.setTexture3D=k,this.setTextureCube=ue,this.rebindTextures=Pe,this.setupRenderTarget=Le,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=ze,this.useMultisampledRTT=Ke}function _A(n,e,t){const i=t.isWebGL2;function r(s,o=On){let a;const l=Je.getTransfer(o);if(s===cr)return n.UNSIGNED_BYTE;if(s===u_)return n.UNSIGNED_SHORT_4_4_4_4;if(s===d_)return n.UNSIGNED_SHORT_5_5_5_1;if(s===BM)return n.BYTE;if(s===zM)return n.SHORT;if(s===cf)return n.UNSIGNED_SHORT;if(s===c_)return n.INT;if(s===Zi)return n.UNSIGNED_INT;if(s===Zn)return n.FLOAT;if(s===Zs)return i?n.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===VM)return n.ALPHA;if(s===hn)return n.RGBA;if(s===HM)return n.LUMINANCE;if(s===GM)return n.LUMINANCE_ALPHA;if(s===Fr)return n.DEPTH_COMPONENT;if(s===Qs)return n.DEPTH_STENCIL;if(s===nh)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===WM)return n.RED;if(s===h_)return n.RED_INTEGER;if(s===jM)return n.RG;if(s===f_)return n.RG_INTEGER;if(s===p_)return n.RGBA_INTEGER;if(s===_u||s===xu||s===yu||s===Su)if(l===lt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===_u)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===xu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===yu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Su)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===_u)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===xu)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===yu)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Su)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Jp||s===em||s===tm||s===nm)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Jp)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===em)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===tm)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===nm)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===XM)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===im||s===rm)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===im)return l===lt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===rm)return l===lt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===sm||s===om||s===am||s===lm||s===cm||s===um||s===dm||s===hm||s===fm||s===pm||s===mm||s===gm||s===vm||s===_m)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===sm)return l===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===om)return l===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===am)return l===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===lm)return l===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===cm)return l===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===um)return l===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===dm)return l===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===hm)return l===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===fm)return l===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===pm)return l===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===mm)return l===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===gm)return l===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===vm)return l===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===_m)return l===lt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Mu||s===xm||s===ym)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Mu)return l===lt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===xm)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===ym)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===qM||s===Sm||s===Mm||s===Em)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===Mu)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Sm)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Mm)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Em)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Ur?i?n.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class xA extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ri extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const yA={type:"move"};class Xu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ri,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ri,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ri,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,i),d=this._getHandJoint(c,_);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(yA)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ri;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class SA extends kt{constructor(e,t,i,r,s,o,a,l,c,u){if(u=u!==void 0?u:Fr,u!==Fr&&u!==Qs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Fr&&(i=Zi),i===void 0&&u===Qs&&(i=Ur),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:xt,this.minFilter=l!==void 0?l:xt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class MA extends gr{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,m=null,g=null;const _=t.getContextAttributes();let p=null,d=null;const v=[],x=[],y=new sn;y.layers.enable(1),y.viewport=new it;const M=new sn;M.layers.enable(2),M.viewport=new it;const C=[y,M],w=new xA;w.layers.enable(1),w.layers.enable(2);let I=null,S=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(U){let k=v[U];return k===void 0&&(k=new Xu,v[U]=k),k.getTargetRaySpace()},this.getControllerGrip=function(U){let k=v[U];return k===void 0&&(k=new Xu,v[U]=k),k.getGripSpace()},this.getHand=function(U){let k=v[U];return k===void 0&&(k=new Xu,v[U]=k),k.getHandSpace()};function T(U){const k=x.indexOf(U.inputSource);if(k===-1)return;const ue=v[k];ue!==void 0&&(ue.update(U.inputSource,U.frame,c||o),ue.dispatchEvent({type:U.type,data:U.inputSource}))}function j(){r.removeEventListener("select",T),r.removeEventListener("selectstart",T),r.removeEventListener("selectend",T),r.removeEventListener("squeeze",T),r.removeEventListener("squeezestart",T),r.removeEventListener("squeezeend",T),r.removeEventListener("end",j),r.removeEventListener("inputsourceschange",Y);for(let U=0;U<v.length;U++){const k=x[U];k!==null&&(x[U]=null,v[U].disconnect(k))}I=null,S=null,e.setRenderTarget(p),m=null,f=null,h=null,r=null,d=null,z.stop(),i.isPresenting=!1,i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(U){s=U,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(U){a=U,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(U){c=U},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(U){if(r=U,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",T),r.addEventListener("selectstart",T),r.addEventListener("selectend",T),r.addEventListener("squeeze",T),r.addEventListener("squeezestart",T),r.addEventListener("squeezeend",T),r.addEventListener("end",j),r.addEventListener("inputsourceschange",Y),_.xrCompatible!==!0&&await t.makeXRCompatible(),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const k={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,k),r.updateRenderState({baseLayer:m}),d=new hr(m.framebufferWidth,m.framebufferHeight,{format:hn,type:cr,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let k=null,ue=null,de=null;_.depth&&(de=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,k=_.stencil?Qs:Fr,ue=_.stencil?Ur:Zi);const fe={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:s};h=new XRWebGLBinding(r,t),f=h.createProjectionLayer(fe),r.updateRenderState({layers:[f]}),d=new hr(f.textureWidth,f.textureHeight,{format:hn,type:cr,depthTexture:new SA(f.textureWidth,f.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,k),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Se=e.properties.get(d);Se.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),z.setContext(r),z.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function Y(U){for(let k=0;k<U.removed.length;k++){const ue=U.removed[k],de=x.indexOf(ue);de>=0&&(x[de]=null,v[de].disconnect(ue))}for(let k=0;k<U.added.length;k++){const ue=U.added[k];let de=x.indexOf(ue);if(de===-1){for(let Se=0;Se<v.length;Se++)if(Se>=x.length){x.push(ue),de=Se;break}else if(x[Se]===null){x[Se]=ue,de=Se;break}if(de===-1)break}const fe=v[de];fe&&fe.connect(ue)}}const Z=new P,D=new P;function H(U,k,ue){Z.setFromMatrixPosition(k.matrixWorld),D.setFromMatrixPosition(ue.matrixWorld);const de=Z.distanceTo(D),fe=k.projectionMatrix.elements,Se=ue.projectionMatrix.elements,De=fe[14]/(fe[10]-1),Re=fe[14]/(fe[10]+1),Ne=(fe[9]+1)/fe[5],ot=(fe[9]-1)/fe[5],ze=(fe[8]-1)/fe[0],B=(Se[8]+1)/Se[0],jt=De*ze,we=De*B,Pe=de/(-ze+B),Le=Pe*-ze;k.matrixWorld.decompose(U.position,U.quaternion,U.scale),U.translateX(Le),U.translateZ(Pe),U.matrixWorld.compose(U.position,U.quaternion,U.scale),U.matrixWorldInverse.copy(U.matrixWorld).invert();const ut=De+Pe,Oe=Re+Pe,Ue=jt-Le,Ke=we+(de-Le),wt=Ne*Re/Oe*ut,Nt=ot*Re/Oe*ut;U.projectionMatrix.makePerspective(Ue,Ke,wt,Nt,ut,Oe),U.projectionMatrixInverse.copy(U.projectionMatrix).invert()}function Q(U,k){k===null?U.matrixWorld.copy(U.matrix):U.matrixWorld.multiplyMatrices(k.matrixWorld,U.matrix),U.matrixWorldInverse.copy(U.matrixWorld).invert()}this.updateCamera=function(U){if(r===null)return;w.near=M.near=y.near=U.near,w.far=M.far=y.far=U.far,(I!==w.near||S!==w.far)&&(r.updateRenderState({depthNear:w.near,depthFar:w.far}),I=w.near,S=w.far);const k=U.parent,ue=w.cameras;Q(w,k);for(let de=0;de<ue.length;de++)Q(ue[de],k);ue.length===2?H(w,y,M):w.projectionMatrix.copy(y.projectionMatrix),K(U,w,k)};function K(U,k,ue){ue===null?U.matrix.copy(k.matrixWorld):(U.matrix.copy(ue.matrixWorld),U.matrix.invert(),U.matrix.multiply(k.matrixWorld)),U.matrix.decompose(U.position,U.quaternion,U.scale),U.updateMatrixWorld(!0),U.projectionMatrix.copy(k.projectionMatrix),U.projectionMatrixInverse.copy(k.projectionMatrixInverse),U.isPerspectiveCamera&&(U.fov=eo*2*Math.atan(1/U.projectionMatrix.elements[5]),U.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(U){l=U,f!==null&&(f.fixedFoveation=U),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=U)};let O=null;function G(U,k){if(u=k.getViewerPose(c||o),g=k,u!==null){const ue=u.views;m!==null&&(e.setRenderTargetFramebuffer(d,m.framebuffer),e.setRenderTarget(d));let de=!1;ue.length!==w.cameras.length&&(w.cameras.length=0,de=!0);for(let fe=0;fe<ue.length;fe++){const Se=ue[fe];let De=null;if(m!==null)De=m.getViewport(Se);else{const Ne=h.getViewSubImage(f,Se);De=Ne.viewport,fe===0&&(e.setRenderTargetTextures(d,Ne.colorTexture,f.ignoreDepthValues?void 0:Ne.depthStencilTexture),e.setRenderTarget(d))}let Re=C[fe];Re===void 0&&(Re=new sn,Re.layers.enable(fe),Re.viewport=new it,C[fe]=Re),Re.matrix.fromArray(Se.transform.matrix),Re.matrix.decompose(Re.position,Re.quaternion,Re.scale),Re.projectionMatrix.fromArray(Se.projectionMatrix),Re.projectionMatrixInverse.copy(Re.projectionMatrix).invert(),Re.viewport.set(De.x,De.y,De.width,De.height),fe===0&&(w.matrix.copy(Re.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),de===!0&&w.cameras.push(Re)}}for(let ue=0;ue<v.length;ue++){const de=x[ue],fe=v[ue];de!==null&&fe!==void 0&&fe.update(de,k,c||o)}O&&O(U,k),k.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:k}),g=null}const z=new C_;z.setAnimationLoop(G),this.setAnimationLoop=function(U){O=U},this.dispose=function(){}}}function EA(n,e){function t(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function i(p,d){d.color.getRGB(p.fogColor.value,T_(n)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function r(p,d,v,x,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(p,d):d.isMeshToonMaterial?(s(p,d),h(p,d)):d.isMeshPhongMaterial?(s(p,d),u(p,d)):d.isMeshStandardMaterial?(s(p,d),f(p,d),d.isMeshPhysicalMaterial&&m(p,d,y)):d.isMeshMatcapMaterial?(s(p,d),g(p,d)):d.isMeshDepthMaterial?s(p,d):d.isMeshDistanceMaterial?(s(p,d),_(p,d)):d.isMeshNormalMaterial?s(p,d):d.isLineBasicMaterial?(o(p,d),d.isLineDashedMaterial&&a(p,d)):d.isPointsMaterial?l(p,d,v,x):d.isSpriteMaterial?c(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,t(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===vn&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,t(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===vn&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,t(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,t(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const v=e.get(d).envMap;if(v&&(p.envMap.value=v,p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap){p.lightMap.value=d.lightMap;const x=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=d.lightMapIntensity*x,t(d.lightMap,p.lightMapTransform)}d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,p.aoMapTransform))}function o(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform))}function a(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function l(p,d,v,x){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*v,p.scale.value=x*.5,d.map&&(p.map.value=d.map,t(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function c(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function u(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function h(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,p.roughnessMapTransform)),e.get(d).envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,v){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===vn&&p.clearcoatNormalScale.value.negate())),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,d){d.matcap&&(p.matcap.value=d.matcap)}function _(p,d){const v=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function wA(n,e,t,i){let r={},s={},o=[];const a=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(v,x){const y=x.program;i.uniformBlockBinding(v,y)}function c(v,x){let y=r[v.id];y===void 0&&(g(v),y=u(v),r[v.id]=y,v.addEventListener("dispose",p));const M=x.program;i.updateUBOMapping(v,M);const C=e.render.frame;s[v.id]!==C&&(f(v),s[v.id]=C)}function u(v){const x=h();v.__bindingPointIndex=x;const y=n.createBuffer(),M=v.__size,C=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,M,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,y),y}function h(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const x=r[v.id],y=v.uniforms,M=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let C=0,w=y.length;C<w;C++){const I=y[C];if(m(I,C,M)===!0){const S=I.__offset,T=Array.isArray(I.value)?I.value:[I.value];let j=0;for(let Y=0;Y<T.length;Y++){const Z=T[Y],D=_(Z);typeof Z=="number"?(I.__data[0]=Z,n.bufferSubData(n.UNIFORM_BUFFER,S+j,I.__data)):Z.isMatrix3?(I.__data[0]=Z.elements[0],I.__data[1]=Z.elements[1],I.__data[2]=Z.elements[2],I.__data[3]=Z.elements[0],I.__data[4]=Z.elements[3],I.__data[5]=Z.elements[4],I.__data[6]=Z.elements[5],I.__data[7]=Z.elements[0],I.__data[8]=Z.elements[6],I.__data[9]=Z.elements[7],I.__data[10]=Z.elements[8],I.__data[11]=Z.elements[0]):(Z.toArray(I.__data,j),j+=D.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,S,I.__data)}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(v,x,y){const M=v.value;if(y[x]===void 0){if(typeof M=="number")y[x]=M;else{const C=Array.isArray(M)?M:[M],w=[];for(let I=0;I<C.length;I++)w.push(C[I].clone());y[x]=w}return!0}else if(typeof M=="number"){if(y[x]!==M)return y[x]=M,!0}else{const C=Array.isArray(y[x])?y[x]:[y[x]],w=Array.isArray(M)?M:[M];for(let I=0;I<C.length;I++){const S=C[I];if(S.equals(w[I])===!1)return S.copy(w[I]),!0}}return!1}function g(v){const x=v.uniforms;let y=0;const M=16;let C=0;for(let w=0,I=x.length;w<I;w++){const S=x[w],T={boundary:0,storage:0},j=Array.isArray(S.value)?S.value:[S.value];for(let Y=0,Z=j.length;Y<Z;Y++){const D=j[Y],H=_(D);T.boundary+=H.boundary,T.storage+=H.storage}if(S.__data=new Float32Array(T.storage/Float32Array.BYTES_PER_ELEMENT),S.__offset=y,w>0){C=y%M;const Y=M-C;C!==0&&Y-T.boundary<0&&(y+=M-C,S.__offset=y)}y+=T.storage}return C=y%M,C>0&&(y+=M-C),v.__size=y,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function p(v){const x=v.target;x.removeEventListener("dispose",p);const y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function d(){for(const v in r)n.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:l,update:c,dispose:d}}class N_{constructor(e={}){const{canvas:t=EE(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;i!==null?f=i.getContextAttributes().alpha:f=o;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const d=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=yt,this._useLegacyLights=!1,this.toneMapping=lr,this.toneMappingExposure=1;const x=this;let y=!1,M=0,C=0,w=null,I=-1,S=null;const T=new it,j=new it;let Y=null;const Z=new xe(0);let D=0,H=t.width,Q=t.height,K=1,O=null,G=null;const z=new it(0,0,H,Q),U=new it(0,0,H,Q);let k=!1;const ue=new vf;let de=!1,fe=!1,Se=null;const De=new Be,Re=new Ce,Ne=new P,ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ze(){return w===null?K:1}let B=i;function jt(b,F){for(let W=0;W<b.length;W++){const X=b[W],q=t.getContext(X,F);if(q!==null)return q}return null}try{const b={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${af}`),t.addEventListener("webglcontextlost",je,!1),t.addEventListener("webglcontextrestored",N,!1),t.addEventListener("webglcontextcreationerror",le,!1),B===null){const F=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&F.shift(),B=jt(F,b),B===null)throw jt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&B instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),B.getShaderPrecisionFormat===void 0&&(B.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let we,Pe,Le,ut,Oe,Ue,Ke,wt,Nt,R,E,V,ie,ee,re,_e,ae,he,L,oe,J,be,ye,Te;function ve(){we=new D1(B),Pe=new C1(B,we,e),we.init(Pe),be=new _A(B,we,Pe),Le=new gA(B,we,Pe),ut=new O1(B),Oe=new nA,Ue=new vA(B,we,Le,Oe,Pe,be,ut),Ke=new P1(x),wt=new N1(x),Nt=new qE(B,Pe),ye=new b1(B,we,Nt,Pe),R=new U1(B,Nt,ut,ye),E=new V1(B,R,Nt,ut),L=new z1(B,Pe,Ue),_e=new R1(Oe),V=new tA(x,Ke,wt,we,Pe,ye,_e),ie=new EA(x,Oe),ee=new rA,re=new uA(we,Pe),he=new T1(x,Ke,wt,Le,E,f,l),ae=new mA(x,E,Pe),Te=new wA(B,ut,Pe,Le),oe=new A1(B,we,ut,Pe),J=new F1(B,we,ut,Pe),ut.programs=V.programs,x.capabilities=Pe,x.extensions=we,x.properties=Oe,x.renderLists=ee,x.shadowMap=ae,x.state=Le,x.info=ut}ve();const me=new MA(x,B);this.xr=me,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const b=we.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=we.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(b){b!==void 0&&(K=b,this.setSize(H,Q,!1))},this.getSize=function(b){return b.set(H,Q)},this.setSize=function(b,F,W=!0){if(me.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=b,Q=F,t.width=Math.floor(b*K),t.height=Math.floor(F*K),W===!0&&(t.style.width=b+"px",t.style.height=F+"px"),this.setViewport(0,0,b,F)},this.getDrawingBufferSize=function(b){return b.set(H*K,Q*K).floor()},this.setDrawingBufferSize=function(b,F,W){H=b,Q=F,K=W,t.width=Math.floor(b*W),t.height=Math.floor(F*W),this.setViewport(0,0,b,F)},this.getCurrentViewport=function(b){return b.copy(T)},this.getViewport=function(b){return b.copy(z)},this.setViewport=function(b,F,W,X){b.isVector4?z.set(b.x,b.y,b.z,b.w):z.set(b,F,W,X),Le.viewport(T.copy(z).multiplyScalar(K).floor())},this.getScissor=function(b){return b.copy(U)},this.setScissor=function(b,F,W,X){b.isVector4?U.set(b.x,b.y,b.z,b.w):U.set(b,F,W,X),Le.scissor(j.copy(U).multiplyScalar(K).floor())},this.getScissorTest=function(){return k},this.setScissorTest=function(b){Le.setScissorTest(k=b)},this.setOpaqueSort=function(b){O=b},this.setTransparentSort=function(b){G=b},this.getClearColor=function(b){return b.copy(he.getClearColor())},this.setClearColor=function(){he.setClearColor.apply(he,arguments)},this.getClearAlpha=function(){return he.getClearAlpha()},this.setClearAlpha=function(){he.setClearAlpha.apply(he,arguments)},this.clear=function(b=!0,F=!0,W=!0){let X=0;if(b){let q=!1;if(w!==null){const pe=w.texture.format;q=pe===p_||pe===f_||pe===h_}if(q){const pe=w.texture.type,Me=pe===cr||pe===Zi||pe===cf||pe===Ur||pe===u_||pe===d_,Ae=he.getClearColor(),Ie=he.getClearAlpha(),He=Ae.r,Fe=Ae.g,ke=Ae.b;Me?(m[0]=He,m[1]=Fe,m[2]=ke,m[3]=Ie,B.clearBufferuiv(B.COLOR,0,m)):(g[0]=He,g[1]=Fe,g[2]=ke,g[3]=Ie,B.clearBufferiv(B.COLOR,0,g))}else X|=B.COLOR_BUFFER_BIT}F&&(X|=B.DEPTH_BUFFER_BIT),W&&(X|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",je,!1),t.removeEventListener("webglcontextrestored",N,!1),t.removeEventListener("webglcontextcreationerror",le,!1),ee.dispose(),re.dispose(),Oe.dispose(),Ke.dispose(),wt.dispose(),E.dispose(),ye.dispose(),Te.dispose(),V.dispose(),me.dispose(),me.removeEventListener("sessionstart",Ln),me.removeEventListener("sessionend",rt),Se&&(Se.dispose(),Se=null),Jt.stop()};function je(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function N(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const b=ut.autoReset,F=ae.enabled,W=ae.autoUpdate,X=ae.needsUpdate,q=ae.type;ve(),ut.autoReset=b,ae.enabled=F,ae.autoUpdate=W,ae.needsUpdate=X,ae.type=q}function le(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function te(b){const F=b.target;F.removeEventListener("dispose",te),$(F)}function $(b){se(b),Oe.remove(b)}function se(b){const F=Oe.get(b).programs;F!==void 0&&(F.forEach(function(W){V.releaseProgram(W)}),b.isShaderMaterial&&V.releaseShaderCache(b))}this.renderBufferDirect=function(b,F,W,X,q,pe){F===null&&(F=ot);const Me=q.isMesh&&q.matrixWorld.determinant()<0,Ae=$_(b,F,W,X,q);Le.setMaterial(X,Me);let Ie=W.index,He=1;if(X.wireframe===!0){if(Ie=R.getWireframeAttribute(W),Ie===void 0)return;He=2}const Fe=W.drawRange,ke=W.attributes.position;let Mt=Fe.start*He,xn=(Fe.start+Fe.count)*He;pe!==null&&(Mt=Math.max(Mt,pe.start*He),xn=Math.min(xn,(pe.start+pe.count)*He)),Ie!==null?(Mt=Math.max(Mt,0),xn=Math.min(xn,Ie.count)):ke!=null&&(Mt=Math.max(Mt,0),xn=Math.min(xn,ke.count));const Dt=xn-Mt;if(Dt<0||Dt===1/0)return;ye.setup(q,X,Ae,W,Ie);let mi,vt=oe;if(Ie!==null&&(mi=Nt.get(Ie),vt=J,vt.setIndex(mi)),q.isMesh)X.wireframe===!0?(Le.setLineWidth(X.wireframeLinewidth*ze()),vt.setMode(B.LINES)):vt.setMode(B.TRIANGLES);else if(q.isLine){let qe=X.linewidth;qe===void 0&&(qe=1),Le.setLineWidth(qe*ze()),q.isLineSegments?vt.setMode(B.LINES):q.isLineLoop?vt.setMode(B.LINE_LOOP):vt.setMode(B.LINE_STRIP)}else q.isPoints?vt.setMode(B.POINTS):q.isSprite&&vt.setMode(B.TRIANGLES);if(q.isInstancedMesh)vt.renderInstances(Mt,Dt,q.count);else if(W.isInstancedBufferGeometry){const qe=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Bc=Math.min(W.instanceCount,qe);vt.renderInstances(Mt,Dt,Bc)}else vt.render(Mt,Dt)};function Ee(b,F,W){b.transparent===!0&&b.side===Zt&&b.forceSinglePass===!1?(b.side=vn,b.needsUpdate=!0,Aa(b,F,W),b.side=Ui,b.needsUpdate=!0,Aa(b,F,W),b.side=Zt):Aa(b,F,W)}this.compile=function(b,F,W=null){W===null&&(W=b),p=re.get(W),p.init(),v.push(p),W.traverseVisible(function(q){q.isLight&&q.layers.test(F.layers)&&(p.pushLight(q),q.castShadow&&p.pushShadow(q))}),b!==W&&b.traverseVisible(function(q){q.isLight&&q.layers.test(F.layers)&&(p.pushLight(q),q.castShadow&&p.pushShadow(q))}),p.setupLights(x._useLegacyLights);const X=new Set;return b.traverse(function(q){const pe=q.material;if(pe)if(Array.isArray(pe))for(let Me=0;Me<pe.length;Me++){const Ae=pe[Me];Ee(Ae,W,q),X.add(Ae)}else Ee(pe,W,q),X.add(pe)}),v.pop(),p=null,X},this.compileAsync=function(b,F,W=null){const X=this.compile(b,F,W);return new Promise(q=>{function pe(){if(X.forEach(function(Me){Oe.get(Me).currentProgram.isReady()&&X.delete(Me)}),X.size===0){q(b);return}setTimeout(pe,10)}we.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Xe=null;function Tt(b){Xe&&Xe(b)}function Ln(){Jt.stop()}function rt(){Jt.start()}const Jt=new C_;Jt.setAnimationLoop(Tt),typeof self<"u"&&Jt.setContext(self),this.setAnimationLoop=function(b){Xe=b,me.setAnimationLoop(b),b===null?Jt.stop():Jt.start()},me.addEventListener("sessionstart",Ln),me.addEventListener("sessionend",rt),this.render=function(b,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),me.enabled===!0&&me.isPresenting===!0&&(me.cameraAutoUpdate===!0&&me.updateCamera(F),F=me.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,F,w),p=re.get(b,v.length),p.init(),v.push(p),De.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),ue.setFromProjectionMatrix(De),fe=this.localClippingEnabled,de=_e.init(this.clippingPlanes,fe),_=ee.get(b,d.length),_.init(),d.push(_),ri(b,F,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(O,G),this.info.render.frame++,de===!0&&_e.beginShadows();const W=p.state.shadowsArray;if(ae.render(W,b,F),de===!0&&_e.endShadows(),this.info.autoReset===!0&&this.info.reset(),he.render(_,b),p.setupLights(x._useLegacyLights),F.isArrayCamera){const X=F.cameras;for(let q=0,pe=X.length;q<pe;q++){const Me=X[q];Rf(_,b,Me,Me.viewport)}}else Rf(_,b,F);w!==null&&(Ue.updateMultisampleRenderTarget(w),Ue.updateRenderTargetMipmap(w)),b.isScene===!0&&b.onAfterRender(x,b,F),ye.resetDefaultState(),I=-1,S=null,v.pop(),v.length>0?p=v[v.length-1]:p=null,d.pop(),d.length>0?_=d[d.length-1]:_=null};function ri(b,F,W,X){if(b.visible===!1)return;if(b.layers.test(F.layers)){if(b.isGroup)W=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(F);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||ue.intersectsSprite(b)){X&&Ne.setFromMatrixPosition(b.matrixWorld).applyMatrix4(De);const Me=E.update(b),Ae=b.material;Ae.visible&&_.push(b,Me,Ae,W,Ne.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||ue.intersectsObject(b))){const Me=E.update(b),Ae=b.material;if(X&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ne.copy(b.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Ne.copy(Me.boundingSphere.center)),Ne.applyMatrix4(b.matrixWorld).applyMatrix4(De)),Array.isArray(Ae)){const Ie=Me.groups;for(let He=0,Fe=Ie.length;He<Fe;He++){const ke=Ie[He],Mt=Ae[ke.materialIndex];Mt&&Mt.visible&&_.push(b,Me,Mt,W,Ne.z,ke)}}else Ae.visible&&_.push(b,Me,Ae,W,Ne.z,null)}}const pe=b.children;for(let Me=0,Ae=pe.length;Me<Ae;Me++)ri(pe[Me],F,W,X)}function Rf(b,F,W,X){const q=b.opaque,pe=b.transmissive,Me=b.transparent;p.setupLightsView(W),de===!0&&_e.setGlobalState(x.clippingPlanes,W),pe.length>0&&Y_(q,pe,F,W),X&&Le.viewport(T.copy(X)),q.length>0&&ba(q,F,W),pe.length>0&&ba(pe,F,W),Me.length>0&&ba(Me,F,W),Le.buffers.depth.setTest(!0),Le.buffers.depth.setMask(!0),Le.buffers.color.setMask(!0),Le.setPolygonOffset(!1)}function Y_(b,F,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;const pe=Pe.isWebGL2;Se===null&&(Se=new hr(1,1,{generateMipmaps:!0,type:we.has("EXT_color_buffer_half_float")?Zs:cr,minFilter:Gr,samples:pe?4:0})),x.getDrawingBufferSize(Re),pe?Se.setSize(Re.x,Re.y):Se.setSize(vc(Re.x),vc(Re.y));const Me=x.getRenderTarget();x.setRenderTarget(Se),x.getClearColor(Z),D=x.getClearAlpha(),D<1&&x.setClearColor(16777215,.5),x.clear();const Ae=x.toneMapping;x.toneMapping=lr,ba(b,W,X),Ue.updateMultisampleRenderTarget(Se),Ue.updateRenderTargetMipmap(Se);let Ie=!1;for(let He=0,Fe=F.length;He<Fe;He++){const ke=F[He],Mt=ke.object,xn=ke.geometry,Dt=ke.material,mi=ke.group;if(Dt.side===Zt&&Mt.layers.test(X.layers)){const vt=Dt.side;Dt.side=vn,Dt.needsUpdate=!0,Pf(Mt,W,X,xn,Dt,mi),Dt.side=vt,Dt.needsUpdate=!0,Ie=!0}}Ie===!0&&(Ue.updateMultisampleRenderTarget(Se),Ue.updateRenderTargetMipmap(Se)),x.setRenderTarget(Me),x.setClearColor(Z,D),x.toneMapping=Ae}function ba(b,F,W){const X=F.isScene===!0?F.overrideMaterial:null;for(let q=0,pe=b.length;q<pe;q++){const Me=b[q],Ae=Me.object,Ie=Me.geometry,He=X===null?Me.material:X,Fe=Me.group;Ae.layers.test(W.layers)&&Pf(Ae,F,W,Ie,He,Fe)}}function Pf(b,F,W,X,q,pe){b.onBeforeRender(x,F,W,X,q,pe),b.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),q.onBeforeRender(x,F,W,X,b,pe),q.transparent===!0&&q.side===Zt&&q.forceSinglePass===!1?(q.side=vn,q.needsUpdate=!0,x.renderBufferDirect(W,F,X,q,b,pe),q.side=Ui,q.needsUpdate=!0,x.renderBufferDirect(W,F,X,q,b,pe),q.side=Zt):x.renderBufferDirect(W,F,X,q,b,pe),b.onAfterRender(x,F,W,X,q,pe)}function Aa(b,F,W){F.isScene!==!0&&(F=ot);const X=Oe.get(b),q=p.state.lights,pe=p.state.shadowsArray,Me=q.state.version,Ae=V.getParameters(b,q.state,pe,F,W),Ie=V.getProgramCacheKey(Ae);let He=X.programs;X.environment=b.isMeshStandardMaterial?F.environment:null,X.fog=F.fog,X.envMap=(b.isMeshStandardMaterial?wt:Ke).get(b.envMap||X.environment),He===void 0&&(b.addEventListener("dispose",te),He=new Map,X.programs=He);let Fe=He.get(Ie);if(Fe!==void 0){if(X.currentProgram===Fe&&X.lightsStateVersion===Me)return If(b,Ae),Fe}else Ae.uniforms=V.getUniforms(b),b.onBuild(W,Ae,x),b.onBeforeCompile(Ae,x),Fe=V.acquireProgram(Ae,Ie),He.set(Ie,Fe),X.uniforms=Ae.uniforms;const ke=X.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(ke.clippingPlanes=_e.uniform),If(b,Ae),X.needsLights=Z_(b),X.lightsStateVersion=Me,X.needsLights&&(ke.ambientLightColor.value=q.state.ambient,ke.lightProbe.value=q.state.probe,ke.directionalLights.value=q.state.directional,ke.directionalLightShadows.value=q.state.directionalShadow,ke.spotLights.value=q.state.spot,ke.spotLightShadows.value=q.state.spotShadow,ke.rectAreaLights.value=q.state.rectArea,ke.ltc_1.value=q.state.rectAreaLTC1,ke.ltc_2.value=q.state.rectAreaLTC2,ke.pointLights.value=q.state.point,ke.pointLightShadows.value=q.state.pointShadow,ke.hemisphereLights.value=q.state.hemi,ke.directionalShadowMap.value=q.state.directionalShadowMap,ke.directionalShadowMatrix.value=q.state.directionalShadowMatrix,ke.spotShadowMap.value=q.state.spotShadowMap,ke.spotLightMatrix.value=q.state.spotLightMatrix,ke.spotLightMap.value=q.state.spotLightMap,ke.pointShadowMap.value=q.state.pointShadowMap,ke.pointShadowMatrix.value=q.state.pointShadowMatrix),X.currentProgram=Fe,X.uniformsList=null,Fe}function Lf(b){if(b.uniformsList===null){const F=b.currentProgram.getUniforms();b.uniformsList=Ol.seqWithValue(F.seq,b.uniforms)}return b.uniformsList}function If(b,F){const W=Oe.get(b);W.outputColorSpace=F.outputColorSpace,W.instancing=F.instancing,W.instancingColor=F.instancingColor,W.skinning=F.skinning,W.morphTargets=F.morphTargets,W.morphNormals=F.morphNormals,W.morphColors=F.morphColors,W.morphTargetsCount=F.morphTargetsCount,W.numClippingPlanes=F.numClippingPlanes,W.numIntersection=F.numClipIntersection,W.vertexAlphas=F.vertexAlphas,W.vertexTangents=F.vertexTangents,W.toneMapping=F.toneMapping}function $_(b,F,W,X,q){F.isScene!==!0&&(F=ot),Ue.resetTextureUnits();const pe=F.fog,Me=X.isMeshStandardMaterial?F.environment:null,Ae=w===null?x.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Wt,Ie=(X.isMeshStandardMaterial?wt:Ke).get(X.envMap||Me),He=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Fe=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),ke=!!W.morphAttributes.position,Mt=!!W.morphAttributes.normal,xn=!!W.morphAttributes.color;let Dt=lr;X.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Dt=x.toneMapping);const mi=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,vt=mi!==void 0?mi.length:0,qe=Oe.get(X),Bc=p.state.lights;if(de===!0&&(fe===!0||b!==S)){const yn=b===S&&X.id===I;_e.setState(X,b,yn)}let bt=!1;X.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==Bc.state.version||qe.outputColorSpace!==Ae||q.isInstancedMesh&&qe.instancing===!1||!q.isInstancedMesh&&qe.instancing===!0||q.isSkinnedMesh&&qe.skinning===!1||!q.isSkinnedMesh&&qe.skinning===!0||q.isInstancedMesh&&qe.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&qe.instancingColor===!1&&q.instanceColor!==null||qe.envMap!==Ie||X.fog===!0&&qe.fog!==pe||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==_e.numPlanes||qe.numIntersection!==_e.numIntersection)||qe.vertexAlphas!==He||qe.vertexTangents!==Fe||qe.morphTargets!==ke||qe.morphNormals!==Mt||qe.morphColors!==xn||qe.toneMapping!==Dt||Pe.isWebGL2===!0&&qe.morphTargetsCount!==vt)&&(bt=!0):(bt=!0,qe.__version=X.version);let _r=qe.currentProgram;bt===!0&&(_r=Aa(X,F,q));let Nf=!1,go=!1,zc=!1;const en=_r.getUniforms(),xr=qe.uniforms;if(Le.useProgram(_r.program)&&(Nf=!0,go=!0,zc=!0),X.id!==I&&(I=X.id,go=!0),Nf||S!==b){en.setValue(B,"projectionMatrix",b.projectionMatrix),en.setValue(B,"viewMatrix",b.matrixWorldInverse);const yn=en.map.cameraPosition;yn!==void 0&&yn.setValue(B,Ne.setFromMatrixPosition(b.matrixWorld)),Pe.logarithmicDepthBuffer&&en.setValue(B,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&en.setValue(B,"isOrthographic",b.isOrthographicCamera===!0),S!==b&&(S=b,go=!0,zc=!0)}if(q.isSkinnedMesh){en.setOptional(B,q,"bindMatrix"),en.setOptional(B,q,"bindMatrixInverse");const yn=q.skeleton;yn&&(Pe.floatVertexTextures?(yn.boneTexture===null&&yn.computeBoneTexture(),en.setValue(B,"boneTexture",yn.boneTexture,Ue),en.setValue(B,"boneTextureSize",yn.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Vc=W.morphAttributes;if((Vc.position!==void 0||Vc.normal!==void 0||Vc.color!==void 0&&Pe.isWebGL2===!0)&&L.update(q,W,_r),(go||qe.receiveShadow!==q.receiveShadow)&&(qe.receiveShadow=q.receiveShadow,en.setValue(B,"receiveShadow",q.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(xr.envMap.value=Ie,xr.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),go&&(en.setValue(B,"toneMappingExposure",x.toneMappingExposure),qe.needsLights&&K_(xr,zc),pe&&X.fog===!0&&ie.refreshFogUniforms(xr,pe),ie.refreshMaterialUniforms(xr,X,K,Q,Se),Ol.upload(B,Lf(qe),xr,Ue)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Ol.upload(B,Lf(qe),xr,Ue),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&en.setValue(B,"center",q.center),en.setValue(B,"modelViewMatrix",q.modelViewMatrix),en.setValue(B,"normalMatrix",q.normalMatrix),en.setValue(B,"modelMatrix",q.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const yn=X.uniformsGroups;for(let Hc=0,Q_=yn.length;Hc<Q_;Hc++)if(Pe.isWebGL2){const Df=yn[Hc];Te.update(Df,_r),Te.bind(Df,_r)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return _r}function K_(b,F){b.ambientLightColor.needsUpdate=F,b.lightProbe.needsUpdate=F,b.directionalLights.needsUpdate=F,b.directionalLightShadows.needsUpdate=F,b.pointLights.needsUpdate=F,b.pointLightShadows.needsUpdate=F,b.spotLights.needsUpdate=F,b.spotLightShadows.needsUpdate=F,b.rectAreaLights.needsUpdate=F,b.hemisphereLights.needsUpdate=F}function Z_(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(b,F,W){Oe.get(b.texture).__webglTexture=F,Oe.get(b.depthTexture).__webglTexture=W;const X=Oe.get(b);X.__hasExternalTextures=!0,X.__hasExternalTextures&&(X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||we.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,F){const W=Oe.get(b);W.__webglFramebuffer=F,W.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(b,F=0,W=0){w=b,M=F,C=W;let X=!0,q=null,pe=!1,Me=!1;if(b){const Ie=Oe.get(b);Ie.__useDefaultFramebuffer!==void 0?(Le.bindFramebuffer(B.FRAMEBUFFER,null),X=!1):Ie.__webglFramebuffer===void 0?Ue.setupRenderTarget(b):Ie.__hasExternalTextures&&Ue.rebindTextures(b,Oe.get(b.texture).__webglTexture,Oe.get(b.depthTexture).__webglTexture);const He=b.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(Me=!0);const Fe=Oe.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Fe[F])?q=Fe[F][W]:q=Fe[F],pe=!0):Pe.isWebGL2&&b.samples>0&&Ue.useMultisampledRTT(b)===!1?q=Oe.get(b).__webglMultisampledFramebuffer:Array.isArray(Fe)?q=Fe[W]:q=Fe,T.copy(b.viewport),j.copy(b.scissor),Y=b.scissorTest}else T.copy(z).multiplyScalar(K).floor(),j.copy(U).multiplyScalar(K).floor(),Y=k;if(Le.bindFramebuffer(B.FRAMEBUFFER,q)&&Pe.drawBuffers&&X&&Le.drawBuffers(b,q),Le.viewport(T),Le.scissor(j),Le.setScissorTest(Y),pe){const Ie=Oe.get(b.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+F,Ie.__webglTexture,W)}else if(Me){const Ie=Oe.get(b.texture),He=F||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ie.__webglTexture,W||0,He)}I=-1},this.readRenderTargetPixels=function(b,F,W,X,q,pe,Me){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=Oe.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Me!==void 0&&(Ae=Ae[Me]),Ae){Le.bindFramebuffer(B.FRAMEBUFFER,Ae);try{const Ie=b.texture,He=Ie.format,Fe=Ie.type;if(He!==hn&&be.convert(He)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ke=Fe===Zs&&(we.has("EXT_color_buffer_half_float")||Pe.isWebGL2&&we.has("EXT_color_buffer_float"));if(Fe!==cr&&be.convert(Fe)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Fe===Zn&&(Pe.isWebGL2||we.has("OES_texture_float")||we.has("WEBGL_color_buffer_float")))&&!ke){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=b.width-X&&W>=0&&W<=b.height-q&&B.readPixels(F,W,X,q,be.convert(He),be.convert(Fe),pe)}finally{const Ie=w!==null?Oe.get(w).__webglFramebuffer:null;Le.bindFramebuffer(B.FRAMEBUFFER,Ie)}}},this.copyFramebufferToTexture=function(b,F,W=0){const X=Math.pow(2,-W),q=Math.floor(F.image.width*X),pe=Math.floor(F.image.height*X);Ue.setTexture2D(F,0),B.copyTexSubImage2D(B.TEXTURE_2D,W,0,0,b.x,b.y,q,pe),Le.unbindTexture()},this.copyTextureToTexture=function(b,F,W,X=0){const q=F.image.width,pe=F.image.height,Me=be.convert(W.format),Ae=be.convert(W.type);Ue.setTexture2D(W,0),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,W.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,W.unpackAlignment),F.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,X,b.x,b.y,q,pe,Me,Ae,F.image.data):F.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,X,b.x,b.y,F.mipmaps[0].width,F.mipmaps[0].height,Me,F.mipmaps[0].data):B.texSubImage2D(B.TEXTURE_2D,X,b.x,b.y,Me,Ae,F.image),X===0&&W.generateMipmaps&&B.generateMipmap(B.TEXTURE_2D),Le.unbindTexture()},this.copyTextureToTexture3D=function(b,F,W,X,q=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const pe=b.max.x-b.min.x+1,Me=b.max.y-b.min.y+1,Ae=b.max.z-b.min.z+1,Ie=be.convert(X.format),He=be.convert(X.type);let Fe;if(X.isData3DTexture)Ue.setTexture3D(X,0),Fe=B.TEXTURE_3D;else if(X.isDataArrayTexture)Ue.setTexture2DArray(X,0),Fe=B.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,X.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,X.unpackAlignment);const ke=B.getParameter(B.UNPACK_ROW_LENGTH),Mt=B.getParameter(B.UNPACK_IMAGE_HEIGHT),xn=B.getParameter(B.UNPACK_SKIP_PIXELS),Dt=B.getParameter(B.UNPACK_SKIP_ROWS),mi=B.getParameter(B.UNPACK_SKIP_IMAGES),vt=W.isCompressedTexture?W.mipmaps[0]:W.image;B.pixelStorei(B.UNPACK_ROW_LENGTH,vt.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,vt.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,b.min.x),B.pixelStorei(B.UNPACK_SKIP_ROWS,b.min.y),B.pixelStorei(B.UNPACK_SKIP_IMAGES,b.min.z),W.isDataTexture||W.isData3DTexture?B.texSubImage3D(Fe,q,F.x,F.y,F.z,pe,Me,Ae,Ie,He,vt.data):W.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),B.compressedTexSubImage3D(Fe,q,F.x,F.y,F.z,pe,Me,Ae,Ie,vt.data)):B.texSubImage3D(Fe,q,F.x,F.y,F.z,pe,Me,Ae,Ie,He,vt),B.pixelStorei(B.UNPACK_ROW_LENGTH,ke),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Mt),B.pixelStorei(B.UNPACK_SKIP_PIXELS,xn),B.pixelStorei(B.UNPACK_SKIP_ROWS,Dt),B.pixelStorei(B.UNPACK_SKIP_IMAGES,mi),q===0&&X.generateMipmaps&&B.generateMipmap(Fe),Le.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?Ue.setTextureCube(b,0):b.isData3DTexture?Ue.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Ue.setTexture2DArray(b,0):Ue.setTexture2D(b,0),Le.unbindTexture()},this.resetState=function(){M=0,C=0,w=null,Le.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===hf?"display-p3":"srgb",t.unpackColorSpace=Je.workingColorSpace===Fc?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===yt?Or:g_}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Or?yt:Wt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class TA extends N_{}TA.prototype.isWebGL1Renderer=!0;class Ko{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new xe(e),this.density=t}clone(){return new Ko(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class D_ extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class bA{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=th,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const tn=new P;class yf{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix4(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.applyNormalMatrix(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.transformDirection(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}setX(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ci(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ci(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ci(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ci(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),i=tt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),i=tt(i,this.array),r=tt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),i=tt(i,this.array),r=tt(r,this.array),s=tt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Bt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new yf(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const ug=new P,dg=new it,hg=new it,AA=new P,fg=new Be,fl=new P,qu=new fi,pg=new Be,Yu=new co;class CA extends ht{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Qp,this.bindMatrix=new Be,this.bindMatrixInverse=new Be,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new hi),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,fl),this.boundingBox.expandByPoint(fl)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new fi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,fl),this.boundingSphere.expandByPoint(fl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const i=this.material,r=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qu.copy(this.boundingSphere),qu.applyMatrix4(r),e.ray.intersectsSphere(qu)!==!1&&(pg.copy(r).invert(),Yu.copy(e.ray).applyMatrix4(pg),!(this.boundingBox!==null&&Yu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Yu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new it,t=this.geometry.attributes.skinWeight;for(let i=0,r=t.count;i<r;i++){e.fromBufferAttribute(t,i);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Qp?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===kM?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const i=this.skeleton,r=this.geometry;dg.fromBufferAttribute(r.attributes.skinIndex,e),hg.fromBufferAttribute(r.attributes.skinWeight,e),ug.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=hg.getComponent(s);if(o!==0){const a=dg.getComponent(s);fg.multiplyMatrices(i.bones[a].matrixWorld,i.boneInverses[a]),t.addScaledVector(AA.copy(ug).applyMatrix4(fg),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class U_ extends ft{constructor(){super(),this.isBone=!0,this.type="Bone"}}class F_ extends kt{constructor(e=null,t=1,i=1,r,s,o,a,l,c=xt,u=xt,h,f){super(null,o,a,l,c,u,r,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const mg=new Be,RA=new Be;class Sf{constructor(e=[],t=[]){this.uuid=ei(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.boneTextureSize=0,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,r=this.bones.length;i<r;i++)this.boneInverses.push(new Be)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new Be;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,r=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:RA;mg.multiplyMatrices(a,t[s]),mg.toArray(i,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new Sf(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=v_(e),e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new F_(t,e,e,hn,Zn);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this.boneTextureSize=e,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,r=e.bones.length;i<r;i++){const s=e.bones[i];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new U_),this.bones.push(o),this.boneInverses.push(new Be().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let r=0,s=t.length;r<s;r++){const o=t[r];e.bones.push(o.uuid);const a=i[r];e.boneInverses.push(a.toArray())}return e}}class va extends Bt{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const hs=new Be,gg=new Be,pl=[],vg=new hi,PA=new Be,Ro=new ht,Po=new fi;class O_ extends ht{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new va(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,PA)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new hi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,hs),vg.copy(e.boundingBox).applyMatrix4(hs),this.boundingBox.union(vg)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new fi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,hs),Po.copy(e.boundingSphere).applyMatrix4(hs),this.boundingSphere.union(Po)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Ro.geometry=this.geometry,Ro.material=this.material,Ro.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Po.copy(this.boundingSphere),Po.applyMatrix4(i),e.ray.intersectsSphere(Po)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,hs),gg.multiplyMatrices(i,hs),Ro.matrixWorld=gg,Ro.raycast(e,pl);for(let o=0,a=pl.length;o<a;o++){const l=pl[o];l.instanceId=s,l.object=this,t.push(l)}pl.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new va(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Mf extends ti{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new xe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const _g=new P,xg=new P,yg=new Be,$u=new co,ml=new fi;class Ef extends ft{constructor(e=new Pn,t=new Mf){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)_g.fromBufferAttribute(t,r-1),xg.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=_g.distanceTo(xg);e.setAttribute("lineDistance",new bn(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ml.copy(i.boundingSphere),ml.applyMatrix4(r),ml.radius+=s,e.ray.intersectsSphere(ml)===!1)return;yg.copy(r).invert(),$u.copy(e.ray).applyMatrix4(yg);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new P,u=new P,h=new P,f=new P,m=this.isLineSegments?2:1,g=i.index,p=i.attributes.position;if(g!==null){const d=Math.max(0,o.start),v=Math.min(g.count,o.start+o.count);for(let x=d,y=v-1;x<y;x+=m){const M=g.getX(x),C=g.getX(x+1);if(c.fromBufferAttribute(p,M),u.fromBufferAttribute(p,C),$u.distanceSqToSegment(c,u,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const I=e.ray.origin.distanceTo(f);I<e.near||I>e.far||t.push({distance:I,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const d=Math.max(0,o.start),v=Math.min(p.count,o.start+o.count);for(let x=d,y=v-1;x<y;x+=m){if(c.fromBufferAttribute(p,x),u.fromBufferAttribute(p,x+1),$u.distanceSqToSegment(c,u,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const C=e.ray.origin.distanceTo(f);C<e.near||C>e.far||t.push({distance:C,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const Sg=new P,Mg=new P;class k_ extends Ef{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Sg.fromBufferAttribute(t,r),Mg.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Sg.distanceTo(Mg);e.setAttribute("lineDistance",new bn(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class LA extends Ef{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class B_ extends ti{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Eg=new Be,oh=new co,gl=new fi,vl=new P;class z_ extends ft{constructor(e=new Pn,t=new B_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),gl.copy(i.boundingSphere),gl.applyMatrix4(r),gl.radius+=s,e.ray.intersectsSphere(gl)===!1)return;Eg.copy(r).invert(),oh.copy(e.ray).applyMatrix4(Eg);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,h=i.attributes.position;if(c!==null){const f=Math.max(0,o.start),m=Math.min(c.count,o.start+o.count);for(let g=f,_=m;g<_;g++){const p=c.getX(g);vl.fromBufferAttribute(h,p),wg(vl,p,l,r,e,t,this)}}else{const f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let g=f,_=m;g<_;g++)vl.fromBufferAttribute(h,g),wg(vl,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function wg(n,e,t,i,r,s,o){const a=oh.distanceSqToPoint(n);if(a<t){const l=new P;oh.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class IA extends kt{constructor(e,t,i,r,s,o,a,l,c){super(e,t,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class kc extends Pn{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],f=[],m=[];let g=0;const _=[],p=i/2;let d=0;v(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new bn(h,3)),this.setAttribute("normal",new bn(f,3)),this.setAttribute("uv",new bn(m,2));function v(){const y=new P,M=new P;let C=0;const w=(t-e)/i;for(let I=0;I<=s;I++){const S=[],T=I/s,j=T*(t-e)+e;for(let Y=0;Y<=r;Y++){const Z=Y/r,D=Z*l+a,H=Math.sin(D),Q=Math.cos(D);M.x=j*H,M.y=-T*i+p,M.z=j*Q,h.push(M.x,M.y,M.z),y.set(H,w,Q).normalize(),f.push(y.x,y.y,y.z),m.push(Z,1-T),S.push(g++)}_.push(S)}for(let I=0;I<r;I++)for(let S=0;S<s;S++){const T=_[S][I],j=_[S+1][I],Y=_[S+1][I+1],Z=_[S][I+1];u.push(T,j,Z),u.push(j,Y,Z),C+=6}c.addGroup(d,C,0),d+=C}function x(y){const M=g,C=new Ce,w=new P;let I=0;const S=y===!0?e:t,T=y===!0?1:-1;for(let Y=1;Y<=r;Y++)h.push(0,p*T,0),f.push(0,T,0),m.push(.5,.5),g++;const j=g;for(let Y=0;Y<=r;Y++){const D=Y/r*l+a,H=Math.cos(D),Q=Math.sin(D);w.x=S*Q,w.y=p*T,w.z=S*H,h.push(w.x,w.y,w.z),f.push(0,T,0),C.x=H*.5+.5,C.y=Q*.5*T+.5,m.push(C.x,C.y),g++}for(let Y=0;Y<r;Y++){const Z=M+Y,D=j+Y;y===!0?u.push(D,D+1,Z):u.push(D+1,D,Z),I+=3}c.addGroup(d,I,y===!0?1:2),d+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kc(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class wf extends kc{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new wf(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const _l=new P,xl=new P,Ku=new P,yl=new Fn;class NA extends Pn{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(Fs*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),f={},m=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:_,b:p,c:d}=yl;if(_.fromBufferAttribute(a,c[0]),p.fromBufferAttribute(a,c[1]),d.fromBufferAttribute(a,c[2]),yl.getNormal(Ku),h[0]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,h[1]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,h[2]=`${Math.round(d.x*r)},${Math.round(d.y*r)},${Math.round(d.z*r)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let v=0;v<3;v++){const x=(v+1)%3,y=h[v],M=h[x],C=yl[u[v]],w=yl[u[x]],I=`${y}_${M}`,S=`${M}_${y}`;S in f&&f[S]?(Ku.dot(f[S].normal)<=s&&(m.push(C.x,C.y,C.z),m.push(w.x,w.y,w.z)),f[S]=null):I in f||(f[I]={index0:c[v],index1:c[x],normal:Ku.clone()})}}for(const g in f)if(f[g]){const{index0:_,index1:p}=f[g];_l.fromBufferAttribute(a,_),xl.fromBufferAttribute(a,p),m.push(_l.x,_l.y,_l.z),m.push(xl.x,xl.y,xl.z)}this.setAttribute("position",new bn(m,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class ks extends ti{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=df,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class vr extends ks{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ce(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Vt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new xe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new xe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new xe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class DA extends ti{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=df,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=lf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function Sl(n,e,t){return!n||!t&&n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function UA(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function FA(n){function e(r,s){return n[r]-n[s]}const t=n.length,i=new Array(t);for(let r=0;r!==t;++r)i[r]=r;return i.sort(e),i}function Tg(n,e,t){const i=n.length,r=new n.constructor(i);for(let s=0,o=0;o!==i;++s){const a=t[s]*e;for(let l=0;l!==e;++l)r[o++]=n[a+l]}return r}function V_(n,e,t,i){let r=1,s=n[0];for(;s!==void 0&&s[i]===void 0;)s=n[r++];if(s===void 0)return;let o=s[i];if(o!==void 0)if(Array.isArray(o))do o=s[i],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=n[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[i],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=n[r++];while(s!==void 0);else do o=s[i],o!==void 0&&(e.push(s.time),t.push(o)),s=n[r++];while(s!==void 0)}class wa{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let i=this._cachedIndex,r=t[i],s=t[i-1];e:{t:{let o;n:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break t}o=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(i=2,s=a);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=s,s=t[--i-1],e>=s)break t}o=i,i=0;break n}break e}for(;i<o;){const a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class OA extends wa{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:bs,endingEnd:bs}}intervalChanged_(e,t,i){const r=this.parameterPositions;let s=e-2,o=e+1,a=r[s],l=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case As:s=e,a=2*t-i;break;case hc:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case As:o=e,l=2*i-t;break;case hc:o=1,l=i+r[1]-r[0];break;default:o=e-1,l=t}const c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,i,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,m=this._weightNext,g=(i-t)/(r-t),_=g*g,p=_*g,d=-f*p+2*f*_-f*g,v=(1+f)*p+(-1.5-2*f)*_+(-.5+f)*g+1,x=(-1-m)*p+(1.5+m)*_+.5*g,y=m*p-m*_;for(let M=0;M!==a;++M)s[M]=d*o[u+M]+v*o[c+M]+x*o[l+M]+y*o[h+M];return s}}class H_ extends wa{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(i-t)/(r-t),h=1-u;for(let f=0;f!==a;++f)s[f]=o[c+f]*h+o[l+f]*u;return s}}class kA extends wa{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class pi{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Sl(t,this.TimeBufferType),this.values=Sl(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Sl(e.times,Array),values:Sl(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new kA(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new H_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new OA(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ma:t=this.InterpolantFactoryMethodDiscrete;break;case Js:t=this.InterpolantFactoryMethodLinear;break;case Eu:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ma;case this.InterpolantFactoryMethodLinear:return Js;case this.InterpolantFactoryMethodSmooth:return Eu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){const i=this.times,r=i.length;let s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,r=this.values,s=i.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(r!==void 0&&UA(r))for(let a=0,l=r.length;a!==l;++a){const c=r[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Eu,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(r)l=!0;else{const h=a*i,f=h-i,m=h+i;for(let g=0;g!==i;++g){const _=t[h+g];if(_!==t[f+g]||_!==t[m+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const h=a*i,f=o*i;for(let m=0;m!==i;++m)t[f+m]=t[h+m]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,l=o*i,c=0;c!==i;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}pi.prototype.TimeBufferType=Float32Array;pi.prototype.ValueBufferType=Float32Array;pi.prototype.DefaultInterpolation=Js;class fo extends pi{}fo.prototype.ValueTypeName="bool";fo.prototype.ValueBufferType=Array;fo.prototype.DefaultInterpolation=ma;fo.prototype.InterpolantFactoryMethodLinear=void 0;fo.prototype.InterpolantFactoryMethodSmooth=void 0;class G_ extends pi{}G_.prototype.ValueTypeName="color";class io extends pi{}io.prototype.ValueTypeName="number";class BA extends wa{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-t)/(r-t);let c=e*a;for(let u=c+a;c!==u;c+=4)_n.slerpFlat(s,0,o,c-a,o,c,l);return s}}class Wr extends pi{InterpolantFactoryMethodLinear(e){return new BA(this.times,this.values,this.getValueSize(),e)}}Wr.prototype.ValueTypeName="quaternion";Wr.prototype.DefaultInterpolation=Js;Wr.prototype.InterpolantFactoryMethodSmooth=void 0;class po extends pi{}po.prototype.ValueTypeName="string";po.prototype.ValueBufferType=Array;po.prototype.DefaultInterpolation=ma;po.prototype.InterpolantFactoryMethodLinear=void 0;po.prototype.InterpolantFactoryMethodSmooth=void 0;class ro extends pi{}ro.prototype.ValueTypeName="vector";class ah{constructor(e,t=-1,i,r=uf){this.name=e,this.tracks=i,this.duration=t,this.blendMode=r,this.uuid=ei(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],i=e.tracks,r=1/(e.fps||1);for(let o=0,a=i.length;o!==a;++o)t.push(VA(i[o]).scale(r));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],i=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=i.length;s!==o;++s)t.push(pi.toJSON(i[s]));return r}static CreateFromMorphTargetSequence(e,t,i,r){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=FA(l);l=Tg(l,1,u),c=Tg(c,1,u),!r&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new io(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/i))}return new this(e,-1,o)}static findByName(e,t){let i=e;if(!Array.isArray(e)){const r=e;i=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<i.length;r++)if(i[r].name===t)return i[r];return null}static CreateClipsFromMorphTargetSequences(e,t,i){const r={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const h=u[1];let f=r[h];f||(r[h]=f=[]),f.push(c)}}const o=[];for(const a in r)o.push(this.CreateFromMorphTargetSequence(a,r[a],t,i));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const i=function(h,f,m,g,_){if(m.length!==0){const p=[],d=[];V_(m,p,d,g),p.length!==0&&_.push(new h(f,p,d))}},r=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const f=c[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const m={};let g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let _=0;_<f[g].morphTargets.length;_++)m[f[g].morphTargets[_]]=-1;for(const _ in m){const p=[],d=[];for(let v=0;v!==f[g].morphTargets.length;++v){const x=f[g];p.push(x.time),d.push(x.morphTarget===_?1:0)}r.push(new io(".morphTargetInfluence["+_+"]",p,d))}l=m.length*o}else{const m=".bones["+t[h].name+"]";i(ro,m+".position",f,"pos",r),i(Wr,m+".quaternion",f,"rot",r),i(ro,m+".scale",f,"scl",r)}}return r.length===0?null:new this(s,l,r,a)}resetDuration(){const e=this.tracks;let t=0;for(let i=0,r=e.length;i!==r;++i){const s=this.tracks[i];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function zA(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return io;case"vector":case"vector2":case"vector3":case"vector4":return ro;case"color":return G_;case"quaternion":return Wr;case"bool":case"boolean":return fo;case"string":return po}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function VA(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=zA(n.type);if(n.times===void 0){const t=[],i=[];V_(n.keys,t,i,"value"),n.times=t,n.values=i}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}const so={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class HA{constructor(e,t,i){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const m=c[h],g=c[h+1];if(m.global&&(m.lastIndex=0),m.test(u))return g}return null}}}const GA=new HA;class mo{constructor(e){this.manager=e!==void 0?e:GA,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}mo.DEFAULT_MATERIAL_NAME="__DEFAULT";const Si={};class WA extends Error{constructor(e,t){super(e),this.response=t}}class W_ extends mo{constructor(e){super(e)}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=so.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Si[e]!==void 0){Si[e].push({onLoad:t,onProgress:i,onError:r});return}Si[e]=[],Si[e].push({onLoad:t,onProgress:i,onError:r});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Si[e],h=c.body.getReader(),f=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),m=f?parseInt(f):0,g=m!==0;let _=0;const p=new ReadableStream({start(d){v();function v(){h.read().then(({done:x,value:y})=>{if(x)d.close();else{_+=y.byteLength;const M=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:m});for(let C=0,w=u.length;C<w;C++){const I=u[C];I.onProgress&&I.onProgress(M)}d.enqueue(y),v()}})}}});return new Response(p)}else throw new WA(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,m=new TextDecoder(f);return c.arrayBuffer().then(g=>m.decode(g))}}}).then(c=>{so.add(e,c);const u=Si[e];delete Si[e];for(let h=0,f=u.length;h<f;h++){const m=u[h];m.onLoad&&m.onLoad(c)}}).catch(c=>{const u=Si[e];if(u===void 0)throw this.manager.itemError(e),c;delete Si[e];for(let h=0,f=u.length;h<f;h++){const m=u[h];m.onError&&m.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class jA extends mo{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=so.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=ga("img");function l(){u(),so.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(h){u(),r&&r(h),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class XA extends mo{constructor(e){super(e)}load(e,t,i,r){const s=new kt,o=new jA(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}class Ta extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new xe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class qA extends Ta{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new xe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Zu=new Be,bg=new P,Ag=new P;class Tf{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ce(512,512),this.map=null,this.mapPass=null,this.matrix=new Be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vf,this._frameExtents=new Ce(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;bg.setFromMatrixPosition(e.matrixWorld),t.position.copy(bg),Ag.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ag),t.updateMatrixWorld(),Zu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zu),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Zu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class YA extends Tf{constructor(){super(new sn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,i=eo*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(i!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class $A extends Ta{constructor(e,t,i=0,r=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.distance=i,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new YA}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Cg=new Be,Lo=new P,Qu=new P;class KA extends Tf{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ce(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Lo.setFromMatrixPosition(e.matrixWorld),i.position.copy(Lo),Qu.copy(i.position),Qu.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Qu),i.updateMatrixWorld(),r.makeTranslation(-Lo.x,-Lo.y,-Lo.z),Cg.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Cg)}}class ZA extends Ta{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new KA}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class QA extends Tf{constructor(){super(new _f(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ko extends Ta{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new QA}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class JA extends Ta{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class lh{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let i=0,r=e.length;i<r;i++)t+=String.fromCharCode(e[i]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class eC extends mo{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=so.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){so.add(e,l),t&&t(l),s.manager.itemEnd(e)}).catch(function(l){r&&r(l),s.manager.itemError(e),s.manager.itemEnd(e)}),s.manager.itemStart(e)}}class tC{constructor(e,t,i){this.binding=e,this.valueSize=i;let r,s,o;switch(t){case"quaternion":r=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(i*6),this._workIndex=5;break;case"string":case"bool":r=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(i*5);break;default:r=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(i*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const i=this.buffer,r=this.valueSize,s=e*r+r;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==r;++a)i[s+a]=i[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(i,s,0,a,r)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,i=this.valueSize,r=i*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,i),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,i=this.buffer,r=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(i,r,l,1-s,t)}o>0&&this._mixBufferRegionAdditive(i,r,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(i[l]!==i[l+t]){a.setValue(i,r);break}}saveOriginalState(){const e=this.binding,t=this.buffer,i=this.valueSize,r=i*this._origIndex;e.getValue(t,r);for(let s=i,o=r;s!==o;++s)t[s]=t[r+s%i];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let i=e;i<t;i++)this.buffer[i]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let i=0;i<this.valueSize;i++)this.buffer[t+i]=this.buffer[e+i]}_select(e,t,i,r,s){if(r>=.5)for(let o=0;o!==s;++o)e[t+o]=e[i+o]}_slerp(e,t,i,r){_n.slerpFlat(e,t,e,t,e,i,r)}_slerpAdditive(e,t,i,r,s){const o=this._workIndex*s;_n.multiplyQuaternionsFlat(e,o,e,t,e,i),_n.slerpFlat(e,t,e,t,e,o,r)}_lerp(e,t,i,r,s){const o=1-r;for(let a=0;a!==s;++a){const l=t+a;e[l]=e[l]*o+e[i+a]*r}}_lerpAdditive(e,t,i,r,s){for(let o=0;o!==s;++o){const a=t+o;e[a]=e[a]+e[i+o]*r}}}const bf="\\[\\]\\.:\\/",nC=new RegExp("["+bf+"]","g"),Af="[^"+bf+"]",iC="[^"+bf.replace("\\.","")+"]",rC=/((?:WC+[\/:])*)/.source.replace("WC",Af),sC=/(WCOD+)?/.source.replace("WCOD",iC),oC=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Af),aC=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Af),lC=new RegExp("^"+rC+sC+oC+aC+"$"),cC=["material","materials","bones","map"];class uC{constructor(e,t,i){const r=i||Qe.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){const i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}}class Qe{constructor(e,t,i){this.path=t,this.parsedPath=i||Qe.parseTrackName(t),this.node=Qe.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new Qe.Composite(e,t,i):new Qe(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(nC,"")}static parseTrackName(e){const t=lC.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const s=i.nodeName.substring(r+1);cC.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){const i=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=i(a.children);if(l)return l}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,i=t.objectName,r=t.propertyName;let s=t.propertyIndex;if(e||(e=Qe.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[r];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Qe.Composite=uC;Qe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Qe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Qe.prototype.GetterByBindingType=[Qe.prototype._getValue_direct,Qe.prototype._getValue_array,Qe.prototype._getValue_arrayElement,Qe.prototype._getValue_toArray];Qe.prototype.SetterByBindingTypeAndVersioning=[[Qe.prototype._setValue_direct,Qe.prototype._setValue_direct_setNeedsUpdate,Qe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_array,Qe.prototype._setValue_array_setNeedsUpdate,Qe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_arrayElement,Qe.prototype._setValue_arrayElement_setNeedsUpdate,Qe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_fromArray,Qe.prototype._setValue_fromArray_setNeedsUpdate,Qe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class dC{constructor(e,t,i=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=i,this.blendMode=r;const s=t.tracks,o=s.length,a=new Array(o),l={endingStart:bs,endingEnd:bs};for(let c=0;c!==o;++c){const u=s[c].createInterpolant(null);a[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=$M,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,i){if(e.fadeOut(t),this.fadeIn(t),i){const r=this._clip.duration,s=e._clip.duration,o=s/r,a=r/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,i){return e.crossFadeFrom(this,t,i)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,i){const r=this._mixer,s=r.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=r._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+i,c[0]=e/o,c[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,i,r){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*i;l<0||i===0?t=0:(this._startTime=null,t=i*l)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case ZM:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(o),c[u].accumulateAdditive(a);break;case uf:default:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(o),c[u].accumulate(r,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const i=this._weightInterpolant;if(i!==null){const r=i.evaluate(e)[0];t*=r,e>i.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const i=this._timeScaleInterpolant;if(i!==null){const r=i.evaluate(e)[0];t*=r,e>i.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,i=this.loop;let r=this.time+e,s=this._loopCount;const o=i===KM;if(e===0)return s===-1?r:o&&(s&1)===1?t-r:r;if(i===YM){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),r>=t||r<0){const a=Math.floor(r/t);r-=t*a,s+=Math.abs(a);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=r;if(o&&(s&1)===1)return t-r}return r}_setEndings(e,t,i){const r=this._interpolantSettings;i?(r.endingStart=As,r.endingEnd=As):(e?r.endingStart=this.zeroSlopeAtStart?As:bs:r.endingStart=hc,t?r.endingEnd=this.zeroSlopeAtEnd?As:bs:r.endingEnd=hc)}_scheduleFading(e,t,i){const r=this._mixer,s=r.time;let o=this._weightInterpolant;o===null&&(o=r._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=s,l[0]=t,a[1]=s+e,l[1]=i,this}}const hC=new Float32Array(1);class fC extends gr{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const i=e._localRoot||this._root,r=e._clip.tracks,s=r.length,o=e._propertyBindings,a=e._interpolants,l=i.uuid,c=this._bindingsByRootAndName;let u=c[l];u===void 0&&(u={},c[l]=u);for(let h=0;h!==s;++h){const f=r[h],m=f.name;let g=u[m];if(g!==void 0)++g.referenceCount,o[h]=g;else{if(g=o[h],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,m));continue}const _=t&&t._propertyBindings[h].binding.parsedPath;g=new tC(Qe.create(i,m,_),f.ValueTypeName,f.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,m),o[h]=g}a[h].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const i=(e._localRoot||this._root).uuid,r=e._clip.uuid,s=this._actionsByClip[r];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,r,i)}const t=e._propertyBindings;for(let i=0,r=t.length;i!==r;++i){const s=t[i];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let i=0,r=t.length;i!==r;++i){const s=t[i];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,i){const r=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=r.length,r.push(e),o.actionByRoot[i]=e}_removeInactiveAction(e){const t=this._actions,i=t[t.length-1],r=e._cacheIndex;i._cacheIndex=r,t[r]=i,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,a=o[s],l=a.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;const h=a.actionByRoot,f=(e._localRoot||this._root).uuid;delete h[f],l.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let i=0,r=t.length;i!==r;++i){const s=t[i];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,i=e._cacheIndex,r=this._nActiveActions++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=i,t[i]=s}_takeBackAction(e){const t=this._actions,i=e._cacheIndex,r=--this._nActiveActions,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=i,t[i]=s}_addInactiveBinding(e,t,i){const r=this._bindingsByRootAndName,s=this._bindings;let o=r[t];o===void 0&&(o={},r[t]=o),o[i]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,i=e.binding,r=i.rootNode.uuid,s=i.path,o=this._bindingsByRootAndName,a=o[r],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[r]}_lendBinding(e){const t=this._bindings,i=e._cacheIndex,r=this._nActiveBindings++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=i,t[i]=s}_takeBackBinding(e){const t=this._bindings,i=e._cacheIndex,r=--this._nActiveBindings,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=i,t[i]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let i=e[t];return i===void 0&&(i=new H_(new Float32Array(2),new Float32Array(2),1,hC),i.__cacheIndex=t,e[t]=i),i}_takeBackControlInterpolant(e){const t=this._controlInterpolants,i=e.__cacheIndex,r=--this._nActiveControlInterpolants,s=t[r];e.__cacheIndex=r,t[r]=e,s.__cacheIndex=i,t[i]=s}clipAction(e,t,i){const r=t||this._root,s=r.uuid;let o=typeof e=="string"?ah.findByName(r,e):e;const a=o!==null?o.uuid:e,l=this._actionsByClip[a];let c=null;if(i===void 0&&(o!==null?i=o.blendMode:i=uf),l!==void 0){const h=l.actionByRoot[s];if(h!==void 0&&h.blendMode===i)return h;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const u=new dC(this,o,t,i);return this._bindAction(u,c),this._addInactiveAction(u,a,s),u}existingAction(e,t){const i=t||this._root,r=i.uuid,s=typeof e=="string"?ah.findByName(i,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[r]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let i=t-1;i>=0;--i)e[i].stop();return this}update(e){e*=this.timeScale;const t=this._actions,i=this._nActiveActions,r=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==i;++c)t[c]._update(r,e,s,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,i=e.uuid,r=this._actionsByClip,s=r[i];if(s!==void 0){const o=s.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const u=c._cacheIndex,h=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(c)}delete r[i]}}uncacheRoot(e){const t=e.uuid,i=this._actionsByClip;for(const o in i){const a=i[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const r=this._bindingsByRootAndName,s=r[t];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const i=this.existingAction(e,t);i!==null&&(this._deactivateAction(i),this._removeInactiveAction(i))}}class pC{constructor(e,t,i=0,r=1/0){this.ray=new co(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new mf,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return ch(e,this,i,t),i.sort(Rg),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)ch(e[r],this,i,t);return i.sort(Rg),i}}function Rg(n,e){return n.distance-e.distance}function ch(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){const r=n.children;for(let s=0,o=r.length;s<o;s++)ch(r[s],e,t,!0)}}class Pg{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Vt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:af}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=af);const Lg={type:"change"},Ju={type:"start"},Ig={type:"end"},Ml=new co,Ng=new Ti,mC=Math.cos(70*pf.DEG2RAD);class gC extends gr{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Yr.ROTATE,MIDDLE:Yr.DOLLY,RIGHT:Yr.PAN},this.touches={ONE:$r.ROTATE,TWO:$r.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(L){L.addEventListener("keydown",E),this._domElementKeyEvents=L},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",E),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(Lg),i.update(),s=r.NONE},this.update=function(){const L=new P,oe=new _n().setFromUnitVectors(e.up,new P(0,1,0)),J=oe.clone().invert(),be=new P,ye=new _n,Te=new P,ve=2*Math.PI;return function(je=null){const N=i.object.position;L.copy(N).sub(i.target),L.applyQuaternion(oe),a.setFromVector3(L),i.autoRotate&&s===r.NONE&&j(S(je)),i.enableDamping?(a.theta+=l.theta*i.dampingFactor,a.phi+=l.phi*i.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let le=i.minAzimuthAngle,te=i.maxAzimuthAngle;isFinite(le)&&isFinite(te)&&(le<-Math.PI?le+=ve:le>Math.PI&&(le-=ve),te<-Math.PI?te+=ve:te>Math.PI&&(te-=ve),le<=te?a.theta=Math.max(le,Math.min(te,a.theta)):a.theta=a.theta>(le+te)/2?Math.max(le,a.theta):Math.min(te,a.theta)),a.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,a.phi)),a.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&C||i.object.isOrthographicCamera?a.radius=G(a.radius):a.radius=G(a.radius*c),L.setFromSpherical(a),L.applyQuaternion(J),N.copy(i.target).add(L),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),u.set(0,0,0));let $=!1;if(i.zoomToCursor&&C){let se=null;if(i.object.isPerspectiveCamera){const Ee=L.length();se=G(Ee*c);const Xe=Ee-se;i.object.position.addScaledVector(y,Xe),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const Ee=new P(M.x,M.y,0);Ee.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),$=!0;const Xe=new P(M.x,M.y,0);Xe.unproject(i.object),i.object.position.sub(Xe).add(Ee),i.object.updateMatrixWorld(),se=L.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;se!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(se).add(i.object.position):(Ml.origin.copy(i.object.position),Ml.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(Ml.direction))<mC?e.lookAt(i.target):(Ng.setFromNormalAndCoplanarPoint(i.object.up,i.target),Ml.intersectPlane(Ng,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),$=!0);return c=1,C=!1,$||be.distanceToSquared(i.object.position)>o||8*(1-ye.dot(i.object.quaternion))>o||Te.distanceToSquared(i.target)>0?(i.dispatchEvent(Lg),be.copy(i.object.position),ye.copy(i.object.quaternion),Te.copy(i.target),$=!1,!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",ee),i.domElement.removeEventListener("pointerdown",Oe),i.domElement.removeEventListener("pointercancel",Ke),i.domElement.removeEventListener("wheel",R),i.domElement.removeEventListener("pointermove",Ue),i.domElement.removeEventListener("pointerup",Ke),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",E),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const o=1e-6,a=new Pg,l=new Pg;let c=1;const u=new P,h=new Ce,f=new Ce,m=new Ce,g=new Ce,_=new Ce,p=new Ce,d=new Ce,v=new Ce,x=new Ce,y=new P,M=new Ce;let C=!1;const w=[],I={};function S(L){return L!==null?2*Math.PI/60*i.autoRotateSpeed*L:2*Math.PI/60/60*i.autoRotateSpeed}function T(){return Math.pow(.95,i.zoomSpeed)}function j(L){l.theta-=L}function Y(L){l.phi-=L}const Z=function(){const L=new P;return function(J,be){L.setFromMatrixColumn(be,0),L.multiplyScalar(-J),u.add(L)}}(),D=function(){const L=new P;return function(J,be){i.screenSpacePanning===!0?L.setFromMatrixColumn(be,1):(L.setFromMatrixColumn(be,0),L.crossVectors(i.object.up,L)),L.multiplyScalar(J),u.add(L)}}(),H=function(){const L=new P;return function(J,be){const ye=i.domElement;if(i.object.isPerspectiveCamera){const Te=i.object.position;L.copy(Te).sub(i.target);let ve=L.length();ve*=Math.tan(i.object.fov/2*Math.PI/180),Z(2*J*ve/ye.clientHeight,i.object.matrix),D(2*be*ve/ye.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(Z(J*(i.object.right-i.object.left)/i.object.zoom/ye.clientWidth,i.object.matrix),D(be*(i.object.top-i.object.bottom)/i.object.zoom/ye.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function Q(L){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c/=L:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function K(L){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c*=L:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function O(L){if(!i.zoomToCursor)return;C=!0;const oe=i.domElement.getBoundingClientRect(),J=L.clientX-oe.left,be=L.clientY-oe.top,ye=oe.width,Te=oe.height;M.x=J/ye*2-1,M.y=-(be/Te)*2+1,y.set(M.x,M.y,1).unproject(i.object).sub(i.object.position).normalize()}function G(L){return Math.max(i.minDistance,Math.min(i.maxDistance,L))}function z(L){h.set(L.clientX,L.clientY)}function U(L){O(L),d.set(L.clientX,L.clientY)}function k(L){g.set(L.clientX,L.clientY)}function ue(L){f.set(L.clientX,L.clientY),m.subVectors(f,h).multiplyScalar(i.rotateSpeed);const oe=i.domElement;j(2*Math.PI*m.x/oe.clientHeight),Y(2*Math.PI*m.y/oe.clientHeight),h.copy(f),i.update()}function de(L){v.set(L.clientX,L.clientY),x.subVectors(v,d),x.y>0?Q(T()):x.y<0&&K(T()),d.copy(v),i.update()}function fe(L){_.set(L.clientX,L.clientY),p.subVectors(_,g).multiplyScalar(i.panSpeed),H(p.x,p.y),g.copy(_),i.update()}function Se(L){O(L),L.deltaY<0?K(T()):L.deltaY>0&&Q(T()),i.update()}function De(L){let oe=!1;switch(L.code){case i.keys.UP:L.ctrlKey||L.metaKey||L.shiftKey?Y(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):H(0,i.keyPanSpeed),oe=!0;break;case i.keys.BOTTOM:L.ctrlKey||L.metaKey||L.shiftKey?Y(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):H(0,-i.keyPanSpeed),oe=!0;break;case i.keys.LEFT:L.ctrlKey||L.metaKey||L.shiftKey?j(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):H(i.keyPanSpeed,0),oe=!0;break;case i.keys.RIGHT:L.ctrlKey||L.metaKey||L.shiftKey?j(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):H(-i.keyPanSpeed,0),oe=!0;break}oe&&(L.preventDefault(),i.update())}function Re(){if(w.length===1)h.set(w[0].pageX,w[0].pageY);else{const L=.5*(w[0].pageX+w[1].pageX),oe=.5*(w[0].pageY+w[1].pageY);h.set(L,oe)}}function Ne(){if(w.length===1)g.set(w[0].pageX,w[0].pageY);else{const L=.5*(w[0].pageX+w[1].pageX),oe=.5*(w[0].pageY+w[1].pageY);g.set(L,oe)}}function ot(){const L=w[0].pageX-w[1].pageX,oe=w[0].pageY-w[1].pageY,J=Math.sqrt(L*L+oe*oe);d.set(0,J)}function ze(){i.enableZoom&&ot(),i.enablePan&&Ne()}function B(){i.enableZoom&&ot(),i.enableRotate&&Re()}function jt(L){if(w.length==1)f.set(L.pageX,L.pageY);else{const J=he(L),be=.5*(L.pageX+J.x),ye=.5*(L.pageY+J.y);f.set(be,ye)}m.subVectors(f,h).multiplyScalar(i.rotateSpeed);const oe=i.domElement;j(2*Math.PI*m.x/oe.clientHeight),Y(2*Math.PI*m.y/oe.clientHeight),h.copy(f)}function we(L){if(w.length===1)_.set(L.pageX,L.pageY);else{const oe=he(L),J=.5*(L.pageX+oe.x),be=.5*(L.pageY+oe.y);_.set(J,be)}p.subVectors(_,g).multiplyScalar(i.panSpeed),H(p.x,p.y),g.copy(_)}function Pe(L){const oe=he(L),J=L.pageX-oe.x,be=L.pageY-oe.y,ye=Math.sqrt(J*J+be*be);v.set(0,ye),x.set(0,Math.pow(v.y/d.y,i.zoomSpeed)),Q(x.y),d.copy(v)}function Le(L){i.enableZoom&&Pe(L),i.enablePan&&we(L)}function ut(L){i.enableZoom&&Pe(L),i.enableRotate&&jt(L)}function Oe(L){i.enabled!==!1&&(w.length===0&&(i.domElement.setPointerCapture(L.pointerId),i.domElement.addEventListener("pointermove",Ue),i.domElement.addEventListener("pointerup",Ke)),re(L),L.pointerType==="touch"?V(L):wt(L))}function Ue(L){i.enabled!==!1&&(L.pointerType==="touch"?ie(L):Nt(L))}function Ke(L){_e(L),w.length===0&&(i.domElement.releasePointerCapture(L.pointerId),i.domElement.removeEventListener("pointermove",Ue),i.domElement.removeEventListener("pointerup",Ke)),i.dispatchEvent(Ig),s=r.NONE}function wt(L){let oe;switch(L.button){case 0:oe=i.mouseButtons.LEFT;break;case 1:oe=i.mouseButtons.MIDDLE;break;case 2:oe=i.mouseButtons.RIGHT;break;default:oe=-1}switch(oe){case Yr.DOLLY:if(i.enableZoom===!1)return;U(L),s=r.DOLLY;break;case Yr.ROTATE:if(L.ctrlKey||L.metaKey||L.shiftKey){if(i.enablePan===!1)return;k(L),s=r.PAN}else{if(i.enableRotate===!1)return;z(L),s=r.ROTATE}break;case Yr.PAN:if(L.ctrlKey||L.metaKey||L.shiftKey){if(i.enableRotate===!1)return;z(L),s=r.ROTATE}else{if(i.enablePan===!1)return;k(L),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Ju)}function Nt(L){switch(s){case r.ROTATE:if(i.enableRotate===!1)return;ue(L);break;case r.DOLLY:if(i.enableZoom===!1)return;de(L);break;case r.PAN:if(i.enablePan===!1)return;fe(L);break}}function R(L){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(L.preventDefault(),i.dispatchEvent(Ju),Se(L),i.dispatchEvent(Ig))}function E(L){i.enabled===!1||i.enablePan===!1||De(L)}function V(L){switch(ae(L),w.length){case 1:switch(i.touches.ONE){case $r.ROTATE:if(i.enableRotate===!1)return;Re(),s=r.TOUCH_ROTATE;break;case $r.PAN:if(i.enablePan===!1)return;Ne(),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case $r.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;ze(),s=r.TOUCH_DOLLY_PAN;break;case $r.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;B(),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Ju)}function ie(L){switch(ae(L),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;jt(L),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;we(L),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Le(L),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;ut(L),i.update();break;default:s=r.NONE}}function ee(L){i.enabled!==!1&&L.preventDefault()}function re(L){w.push(L)}function _e(L){delete I[L.pointerId];for(let oe=0;oe<w.length;oe++)if(w[oe].pointerId==L.pointerId){w.splice(oe,1);return}}function ae(L){let oe=I[L.pointerId];oe===void 0&&(oe=new Ce,I[L.pointerId]=oe),oe.set(L.pageX,L.pageY)}function he(L){const oe=L.pointerId===w[0].pointerId?w[1]:w[0];return I[oe.pointerId]}i.domElement.addEventListener("contextmenu",ee),i.domElement.addEventListener("pointerdown",Oe),i.domElement.addEventListener("pointercancel",Ke),i.domElement.addEventListener("wheel",R,{passive:!1}),this.update()}}class vC{constructor(e,t,i){this.variables=[],this.currentTextureIndex=0;let r=Zn;const s=new D_,o=new gf;o.position.z=1;const a={passThruTexture:{value:null}},l=h(m(),a),c=new ht(new Ea(2,2),l);s.add(c),this.setDataType=function(g){return r=g,this},this.addVariable=function(g,_,p){const d=this.createShaderMaterial(_),v={name:g,initialValueTexture:p,material:d,dependencies:null,renderTargets:[],wrapS:null,wrapT:null,minFilter:xt,magFilter:xt};return this.variables.push(v),v},this.setVariableDependencies=function(g,_){g.dependencies=_},this.init=function(){if(i.capabilities.isWebGL2===!1&&i.extensions.has("OES_texture_float")===!1)return"No OES_texture_float support for float textures.";if(i.capabilities.maxVertexTextures===0)return"No support for vertex shader textures.";for(let g=0;g<this.variables.length;g++){const _=this.variables[g];_.renderTargets[0]=this.createRenderTarget(e,t,_.wrapS,_.wrapT,_.minFilter,_.magFilter),_.renderTargets[1]=this.createRenderTarget(e,t,_.wrapS,_.wrapT,_.minFilter,_.magFilter),this.renderTexture(_.initialValueTexture,_.renderTargets[0]),this.renderTexture(_.initialValueTexture,_.renderTargets[1]);const p=_.material,d=p.uniforms;if(_.dependencies!==null)for(let v=0;v<_.dependencies.length;v++){const x=_.dependencies[v];if(x.name!==_.name){let y=!1;for(let M=0;M<this.variables.length;M++)if(x.name===this.variables[M].name){y=!0;break}if(!y)return"Variable dependency not found. Variable="+_.name+", dependency="+x.name}d[x.name]={value:null},p.fragmentShader=`
uniform sampler2D `+x.name+`;
`+p.fragmentShader}}return this.currentTextureIndex=0,null},this.compute=function(){const g=this.currentTextureIndex,_=this.currentTextureIndex===0?1:0;for(let p=0,d=this.variables.length;p<d;p++){const v=this.variables[p];if(v.dependencies!==null){const x=v.material.uniforms;for(let y=0,M=v.dependencies.length;y<M;y++){const C=v.dependencies[y];x[C.name].value=C.renderTargets[g].texture}}this.doRenderTarget(v.material,v.renderTargets[_])}this.currentTextureIndex=_},this.getCurrentRenderTarget=function(g){return g.renderTargets[this.currentTextureIndex]},this.getAlternateRenderTarget=function(g){return g.renderTargets[this.currentTextureIndex===0?1:0]},this.dispose=function(){c.geometry.dispose(),c.material.dispose();const g=this.variables;for(let _=0;_<g.length;_++){const p=g[_];p.initialValueTexture&&p.initialValueTexture.dispose();const d=p.renderTargets;for(let v=0;v<d.length;v++)d[v].dispose()}};function u(g){g.defines.resolution="vec2( "+e.toFixed(1)+", "+t.toFixed(1)+" )"}this.addResolutionDefine=u;function h(g,_){_=_||{};const p=new ni({name:"GPUComputationShader",uniforms:_,vertexShader:f(),fragmentShader:g});return u(p),p}this.createShaderMaterial=h,this.createRenderTarget=function(g,_,p,d,v,x){return g=g||e,_=_||t,p=p||dn,d=d||dn,v=v||xt,x=x||xt,new hr(g,_,{wrapS:p,wrapT:d,minFilter:v,magFilter:x,format:hn,type:r,depthBuffer:!1})},this.createTexture=function(){const g=new Float32Array(e*t*4),_=new F_(g,e,t,hn,Zn);return _.needsUpdate=!0,_},this.renderTexture=function(g,_){a.passThruTexture.value=g,this.doRenderTarget(l,_),a.passThruTexture.value=null},this.doRenderTarget=function(g,_){const p=i.getRenderTarget(),d=i.xr.enabled,v=i.shadowMap.autoUpdate;i.xr.enabled=!1,i.shadowMap.autoUpdate=!1,c.material=g,i.setRenderTarget(_),i.render(s,o),c.material=l,i.xr.enabled=d,i.shadowMap.autoUpdate=v,i.setRenderTarget(p)};function f(){return`void main()	{

	gl_Position = vec4( position, 1.0 );

}
`}function m(){return`uniform sampler2D passThruTexture;

void main() {

	vec2 uv = gl_FragCoord.xy / resolution.xy;

	gl_FragColor = texture2D( passThruTexture, uv );

}
`}}}function Dg(n,e){if(e===QM)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===eh||e===m_){let t=n.getIndex();if(t===null){const o=[],a=n.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);n.setIndex(o),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}const i=t.count-2,r=[];if(e===eh)for(let o=1;o<=i;o++)r.push(t.getX(0)),r.push(t.getX(o)),r.push(t.getX(o+1));else for(let o=0;o<i;o++)o%2===0?(r.push(t.getX(o)),r.push(t.getX(o+1)),r.push(t.getX(o+2))):(r.push(t.getX(o+2)),r.push(t.getX(o+1)),r.push(t.getX(o)));r.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=n.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}class Cf extends mo{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new MC(t)}),this.register(function(t){return new PC(t)}),this.register(function(t){return new LC(t)}),this.register(function(t){return new IC(t)}),this.register(function(t){return new wC(t)}),this.register(function(t){return new TC(t)}),this.register(function(t){return new bC(t)}),this.register(function(t){return new AC(t)}),this.register(function(t){return new SC(t)}),this.register(function(t){return new CC(t)}),this.register(function(t){return new EC(t)}),this.register(function(t){return new RC(t)}),this.register(function(t){return new xC(t)}),this.register(function(t){return new NC(t)}),this.register(function(t){return new DC(t)})}load(e,t,i,r){const s=this;let o;this.resourcePath!==""?o=this.resourcePath:this.path!==""?o=this.path:o=lh.extractUrlBase(e),this.manager.itemStart(e);const a=function(c){r?r(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new W_(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},i,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,r){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===j_){try{o[$e.KHR_BINARY_GLTF]=new UC(e)}catch(h){r&&r(h);return}s=JSON.parse(o[$e.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new YC(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const h=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(h){case $e.KHR_MATERIALS_UNLIT:o[h]=new yC;break;case $e.KHR_DRACO_MESH_COMPRESSION:o[h]=new FC(s,this.dracoLoader);break;case $e.KHR_TEXTURE_TRANSFORM:o[h]=new OC;break;case $e.KHR_MESH_QUANTIZATION:o[h]=new kC;break;default:f.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(i,r)}parseAsync(e,t){const i=this;return new Promise(function(r,s){i.parse(e,t,r,s)})}}function _C(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}const $e={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class xC{constructor(e){this.parser=e,this.name=$e.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let i=0,r=t.length;i<r;i++){const s=t[i];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,i="light:"+e;let r=t.cache.get(i);if(r)return r;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new xe(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Wt);const h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new ko(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new ZA(u),c.distance=h;break;case"spot":c=new $A(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Xi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),r=Promise.resolve(c),t.cache.add(i,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,i=this.parser,s=i.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return i._getNodeRef(t.cache,a,l)})}}class yC{constructor(){this.name=$e.KHR_MATERIALS_UNLIT}getMaterialType(){return Qi}extendParams(e,t,i){const r=[];e.color=new xe(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Wt),e.opacity=o[3]}s.baseColorTexture!==void 0&&r.push(i.assignTexture(e,"map",s.baseColorTexture,yt))}return Promise.all(r)}}class SC{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class MC{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:vr}extendMaterialParams(e,t){const i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(i.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(i.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(i.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ce(a,a)}return Promise.all(s)}}class EC{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:vr}extendMaterialParams(e,t){const i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(i.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(i.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class wC{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_SHEEN}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:vr}extendMaterialParams(e,t){const i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new xe(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=r.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Wt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(i.assignTexture(t,"sheenColorMap",o.sheenColorTexture,yt)),o.sheenRoughnessTexture!==void 0&&s.push(i.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class TC{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:vr}extendMaterialParams(e,t){const i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(i.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class bC{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_VOLUME}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:vr}extendMaterialParams(e,t){const i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(i.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new xe().setRGB(a[0],a[1],a[2],Wt),Promise.all(s)}}class AC{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_IOR}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:vr}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class CC{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_SPECULAR}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:vr}extendMaterialParams(e,t){const i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(i.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new xe().setRGB(a[0],a[1],a[2],Wt),o.specularColorTexture!==void 0&&s.push(i.assignTexture(t,"specularColorMap",o.specularColorTexture,yt)),Promise.all(s)}}class RC{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:vr}extendMaterialParams(e,t){const i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(i.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class PC{constructor(e){this.parser=e,this.name=$e.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,i=t.json,r=i.textures[e];if(!r.extensions||!r.extensions[this.name])return null;const s=r.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class LC{constructor(e){this.parser=e,this.name=$e.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,i=this.parser,r=i.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=r.images[o.source];let l=i.textureLoader;if(a.uri){const c=i.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return i.loadTextureImage(e,o.source,l);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class IC{constructor(e){this.parser=e,this.name=$e.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,i=this.parser,r=i.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=r.images[o.source];let l=i.textureLoader;if(a.uri){const c=i.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return i.loadTextureImage(e,o.source,l);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return i.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class NC{constructor(e){this.name=$e.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){const r=i.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=r.byteOffset||0,c=r.byteLength||0,u=r.count,h=r.byteStride,f=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,r.mode,r.filter).then(function(m){return m.buffer}):o.ready.then(function(){const m=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(m),u,h,f,r.mode,r.filter),m})})}else return null}}class DC{constructor(e){this.name=$e.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const r=t.meshes[i.mesh];for(const c of r.primitives)if(c.mode!==Nn.TRIANGLES&&c.mode!==Nn.TRIANGLE_STRIP&&c.mode!==Nn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=i.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),h=u.isGroup?u.children:[u],f=c[0].count,m=[];for(const g of h){const _=new Be,p=new P,d=new _n,v=new P(1,1,1),x=new O_(g.geometry,g.material,f);for(let y=0;y<f;y++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&d.fromBufferAttribute(l.ROTATION,y),l.SCALE&&v.fromBufferAttribute(l.SCALE,y),x.setMatrixAt(y,_.compose(p,d,v));for(const y in l)if(y==="_COLOR_0"){const M=l[y];x.instanceColor=new va(M.array,M.itemSize,M.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&g.geometry.setAttribute(y,l[y]);ft.prototype.copy.call(x,g),this.parser.assignFinalMaterial(x),m.push(x)}return u.isGroup?(u.clear(),u.add(...m),u):m[0]}))}}const j_="glTF",Io=12,Ug={JSON:1313821514,BIN:5130562};class UC{constructor(e){this.name=$e.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Io),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==j_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const r=this.header.length-Io,s=new DataView(e,Io);let o=0;for(;o<r;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===Ug.JSON){const c=new Uint8Array(e,Io+o,a);this.content=i.decode(c)}else if(l===Ug.BIN){const c=Io+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class FC{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=$e.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const i=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const h=uh[u]||u.toLowerCase();a[h]=o[u]}for(const u in e.attributes){const h=uh[u]||u.toLowerCase();if(o[u]!==void 0){const f=i.accessors[e.attributes[u]],m=Bs[f.componentType];c[h]=m.name,l[h]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h){r.decodeDracoFile(u,function(f){for(const m in f.attributes){const g=f.attributes[m],_=l[m];_!==void 0&&(g.normalized=_)}h(f)},a,c)})})}}class OC{constructor(){this.name=$e.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class kC{constructor(){this.name=$e.KHR_MESH_QUANTIZATION}}class X_ extends wa{constructor(e,t,i,r){super(e,t,i,r)}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let o=0;o!==r;o++)t[o]=i[s+o];return t}interpolate_(e,t,i,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=r-t,h=(i-t)/u,f=h*h,m=f*h,g=e*c,_=g-c,p=-2*m+3*f,d=m-f,v=1-p,x=d-f+h;for(let y=0;y!==a;y++){const M=o[_+y+a],C=o[_+y+l]*u,w=o[g+y+a],I=o[g+y]*u;s[y]=v*M+x*C+p*w+d*I}return s}}const BC=new _n;class zC extends X_{interpolate_(e,t,i,r){const s=super.interpolate_(e,t,i,r);return BC.fromArray(s).normalize().toArray(s),s}}const Nn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Bs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Fg={9728:xt,9729:un,9984:Jd,9985:l_,9986:Fl,9987:Gr},Og={33071:dn,33648:dc,10497:Ks},ed={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},uh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Gi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},VC={CUBICSPLINE:void 0,LINEAR:Js,STEP:ma},td={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function HC(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new ks({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ui})),n.DefaultMaterial}function wr(n,e,t){for(const i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function Xi(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function GC(n,e,t){let i=!1,r=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const h=e[c];if(h.POSITION!==void 0&&(i=!0),h.NORMAL!==void 0&&(r=!0),h.COLOR_0!==void 0&&(s=!0),i&&r&&s)break}if(!i&&!r&&!s)return Promise.resolve(n);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const h=e[c];if(i){const f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):n.attributes.position;o.push(f)}if(r){const f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):n.attributes.normal;a.push(f)}if(s){const f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):n.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],f=c[2];return i&&(n.morphAttributes.position=u),r&&(n.morphAttributes.normal=h),s&&(n.morphAttributes.color=f),n.morphTargetsRelative=!0,n})}function WC(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,r=t.length;i<r;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function jC(n){let e;const t=n.extensions&&n.extensions[$e.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+nd(t.attributes):e=n.indices+":"+nd(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,r=n.targets.length;i<r;i++)e+=":"+nd(n.targets[i]);return e}function nd(n){let e="";const t=Object.keys(n).sort();for(let i=0,r=t.length;i<r;i++)e+=t[i]+":"+n[t[i]]+";";return e}function dh(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function XC(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const qC=new Be;class YC{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new _C,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,r=!1,s=-1;typeof navigator<"u"&&(i=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,r=navigator.userAgent.indexOf("Firefox")>-1,s=r?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||i||r&&s<98?this.textureLoader=new XA(this.options.manager):this.textureLoader=new eC(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new W_(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const i=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){const a={scene:o[0][r.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:r.asset,parser:i,userData:{}};return wr(s,a,r),Xi(a,r),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){const o=t[r].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let r=0,s=e.length;r<s;r++){const o=e[r];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;const r=i.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(i,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const r=e(t[i]);if(r)return r}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let r=0;r<t.length;r++){const s=e(t[r]);s&&i.push(s)}return i}getDependency(e,t){const i=e+":"+t;let r=this.cache.get(i);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(i,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){const i=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,o){return i.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[$e.KHR_BINARY_GLTF].body);const r=this.options;return new Promise(function(s,o){i.load(lh.resolveURL(t.uri,r.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){const r=t.byteLength||0,s=t.byteOffset||0;return i.slice(s,s+r)})}loadAccessor(e){const t=this,i=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){const o=ed[r.type],a=Bs[r.componentType],l=r.normalized===!0,c=new a(r.count*o);return Promise.resolve(new Bt(c,o,l))}const s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=ed[r.type],c=Bs[r.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,f=r.byteOffset||0,m=r.bufferView!==void 0?i.bufferViews[r.bufferView].byteStride:void 0,g=r.normalized===!0;let _,p;if(m&&m!==h){const d=Math.floor(f/m),v="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+d+":"+r.count;let x=t.cache.get(v);x||(_=new c(a,d*m,r.count*m/u),x=new bA(_,m/u),t.cache.add(v,x)),p=new yf(x,l,f%m/u,g)}else a===null?_=new c(r.count*l):_=new c(a,f,r.count*l),p=new Bt(_,l,g);if(r.sparse!==void 0){const d=ed.SCALAR,v=Bs[r.sparse.indices.componentType],x=r.sparse.indices.byteOffset||0,y=r.sparse.values.byteOffset||0,M=new v(o[1],x,r.sparse.count*d),C=new c(o[2],y,r.sparse.count*l);a!==null&&(p=new Bt(p.array.slice(),p.itemSize,p.normalized));for(let w=0,I=M.length;w<I;w++){const S=M[w];if(p.setX(S,C[w*l]),l>=2&&p.setY(S,C[w*l+1]),l>=3&&p.setZ(S,C[w*l+2]),l>=4&&p.setW(S,C[w*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return p})}loadTexture(e){const t=this.json,i=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=i.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,i){const r=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,i).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(s.samplers||{})[o.sampler]||{};return u.magFilter=Fg[f.magFilter]||un,u.minFilter=Fg[f.minFilter]||Gr,u.wrapS=Og[f.wrapS]||Ks,u.wrapT=Og[f.wrapT]||Ks,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const i=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const o=r.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=i.getDependency("bufferView",o.bufferView).then(function(h){c=!0;const f=new Blob([h],{type:o.mimeType});return l=a.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(h){return new Promise(function(f,m){let g=f;t.isImageBitmapLoader===!0&&(g=function(_){const p=new kt(_);p.needsUpdate=!0,f(p)}),t.load(lh.resolveURL(h,s.path),g,void 0,m)})}).then(function(h){return c===!0&&a.revokeObjectURL(l),h.userData.mimeType=o.mimeType||XC(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,i,r){const s=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),s.extensions[$e.KHR_TEXTURE_TRANSFORM]){const a=i.extensions!==void 0?i.extensions[$e.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[$e.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return r!==void 0&&(o.colorSpace=r),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let i=e.material;const r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+i.uuid;let l=this.cache.get(a);l||(l=new B_,ti.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(a,l)),i=l}else if(e.isLine){const a="LineBasicMaterial:"+i.uuid;let l=this.cache.get(a);l||(l=new Mf,ti.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(a,l)),i=l}if(r||s||o){let a="ClonedMaterial:"+i.uuid+":";r&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=i.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),r&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return ks}loadMaterial(e){const t=this,i=this.json,r=this.extensions,s=i.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[$e.KHR_MATERIALS_UNLIT]){const h=r[$e.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),c.push(h.extendParams(a,s,t))}else{const h=s.pbrMetallicRoughness||{};if(a.color=new xe(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const f=h.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Wt),a.opacity=f[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",h.baseColorTexture,yt)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Zt);const u=s.alphaMode||td.OPAQUE;if(u===td.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===td.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Qi&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Ce(1,1),s.normalTexture.scale!==void 0)){const h=s.normalTexture.scale;a.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&o!==Qi&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Qi){const h=s.emissiveFactor;a.emissive=new xe().setRGB(h[0],h[1],h[2],Wt)}return s.emissiveTexture!==void 0&&o!==Qi&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,yt)),Promise.all(c).then(function(){const h=new o(a);return s.name&&(h.name=s.name),Xi(h,s),t.associations.set(h,{materials:e}),s.extensions&&wr(r,h,s),h})}createUniqueName(e){const t=Qe.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,i=this.extensions,r=this.primitiveCache;function s(a){return i[$e.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return kg(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=jC(c),h=r[u];if(h)o.push(h.promise);else{let f;c.extensions&&c.extensions[$e.KHR_DRACO_MESH_COMPRESSION]?f=s(c):f=kg(new Pn,c,t),r[u]={primitive:c,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,i=this.json,r=this.extensions,s=i.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?HC(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let m=0,g=u.length;m<g;m++){const _=u[m],p=o[m];let d;const v=c[m];if(p.mode===Nn.TRIANGLES||p.mode===Nn.TRIANGLE_STRIP||p.mode===Nn.TRIANGLE_FAN||p.mode===void 0)d=s.isSkinnedMesh===!0?new CA(_,v):new ht(_,v),d.isSkinnedMesh===!0&&d.normalizeSkinWeights(),p.mode===Nn.TRIANGLE_STRIP?d.geometry=Dg(d.geometry,m_):p.mode===Nn.TRIANGLE_FAN&&(d.geometry=Dg(d.geometry,eh));else if(p.mode===Nn.LINES)d=new k_(_,v);else if(p.mode===Nn.LINE_STRIP)d=new Ef(_,v);else if(p.mode===Nn.LINE_LOOP)d=new LA(_,v);else if(p.mode===Nn.POINTS)d=new z_(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(d.geometry.morphAttributes).length>0&&WC(d,s),d.name=t.createUniqueName(s.name||"mesh_"+e),Xi(d,s),p.extensions&&wr(r,d,p),t.assignFinalMaterial(d),h.push(d)}for(let m=0,g=h.length;m<g;m++)t.associations.set(h[m],{meshes:e,primitives:m});if(h.length===1)return s.extensions&&wr(r,h[0],s),h[0];const f=new Ri;s.extensions&&wr(r,f,s),t.associations.set(f,{meshes:e});for(let m=0,g=h.length;m<g;m++)f.add(h[m]);return f})}loadCamera(e){let t;const i=this.json.cameras[e],r=i[i.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new sn(pf.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):i.type==="orthographic"&&(t=new _f(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Xi(t,i),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],i=[];for(let r=0,s=t.joints.length;r<s;r++)i.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(r){const s=r.pop(),o=r,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const h=o[c];if(h){a.push(h);const f=new Be;s!==null&&f.fromArray(s.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Sf(a,l)})}loadAnimation(e){const t=this.json,i=this,r=t.animations[e],s=r.name?r.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let h=0,f=r.channels.length;h<f;h++){const m=r.channels[h],g=r.samplers[m.sampler],_=m.target,p=_.node,d=r.parameters!==void 0?r.parameters[g.input]:g.input,v=r.parameters!==void 0?r.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",p)),a.push(this.getDependency("accessor",d)),l.push(this.getDependency("accessor",v)),c.push(g),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(h){const f=h[0],m=h[1],g=h[2],_=h[3],p=h[4],d=[];for(let v=0,x=f.length;v<x;v++){const y=f[v],M=m[v],C=g[v],w=_[v],I=p[v];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();const S=i._createAnimationTracks(y,M,C,w,I);if(S)for(let T=0;T<S.length;T++)d.push(S[T])}return new ah(s,void 0,d)})}createNodeMesh(e){const t=this.json,i=this,r=t.nodes[e];return r.mesh===void 0?null:i.getDependency("mesh",r.mesh).then(function(s){const o=i._getNodeRef(i.meshCache,r.mesh,s);return r.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=r.weights.length;l<c;l++)a.morphTargetInfluences[l]=r.weights[l]}),o})}loadNode(e){const t=this.json,i=this,r=t.nodes[e],s=i._loadNodeShallow(e),o=[],a=r.children||[];for(let c=0,u=a.length;c<u;c++)o.push(i.getDependency("node",a[c]));const l=r.skin===void 0?Promise.resolve(null):i.getDependency("skin",r.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],h=c[1],f=c[2];f!==null&&u.traverse(function(m){m.isSkinnedMesh&&m.bind(f,qC)});for(let m=0,g=h.length;m<g;m++)u.add(h[m]);return u})}_loadNodeShallow(e){const t=this.json,i=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?r.createUniqueName(s.name):"",a=[],l=r._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(r.getDependency("camera",s.camera).then(function(c){return r._getNodeRef(r.cameraCache,s.camera,c)})),r._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new U_:c.length>1?u=new Ri:c.length===1?u=c[0]:u=new ft,u!==c[0])for(let h=0,f=c.length;h<f;h++)u.add(c[h]);if(s.name&&(u.userData.name=s.name,u.name=o),Xi(u,s),s.extensions&&wr(i,u,s),s.matrix!==void 0){const h=new Be;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);return r.associations.has(u)||r.associations.set(u,{}),r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,i=this.json.scenes[e],r=this,s=new Ri;i.name&&(s.name=r.createUniqueName(i.name)),Xi(s,i),i.extensions&&wr(t,s,i);const o=i.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(r.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,h=l.length;u<h;u++)s.add(l[u]);const c=u=>{const h=new Map;for(const[f,m]of r.associations)(f instanceof ti||f instanceof kt)&&h.set(f,m);return u.traverse(f=>{const m=r.associations.get(f);m!=null&&h.set(f,m)}),h};return r.associations=c(s),s})}_createAnimationTracks(e,t,i,r,s){const o=[],a=e.name?e.name:e.uuid,l=[];Gi[s.path]===Gi.weights?e.traverse(function(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}):l.push(a);let c;switch(Gi[s.path]){case Gi.weights:c=io;break;case Gi.rotation:c=Wr;break;case Gi.position:case Gi.scale:c=ro;break;default:switch(i.itemSize){case 1:c=io;break;case 2:case 3:default:c=ro;break}break}const u=r.interpolation!==void 0?VC[r.interpolation]:Js,h=this._getArrayFromAccessor(i);for(let f=0,m=l.length;f<m;f++){const g=new c(l[f]+"."+Gi[s.path],t.array,h,u);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const i=dh(t.constructor),r=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)r[s]=t[s]*i;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){const r=this instanceof Wr?zC:X_;return new r(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function $C(n,e,t){const i=e.attributes,r=new hi;if(i.POSITION!==void 0){const a=t.json.accessors[i.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(r.set(new P(l[0],l[1],l[2]),new P(c[0],c[1],c[2])),a.normalized){const u=dh(Bs[a.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new P,l=new P;for(let c=0,u=s.length;c<u;c++){const h=s[c];if(h.POSITION!==void 0){const f=t.json.accessors[h.POSITION],m=f.min,g=f.max;if(m!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(m[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(m[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(m[2]),Math.abs(g[2]))),f.normalized){const _=dh(Bs[f.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(a)}n.boundingBox=r;const o=new fi;r.getCenter(o.center),o.radius=r.min.distanceTo(r.max)/2,n.boundingSphere=o}function kg(n,e,t){const i=e.attributes,r=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){n.setAttribute(a,l)})}for(const o in i){const a=uh[o]||o.toLowerCase();a in n.attributes||r.push(s(i[o],a))}if(e.indices!==void 0&&!n.index){const o=t.getDependency("accessor",e.indices).then(function(a){n.setIndex(a)});r.push(o)}return Je.workingColorSpace!==Wt&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Je.workingColorSpace}" not supported.`),Xi(n,e),$C(n,e,t),Promise.all(r).then(function(){return e.targets!==void 0?GC(n,e.targets,t):n})}const fs=160,Bg=256,KC=`
uniform float uDeltaTime;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 pos = texture2D(texturePosition, uv);
  vec4 vel = texture2D(textureVelocity, uv);

  pos.xyz += vel.xyz * uDeltaTime;
  gl_FragColor = pos;
}
`,ZC=`
uniform float uDeltaTime;
uniform float uTime;
uniform float uActiveCount;
uniform vec3 uBoundsMin;
uniform vec3 uBoundsMax;
uniform vec3 uSchoolCenters[3];
uniform vec3 uSchoolDirections[3];
uniform vec3 uPredatorPositions[3];
uniform float uPredatorCount;
uniform float uPredatorRadius;
uniform float uPredatorForce;

uniform float uCohesionWeight;
uniform float uAlignmentWeight;
uniform float uSeparationWeight;
uniform float uNeighborRadius;
uniform float uSeparationRadius;
uniform float uSocialWeight;
uniform float uIndividualWeight;
uniform float uMaxSpeed;
uniform float uMinSpeed;
uniform float uMaxForce;
uniform float uUndulationFrequency;
uniform float uVortexActive;
uniform vec3 uVortexCenter;
uniform float uVortexStrength;
uniform float uVortexRadius;

float hash(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  float myIndex = floor(gl_FragCoord.y) * resolution.x + floor(gl_FragCoord.x);

  // Multi-School Assignment:
  // School 0 (Mega-School): ~55% of sardines
  // School 1 (Secondary School): ~30% of sardines
  // School 2 (Satellite School): ~15% of sardines
  float normIdx = myIndex / max(uActiveCount, 1.0);
  vec3 mySchoolCenter = uSchoolCenters[0];
  vec3 mySchoolDirection = uSchoolDirections[0];
  if (normIdx >= 0.85) {
    mySchoolCenter = uSchoolCenters[2];
    mySchoolDirection = uSchoolDirections[2];
  } else if (normIdx >= 0.55) {
    mySchoolCenter = uSchoolCenters[1];
    mySchoolDirection = uSchoolDirections[1];
  }

  vec4 selfPosData = texture2D(texturePosition, uv);
  vec4 selfVelData = texture2D(textureVelocity, uv);

  // Inactive particles beyond active fish count: keep stationary
  if (myIndex >= uActiveCount) {
    gl_FragColor = selfVelData;
    return;
  }

  vec3 selfPos = selfPosData.xyz;
  vec3 selfVel = selfVelData.xyz;
  float selfSpeed = max(length(selfVel), 0.001);

  vec3 separation = vec3(0.0);
  vec3 alignmentHeading = vec3(0.0);
  vec3 cohesionCenter = vec3(0.0);

  float separationCount = 0.0;
  float neighborCount = 0.0;

  // Separation personal space radius (boosted so sardines maintain open 3D breathing space)
  float sepRadius = max(uSeparationRadius, 10.5);
  float sepRadiusSq = sepRadius * sepRadius;
  float neighborRadiusSq = uNeighborRadius * uNeighborRadius;

  // 10-point High-Performance Spatial Neighborhood Sampling:
  // 8 Direct 2D-Grid UV Stencil Neighbors (Guaranteed physical 3D proximity) + 2 Global School Samples
  vec2 stepUV = 1.0 / resolution.xy;
  vec2 kernel[8];
  kernel[0] = vec2( 1.0,  0.0);
  kernel[1] = vec2(-1.0,  0.0);
  kernel[2] = vec2( 0.0,  1.0);
  kernel[3] = vec2( 0.0, -1.0);
  kernel[4] = vec2( 1.0,  1.0);
  kernel[5] = vec2(-1.0, -1.0);
  kernel[6] = vec2( 1.0, -1.0);
  kernel[7] = vec2(-1.0,  1.0);

  // 1. Check local spatial cluster (statically mapped from 2D texture grid to 3D ocean volume)
  for (int i = 0; i < 8; i++) {
    vec2 sampleUV = fract(uv + kernel[i] * stepUV);
    vec3 otherPos = texture2D(texturePosition, sampleUV).xyz;
    vec3 otherVel = texture2D(textureVelocity, sampleUV).xyz;

    vec3 diff = otherPos - selfPos;
    float distSq = dot(diff, diff);

    if (distSq > 0.0001 && distSq < sepRadiusSq) {
      float dist = sqrt(distSq);
      // Smooth continuous quadratic repulsion curve: zero push at boundary, smooth continuous push at center
      float push = (sepRadius - dist) / sepRadius;
      float pushWeight = push * push * 2.8;
      separation -= (diff / dist) * pushWeight;
      separationCount += 1.0;
    }

    if (distSq > 0.0001 && distSq < neighborRadiusSq) {
      float otherSpeed = length(otherVel);
      if (otherSpeed > 0.01) {
        alignmentHeading += otherVel / otherSpeed;
      }
      cohesionCenter += otherPos;
      neighborCount += 1.0;
    }
  }

  // 2. Consistent stratified samples across the active population
  // Using deterministic per-fish hash instead of uTime to eliminate frame-to-frame neighbor hopping jitter
  for (int j = 0; j < 2; j++) {
    float tFrac = fract(float(j) * 0.6180339887 + hash(uv * 17.3 + vec2(float(j) * 0.41, float(j) * 0.67)));
    float peerIndex = floor(tFrac * uActiveCount);
    if (abs(peerIndex - myIndex) < 0.5) continue;

    float sX = (mod(peerIndex, resolution.x) + 0.5) / resolution.x;
    float sY = (floor(peerIndex / resolution.x) + 0.5) / resolution.y;
    vec2 sampleUV = vec2(sX, sY);

    vec3 otherPos = texture2D(texturePosition, sampleUV).xyz;
    vec3 otherVel = texture2D(textureVelocity, sampleUV).xyz;

    vec3 diff = otherPos - selfPos;
    float distSq = dot(diff, diff);

    if (distSq > 0.0001 && distSq < sepRadiusSq) {
      float dist = sqrt(distSq);
      float push = (sepRadius - dist) / sepRadius;
      float pushWeight = push * push * 2.8;
      separation -= (diff / dist) * pushWeight;
      separationCount += 1.0;
    }

    if (distSq > 0.0001 && distSq < neighborRadiusSq) {
      float otherSpeed = length(otherVel);
      if (otherSpeed > 0.01) {
        alignmentHeading += otherVel / otherSpeed;
      }
      cohesionCenter += otherPos;
      neighborCount += 1.0;
    }
  }

  vec3 steeringForce = vec3(0.0);

  // --- 1. REYNOLDS SEPARATION FORCE (Volumetric spacing, smooth normalized push) ---
  if (separationCount > 0.5) {
    vec3 avgSep = separation / separationCount;
    steeringForce += avgSep * (uSeparationWeight * 14.0);
  }

  // --- 2. REYNOLDS ALIGNMENT FORCE (Seamless, continuous blend between local flow and assigned school direction) ---
  vec3 targetHeading = (length(mySchoolDirection) > 0.01) ? normalize(mySchoolDirection) : vec3(0.0, 0.0, 1.0);
  if (neighborCount > 0.5) {
    vec3 localHeading = normalize(alignmentHeading);
    if (length(localHeading) > 0.01) {
      targetHeading = normalize(mix(targetHeading, localHeading, 0.72));
    }
  }
  vec3 desiredVel = targetHeading * selfSpeed;
  steeringForce += (desiredVel - selfVel) * (uAlignmentWeight * 2.8);

  // --- 3. REYNOLDS COHESION FORCE (Pulls fish together smoothly without rubber-banding) ---
  if (neighborCount > 0.5) {
    vec3 localCenter = cohesionCenter / neighborCount;
    vec3 toCenter = localCenter - selfPos;
    float distToLocal = length(toCenter);
    if (distToLocal > sepRadius * 0.8) {
      vec3 desiredDir = toCenter / distToLocal;
      float pull = smoothstep(sepRadius * 0.8, uNeighborRadius, distToLocal);
      steeringForce += desiredDir * (pull * uCohesionWeight * 2.4);
    }
  }

  // --- 4. GLOBAL SCHOOL COHESION (Gentle Macroscopic Ocean Flow to assigned school) ---
  vec3 toSchool = mySchoolCenter - selfPos;
  float distToSchool = length(toSchool);
  if (distToSchool > 45.0) {
    float schoolPull = smoothstep(45.0, 180.0, distToSchool);
    vec3 schoolDir = toSchool / distToSchool;
    steeringForce += schoolDir * (schoolPull * uCohesionWeight * 2.0);
  }

  // --- 5. SOFT BOUNDARY CONTAINMENT ---
  vec3 softMargin = vec3(25.0);
  vec3 bMin = uBoundsMin + softMargin;
  vec3 bMax = uBoundsMax - softMargin;

  if (selfPos.x < bMin.x) steeringForce.x += (bMin.x - selfPos.x) * 3.5;
  if (selfPos.x > bMax.x) steeringForce.x += (bMax.x - selfPos.x) * 3.5;
  if (selfPos.y < bMin.y) steeringForce.y += (bMin.y - selfPos.y) * 5.0;
  if (selfPos.y > bMax.y) steeringForce.y += (bMax.y - selfPos.y) * 5.0;
  if (selfPos.z < bMin.z) steeringForce.z += (bMin.z - selfPos.z) * 3.5;
  if (selfPos.z > bMax.z) steeringForce.z += (bMax.z - selfPos.z) * 3.5;

  // --- 6. OCEANIC WHIRLPOOL / CYCLONE VORTEX (Dynamic Bait-Ball Tornado) ---
  if (uVortexActive > 0.01) {
    vec3 toVortex = selfPos - uVortexCenter;
    float rH = length(toVortex.xz);
    if (rH < uVortexRadius && rH > 0.5) {
      float vortexFactor = (1.0 - smoothstep(0.0, uVortexRadius, rH)) * uVortexActive;

      // 1. High-speed tangential rotation around Y axis (+Y)
      vec3 tangent = normalize(vec3(-toVortex.z, 0.0, toVortex.x));

      // 2. 3D helical corkscrew vertical circulation (twisting cyclone funnel)
      float verticalSpiral = sin(rH * 0.15 - uTime * 2.2) * 0.45;
      tangent.y += verticalSpiral;
      tangent = normalize(tangent);

      // 3. Centripetal inward pull towards the vortex core
      vec3 inward = normalize(vec3(-toVortex.x, 0.0, -toVortex.z));

      // Combined cyclone vortex force
      vec3 cycloneForce = tangent * 30.0 + inward * 10.0;
      steeringForce += cycloneForce * (vortexFactor * uVortexStrength);
    }
  }

  // --- 7. PREDATOR EVASION (Realistic Lateral Burst Away From All Active Sharks) ---
  if (uPredatorCount > 0.5) {
    for (int p = 0; p < 3; p++) {
      if (float(p) >= uPredatorCount) break;
      vec3 toPred = selfPos - uPredatorPositions[p];
      float predDist = length(toPred);
      if (predDist < uPredatorRadius && predDist > 0.001) {
        float panic = 1.0 - (predDist / uPredatorRadius);
        vec3 fleeDir = normalize(toPred);
        vec3 lateral = cross(vec3(0.0, 1.0, 0.0), fleeDir);
        if (length(lateral) > 0.01) {
          fleeDir += normalize(lateral) * 0.35 * (hash(uv + float(p) * 0.17) > 0.5 ? 1.0 : -1.0);
        }
        fleeDir = normalize(fleeDir);
        steeringForce += fleeDir * (panic * panic * uPredatorForce * 40.0);
      }
    }
  }

  // --- 8. NATURAL 3D TURBULENCE & INDIVIDUAL WEAVE (Smooth low-frequency stream, no jitter) ---
  float flowTime = uTime * 0.12;
  vec3 p3 = selfPos * 0.02 + vec3(flowTime * 0.6, flowTime * 0.35, flowTime * 0.45);
  vec3 wander = vec3(
    sin(p3.y * 2.5 + p3.z * 1.3),
    sin(p3.x * 2.1 + p3.z * 1.6) * 0.35,
    cos(p3.x * 1.4 + p3.y * 1.8)
  );
  steeringForce += wander * (uIndividualWeight * 5.5);

  // --- 9. ACCELERATION LIMITING & HYDRODYNAMIC INERTIA ---
  float forceLen = length(steeringForce);
  float maxAllowedForce = uMaxForce * 2.5;
  if (forceLen > maxAllowedForce) {
    steeringForce = (steeringForce / forceLen) * maxAllowedForce;
  }

  // Target velocity based on current steering
  vec3 targetVel = selfVel + steeringForce * uDeltaTime;

  float targetSpeed = length(targetVel);
  float activeMaxSpeed = uMaxSpeed;
  if (uPredatorCount > 0.5) {
    for (int p = 0; p < 3; p++) {
      if (float(p) >= uPredatorCount) break;
      if (length(selfPos - uPredatorPositions[p]) < uPredatorRadius) {
        activeMaxSpeed = uMaxSpeed * 2.0;
        break;
      }
    }
  }

  if (targetSpeed > activeMaxSpeed) {
    targetVel = (targetVel / targetSpeed) * activeMaxSpeed;
  } else if (targetSpeed < uMinSpeed) {
    targetVel = (targetVel / max(targetSpeed, 0.0001)) * uMinSpeed;
  }

  // Prevent vertical stalling: ensure fish swim mostly horizontally
  if (abs(targetVel.y) > length(targetVel.xz) * 1.2) {
    targetVel.y *= 0.85;
  }

  // Hydrodynamic Inertia (viscous momentum filter):
  // Eliminates frame-time micro-stutters and produces silky-smooth forward gliding
  float inertiaBlend = clamp(1.0 - exp(-8.5 * uDeltaTime), 0.05, 0.35);
  vec3 newVel = mix(selfVel, targetVel, inertiaBlend);

  // Biomechanical tail wagging rate & phase integration
  float actualSpeed = length(newVel);
  vec3 accel = (newVel - selfVel) / max(uDeltaTime, 0.0001);
  float accelMag = length(accel);

  // Stillness threshold: motionless when completely still (speed < 0.1)
  float stillFactor = smoothstep(0.05, 0.35, actualSpeed);

  // Wandering cadence vs fast swimming & acceleration burst:
  // Wandering cruise speed is ~3.5 - 5.5, max speed is ~12.0 - 24.0
  float speedNorm = clamp((actualSpeed - 3.0) / 9.0, 0.0, 1.0);
  float accelNorm = clamp(accelMag / 25.0, 0.0, 1.0);
  float vigor = clamp(speedNorm + accelNorm * 0.7, 0.0, 1.0);

  // Dynamic tail frequency (scaled by store uUndulationFrequency):
  // Calm wandering: ~2.5 Hz (15.5 rad/s) - smooth, graceful, fluid
  // High-speed sprint / burst acceleration: up to ~7.0 Hz (44.0 rad/s) - rapid, vigorous
  float freqMultiplier = max(uUndulationFrequency / 3.2, 0.2);
  float baseWagFreq = 15.5 * freqMultiplier;
  float maxWagFreq = 44.0 * freqMultiplier;
  float tailFrequency = mix(baseWagFreq, maxWagFreq, pow(vigor, 1.25)) * stillFactor;

  float newPhase = mod(selfVelData.w + tailFrequency * uDeltaTime, 6.2831853);

  gl_FragColor = vec4(newVel, newPhase);
}
`;class QC{renderer;scene;bounds;textureWidth=fs;textureHeight=fs;maxCapacity=fs*fs;gpuCompute;positionVariable;velocityVariable;instancedMesh=null;currentFishCount=25e3;modelGeometry=null;modelMaterial=null;baseScale=1;simulationTime=0;smoothedDt=.0166;schoolCenters=[new P(0,16,0),new P(-55,22,35),new P(50,12,-30)];schoolVelocities=[new P(0,0,1),new P(1,0,0),new P(-1,0,0)];schoolCenter=this.schoolCenters[0];schoolVelocity=this.schoolVelocities[0];vortexTimer=0;vortexPhase="calm";vortexActiveValue=0;vortexCenter=new P(0,25,0);uniforms={uTexturePosition:{value:null},uTextureVelocity:{value:null},uTime:{value:0},uModelScale:{value:2},uUndulationAmplitude:{value:.22}};constructor(e,t,i){this.renderer=e,this.scene=t,this.bounds=i.bounds,this.currentFishCount=i.initialCount||25e3;const r=this.currentFishCount>25600?Bg:fs;this.textureWidth=r,this.textureHeight=r,this.maxCapacity=r*r,this.initGPUComputation(),this.initDefaultGeometry(),this.createInstancedMesh(),this.loadFishModel()}initGPUComputation(){this.gpuCompute=new vC(this.textureWidth,this.textureHeight,this.renderer),this.renderer.capabilities.isWebGL2===!1&&this.gpuCompute.setDataType(Zs);const e=this.gpuCompute.createTexture(),t=this.gpuCompute.createTexture();this.fillInitialTextures(e,t),this.positionVariable=this.gpuCompute.addVariable("texturePosition",KC,e),this.velocityVariable=this.gpuCompute.addVariable("textureVelocity",ZC,t),this.gpuCompute.setVariableDependencies(this.positionVariable,[this.positionVariable,this.velocityVariable]),this.gpuCompute.setVariableDependencies(this.velocityVariable,[this.positionVariable,this.velocityVariable]);const i=this.velocityVariable.material.uniforms;i.uDeltaTime={value:.016},i.uTime={value:0},i.uActiveCount={value:this.currentFishCount},i.uBoundsMin={value:this.bounds.min.clone()},i.uBoundsMax={value:this.bounds.max.clone()},i.uSchoolCenters={value:[this.schoolCenters[0].clone(),this.schoolCenters[1].clone(),this.schoolCenters[2].clone()]},i.uSchoolDirections={value:[this.schoolVelocities[0].clone(),this.schoolVelocities[1].clone(),this.schoolVelocities[2].clone()]},i.uPredatorPositions={value:[new P(0,-9999,0),new P(0,-9999,0),new P(0,-9999,0)]},i.uPredatorCount={value:0},i.uPredatorRadius={value:55},i.uPredatorForce={value:3.5};const r=nt.getState().parameters;i.uCohesionWeight={value:r.behavior.cohesionStrength??1.5},i.uAlignmentWeight={value:r.behavior.alignmentStrength??1},i.uSeparationWeight={value:r.behavior.separationStrength??2.2},i.uNeighborRadius={value:r.behavior.neighborRadius??40},i.uSeparationRadius={value:r.behavior.separationRadius??10.5},i.uSocialWeight={value:r.behavior.socialWeight??.7},i.uIndividualWeight={value:r.behavior.individualWeight??.35},i.uMaxSpeed={value:12},i.uMinSpeed={value:4},i.uMaxForce={value:30},i.uUndulationFrequency={value:r.behavior.undulationFrequency??3.2},i.uVortexActive={value:0},i.uVortexCenter={value:this.vortexCenter.clone()},i.uVortexStrength={value:1.8},i.uVortexRadius={value:110},this.uniforms.uUndulationAmplitude.value=r.behavior.undulationAmplitude??.22,this.positionVariable.material.uniforms.uDeltaTime={value:.016};const s=this.gpuCompute.init();s!==null&&console.error("GPUComputationRenderer init error:",s),this.uniforms.uTexturePosition.value=this.gpuCompute.getCurrentRenderTarget(this.positionVariable).texture,this.uniforms.uTextureVelocity.value=this.gpuCompute.getCurrentRenderTarget(this.velocityVariable).texture}fillInitialTextures(e,t){const i=e.image.data,r=t.image.data,s=140,o=140,a=10,c=68-a;for(let u=0,h=i.length;u<h;u+=4){const f=u/4,m=f%this.textureWidth/this.textureWidth,g=Math.floor(f/this.textureWidth)/this.textureHeight,_=(m-.5)*2*s,p=(g-.5)*2*o,d=(Math.random()-.5)*20,v=(Math.random()-.5)*20,x=a+Math.random()*c;i[u+0]=_+d,i[u+1]=x,i[u+2]=p+v,i[u+3]=1;const M=Math.atan2(p,_)+Math.PI*.5+(Math.random()-.5)*.8,C=(Math.random()-.5)*.25,w=Math.cos(C),I=Math.cos(M)*w,S=Math.sin(C),T=Math.sin(M)*w,j=4+Math.random()*2;r[u+0]=I*j,r[u+1]=S*j,r[u+2]=T*j,r[u+3]=Math.random()*Math.PI*2}}initDefaultGeometry(){const e=new wf(.35,1.6,7);e.rotateX(Math.PI/2),this.modelGeometry=e;const t=nt.getState().parameters.rendering;this.modelMaterial=new ks({color:9489145,metalness:t.metalness??.8,roughness:t.roughness??.2,envMapIntensity:t.envMapIntensity??1.5,emissive:new xe(1127253),emissiveIntensity:.3,side:Zt}),this.baseScale=1.8,this.uniforms.uModelScale.value=(t.modelScale??1.8)*this.baseScale}async loadFishModel(){const e="/Sardines-/",t=new Cf;t.setPath(`${e}assets/fish-model/`);try{const i=await t.loadAsync("scene.gltf");let r=null;if(i.scene.traverse(s=>{s instanceof ht&&!r&&(r=s)}),r){const s=r.geometry.clone();if(s.index){const c=s.index.array,u=c.length;for(let h=0;h<u;h+=3){const f=c[h+1];c[h+1]=c[h+2],c[h+2]=f}s.index.needsUpdate=!0,s.computeVertexNormals()}this.modelGeometry=s;const o=r.material,a=Array.isArray(o)?o[0].clone():o.clone(),l=nt.getState().parameters.rendering;a.side=Zt,a instanceof ks&&(a.metalness=l.metalness??.8,a.roughness=l.roughness??.2,a.envMapIntensity=l.envMapIntensity??1.5,a.emissive=new xe(1127253),a.emissiveIntensity=l.emissiveIntensity??.3,a.fog=!0,a.map&&(a.map.anisotropy=4),a.normalMap&&(a.normalMap.anisotropy=4)),this.modelMaterial=a,this.baseScale=1,this.uniforms.uModelScale.value=(l.modelScale??1.8)*this.baseScale,this.createInstancedMesh()}}catch(i){console.warn("GLTF fish-model load note:",i)}}createInstancedMesh(){if(!this.modelGeometry||!this.modelMaterial)return;this.instancedMesh&&(this.scene.remove(this.instancedMesh),this.instancedMesh.geometry.dispose(),Array.isArray(this.instancedMesh.material)?this.instancedMesh.material.forEach(a=>a.dispose()):this.instancedMesh.material.dispose());const e=this.modelGeometry.clone(),t=this.modelMaterial.clone(),i=new Float32Array(this.maxCapacity*2),r=new Float32Array(this.maxCapacity*3);for(let a=0;a<this.maxCapacity;a++){const l=(a%this.textureWidth+.5)/this.textureWidth,c=(Math.floor(a/this.textureWidth)+.5)/this.textureHeight;i[a*2+0]=l,i[a*2+1]=c,r[a*3+0]=.7+Math.random()*.5,r[a*3+1]=.8+Math.random()*.4,r[a*3+2]=Math.random()*Math.PI*2}e.setAttribute("aInstanceUV",new va(i,2)),e.setAttribute("aInstanceDNA",new va(r,3)),this.setupCustomShader(t);const s=new O_(e,t,this.maxCapacity),o=new Be;for(let a=0;a<this.maxCapacity;a++)s.setMatrixAt(a,o);s.instanceMatrix.needsUpdate=!0,s.count=Math.min(this.currentFishCount,this.maxCapacity),s.frustumCulled=!1,s.castShadow=!1,s.receiveShadow=!1,this.instancedMesh=s,this.scene.add(s)}setupCustomShader(e){const t=this.uniforms;e.onBeforeCompile=i=>{i.uniforms.uTexturePosition=t.uTexturePosition,i.uniforms.uTextureVelocity=t.uTextureVelocity,i.uniforms.uTime=t.uTime,i.uniforms.uModelScale=t.uModelScale,i.uniforms.uUndulationAmplitude=t.uUndulationAmplitude,i.vertexShader=i.vertexShader.replace("#include <common>",`
        #include <common>
        attribute vec2 aInstanceUV;
        attribute vec3 aInstanceDNA;
        uniform sampler2D uTexturePosition;
        uniform sampler2D uTextureVelocity;
        uniform float uTime;
        uniform float uModelScale;
        uniform float uUndulationAmplitude;
        `),i.vertexShader=i.vertexShader.replace("#include <beginnormal_vertex>",`
        #include <beginnormal_vertex>
        vec4 posData = texture2D(uTexturePosition, aInstanceUV);
        vec4 velData = texture2D(uTextureVelocity, aInstanceUV);
        vec3 fishVel = velData.xyz;
        float speed = length(fishVel);
        vec3 forward = (speed > 0.001) ? normalize(fishVel) : vec3(0.0, 0.0, 1.0);
        vec3 tempUp = (abs(forward.y) > 0.92) ? vec3(0.0, 0.0, 1.0) : vec3(0.0, 1.0, 0.0);
        vec3 right = normalize(cross(tempUp, forward));
        vec3 up = cross(forward, right);

        objectNormal = right * objectNormal.x + up * objectNormal.y + forward * objectNormal.z;
        `),i.vertexShader=i.vertexShader.replace("#include <begin_vertex>",`
        #include <begin_vertex>
        vec3 worldFishPos = posData.xyz;

        // Realistic carangiform swimming spine wave (head-to-tail propagation)
        // Nose is at +Z (~0.84), caudal fin is at -Z (~-1.16)
        float headZ = 0.84;
        float tailZ = -1.16;

        // Head remains steady; spine progressively flexes toward the caudal fin
        // smoothstep from gills (Z = 0.45) back to tail tip (Z = -1.16)
        float tailWeight = smoothstep(0.45, tailZ, position.z);

        // Continuous traveling wave along the spine with individual DNA offset
        float waveNumber = 2.4;
        float wigglePhase = velData.w + (position.z - headZ) * waveNumber + aInstanceDNA.z * 0.35;

        // Stillness factor: no movement if fish is motionless
        float stillFactor = smoothstep(0.08, 0.4, speed);

        // Vigor from speed (cruising = 0.0, sprinting = 1.0)
        float vigor = clamp((speed - 3.0) / 8.0, 0.0, 1.0);

        // User amplitude scale multiplier from store
        float ampMultiplier = max(uUndulationAmplitude / 0.22, 0.2);

        // Amplitude (Biomechanics: wider when slower, narrower when faster):
        // Calm wandering / slow cruising: wide, sweeping, graceful tail strokes (0.40 units)
        // High-speed sprint / burst panic: narrow, stiff, high-frequency hydrodynamic flutter (0.16 units)
        float slowStroke = 0.40 * ampMultiplier;
        float fastStroke = 0.16 * ampMultiplier;
        float strokeAmp = mix(slowStroke, fastStroke, vigor) * stillFactor;

        // Spine deformation wave: progressive caudal wave + natural body flex
        float waveDisplacement = sin(wigglePhase) * tailWeight * strokeAmp;
        float bodyBend = sin(wigglePhase - 0.7) * tailWeight * mix(0.07, 0.025, vigor) * ampMultiplier * stillFactor;

        // Slight counter-yaw on the rostrum/head for physical realism (scaled with stroke amplitude)
        float headCounterYaw = (1.0 - tailWeight) * smoothstep(-0.2, headZ, position.z) * 0.06 * strokeAmp;
        float headDisplacement = -sin(wigglePhase - 1.2) * headCounterYaw;

        vec3 localPos = position;
        localPos.x += waveDisplacement + bodyBend + headDisplacement;

        // Apply scale
        float finalScale = uModelScale * aInstanceDNA.x;
        localPos *= finalScale;

        // Orient and position in world space
        transformed = right * localPos.x + up * localPos.y + forward * localPos.z + worldFishPos;
        `),i.vertexShader=i.vertexShader.replace("#include <project_vertex>",`
        vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );
        gl_Position = projectionMatrix * mvPosition;
        `)},e.needsUpdate=!0}update(e,t){if(!this.gpuCompute)return;const i=Math.min(Math.max(e,.001),.05);this.smoothedDt=pf.lerp(this.smoothedDt,i,.15);const r=this.smoothedDt;this.simulationTime+=r;const s=this.simulationTime*.065,o=Math.sin(s)*85+Math.sin(s*.43)*30,a=16+Math.sin(s*.71)*10,l=Math.sin(s*.82)*80+Math.sin(s*.31)*25;this.schoolCenters[0].set(o,a,l);const c=(Math.cos(s)*85+Math.cos(s*.43)*30*.43)*.065,u=Math.cos(s*.71)*10*.71*.065,h=(Math.cos(s*.82)*80*.82+Math.cos(s*.31)*25*.31)*.065;this.schoolVelocities[0].set(c,u,h).normalize();const f=this.simulationTime*.072+2.4,m=Math.cos(f)*90+Math.sin(f*.38)*35,g=22+Math.cos(f*.62)*12,_=Math.sin(f*.75)*85+Math.cos(f*.41)*30;this.schoolCenters[1].set(m,g,_);const p=(-Math.sin(f)*90+Math.cos(f*.38)*35*.38)*.072,d=-Math.sin(f*.62)*12*.62*.072,v=(Math.cos(f*.75)*85*.75-Math.sin(f*.41)*30*.41)*.072;this.schoolVelocities[1].set(p,d,v).normalize();const x=this.simulationTime*.08+4.8,y=Math.sin(x*.9)*75+Math.cos(x*.47)*25,M=12+Math.sin(x*.55)*8,C=Math.cos(x*.85)*75+Math.sin(x*.33)*25;this.schoolCenters[2].set(y,M,C);const w=(Math.cos(x*.9)*75*.9-Math.sin(x*.47)*25*.47)*.08,I=Math.cos(x*.55)*8*.55*.08,S=(-Math.sin(x*.85)*75*.85+Math.cos(x*.33)*25*.33)*.08;this.schoolVelocities[2].set(w,I,S).normalize(),this.schoolCenter.copy(this.schoolCenters[0]),this.schoolVelocity.copy(this.schoolVelocities[0]);const T=this.velocityVariable.material.uniforms;T.uDeltaTime.value=r,T.uTime.value=this.simulationTime,T.uActiveCount.value=this.currentFishCount;for(let Z=0;Z<3;Z++)T.uSchoolCenters.value[Z].copy(this.schoolCenters[Z]),T.uSchoolDirections.value[Z].copy(this.schoolVelocities[Z]);if(t){const Z=Array.isArray(t)?t:[t],D=Math.min(Z.length,3);T.uPredatorCount.value=D;for(let H=0;H<3;H++)H<D?T.uPredatorPositions.value[H].copy(Z[H]):T.uPredatorPositions.value[H].set(0,-9999,0)}else T.uPredatorCount.value=0;this.vortexTimer+=r,this.vortexPhase==="calm"?this.vortexTimer>18&&(this.vortexPhase="ramping_up",this.vortexTimer=0,this.vortexCenter.copy(this.schoolCenter),this.vortexCenter.y=20):this.vortexPhase==="ramping_up"?(this.vortexActiveValue=Math.min(this.vortexTimer/2,1),this.vortexTimer>=2&&(this.vortexPhase="active",this.vortexTimer=0)):this.vortexPhase==="active"?(this.vortexActiveValue=1,this.vortexCenter.y=20+Math.sin(this.simulationTime*.8)*8,this.vortexTimer>=9&&(this.vortexPhase="ramping_down",this.vortexTimer=0)):this.vortexPhase==="ramping_down"&&(this.vortexActiveValue=Math.max(1-this.vortexTimer/2.5,0),this.vortexTimer>=2.5&&(this.vortexPhase="calm",this.vortexTimer=0,this.vortexActiveValue=0)),T.uVortexActive.value=this.vortexActiveValue,T.uVortexCenter.value.copy(this.vortexCenter),this.positionVariable.material.uniforms.uDeltaTime.value=r,this.gpuCompute.compute();const j=this.gpuCompute.getCurrentRenderTarget(this.positionVariable).texture,Y=this.gpuCompute.getCurrentRenderTarget(this.velocityVariable).texture;this.uniforms.uTexturePosition.value=j,this.uniforms.uTextureVelocity.value=Y,this.uniforms.uTime.value=this.simulationTime}triggerWhirlpool(){this.vortexPhase="ramping_up",this.vortexTimer=0,this.vortexCenter.copy(this.schoolCenter),this.vortexCenter.y=20,this.vortexActiveValue=.3,console.log("🌀 Oceanic Whirlpool triggered at center:",this.vortexCenter)}getVortexStatus(){return{active:this.vortexActiveValue>.05,factor:this.vortexActiveValue,phase:this.vortexPhase}}setFishCount(e){const t=e>25600?Bg:fs;t*t!==this.maxCapacity&&this.reinitializeComputation(t,t),this.currentFishCount=Math.min(Math.max(e,10),this.maxCapacity),this.instancedMesh&&(this.instancedMesh.count=this.currentFishCount),this.velocityVariable&&(this.velocityVariable.material.uniforms.uActiveCount.value=this.currentFishCount)}reinitializeComputation(e,t){this.gpuCompute&&this.gpuCompute.dispose(),this.textureWidth=e,this.textureHeight=t,this.maxCapacity=e*t,this.initGPUComputation(),this.createInstancedMesh()}getFishCount(){return this.currentFishCount}updateParameters(e){if(!this.velocityVariable)return;const t=this.velocityVariable.material.uniforms;if(e.behavior){const i=e.behavior;i.cohesionStrength!==void 0&&(t.uCohesionWeight.value=i.cohesionStrength),i.alignmentStrength!==void 0&&(t.uAlignmentWeight.value=i.alignmentStrength),i.separationStrength!==void 0&&(t.uSeparationWeight.value=i.separationStrength),i.neighborRadius!==void 0&&(t.uNeighborRadius.value=i.neighborRadius),i.separationRadius!==void 0&&(t.uSeparationRadius.value=i.separationRadius),i.socialWeight!==void 0&&(t.uSocialWeight.value=i.socialWeight),i.individualWeight!==void 0&&(t.uIndividualWeight.value=i.individualWeight),i.undulationFrequency!==void 0&&t.uUndulationFrequency&&(t.uUndulationFrequency.value=i.undulationFrequency),i.undulationAmplitude!==void 0&&(this.uniforms.uUndulationAmplitude.value=i.undulationAmplitude),i.whirlpoolStrength!==void 0&&t.uVortexStrength&&(t.uVortexStrength.value=i.whirlpoolStrength),i.whirlpoolRadius!==void 0&&t.uVortexRadius&&(t.uVortexRadius.value=i.whirlpoolRadius)}if(e.physics){const i=e.physics;i.maxSpeed!==void 0&&(t.uMaxSpeed.value=Math.max(i.maxSpeed*.15,6)),i.maxForce!==void 0&&(t.uMaxForce.value=i.maxForce)}if(e.rendering){const i=e.rendering;if(i.fishCount!==void 0&&i.fishCount!==this.currentFishCount&&this.setFishCount(i.fishCount),i.modelScale!==void 0&&(this.uniforms.uModelScale.value=i.modelScale*this.baseScale),this.instancedMesh&&this.instancedMesh.material instanceof ks){const r=this.instancedMesh.material;i.metalness!==void 0&&(r.metalness=i.metalness),i.roughness!==void 0&&(r.roughness=i.roughness),i.envMapIntensity!==void 0&&(r.envMapIntensity=i.envMapIntensity),i.emissiveIntensity!==void 0&&(r.emissiveIntensity=i.emissiveIntensity)}}}getFlockCenter(){if(this.vortexActiveValue>.001){const e=this.vortexActiveValue*this.vortexActiveValue*(3-2*this.vortexActiveValue);return this.schoolCenters[0].clone().lerp(this.vortexCenter,e)}return this.schoolCenters[0]}getSchools(){return[{id:0,name:"Alpha Mega-School",center:this.schoolCenters[0],velocity:this.schoolVelocities[0],population:Math.round(this.currentFishCount*.55)},{id:1,name:"Beta Secondary School",center:this.schoolCenters[1],velocity:this.schoolVelocities[1],population:Math.round(this.currentFishCount*.3)},{id:2,name:"Gamma Satellite School",center:this.schoolCenters[2],velocity:this.schoolVelocities[2],population:Math.round(this.currentFishCount*.15)}]}getBestHuntTarget(e){const t=this.getSchools();let i=-1,r=t[0].center.clone(),s=0,o=t[0].population;for(let a=0;a<t.length;a++){const l=t[a],c=e.distanceTo(l.center),u=Math.pow(l.population,1.15)/(c+35);u>i&&(i=u,r=l.center.clone(),s=l.id,o=l.population)}return{target:r,schoolId:s,population:o}}getFlockVelocity(){return this.schoolVelocity}getLeaderPosition(){return this.getFlockCenter()}getStats(){return{fishCount:this.currentFishCount,activeFish:this.currentFishCount,visibleFish:this.currentFishCount,averageSpeed:5.5,averageSize:1,sizeRange:{min:.7,max:1.2}}}dispose(){this.instancedMesh&&(this.scene.remove(this.instancedMesh),this.instancedMesh.geometry.dispose(),Array.isArray(this.instancedMesh.material)?this.instancedMesh.material.forEach(e=>e.dispose()):this.instancedMesh.material.dispose()),this.gpuCompute&&this.gpuCompute.dispose()}}class JC{constructor(e,t={}){this.scene=e,this.config={rayCount:t.rayCount??15,rayRadius:t.rayRadius??15,rayHeight:t.rayHeight??250,rayColor:t.rayColor??8900331,rayOpacity:t.rayOpacity??.15},this.raysGroup=new Ri,this.rayMaterial=this.createRayMaterial(),this.createRays(),this.scene.add(this.raysGroup);const i=nt.getState().parameters.rendering;this.createMarineSnow(i.particleCount,i.particleOpacity)}raysGroup;rayMaterial;particleGroup=null;particleMaterial=null;config;createRayMaterial(){return new ni({transparent:!0,depthWrite:!1,side:Zt,blending:lc,uniforms:{uTime:{value:0},uColor:{value:new xe(this.config.rayColor)},uOpacity:{value:this.config.rayOpacity}},vertexShader:`
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        uniform float uTime;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          
          // Add some sway to the rays
          vec3 pos = position;
          float sway = sin(uTime * 0.4 + position.x * 0.05) * 4.0;
          pos.x += sway;
          pos.z += sin(uTime * 0.25 + position.y * 0.05) * 3.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,fragmentShader:`
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        uniform vec3 uColor;
        uniform float uOpacity;
        uniform float uTime;

        // Simple Hash Noise
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        // Value Noise
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                     mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
        }

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);

          // View-dependent edge fading (silhouette fade)
          // 1.0 when looking directly at the surface, 0.0 at the edges
          float viewDot = abs(dot(normal, viewDir));
          float edgeFade = pow(viewDot, 4.0); // Higher power means softer, more blurred edges
          
          // Smoother vertical fade (fade out at the very top and bottom)
          float vFade = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
          
          // Lower frequency noise for smoother, less sharp wisps
          float n1 = noise(vec2(vUv.x * 6.0 + uTime * 0.15, vUv.y * 1.5 - uTime * 0.08));
          float n2 = noise(vec2(vUv.x * 4.0 - uTime * 0.1, vUv.y * 2.5 + uTime * 0.04));
          float wisps = mix(n1, n2, 0.5);
          
          // Softer highlights and more blurred "smoke"
          // We apply edgeFade heavily to highlights to ensure they don't break the silhouette
          float highlights = pow(wisps, 3.0) * 1.5;
          float smoke = wisps * 0.5 + 0.5;
          
          // Smoother pulsing effect
          float flicker = 0.92 + 0.08 * sin(uTime * 1.2 + vUv.x * 12.0);
          
          // Combine factors for a blurred, volumetric look dependent on view angle
          float alpha = edgeFade * vFade * smoke * flicker + (highlights * edgeFade * vFade * 0.3);
          
          // Boost opacity slightly since edgeFade reduces overall brightness
          gl_FragColor = vec4(uColor, alpha * uOpacity * 1.5);
        }
      `})}createRays(){const e=new kc(this.config.rayRadius*.5,this.config.rayRadius,this.config.rayHeight,16,1,!0);for(let t=0;t<this.config.rayCount;t++){const i=this.rayMaterial.clone(),r=Math.random()*10;i.uniforms.uTime={value:r};const s=new ht(e,i);s.position.set((Math.random()-.5)*500,this.config.rayHeight/2-50,(Math.random()-.5)*500),s.rotation.x=(Math.random()-.5)*.4,s.rotation.z=(Math.random()-.5)*.4;const o=.4+Math.random()*1.2,a=.8+Math.random()*.4,l=o;s.scale.set(o,a,l),this.raysGroup.add(s)}}createMarineSnow(e,t){const i=e,r=new Pn,s=new Float32Array(i*3),o=new Float32Array(i),a=new Float32Array(i);for(let l=0;l<i;l++)s[l*3]=(Math.random()-.5)*600,s[l*3+1]=Math.random()*250-50,s[l*3+2]=(Math.random()-.5)*600,o[l]=Math.random()*Math.PI*2,a[l]=.5+Math.random()*2;r.setAttribute("position",new Bt(s,3)),r.setAttribute("phase",new Bt(o,1)),r.setAttribute("size",new Bt(a,1)),this.particleMaterial=new ni({transparent:!0,depthWrite:!1,blending:lc,uniforms:b_.merge([ce.fog,{uTime:{value:0},uColor:{value:new xe(8900331)},uOpacity:{value:t}}]),fog:!0,vertexShader:`
        #include <common>
        #include <fog_pars_vertex>
        attribute float phase;
        attribute float size;
        varying float vOpacity;
        uniform float uTime;

        void main() {
          vec3 pos = position;
          
          // Subtle drifting motion
          pos.x += sin(uTime * 0.2 + phase) * 2.0;
          pos.y += cos(uTime * 0.15 + phase) * 3.0;
          pos.z += sin(uTime * 0.25 + phase) * 2.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          
          // Fade based on depth
          vOpacity = smoothstep(500.0, 100.0, -mvPosition.z);
          
          gl_Position = projectionMatrix * mvPosition;
          #include <fog_vertex>
        }
      `,fragmentShader:`
        #include <fog_pars_fragment>
        varying float vOpacity;
        uniform vec3 uColor;
        uniform float uOpacity;

        void main() {
          // Soft circular particle with smooth alpha falloff (no discard to preserve GPU Early-Z)
          float d = distance(gl_PointCoord, vec2(0.5));
          float strength = clamp(1.0 - d * 2.0, 0.0, 1.0);
          strength = strength * strength;
          
          gl_FragColor = vec4(uColor, strength * uOpacity * vOpacity);
          #include <fog_fragment>
        }
      `}),this.particleGroup=new z_(r,this.particleMaterial),this.scene.add(this.particleGroup)}updateParticleOpacity(e){this.particleMaterial&&(this.particleMaterial.uniforms.uOpacity.value=e)}updateParticleCount(e,t){this.particleGroup&&(this.particleGroup.geometry&&this.particleGroup.geometry.dispose(),this.particleMaterial&&this.particleMaterial.dispose(),this.scene.remove(this.particleGroup)),this.createMarineSnow(e,t)}update(e){const t=e;this.raysGroup.children.forEach(i=>{i instanceof ht&&i.material instanceof ni&&(i.material.uniforms.uTime.value+=t)}),this.particleMaterial&&(this.particleMaterial.uniforms.uTime.value+=t)}dispose(){this.raysGroup.children.forEach(e=>{e instanceof ht&&e.geometry&&e.geometry.dispose()}),this.rayMaterial.dispose(),this.scene.remove(this.raysGroup),this.particleGroup&&(this.particleGroup.geometry&&this.particleGroup.geometry.dispose(),this.particleMaterial&&this.particleMaterial.dispose(),this.scene.remove(this.particleGroup))}}class eR{scene;config;model=null;loader;isLoading=!1;loadError=null;constructor(e,t){this.scene=e,this.config=t,this.loader=new Cf}async loadModel(){if(!(!this.config.enabled||this.isLoading||this.model)){this.isLoading=!0,this.loadError=null;try{console.log("🌊 Loading external sea floor GLTF model...");try{const t="/Sardines-/models/underwater_terrain/scene.gltf",i=await this.loader.loadAsync(t);this.model=i.scene,console.log("✅ GLTF sea floor model loaded successfully!")}catch(e){console.warn("⚠️ GLTF model failed to load, creating fallback plane:",e);const t=new Ea(2e3,2e3,2,2),i=new DA({color:9127187,side:Zt});this.model=new ht(t,i),console.log("✅ Fallback sea floor plane created (2000x2000)!")}this.model&&(this.model.scale.setScalar(this.config.scale),this.model.position.copy(this.config.position),this.model.rotation.copy(this.config.rotation),this.model.traverse(e=>{e instanceof ht&&(e.receiveShadow=this.config.receiveShadows,e.castShadow=this.config.castShadows)}),this.scene.add(this.model),console.log("✅ Sea floor model loaded successfully!"),console.log("📊 Model info:",{children:this.model.children.length,scale:this.config.scale,position:this.config.position,rotation:this.config.rotation})),console.log("🌊 Sea floor scaled to:",this.config.scale,"x (ocean bottom coverage)")}catch(e){this.loadError=e instanceof Error?e.message:"Unknown error",console.error("❌ Failed to load sea floor model:",this.loadError)}finally{this.isLoading=!1}}}updateConfig(e){this.config={...this.config,...e},this.model&&(e.scale!==void 0&&this.model.scale.setScalar(this.config.scale),e.position!==void 0&&this.model.position.copy(this.config.position),e.rotation!==void 0&&this.model.rotation.copy(this.config.rotation),this.model.traverse(t=>{t instanceof ht&&(t.receiveShadow=this.config.receiveShadows,t.castShadow=this.config.castShadows)}))}getModel(){return this.model}getIsLoading(){return this.isLoading}getLoadError(){return this.loadError}isEnabled(){return this.config.enabled}dispose(){this.model&&(this.scene.remove(this.model),this.model.traverse(e=>{e instanceof ht&&(e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())}),this.model=null),this.isLoading=!1,this.loadError=null}}function tR(n){const e=new Map,t=new Map,i=n.clone();return q_(n,i,function(r,s){e.set(s,r),t.set(r,s)}),i.traverse(function(r){if(!r.isSkinnedMesh)return;const s=r,o=e.get(r),a=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=a.map(function(l){return t.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),i}function q_(n,e,t){t(n,e);for(let i=0;i<n.children.length;i++)q_(n.children[i],e.children[i],t)}class nR{scene;isLoaded=!1;visible=!0;currentScale=8.5;sharks=[{id:0,model:null,mixer:null,heading:new P(0,0,1),targetPosition:new P(0,12,50),spawnPosition:new P(0,10,-70),hasBeenPositioned:!1,swimSpeed:6.2,maxTurnRate:.26,scale:8.5,patrolOffset:new P(0,0,0)},{id:1,model:null,mixer:null,heading:new P(1,0,0),targetPosition:new P(-45,8,30),spawnPosition:new P(-65,6,20),hasBeenPositioned:!1,swimSpeed:5.7,maxTurnRate:.23,scale:7.6,patrolOffset:new P(-45,-4,-30)},{id:2,model:null,mixer:null,heading:new P(-1,0,0),targetPosition:new P(45,16,40),spawnPosition:new P(65,16,35),hasBeenPositioned:!1,swimSpeed:6.6,maxTurnRate:.28,scale:7.2,patrolOffset:new P(45,3,25)}];constructor(e){this.scene=e,this.loadModel()}setScale(e){this.currentScale=Math.max(e,1);const t=[1,.9,.85];for(let i=0;i<this.sharks.length;i++){const r=this.sharks[i];r.scale=this.currentScale*t[i],r.model&&r.model.scale.set(r.scale,r.scale,r.scale)}}async loadModel(){try{const e=new Cf,i="/Sardines-/models/great_white_shark/scene.gltf",r=await e.loadAsync(i);r.scene.traverse(s=>{if(s.isMesh){const o=s;o.frustumCulled=!1,(Array.isArray(o.material)?o.material:[o.material]).forEach(l=>{l.side=Zt,(l.isMeshStandardMaterial||l.isMeshPhongMaterial||l.isMeshBasicMaterial)&&(l.fog=!0),l.needsUpdate=!0})}});for(let s=0;s<this.sharks.length;s++){const o=this.sharks[s],a=tR(r.scene);if(a.scale.set(o.scale,o.scale,o.scale),a.position.copy(o.spawnPosition),a.visible=this.visible,r.animations&&r.animations.length>0){const l=new fC(a),c=l.clipAction(r.animations[0]);c.play(),c.time=s*1.35,o.mixer=l}o.model=a,this.scene.add(a)}this.isLoaded=!0}catch(e){console.error("SharkRenderer: Failed to load shark model:",e)}}setVisibility(e){this.visible=e;for(let t=0;t<this.sharks.length;t++){const i=this.sharks[t].model;i&&(i.visible=e)}}setPosition(e){for(let t=0;t<this.sharks.length;t++)this.setSharkTarget(t,e)}setSharkTarget(e,t){if(e<0||e>=this.sharks.length)return;const i=this.sharks[e];i.targetPosition.copy(t).add(i.patrolOffset),i.hasBeenPositioned||(i.hasBeenPositioned=!0,i.model&&i.model.position.copy(i.spawnPosition))}getSharkPosition(e){if(e<0||e>=this.sharks.length)return this.getPosition();const t=this.sharks[e];return t.model?t.model.position:t.spawnPosition}getPosition(){const e=this.sharks[0].model;return e?e.position:this.sharks[0].spawnPosition}getPositions(){if(!this.isLoaded||!this.visible)return[];const e=[];for(let t=0;t<this.sharks.length;t++){const i=this.sharks[t].model;i&&e.push(i.position)}return e}update(e){if(!this.isLoaded||!this.visible)return;const t=20*(Math.PI/180);for(let i=0;i<this.sharks.length;i++){const r=this.sharks[i];if(!r.model)continue;r.mixer&&r.mixer.update(e);const s=r.targetPosition.clone().sub(r.model.position),o=Math.sqrt(s.x*s.x+s.z*s.z);if(o>.001){const f=o*Math.tan(t);s.y=Math.max(-f,Math.min(f,s.y))}else s.y=0,s.x=r.heading.x,s.z=r.heading.z;if(s.length()>2){const f=s.clone().normalize(),m=r.maxTurnRate*e,g=Math.max(-1,Math.min(1,r.heading.dot(f))),_=Math.acos(g);if(_>.001){const p=Math.min(1,m/_);r.heading.lerp(f,p).normalize()}}const l=Math.sqrt(r.heading.x*r.heading.x+r.heading.z*r.heading.z);if(l<1e-4)r.heading.set(0,0,1);else{const f=Math.asin(Math.max(-1,Math.min(1,r.heading.y)));if(Math.abs(f)>t){const m=Math.max(-t,Math.min(t,f)),g=Math.cos(m),_=Math.sin(m),p=r.heading.x/l,d=r.heading.z/l;r.heading.set(p*g,_,d*g)}}const c=r.heading.clone().multiplyScalar(r.swimSpeed*e);r.model.position.add(c);const u=r.model.position.clone().add(r.heading),h=new Be;h.lookAt(r.model.position,u,new P(0,1,0)),r.model.quaternion.setFromRotationMatrix(h),r.model.rotateY(Math.PI)}for(let i=0;i<this.sharks.length;i++)for(let r=i+1;r<this.sharks.length;r++){const s=this.sharks[i].model,o=this.sharks[r].model;if(!s||!o)continue;const a=s.position.clone().sub(o.position),l=a.length(),c=24;if(l<c&&l>.001){const u=a.normalize().multiplyScalar((c-l)*.4);u.y*=.2,s.position.add(u),o.position.sub(u)}}}dispose(){for(let e=0;e<this.sharks.length;e++){const t=this.sharks[e].model;t&&(this.scene.remove(t),t.traverse(i=>{i instanceof ht&&(i.geometry.dispose(),(Array.isArray(i.material)?i.material:[i.material]).forEach(s=>s.dispose()))}))}}updateEmissive(e){for(let t=0;t<this.sharks.length;t++){const i=this.sharks[t].model;i&&i.traverse(r=>{if(r.isMesh){const s=r;(Array.isArray(s.material)?s.material:[s.material]).forEach(a=>{(a.isMeshStandardMaterial||a.isMeshPhongMaterial)&&(a.emissiveIntensity=e)})}})}}}class iR{scene;camera;renderer;controls;gpuFlockManager=null;flockManager=null;fishRenderer=null;sharkRenderer=null;underwaterEnvironment=null;seaFloorModel=null;swimmableAreaGroup=null;isPaused=!1;lastTime=0;currentCameraMode="action";smoothCameraPos=new P(35,22,55);smoothCameraTarget=new P(0,20,0);smoothForward=new P(0,0,1);smoothRight=new P(1,0,0);targetCameraQuaternion=new _n;isCameraInitialized=!1;frameTimeHistory=[];lastSharkUpdateTime=0;raycaster=new pC;mouse=new Ce;unsubscribes=[];lastWhirlpoolTrigger=0;constructor(e){this.scene=new D_,this.camera=new sn(75,e.clientWidth/e.clientHeight,.1,2e3),this.camera.position.set(35,22,55),this.renderer=new N_({antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setSize(e.clientWidth,e.clientHeight);const t=nt.getState().parameters.rendering?.resolutionScale??1;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1)*t),this.renderer.shadowMap.enabled=!1,this.controls=new gC(this.camera,this.renderer.domElement),this.controls.target.set(0,20,0),this.controls.enableDamping=!0,this.controls.dampingFactor=.04,this.controls.rotateSpeed=.45,this.controls.zoomSpeed=.55,this.controls.panSpeed=.55,this.controls.maxDistance=200,this.controls.minDistance=5,this.controls.maxPolarAngle=Math.PI,this.controls.minPolarAngle=0,this.controls.enabled=!1,this.lastTime=performance.now(),e.appendChild(this.renderer.domElement),this.setupLighting(),this.setupEnvironment(),window.addEventListener("resize",this.handleResize.bind(this)),this.initializeFlockManager(),this.initializeFishRenderer(),this.sharkRenderer=new nR(this.scene),window.addEventListener("click",this.onClick.bind(this)),this.initializeSeaFloorModel(),this.subscribeToStoreChanges(),this.subscribeToSeaFloorChanges()}onClick(e){if(!this.flockManager&&!this.gpuFlockManager||!e.ctrlKey)return;this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const t=new Ti(new P(0,1,0),0),i=new P;if(this.raycaster.ray.intersectPlane(t,i),i){this.flockManager&&this.flockManager.triggerPredator(i),nt.setState({predatorVisible:!0,predatorPosition:{x:i.x,y:i.y,z:i.z}});const r=nt.getState().parameters.behavior.baitBallDuration*1e3;setTimeout(()=>{nt.setState({predatorVisible:!1})},r)}}setupLighting(){const e=new JA(666186,1);e.name="ambientLight",this.scene.add(e);const t=new qA(5227511,14729352,1.2);t.name="hemiLight",this.scene.add(t);const i=new ko(16777215,1.4);i.name="mainLight",i.position.set(50,200,50),i.castShadow=!1,this.scene.add(i);const r=new ko(8445674,.6);r.name="fillLight",r.position.set(-60,100,-60),this.scene.add(r);const s=new ko(14808574,.8);s.name="shineLight",s.position.set(120,20,0),this.scene.add(s);const o=new ko(16775388,.7);o.name="floorBounce",o.position.set(0,-60,0),o.target.position.set(0,50,0),this.scene.add(o),this.scene.add(o.target),console.log("Optimized directional & hemisphere lighting setup for maximum 60 FPS performance")}initializeFlockManager(){const e=new hi(new P(-250,-30,-250),new P(250,200,250)),t=nt.getState().parameters,i=t.rendering.fishCount;this.gpuFlockManager=new QC(this.renderer,this.scene,{bounds:e,maxFishCount:65536,initialCount:i}),this.swimmableAreaGroup=new Ri;const r=e.max.x-e.min.x,s=e.max.y-e.min.y,o=e.max.z-e.min.z,a=new uo(r,s,o),l=new P;e.getCenter(l);const c=new NA(a),u=new Mf({color:65535,opacity:.3,transparent:!0}),h=new k_(c,u);h.position.copy(l);const f=new Qi({color:65535,transparent:!0,opacity:.02,depthWrite:!1,side:Zt}),m=new ht(a,f);m.position.copy(l),this.swimmableAreaGroup.add(h),this.swimmableAreaGroup.add(m),this.swimmableAreaGroup.visible=t.walls.showSwimmableArea,this.scene.add(this.swimmableAreaGroup)}initializeFishRenderer(){}initializeUnderwaterEnvironment(){const e={rayCount:40,rayRadius:25,rayHeight:350,rayOpacity:.035};this.underwaterEnvironment=new JC(this.scene,e)}setupEnvironment(){const e=nt.getState().parameters.rendering,t=new xe(e.fogColor||529953);this.scene.background=t,this.scene.fog=new Ko(t,e.fogDensity||.012);const i=new rh(this.renderer);i.compileEquirectangularShader();const r=document.createElement("canvas");r.width=128,r.height=64;const s=r.getContext("2d");if(s){const a=s.createLinearGradient(0,0,0,64);a.addColorStop(0,"#ffffff"),a.addColorStop(.5,"#4facfe"),a.addColorStop(1,"#1a3d5c"),s.fillStyle=a,s.fillRect(0,0,128,64)}const o=new IA(r);o.mapping=uc,this.scene.environment=i.fromEquirectangular(o).texture,this.initializeUnderwaterEnvironment()}initializeSeaFloorModel(){const t=nt.getState().parameters.seaFloor,i={enabled:t.enabled,scale:t.scale,position:new P(t.positionX,t.positionY,t.positionZ),rotation:new to(t.rotationX,t.rotationY,t.rotationZ),receiveShadows:t.receiveShadows,castShadows:t.castShadows};this.seaFloorModel=new eR(this.scene,i),t.enabled&&this.seaFloorModel.loadModel().then(()=>{console.log("🌊 Sea floor model loaded and added to scene")}).catch(r=>{console.error("❌ Failed to load sea floor model:",r)})}handleResize(){const e=this.renderer.domElement.parentElement;if(!e)return;const t=e.clientWidth,i=e.clientHeight,r=nt.getState().parameters.rendering?.resolutionScale??1;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1)*r),this.camera.aspect=t/i,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,i)}elapsedTime=0;update(){if(this.isPaused)return;const e=performance.now(),t=Math.min((e-this.lastTime)/1e3,.05);this.lastTime=e,this.elapsedTime+=t;let i=[];if(this.sharkRenderer){const s=nt.getState(),o=s.sharkVisible||s.predatorVisible;if(this.sharkRenderer.setVisibility(o),s.sharkVisible&&!s.predatorVisible&&s.sharkPatrol){if(this.elapsedTime-this.lastSharkUpdateTime>.5){this.lastSharkUpdateTime=this.elapsedTime;for(let a=0;a<3;a++){const l=this.sharkRenderer.getSharkPosition(a);let c=null;if(this.gpuFlockManager?c=this.gpuFlockManager.getBestHuntTarget(l).target:this.flockManager&&(c=this.flockManager.getHuntTarget(l)),c){const u=Math.sin(this.elapsedTime*.6+a*2.1)*3.5,h=Math.cos(this.elapsedTime*.4+a*1.7)*1.8,f=c.clone().add(new P(u,h,0));this.sharkRenderer.setSharkTarget(a,f)}}}}else if(s.predatorVisible){const a=s.predatorPosition;this.sharkRenderer.setPosition(new P(a.x,a.y,a.z))}this.sharkRenderer.update(t),o&&(i=this.sharkRenderer.getPositions())}if(this.gpuFlockManager)this.gpuFlockManager.update(t,i);else if(this.flockManager){const s=i.length>0?i[0]:null;if(this.flockManager.update(t,s),this.fishRenderer){const o=this.flockManager.getFish();this.fishRenderer.updateFish(o)}}this.underwaterEnvironment&&this.underwaterEnvironment.update(t),this.updateSpecialCameras(t);const r=t*1e3;this.frameTimeHistory.push(r),this.frameTimeHistory.length>60&&this.frameTimeHistory.shift(),this.renderer.render(this.scene,this.camera)}updateParameters(e){this.gpuFlockManager&&this.gpuFlockManager.updateParameters(e),this.flockManager&&(e.behavior&&this.flockManager.updateBehavior(e.behavior),e.flock&&this.flockManager.updateConfig(e.flock)),this.fishRenderer&&e.rendering&&e.rendering.fishCount!==void 0&&this.flockManager?.setFishCount(e.rendering.fishCount)}setPaused(e){this.isPaused=e,this.flockManager&&this.flockManager.setPaused(e)}updateCamera(e){const{ui:t}=nt.getState(),i=t.selectedCameraPreset||"default";this.currentCameraMode=i,i==="default"?this.controls.enabled=!0:this.controls.enabled=!1,this.smoothCameraPos.copy(this.camera.position),this.smoothCameraTarget.copy(this.controls.target),this.targetCameraQuaternion.copy(this.camera.quaternion)}updateSpecialCameras(e){let t=new P(0,15,0),i=new P(0,0,1);if(this.gpuFlockManager)t=this.gpuFlockManager.getFlockCenter(),i=this.gpuFlockManager.getFlockVelocity();else if(this.flockManager){const g=this.flockManager.getFish();g.length>0&&(t=new P,i=new P,g.forEach(_=>{t.add(_.physics.position),i.add(_.physics.velocity)}),t.divideScalar(g.length),i.divideScalar(g.length))}const r=i.lengthSq()>.001?i.clone().normalize():new P(0,0,1),s=1-Math.exp(-1.2*e);this.smoothForward.lerp(r,s).normalize();const o=new P(0,1,0),a=new P().crossVectors(this.smoothForward,o).normalize();if(a.lengthSq()<.01&&a.set(1,0,0),this.smoothRight.lerp(a,s).normalize(),this.currentCameraMode==="default"){this.controls.enabled=!0;const g=t.clone().sub(this.controls.target),_=1-Math.exp(-.8*e),p=g.multiplyScalar(_);this.controls.target.add(p),this.camera.position.add(p),this.controls.update();return}this.controls.enabled=!1;let l=new P,c=new P;if(this.currentCameraMode==="follow"){const g=Math.sin(this.elapsedTime*.08)*1.5;l=t.clone().sub(this.smoothForward.clone().multiplyScalar(75)).add(this.smoothRight.clone().multiplyScalar(g)).add(new P(0,28,0)),c=t.clone().add(this.smoothForward.clone().multiplyScalar(12))}else if(this.currentCameraMode==="action"){const g=Math.sin(this.elapsedTime*.1)*2,_=Math.sin(this.elapsedTime*.14)*1;l=t.clone().add(this.smoothForward.clone().multiplyScalar(50)).add(this.smoothRight.clone().multiplyScalar(34+g)).add(new P(0,20+_,0)),c=t.clone().add(this.smoothForward.clone().multiplyScalar(6))}else if(this.currentCameraMode==="dolly-cam"){const g=Math.sin(this.elapsedTime*.12)*1;l=t.clone().add(this.smoothRight.clone().multiplyScalar(68)).add(new P(0,16+g,0)),c=t.clone()}else if(this.currentCameraMode==="single-fish"){const g=Math.sin(this.elapsedTime*.5)*.2;l=t.clone().sub(this.smoothForward.clone().multiplyScalar(14)).add(this.smoothRight.clone().multiplyScalar(6)).add(new P(0,3.8+g,0)),c=t.clone().add(this.smoothForward.clone().multiplyScalar(5))}else this.currentCameraMode==="close"?(l=t.clone().sub(this.smoothForward.clone().multiplyScalar(8)).add(this.smoothRight.clone().multiplyScalar(4)).add(new P(0,2.2,0)),c=t.clone().add(this.smoothForward.clone().multiplyScalar(3))):(l=t.clone().add(new P(80,35,75)),c=t.clone());if(!this.isCameraInitialized){this.smoothCameraPos.copy(l),this.smoothCameraTarget.copy(c),this.camera.position.copy(l),this.controls.target.copy(c),this.camera.lookAt(c),this.targetCameraQuaternion.copy(this.camera.quaternion),this.isCameraInitialized=!0;return}const u=1-Math.exp(-1.2*e);this.smoothCameraPos.lerp(l,u),this.camera.position.copy(this.smoothCameraPos);const h=1-Math.exp(-1.5*e);this.smoothCameraTarget.lerp(c,h),this.controls.target.copy(this.smoothCameraTarget);const f=new Be;f.lookAt(this.camera.position,this.smoothCameraTarget,o),this.targetCameraQuaternion.setFromRotationMatrix(f);const m=1-Math.exp(-1.8*e);this.camera.quaternion.slerp(this.targetCameraQuaternion,m)}getStats(){const e=this.frameTimeHistory.reduce((s,o)=>s+o,0)/this.frameTimeHistory.length,t=e>0?1e3/e:0;if(this.gpuFlockManager){const s=this.gpuFlockManager.getStats();return{fps:Math.round(t),memory:Math.round(performance.memory?.usedJSHeapSize/1024/1024||0),fishCount:s.fishCount,averageSpeed:s.averageSpeed,visibleFish:s.visibleFish,cullingEnabled:!1,averageSize:s.averageSize,sizeRange:s.sizeRange}}const i=this.flockManager?.getStats(),r=this.fishRenderer?.getPerformanceStats();return{fps:Math.round(t),memory:Math.round(performance.memory?.usedJSHeapSize/1024/1024||0),fishCount:i?.activeFish||0,averageSpeed:i?.averageSpeed||0,visibleFish:r?.visibleFishCount||0,cullingEnabled:!0,averageSize:i?.averageSize||1,sizeRange:i?.sizeRange||{min:1,max:1}}}getFlockManager(){return this.flockManager}subscribeToStoreChanges(){let e=nt.getState().parameters,t=nt.getState().whirlpoolTrigger;const i=nt.subscribe(r=>{if(!(r.parameters===e&&r.whirlpoolTrigger===t)){if(e=r.parameters,t=r.whirlpoolTrigger,this.gpuFlockManager&&(this.gpuFlockManager.updateParameters(r.parameters),r.whirlpoolTrigger&&r.whirlpoolTrigger!==this.lastWhirlpoolTrigger&&(this.lastWhirlpoolTrigger=r.whirlpoolTrigger,this.gpuFlockManager.triggerWhirlpool())),this.sharkRenderer&&r.parameters.behavior.sharkScale!==void 0&&this.sharkRenderer.setScale(r.parameters.behavior.sharkScale),this.flockManager){const s={...r.parameters.behavior};this.flockManager.updateBehavior(s),r.parameters.rendering.fishCount!==void 0&&this.flockManager.setFishCount(r.parameters.rendering.fishCount)}if(this.fishRenderer&&r.parameters.rendering){const s=r.parameters.rendering;if(this.fishRenderer.updateMaterial({metalness:s.metalness,roughness:s.roughness,envMapIntensity:s.envMapIntensity,emissiveIntensity:s.emissiveIntensity}),s.lightingIntensity!==void 0){const o=this.scene.getObjectByName("mainLight");o&&(o.intensity=s.lightingIntensity*1.2);const a=this.scene.getObjectByName("fillLight");a&&(a.intensity=s.lightingIntensity*.5)}if(s.fogColor!==void 0||s.fogDensity!==void 0){const o=new xe(s.fogColor);this.scene.background=o,this.scene.fog instanceof Ko&&(this.scene.fog.color=o,this.scene.fog.density=s.fogDensity)}if(s.blueFilterIntensity!==void 0){const o=this.scene.getObjectByName("ambientLight"),a=this.scene.getObjectByName("mainLight");if(o){o.intensity=.5+s.blueFilterIntensity*.8/1;const c=new xe(666186),u=new xe(133136);o.color.copy(c).lerp(u,Math.min(s.blueFilterIntensity,1))}if(a&&(a.intensity=Math.max(.1,1.5-s.blueFilterIntensity*1)),this.scene.fog instanceof Ko){const c=new xe(s.fogColor),u=new xe(66568);this.scene.fog.color.copy(c).lerp(u,Math.min(s.blueFilterIntensity*.7,1)),this.scene.background=this.scene.fog.color.clone(),this.scene.fog.density=s.fogDensity*(1+s.blueFilterIntensity*.5)}const l=Math.max(.05,1-s.blueFilterIntensity*.7);this.fishRenderer&&this.fishRenderer.updateMaterial({metalness:s.metalness,roughness:s.roughness,envMapIntensity:s.envMapIntensity,emissiveIntensity:s.emissiveIntensity*l}),this.sharkRenderer&&this.sharkRenderer.updateEmissive(l*.5)}s.selectedSpecies!==void 0&&this._currentSpecies!==s.selectedSpecies&&(this._currentSpecies=s.selectedSpecies,this.fishRenderer&&this.fishRenderer.switchSpecies(s.selectedSpecies)),s.resolutionScale!==void 0&&this._lastResolutionScale!==s.resolutionScale&&(this._lastResolutionScale=s.resolutionScale,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1)*s.resolutionScale))}if(this.underwaterEnvironment&&r.parameters.rendering){const s=r.parameters.rendering;s.particleCount!==void 0&&this._lastParticleCount!==s.particleCount?(this._lastParticleCount=s.particleCount,this.underwaterEnvironment.updateParticleCount(s.particleCount,s.particleOpacity)):s.particleOpacity!==void 0&&this.underwaterEnvironment.updateParticleOpacity(s.particleOpacity)}if(this.sharkRenderer){const s=r.sharkVisible||r.predatorVisible;if(this.sharkRenderer.setVisibility(s),r.parameters.behavior.sharkScale&&this.sharkRenderer.setScale(r.parameters.behavior.sharkScale),r.predatorVisible){const o=r.predatorPosition;this.sharkRenderer.setPosition(new P(o.x,o.y,o.z))}}this.swimmableAreaGroup&&r.parameters.walls.showSwimmableArea!==void 0&&(this.swimmableAreaGroup.visible=r.parameters.walls.showSwimmableArea)}});this.unsubscribes.push(i)}subscribeToSeaFloorChanges(){const e=nt.subscribe(t=>{if(this.seaFloorModel&&t.parameters.seaFloor){const i=t.parameters.seaFloor,r={enabled:i.enabled,scale:i.scale,position:new P(i.positionX,i.positionY,i.positionZ),rotation:new to(i.rotationX,i.rotationY,i.rotationZ),receiveShadows:i.receiveShadows,castShadows:i.castShadows};this.seaFloorModel.updateConfig(r),i.enabled&&!this.seaFloorModel.getModel()?this.seaFloorModel.loadModel():!i.enabled&&this.seaFloorModel.getModel()&&this.seaFloorModel.dispose()}});this.unsubscribes.push(e)}dispose(){console.log("SardinesScene: Disposing resources..."),this.unsubscribes.forEach(e=>e()),this.unsubscribes=[],this.gpuFlockManager&&(this.gpuFlockManager.dispose(),this.gpuFlockManager=null),this.flockManager&&(this.flockManager.dispose(),this.flockManager=null),this.fishRenderer&&(this.fishRenderer.dispose(),this.fishRenderer=null),this.sharkRenderer&&(this.sharkRenderer.dispose(),this.sharkRenderer=null),this.underwaterEnvironment&&(this.underwaterEnvironment.dispose(),this.underwaterEnvironment=null),this.seaFloorModel&&(this.seaFloorModel.dispose(),this.seaFloorModel=null),this.scene.traverse(e=>{e instanceof ht&&(e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose()))}),this.controls&&this.controls.dispose(),this.renderer&&(this.renderer.dispose(),this.renderer.domElement&&this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)),this.isPaused=!0}}const rR=()=>{const n=St.useRef(null),e=St.useRef(null),t=nt(s=>s.performance.isPaused),i=nt(s=>s.camera),r=nt(s=>s.actions);return St.useEffect(()=>{if(!n.current)return;e.current=new iR(n.current);let s,o=0;const a=l=>{if(e.current&&(e.current.update(),l-o>500)){o=l;const c=e.current.getStats();r.updatePerformance({fps:c.fps,memoryUsage:c.memory,fishCount:c.fishCount,averageSpeed:c.averageSpeed,visibleFish:c.visibleFish,cullingEnabled:c.cullingEnabled})}s=requestAnimationFrame(a)};return s=requestAnimationFrame(a),()=>{s&&cancelAnimationFrame(s),e.current&&e.current.dispose()}},[r]),St.useEffect(()=>{e.current&&e.current.setPaused(t)},[t]),St.useEffect(()=>{e.current&&e.current.updateCamera(i)},[i]),A.jsx("div",{ref:n,className:"w-full h-full bg-water-deep",style:{background:"linear-gradient(to bottom, var(--water-surface), var(--water-deep))"}})},Ye=({label:n,value:e,min:t,max:i,step:r=.1,precision:s=2,unit:o="",onChange:a})=>{const l=Math.max(0,Math.min(100,(e-t)/(i-t)*100));return A.jsxs("div",{className:"group py-1 select-none",children:[A.jsxs("div",{className:"flex items-center justify-between mb-1.5",children:[A.jsx("label",{className:"text-[13px] font-medium text-slate-200 group-hover:text-white transition-colors",children:n}),A.jsxs("span",{className:"font-mono text-xs font-semibold text-[#38bdf8] bg-sky-500/15 px-2 py-0.5 rounded-md border border-sky-400/25 shadow-sm",children:[e.toFixed(s),o]})]}),A.jsxs("div",{className:"relative flex items-center h-4",children:[A.jsx("div",{className:"absolute left-0 right-0 h-2 bg-white/10 rounded-full overflow-hidden",children:A.jsx("div",{className:"h-full bg-gradient-to-r from-[#2fa1d6] to-[#38bdf8] rounded-full transition-all duration-75",style:{width:`${l}%`}})}),A.jsx("input",{type:"range",min:t,max:i,step:r,value:e,onChange:c=>a(parseFloat(c.target.value)),className:"relative w-full h-4 opacity-0 cursor-ew-resize z-10"}),A.jsx("div",{className:"absolute w-3.5 h-3.5 rounded-full bg-white shadow-md pointer-events-none transform -translate-x-1/2 transition-transform group-hover:scale-125 border border-sky-400/40",style:{left:`${l}%`}})]})]})},El=({label:n,checked:e,onChange:t,description:i})=>A.jsxs("div",{onClick:()=>t(!e),className:"flex items-center justify-between py-2 px-1 cursor-pointer group select-none hover:bg-white/5 rounded-lg transition-colors",children:[A.jsxs("div",{children:[A.jsx("div",{className:"text-[13px] font-medium text-slate-200 group-hover:text-white transition-colors",children:n}),i&&A.jsx("div",{className:"text-[11px] text-slate-400 mt-0.5",children:i})]}),A.jsx("div",{className:`relative w-10 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${e?"bg-[#2fa1d6]":"bg-white/20"}`,children:A.jsx("div",{className:`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${e?"translate-x-5":"translate-x-0"}`})})]}),zg=[{id:"boids",label:"School & Boids",icon:"🐟",subtabs:[{id:"forces",label:"Forces"},{id:"cyclone",label:"Whirlpool"},{id:"perception",label:"Perception"},{id:"elasticity",label:"Elasticity"},{id:"presets",label:"Presets"}]},{id:"shark",label:"Predator & Shark",icon:"🦈",subtabs:[{id:"patrol",label:"Patrol"},{id:"panic",label:"Evasion"}]},{id:"fish",label:"Fish & Population",icon:"🐠",subtabs:[{id:"population",label:"Population"},{id:"material",label:"Material"},{id:"swimming",label:"Locomotion"}]},{id:"ocean",label:"Ocean & World",icon:"🌊",subtabs:[{id:"water",label:"Atmosphere"},{id:"seabed",label:"Seabed"}]},{id:"camera",label:"Camera & System",icon:"🎬",subtabs:[{id:"views",label:"Views"},{id:"system",label:"System"}]}],sR=()=>{const{ui:n,parameters:e,actions:t,sharkVisible:i,sharkPatrol:r}=nt(),[s,o]=St.useState("boids"),[a,l]=St.useState(null),[c,u]=St.useState({boids:"forces",shark:"patrol",fish:"population",ocean:"water",camera:"views"}),h=async d=>{try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(d),!0}catch{}const v=document.createElement("textarea");v.value=d,v.style.position="fixed",v.style.left="-999999px",v.style.top="-999999px",document.body.appendChild(v),v.focus(),v.select();try{return document.execCommand("copy"),v.remove(),!0}catch{return v.remove(),!1}},f=async d=>{let v="";d==="json"?v=JSON.stringify(e,null,2):d==="behavior"?v=`// Sardines Simulation - Behavior Parameters
export const customBehavior = ${JSON.stringify(e.behavior,null,2)};`:v=`// Sardines GPU Flocking Simulation - Parameters Export
// Generated: ${new Date().toISOString()}

export const defaultBehavior = {
  cohesionStrength: ${e.behavior.cohesionStrength},
  separationStrength: ${e.behavior.separationStrength},
  alignmentStrength: ${e.behavior.alignmentStrength},
  neighborRadius: ${e.behavior.neighborRadius},
  separationRadius: ${e.behavior.separationRadius},
  collisionRadius: ${e.behavior.collisionRadius},
  socialWeight: ${e.behavior.socialWeight},
  individualWeight: ${e.behavior.individualWeight},
  maxTurnRate: ${e.behavior.maxTurnRate},
  accelerationRate: ${e.behavior.accelerationRate},
  directionChangeInterval: ${e.behavior.directionChangeInterval},
  turnSmoothness: ${e.behavior.turnSmoothness},
  waveDelayFactor: ${e.behavior.waveDelayFactor},
  clusterBias: ${e.behavior.clusterBias},
  edgeSpeedMultiplier: ${e.behavior.edgeSpeedMultiplier},
  burstMultiplier: ${e.behavior.burstMultiplier},
  compressionStrength: ${e.behavior.compressionStrength},
  baitBallDuration: ${e.behavior.baitBallDuration},
  recoveryDuration: ${e.behavior.recoveryDuration},
  seabedAvoidanceStrength: ${e.behavior.seabedAvoidanceStrength},
  obstacleLookAheadDistance: ${e.behavior.obstacleLookAheadDistance},
  preferredDepthBand: ${e.behavior.preferredDepthBand},
  undulationFrequency: ${e.behavior.undulationFrequency},
  undulationAmplitude: ${e.behavior.undulationAmplitude}
};

export const defaultPhysics = {
  maxSpeed: ${e.physics.maxSpeed},
  maxForce: ${e.physics.maxForce},
  maxAcceleration: ${e.physics.maxAcceleration}
};

export const defaultRendering = {
  fishCount: ${e.rendering.fishCount},
  modelScale: ${e.rendering.modelScale},
  lightingIntensity: ${e.rendering.lightingIntensity},
  metalness: ${e.rendering.metalness},
  roughness: ${e.rendering.roughness},
  envMapIntensity: ${e.rendering.envMapIntensity},
  emissiveIntensity: ${e.rendering.emissiveIntensity},
  fogDensity: ${e.rendering.fogDensity},
  fogColor: '${e.rendering.fogColor}',
  particleCount: ${e.rendering.particleCount},
  particleOpacity: ${e.rendering.particleOpacity},
  blueFilterIntensity: ${e.rendering.blueFilterIntensity},
  selectedSpecies: '${e.rendering.selectedSpecies}'
};
`,await h(v)&&(l(d),setTimeout(()=>l(null),2500))};if(!n.sidebarVisible)return null;const m=d=>{o(s===d?null:d)},g=(d,v)=>{u(x=>({...x,[d]:v}))},_=zg.find(d=>d.id===s),p=s?c[s]:"";return A.jsxs("div",{className:"fixed inset-0 pointer-events-none z-[10000]",children:[_&&A.jsxs("div",{id:"sidebar-flyout-subpanel",className:"pointer-events-auto fixed right-[228px] md:right-[244px] top-4 bottom-4 w-[340px] md:w-[380px] bg-[#081524]/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-6 duration-200",children:[A.jsxs("div",{className:"flex items-center justify-between px-4 py-3.5 border-b border-white/10 bg-white/[0.02]",children:[A.jsxs("div",{className:"flex items-center gap-2.5",children:[A.jsx("span",{className:"text-xl",children:_.icon}),A.jsxs("div",{children:[A.jsx("h3",{className:"text-sm font-bold text-white tracking-wide",children:_.label}),A.jsxs("span",{className:"text-[11px] text-slate-400 font-medium",children:["Configuring ",_.subtabs.find(d=>d.id===p)?.label]})]})]}),A.jsx("button",{type:"button",onClick:()=>o(null),className:"w-7 h-7 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors",title:"Close sub-panel",children:"✕"})]}),A.jsx("div",{className:"flex items-center gap-1.5 p-2 bg-black/20 border-b border-white/10 overflow-x-auto no-scrollbar",children:_.subtabs.map(d=>{const v=p===d.id;return A.jsx("button",{type:"button",onClick:()=>g(_.id,d.id),className:`flex-1 min-w-[70px] py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap text-center ${v?"bg-[#2fa1d6] text-white shadow-md shadow-[#2fa1d6]/30":"bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"}`,children:d.label},d.id)})}),A.jsxs("div",{className:"flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4",children:[s==="boids"&&A.jsxs(A.Fragment,{children:[p==="forces"&&A.jsxs("div",{className:"space-y-3",children:[A.jsx("div",{className:"text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Reynolds Steering Forces"}),A.jsx(Ye,{label:"Cohesion (Bait Ball Pull)",value:e.behavior.cohesionStrength,min:0,max:5,step:.1,onChange:d=>t.updateParameter("behavior","cohesionStrength",d)}),A.jsx(Ye,{label:"Alignment (Velocity Sync)",value:e.behavior.alignmentStrength,min:0,max:5,step:.1,onChange:d=>t.updateParameter("behavior","alignmentStrength",d)}),A.jsx(Ye,{label:"Separation (Collision Avoid)",value:e.behavior.separationStrength,min:0,max:5,step:.1,onChange:d=>t.updateParameter("behavior","separationStrength",d)}),A.jsxs("div",{className:"pt-2 border-t border-white/10",children:[A.jsx("div",{className:"text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2",children:"Social Weighting"}),A.jsx(Ye,{label:"Social Influence Weight",value:e.behavior.socialWeight,min:0,max:1,step:.05,onChange:d=>t.updateParameter("behavior","socialWeight",d)}),A.jsx(Ye,{label:"Individual Wander Weight",value:e.behavior.individualWeight,min:0,max:1,step:.05,onChange:d=>t.updateParameter("behavior","individualWeight",d)})]}),A.jsx("div",{className:"pt-2 border-t border-white/10",children:A.jsxs("button",{type:"button",onClick:()=>t.triggerWhirlpool(),className:"w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600/40 via-sky-500/40 to-blue-600/40 hover:from-cyan-500/60 hover:to-blue-500/60 border border-cyan-400/40 text-cyan-200 hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-900/30 cursor-pointer active:scale-95",children:[A.jsx("span",{className:"text-base animate-spin",style:{animationDuration:"4s"},children:"🌀"}),A.jsx("span",{children:"Trigger Oceanic Whirlpool"})]})})]}),p==="cyclone"&&A.jsxs("div",{className:"space-y-4",children:[A.jsx("div",{className:"text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Oceanic Whirlpool & Cyclone Vortex"}),A.jsxs("div",{className:"bg-gradient-to-br from-cyan-950/40 to-blue-950/40 p-3.5 rounded-xl border border-cyan-500/30 space-y-3",children:[A.jsxs("div",{className:"flex items-center gap-2 text-cyan-300 font-semibold text-xs",children:[A.jsx("span",{className:"text-lg",children:"🌀"}),A.jsx("span",{children:"Bait-Ball Cyclone Simulator"})]}),A.jsx("p",{className:"text-[11px] text-slate-300 leading-relaxed",children:"Sardines naturally congregate into dynamic rotating cyclones every ~18s to confuse predators, spiraling in a 3D helical vortex."}),A.jsxs("button",{type:"button",onClick:()=>t.triggerWhirlpool(),className:"w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/30 cursor-pointer active:scale-95",children:[A.jsx("span",{className:"text-base",children:"🌀"}),A.jsx("span",{children:"Engage Whirlpool Cyclone Now"})]})]}),A.jsxs("div",{className:"space-y-3",children:[A.jsx(Ye,{label:"Vortex Rotational Strength",value:e.behavior.whirlpoolStrength??1.8,min:.5,max:4,step:.1,onChange:d=>t.updateParameter("behavior","whirlpoolStrength",d)}),A.jsx(Ye,{label:"Vortex Suction Radius",value:e.behavior.whirlpoolRadius??110,min:40,max:200,step:5,unit:"u",onChange:d=>t.updateParameter("behavior","whirlpoolRadius",d)})]})]}),p==="perception"&&A.jsxs("div",{className:"space-y-3",children:[A.jsx("div",{className:"text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Sensory Awareness Radii"}),A.jsx(Ye,{label:"Neighbor Perception Reach",value:e.behavior.neighborRadius,min:10,max:150,step:1,unit:"u",onChange:d=>t.updateParameter("behavior","neighborRadius",d)}),A.jsx(Ye,{label:"Personal Separation Bubble",value:e.behavior.separationRadius,min:2,max:30,step:.5,unit:"u",onChange:d=>t.updateParameter("behavior","separationRadius",d)}),A.jsx(Ye,{label:"Direct Collision Boundary",value:e.behavior.collisionRadius,min:1,max:20,step:.5,unit:"u",onChange:d=>t.updateParameter("behavior","collisionRadius",d)})]}),p==="elasticity"&&A.jsxs("div",{className:"space-y-3",children:[A.jsx("div",{className:"text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"School Hydrodynamics & Wave"}),A.jsx(Ye,{label:"Wave Delay Factor",value:e.behavior.waveDelayFactor,min:0,max:1,step:.05,onChange:d=>t.updateParameter("behavior","waveDelayFactor",d)}),A.jsx(Ye,{label:"Cluster Core Bias",value:e.behavior.clusterBias,min:0,max:1,step:.05,onChange:d=>t.updateParameter("behavior","clusterBias",d)}),A.jsx(Ye,{label:"Edge Fish Speed Multiplier",value:e.behavior.edgeSpeedMultiplier,min:1,max:3,step:.1,onChange:d=>t.updateParameter("behavior","edgeSpeedMultiplier",d)})]}),p==="presets"&&A.jsxs("div",{className:"space-y-3",children:[A.jsx("div",{className:"text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Curated Schooling Formations"}),A.jsx("div",{className:"grid grid-cols-2 gap-2",children:[{id:"calm",name:"Calm Flow",desc:"Relaxed gliding"},{id:"tight",name:"Tight Bait Ball",desc:"Dense defensive sphere"},{id:"aggressive",name:"Aggressive",desc:"Fast darting turns"},{id:"gentle",name:"Gentle Drift",desc:"Smooth lazy drift"},{id:"scattered",name:"Scattered",desc:"Loose open foraging"},{id:"chaotic",name:"Chaotic Swarm",desc:"Frenetic schooling"},{id:"organized",name:"Organized Wave",desc:"Parallel undulation"},{id:"minimal",name:"Minimalist",desc:"Clean quiet school"}].map(d=>{const v=n.selectedBehaviorPreset===d.id;return A.jsxs("button",{type:"button",onClick:()=>t.loadPreset(d.id),className:`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${v?"bg-[#2fa1d6]/20 border-[#2fa1d6] text-white shadow-lg shadow-[#2fa1d6]/20":"bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white"}`,children:[A.jsx("div",{className:"text-xs font-bold",children:d.name}),A.jsx("div",{className:"text-[10px] text-slate-400 mt-0.5",children:d.desc})]},d.id)})})]})]}),s==="shark"&&A.jsxs(A.Fragment,{children:[p==="patrol"&&A.jsxs("div",{className:"space-y-4",children:[A.jsx("div",{className:"text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Predator State & Patrol"}),A.jsxs("div",{className:"bg-white/5 p-3 rounded-xl border border-white/10 space-y-2",children:[A.jsx(El,{label:"3-Shark Pack Active",description:"Apex leader and two flanker Great Whites swimming in pack formation",checked:i,onChange:d=>t.setSharkVisible(d)}),A.jsx("div",{className:"border-t border-white/10 pt-2",children:A.jsx(El,{label:"Autonomous Hunting Patrol",description:"Sharks autonomously stalk and coordinate hunting on the bait ball",checked:r,onChange:d=>t.setSharkPatrol(d)})})]}),A.jsx("div",{className:"space-y-3",children:A.jsx(Ye,{label:"Shark Pack Scale",value:e.behavior.sharkScale??8.5,min:3,max:25,step:.5,unit:"u",onChange:d=>t.updateParameter("behavior","sharkScale",d)})}),A.jsxs("div",{className:"p-3 bg-sky-500/10 border border-sky-400/20 rounded-xl text-xs text-sky-200",children:["💡 ",A.jsx("strong",{children:"Tip:"})," You can hold ",A.jsx("kbd",{className:"px-1.5 py-0.5 bg-black/40 rounded border border-white/20 font-mono text-[11px]",children:"Ctrl"})," and click anywhere in the water to send the shark pack attacking that location!"]})]}),p==="panic"&&A.jsxs("div",{className:"space-y-3",children:[A.jsx("div",{className:"text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Evasion & Scatter Dynamics"}),A.jsx(Ye,{label:"Burst Evasion Speed",value:e.behavior.burstMultiplier,min:1,max:5,step:.1,unit:"x",onChange:d=>t.updateParameter("behavior","burstMultiplier",d)}),A.jsx(Ye,{label:"Bait Ball Compression Strength",value:e.behavior.compressionStrength,min:0,max:10,step:.5,onChange:d=>t.updateParameter("behavior","compressionStrength",d)}),A.jsx(Ye,{label:"Panic Duration (ms)",value:e.behavior.baitBallDuration,min:1e3,max:8e3,step:250,precision:0,unit:"ms",onChange:d=>t.updateParameter("behavior","baitBallDuration",d)}),A.jsx(Ye,{label:"Recovery Regroup Time (ms)",value:e.behavior.recoveryDuration,min:2e3,max:12e3,step:500,precision:0,unit:"ms",onChange:d=>t.updateParameter("behavior","recoveryDuration",d)})]})]}),s==="fish"&&A.jsxs(A.Fragment,{children:[p==="population"&&A.jsxs("div",{className:"space-y-4",children:[A.jsx("div",{className:"text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Population & Mesh Sizing"}),A.jsx(Ye,{label:"Fish Count",value:e.rendering.fishCount,min:500,max:5e4,step:100,precision:0,onChange:d=>t.updateParameter("rendering","fishCount",d)}),A.jsx("div",{className:"flex gap-1.5 pt-1",children:[1e3,5e3,1e4,25e3,5e4].map(d=>A.jsx("button",{type:"button",onClick:()=>t.updateParameter("rendering","fishCount",d),className:`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${e.rendering.fishCount===d?"bg-[#2fa1d6] text-white shadow-md shadow-[#2fa1d6]/30":"bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white"}`,children:d>=1e3?`${d/1e3}k`:d},d))}),A.jsxs("div",{className:"pt-2 border-t border-white/10 space-y-1.5",children:[A.jsxs("div",{className:"flex items-center justify-between",children:[A.jsx("label",{className:"text-xs font-medium text-slate-300",children:"Render Resolution Scale"}),A.jsxs("span",{className:"text-[11px] font-mono text-[#2fa1d6] font-bold",children:[((e.rendering.resolutionScale??1)*100).toFixed(0),"%"]})]}),A.jsx("div",{className:"flex gap-1.5",children:[{label:"0.85x Ultra",value:.85},{label:"1.0x 60FPS",value:1},{label:"1.25x Crisp",value:1.25}].map(d=>A.jsx("button",{type:"button",onClick:()=>t.updateParameter("rendering","resolutionScale",d.value),className:`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${(e.rendering.resolutionScale??1)===d.value?"bg-[#2fa1d6] text-white shadow-md shadow-[#2fa1d6]/30":"bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white"}`,children:d.label},d.value))})]}),A.jsx(Ye,{label:"Fish Model Scale",value:e.rendering.modelScale,min:.5,max:6,step:.1,onChange:d=>t.updateParameter("rendering","modelScale",d)}),A.jsxs("div",{className:"pt-2 border-t border-white/10",children:[A.jsx("label",{className:"block text-xs font-medium text-slate-300 mb-1.5",children:"Selected Species"}),A.jsxs("select",{className:"w-full bg-black/40 text-slate-200 border border-white/20 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#2fa1d6] transition-colors cursor-pointer",value:e.rendering.selectedSpecies,onChange:d=>t.updateParameter("rendering","selectedSpecies",d.target.value),children:[A.jsx("option",{value:"sardine",children:"Pacific Sardine (High Detail)"}),A.jsx("option",{value:"tropical",children:"Tropical Reef Fish (Animated)"}),A.jsx("option",{value:"school",children:"Oceanic Fish School"}),A.jsx("option",{value:"mixed",children:"Mixed Species Combination"})]})]})]}),p==="material"&&A.jsxs("div",{className:"space-y-3",children:[A.jsx("div",{className:"text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Scale Shimmer & Lighting Optics"}),A.jsx(Ye,{label:"Metallic Sheen",value:e.rendering.metalness,min:0,max:1,step:.05,onChange:d=>t.updateParameter("rendering","metalness",d)}),A.jsx(Ye,{label:"Scale Smoothness",value:1-e.rendering.roughness,min:0,max:1,step:.05,onChange:d=>t.updateParameter("rendering","roughness",1-d)}),A.jsx(Ye,{label:"Environment Reflection",value:e.rendering.envMapIntensity,min:0,max:5,step:.1,onChange:d=>t.updateParameter("rendering","envMapIntensity",d)}),A.jsx(Ye,{label:"Subsurface Glow / Emissive",value:e.rendering.emissiveIntensity,min:0,max:1,step:.05,onChange:d=>t.updateParameter("rendering","emissiveIntensity",d)})]}),p==="swimming"&&A.jsxs("div",{className:"space-y-3",children:[A.jsx("div",{className:"text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Locomotion & Spine Undulation"}),A.jsx(Ye,{label:"Max Swimming Speed",value:e.physics.maxSpeed,min:20,max:300,step:5,precision:0,onChange:d=>t.updateParameter("physics","maxSpeed",d)}),A.jsx(Ye,{label:"Acceleration Snappiness",value:e.behavior.accelerationRate,min:1,max:20,step:.5,onChange:d=>t.updateParameter("behavior","accelerationRate",d)}),A.jsx(Ye,{label:"Turn Rate Agility",value:e.behavior.maxTurnRate,min:.5,max:10,step:.2,onChange:d=>t.updateParameter("behavior","maxTurnRate",d)}),A.jsx(Ye,{label:"Spine Undulation Freq",value:e.behavior.undulationFrequency,min:1,max:10,step:.5,onChange:d=>t.updateParameter("behavior","undulationFrequency",d)}),A.jsx(Ye,{label:"Spine Undulation Amp",value:e.behavior.undulationAmplitude,min:.1,max:1,step:.05,onChange:d=>t.updateParameter("behavior","undulationAmplitude",d)})]})]}),s==="ocean"&&A.jsxs(A.Fragment,{children:[p==="water"&&A.jsxs("div",{className:"space-y-3",children:[A.jsx("div",{className:"text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Water Optics & Particulates"}),A.jsx(Ye,{label:"Deep Blue Oceanic Filter",value:e.rendering.blueFilterIntensity,min:0,max:2,step:.05,onChange:d=>t.updateParameter("rendering","blueFilterIntensity",d)}),A.jsx(Ye,{label:"Underwater Fog Density",value:e.rendering.fogDensity,min:0,max:.03,step:5e-4,precision:4,onChange:d=>t.updateParameter("rendering","fogDensity",d)}),A.jsx(Ye,{label:"Floating Marine Snow Count",value:e.rendering.particleCount,min:100,max:5e3,step:100,precision:0,onChange:d=>t.updateParameter("rendering","particleCount",d)}),A.jsx(Ye,{label:"Particle Opacity",value:e.rendering.particleOpacity,min:0,max:1,step:.05,onChange:d=>t.updateParameter("rendering","particleOpacity",d)}),A.jsx(Ye,{label:"Sunlight Illumination",value:e.rendering.lightingIntensity,min:0,max:5,step:.1,onChange:d=>t.updateParameter("rendering","lightingIntensity",d)})]}),p==="seabed"&&A.jsxs("div",{className:"space-y-4",children:[A.jsx("div",{className:"text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Seabed & Boundaries"}),A.jsxs("div",{className:"bg-white/5 p-3 rounded-xl border border-white/10 space-y-2",children:[A.jsx(El,{label:"Coral Sea Floor Model",description:"Realistic underwater coral terrain below",checked:e.seaFloor.enabled,onChange:()=>t.toggleSeaFloor()}),A.jsx("div",{className:"border-t border-white/10 pt-2",children:A.jsx(El,{label:"Swimmable Area Boundary Box",description:"Display bounding cage helper lines",checked:e.walls.showSwimmableArea,onChange:()=>t.updateWallParameter("showSwimmableArea",!e.walls.showSwimmableArea)})})]}),A.jsx(Ye,{label:"Seabed Avoidance Force",value:e.behavior.seabedAvoidanceStrength,min:0,max:5,step:.2,onChange:d=>t.updateParameter("behavior","seabedAvoidanceStrength",d)}),A.jsx(Ye,{label:"Obstacle Lookahead Distance",value:e.behavior.obstacleLookAheadDistance,min:5,max:50,step:1,unit:"u",onChange:d=>t.updateParameter("behavior","obstacleLookAheadDistance",d)})]})]}),s==="camera"&&A.jsxs(A.Fragment,{children:[p==="views"&&A.jsxs("div",{className:"space-y-3",children:[A.jsx("div",{className:"text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Cinematic Camera Presets"}),A.jsx("div",{className:"grid grid-cols-2 gap-2",children:[{id:"default",name:"Overview",desc:"Wide ocean angle"},{id:"single-fish",name:"Single Sardine",desc:"Intimate companion"},{id:"follow",name:"Follow School",desc:"Trailing bait ball"},{id:"action",name:"Action Cam",desc:"Dynamic chase view"},{id:"dolly-cam",name:"Dolly View",desc:"Smooth cinematic track"},{id:"close",name:"Macro View",desc:"High-detail close up"}].map(d=>{const v=n.selectedCameraPreset===d.id;return A.jsxs("button",{type:"button",onClick:()=>t.loadCameraPreset(d.id),className:`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${v?"bg-emerald-500/20 border-emerald-400 text-white shadow-lg shadow-emerald-500/20":"bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white"}`,children:[A.jsx("div",{className:"text-xs font-bold",children:d.name}),A.jsx("div",{className:"text-[10px] text-slate-400 mt-0.5",children:d.desc})]},d.id)})})]}),p==="system"&&A.jsxs("div",{className:"space-y-4",children:[A.jsx("div",{className:"text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Code Export & Utilities"}),A.jsxs("div",{className:"p-3.5 bg-gradient-to-br from-cyan-950/40 to-slate-900/60 border border-cyan-500/30 rounded-xl space-y-3",children:[A.jsxs("div",{className:"flex items-center justify-between",children:[A.jsxs("div",{className:"flex items-center gap-2",children:[A.jsx("span",{className:"text-base",children:"📋"}),A.jsx("span",{className:"font-semibold text-white text-xs",children:"Copy Parameters Code"})]}),A.jsx("span",{className:"text-[10px] font-mono text-cyan-300 bg-cyan-500/20 border border-cyan-400/30 px-1.5 py-0.5 rounded",children:"TS / JS"})]}),A.jsxs("p",{className:"text-[11px] text-slate-300 leading-relaxed",children:["Copy live parameters formatted as clean constants ready to paste into ",A.jsx("code",{className:"text-cyan-300 font-mono",children:"simulationStore.ts"}),"."]}),A.jsxs("div",{className:"space-y-2 pt-1",children:[A.jsxs("button",{id:"flyout-copy-full-btn",type:"button",onClick:()=>f("all"),className:`w-full py-2.5 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md ${a==="all"?"bg-emerald-500/30 border-emerald-400 text-emerald-200 shadow-emerald-500/30":"bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-400/40 text-cyan-200 hover:text-white shadow-cyan-500/10"}`,children:[A.jsx("span",{className:"text-sm",children:a==="all"?"✓":"📋"}),A.jsx("span",{children:a==="all"?"Copied Full Parameters!":"Copy Full Config (TS Constants)"})]}),A.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[A.jsxs("button",{type:"button",onClick:()=>f("behavior"),className:`py-1.5 px-2 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${a==="behavior"?"bg-emerald-500/30 border-emerald-400 text-emerald-200":"bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white"}`,children:[A.jsx("span",{children:a==="behavior"?"✓":"🐟"}),A.jsx("span",{children:"Behavior Only"})]}),A.jsxs("button",{type:"button",onClick:()=>f("json"),className:`py-1.5 px-2 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${a==="json"?"bg-emerald-500/30 border-emerald-400 text-emerald-200":"bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white"}`,children:[A.jsx("span",{children:a==="json"?"✓":"📦"}),A.jsx("span",{children:"Raw JSON"})]})]})]})]}),A.jsx("div",{className:"text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1",children:"Simulation Actions"}),A.jsxs("button",{type:"button",onClick:t.resetSimulation,className:"w-full py-2.5 px-4 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold tracking-wide uppercase transition-all shadow-md shadow-rose-500/10 cursor-pointer flex items-center justify-center gap-2",children:[A.jsx("span",{children:"🔄"}),A.jsx("span",{children:"Reset Simulation Defaults"})]}),A.jsxs("div",{className:"p-3 bg-white/5 border border-white/10 rounded-xl space-y-2 text-xs text-slate-300",children:[A.jsx("div",{className:"font-semibold text-white mb-1",children:"Keyboard Shortcuts"}),A.jsxs("div",{className:"flex justify-between items-center",children:[A.jsx("span",{children:"Toggle Sidebar"}),A.jsx("kbd",{className:"px-2 py-0.5 bg-black/40 rounded border border-white/20 font-mono text-[11px]",children:"B"})]}),A.jsxs("div",{className:"flex justify-between items-center",children:[A.jsx("span",{children:"Toggle Bottom HUD"}),A.jsx("kbd",{className:"px-2 py-0.5 bg-black/40 rounded border border-white/20 font-mono text-[11px]",children:"H"})]}),A.jsxs("div",{className:"flex justify-between items-center",children:[A.jsx("span",{children:"Cycle Camera Preset"}),A.jsx("kbd",{className:"px-2 py-0.5 bg-black/40 rounded border border-white/20 font-mono text-[11px]",children:"C"})]}),A.jsxs("div",{className:"flex justify-between items-center",children:[A.jsx("span",{children:"Direct Shark Attack"}),A.jsx("kbd",{className:"px-2 py-0.5 bg-black/40 rounded border border-white/20 font-mono text-[11px]",children:"Ctrl + Click"})]})]})]})]})]})]}),A.jsxs("div",{id:"sidebar-primary-dock",className:"pointer-events-auto fixed right-4 top-4 bottom-4 w-[200px] md:w-[220px] bg-[#081524]/90 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl flex flex-col justify-between p-3.5 select-none",children:[A.jsxs("div",{children:[A.jsxs("div",{className:"flex items-center justify-between pb-3 mb-3 border-b border-white/10",children:[A.jsxs("div",{className:"flex items-center gap-2",children:[A.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-[#2fa1d6] animate-pulse shadow-sm shadow-[#2fa1d6]"}),A.jsx("h2",{className:"text-sm font-bold text-white tracking-wide",children:"Controls"})]}),A.jsx("button",{type:"button",onClick:t.toggleSidebar,className:"w-6 h-6 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors",title:"Hide sidebar (B)",children:"✕"})]}),A.jsx("nav",{className:"space-y-1.5","aria-label":"Simulation Categories",children:zg.map(d=>{const v=s===d.id;return A.jsxs("button",{id:`sidebar-category-${d.id}`,type:"button",onClick:()=>m(d.id),className:`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer border ${v?"bg-[#2fa1d6]/20 border-[#2fa1d6]/50 text-white shadow-lg shadow-[#2fa1d6]/20 font-semibold":"bg-white/5 hover:bg-white/10 border-white/5 text-slate-300 hover:text-white"}`,children:[A.jsxs("div",{className:"flex items-center gap-2.5",children:[A.jsx("span",{className:"text-lg",children:d.icon}),A.jsx("span",{className:"text-[13px] font-medium tracking-tight",children:d.label})]}),A.jsx("span",{className:`text-base font-bold transition-transform duration-200 ${v?"text-[#2fa1d6] -translate-x-1":"text-white/30"}`,children:"‹"})]},d.id)})})]}),A.jsxs("div",{className:"pt-3 border-t border-white/10 space-y-2",children:[A.jsxs("button",{id:"sidebar-copy-code-btn",type:"button",onClick:()=>f("all"),className:`w-full py-2 px-3 rounded-xl border text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md ${a==="all"?"bg-emerald-500/25 border-emerald-400 text-emerald-200 shadow-emerald-500/20 scale-[1.02]":"bg-cyan-500/15 hover:bg-cyan-500/25 border-cyan-400/40 text-cyan-300 hover:text-white shadow-cyan-500/10"}`,title:"Copy current parameters formatted for code",children:[A.jsx("span",{children:a==="all"?"✓":"📋"}),A.jsx("span",{children:a==="all"?"Copied to Clipboard!":"Copy Config for Code"})]}),A.jsxs("button",{type:"button",onClick:t.resetSimulation,className:"w-full py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5",children:[A.jsx("span",{children:"🔄"}),A.jsx("span",{children:"Reset Defaults"})]}),A.jsx("div",{className:"text-[10px] text-center text-slate-500 tracking-wider uppercase font-mono",children:"Press 'B' to toggle"})]})]})]})},oR=[1e3,5e3,1e4,25e3,5e4],aR=()=>{const{performance:n,parameters:e,actions:t}=nt(),[i,r]=St.useState(!1),s=St.useRef(null),o=e.rendering.fishCount||n.fishCount||25e3,a=u=>u>=55?"text-success":u>=45?"text-warning":"text-danger";St.useEffect(()=>{const u=h=>{s.current&&!s.current.contains(h.target)&&r(!1)};return i&&document.addEventListener("mousedown",u),()=>{document.removeEventListener("mousedown",u)}},[i]);const l=u=>{const h=parseInt(u.target.value,10);t.updateParameter("rendering","fishCount",h)},c=Math.max(0,Math.min(100,(o-100)/(5e4-100)*100));return A.jsxs("div",{className:"absolute bottom-4 left-4 pointer-events-auto z-40",ref:s,children:[i&&A.jsxs("div",{className:"mb-2.5 p-3.5 w-72 rounded-xl bg-[#0a1624]/90 backdrop-blur-xl border border-white/20 shadow-2xl text-xs select-none animate-in fade-in slide-in-from-bottom-2 duration-200",children:[A.jsxs("div",{className:"flex items-center justify-between mb-3",children:[A.jsxs("div",{className:"flex items-center gap-2",children:[A.jsx("span",{className:"font-semibold text-white tracking-wide",children:"Fish Population"}),A.jsx("span",{className:"px-1.5 py-0.5 rounded-md bg-[#2fa1d6]/20 text-[#2fa1d6] font-mono font-bold text-xs",children:o.toLocaleString()})]}),A.jsx("button",{type:"button",onClick:()=>r(!1),className:"w-5 h-5 flex items-center justify-center rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors",title:"Close",children:"✕"})]}),A.jsxs("div",{className:"space-y-1.5 mb-3",children:[A.jsxs("div",{className:"relative flex items-center h-5",children:[A.jsx("div",{className:"absolute left-0 right-0 h-2 bg-white/10 rounded-full overflow-hidden",children:A.jsx("div",{className:"h-full bg-gradient-to-r from-[#2fa1d6] to-[#00ffff] rounded-full transition-all duration-75",style:{width:`${c}%`}})}),A.jsx("input",{type:"range",min:500,max:5e4,step:100,value:o,onChange:l,className:"relative w-full h-5 opacity-0 cursor-ew-resize z-10"})]}),A.jsxs("div",{className:"flex justify-between text-[10px] font-mono text-white/40 px-0.5",children:[A.jsx("span",{children:"500"}),A.jsx("span",{children:"25,000"}),A.jsx("span",{children:"50,000"})]})]}),A.jsx("div",{className:"flex items-center gap-1.5 pt-1 border-t border-white/10",children:oR.map(u=>A.jsx("button",{type:"button",onClick:()=>t.updateParameter("rendering","fishCount",u),className:`flex-1 py-1 rounded text-[11px] font-mono transition-all ${o===u?"bg-[#2fa1d6] text-white font-bold shadow-md shadow-[#2fa1d6]/30":"bg-white/5 hover:bg-white/15 text-white/70 hover:text-white"}`,children:u>=1e3?`${u/1e3}k`:u},u))}),A.jsxs("div",{className:"flex items-center gap-1 pt-2 border-t border-white/10 text-[10px]",children:[A.jsx("span",{className:"text-white/50 mr-1",children:"Scale:"}),[{label:"0.85x Ultra",value:.85},{label:"1.0x (60FPS)",value:1},{label:"1.25x Crisp",value:1.25}].map(u=>A.jsx("button",{type:"button",onClick:()=>t.updateParameter("rendering","resolutionScale",u.value),className:`flex-1 py-0.5 rounded text-[10px] font-mono transition-all ${(e.rendering.resolutionScale??1)===u.value?"bg-[#2fa1d6] text-white font-bold shadow-sm shadow-[#2fa1d6]/30":"bg-white/5 hover:bg-white/15 text-white/70 hover:text-white"}`,children:u.label},u.value))]})]}),A.jsxs("div",{className:"glass-hud px-4 py-2 flex items-center gap-4 text-sm bg-bg0/60 backdrop-blur-md rounded-lg border border-white/15 shadow-lg",children:[A.jsxs("div",{className:"flex items-center gap-2",children:[A.jsx("span",{className:"text-muted font-semibold text-xs tracking-wider",children:"FPS"}),A.jsx("span",{className:`font-mono font-bold ${a(n.fps)}`,children:n.fps.toFixed(0)})]}),A.jsx("div",{className:"w-px h-4 bg-white/20"}),A.jsxs("button",{id:"hud-fish-button",type:"button",onClick:()=>r(!i),className:`flex items-center gap-2 px-2 py-0.5 -mx-1.5 rounded-md transition-all cursor-pointer group ${i?"bg-[#2fa1d6]/20 border border-[#2fa1d6]/40":"hover:bg-white/10 border border-transparent"}`,title:"Click to adjust fish population",children:[A.jsx("span",{className:"text-muted text-xs group-hover:text-[#2fa1d6] transition-colors font-medium",children:"FISH"}),A.jsx("span",{className:"font-mono font-semibold text-text group-hover:text-white transition-colors",children:o.toLocaleString()}),A.jsx("span",{className:`text-[9px] transition-transform duration-200 ${i?"text-[#2fa1d6] rotate-180":"text-muted group-hover:text-[#2fa1d6]"}`,children:"▲"})]})]})]})},Vg=2500,lR=()=>{const n=nt(l=>l.cameraToast),e=nt(l=>l.ui.sidebarVisible),[t,i]=St.useState(!1),[r,s]=St.useState(!1),[o,a]=St.useState(n);return St.useEffect(()=>{if(!n)return;a(n),i(!0),s(!1);const l=setTimeout(()=>{s(!0)},Vg-300),c=setTimeout(()=>{i(!1),s(!1)},Vg);return()=>{clearTimeout(l),clearTimeout(c)}},[n?.timestamp]),!t||!o?null:A.jsxs(A.Fragment,{children:[A.jsx("div",{id:"camera-preset-toast-banner",className:`fixed top-6 left-1/2 -translate-x-1/2 z-[100000] pointer-events-none transition-all duration-300 ${r?"opacity-0 -translate-y-2 scale-95":"opacity-100 translate-y-0 scale-100"}`,children:A.jsxs("div",{className:"flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-[#06121e]/90 backdrop-blur-2xl border border-cyan-400/40 shadow-[0_12px_40px_rgba(0,0,0,0.65),0_0_30px_rgba(0,255,255,0.2)] select-none",children:[A.jsxs("div",{className:"relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 text-2xl shadow-inner shadow-cyan-500/20",children:[A.jsx("span",{children:o.icon}),A.jsx("span",{className:"absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00ffff]"})]}),A.jsxs("div",{className:"flex flex-col",children:[A.jsxs("div",{className:"flex items-center gap-2",children:[A.jsx("span",{className:"text-[10px] font-bold uppercase tracking-widest text-cyan-300",children:"Camera Preset"}),A.jsx("span",{className:"w-1 h-1 rounded-full bg-cyan-400/60"}),A.jsx("span",{className:"text-[10px] font-mono text-white/50 bg-white/10 px-1.5 py-0.2 rounded",children:"'C'"})]}),A.jsx("div",{className:"text-base font-extrabold text-white tracking-wide leading-tight mt-0.5",children:o.name}),A.jsx("div",{className:"text-[11px] font-medium text-slate-300 mt-0.5 max-w-[280px] truncate",children:o.desc})]})]})}),A.jsx("div",{id:"camera-preset-toast-pill",className:`fixed bottom-[88px] md:bottom-20 z-[99999] pointer-events-none transition-all duration-300 ${e?"right-[296px] md:right-[316px]":"right-20 md:right-20"} ${r?"opacity-0 translate-x-2":"opacity-100 translate-x-0"}`,children:A.jsxs("div",{className:"flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#081524]/95 backdrop-blur-xl border border-cyan-400/40 text-xs font-semibold text-white shadow-2xl whitespace-nowrap",children:[A.jsx("span",{className:"text-sm",children:o.icon}),A.jsx("span",{className:"text-cyan-300 font-bold",children:o.name})]})})]})};function cR(){const{ui:n,actions:e}=nt();return St.useEffect(()=>{window.useSimulationStore=nt},[]),St.useEffect(()=>{const t=i=>{i.key.toLowerCase()==="h"&&!i.ctrlKey&&!i.altKey&&!i.shiftKey&&e.toggleHUD(),i.key.toLowerCase()==="b"&&!i.ctrlKey&&!i.altKey&&!i.shiftKey&&e.toggleSidebar(),i.key.toLowerCase()==="c"&&!i.ctrlKey&&!i.altKey&&!i.shiftKey&&e.cycleCamera(),i.key.toLowerCase()==="w"&&!i.ctrlKey&&!i.altKey&&!i.shiftKey&&e.triggerWhirlpool()};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[e]),A.jsxs("div",{className:"relative w-full h-full bg-bg0 overflow-hidden",children:[A.jsx(rR,{}),A.jsxs("div",{className:"absolute inset-0 pointer-events-none",children:[A.jsx(lR,{}),n.hudVisible&&A.jsx("div",{className:"pointer-events-auto",children:A.jsx(aR,{})}),n.sidebarVisible&&A.jsx(sR,{})]}),A.jsxs("div",{className:`fixed bottom-8 md:bottom-6 z-[99999] flex flex-col gap-4 transition-all duration-300 ${n.sidebarVisible?"right-[228px] md:right-[248px]":"right-6 md:right-6"}`,children:[A.jsx("button",{onClick:e.triggerWhirlpool,className:"flex items-center justify-center w-12 h-12 bg-cyan-500/30 hover:bg-cyan-500/50 border border-cyan-400/50 backdrop-blur-md rounded-full text-cyan-200 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:scale-110 active:scale-95 cursor-pointer group",title:"Trigger Whirlpool Cyclone (W)",children:A.jsx("span",{className:"text-xl group-hover:rotate-180 transition-transform duration-500",children:"🌀"})}),A.jsx("button",{onClick:e.cycleCamera,className:"flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-md rounded-full text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-110 cursor-pointer",title:"Cycle Camera (C)",children:A.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[A.jsx("path",{d:"m22 8-6 4 6 4V8Z"}),A.jsx("rect",{width:"14",height:"12",x:"2",y:"6",rx:"2",ry:"2"})]})}),A.jsx("button",{onClick:e.toggleSidebar,className:"flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-md rounded-full text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:rotate-90 hover:scale-110 cursor-pointer",title:"Toggle Settings (B)",children:A.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[A.jsx("circle",{cx:"12",cy:"12",r:"3"}),A.jsx("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"})]})})]})]})}id.createRoot(document.getElementById("root")).render(A.jsx(Jg.StrictMode,{children:A.jsx(cR,{})}));
//# sourceMappingURL=index-9ff64d6a.js.map
