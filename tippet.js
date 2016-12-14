'use strict';

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.tippet = factory());
}(this, function () {

var el;

var genStyleSheet = function(theme) {
  var css = `.tippet {
      position: absolute;
      display: inline-block;
      padding: 20px;
      max-width: 20em;
      background-color: ${theme === 'dark' ? '#333' : '#fff'};
      color: ${theme === 'dark' ? '#EEE' : '#333'};
      border-radius: 3px;
      font: inherit;
      font-size: 0.75em;
      line-height: 1.5em;
      box-shadow: 0 1px 3px -1px rgba(0,0,0,.33);
    }
    *[data-tippet] {
      cursor: help;
    }
    .tippet img {
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

  init: function(theme) {
    genStyleSheet(theme ? theme : 'light');
    bindEvents();
  },

  update: function() {
    bindEvents();
  }
};

var bindEvents = function() {
  var tips = document.querySelectorAll('[data-tippet]');
  for (var i = 0; i < tips.length; i++) {
    tips[i].onmouseenter = tippet.render;
    tips[i].onmousemove = tippet.position;
    tips[i].onmouseleave = tippet.hide;
  }
};

tippet.init();

return tippet;
}));
