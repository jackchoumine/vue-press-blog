/*
 * @Date        : 2022-11-09 12:43:19
 * @Author      : ZhouQiJun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-11-10 10:03:31
 * @Description :
 */
import { component, useState } from 'haunted'
import { html } from 'lit'

function Counter(props) {
  console.log('Counter')
  // 参数是组件本身
  console.log(props)
  const [count, setCount] = useState(+props.initCount)
  // const [inArray, setArray] = useState(array)

  // NOTE 自定义事件的触发
  // 使用监听函数获取 this
  const onClick = () => {
    // this 为自定义元素
    console.log(this)
    this.dispatchEvent(
      new CustomEvent('hello', {
        detail: { name: 'John' },
      })
    )
    setCount(count + 1)
  }
  const { testArray } = props
  console.table(testArray)
  console.log('render')
  return html/* html */ `
    <h2>haunted 测试</h2>
    <div id="count">${count}</div>
    <button type="button" id="my-btn" @click=${onClick}>Increment</button>
    <hr />
    <h4>测试数组property</h4>
    <ul>
      ${testArray?.map(item => html` <li>${item.name}</li> `)}
    </ul>
    <h4>测试对象property</h4>
    <p>name:${props.obj?.name}</p>
    <p>age:${props.obj?.age}</p>
  `
}
// property 到 attribute 的映射
// NOTE 设置 attribute 设置 kebab-case 命名，传递字符串
// 对应组件的 property 转为 camelCase 命名，还是传递字符串
Counter.observedAttributes = ['init-count']
// NOTE 想要传递数组和对象，如何设置？
// 不需要映射，在 vue 中使用 camelCase 风格绑定属性
// <my-counter :testArray.prop="frameworks"></my-counter>

// FIXME 如何按需导出和导入
customElements.define('my-counter', component(Counter))
