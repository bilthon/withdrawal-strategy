(this["webpackJsonpwithdrawal-strategy"]=this["webpackJsonpwithdrawal-strategy"]||[]).push([[0],{129:function(t,e,n){},130:function(t,e,n){},131:function(t,e,n){},162:function(t,e){},164:function(t,e){},173:function(t,e){},175:function(t,e){},351:function(t,e,n){},353:function(t,e,n){},354:function(t,e,n){},355:function(t,e,n){"use strict";n.r(e);var c=n(1),r=n.n(c),s=n(119),a=n.n(s),i=(n(129),n.p,n(130),n(24)),o=(n(131),n(12)),u=n(8),j=n.n(u),l=n(120),f=n(28),b=n(122),d=n.n(b),h=(n(351),function(t){var e=t.crosshairValues,n=t.formatValue,c=t.getWithdrawalCost,r=t.unit,s=null,a=function(t){var e;return e=n?n(t):t.toString(),r&&(e="".concat(e," ").concat(r.toUpperCase())),e};if(e.length>0){var i=e[0],u=(i.x,i.y),j=c()-u;s=Object(o.jsxs)("div",{className:"CrossHair",children:[Object(o.jsx)("h4",{className:"CrossHairTitle",children:"Withdrawal"}),Object(o.jsxs)("p",{className:"CrossHairField",children:["Amount: ",a(e[0].x)," "]}),Object(o.jsxs)("p",{className:"CrossHairField",children:["Direct Cost : ",a(c())," "]}),Object(o.jsxs)("p",{className:"CrossHairField",children:["Indirect Cost : ",a(e[0].y)," "]}),Object(o.jsxs)("p",{className:"CrossHairField",style:j<0?{color:"#FFE7E7",fontSize:"bold"}:{},children:["Savings : ",a(j)," "]})]})}return s}),O=(n(352),n(353),.005),m=5e4,x={strokeWidth:2,stroke:"#ff0000"},p="sats",v="usd",C=function(){var t=Object(c.useState)(0),e=Object(i.a)(t,2),n=e[0],r=e[1],s=Object(c.useState)(p),a=Object(i.a)(s,2),u=a[0],b=a[1],C=Object(c.useState)([]),g=Object(i.a)(C,2),w=g[0],F=g[1],y=Object(c.useState)([]),N=Object(i.a)(y,2),S=N[0],k=N[1],I=Object(c.useState)([]),U=Object(i.a)(I,2),D=U[0],E=U[1],H=function(){return n>0?parseInt(1/n*1e8):1},T=function(t){return parseInt((t-0)/O)};Object(c.useEffect)((function(){for(var t,e=1.5*T(m),n=[],c=0;c<e;c+=1e4)n.push({x:c,y:(t=c,parseInt(0+O*t))});k(n)}),[0,O]),Object(c.useEffect)((function(){if(u!==p&&0===D.length){var t=H(),e=S.map((function(e){var n=e.x,c=e.y;return{x:n/t,y:c/t}}));E(e)}}),[u]),Object(c.useEffect)((function(){(function(){var t=Object(l.a)(j.a.mark((function t(){var e,n,c,s;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=d.a.binance,n=new e({}),t.next=4,n.fetchTickers();case 4:c=t.sent,s=c["BTC/USDT"].last,r(s);case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[]);var V=function(t,e,n,c){return W(t)},M=function(){return u===p?m:m/H()},W=function(t){return t<1e3?"".concat(t):t<1e6?"".concat(t/1e3,"K"):"".concat(t/1e6,"M")};return Object(o.jsxs)("div",{className:"CostChartRoot",children:[Object(o.jsxs)("div",{className:"Unit",children:[Object(o.jsx)("label",{children:"Unit"}),Object(o.jsx)("button",{onClick:function(){b(u===p?v:p)},children:u?u.toUpperCase():""})]}),Object(o.jsx)("div",{children:Object(o.jsxs)("p",{children:["Price: ",n," USD"]})}),Object(o.jsxs)(f.f,{height:300,width:700,onMouseLeave:function(){return F([])},children:[Object(o.jsx)(f.c,{data:u===p?S:D,onNearestX:function(t,e){F([t])}}),Object(o.jsx)(f.e,{title:"Amount to withdraw (".concat(u.toUpperCase(),")"),tickFormat:V}),Object(o.jsx)(f.g,{title:"Cost (".concat(u.toUpperCase(),")"),tickFormat:V}),Object(o.jsx)(f.b,{tickValues:[M()]}),Object(o.jsx)(f.d,{tickValues:[u===p?T(m):T(m)/H()],style:x}),Object(o.jsx)(f.a,{values:w,itemsFormat:function(t){return t.map((function(t){return{title:"Cost",value:new Intl.NumberFormat("en",{maximumFractionDigits:2}).format(t.y)}}))},children:Object(o.jsx)(h,{crosshairValues:w,formatValue:function(t){return u===p?W(t):new Intl.NumberFormat("en",{maximumFractionDigits:2}).format(t)},getWithdrawalCost:M,unit:u})})]})]})},g=(n(354),function(){return Object(o.jsx)("div",{className:"Main",children:Object(o.jsx)(C,{})})});var w=function(){return Object(o.jsx)(g,{})},F=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,357)).then((function(e){var n=e.getCLS,c=e.getFID,r=e.getFCP,s=e.getLCP,a=e.getTTFB;n(t),c(t),r(t),s(t),a(t)}))};a.a.render(Object(o.jsx)(r.a.StrictMode,{children:Object(o.jsx)(w,{})}),document.getElementById("root")),F()}},[[355,1,2]]]);
//# sourceMappingURL=main.9b5c9255.chunk.js.map