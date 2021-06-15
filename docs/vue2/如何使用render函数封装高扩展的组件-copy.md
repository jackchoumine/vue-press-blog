# 如何使用 render 函数封装高扩展的组件

前面的文章有提到，vue 官网给出的 render 函数的例子只能体现 render 函数的优雅的一方面，却不能看出其扩展性，今天就来封装一个体现其扩展性的组件。

## 需求

后台管理中常常有如下布局的数据展示需求：

![](https://tva1.sinaimg.cn/large/008i3skNgy1grboa6ymuhj31wm0ekach.jpg 'Ant Design Vue Descriptions 描述列表')

像表格又不是表格，像表单又不是表单，实际上样子像表格，呈现的数据是一个对象，和 form 的绑定的值一样，我将其称为表单式表格。

样式深的列是标题，浅的列是标题对应的取值，数据往往是服务器返回的，标题往往是定宽的，取值可能各种各样，比如显示一张图片，值为 01，需要显示是与否，有时候需要添加一个修改按钮，让用户能修改某些值，还需要设置某一列跨越几列。

先来看看一个基于 element ui 的实现

## 不好的实现

在接手的项目看到一个实现，先看使用方式

```html
<FormTable :data="lessonPackageArr" :fleldsInfo="lessonPackageInfo" :maxColumn="3" label-width="120px">
  <template #presentedHours="{ data }">
    <div class="flex-box between">
      <span>
        {{ data.presentedHours }}
      </span>
      <span class="column-btn" @click="editPresentedHours(data)">修改</span>
    </div>
  </template>
  <template #gifts="{ data }">
    <div class="flex-box between">
      <span>
        {{ data.gifts }}
      </span>
      <span class="column-btn" @click="editPresentedHours(data)">修改</span>
    </div>
  </template>
</FormTable>
```

`lessonPackageInfo` 对象如下结构：

```js
// 一个对象，用于配置标题列和标题列对应的字段
// type 指定值的类型，现在组件内部设置可能显示哪些类型的值了
// 对于服务其返回 1 0 需要显示 是否的数，提供一个 map_data 来映射
// column 属性设置跨列
// 需要自定义显示内容 提供 slot
lessonPackageInfo: {
    orderType: { type: 'option', desc: '课时包类别', map_data: { 1: '首单', 2: '续费', 5: '赠课' } },
    combo: { type: 'text', desc: '套餐名称' },
    presentedHours: { type: 'text', desc: '赠送课时', slot: true },
    price: { type: 'text', desc: '标准价格' },
    gifts: { type: 'text', desc: '赠送礼物', column: 3, slot: true },
  }
```

> 1. props 不够直观，配置项多
> 2. 不是完全数据驱动

> 为何组件的配置项多不好？

对于这种需求很固定，组件的输入即 `props` 应该要最小化，组件功能要最大化，尽量给 props 提供默认值，这样才能提高团队的开发效率。

> 为何不是完全的数据驱动不好？

这个组件不是完全数据驱动的，需要自定义显示列是，需要编写模板。

如果需要自定义的列很多，就要写很多模板代码，想要再提取，只能再次封装组件，不提取，模板代码可能会膨胀，你可能经常看到动辄 500 行一行的 template ？而膨胀的模板代码，让组件维护变得困难，需要 template 和 js 代码之间来回切换。再者，增加一列自定义的数据，起码要修改两个地方。

> 为何需要完全的数据驱动？

虽然有 slot 来扩展组件，但是我们在写业务组件时候应该少用，而是尽量使用数据驱动模板。因为数据是 js 代码，当组件代码膨胀时，很容易把 js 代码提取成单独的文件， 而想要提取 slot 的代码，只能再封装组件。

> 三大前端框架的设计理念都是**数据驱动模板**，这是它们区别于 jQuery 的重要特征，也是我们封装业务组件时优先遵循的原则。

看了组件使用的问题，再看组件的代码：

```html
<template>
  <div v-if="tableData.length" class="form-table">
    <div v-for="(data, _) in tableData" :key="_" class="table-border">
      <el-row v-for="(row, index) in rows" :key="index">
        <el-col v-for="(field, key) in row" :key="key" :span="getSpan(field.column)">
          <div v-if="(field.disabled && data[key]) || !field.disabled" class="column-content flex-box between">
            <div class="label" :style="'width:' + labelWidth">
              <span v-if="field.required" class="required">*</span>
              {{ field.desc }}
            </div>
            <div class="text flex-item" :title="data[key]">
              <template v-if="key === 'minAge'">
                <span>{{ data[key] }}</span>
                -
                <span>{{ data['maxAge'] }}</span>
              </template>
              <template v-else-if="key === 'status'">
                <template v-if="field.statusList">
                  <span v-if="data[key] == 0" :class="field.statusList[2]">{{ field.map_data[data[key]] }}</span>
                  <span v-else-if="data[key] == 10 || data[key] == 34" :class="field.statusList[1]">
                    {{ field.map_data[data[key]] }}
                  </span>
                  <span v-else :class="field.statusList[0]">{{ field.map_data[data[key]] }}</span>
                </template>
                <span v-else>{{ field.map_data[data[key]] }}</span>
              </template>

              <slot v-else :name="key" v-bind:data="data">
                <TableColContent
                  :dataType="field.type"
                  :metaData="data[key]"
                  :mapData="field.map_data"
                  :text="field.text"
                />
              </slot>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <div v-else class="form-table empty">暂无数据</div>
</template>

<script>
  import TableColContent from '@/components/TableColContent'
  export default {
    name: 'FormTable',
    components: {
      TableColContent,
    },
    props: {
      // 数据
      data: {
        required: true,
        type: [Object, Array, null],
      },
      // 字段信息
      fleldsInfo: {
        required: true,
        type: Object,
        // className: { type: "text", desc: "班级名称", column: 3 },
      },
      // 最多显示列数
      maxColumn: {
        required: false,
        type: Number,
        default: 2,
      },
      labelWidth: {
        required: false,
        type: String,
        default: '90px',
      },
    },
    data() {
      return {}
    },
    computed: {
      tableData() {
        if (!this.data) {
          return []
        }
        if (this.data instanceof Array) {
          return this.data
        } else {
          return [this.data]
        }
      },
      rows() {
        const returnArray = []
        let total = 0
        let item = {}
        for (const key in this.fleldsInfo) {
          const nextTotal = total + this.fleldsInfo[key].column || 1
          if (nextTotal > this.maxColumn) {
            returnArray.push(item)
            item = {}
            total = 0
          }
          total += this.fleldsInfo[key].column || 1
          item[key] = this.fleldsInfo[key]
          if (total === this.maxColumn) {
            returnArray.push(item)
            item = {}
            total = 0
          }
        }
        if (total) {
          returnArray.push(item)
        }
        return returnArray
      },
    },
    methods: {
      getSpan(column) {
        if (!column) {
          column = 1
        }
        return column * (24 / this.maxColumn)
      },
    },
  }
</script>
```

> 有哪些问题？

1. 模板有太多的条件判断，不优雅

2. 自定义显示列，还需要在引入 `TableColContent`，增加了组件复杂性

`TableColContent` 内部还是对配置项的 `type` 进行条件判断

部分代码

```html{1}
<span v-else-if="dataType === 'image' || dataType === 'cropper'" :class="className">
  <el-popover placement="right" title="" trigger="hover">
    <img :src="metaData" style="max-width: 600px;" />
    <img slot="reference" :src="metaData" :alt="metaData" width="44" class="column-pic" />
  </el-popover>
</span>
```

分析完以上实现的问题，看看好的实现

## 好的实现

先看使用方式：

```html{14}
<template>
  <ZmFormTable :titleList="titleList" :data="data" />
</template>
<script>
  export default {
    name: 'Test',
    data() {
      return {
        data: {}, // 从服务器获取
        titleList: [
          { title: '姓名', prop: 'name', span: 3 },
          {
            title: '课堂作品',
            prop: (h, data) => {
              const img =
                (data.workPic && (
                  <ElImage
                    style='width: 100px; height: 100px;'
                    src={data.workPic}
                    preview-src-list={[data.workPic]}
                  ></ElImage>
                )) ||
                ''
              return img
            },
            span: 3,
          },
          { title: '作品点评', prop: 'workComment', span: 3 },
        ],
      }
    },
  }
</script>
```

组件说明：
`titleList`是组件的列配置，一个数组，元素 title 属性是标题，prop 指定从 data 里取值的字段，span 指定这列值跨越的行数。

prop 支持 string ，还支持函数，这是实现自定义显示的方式，当这个函数很大时，可提取到独立的 js 文件中，也可以把整个 titleList 提取单独的 js 文件中。

> 参数 h 和 data 是如何传递进来的？或者 这函数在哪调用呢？

> h 是 `createElement` 函数，data 是从组件内部的 data，和父组件传入的 data 是同一个值。

> 当普通函数的第一个参数是 h 是，它就是一个 render 函数。

这种方式使用起来简单多了。

看看内部实现

```html{17-20}
<template>
  <div class="form-table">
    <ul v-if="titleList.length">
      <!-- titleInfo 是经过转化的titleList-->
      <li
        v-for="(item, index) in titleInfo"
        :key="index"
        :style="{ width: ((item.span || 1) / titleNumPreRow) * 100 + '%' }"
      >
        <div class="form-table-title" :style="`width: ${titleWidth}px;`">
          <Container v-if="typeof item.title === 'function'" :renderContainer="item.title" :data="data" />
          <span v-else>
            {{ item.title }}
          </span>
        </div>
        <div class="form-table-key" :style="`width:calc(100% - ${titleWidth}px);`">
          <Container v-if="typeof item.prop === 'function'" :renderContainer="item.prop" :data="data" />
          <span v-else>
            {{ ![null, void 0].includes(data[item.prop] && data[item.prop]) || '' }}
          </span>
        </div>
      </li>
    </ul>
    <div v-else class="form-table-no-data">暂无数据</div>
  </div>
</template>

<script>
  import Container from './container.js'
  export default {
    name: 'FormTable',
    components: {
      Container,
    },
    props: {
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
    },
  }
</script>
<!-- 样式不是关键，省略 -->
```

> 实现自定义显示的方式，没有使用动态插槽，而是用一个函数组件`Container`，该组件接收一个 render 函数作为 prop。

```js{5}
export default {
  name: 'Container',
  functional: true,
  render(h, { props }) {
    return props.renderContainer(h, props.data)
  },
}
```

> 在 Container 内部调用 titleList 传入的函数。

[安装 npm 体验](https://www.npmjs.com/package/j-form-table)

> 打包后有 2.8M，很大啊，估计没有人用，就不优化了。

## 总结

1. 封装组件时优先考虑数据驱动

2. 普通函数的第一个参数是 h，就是渲染函数

3. 可能有一些人不习惯写 JSX, 可兼容两种写法
