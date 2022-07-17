# vue2 响应式核心原理实现

vue 的核心功能就是实现了数据到模板的**响应式系统**----修改数据，vue 自动执行副作用（更新 DOM、执行监听器等），从而让开发者从手动处理 DOM 更新的繁琐中解脱出来。

今天就来实现一个响应式系统核心，完全实现 vue 的响应式系统，还是一个很复杂的一项工程，本文只实现核心部分和三个指令：`{{}}`、`v-model`和`@click`。

vue 2 中，是利用 Object.defineProperty 来重新定义 vue 实例上的属性，从而实现的**响应式系统**的。

主要涉及属性：

- enumerable，属性是否可枚举，默认 false。

- configurable，属性是否可以被修改或者删除，默认 false。

- get，获取属性的方法。

- set，设置属性的方法。

响应式基本原理：在 Vue 的构造函数中，对 vue 对象的 options 进行二次定义，即在初始化 vue 实例的时候，对 data、props、methods 等对象的每一个属性都通过 Object.defineProperty 定义一次，在数据被修改时，可在 set 中执行某些操作，比如更新视图、执行一个监听器等。

## myVue 实现

```js
function MyVue(options = {}) {
  // vue 组件选项赋值给 $options
  this.$options = options
  // options 的 data 给 this_data
  const data = (this._data = options.data ?? {})
  //监听 data
  observe(data)

  Object.keys(data).forEach(key => {
    //NOTE 重新定义 this，实现 this 代理 this._data
    // 即 this.a 获取的值是  this._data.a
    Object.defineProperty(this, key, {
      enumerable: true,
      get() {
        return this._data[key]
      },
      set(newValue) {
        this._data[key] = newValue
      },
    })
  })

  // 初始化计算属性
  initComputed.call(this)
  // 初始化实例方法
  initMethods().call(this)
  // 编译模板即使得 vue 对象和 dom 模板产生关联，更新 vue 实例的属性，模板才会更新
  new Compile(options.el, this)
}
```

## 看 initMethods 和 initComputed

```js
function initComputed() {
  const vm = this
  const { computed } = vm.$options ?? {}
  Object.keys(computed).forEach(key => {
    Object.defineProperty(vm, key, {
      get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
      set: computed[key] === 'function' ? computed[key] : computed[key].set,
    })
  })
}

function initMethods() {
  const vm = this
  const { methods = {} } = vm.$options
  Object.keys(methods).forEach(key => {
    vm[key] = methods[key]
  })
}
```

在 myVue 中，调用 initMethods 和 initComputed 传递 this 特别重要：需要将方法和计算属性代理到实例上。

```js
// 初始化计算属性
initComputed.call(this)
// 初始化实例方法
initMethods().call(this)
```

## compile 是模板编译函数

```js
function Compile(el, vm) {
  vm.$el = document.querySelector(el)
  const compileElement = compileTemplate(vm)
  vm.$el.appendChild(compileElement)
}
```

这里使用 DOM 查询 代替模板编译。

`compileTemplate`是很关键的函数，稍后再看。

## 如何观察 data 的变化？

`observe`的作用是监听 data 的变化，然后执行某些操作。

```js
// NOTE 要求 data 必须是一个对象
function observe(dataObj) {
  if (typeof dataObj !== 'object') {
    // NOTE 监听对象上的属性
    return //dataObj
  }
  return new Observe(dataObj)
}

function Observe(data) {
  const dep = new Dep()
  // NOTE 新增的属性，不存在 get 和 set，故不能新增
  Object.keys(data).forEach(key => {
    let value = data[key]
    observe(value)
    Object.defineProperty(data, key, {
      enumerable: true,
      get() {
        // NOTE 订阅
        Dep.target && dep.addSub(Dep.target) // [watcher]
        return value
      },
      set(newValue) {
        // 新值和老值相同，啥都不做
        if (newValue === value) {
          return
        }
        value = newValue
        // NOTE 这样写爆栈
        // data[key] = newValue

        // NOTE 监听 data.key = { key:'value'}
        // 实现深度监听
        observe(newValue)
        // 发布
        dep.notify()
      },
    })
  })
}
```

`Observe`的作用就是重新定义`data`的每一个属性，嵌套的对象属性也得到了处理。

每监听一个对象，都需要进行依赖收集，`const dep = new Dep()`

依赖收集的实现采用了发布于订阅模式。

```js
function Dep() {
  this.watchers = []
}

// 订阅
Dep.prototype.addSub = function (watcher) {
  this.watchers.push(watcher)
}
// 发布
Dep.prototype.notify = function () {
  this.watchers.forEach(watcher => {
    watcher.update()
  })
}
```

在`get`收集依赖（订阅），在`set`检测到依赖变化，进行发布。

```js
get() {
  // NOTE 订阅
  Dep.target && dep.addSub(Dep.target) // [watcher]
  return value
},
set(newValue) {
  // 新值和老值相同，啥都不做
  if (newValue === value) {
    return
  }
  value = newValue
  // NOTE 这样写爆栈
  // data[key] = newValue
  // NOTE 监听 data.key = { key:'value'}
  // 实现深度监听
  observe(newValue)
  // 发布
  dep.notify()
},
```

`Watcher`用于监听 vue 实例属性，当属性有变化时，会执行 fn。

```js
function Watcher(vm, propAttrs, fn) {
  // fn(newValue)
  this.fn = fn
  this.vm = vm
  this.propAttrs = propAttrs
  // 使用一个全局对象，表明当前存在需要收集的依赖
  Dep.target = this
  let val = vm
  propAttrs.forEach(key => {
    val = val[key]
  })
  Dep.target = null
}

Watcher.prototype.getUpdatedValue = function () {
  let value = this.vm
  this.propAttrs.forEach(key => {
    value = value[key]
  })
  return value
}

Watcher.prototype.update = function () {
  this.fn(this.getUpdatedValue())
}
```

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h4a2hzckb8j20ma052dgd.jpg)

fn 是在模板编译阶段传入的更新函数，该函数将模板和 Watcher 连接起来，比如模板里使用`v-model`指令，在 fn 中就要更新`node`的 value，检测到`@`指令，就要去处理事件。

本教程只实现`{{}}`、`v-model`和`@`这三个指令，指令的解析在模板编译阶段进行：

```js
function compileTemplate(vm) {
  const fragment = document.createDocumentFragment()
  while ((child = vm.$el.firstElementChild)) {
    fragment.appendChild(child)
  }
  bindValueToTemplate(fragment, vm)

  function bindValueToTemplate(fragment, vm) {
    if (!vm) {
      throw new Error('bindValueToTemplate 缺少 vm')
    }
    Array.from(fragment.childNodes).forEach(node => {
      const text = node.textContent

      const reg = /\{\{(.*)\}\}/g
      if (node.nodeType === 1) {
        // 元素节点
        const nodeAttrs = Array.from(node.attributes)
        nodeAttrs.forEach(attr => {
          const { name, value: prop } = attr
          if (name.indexOf('@') === 0) {
            const eventName = name.substring(1)
            let handleName = prop.substring(0, prop.indexOf('('))
            let params = prop.substring(prop.indexOf('(') + 1, prop.indexOf(')')).split(',')
            if (!prop.includes('(')) {
              handleName = prop
              params = []
            }
            // 处理箭头函数绑定
            if (prop.includes('=>')) {
              if (prop.includes('{')) {
                const body = prop.substring(prop.indexOf('{') + 1, prop.indexOf('}'))
                node.addEventListener(eventName, event => {
                  const handler = new Function('event', body)
                  handler(event)
                })
                return
              } else {
                const body = prop.split('=>')[1]
                node.addEventListener(eventName, event => {
                  const handler = new Function('event', body)
                  handler(event)
                })
                return
              }
            }
            // 不能直接绑定函数，需要处理 this
            // node.addEventListener(eventName, vm[prop])
            node.addEventListener(eventName, event => {
              const _params = params.map(item => {
                const { data, computed } = vm.$options
                const value = isDataKey(data, item)
                  ? vm[item]
                  : isComputed(computed, item)
                  ? typeof computed[item] === 'function'
                    ? computed[item].call(vm) // 处理 this
                    : computed[item].get.call(vm) // 处理 this
                  : !Number.isNaN(+item)
                  ? +item
                  : item
                return value
              })
              // NOTE 拿不到 arguments
              // console.log(vm[handleName].arguments)
              if (_params.length) {
                vm[handleName](..._params)
              } else {
                // console.log(handleName)
                vm[handleName](event)
              }
            })
          }
        })
        if (reg.test(text)) {
          let val = vm
          // NOTE 关键 处理了 a.b
          const propAttrs = RegExp.$1.split('.')
          propAttrs.forEach(key => {
            val = val[key]
          })
          // NOTE 技巧
          new Watcher(vm, propAttrs, updatedValue => {
            console.log('fn', updatedValue)
            node.textContent = text.replace(reg, updatedValue)
          })
          node.textContent = text.replace(reg, val)
        } else if (!text) {
          // 处理 v-model
          const nodeAttrs = Array.from(node.attributes)
          nodeAttrs.forEach(attr => {
            const { name, value: prop } = attr
            if (name.indexOf('v-') === 0) {
              // NOTE 处理 v-mode="a.b"
              let val = vm
              const propAttrs = prop.split('.')
              propAttrs.forEach(key => {
                val = val[key]
              })
              node.value = val
              // 监听属性更改
              new Watcher(vm, propAttrs, updatedValue => {
                // NOTE 修改属性时自动更新 input 的 value
                node.value = updatedValue
              })

              node.addEventListener('input', function (event) {
                const value = event.target.value
                // NOTE 处理 v-mode="a.b"
                let currentValue = vm
                let lastProp = propAttrs[0]
                propAttrs.forEach((key, index) => {
                  if (index <= propAttrs.length - 1) {
                    lastProp = key
                    if (index <= propAttrs.length - 2) {
                      currentValue = currentValue[key]
                    }
                  }
                })
                currentValue[lastProp] = value
              })
            }
          })
        }
      }
      if (node.childNodes) {
        bindValueToTemplate(node, vm)
      }
    })
  }
  return fragment
}
```

关键是`bindValueToTemplate`的实现，这里只处理元素节点类型，比较简单。

看`{{}}`的处理：

```js
const reg = /\{\{(.*)\}\}/g
if (reg.test(text)) {
  let val = vm
  // NOTE 关键  处理类似  <p>{{a.b}}</p>
  // 获取到内层属性值
  const propAttrs = RegExp.$1.split('.')
  propAttrs.forEach(key => {
    val = val[key]
  })
  // NOTE 为何需要这个语句？
  node.textContent = text.replace(reg, val)

  // NOTE 技巧
  new Watcher(vm, propAttrs, updatedValue => {
    node.textContent = text.replace(reg, updatedValue)
  })
}
```

为何需要执行`node.textContent = text.replace(reg, val)`?

首次挂载组件时需要将 vue 实例中的属性绑定到页面上，否则会看到这样的情况：

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h4a3o29j8bj20nq0fsaaz.jpg)

`{{}}`中的属性值没有被替换。

```js
new Watcher(vm, propAttrs, updatedValue => {
  node.textContent = text.replace(reg, updatedValue)
})
```

`Watcher`的第三个参数，就是 vue 实例属性更新时，需要执行的函数。

我们可将其提取成一个函数：

```js
const reg = /\{\{(.*)\}\}/g
if (reg.test(text)) {
  let val = vm
  // NOTE 关键  处理类似  <p>{{a.b}}</p>
  // 获取到内层属性值
  const propAttrs = RegExp.$1.split('.')
  propAttrs.forEach(key => {
    val = val[key]
  })
  const updateText = val => {
    node.textContent = text.replace(reg, val)
  }
  updateText(val) // 第一次挂载组件时，执行这里
  new Watcher(vm, propAttrs, updateText) // 监听属性，执行 updateText
}
```

`v-model`的处理，是`input`事件和`node.value = newValue`的结合。

```js
// 处理 v-model
const nodeAttrs = Array.from(node.attributes)
nodeAttrs.forEach(attr => {
  const { name, value: prop } = attr
  if (name.indexOf('v-') === 0) {
    // NOTE 处理 v-mode="a.b"
    let val = vm
    const propAttrs = prop.split('.')
    propAttrs.forEach(key => {
      val = val[key]
    })
    node.value = val
    // 监听属性更改
    new Watcher(vm, propAttrs, updatedValue => {
      // NOTE 修改属性时自动更新 input 的 value
      node.value = updatedValue
    })

    node.addEventListener('input', function (event) {
      const value = event.target.value
      // NOTE 处理 v-mode="a.b"
      let currentValue = vm
      let lastProp = propAttrs[0]
      propAttrs.forEach((key, index) => {
        if (index <= propAttrs.length - 1) {
          lastProp = key
          if (index <= propAttrs.length - 2) {
            currentValue = currentValue[key]
          }
        }
      })
      currentValue[lastProp] = value
    })
  }
})
```

`@`的处理直接看代码即可。

## 总结

vue2 响应式原理使用`Object.defineProperty`重新定义属性，在 getters 中收集依赖，在 setters 检查依赖更新，然后在通知 watcher 执行 render 更新模板。

[demo 演示](https://jackchoumine.github.io/vue2-core-reactivity/)

## 参考

[Vue 2.x 相关原理](https://weirshi.com/framework/Vue/2.x/vue.html#vue%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)

[Vue2 原理浅谈](https://juejin.cn/post/6844903506621497358)
