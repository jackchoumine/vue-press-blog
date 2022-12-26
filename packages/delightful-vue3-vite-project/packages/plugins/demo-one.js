;(function (global) {
  'use strict'
  // 立即执行函数写法
  // console.log(global)
  var MyPlugin = function (name) {
    this.name = name
  }

  MyPlugin.prototype = {
    say: function () {
      console.log('欢迎你：', this.name)
    },
    random: function (min = 0, max = 1) {
      if (min <= Number.MAX_SAFE_INTEGER && max <= Number.MAX_SAFE_INTEGER) {
        return Math.floor(Math.random() * (max - min + 1)) + min
      }
    },
  }

  // 函数自执行将 this（全局下为window）传入，并在其下面挂载方法
  global.MyPlugin = MyPlugin
  // 兼容CommonJs规范导出
  if (typeof module !== 'undefined' && module.exports) module.exports = MyPlugin
})(this)
