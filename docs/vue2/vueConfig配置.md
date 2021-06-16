# vue2-demos

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 学习记录

> 运行环境

```js
node v14.15.4
npm v6.14
vue-cli 4.5.11
```

### vue.config.js 配置

1. 提供参数提示

```js
/**
 * @typedef { import("@vue/cli-service").ProjectOptions } Options
 */
/**
 * 其它代码
 */
/** @type {Options} */
module.exports = {}
```

2. 配置别名和扩展名

`resolve`函数：

```js
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
```

第一种方式：

```js
chainWebpack: config => {
  config.resolve.alias
    .set('@', resolve('src/'))
    .set('@com', resolve('src/components'))
    .set('views', resolve('src/views'))
  config.resolve.extensions
    .add('.js')
    .add('.vue')
    .add('.json')
}
```

第二种方式：

```js
configureWebpack: {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src/'),
      '@com': resolve('src/components'),
      views: resolve('src/views'),
    },
  },
},
```

> 参考

[vue.config.js 配置](https://blog.csdn.net/muzidigbig/article/details/115665717#:~:text=vue.config.js%20%28%E7%9B%B8%E5%BD%93%E4%BA%8E%E4%B9%8B%E5%89%8D%E7%9A%84webpack.config.js%29%20%E6%98%AF%E4%B8%80%E4%B8%AA%E5%8F%AF%E9%80%89%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%EF%BC%8C%E5%A6%82%E6%9E%9C%E9%A1%B9%E7%9B%AE%E7%9A%84%20%28%E5%92%8C%20package.json%20%E5%90%8C%E7%BA%A7%E7%9A%84%29%20%E6%A0%B9%E7%9B%AE%E5%BD%95%E4%B8%AD%E5%AD%98%E5%9C%A8%E8%BF%99%E4%B8%AA%E6%96%87%E4%BB%B6%EF%BC%8C%E9%82%A3%E4%B9%88%E5%AE%83%E4%BC%9A%E8%A2%AB%20%40vue%2Fcli-service,%E8%87%AA%E5%8A%A8%E5%8A%A0%E8%BD%BD%E3%80%82%20%E4%BD%A0%E4%B9%9F%E5%8F%AF%E4%BB%A5%E4%BD%BF%E7%94%A8%20package.json%20%E4%B8%AD%E7%9A%84%20vue%20%E5%AD%97%E6%AE%B5%EF%BC%8C%E4%BD%86%E6%98%AF%E6%B3%A8%E6%84%8F%E8%BF%99%E7%A7%8D%E5%86%99%E6%B3%95%E9%9C%80%E8%A6%81%E4%BD%A0%E4%B8%A5%E6%A0%BC%E9%81%B5%E7%85%A7%20JSON%20%E7%9A%84%E6%A0%BC%E5%BC%8F%E6%9D%A5%E5%86%99%E3%80%82)

[vue 配置【详解】 vue.config.js （ 含 webpack 配置 ）](https://blog.csdn.net/weixin_41192489/article/details/112635196)

[vue alias 别名配置](https://blog.csdn.net/weixin_45256858/article/details/107733151)

[vue.config.js 配置路径别名等](https://blog.csdn.net/zhangyizuishuai/article/details/109537305)

[vue-cli4 全面配置(持续更新)](https://staven630.github.io/vue-cli4-config/)

3. 配置 less

感觉 scss 的语法更加接近 css，更喜欢用 scss,奈何配置一直不成功，只能转到 less 了。

```bash
"less": "^4.1.1",
"less-loader": "^5.0.0",
```

> less-loader 版本过高，可能报错：`TypeError: this.getOptions is not a function`，降低版本试试。最后降到`5.0.0`，可行。

其他 less 配置，后续再配置。
