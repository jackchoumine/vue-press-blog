# vue 组件封装

本文记录一下 Vue 组件封装的基本实践和一些组件的相关知识。主要涉及以下知识点：

- 封装一个组件的代码组织形式；
- vue 组件的三大核心：
  - 属性（props、data）;
  - 事件
  - 插槽
- 样式
- 其他一些杂项
  - \$nextTick 函数的使用
  - 获取 DOM 元素及在父级组件中执行子组件方法

使用第三方计数库 [countup.js](https://inorganik.github.io/countUp.js/) 创建一个 `count-to` 组件对以上知识进行总结。

<!-- more -->

## 文件组织形式

在组件文件夹 `component` 下创建一个与组件名相同的文件，文件夹内必须有 `index.js`,并将组件导入到该文件中，这样方便我们引用组件。

`count-to` 文件夹内：

```js
// index.js
import CountTo from './count-to.vue'
export default CountTo
```

使用组件时，只需这样引入：

```js
import CountTo from '_c/count-to' // _c 是组件存放路径
```

## Vue 组件的三大核心

### 属性（props、data 和样式）

props 定义了组件`可配置`的数据，确定的组件的核心功能。封装组件时，props 推荐写成对象形式，方便对数据进行验证，提高了代码健壮性也能明确如何使用。

常见的检查类型：`Number`、`String`、`Boolean`、`Array`、`Object`、`Date`、`Function`、`Symbol`、`构造函数`。`null|undefined` 会通过所有类型。

还可以自定义验证函数，指定是否必须和默认值。

```js
props:{
	// 多个可能的类型
  propB: [String, Number],
	// 必填的字符串
  propC: {
    type: String,
    required: true
  },
  // 带有默认值的数字
  propD: {
    type: Number,
    default: 100
  },
  // 带有默认值的对象
  propE: {
    type: Object,
    // 对象或数组默认值必须从一个工厂函数获取
    default: function () {
      return { message: 'hello' }
    }
  },
  // 自定义验证函数
  propF: {
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return ['success', 'warning', 'danger'].indexOf(value) !== -1
    }
  }
}
```

通过阅读 [countUP 文档](https://github.com/inorganik/CountUp.js)，了解到构造函数`CountUp` 的参数

```js
CountUp(eleDOM, startValue, endValue, decimals, duration, options) // eleDOM 是数值显示的元素；endValue 是数值的最终值，这两个参数必须的。
```

组件代码如下：

```html
<template>
  <div>
    <span :id="eleId"></span>
  </div>
</template>
<script>
  import CountUp from 'countup'
  export default {
    name: 'CountTo',
    props: {
      /**
       * @description 起始值
       */
      startValue: {
        type: Number,
        default: 0
      },

      /**
       * @description 终止值
       */
      endValue: {
        type: Number,
        required: true
      },
      /**
       * @description 小数点后保留几位小数（精度）
       */
      decimals: {
        type: Number,
        default: 0
      },
      /**
       * @description 渐变时长(秒)
       */
      duration: {
        type: Number,
        default: 1
      },
      /**
       *@description 变速效果
       */
      useEasing: {
        type: Boolean,
        default: false
      },
      /**
       *@description 分组
       */
      useGrouping: {
        type: Boolean,
        default: true
      },
      /**
       *@description 分组符号 2,2234
       */
      separator: {
        type: String,
        default: ','
      },
      /**
       *@description 整数小数分隔符 34.56
       */
      decimal: {
        type: String,
        default: '.'
      },
      /**
       * @description  动画延迟（秒）
       */
      delay: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {}
    },
    computed: {
      eleId() {
        // 使用 this.uid 生成组件内唯一id
        return `count_up_uid${this._uid}`
      }
    },
    mounted() {
      // TODO: this.$nextTick
      this.$nextTick(() => {
        let options = {
          useEasing: this.useEasing,
          useGrouping: this.useGrouping,
          separator: this.separator,
          decimal: this.decimal
        }
        this.counter = new CountUp(this.eleId, this.startValue, this.endValue, this.decimals, this.duration, options)
      })
    }
  }
</script>
```

代码说明：
`this._uid` 用于生成`组件内唯一`的 id 值，可用作元素的 id，值是递增的。

`this.$nextTick` 函数接收一个回调函数作为参数，回调函数会在 `DOM更新` 之后执行，如果某些操作必须在 DOM 更新之后，可将这些操作作为其参数。

计数组件的基本功能就满足了。

这样使用组件：

```html
<template>
  <div>
    <count-to :end-value="endValue" :decimals="decimals" :duration="5" title="这个会挂载到组件根元素上"></count-to>
  </div>
</template>
<script>
  import CountTo from '_c/count-to'
  export default {
    name: 'count_to',
    components: {
      CountTo
    },
    data() {
      return {
        endValue: 4000,
        decimals: 2,
        className: ''
      }
    }
  }
</script>
```

```html
<count-to :end-value="endValue" :decimals="decimals" :duration="5"></count-to>
```

prop 的命名：

组件中使用`小驼峰`命名，传递值是使用`-`。

关于 props 传递静态值：

不使用 `v-bind` 即 `:` 传递的是静态值，是一个字符串字常量，而不是变量，而使用`:`指令传递的值，是有类型的。`:duration="5"` 传递是 数值 5，`duration="5"` 传递字符串`'5'`。
`duration="true"` 传递的是字符串`true` 而不是 Boolean 值真值。

默认值：

传递是引用类型的值（对象和数组），默认值需要使用一个工厂函数返回一个引用类型的值。

inheritAttrs：

如果传递一个组件中没有声明的属性，该属性会挂载都组件元素上，可在组件中将 `inheritAttrs` 设置为 `false` 取消这一行为。上面的 `title` 属性会挂载到组件的 `div` 上。该属性不应 style 和 class 的传递。

```html
<count-to
  title="会挂载到组件的根元素上"
  test="test"
  :end-value="endValue"
  :decimals="decimals"
  :duration="5"
></count-to>
```

title 会成为`count-to` 组件的根元素的属性：

```html
<div title="这是标题" test="测试">
  <span id="count_up_uid14">10,000.00</span>
</div>
```

\$attrs 接收没有声明的属性

title 和 test 属性没有在组件中声明，依然可以在组件中使用 `attrs` 接收到些属性：
`<span>没有props接收的父组件数据：{{$attrs}}</span><br/>`

最后的结果：

```html
<div title="这是标题" test="测试">
  <span>没有props接收的父组件数据：{ "title": "这是标题", "test": "测试" }</span>
  <br />
  <span id="count_up_uid14">10,000.00</span>
</div>
```

inheritAttrs: false 和 \$attrs 结合使用：

**有了 inheritAttrs: false 和 \$attrs，你就可以手动决定这些特性会被赋予哪个元素，而不需要声明变量接收**。

<p class="codepen" data-height="551" data-theme-id="0" data-default-tab="js,result" data-user="JackZhouMine" data-slug-hash="yWZdRv" style="height: 551px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="$attrs使用">
  <span>See the Pen <a href="https://codepen.io/JackZhouMine/pen/yWZdRv/">
  $attrs使用</a> by JackZhouMine (<a href="https://codepen.io/JackZhouMine">@JackZhouMine</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component is="script" async src="https://static.codepen.io/assets/embed/ei.js"></component>

#### data vs props

props 从父级组件入，传入的值由父级组件维护，不允许在子组件中**直接操作**,是否必需和数据类型都是确定的，我们不能改变。

data 是组件内部维护的状态，组件可直接操作，可随时改变值、类型等。

相同点：都是组件的属性，改变两者都会响应到模板上。

#### 打破 props 单向数据流

Vue 不允许在子组件中**直接操作** props ,否则会报错，因为父组件和子组件都可直接操作 props，会使得 props 的管理变得混乱。可通过一些间接的方式操作 props:

1. 将 props 赋值给 data ，然后操作 data;

2. 在计算属性中返回 props;

以上两种方式，修改后的值，是不能会响应到父组件的，想要在父级组件中也看到修改，需要用到下面的方式：

3. .sync 和 \$emit 结合

传递 props 时加上 `.sync` 修饰符，在子组件内部使用 `$emit` 更新 props。

使用 `.sync` 需要注意：

- 不能和表达式一起使用：`v-bind:title.sync="doc.title + '!'"`;
- 不能传递对象字面量：`v-bind.sync="{ title: doc.title }"`。

4. 传递引用类型的 props

传递数组和对象，在子组件中修改他们，会直接反应到父组件上。

### 事件

传统的 web 开发使用事件驱动：

- 查询节点 → 绑定事件监听；
- 用在页面上触发事件 → 执行监听器，修改 DOM,反馈到页面上；
  这种模式开发效率低成本高。

Vue 的核心思想是数据驱动，视图由数据决定。MVVM 架构的页面变化流程：

View(用户操作) → 执行 DOMlistenrs (ViewModel) → Data 改变 （Model）→ View 改变。

组件和绑定原生事件和自定义事件，绑定原生事件时，需要添加`native`修饰符。

可以在组件的原生事件处理器中触发一个自定义事件，就能在父级组件中监听该事件，执行相关操作。

在 `count-to` 声明一个 `changeValue` 事件：

增加一个按钮：

```html
<button @click="add">+</button>
```

在事件处理器`add`中触发一个自定义事件：

```js
add() {
	this.$emit("changeValue", Math.random() * 100);
}
```

`$emit` 的第一个参数是事件名称，第二个参数是传递到该事件监听器的参数。

在组件上监听 `changValue`:

```html
<template>
  <div>
    <count-to :end-value="endValue" :decimals="decimals" :duration="5" @changeValue="changeValue"></count-to>
  </div>
</template>
<script>
  import CountTo from '_c/count-to'
  export default {
    name: 'count_to',
    components: {
      CountTo
    },
    data() {
      return {
        endValue: 4000,
        decimals: 2
      }
    },
    methods: {
      changeValue(value) {
        this.endValue += value
      }
    }
  }
</script>
```

自定义一个更新结束事件：

```html
<script>
  import CountUp from 'countup'
  export default {
    name: 'CountTo',
    methods: {
      getCount() {
        // 使用 id 获取 DOM
        let span = document.getElementById(this.eleId)
        let currentValue = Number.parseFloat(span.innerText.split(',').join(''))
        return currentValue.toFixed(this.decimals)
      },
      emitEnd() {
        this.$emit('on-end', this.getCount())
        // this.$emit('on-end', this.endValue) 使用 endValue 不是 库处理后的值，所有使用 DOM 元素获取更新后的值
      }
    },
    // 监听 props 属性的变化
    watch: {
      endValue(newValue) {
        // update 是库的方法
        this.counter.update(newValue)
        setTimeout(() => {
          this.emitEnd()
        }, this.duration * 1000 + 2)
      }
    }
  }
</script>
```

在组件上使用监听`on-end`:

```html
<template>
  <div>
    <count-to :end-value="endValue" :decimals="decimals" :duration="5" @on-end="endUp"></count-to>
  </div>
</template>
<script>
  import CountTo from '_c/count-to'
  export default {
    name: 'count_to',
    components: {
      CountTo
    },
    data() {
      return {
        endValue: 4000,
        decimals: 2
      }
    },
    methods: {
      // 更新接收后，会触发自定义事件，然后执行该函数
      endUp(value) {
        console.log('endValue => ', value)
      }
    }
  }
</script>
```

#### 表单修饰符

- lazy ： 在`change`事件同步数据；
- trim ： 删除首尾空格；
- number ：只能输入数字；

#### 事件修饰符

- stop：阻止冒泡；
- prevent :阻止默认行为；

```html
<!-- 阻止单击事件继续传播 -->
<a v-on :click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on :submit.prevent="onSubmit"></form>
<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>
```

### 插槽

props 传递普通的数据类型，插槽提供了`传递 HTML 代码`的方式，父组件中给的插槽内容，会被放置到子组件的指定为位置。

父组件决定是否显示插槽和怎样显示，子组件决定插槽显示的位置。

三种插槽：

- 匿名插槽；
- 命名插槽；
- 作用域插槽。

我们现在想要在 数值左边显示一个从父级组件传递到组件中的文字提示，数值右边显示人民币符号。

可使用插槽接收文字提示和人民币符号：

```html
<template>
  <div>
    <!-- 匿名插槽 找不到放置的位置，就放在这里-->
    <slot></slot>
    <span :id="eleId"></span>
    <slot name="right"></slot>
    <!-- 命名插槽-->
  </div>
</template>
```

在父级组件传递插槽内容：

```html
<template>
  <div>
    <count-to :end-value="endValue" :decimals="decimals" :duration="5">
      <span>金额：</span>
      <span slot="right">￥</span>
    </count-to>
  </div>
</template>
```

最后的 html 是这样的：

```html
<div>
  <span>金额：</span>
  <span id="count_up_uid13">4,000.00</span>
  <span>￥</span>
</div>
```

不传递插槽内容时，可以在组件中设置一个默认的插槽内容：

```html
<template>
  <div>
    <slot>奖金额度：</slot>
    <span :id="eleId"></span>
    <slot name="right">￥</slot>
  </div>
</template>
```

父级组件的作用域和子组件的作用是独立的，在父级组件的插槽内容中，获取不到子组件的数据。

```html
<template>
  <div>
    <count-to :end-value="endValue" :decimals="parentDecimals" :duration="5">
      <span>精确到几位小数：{{parentDecimals}}</span>
      <span slot="right">{{decimals}}</span>
    </count-to>
  </div>
</template>
```

`parentDecimals` 是父级组件中的属性，插槽内容属于父级作用域，可获取父级的数据；
`decimals` 是子级组件中的属性，插槽内容属于父级作用域，获取不到值；

想要在父级插槽内容中获取子组件的数据，就需要用到作用域插槽。

现在想要把数值前面的文字从父级组件传递到子组件，并且还要传递文字的颜色：

```js
text: {
	name: "本月工资",
	color: "#F4D03F"
},
```

子组件这样定义：

```html
<template>
  <div>
    <!--向父级组件传递text 并起了名字-->
    <slot v-bind="text" name="left">奖金额度：</slot>
    <span :id="eleId" ref="number"></span>
    <slot name="right">元</slot>
  </div>
</template>
<script>
  import CountUp from 'countup'
  export default {
    name: 'CountTo',
    props: {
      // 增加 prop
      text: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>
```

这样使用组件：

```html
<template>
  <div>
    <count-to :end-value="endValue" :decimals="decimals" :duration="5" :text="text">
      <template slot-scope="data" slot="left">
        <span :style="{color:data.color}">{{data.name}}：</span>
      </template>
      <span slot="right">￥</span>
    </count-to>
  </div>
</template>
<script>
  import CountTo from '_c/count-to'
  export default {
    name: 'count_to',
    components: {
      CountTo
    },
    data() {
      return {
        text: {
          name: '本月工资',
          color: '#F4D03F'
        },
        endValue: 4000,
        decimals: 2
      }
    }
  }
</script>
```

`<slot v-bind="text">奖金额度：</slot>`，向父级组件传递数据；
`slot-scope="data"` 用来接收插槽传递到父组件的数据；

#### 新指令 v-slot

在 2.6.0 中，我们为具名插槽和作用域插槽引入了一个新的统一的语法 (即 v-slot 指令)。它取代了 slot 和 slot-scope 。

子组件：

```html
<template>
  <div>
    <!-- 向父级组件传递 textFromChild -->
    <slot :textFromChild="text" name="left">奖金额度：</slot>
    <span :id="eleId" ref="number"></span>
    <slot name="right">元</slot>
  </div>
</template>
<script>
  import CountUp from 'countup'
  export default {
    name: 'CountTo',
    props: {
      // 增加 prop
      text: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>
```

这样使用组件：

```html
<template>
  <div>
    <count-to :end-value="endValue" :decimals="decimals" :duration="5" :text="text">
      <template v-slot:left="{textFromChild}">
        <span :style="{color:textFromChild.color}">{{textFromChild.name}}：</span>
      </template>
      <span slot="right">￥</span>
    </count-to>
  </div>
</template>
```

子组件传递过来的变量被放置在一个对象中，使用解构赋值的方式提取出来。

```html
<template v-slot:left="{textFromChild}">
  <span :style="{color:textFromChild.color}">{{textFromChild.name}}：</span>
</template>
```

`v-slot` 指令后跟一个 slot 的名字，插槽具有名字时，可简写为`#`。

```html
<template #left="{textFromChild}">
  <span :style="{color:textFromChild.color}">{{textFromChild.name}}：</span>
</template>
```

不管有几个插槽，都把插槽内容放置在 `template` 中是很好的做法。

## 其他杂项

### 组件生成 id

使用`this_uid`其他字母，可成组件内唯一的 id。
`count-to`组件中，我们使用计算属性，设置 span 的 id。

```js
eleId() {
      // 使用 this.uid 生成全局唯一id
      return `count_up_uid${this._uid}`;
    },
```

在组件内部，可以通过 id 或者 class 等获取到 dom，但是不推荐这么做。可通过`ref` 属性，获取到`DOM`，更加简洁，并且可以直接通过`ref` 获取组件或者`DOM`元素。

在下面的函数中获取 DOM：

```js
    getCount() {
      // TODO: 获取 DOM
      // 使用 ref 属性获取 DOM 元素
      // console.log(this.$refs.number.innerText)
      // return this.$refs.number.innerText

      // 使用 id 获取 DOM
      let span = document.getElementById(this.eleId);
      let currentValue = Number.parseFloat(span.innerText.split(",").join(""));
      return currentValue.toFixed(this.decimals);
    },
```

### \$nextTick 函数的使用

`this.$nextTick` 接收一个回调函数作为参数，参数会在 Vue 完成 DOM 更新后立即调用。如果某些操作是依赖 DOM 更新后的，可以把这些操作放在回调函数里执行。

- 在 created 和 mounted 阶段，如果需要操作渲染后的试图，也要使用 nextTick 方法。
- mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.\$nextTick 替换掉 mounted。

`Vue.$nexttick` 全局的，`this.$nexttick` 是局部的。

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
vm.$el.textContent === 'new message' // false  此时DOM还没渲染
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})
```

Vue DOM 的更新是异步的，数据变化后，组件不会立即渲染，而是在事件队列刷新时，在下一个事件循环 `tick` 中渲染。

`$nexttick` 返回一个 Promise，可使用 `await` 关键词调用。

```js
methods: {
  updateMessage: async function () {
    this.message = '已更新'
    console.log(this.$el.textContent) // => '未更新'
    await this.$nextTick()
    console.log(this.$el.textContent) // => '已更新'
  }
}
```

### 在父级组件中调用子组件的方法

有时候需要再父级组件中调用子组件的方法。可以在使用组件时指定 `ref` ，然后使用 `ref` 调用。
比如调用组件的暂停方法，使得数据变化暂停。

在组件中定义暂停方法：

```html
<template>
  <div>
    <slot :textFromChild="text" name="left">奖金额度：</slot>
    <span :id="eleId" ref="number" :class="countClass"></span>
    <slot name="right">元</slot>
  </div>
</template>
<script>
  import CountUp from 'countup'
  export default {
    name: 'CountTo',
    data() {
      return {}
    },
    methods: {
      // TODO: 在父级组件中使用封装组件内部的方法
      // 在父级组件中调用该方法，实现暂停
      pause() {
        this.counter.pauseResume()
      }
    }
  }
</script>
```

在父组件中使用调用组件暂停方法。

```html
<template>
  <div>
    <count-to :end-value="endValue" :decimals="decimals" :duration="5" ref="countTo">
      <!-- 指定 ref -->
      <template #left="{textFromChild}">
        <span :style="{color:textFromChild.color}">{{textFromChild.name}}：</span>
      </template>
      <span slot="right">￥</span>
    </count-to>
    <button @click="pasue">暂停</button>
  </div>
</template>
<script>
  import CountTo from '_c/count-to'
  export default {
    name: 'count_to',
    components: {
      CountTo
    },
    data() {
      return {
        endValue: 4000,
        decimals: 2
      }
    },
    methods: {
      pasue() {
        // 使用 refs 访问组件，然后调用器方法
        this.$refs.countTo.pause()
      }
    }
  }
</script>
```

## 样式

组件使用样式，用三种方式：

- 外部样式；
- 内部样式；
- 通过 props 传入 类名，以指定使用内部样式中的哪个类名。

外部样式两种方法引入：
在 `script` 标签中引入和在 `style` 标签中引入。

```html
<template>
  <div>
    <slot :textFromChild="text" name="left">奖金额度：</slot>
    <!-- 将 props 中的类绑定到 class 上 -->
    <span :id="eleId" ref="number" :class="countClass"></span>
    <slot name="right">元</slot>
  </div>
</template>
<script>
  // 引入样式方法一：
  // import './count-to.css'
  import CountUp from 'countup'
  export default {
    name: 'CountTo',
    inheritAttrs: true, // 不让父作用域的属性挂载到组件的根元素上
    props: {
      /**
       * @description  自定义样式类名
       */
      className: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style lang="css">
  /* 引入样式方法二 */
  /* @import './count-to.css' */
  /*  内部样式 */
  .count-to-number {
    color: red;
    font-size: 30px;
  }
</style>
```

通过 props 传递类名，实际是在父级组件中指定使用内部样式中的哪个类。

通过 `style` 也可以应用样式到组件上。

## 关于组件的常见面试题

::: tip 面试题
$nextTick 原理是什么？
:::

## 总结

封装一个组件 props 和 data 决定了组件的核心功能，插槽用于向组件传递 html 标签，使得组件更加具有扩展性。通过事件我们可以对组件进行某些操作。改天分析一个第三方组件，好好体会一下这些概念。

## 参考

- [详解 vue 组件三大核心概念](https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&mid=2247483942&idx=1&sn=bb123cb4d34f94f79881f0fa226da26b&chksm=c06683b0f7110aa6baf6e8ab59870a10fbf9a07083910054a25e67e50d306985103570d88ca2&mpshare=1&scene=24&srcid=&key=ae82afc765e556e1414e399de49e6bc8869fd285d0066971f5cc9b598ff7de811cb0d815acce725f87095b807115ec769907ccf0085d396ef53cc02e077effe6860c3ee0bd74fdf19ca63f73b15a6ba4&ascene=14&uin=MTMzNjE2MjkyMg%3D%3D&devicetype=Windows+7&version=62060833&lang=zh_CN&pass_ticket=ErOTla1jgsmijn6aCklGP3WGqdRSH9bBBL5cgmhDAhNizyP7X0BxM9stZwgKIQOG)
- [简单理解 Vue 中的 nextTick](https://juejin.im/post/5a6fdb846fb9a01cc0268618)
- [vue.nextTick 的原理和用途](https://segmentfault.com/a/1190000012861862)
- [nextTick](https://ustbhuangyi.github.io/vue-analysis/reactive/next-tick.html#js-%E8%BF%90%E8%A1%8C%E6%9C%BA%E5%88%B6)
- [What the Tick is Vue.nextTick?](https://vuejsdevelopers.com/2019/01/22/vue-what-is-next-tick/)
- [vue 文档 Prop](https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81)
