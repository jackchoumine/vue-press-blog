// eslint-disable
;(function (global) {
  'use strict'

  var MyPlugin = function (el) {
    return new MyPlugin.prototype.init(el)
  }

  MyPlugin.prototype = {
    init: function (el) {
      this.el = typeof el === 'string' ? document.querySelector(el) : el
    },
    setBg: function (bg) {
      this.el.style.background = bg
      return this
    },
    setWidth: function (w) {
      this.el.style.width = w
      return this
    },
    setHeight: function (h) {
      this.el.style.height = h
      return this
    },
  }

  MyPlugin.prototype.init.prototype = MyPlugin.prototype
  // script标签引入插件后全局下挂载一个 $ 的方法
  global.$ = MyPlugin
})(this || window)
