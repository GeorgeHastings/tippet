'use strict';

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.tippet = factory());
}(this, function () {

let contents;
let theme = {background: '#02142B', text: '#fff'};

var genStyleSheet = function() {
  const css = `
    .tippet {
      position: absolute;
      display: inline-block;
      padding: 10px;
      max-width: 20em;
      border-radius: 3px;
      font: inherit;
      font-size: 0.75em;
      line-height: 1.5em;
      z-index: 9999;
      box-shadow: 0 1px 3px -1px rgba(0,0,0,.33);
    }
    .tippet * {
      width: 100%;
    }`;
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
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
  element: function() {
    if(document.getElementById('Tippet')) {
      return document.getElementById('Tippet');
    }
    else {
      const wrap = document.createElement('div');
      const tip = `<div id="Tippet" class="tippet">${contents}</div>`;
      wrap.innerHTML = tip;
      const newTip = wrap.childNodes[0];
      document.body.appendChild(newTip);
      return newTip;
    }
  },

  position: function(event) {
    const el = tippet.element();
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const offPageRight = event.pageX + (el.offsetWidth + 10) > winWidth;
    const offPageBottom = (event.pageY - document.body.scrollTop) + (el.offsetHeight + 10) > winHeight;
    const style = `
      left: ${offPageRight ? -el.offsetWidth - 10 : 10}px;
      top: ${offPageBottom ? -el.offsetHeight - 10 : 10}px;
      transform: translate3d(${event.pageX}px, ${event.pageY}px, 0);
      ${getBaseStyle(theme)}
    `;
    el.setAttribute('style', style);
  },

  show: function() {
    tippet.element().style.display = 'inline-block';
    bindEvents();
  },

  hide: function() {
    tippet.element().style.display = 'none';
  },

  render: function() {
    var content = this.getAttribute('data-tippet');
    contents = content;
    tippet.element().innerHTML = contents;
    tippet.show();
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
  const tippets = document.querySelectorAll('[data-tippet]');
  for (var i = 0; i < tippets.length; i++) {
    tippets[i].onmouseenter = tippet.render;
    tippets[i].onmousemove = tippet.position;
    tippets[i].onmouseleave = tippet.hide;
  }
};

tippet.init();

return tippet;
}));
