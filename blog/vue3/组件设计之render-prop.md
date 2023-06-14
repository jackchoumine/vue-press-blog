# advanced-vue-component-design 之 render-prop

总结实用（项目里能马上用到的）的 vue 组件设计方法，让封装组件更加容易，代码更加好维护。

> [demos 预览](https://jackchoumine.github.io/advanced-vue-component-design-demos/)

## render-prop

render-prop，顾名思义，就是从组件 prop 提供一个 render 函数，在组件内部进行渲染，在 react 这种设计方法很常见，vue 一样支持。

[react 中如何使用 renderProp](https://jackchoumine.github.io/react/render-props.html)

[vue2 如何使用 renderProp](https://jackchoumine.github.io/vue2/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8render%E5%87%BD%E6%95%B0%E5%B0%81%E8%A3%85%E9%AB%98%E6%89%A9%E5%B1%95%E7%9A%84%E7%BB%84%E4%BB%B6.html#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8-render-%E6%94%B9%E5%96%84%E7%BB%84%E4%BB%B6)

## vue3 如何使用 renderProp

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h4bht1q5ipj21b607eq3o.jpg)

这是 vue2 使用 renderProp 实现是一个组件，现在用 vue3 语法改写。

安装依赖

`npm i @vitejs/plugin-vue-jsx`

修改 vite.config.js 配置：

```js
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
  plugins: [vueJsx()],
})
```

添加`Container.jsx`容器组件，接收 renderProp 和 data

```js
// render 函数和 react 的一样
const Container = props => {
  return props.render(props.data)
}
export default Container
```

FormTable.vue 的实现:

```html{20-25,39-40,109-125}
<template>
  <div class="j-form-table">
    <div v-if="hasTitleSlot" class="j-form-table-title-box">
      <slot name="title"></slot>
    </div>
    <div v-else-if="title" class="j-form-table-title-box">
      <span class="title-text">{{ title }}</span>
    </div>
    <ul v-if="titleList.length">
      <li
        v-for="(item, index) in titleInfo"
        :key="index"
        :style="{ width: ((item.span || 1) / titleNumPreRow) * 100 + '%' }"
      >
        <div class="j-form-table-title" :style="`width: ${_titleWidth}px;`">
          <Container v-if="typeof item.title === 'function'" :render="item.title" :data="data" />
          <span v-else>{{ item.title }}</span>
        </div>
        <div class="j-form-table-key" :style="`width:calc(100% - ${_titleWidth}px);`">
          <Container v-if="typeof item.prop === 'function'" :render="item.prop" :data="data" />
          <!-- NOTE 为何不直接如下这样写？ Container 可能包含逻辑较多，故提取成组件 -->
          <!-- <span v-if="typeof item.prop === 'function'">
            {{ item.prop(data) }}
          </span> -->
          <span v-else>{{ (![null, void 0].includes(data[item.prop]) && data[item.prop]) || '' }}</span>
        </div>
      </li>
    </ul>
    <div v-else class="j-form-table-no-data">暂无数据</div>
  </div>
</template>

<script setup>
  import Container from './Container.jsx'
  import clone from 'clone'
  import { copyText } from './utils'
  import { useSlots, computed } from 'vue'

  const slots = useSlots()
  const hasTitleSlot = computed(() => !!slots.title)

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    titleWidth: {
      type: Number,
      default: 120,
    },
    titleNumPreRow: {
      type: Number,
      default: 3,
      validator: value => {
        const validate = [1, 2, 3, 4, 5, 6].includes(value)
        if (!validate) {
          console.error('titleNumPreRow 表示一行有标题字段对,只能时 1 -- 6 的偶数,默认 3')
        }
        return validate
      },
    },
    titleList: {
      type: Array,
      default: () => {
        return []
      },
      validator: value => {
        const validate = value.every(item => {
          const { title, prop } = item
          return title && prop
        })
        if (!validate) {
          console.log('传入的 titleList 属性的元素必须包含 title  和 prop 属性')
        }
        return validate
      },
    },
    data: {
      type: Object,
      default: () => {
        return {}
      },
    },
  })

  const titleInfo = computed(() => {
    // NOTE 使用 JSON.stringify 深度复制丢失方法,此处勿用
    // const titleInfo = JSON.parse(JSON.stringify(this.titleList))
    const titleInfo = clone(props.titleList)
    if (titleInfo.some(item => !!item.span)) {
      // NOTE 如何用户有设置每个标题的宽度,就不适配最后一个
      return titleInfo
    }
    const titleNumPreRow = props.titleNumPreRow
    const remainder = titleInfo.length % titleNumPreRow
    if (1 === remainder) {
      titleInfo[titleInfo.length - 1].span = titleNumPreRow
    }
    if (1 < remainder && remainder < titleNumPreRow) {
      titleInfo[titleInfo.length - 1].span = titleNumPreRow - remainder + 1
    }
    return titleInfo
  })

  const _titleWidth = computed(() => {
    // NOTE $formTableOptions 是全局配置
    return props.titleWidth ? props.titleWidth : props.$formTableOptions?.titleWidth
  })

const vCopy = {
  mounted(el, bindings) {
    const { value = false } = bindings
    const textContent = el.textContent.trim()
    // 没有内容，不复制
    if (value && textContent) {
      el.fn = () => {
        copyText(textContent)
      }
      el.classList.add('zm-copy')
      el.addEventListener('click', el.fn, false)
    }
  },
  unmounted(el, bindings) {
    el.removeEventListener('click', el.fn)
  },
}
</script>

<style lang="scss">
  //NOTE 不加 scoped 方便在父组件使用 j-form-table 修改内部样式
  .j-form-table {
    div,
    ul,
    li {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    background-color: #fff;
    margin: 20px 0;
    &-title-box {
      display: flex;
      align-items: center;
      height: 46px;
      box-sizing: border-box;
      background-color: #fff;
      padding: 5px 10px;
      .title-text {
        display: inline-block;
        font-weight: bolder;
        font-size: 16px;
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding: 0;
      border-top: 1px solid#ebeef5;
      border-left: 1px solid #ebeef5;
      li {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;

        .j-form-table-title {
          display: flex;
          box-sizing: border-box;
          display: inline-block;
          justify-content: flex-end;
          height: 100%;
          min-height: 39px;
          padding: 0 10px;
          align-items: center;
          background-color: #cdcdcd3f;
          border-right: 1px solid#ebeef5;
          border-bottom: 1px solid #ebeef5;
          font-weight: 700;
          color: #606266;
          text-align: right;
          font-size: 14px;
          line-height: 39px;
          word-wrap: break-word;
        }

        .j-form-table-key {
          box-sizing: border-box;
          display: inline-block;
          height: 100%;
          min-height: 39px;
          padding: 0 10px;
          border-right: 1px solid#ebeef5;
          border-bottom: 1px solid #ebeef5;
          font-size: 14px;
          line-height: 39px;
          word-wrap: break-word;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    &-no-data {
      border: 1px solid #ebeef5;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin-bottom: 20px;
    }
    .zm-copy {
      cursor: copy;
    }
  }
</style>
```

有哪些变化，主要是 js 部分，模板和样式都不变。

使用方式：

```html{26}
<template>
  <FormTable title="使用例子" :data="data" :titleList="titleList" />
</template>
<script setup lang="jsx">
import { ref } from 'vue'
const img = 'https://tva1.sinaimg.cn/large/008i3skNgy1gu9gco1hdbj605k05kgll02.jpg'

const data = ref({
  name: 'LiHei',
  image: img,
  job: 'web dev',
  salary: '3000',
  address: '四川省成都市成华区十里店寺庙',
  education: '本科',
  isGood: 1,
})

const titleList = ref([
  { title: '姓名', prop: 'name' },
  {
    title: '头像',
    // 自定义 title 属性值
    titleTips: data => {
      return (data.image && '生成图，点击放大') || '暂无头像'
    },
    prop: data => {
      return (
        <div style={{ width: '150px', height: '150px' }}>
          <img src={data.image} alt='我的头像：超级无敌美丽' />
        </div>
      )
    },
  },
  {
    title: '职业',
    prop: 'job',
  },
  {
    title: '月薪',
    prop: data => {
      return <span>{data.salary + '$'}</span>
    },
  },
  {
    title: '住址',
    prop: 'address',
    span: 2,
  },
  {
    title: '学历',
    prop: 'education',
    span: 1,
  },
  {
    title: '是否统招',
    prop: data => {
      const map = { 0: '否', 1: '是' }
      return <span>{map[data.isGood]}</span>
    },
    span: 2,
  },
])
<script>
```

> 两个注意：

1. script 标签加`lang="jsx"`

否则报错：`Internal server error: Failed to parse source for import analysis because the content contains invalid JS syntax. Install @vitejs/plugin-vue to handle .vue files.`

2. render 函数的第一个不再是 h

```js
{
  prop: data => {
      return (
        <div style={{ width: '150px', height: '150px' }}>
          <img src={data.image} alt='我的头像：超级无敌美丽' />
        </div>
      )
    },
}
```

3. 局部指令的写法变了

```js
const vCopy = {
  mounted(el, bindings) {
    const { value = false } = bindings
    const textContent = el.textContent.trim()
    // 有内容，才复制
    if (value && textContent) {
      el.fn = () => {
        copyText(textContent)
      }
      el.classList.add('zm-copy')
      el.addEventListener('click', el.fn, false)
    }
  },
  unmounted(el, bindings) {
    el.removeEventListener('click', el.fn)
  },
}
```

[详见文档](https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks)
