# vue 组件设计模式

## 当设计一个组件时，需要思考哪些方面才能保证组件扩展性和易用性？

一个组件就是封装了样式、模板和行为的模块。

### 样式

1. 内部样式设置权重低一点，方便在父组件覆盖。

常用的选择器的优先级是怎样的？如何计算优先级？

当一个元素匹配多个选择器，这些选择器里具有相同的样式属性，浏览器通过**选择器的优先级高低**来判断哪个属性值和元素的相关性，应用最优先级最高的那个属性值。

```html
<style>
  /* 0100 */
  #id-test {
    font-size: 30px;
  }
  /* 0010 */
  .name {
    font-size: 20px;
    color: blue;
  }
</style>
<div id="id-test" class="name">选择器优先级</div>
```

> div 匹配了`#id-test`和`.name`两个选择器，它们的都具有`font-size`属性，由于`#id-test`选择器的优先级为 100，而`.name`的优先级是 10，`#id-test`的`30px`被应用到`font-size`属性上，因此文本显示为大小为`30px`，颜色为蓝色。

给某种选择器一个权重，优先级由这些选择器的权重构成，当两个选择启动优先级相同时，后声明的选择器被应用到元素上。

常见的四种选择器的权重。

`ABCD`规则：

> inline 1000。可理解为 ABCD 为 1000。

> id 100。可理解为 ABCD 为 0100。

> class、属性选择器、伪类选择器： 10。可理解为 ABCD 为 0010。

> 元素、伪元素： 1。可理解为 ABCD 为 0001。

一个选择器可以由这些选择器组合而成，把所有权重加起来，就是该选择器的优先级。

```html
<div id="test">
  <span>Text</span>
</div>
<style>
  /* 1 +100 + 1  */
  div#test span {
    color: green;
  }
  /* 1 + 1 */
  div span {
    color: blue;
  }
  /* 1 */
  span {
    color: red;
  }
</style>
```

`div#test span`的优先级时 102，最大，文本显示绿色。

> 通配符选择器 （`*`），组合选择器 （`+、>、~、''、||`） 和否定伪类 （`:not()`） 对优先级没有影响。但是在`:not()`内部声明的选择器有影响。

> !important 是一种特殊的声明，它的级别高于其他所有的普通声明。慎用。

> 比较时，A, B, C, D 四位依次比较，A 较大的权重大，不用看后面。当 A 相同时，比较 B。以此类推。

> 当 A, B, C, D 相同时，后面的规则会覆盖前面的规则。

```html
<style>
  #id {
    /*权重为0，1，0，0*/
    background: red;
  }
  .c000.c001.c002.c003.c004.c005.c006.c007.c008.c009.c010.c011.c012.c013.c014.c015.c016.c017.c018.c019.c020.c021.c022.c023.c024.c025.c026.c027.c028.c029.c030.c031.c032.c033.c034.c035.c036.c037.c038.c039.c040.c041.c042.c043.c044.c045.c046.c047.c048.c049.c050.c051.c052.c053.c054.c055.c056.c057.c058.c059.c060.c061.c062.c063.c064.c065.c066.c067.c068.c069.c070.c071.c072.c073.c074.c075.c076.c077.c078.c079.c080.c081.c082.c083.c084.c085.c086.c087.c088.c089.c090.c091.c092.c093.c094.c095.c096.c097.c098.c099.c100.c101.c102.c103.c104.c105.c106.c107.c108.c109.c110.c111.c112.c113.c114.c115.c116.c117.c118.c119.c120.c121.c122.c123.c124.c125.c126.c127.c128.c129.c130.c131.c132.c133.c134.c135.c136.c137.c138.c139.c140.c141.c142.c143.c144.c145.c146.c147.c148.c149.c150.c151.c152.c153.c154.c155.c156.c157.c158.c159.c160.c161.c162.c163.c164.c165.c166.c167.c168.c169.c170.c171.c172.c173.c174.c175.c176.c177.c178.c179.c180.c181.c182.c183.c184.c185.c186.c187.c188.c189.c190.c191.c192.c193.c194.c195.c196.c197.c198.c199.c200.c201.c202.c203.c204.c205.c206.c207.c208.c209.c210.c211.c212.c213.c214.c215.c216.c217.c218.c219.c220.c221.c222.c223.c224.c225.c226.c227.c228.c229.c230.c231.c232.c233.c234.c235.c236.c237.c238.c239.c240.c241.c242.c243.c244.c245.c246.c247.c248.c249.c250.c251.c252.c253.c254.c255 {
    /*权重为0，0，256，0，并没有任何作用*/
    background: blue;
  }
  .test {
    display: block;
    height: 100px;
    width: 100px;
  }
</style>
<div
  id="id"
  class="test c000 c001 c002 c003 c004 c005 c006 c007 c008 c009 c010 c011 c012 c013 c014 c015 c016 c017 c018 c019 c020 c021 c022 c023 c024 c025 c026 c027 c028 c029 c030 c031 c032 c033 c034 c035 c036 c037 c038 c039 c040 c041 c042 c043 c044 c045 c046 c047 c048 c049 c050 c051 c052 c053 c054 c055 c056 c057 c058 c059 c060 c061 c062 c063 c064 c065 c066 c067 c068 c069 c070 c071 c072 c073 c074 c075 c076 c077 c078 c079 c080 c081 c082 c083 c084 c085 c086 c087 c088 c089 c090 c091 c092 c093 c094 c095 c096 c097 c098 c099 c100 c101 c102 c103 c104 c105 c106 c107 c108 c109 c110 c111 c112 c113 c114 c115 c116 c117 c118 c119 c120 c121 c122 c123 c124 c125 c126 c127 c128 c129 c130 c131 c132 c133 c134 c135 c136 c137 c138 c139 c140 c141 c142 c143 c144 c145 c146 c147 c148 c149 c150 c151 c152 c153 c154 c155 c156 c157 c158 c159 c160 c161 c162 c163 c164 c165 c166 c167 c168 c169 c170 c171 c172 c173 c174 c175 c176 c177 c178 c179 c180 c181 c182 c183 c184 c185 c186 c187 c188 c189 c190 c191 c192 c193 c194 c195 c196 c197 c198 c199 c200 c201 c202 c203 c204 c205 c206 c207 c208 c209 c210 c211 c212 c213 c214 c215 c216 c217 c218 c219 c220 c221 c222 c223 c224 c225 c226 c227 c228 c229 c230 c231 c232 c233 c234 c235 c236 c237 c238 c239 c240 c241 c242 c243 c244 c245 c246 c247 c248 c249 c250 c251 c252 c253 c254 c255">
  test 256
</div>
```

> 由于类型选择器和元素选择器的优先级较低，优先使用它们。

2. 通过类明预设一些可能的样式

比如布局组件，就是提前预设了一些类，通过在组件上使用不同的类进行布局。

### 模板

最好提供默认插槽，方便从父组件传递模板进来。作用域插槽向组件抛出数据。

#### 插槽的判断

'default' in $slots

> 二次封装组件如何暴露插槽？

### 组件行为

分为内部行为外部行为。

内部行为：组件内部执行，外部不需要感知到。

外部行为：父组件需要感知到，此往往需要抛出自定义事件，让父组件监听。

某些行为可分为前中后等几个阶段，可从父组件传递钩子进入子组件在特定阶段调用，方便组件使用者控制组件的行为。

比如某个业务组件内部调用 http 接口，可分为调用前（beforeHttp），成功后(onSuccess)等。

而钩子的参数（定义函数的地方）和钩子的返回值（调用函数的地方），钩子的参数和返回值把这两个地方联系起来了。

### 组件的 props 和 data

变化的部分提取到 props 中，不变的放在 data 里。

> 总结：

设计一个组件，通过默认的 prop、默认插槽等减少参数，提高易用性，但是提供更多的组件接口（props、行为钩子、插槽等）能提高扩展性，但是会降低易用性，需要在扩展性和易用性进行权衡。

## 异步组件

## v-once 确保静态内容只计算一遍

## 递归插槽

## 递归组件

## 动态指令

```html
<div id="dynamic-example">
  <h3>Scroll down inside this section ↓</h3>
  <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
</div>

<script>
  Vue.directive('pin', {
    bind: function (el, binding, vnode) {
      el.style.position = 'fixed'
      var s = binding.arg == 'left' ? 'left' : 'top'
      el.style[s] = binding.value + 'px'
    },
  })

  new Vue({
    el: '#dynamic-example',
    data: function () {
      return {
        direction: 'left',
      }
    },
  })
</script>
```

## 依赖注入（provide & inject）

## 事件检验

```js
export default {
  emits: ['inFocus', 'submit'], // 声明事件，不对其校验
}
```

对象声明方式可对事件进行校验：

```js
export default {
  emits: {
    myClick: null, // 不校验
    submit(payload) {
      // 通过返回值为 `true` 还是为 `false` 来判断
      // 验证是否通过
    },
  },
}
```

使用事件标注类型：

```js
import { defineComponent } from 'vue'

export default defineComponent({
  emits: {
    addBook(payload: { bookName: string }) {
      // 执行运行时校验
      return payload.bookName.length > 0
    },
  },
  methods: {
    onSubmit() {
      this.$emit('addBook', {
        bookName: 123, // 类型错误
      })

      this.$emit('non-declared-event') // 类型错误
    },
  },
})
```

`script setup`语法：

ts 类型声明

```ts
// const emits = defineEmits(['site-change', 'date-change', 'page-change', 'area-change'])
type Emit = {
  //NOTE  e 的值和 emit('eventName') 中的 eventName 要相同
  (e: 'site-change', sites: Option[]): void
  (e: 'dateChange', date: string | unknown[]): void
}
const emits = defineEmits<Emit>()
// emits('dateChange', newValue)
// emits('site-change', sites)
```
