(this["webpackJsonpreact-triangles"]=this["webpackJsonpreact-triangles"]||[]).push([[0],{10:function(n,e,t){},20:function(n,e,t){"use strict";t.r(e);var o=t(0),i=t(5),r=t.n(i),a=(t(10),t(2)),c=t.n(a),s=t(1),l=window.innerWidth,u=window.innerHeight,h=function(n,e,t){return e+n*(t-e)},d=function(n,e,t){return n>t?t:n<e?e:n},f=function(n){var e,t,i,r,a=c.a.hex.hsv(n.topcolor?n.topcolor:"#7fff69"),f=a[0],v=a[1],g=a[2],w=c.a.hex.hsv(n.botcolor?n.botcolor:"#814796"),p=w[0],x=w[1],y=w[2],b=n.hue?d(n.hue,0,1):.2,k=n.sat?d(n.sat,0,1):0,m=n.val?d(n.val,0,1):.15,W=[],j=!n.equilateral||n.equilateral,T=!n.countx||n.countx<0?10:n.countx,S=!n.county||n.county<0?10:n.county,O=function(n,e,t,o){var i=e/o;i<0&&(i=0);var r=h(i+Math.random()*b,f,p),a=h(i+Math.random()*k,v,x),s=i+Math.random()*m;s>1&&(s=1);var l=h(s,g,y);return"#"+c.a.hsv.hex(d(r,0,360),d(a,0,100),d(l,0,100))},P=Object(o.useRef)();Object(o.useEffect)((function(){var n;i=P.current,r=i.getContext("2d"),A(),window.addEventListener("resize",(function(){n&&clearTimeout(n),n=setTimeout((function(){A()}),100)}))}),[]);var A=function(){l=window.innerWidth,u=window.innerHeight,r.canvas.width=l,r.canvas.height=u,j?e=2*(t=u/S)*Math.sqrt(3)/3:(e=l/T,t=u/S),W=[],function(){for(var n,o,i,r,a,c=0,s=-e;s<=l;s+=e){a=1;for(var h=-t;h<=u;h+=t)a%2===1&&(c=e/2),o=(n=c+s)+e,i=n+e/2,r=h+t,W.push({x0:n,y0:h,x1:o,y1:h,x2:i,y2:r,color:O(0,h,0,u)}),W.push({x0:i,y0:r,x1:i+e,y1:r,x2:o,y2:h,color:O(0,h,0,u)}),c=0,a++}}(),function(){var n;r.lineWidth=2;for(var e=0;e<W.length;e++)n=W[e],r.fillStyle=n.color,r.strokeStyle=n.color,r.beginPath(),r.moveTo(n.x0,n.y0),r.lineTo(n.x1,n.y1),r.lineTo(n.x2,n.y2),r.closePath(),r.stroke(),r.fill()}()};return Object(s.jsx)("div",{style:{position:"absolute",zIndex:-1,width:"100%",height:"100%"},children:Object(s.jsx)("canvas",{ref:P,style:{position:"absolute",zIndex:-1,width:"100%",height:"100%"},width:l,height:u})})},v=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function g(n,e){navigator.serviceWorker.register(n).then((function(n){n.onupdatefound=function(){var t=n.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),e&&e.onUpdate&&e.onUpdate(n)):(console.log("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(n)))})}})).catch((function(n){console.error("Error during service worker registration:",n)}))}var w=function(n){n&&n instanceof Function&&t.e(3).then(t.bind(null,21)).then((function(e){var t=e.getCLS,o=e.getFID,i=e.getFCP,r=e.getLCP,a=e.getTTFB;t(n),o(n),i(n),r(n),a(n)}))};r.a.render(Object(s.jsx)(f,{botcolor:"#221A33",topcolor:"#8A3D99",hue:.2,sat:0,val:.15,countx:10,county:10,equilateral:!0}),document.getElementById("root")),w(),function(n){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("","/service-worker.js");v?(!function(n,e){fetch(n,{headers:{"Service-Worker":"script"}}).then((function(t){var o=t.headers.get("content-type");404===t.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then((function(n){n.unregister().then((function(){window.location.reload()}))})):g(n,e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e,n),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):g(e,n)}))}}()}},[[20,1,2]]]);
//# sourceMappingURL=main.d61e08f1.chunk.js.map