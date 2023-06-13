# vs code jsconfig 配置

`jsconfig.json`的作用：对 `JS 项目`目录提供个性化支持：比如路径短写、引入文件自动完成等，能提升开发体验。

> 配置后需要重启 vs code。`jsconfig.json` 所在的目录是项目根目录。

## 配置详情

`exclude` 属性，glob 模式，告诉语言服务哪些文件不是源码文件，能提高 vscode 扫描速度。

> 如果您的工作区中没有 jsconfig.json，VS Code 将默认排除 node_modules 文件夹。

`include`，属性，指定哪些路径或者文件是项目文件。

> 这两个属性都是为了提高智能感知的速度。

```json
{
  "exclude": ["node_modules", "dist"],
  "include": ["src/**/*"]
}
```

> 路径跳转

webpack 配置路径别名，在引入文件时，vscode 无法感知路径的，也`无法跳转`文件，jsconfig 的别名路径解决这一问题。

> 只支持 `js文件` 和 `jsx文件` 跳转路径，`.vue` 不支持跳转，配置中发现路径别名也要配置`vue.config.js`才能找到模块，这样依赖，jsconfig 的配置就鸡肋了。

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@component": ["./src/component"]
    },
    "module": "commonjs",
    "target": "es6"
  }
}
```

> compilerOptions 选项

| 属性                         | 描述                                                                                                       |   类型   | 默认值 |
| ---------------------------- | :--------------------------------------------------------------------------------------------------------- | :------: | :----: |
| baseUrl                      | 解析非相对模块名称的基目录                                                                                 |  string  |   -    |
| paths                        | 指定相对于 baseUrl 选项计算的路径映射                                                                      |  object  |        |
| checkJs                      | 启用 JavaScript 文件的类型检查                                                                             | boolean  |  true  |
| noLib                        | 不包含默认库文件（lib.d.ts）                                                                               | string - |        |
| allowSyntheticDefaultImports | 允许从没有默认导出的模块进行默认导入。 这不会影响代码发出，只会影响类型检查。                              | boolean  |  true  |
| target                       | 指定要使用的默认库（lib.d.ts）。 值是“es3”，“es5”，“es6”，“es2015”，“es2016”，“es2017”，“es2018”，“esnext” |  string  |   -    |

> jsconfig 与 tsconfig.json 的关系？

1. jsconfig.json 是 tsconfig.json 的后代，后者是 TypeScript 的配置文件。

2. jsconfig.json 相当于 tsconfig.json 的“allowJs”属性设置为 true。

<!-- 测试 -->

常用的配置选项：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@component": ["./src/components"]
    },
    "module": "commonjs",
    "target": "es6"
  },
  "exclude": ["node_modules", "dist"],
  "include": ["src/**/*"]
}
```
