"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e,t){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.tippet=t()}(void 0,function(){var e,t=function e(t){var n=".tippet {\n      position: absolute;\n      display: inline-block;\n      padding: 20px;\n      max-width: 20em;\n      background-color: "+("dark"===t?"#333":"#fff")+";\n      color: "+("dark"===t?"#EEE":"#333")+";\n      border-radius: 3px;\n      font: inherit;\n      font-size: 0.75em;\n      line-height: 1.5em;\n      box-shadow: 0 1px 3px -1px rgba(0,0,0,.33);\n    }\n    *[data-tippet] {\n      cursor: help;\n    }\n    .tippet img {\n      width: 100%;\n    }",o=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css",i.styleSheet?i.styleSheet.cssText=n:i.appendChild(document.createTextNode(n)),o.appendChild(i)},n={position:function t(n){var o=window.innerWidth,i=window.innerHeight,d=n.pageX+(e.offsetWidth+10)>o,p=n.pageY+(e.offsetHeight+10)>i,r="\n      left: "+(d?-e.offsetWidth-10:10)+"px;\n      top: "+(p?-e.offsetHeight-10:10)+"px;\n      transform: translate3d("+n.pageX+"px, "+n.pageY+"px, 0);\n    ";e.style=r},show:function t(n){var i=document.createElement("div"),d='<div id="Tippet" class="tippet">'+n+"</div>";i.innerHTML=d;var p=i.childNodes[0];document.body.appendChild(p),e=p,o()},hide:function e(){document.getElementById("Tippet").remove()},render:function e(){var t=this.getAttribute("data-tippet");n.show(t)},init:function e(n){t(n?n:"light"),o()},update:function e(){o()}},o=function e(){for(var t=document.querySelectorAll("[data-tippet]"),o=0;o<t.length;o++)t[o].onmouseenter=n.render,t[o].onmousemove=n.position,t[o].onmouseleave=n.hide};return n.init(),n});