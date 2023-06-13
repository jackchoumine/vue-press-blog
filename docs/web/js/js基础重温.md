# JS 基础

## script 标签

① 简单的代码包裹在`script`标签中，复杂的代码通过 src 引入，可充分使用浏览器缓存，其他页面使用到相同的脚本，会从缓存中获取；

② `type` 和 `language` 不再是必需的特性（attribute）;

> 关于 defer 和 async 属性

![关于 defer 和 async 属性](https://html.spec.whatwg.org/images/asyncdefer.svg '来自 HTML5 规范')

- async 的加载不会阻碍 DOM 的解析，但是当加载完后就会立即执行，执行时会阻碍 DOM 的解析

- defer 的加载也不会阻碍 DOM 的解析，并且会在 DOM 解析完后、DOMContentLoaded 触发之前执行

::: tip 提示
将 defer 脚本放在 head 标签内，不会阻塞页面解析，但是脚本执行时页面还没加载完毕。
:::

> 动态插入 script 标签呢？

根据下列步骤判断

1. 没有 src 属性，文档加载完成后执行；

2. 有 src 属性，有 defer 属性，无 async 属性，同 1；

3. 有 src 属性，有 defer 属性，有 async 属性，添加完毕，立即加载立即执行；

4. 有 src 属性，没有 defer 属性，有 async 属性，添加完毕，立即加载立即执行，即同 3；

5. 有 src 属性，没有 defer 属性，没有 async 属性，插入 script 的脚本执行完，马上加载后立即执行。

> 一般使用 defer 脚本动态插入 async 脚本。

> defer 脚本和 DOMContentLoaded 执行顺序？

当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载。

`defer` 脚本会在 DOMContentLoaded 之前执行。

> 页面的生命周期？

参考：

[How do JavaScript Page Lifecycle Events work?](https://tilomitra.com/html-page-lifecycle-events/)

[你不知道的 DOMContentLoaded](https://zhuanlan.zhihu.com/p/25876048)

[Running Your Code at the Right Time](https://www.kirupa.com/html5/running_your_code_at_the_right_time.htm)

## 关于严格模式

为何要有严格模式？

> 弥补语言设计上的遗留缺陷，如果使用 es6，不必担心这个问题。

JS 不断向前发展，加入了新特性，一些语言上的缺陷在后来暴露出来，但是 JS 已经运行在很多产品里了，ES5 使用 `use strict` 指令来指定 JS 按照现代的模式工作，也不会影响旧的代码。

① 生效条件：代码顶部，`use strict` 用在文件顶部和函数顶部才能生效，其他地方不生效。

② 没有取消严格模式的指令。

③ 代码会自动启动严格模式吗？使用`class`、`modules`等新特性时，自动启用严格模式。

严格模式下的一些变化：

- 将过失转为语法错误或者异常

  ① 意外创建全局变量，抛出错误；

  ② 不允许对象属性重复；

  ③ 重复的参数名，提示语法错误；

  ④ 禁用八进制;但在 ES6 中使用`0o`表示八进制；

  ⑤ 引发静默失败，某些赋值操作，不报错也无效果，比如给 NaN、undefined 赋值；

  ⑥ 试图删除不可删除的属性时会抛出异常；

- 让 `eval` 和`arguments` 更简单

  ① 名称 eval 和 arguments 不能通过程序语法被绑定(be bound)或赋值；

  ② 参数的值不会随 arguments 对象的值的改变而变化；

  ③ 不再支持 arguments.callee。

- 更加安全

  ① this 不再被封装为对象，而且如果没有指定 this 的话它值是 `undefined`；下面代码全部输出`true`

  ```js
  'use strict'
  function fun() {
    return this
  }
  console.log(fun() === undefined)
  console.log(fun.call(2) === 2)
  console.log(fun.apply(null) === null)
  console.log(fun.call(undefined) === undefined)
  console.log(fun.bind(true)() === true)
  ```

  ② arguments 不会再提供访问与调用这个函数相关的变量的途径。

- 给未来的 ES 铺平道路

  ① 保留了一些关键词；

  ② 禁止条件声明函数。

## 数据类型

`string`、`number`、`bigint`、`boolean`、`null`、`undefined`、`symbol`、`object`。
七种基本类型和一种引用类型。

```js
typeof Symbol('id') // "symbol"

typeof Math // "object"  (1)

typeof null // "object"  (2)

typeof alert // "function"  (3)
```

> typeof null 的结果是 "object"。这是官方承认的 typeof 的行为上的错误，`null` 不是对象。

> typeof alert 的结果是 "function"，函数隶属于 object 类型。

> 使用 `typeof` 检查基本类型值和函数，以字符串的形式返回类型。

类型转换：
常见的三种转换
转为 string:发生在内容输出的时候，可通过`String(value)` 显示转换。

转为 number:进行算术运算时，可通过 `Number(value)` 显示转换。

|    值     |                              转为                               |
| :-------: | :-------------------------------------------------------------: |
| undefined |                               NaN                               |
|   null    |                                0                                |
|   true    |                                1                                |
|   false   |                                0                                |
|  string   | 删除头尾空格，读取数字，若含有非数字，转为`NaN`，空字符串转为 0 |

```js
console.log(Number('12')) //12
console.log(Number('12l')) //NaN
console.log(Number('')) // 0
```

> 字符串转为数字，推荐使用`Number.parseInt`、`Number.parseFloat`，它们能真正解析字符串里的数字。

```js
console.log(Number.parseFloat('2.35.242l')) // 2.35
console.log(Number.parseFloat('2l.35.242l')) // 2
console.log(Number.parseInt('2.35.242l')) // 2
console.log(Number.parseInt('2l.35.242l')) // 2
console.log(Number.parseInt('l.35.242l')) // NaN
```

> 从前往后解析，直到遇到第一个非数字字符停止。如果第一个字符就是非数字字符，返回`NaN`。

还可使用 **正号** `+` 转为字符串为数字，其优先级高于二元运算符：

```js
console.log(+'2l.35.242l') // NaN
console.log(+'2') // 2
console.log(+'2.345') // 2.345
console.log(+'') // 0
console.log(typeof +'') // 0
console.log(+true) // 1
```

> 如何区别 `+` 字符符连接还是数字求和？

`只要其中一个操作数为字符串，就把另外一个转为字符串。`

```js
console.log(2 + '2') // '2' + '2' → 22
console.log(2 + 1 + '2') // (2 + 1) + '2' → 32
console.log(2 + '1' + '2') // '21' + '2' → 212
console.log(2 + 1 + true) // 3 + 1 → 4
console.log(true + false) // 1 + 0 → 1
console.log(6 / '3') // 2
console.log('2' * '3') // 6
console.log('  -9  ' + 5) // '  -9  5'
console.log('  -9  ' - 5) // -14
console.log('  2-9  ' - 5) // NaN
```

转为布尔值：在进行逻辑运算时转为，也可以使用 `Boolean(value)` 显示转换。

|           值            | boolean |
| :---------------------: | :-----: |
| 0,null,undefined,'',NaN |  false  |
|          其他           |  true   |

几个特殊值注意：

```js
console.log(Boolean(' ')) // true
console.log(Boolean('0')) // true
```

> 使用 `!!` 将变量转为布尔值，更为简洁。

## 值比较

JS 可对数字和字符比较大小。

`>`、`<`、`===`、`!=`、`==`、`>=`、`<=`，比较运算返回一个布尔值。

强相等`===`不会转换类型，`==`会换类型。

```js
'' === false // false
'' == false // true
0 === false // false
0 == false // true
```

> NaN 不与任何值相等。 `NaN == NaN` false。

> 奇怪的 null undefined：在 `>`、`<`、`<=`、`>=`比较中，null 转为 0，undefined 转为 NaN。

```js
console.log('在 <= >= > < 中 null 转为 0')
console.log(null >= 0) // true
console.log(null <= 0) // true
console.log(0 <= 0) // true
console.log(null > 0) // false
console.log(null === 0) // false
console.log(0 === 0) // true
console.log(null == 0) // false <= >= 都为true， == 却为 false，因为
console.log(0 == 0) // true

console.log('在 <= >= < > 中 undefined 转为 NaN')
console.log(undefined >= 0) // false
console.log(undefined <= 0) // false
console.log(undefined > 0) // false
console.log(undefined === 0) // false
```

最佳实践：

> 使用 `===`，可能 `undefined`、`null` 参与的比较，格外小心；

`undefined === null` false，不符合预期。

> 不要使用 `>=`、`>`、`<`、`<=` 去比较一个可能为 `null`、`undefined` 的变量。对于取值可能是 `null`、`undefined` 的变量，请按需要分别检查它的取值情况。

```js
console.log(null === null) // true
console.log(typeof undefined === 'undefined') // true
console.log(undefined === undefined) // true
console.log(undefined === void 0) // true
```

总结：

- 比较运算符始终返回布尔值。
- 字符串的比较，会按照 “词典” 顺序逐字符地比较大小。
- 当对不同类型的值进行比较时，它们会先被转化为数字（不包括严格相等检查）再进行比较。
- **在 == 下，null 和 undefined 相等且各自不等于任何其他的值**。 这符合我们的预期。
- 在使用 > 或 < 进行比较时，需要注意变量可能为 null/undefined 的情况。比较好的方法是单独检查变量是否等于 null/undefined。

> 哪些操作会引发类型转换？

①. 字符串拼接

②. `==` 语句

③. 条件判断和逻辑判断

> 尤其小心后台返回的数据。

## 空值合并 ---- ??

空值合并运算符 ?? 提供了一种简洁的方式获取列表中 “已定义” 的值。

> 注意区别 false 、0 '' 等已定义的值和 null undefined 的区别。

```js
let height = height ?? 100;
let height = (height !== null && height !== void 0) ? 100;
```

?? 运算符的优先级非常低，只略高于 ? 和 =。

没有明确添加括号，不能将其与 || 或 && 一起使用。
