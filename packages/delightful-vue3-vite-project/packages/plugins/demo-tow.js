;(function (global) {
  'use strict'
  // 闭包的写法
  var MyPlugin = function (value) {
    var val = value
    var reg = {
      phone: /^1[3456789]\d{9}$/,
      number: /^-?\d*\.?\d+$/,
    }
    // 返回一个对象， new 调用，就是它
    return {
      getRegs() {
        return reg
      },
      setRegs(params) {
        reg = { ...reg, ...params }
      },
      isPhone() {
        reg.phone.test(val) && console.log('这是手机号')
        // 返回 this，实现链式调用
        return this
      },
      isNumber() {
        reg.number.test(val) && console.log('这是数字')
        return this
      },
    }
  }

  // 函数自执行将 this（全局下为window）传入，并在其下面挂载方法
  global.MyPlugin = MyPlugin
  // 兼容CommonJs规范导出
  if (typeof module !== 'undefined' && module.exports) module.exports = MyPlugin
})(this)
