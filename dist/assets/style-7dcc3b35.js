import{D as Ve,d as We,E as qe,e as W,G as Be,o as re,s as ze,a as ot,c as Ge,B as Lt,x as Ze,y as se,H as Je,I as Qe,T as je,n as Ke}from"./index-c4694308.js";var ae={exports:{}};/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */(function(g){(function(f,q,A,l){var B=["","webkit","Moz","MS","ms","o"],Q=q.createElement("div"),w="function",S=Math.round,N=Math.abs,_=Date.now;function I(t,e,i){return setTimeout(z(t,i),e)}function x(t,e,i){return Array.isArray(t)?(y(t,i[e],i),!0):!1}function y(t,e,i){var n;if(t)if(t.forEach)t.forEach(e,i);else if(t.length!==l)for(n=0;n<t.length;)e.call(i,t[n],n,t),n++;else for(n in t)t.hasOwnProperty(n)&&e.call(i,t[n],n,t)}function H(t,e,i){var n="DEPRECATED METHOD: "+e+`
`+i+` AT 
`;return function(){var r=new Error("get-stack-trace"),s=r&&r.stack?r.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",a=f.console&&(f.console.warn||f.console.log);return a&&a.call(f.console,n,s),t.apply(this,arguments)}}var p;typeof Object.assign!="function"?p=function(e){if(e===l||e===null)throw new TypeError("Cannot convert undefined or null to object");for(var i=Object(e),n=1;n<arguments.length;n++){var r=arguments[n];if(r!==l&&r!==null)for(var s in r)r.hasOwnProperty(s)&&(i[s]=r[s])}return i}:p=Object.assign;var lt=H(function(e,i,n){for(var r=Object.keys(i),s=0;s<r.length;)(!n||n&&e[r[s]]===l)&&(e[r[s]]=i[r[s]]),s++;return e},"extend","Use `assign`."),Ct=H(function(e,i){return lt(e,i,!0)},"merge","Use `assign`.");function d(t,e,i){var n=e.prototype,r;r=t.prototype=Object.create(n),r.constructor=t,r._super=n,i&&p(r,i)}function z(t,e){return function(){return t.apply(e,arguments)}}function G(t,e){return typeof t==w?t.apply(e&&e[0]||l,e):t}function j(t,e){return t===l?e:t}function o(t,e,i){y(ct(e),function(n){t.addEventListener(n,i,!1)})}function c(t,e,i){y(ct(e),function(n){t.removeEventListener(n,i,!1)})}function K(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function F(t,e){return t.indexOf(e)>-1}function ct(t){return t.trim().split(/\s+/g)}function Z(t,e,i){if(t.indexOf&&!i)return t.indexOf(e);for(var n=0;n<t.length;){if(i&&t[n][i]==e||!i&&t[n]===e)return n;n++}return-1}function ut(t){return Array.prototype.slice.call(t,0)}function Ht(t,e,i){for(var n=[],r=[],s=0;s<t.length;){var a=e?t[s][e]:t[s];Z(r,a)<0&&n.push(t[s]),r[s]=a,s++}return i&&(e?n=n.sort(function(v,m){return v[e]>m[e]}):n=n.sort()),n}function ht(t,e){for(var i,n,r=e[0].toUpperCase()+e.slice(1),s=0;s<B.length;){if(i=B[s],n=i?i+r:e,n in t)return n;s++}return l}var oe=1;function le(){return oe++}function Yt(t){var e=t.ownerDocument||t;return e.defaultView||e.parentWindow||f}var ce=/mobile|tablet|ip(ad|hone|od)|android/i,wt="ontouchstart"in f,ue=ht(f,"PointerEvent")!==l,he=wt&&ce.test(navigator.userAgent),$="touch",fe="pen",Pt="mouse",ve="kinect",pe=25,T=1,k=2,u=4,E=8,ft=1,tt=2,et=4,it=8,nt=16,D=tt|et,X=it|nt,Ft=D|X,kt=["x","y"],vt=["clientX","clientY"];function C(t,e){var i=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(n){G(t.options.enable,[t])&&i.handler(n)},this.init()}C.prototype={handler:function(){},init:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(Yt(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&c(this.element,this.evEl,this.domHandler),this.evTarget&&c(this.target,this.evTarget,this.domHandler),this.evWin&&c(Yt(this.element),this.evWin,this.domHandler)}};function de(t){var e,i=t.options.inputClass;return i?e=i:ue?e=Ot:he?e=Tt:wt?e=At:e=dt,new e(t,Te)}function Te(t,e,i){var n=i.pointers.length,r=i.changedPointers.length,s=e&T&&n-r===0,a=e&(u|E)&&n-r===0;i.isFirst=!!s,i.isFinal=!!a,s&&(t.session={}),i.eventType=e,me(t,i),t.emit("hammer.input",i),t.recognize(i),t.session.prevInput=i}function me(t,e){var i=t.session,n=e.pointers,r=n.length;i.firstInput||(i.firstInput=Xt(e)),r>1&&!i.firstMultiple?i.firstMultiple=Xt(e):r===1&&(i.firstMultiple=!1);var s=i.firstInput,a=i.firstMultiple,h=a?a.center:s.center,v=e.center=Vt(n);e.timeStamp=_(),e.deltaTime=e.timeStamp-s.timeStamp,e.angle=Nt(h,v),e.distance=pt(h,v),Ee(i,e),e.offsetDirection=qt(e.deltaX,e.deltaY);var m=Wt(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=m.x,e.overallVelocityY=m.y,e.overallVelocity=N(m.x)>N(m.y)?m.x:m.y,e.scale=a?_e(a.pointers,n):1,e.rotation=a?ye(a.pointers,n):0,e.maxPointers=i.prevInput?e.pointers.length>i.prevInput.maxPointers?e.pointers.length:i.prevInput.maxPointers:e.pointers.length,ge(i,e);var b=t.element;K(e.srcEvent.target,b)&&(b=e.srcEvent.target),e.target=b}function Ee(t,e){var i=e.center,n=t.offsetDelta||{},r=t.prevDelta||{},s=t.prevInput||{};(e.eventType===T||s.eventType===u)&&(r=t.prevDelta={x:s.deltaX||0,y:s.deltaY||0},n=t.offsetDelta={x:i.x,y:i.y}),e.deltaX=r.x+(i.x-n.x),e.deltaY=r.y+(i.y-n.y)}function ge(t,e){var i=t.lastInterval||e,n=e.timeStamp-i.timeStamp,r,s,a,h;if(e.eventType!=E&&(n>pe||i.velocity===l)){var v=e.deltaX-i.deltaX,m=e.deltaY-i.deltaY,b=Wt(n,v,m);s=b.x,a=b.y,r=N(b.x)>N(b.y)?b.x:b.y,h=qt(v,m),t.lastInterval=e}else r=i.velocity,s=i.velocityX,a=i.velocityY,h=i.direction;e.velocity=r,e.velocityX=s,e.velocityY=a,e.direction=h}function Xt(t){for(var e=[],i=0;i<t.pointers.length;)e[i]={clientX:S(t.pointers[i].clientX),clientY:S(t.pointers[i].clientY)},i++;return{timeStamp:_(),pointers:e,center:Vt(e),deltaX:t.deltaX,deltaY:t.deltaY}}function Vt(t){var e=t.length;if(e===1)return{x:S(t[0].clientX),y:S(t[0].clientY)};for(var i=0,n=0,r=0;r<e;)i+=t[r].clientX,n+=t[r].clientY,r++;return{x:S(i/e),y:S(n/e)}}function Wt(t,e,i){return{x:e/t||0,y:i/t||0}}function qt(t,e){return t===e?ft:N(t)>=N(e)?t<0?tt:et:e<0?it:nt}function pt(t,e,i){i||(i=kt);var n=e[i[0]]-t[i[0]],r=e[i[1]]-t[i[1]];return Math.sqrt(n*n+r*r)}function Nt(t,e,i){i||(i=kt);var n=e[i[0]]-t[i[0]],r=e[i[1]]-t[i[1]];return Math.atan2(r,n)*180/Math.PI}function ye(t,e){return Nt(e[1],e[0],vt)+Nt(t[1],t[0],vt)}function _e(t,e){return pt(e[0],e[1],vt)/pt(t[0],t[1],vt)}var Ie={mousedown:T,mousemove:k,mouseup:u},Ce="mousedown",Pe="mousemove mouseup";function dt(){this.evEl=Ce,this.evWin=Pe,this.pressed=!1,C.apply(this,arguments)}d(dt,C,{handler:function(e){var i=Ie[e.type];i&T&&e.button===0&&(this.pressed=!0),i&k&&e.which!==1&&(i=u),this.pressed&&(i&u&&(this.pressed=!1),this.callback(this.manager,i,{pointers:[e],changedPointers:[e],pointerType:Pt,srcEvent:e}))}});var Ne={pointerdown:T,pointermove:k,pointerup:u,pointercancel:E,pointerout:E},Oe={2:$,3:fe,4:Pt,5:ve},Bt="pointerdown",zt="pointermove pointerup pointercancel";f.MSPointerEvent&&!f.PointerEvent&&(Bt="MSPointerDown",zt="MSPointerMove MSPointerUp MSPointerCancel");function Ot(){this.evEl=Bt,this.evWin=zt,C.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}d(Ot,C,{handler:function(e){var i=this.store,n=!1,r=e.type.toLowerCase().replace("ms",""),s=Ne[r],a=Oe[e.pointerType]||e.pointerType,h=a==$,v=Z(i,e.pointerId,"pointerId");s&T&&(e.button===0||h)?v<0&&(i.push(e),v=i.length-1):s&(u|E)&&(n=!0),!(v<0)&&(i[v]=e,this.callback(this.manager,s,{pointers:i,changedPointers:[e],pointerType:a,srcEvent:e}),n&&i.splice(v,1))}});var Ae={touchstart:T,touchmove:k,touchend:u,touchcancel:E},Se="touchstart",De="touchstart touchmove touchend touchcancel";function Gt(){this.evTarget=Se,this.evWin=De,this.started=!1,C.apply(this,arguments)}d(Gt,C,{handler:function(e){var i=Ae[e.type];if(i===T&&(this.started=!0),!!this.started){var n=Me.call(this,e,i);i&(u|E)&&n[0].length-n[1].length===0&&(this.started=!1),this.callback(this.manager,i,{pointers:n[0],changedPointers:n[1],pointerType:$,srcEvent:e})}}});function Me(t,e){var i=ut(t.touches),n=ut(t.changedTouches);return e&(u|E)&&(i=Ht(i.concat(n),"identifier",!0)),[i,n]}var be={touchstart:T,touchmove:k,touchend:u,touchcancel:E},xe="touchstart touchmove touchend touchcancel";function Tt(){this.evTarget=xe,this.targetIds={},C.apply(this,arguments)}d(Tt,C,{handler:function(e){var i=be[e.type],n=Ue.call(this,e,i);n&&this.callback(this.manager,i,{pointers:n[0],changedPointers:n[1],pointerType:$,srcEvent:e})}});function Ue(t,e){var i=ut(t.touches),n=this.targetIds;if(e&(T|k)&&i.length===1)return n[i[0].identifier]=!0,[i,i];var r,s,a=ut(t.changedTouches),h=[],v=this.target;if(s=i.filter(function(m){return K(m.target,v)}),e===T)for(r=0;r<s.length;)n[s[r].identifier]=!0,r++;for(r=0;r<a.length;)n[a[r].identifier]&&h.push(a[r]),e&(u|E)&&delete n[a[r].identifier],r++;if(h.length)return[Ht(s.concat(h),"identifier",!0),h]}var Re=2500,Zt=25;function At(){C.apply(this,arguments);var t=z(this.handler,this);this.touch=new Tt(this.manager,t),this.mouse=new dt(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}d(At,C,{handler:function(e,i,n){var r=n.pointerType==$,s=n.pointerType==Pt;if(!(s&&n.sourceCapabilities&&n.sourceCapabilities.firesTouchEvents)){if(r)Le.call(this,i,n);else if(s&&He.call(this,n))return;this.callback(e,i,n)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});function Le(t,e){t&T?(this.primaryTouch=e.changedPointers[0].identifier,Jt.call(this,e)):t&(u|E)&&Jt.call(this,e)}function Jt(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var i={x:e.clientX,y:e.clientY};this.lastTouches.push(i);var n=this.lastTouches,r=function(){var s=n.indexOf(i);s>-1&&n.splice(s,1)};setTimeout(r,Re)}}function He(t){for(var e=t.srcEvent.clientX,i=t.srcEvent.clientY,n=0;n<this.lastTouches.length;n++){var r=this.lastTouches[n],s=Math.abs(e-r.x),a=Math.abs(i-r.y);if(s<=Zt&&a<=Zt)return!0}return!1}var Qt=ht(Q.style,"touchAction"),jt=Qt!==l,Kt="compute",$t="auto",St="manipulation",V="none",rt="pan-x",st="pan-y",mt=we();function Dt(t,e){this.manager=t,this.set(e)}Dt.prototype={set:function(t){t==Kt&&(t=this.compute()),jt&&this.manager.element.style&&mt[t]&&(this.manager.element.style[Qt]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return y(this.manager.recognizers,function(e){G(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),Ye(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,i=t.offsetDirection;if(this.manager.session.prevented){e.preventDefault();return}var n=this.actions,r=F(n,V)&&!mt[V],s=F(n,st)&&!mt[st],a=F(n,rt)&&!mt[rt];if(r){var h=t.pointers.length===1,v=t.distance<2,m=t.deltaTime<250;if(h&&v&&m)return}if(!(a&&s)&&(r||s&&i&D||a&&i&X))return this.preventSrc(e)},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};function Ye(t){if(F(t,V))return V;var e=F(t,rt),i=F(t,st);return e&&i?V:e||i?e?rt:st:F(t,St)?St:$t}function we(){if(!jt)return!1;var t={},e=f.CSS&&f.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(i){t[i]=e?f.CSS.supports("touch-action",i):!0}),t}var Et=1,P=2,J=4,Y=8,U=Y,at=16,M=32;function R(t){this.options=p({},this.defaults,t||{}),this.id=le(),this.manager=null,this.options.enable=j(this.options.enable,!0),this.state=Et,this.simultaneous={},this.requireFail=[]}R.prototype={defaults:{},set:function(t){return p(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(x(t,"recognizeWith",this))return this;var e=this.simultaneous;return t=gt(t,this),e[t.id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return x(t,"dropRecognizeWith",this)?this:(t=gt(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(x(t,"requireFailure",this))return this;var e=this.requireFail;return t=gt(t,this),Z(e,t)===-1&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(x(t,"dropRequireFailure",this))return this;t=gt(t,this);var e=Z(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){var e=this,i=this.state;function n(r){e.manager.emit(r,t)}i<Y&&n(e.options.event+te(i)),n(e.options.event),t.additionalEvent&&n(t.additionalEvent),i>=Y&&n(e.options.event+te(i))},tryEmit:function(t){if(this.canEmit())return this.emit(t);this.state=M},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(M|Et)))return!1;t++}return!0},recognize:function(t){var e=p({},t);if(!G(this.options.enable,[this,e])){this.reset(),this.state=M;return}this.state&(U|at|M)&&(this.state=Et),this.state=this.process(e),this.state&(P|J|Y|at)&&this.tryEmit(e)},process:function(t){},getTouchAction:function(){},reset:function(){}};function te(t){return t&at?"cancel":t&Y?"end":t&J?"move":t&P?"start":""}function ee(t){return t==nt?"down":t==it?"up":t==tt?"left":t==et?"right":""}function gt(t,e){var i=e.manager;return i?i.get(t):t}function O(){R.apply(this,arguments)}d(O,R,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return e===0||t.pointers.length===e},process:function(t){var e=this.state,i=t.eventType,n=e&(P|J),r=this.attrTest(t);return n&&(i&E||!r)?e|at:n||r?i&u?e|Y:e&P?e|J:P:M}});function yt(){O.apply(this,arguments),this.pX=null,this.pY=null}d(yt,O,{defaults:{event:"pan",threshold:10,pointers:1,direction:Ft},getTouchAction:function(){var t=this.options.direction,e=[];return t&D&&e.push(st),t&X&&e.push(rt),e},directionTest:function(t){var e=this.options,i=!0,n=t.distance,r=t.direction,s=t.deltaX,a=t.deltaY;return r&e.direction||(e.direction&D?(r=s===0?ft:s<0?tt:et,i=s!=this.pX,n=Math.abs(t.deltaX)):(r=a===0?ft:a<0?it:nt,i=a!=this.pY,n=Math.abs(t.deltaY))),t.direction=r,i&&n>e.threshold&&r&e.direction},attrTest:function(t){return O.prototype.attrTest.call(this,t)&&(this.state&P||!(this.state&P)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=ee(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}});function Mt(){O.apply(this,arguments)}d(Mt,O,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[V]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&P)},emit:function(t){if(t.scale!==1){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e}this._super.emit.call(this,t)}});function bt(){R.apply(this,arguments),this._timer=null,this._input=null}d(bt,R,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[$t]},process:function(t){var e=this.options,i=t.pointers.length===e.pointers,n=t.distance<e.threshold,r=t.deltaTime>e.time;if(this._input=t,!n||!i||t.eventType&(u|E)&&!r)this.reset();else if(t.eventType&T)this.reset(),this._timer=I(function(){this.state=U,this.tryEmit()},e.time,this);else if(t.eventType&u)return U;return M},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===U&&(t&&t.eventType&u?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=_(),this.manager.emit(this.options.event,this._input)))}});function xt(){O.apply(this,arguments)}d(xt,O,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[V]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&P)}});function Ut(){O.apply(this,arguments)}d(Ut,O,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:D|X,pointers:1},getTouchAction:function(){return yt.prototype.getTouchAction.call(this)},attrTest:function(t){var e=this.options.direction,i;return e&(D|X)?i=t.overallVelocity:e&D?i=t.overallVelocityX:e&X&&(i=t.overallVelocityY),this._super.attrTest.call(this,t)&&e&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&N(i)>this.options.velocity&&t.eventType&u},emit:function(t){var e=ee(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}});function _t(){R.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}d(_t,R,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[St]},process:function(t){var e=this.options,i=t.pointers.length===e.pointers,n=t.distance<e.threshold,r=t.deltaTime<e.time;if(this.reset(),t.eventType&T&&this.count===0)return this.failTimeout();if(n&&r&&i){if(t.eventType!=u)return this.failTimeout();var s=this.pTime?t.timeStamp-this.pTime<e.interval:!0,a=!this.pCenter||pt(this.pCenter,t.center)<e.posThreshold;this.pTime=t.timeStamp,this.pCenter=t.center,!a||!s?this.count=1:this.count+=1,this._input=t;var h=this.count%e.taps;if(h===0)return this.hasRequireFailures()?(this._timer=I(function(){this.state=U,this.tryEmit()},e.interval,this),P):U}return M},failTimeout:function(){return this._timer=I(function(){this.state=M},this.options.interval,this),M},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==U&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}});function L(t,e){return e=e||{},e.recognizers=j(e.recognizers,L.defaults.preset),new Rt(t,e)}L.VERSION="2.0.7",L.defaults={domEvents:!1,touchAction:Kt,enable:!0,inputTarget:null,inputClass:null,preset:[[xt,{enable:!1}],[Mt,{enable:!1},["rotate"]],[Ut,{direction:D}],[yt,{direction:D},["swipe"]],[_t],[_t,{event:"doubletap",taps:2},["tap"]],[bt]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var Fe=1,ie=2;function Rt(t,e){this.options=p({},L.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=de(this),this.touchAction=new Dt(this,this.options.touchAction),ne(this,!0),y(this.options.recognizers,function(i){var n=this.add(new i[0](i[1]));i[2]&&n.recognizeWith(i[2]),i[3]&&n.requireFailure(i[3])},this)}Rt.prototype={set:function(t){return p(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?ie:Fe},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var i,n=this.recognizers,r=e.curRecognizer;(!r||r&&r.state&U)&&(r=e.curRecognizer=null);for(var s=0;s<n.length;)i=n[s],e.stopped!==ie&&(!r||i==r||i.canRecognizeWith(r))?i.recognize(t):i.reset(),!r&&i.state&(P|J|Y)&&(r=e.curRecognizer=i),s++}},get:function(t){if(t instanceof R)return t;for(var e=this.recognizers,i=0;i<e.length;i++)if(e[i].options.event==t)return e[i];return null},add:function(t){if(x(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(x(t,"remove",this))return this;if(t=this.get(t),t){var e=this.recognizers,i=Z(e,t);i!==-1&&(e.splice(i,1),this.touchAction.update())}return this},on:function(t,e){if(t!==l&&e!==l){var i=this.handlers;return y(ct(t),function(n){i[n]=i[n]||[],i[n].push(e)}),this}},off:function(t,e){if(t!==l){var i=this.handlers;return y(ct(t),function(n){e?i[n]&&i[n].splice(Z(i[n],e),1):delete i[n]}),this}},emit:function(t,e){this.options.domEvents&&ke(t,e);var i=this.handlers[t]&&this.handlers[t].slice();if(!(!i||!i.length)){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var n=0;n<i.length;)i[n](e),n++}},destroy:function(){this.element&&ne(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}};function ne(t,e){var i=t.element;if(i.style){var n;y(t.options.cssProps,function(r,s){n=ht(i.style,s),e?(t.oldCssProps[n]=i.style[n],i.style[n]=r):i.style[n]=t.oldCssProps[n]||""}),e||(t.oldCssProps={})}}function ke(t,e){var i=q.createEvent("Event");i.initEvent(t,!0,!0),i.gesture=e,e.target.dispatchEvent(i)}p(L,{INPUT_START:T,INPUT_MOVE:k,INPUT_END:u,INPUT_CANCEL:E,STATE_POSSIBLE:Et,STATE_BEGAN:P,STATE_CHANGED:J,STATE_ENDED:Y,STATE_RECOGNIZED:U,STATE_CANCELLED:at,STATE_FAILED:M,DIRECTION_NONE:ft,DIRECTION_LEFT:tt,DIRECTION_RIGHT:et,DIRECTION_UP:it,DIRECTION_DOWN:nt,DIRECTION_HORIZONTAL:D,DIRECTION_VERTICAL:X,DIRECTION_ALL:Ft,Manager:Rt,Input:C,TouchAction:Dt,TouchInput:Tt,MouseInput:dt,PointerEventInput:Ot,TouchMouseInput:At,SingleTouchInput:Gt,Recognizer:R,AttrRecognizer:O,Tap:_t,Pan:yt,Swipe:Ut,Pinch:Mt,Rotate:xt,Press:bt,on:o,off:c,each:y,merge:Ct,extend:lt,assign:p,inherit:d,bindFn:z,prefixed:ht});var Xe=typeof f<"u"?f:typeof self<"u"?self:{};Xe.Hammer=L,typeof l=="function"&&l.amd?l(function(){return L}):g.exports?g.exports=L:f[A]=L})(window,document,"Hammer")})(ae);var $e=ae.exports;const It=Ve($e),ti=ot("div",{class:"bottom-sheet__bar"},null,-1),ei=[ti],ni=We({__name:"VueBottomSheet",props:{overlay:{type:Boolean,default:!0},maxWidth:{default:"640px"},maxHeight:{default:"95vh"},clickToClose:{type:Boolean,default:!0},effect:{default:"fx-default"},rounded:{type:Boolean,default:!0},swipeable:{type:Boolean,default:!0},fullScreen:{type:Boolean,default:!1},overlayColor:{default:"#0000004D"},backgroundScrollable:{type:Boolean,default:!1},backgroundClickable:{type:Boolean,default:!1}},emits:["closed","opened"],setup(g,{expose:f,emit:q}){const A=g;qe(o=>({"55aabca4":N.value}));const l=W(),B=W(),Q=W(),w=W(!1),S=W(!1),N=W("auto"),_=W(0),I={pan:null,content:null};let x=!1,y=0,H=0,p=0;Be(()=>{var o,c;(o=I.pan)==null||o.destroy(),(c=I.content)==null||c.destroy()});const lt=()=>{const o=/iPhone/.test(navigator.userAgent)&&!window.MSStream,c=window.screen.width/window.screen.height;return o&&c.toFixed(3)==="0.462"},Ct=async()=>{if(await Ke(),N.value="auto",p=lt()?20:0,H=B.value.clientHeight,N.value=`${H-Q.value.clientHeight}px`,B.value.style.maxHeight=A.maxHeight,_.value=A.effect==="fx-slide-from-right"||A.effect==="fx-slide-from-left"?0:-H-p,!x){const o={recognizers:[[It.Pan,{direction:It.DIRECTION_VERTICAL}]]};I.pan=new It(Q.value,o),I.pan&&I.pan.on("panstart panup pandown panend",c=>{z(c,"pan")}),I.content=new It(l.value,o),I.content&&I.content.on("panstart panup pandown panend",c=>{z(c,"content")}),x=!0}},d=()=>{w.value=!0,_.value=0,A.backgroundScrollable||(document.documentElement.style.overflowY="hidden"),q("opened")},z=(o,c)=>{if(A.swipeable){const K=-o.deltaY;c==="content"&&o.type==="panup"||c==="content"&&o.type==="pandown"&&y>0?l.value.scrollTop=y+K:(o.type==="panup"||o.type==="pandown")&&(S.value=!0,o.deltaY>0&&(_.value=K)),o.isFinal&&(y=l.value.scrollTop,S.value=!1,_.value<-30?(w.value=!1,_.value=-H-p,document.documentElement.style.overflowY="",q("closed")):_.value=0)}},G=()=>{w.value=!1,_.value=A.effect==="fx-slide-from-right"||A.effect==="fx-slide-from-left"?0:-H-p,document.documentElement.style.overflowY="",q("closed")},j=o=>{if(A.clickToClose){const c=o.target;(c.classList.contains("bottom-sheet__backdrop")||c.classList.contains("bottom-sheet"))&&G()}};return f({open:d,close:G}),Ct(),(o,c)=>(re(),ze(je,{to:"body"},[ot("div",{ref:"bottomSheet",class:se(["bottom-sheet",{opened:w.value,closed:w.value===!1,moving:S.value}]),style:Lt({"pointer-events":g.backgroundClickable&&g.clickToClose===!1?"none":"all"}),onMousedown:j,onTouchstart:j},[g.overlay?(re(),Ge("div",{key:0,class:"bottom-sheet__backdrop",style:Lt({background:g.overlayColor})},null,4)):Ze("",!0),ot("div",{ref_key:"bottomSheetCard",ref:B,style:Lt([{bottom:_.value+"px",maxWidth:g.maxWidth,maxHeight:g.maxHeight},{height:g.fullScreen?"100vh":"auto"},{"pointer-events":"all"}]),class:se(["bottom-sheet__card",{stripe:Je(p),square:!g.rounded},g.effect])},[ot("div",{ref_key:"pan",ref:Q,class:"bottom-sheet__pan"},ei,512),ot("div",{ref_key:"bottomSheetCardContent",ref:l,class:"bottom-sheet__content"},[Qe(o.$slots,"default")],512)],6)],38)]))}});export{ni as q};
