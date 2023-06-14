# npm 脚本使用

Node 开发必须用到 npm，而脚本功能是 npm 最强大、最常用的功能之一。

## 什么事 npm 脚本

每个 npm 包，都会有一个 **package.json**，用于对包进行说明，而该文件的**scripts**字段，用于定义脚本命令。

```json
{
  "scripts": {
    "dev": "node index.js"
  }
}
```

执行`npm run dev`就相当于执行`node index.js`。

使用脚本的优点：

- 集中到一起，方便管理；
- 提供对外接口，用户拿到项目，执行脚本较好，无需知道脚本的具体操作；
- 发挥 npm 更强大的功能。

查看当前项目的所有脚本：

```bash
npm run
```

## 原理

执行 **npm run**，就新建一个**Shell**，在该 Shell 里执行指定的脚本命令。只要 Shell 值执行的命令，都可写在 npm 脚本里。

比较特别的是，这个新建的 Shell，会将**当前目录**的`node_modules/.bin`子目录加入**path** 变量，执行结束后，再将**path** 恢复。也就是说当前目录的**node_modules/.bin**子目录里面的所有脚本，都可直接调用**脚本名**，无需加上路径。
比如当前项目依赖 webpack，直接写：

```bash
"pack":"webpack"
```

不必写：

```bash
"pack":"./node_modules/.bin webpack"
```

npm 脚本的唯一要求，是可在 Shell 中执行，因此不一定是 Node 脚本，任何可执行文件都可写在里面。
test 目录下有一个 package.json 和 一个 hello.sh

```json
{
  "scripts": {
    "test": "hello.sh",
    "openVscode": "code"
  }
}
```

hello.sh

```bash
#!/bin/sh
mkdir shell_tut
cd shell_tut
for ((i=0; i<10; i++)); do
	touch test_$i.txt
done
```

.sh 脚本的意思是，在当前目录下创建 shell_tut 文件夹，然后进入该文件夹，创建是个 txt 文件。
执行 `npm run test`就能看到创建的文件。
`npm run openVscode` 是用 vscode 编辑打开当前目录。

npm 脚本遵守 Shell 脚本规则，退出嘛不是**0**，执行失败。

## 通配符

npm 脚本就是 Shell 脚本，可使用 Shell 通配符。
`"test":"jslint *.js"`、`"test":"jshint **/*.js"`
**\***匹配任意字符，那么`*.js`匹配任意 JS 文件。** \* \*** 表示任意一层子目录。如命令中含有通配符，需要用\转义。

## 传参

1. 短线传参
   用 -- (两个短线) 标明是给 npm 传递参数。

```bash
npm  run <cmd> -- param
```

这这样获取 param

```bash
process.agrv.splice(2)
```

（TODO: 好像没有，也行啊） 2. 头部传参

```bash
	ENV_NAME='value' npm run <cmd>
```

获取参数：

```bash
process.env.ENV_NAME
```

## 执行顺序

npm 脚本可执行多个任务，就需要指定执行顺序。
**并行执行**：用`&`。
**顺序执行**：用`&&`或者`;`。
**;** 一直顺序执行到底，不管前一个脚本是否成功；
**&&**等待前一个脚本执行成功，在执行一下个脚本。

```bash
"lint":"eslint & csslint & htmllint"
```

顺序执行：

```bash
"build":"babel; jest && npm run clean"
```

**&**会创建一个进程，npm 不知道脚本是否执行完毕，这可能会有问题。（todo 我还没遇到该问题）
那么用 `npm-run-all` 包来管理，是很好的。
**run-s**顺序执行，**run-p**并行执行。
上面的脚本改成这样：
并行执行：

```bash
"lint":"run-p eslint csslint htmllint"
```

顺序执行：

```bash
"build":"run-s babel jest npm run clean" # 这个可行吗？
```

## 分组执行

```bash
"lint:all: "npm run lint:js & npm run lint:css & npm run lint:html",
"lint:js": "eslint --some-flag",
"lint:css": "csslint --that-will-change",
"lint:html": "htmllint --how-things-work"
```

## 钩子

npm 脚本有两个钩子：`pre`和`post`。pre 在主脚本之前执行，可在主脚本执行之前，做一些工作，post 在主脚本执行后执行。

```json
{
  "scripts": {
    "pretest": "node pretest.js",
    "test": "node test.js",
    "posttest": "node posttest.js",
    "openVscode": "code ./"
  }
}
```

执行`npm run test`，会依次执行以下命令： `npm run pretest`→`npm run test`→`npm run posttest`。

npm 的默认钩子：

- prepublish postpublish
- preinstall postinstall
- preuninstall postuninstall
- preversion postversion
- pretest posttest
- prestop poststop
- prestart poststart
- prerestart postrestart

双重 **pre** 和 **post** 无效。

**npm_lifecycle_event**变量，返回正在执行的脚本名字。

```js
const TARGET = process.env.npm_lifecycle_event

if (TARGET === 'test') {
  console.log(`Running the test task!`)
}

if (TARGET === 'pretest') {
  console.log(`Running the pretest task!`)
}

if (TARGET === 'posttest') {
  console.log(`Running the posttest task!`)
}
```

```json
{
  "scripts": {
    "build": "node ./scripts/env-check.js && rimraf dist && webpack --bail --progress --profile --display-error-details",
    "build:dev": "npm run build",
    "build:staging": "set NODE_ENV=staging npm run build",
    "build:prod": "set NODE_ENV=production npm run build"
  }
}
```

env-check.js

```js
// 获取正在执行的脚本名字
const task = process.env.npm_lifecycle_event
const packageJSON = require('../package.json')
const availableEnvironments = Object.keys(packageJSON.scripts)
  .filter(key => key.startsWith(task))
  .map(key => key.split(':')[1])
  .filter(key => key)

if (!process.env.NODE_ENV) {
  console.error(`[ Error ] NODE_ENV is required. Use ${task}:${availableEnvironments.join('/')} scripts instead.`)
  process.exit(1)
}

if (!availableEnvironments.includes(env)) {
  console.error(
    `[ Error ] ${env} is not valid NODE_ENV. Use ${task}:${availableEnvironments.join('/')} scripts instead.`
  )
  process.exit(1)
}

process.exit(0)
```

## 变量

npm 有一个强大的功能，就是可获取到 npm 的内部变量。
**npm*package***前缀，可拿到**package.json**里的字段值。

```json
{
  "name": "foo",
  "version": "1.2.5",
  "scripts": {
    "view": "node view.js"
  }
}
```

```js
// view.js
console.log(process.env.npm_package_name) // foo
console.log(process.env.npm_package_version) // 1.2.5
```

## 参考

[NPM SCRIPTS: TIPS EVERYONE SHOULD KNOW](https://corgibytes.com/blog/2017/04/18/npm-tips/)

[npm scripts 使用指南](https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

[npm scripts 的&&和&](https://juejin.im/post/5b81275d51882542d02cc929)
