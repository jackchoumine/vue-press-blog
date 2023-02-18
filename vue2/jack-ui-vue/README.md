# jack-ui-vue

封装基于 vue2 的组件库。

## 搭建开发环境

```bash
vue create jack-ui-vue
```

修改目录：

1. 移动 components 到根目录

2. 把 src 改成 examples

修改项目入口：

package.json

```json
"serve": "vue-cli-service serve examples/main.js",
```

不修改，可能会报错：`This relative module was not found: * ./src/main.js in multi `

[How can I tell Vue-cli where my app's entrypoint is?](https://stackoverflow.com/questions/52841790/how-can-i-tell-vue-cli-where-my-apps-entrypoint-is)

测试改动是否成功：`npm run serve`。

最后的目录结构：

```bash
.
├── .browserslistrc
├── .eslintrc.js
├── .gitignore
├── .prettierrc.cjs
├── README.md
├── babel.config.js
├── components
│   └── HelloWorld.vue
├── examples
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   └── main.js
├── package-lock.json
├── package.json
└── public
    ├── favicon.ico
    └── index.html
```

在 components 下编写组件，在 examples 下测试组件，主要关心这个两个目录。

## 开发组件

在 components 下新建 `button`目录，然后新建一个`JButton.vue` 和 `index.js`,

index.js 用于导出组件：

```js
import JButton from './JButton.vue'

JButton.install = Vue => {
  Vue.component(JButton.name, JButton)
  return Vue
}

export default JButton
```

> 为何要添加`install`方法？

能组件能通过`Vue.use`实现全局注册，从而实现按需引入部分组件。

`JButton.vue`

```html
<template>
  <div>
    <button><slot></slot></button>
  </div>
</template>

<script>
  export default {
    name: 'JButton',
  }
</script>
```

在`components/index.js`内导出组件：

```js
export { default as JButton } from './button'
```

测试组件：

main.js 中引入组件：

```js
import { JButton } from '../components'

Vue.use(JButton)
```

这就完成了 JButton 组件的全局注册，可在 examples 下的任何组件内使用了。

## 添加组件样式

`button.scss`

```scss
.j-button {
  background-color: #fff;
  display: inline-block;
  button {
    width: 100%;
    height: 34px;
    border-radius: 5px;
    border: none;
    &:hover {
      background-color: lightblue;
    }
  }
}
```

在`JButton.vue`的根元素添加`j-button`的类。

在`main.js`引入样式，验证是否生效。

```js
import '../components/button/button.scss'
```

> 为何不在组件的 style 内编写样式？

希望能样式单独打包，在组件按需引入是，也能按需引入样式。

## 再编写一个 toggle 组件

JToggle.vue

```html
<template>
  <span
    class="j-toggle"
    tabindex="0"
    role="checkbox"
    :aria-checked="inToggle"
    @click="toggle"
    @keydown.space.prevent="toggle">
  </span>
</template>

<script>
  export default {
    name: 'JToggle',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        inToggle: this.value,
      }
    },
    methods: {
      toggle() {
        this.inToggle = !this.inToggle
        this.$emit('input', this.inToggle)
      },
    },
  }
</script>
```

toggle.scs:

```scss
$border-radius: 9999px;
$toggle-width: 3rem;
$toggle-height: 1.5rem;

.j-toggle {
  position: relative;
  display: inline-block;
  height: $toggle-height;
  width: $toggle-width;

  flex-shrink: 0;
  border-radius: $border-radius;
  cursor: pointer;

  /* 聚焦时样式 */
  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px rgba(52, 144, 220, 0.5);
  }

  &:before {
    display: inline-block;
    border-radius: $border-radius;
    height: 100%;
    width: 100%;
    content: '';
    background-color: #dae1e7;
    /* background-color: red; */
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s ease;
  }
  /* 开启后背景颜色变为绿色 */
  &[aria-checked='true']:before {
    background-color: #04be02;
  }

  /* 移动的按钮，关闭时位于左侧，left:0 */
  &:after {
    position: absolute;
    top: 0;
    left: 0;

    height: $toggle-height;
    width: $toggle-height;
    background-color: #fff;

    border-radius: $border-radius;
    border-width: 1px;
    border-color: #dae1e7;

    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
    content: '';

    transform: translateX(0);
    transition: transform 0.2s ease;
  }

  /* 开启后，向右移动 0.5 的 span 宽度 */
  &[aria-checked='true']:after {
    transform: translateX(#{$toggle-height});
  }
}
```

index.js 导出组件

```js
import JToggle from './JToggle.vue'

JToggle.install = Vue => {
  Vue.component(JToggle.name, JToggle)
  return Vue
}

export default JToggle
```

在`components/index.js`在导出组件：

```js
import JButton from './button'
import JToggle from './toggle'

export { JButton, JToggle }
```

在 main.js 中引入组件：

```js
import '../components/button/button.scss'
import '../components/toggle/toggle.scss'
import { JButton, JToggle } from '../components'

Vue.use(JButton).use(JToggle)
```

测试组件：

App.vue

```html
<template>
  <div id="app">
    <j-toggle v-model="toggle" />
    <p>toggle 开启了吗?{{ toggle ? '是' : '否' }}</p>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        toggle: true,
      }
    },
  }
</script>
```

渲染输出：

![](./public//toggle-demo.png)

完美！

## 使用 webpack 打包

安装依赖：

```bash
pnpm i webpack webpack-cli glob vue-loader^15 -D
```

vue-loader 安装 15 的版本，不然可能报错。

[问题详情](https://stackoverflow.com/questions/74115950/vue-loader-17-0-0-webpack-5-74-0-module-build-failed)

webpack.config.js 配置

```js
const glob = require('glob')
const { join } = require('path')
const { VueLoaderPlugin } = require('vue-loader')

function makeEntry(dirPath = 'components') {
  const entry = {}
  const entryFiles = glob.sync(join(__dirname, `${dirPath}/**/index.js`))
  entryFiles.forEach(path => {
    const componentPath = path.split(dirPath)[1]
    const name = componentPath.split(/[/.]/)[1].toLowerCase()
    entry[name] = path
  })
  return entry
}

const entry = makeEntry()
// console.log(entry)

module.exports = {
  entry,
  output: {
    filename: '[name].js',
    path: join(__dirname, 'dist'),
    library: 'jackUI',
    libraryTarget: 'umd',
  },
  // mode: 'development',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  externals: {
    // FIXME 如何排除 core.js
    vue: 'Vue',
  },
}
```

## 打包 scss

安装依赖

```bash
pnpm i gulp gulp-cli gulp-minify-css gulp-rename gulp-sass dart-sass del
```

gulpfile.js

```js
const gulp = require('gulp')
const sass = require('gulp-sass')(require('dart-sass'))
const minify = require('gulp-minify-css')
const rename = require('gulp-rename')
const dest = 'dist/css'

gulp.task('sass', () => {
  return gulp
    .src('components/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minify())
    .pipe(
      rename(function (path) {
        console.log(path)
        if (path.dirname !== '.') path.dirname = '.'
      })
    )
    .pipe(gulp.dest(dest))
})

gulp.task('clean', () => {
  return import('del').then(res => {
    // console.log(res)
    res.deleteAsync(dest)
  })
})

gulp.task('default', gulp.series(['clean', 'sass']))
```

添加脚本：`build:css:"npx gulp"`

### 参考

- [Gulp Sass](https://zetcode.com/gulp/sass/)

- [Setting up GULP to compile SCSS in less than 5 minutes](https://jhinter.medium.com/setting-up-gulp-to-compile-scss-in-less-than-5-minutes-fee8bea2b68b)

## 打包组件

把 js 打包和 css 结合起来。

```bash
"build:jackUI":"npm run build:js && npm run build:css"
```
