import{S as ne,P as se,W as ie,s as ae,R as re,a as v,b as S,T as l,c as _,B as h,M as r,d as s,e as ce,f as de,g as le}from"./vendor.b83e229c.js";const pe=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}};pe();var we="/homepage/assets/berserk.a2947b12.jpg",ge="/homepage/assets/chainsaw_man.9d76d5af.jpg",he="/homepage/assets/evangelion.03f3ce01.jpg",me="/homepage/assets/cowboy_bebop.51dc0894.jpg",fe="/homepage/assets/jojo.bc2bb736.jpg",ue="/homepage/assets/floor.ae9ba8e4.jpg",be="/homepage/assets/ceiling.739a6d1b.jpg";const L=75,P=20;function I(){let w=45;return window.innerHeight/window.innerWidth<=1?w:w-15}function ye(w){const e=new ne,i=new se(I(),window.innerWidth/window.innerHeight,.1,100),a=new ie({canvas:document.getElementById(w),antialias:window.devicePixelRatio<=1,powerPreference:"high-performance"});a.setPixelRatio(window.devicePixelRatio),a.setSize(window.innerWidth,window.innerHeight),a.setAnimationLoop(ee),a.outputEncoding=ae,i.position.set(0,5,-15),a.render(e,i),re.init();const o=new v(16711680,5,4,10);o.position.set(-5,5,5),e.add(o);const n=new v(65280,5,4,10);n.position.set(0,5,5),e.add(n);const c=new v(255,5,4,10);c.position.set(5,5,5),e.add(c),e.add(new S(o)),e.add(new S(n)),e.add(new S(c));const C=new l().load(ue,t=>{t.rotation=Math.PI/2,t.wrapT=t.wrapS=_}),m=new h(P,.1,L),O=new r({map:C,roughness:.5,metalness:0}),x=new s(m,O);x.position.z=-m.parameters.depth/2+5,e.add(x);const K=new l().load(be,t=>{t.wrapT=t.wrapS=_}),N=new r({map:K,roughness:1,metalness:0}),u=new s(m,N);u.position.y=12,u.position.z=-m.parameters.depth/2+5,e.add(u);const W=P/2,p=new h(.1,12,L),b=new r({color:3232417,roughness:.5,metalness:0}),j=new s(p,b);j.position.set(-W,p.parameters.height/2,-p.parameters.depth/2+5);const T=new s(p,b);T.position.set(W,p.parameters.height/2,-p.parameters.depth/2+5);let B=[j,T];e.add(...B);let R=new h(1,1,L),D=new r({color:7358259,roughness:.5,metalness:0});const q=t=>{let d=new s(R,D);d.position.copy(t.position),d.position.y=R.parameters.height/2,e.add(d)};B.forEach(q);const M=new h(P,12,.01),y=new s(M,b);y.position.z=5.05,y.position.y=M.parameters.height/2,e.add(y);const U=new ce(1.5,.5,64,8),V=new r({color:16777215,roughness:.1,metalness:.2}),f=new s(U,V);f.position.set(0,5,0),e.add(f),i.lookAt(f.position);const g=new h(.1,8,8),J=new l().load(we),Q=new l().load(he),X=new l().load(ge),Y=new l().load(fe),Z=new l().load(me),E=new s(g,new r({map:J,roughness:.7}));E.position.set(9.9,6.5,-10);const H=new s(g,new r({map:Q,roughness:.7}));H.position.set(-9.9,6.5,-20);const z=new s(g,new r({map:X,roughness:.7}));z.position.set(9.9,6.5,-30);const A=new s(g,new r({map:Y,roughness:.7}));A.position.set(-9.9,6.5,-40);const k=new s(g,new r({map:Z,roughness:.7}));k.position.set(9.9,6.5,-50);let F=[E,H,z,A,k];e.add(...F);const $=t=>{let d=new de(16777215,.07,100,-1,1,10),te=t.position.x+(t.position.x<0?3:-3);d.position.set(te,12,t.position.z),d.target=t,e.add(d)};F.forEach($);function G(){const t=document.body.getBoundingClientRect().top;i.position.z=t*.01-15}document.body.onscroll=G,G();function ee(t){f.rotation.y=t/1e3,i.position.x=Math.sin(t/1e3),a.render(e,i)}function oe(){a.setSize(window.innerWidth,window.innerHeight),i.aspect=window.innerWidth/window.innerHeight,i.fov=I(),i.updateProjectionMatrix()}window.onresize=oe}var ve="/homepage/assets/cv.1e4b7e13.pdf";document.getElementById("cv-pdf").href=ve;le.isWebGLAvailable()?ye("bg"):document.getElementById("webgl-warning").classList.add("show-warning");
