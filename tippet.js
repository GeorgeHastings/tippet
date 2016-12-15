'use strict';

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.tippet = factory());
}(this, function () {

var el;
var theme = {background: '#fff', text: '#333'};

var genStyleSheet = function() {
  var css = `
    .tippet {
      position: absolute;
      display: inline-block;
      padding: 20px;
      max-width: 20em;
      border-radius: 3px;
      font: inherit;
      font-size: 0.75em;
      line-height: 1.5em;
      box-shadow: 0 1px 3px -1px rgba(0,0,0,.33);
    }
    *[data-tippet] {
      cursor: help;
    }
    .tippet * {
      width: 100%;
    }`;
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
};

var getBaseStyle = function(theme) {
  return `background-color: ${theme.background}; color: ${theme.text};`;
};

const tippet = {
  position: function(event) {
    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    var offPageRight = event.pageX + (el.offsetWidth + 10) > winWidth;
    var offPageBottom = event.pageY + (el.offsetHeight + 10) > winHeight;
    var style = `
      left: ${offPageRight ? -el.offsetWidth - 10 : 10}px;
      top: ${offPageBottom ? -el.offsetHeight - 10 : 10}px;
      transform: translate3d(${event.pageX}px, ${event.pageY}px, 0);
      ${getBaseStyle(theme)}
    `;
    el.style = style;
  },

  show: function(content) {
    var wrap = document.createElement('div');
    var tip = `<div id="Tippet" class="tippet">${content}</div>`;
    wrap.innerHTML = tip;
    var newTip = wrap.childNodes[0];
    document.body.appendChild(newTip);
    el = newTip;
    bindEvents();
  },

  hide: function() {
    document.getElementById('Tippet').remove();
  },

  render: function() {
    var content = this.getAttribute('data-tippet');
    tippet.show(content);
  },

  init: function(setTheme) {
    theme = setTheme ? setTheme : theme;
    genStyleSheet();
    bindEvents();
  },

  update: function() {
    bindEvents();
  }
};

var bindEvents = function() {
  var tippets = document.querySelectorAll('[data-tippet]');
  for (var i = 0; i < tippets.length; i++) {
    tippets[i].onmouseenter = tippet.render;
    tippets[i].onmousemove = tippet.position;
    tippets[i].onmouseleave = tippet.hide;
  }
};

tippet.init();

return tippet;
}));
