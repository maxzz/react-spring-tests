var h=Object.defineProperty,b=Object.defineProperties;var y=Object.getOwnPropertyDescriptors;var f=Object.getOwnPropertySymbols;var v=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable;var m=(n,e,t)=>e in n?h(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,a=(n,e)=>{for(var t in e||(e={}))v.call(e,t)&&m(n,t,e[t]);if(f)for(var t of f(e))x.call(e,t)&&m(n,t,e[t]);return n},p=(n,e)=>b(n,y(e));import{R as c,u as g,a as N,j as l,b as s,c as w,d as O,e as R}from"./vendor.57c051f6.js";const j=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))d(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&d(i)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}};j();function L(){const[n,e]=c.useState(!1),[t,{width:d}]=g(),[r,{width:o}]=g(),i=N({x:n?d-o-2:0,config:p(a({},O.wobbly),{mass:.2,clamp:!0})});return l("div",{className:"w-full h-96 grid grid-rows-[auto,minmax(0,1fr)] bg-red-400",children:[s("div",{className:"flex justify-end",children:s("button",{className:"px-4 py-2 bg-red-400 border border-red-800 rounded active:scale-[.97]",onClick:()=>{e(!n)},children:"Run"})}),s("div",{ref:t,className:"mt-4 p-1 border border-dotted",children:s(w.div,{ref:r,style:a({},i),className:"w-32 h-20 border rounded-md bg-purple-400/50 border-purple-800"})})]})}function u(){const[n,e]=c.useState(!1);return l("div",{className:"w-full h-96 grid grid-rows-[auto,minmax(0,1fr)] bg-red-400",children:[s("button",{className:"px-4 py-2 bg-red-400 border border-red-800 rounded",onClick:()=>e(!n),children:"Open case 01"}),n&&s("div",{className:"",children:"11"})]})}function S(){return s(c.Fragment,{children:s("div",{className:"h-screen grid place-items-center bg-[salmon] text-red-800",children:l("div",{className:"mx-4 grid grid-cols-[repeat(2,minmax(400px,1fr))] gap-4",children:[s(L,{}),s(u,{}),s(u,{}),s(u,{})]})})})}R.render(s(c.StrictMode,{children:s(S,{})}),document.getElementById("root"));