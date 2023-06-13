# npm 使用

## NPM 是什么

npm (**node package manager**) ，node 包管理工具，主要功能就是管理 node 包：安装、卸载、更新、查看、搜索、发布等。
npm 的背后，有一个 couchdb（一个 json 数据库或者非关系型数据库）,详细记录了每个包的信息：作者、版本、依赖、授权信息等。
npm 的重要作用：将开发者从繁琐的包管理工作（版本、依赖等）中解放出来，专注功能开发，建立了一个 node 生态圈，实现 node `代码共享、复用`。

[NPM 官网](https://npmjs.org)

npm 仓库是集中管理 npm 包的一个地方，开源的 npm 都可从这里下载，企业内部也可搭建自己的 npm 库。

```bash
npm install npm@latest -g #更新 npm
npm help # 帮助命令
npm <command> -h #某条命令的用法
npm -v #版本信息
npm -l #常用命令信息
npm config list #npm  配置信息
npm config list -l # 默认配置信息列表
npm init #初始化 package.json文件
npm init -y #初始化 package.json 跳过询问
npm init --yes
npm ls # 查看当前包的依赖
```

依赖名称注意事项：

- 不与 node 核心模块同名；
- 不得使用 js 或者 node
- name 会成为 url、命令行、或者一个文件夹的名，非法 url 字符不允许，不以`_`或`.`开头
- 不得含有大写字母

配置相关：

```bash
npm config set key value
npm config get key
npm config get prefix # 查看npm安装前缀
npm config get cache # npm 缓存目录
```

## NPM 能做什么

### 安装模式

**本地安装 vs 全局安装**
`本地安装`：package 会下载到`当前目录`的`node_modules`文件夹内，只能在当前目录下使用，一个项目使用到的依赖，采用本地安装。
`全局安装`：package 会被下载到特定的`系统目录`的`node_modules`文件夹内，在所有目录下都能使用。在安装命令行后加`-g`选项，表示全局安装。工具包、很多项目都可能使用的包，全局安装。
全局模式和本地模式的比较：
|模式|通过 require 获取|注册环境变量 path|
|:----------:|:-----:|:---:|
|本地模式|是|否|
|全局模式|否|是|

**查看安装目录**：

```bash
npm root
npm root -g
```

### 语义化版本

[更好的使用 NPM][10]
[NPM 使用技巧][11]
[yarn 使用][12]

### 依赖锁文件

[NPM 中的 package 锁](https://blog.cuiyongjian.com/engineering/lock-in-npm/)

### 安装

主要关注安装的版本号和安装成哪个依赖项目（开发依赖、运行时依赖（线上依赖）、可选依赖等）。

npm 会先检查是否安装了该模块，已经安装，则更新版本。

```bash
npm i # 安装 package.json 所有依赖（开发依赖、运行时依赖、对等依赖等）
npm i -E packageName # 安装精确版本 推荐用法
npm i packageName # 默认安装成产品依赖最新版本
npm i packageName1 packageName2 # 安装多个依赖
npm install packageName # 保存在 dependencies
npm i getHub-rpo #从github 仓库安装包
# 查看当前目录有哪些文件 类似 Linux 的 ls
dir
```

强制安装：

```bash
npm i packageName -f #不检查是否安装，直接安装
```

可指定安装版本和使用的范围

```bash
npm i packageName@x # 不提供 y、z 版本号，安装最新的 z 版本
npm i packageName@x.y # 不提供 z 版本号，安装最新的 x.y 版本
npm i packeageName@x.y.z -D # 安装该模块的 x.y.z 版本为开发依赖
npm i packageName@~x.y.z # 安装该版本的近似版本
npm i packageName@^x.y.z # 安装兼容版本
npm i packageName # 安装最新版本
```

**在本地安装的同时，将依赖包的信息（要求的名称和版本）写入 package.json 中是很重要的！**

```bash
npm install packageName #安装后默认写入package.json中 dependencies 中
npm i packageName --no-save # 安装依赖，但不写入package.json
npm install packageName --save #安装好后写入package.json的 dependencies中（生产环境依赖）
npm install packageName -S #安装好后写入package.json的dependencies中（生产环境依赖）
npm install packageName -D #安装好后写入package.json的devDependencies中（开发环境依赖）
npm install packageName --save-dev #安装好后写入package.json的devDependencies中（开发环境依赖）
```

一个模块要么是开发依赖，要么是产品依赖，不可能同时是两种依赖。
在`package.json`内部声明需要安装的模块。然后`npm i`可以安装。

### 卸载

```bash
npm rm packageName #同时删除 package.json 中的 dependencies或devDependencies 的依赖信息
npm rm packageName --no-save # 删除依赖，但是不删除 package.json 文件中依赖的信息
npm un packageName
npm uninstall packageName
```

还可指定卸载的版本。

### 查看过时的依赖

```bash
npm outdated # 会列出过时的依赖
```

### 更新

```bash
npm update packageName
# 可指定更新到某一特定版本
# 会先检查远程版本，远程版本较新，则安装。
npm update # 更新所有依赖
```

### 查看模块依赖

```bash
#参看模块依赖
npm ls --depth 0
# 或者
npm list --depth=n
# --depth n 输出依赖的树形结构的层级深度
# 0 不显示依赖 1 显示一级依赖
# 查看特定模块
npm ls packageName
packageName -v # 依赖版本号
```

### 修复安全问题

要求 npm@6.x 以后的版本

```bash
npm audit # 显示安全问题
npm audit fix # 修复安全问题
npm audit fix -f # 强制修复
```

更多信息：

[What is npm audit fix???][13]

[Auditing package dependencies for security vulnerabilities][14]

### 模块信息

```bash
npm info packageName
# 输出的信息是一个 json 格式的，比 package.json 描述文件提供更多的信息。
npm view packageName
npm view packageName engines # 模块需要的 node 版本
npm list packageName version # 当前项目中用到的模块的版本
npm v packageName
npm show packageName # 查看最新的库信息
npm show packageName versions # 查看所有发布的版本
npm show packageName version # 查看库的最新版本
npm show packageName time # 各个版本发布的时间
```

### 查看依赖文档

```bash
npm docs packageName # 会在浏览器里打开依赖文档
```

### 查看依赖 bug

```bash
npm bugs packageName # 会打开 bugs 页面
```

### 搜索模块

记不住依赖确切名字是搜索。

```bash
npm find packageName # 查找模块报错 ，可能是源不对。改为官方源。
npm s packageName
npm search packageName
```

### npm 源管理

安装 `nrm` 模块来管理 npm 源，方便。

```bash
nrm -h # nrm 命令帮助信息
nrm ls # 所有registries
nrm use regName # 使用某个reg 源
```

其他源管理方法：

```bash
npm config set registry url # 将 url 设置为 npm 源
```

### npm 缓存管理

使用 npm 缓存，可提升安装速度，因为 npm 会把你安装过的模块缓存下来，下次安装先读缓存，**缓存功能是默认关闭的**。

```bash
npm config set cache path -g #path 是绝对路径，这样就开启缓存了
npm cache clean #清除缓存
```

## 问题

1. package.json 的`name`为`webpack`，在尝试安装 webpack 时报错。

```bash
npm ERR! Refusing to install package with name "webpack" under a package
npm ERR! also called "webpack". Did you name your project the same
npm ERR! as the dependency you're installing?
```

后查阅资料，得知 npm 会拒绝安装与本地包相同名字的包，因为这样可能是依赖查找算法无限循环。修改 package.json 的 name 属性即可。所以给项目起名字时记得取一个特殊的名字，以免与你将要安装的包冲突。

2. 引入 npm 是大小写弄错，会报以下警告：

```bash
There are multiple modules with names that only differ in casing.
This can lead to unexpected behavior when compiling on a filesystem with other case-semantic.
Use equal casing. Compare these module identifiers:
```

有多个模块名字相同，但是名字大小写不同。在同一个问价系统中使用，可能会导致不可预期的行为。

### 配置 script 命令

在 package.json 文件的 `script`字段里，可设置 npm 运行脚本的命令。

```js
"script": {
    "start": "node ./bin/www",
    "test": "node ./test.js"
    "dev": "nodemon ./bin/www"
}
```

执行命令：

```bash
npm run start # 会执行 node ./bin/www
npm run dev # 执行 nodemon ./bin/www
# start 和 test 比较特殊，可不加 run start 和 test 本身是 npm 命令
npm start
npm test
npm t # 和 npm test 相同
```

### npm i package_name <options\> 命令选项

```bash
-v: --version
-h, -?, --help, -H: --usage `帮助信息`
-s, --silent: --loglevel silent
-q, --quiet: --loglevel warn
-d: --loglevel info
-dd, --verbose: --loglevel verbose
-ddd: --loglevel silly
-g: --global `全局命令`
-C: --prefix
-l: --long
-m: --message
-p, --porcelain: --parsable
-reg: --registry
-f: --force `强制执行`
-desc: --description
-S --save `生产依赖`
-P: --save-prod `生产依赖`
-D: --save-dev `开发依赖`
-O: --save-optional `可选依赖`
-B: --save-bundle
-E: --save-exact `精确安装指定模块版本`
-y: --yes `使用默认值`
-n: --yes false
ll and la commands: ls --long
```

### 更多命苦

[npm cli command](https://docs.npmjs.com/cli-documentation/)

[1]: https://yarnpkg.com/lang/zh-hans/docs/dependency-versions/
[2]: https://semver.npmjs.com/
[3]: https://semver.org/lang/zh-TW/
[9]: https://www.cnblogs.com/Wayou/p/semver.html
[10]: https://www.css88.com/archives/10418
[11]: https://www.css88.com/archives/10401
[12]: https://yarnpkg.com/zh-Hans/
[13]: https://medium.com/codebrace/what-is-npm-audit-fix-bf1d7efefff7
[14]: https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities
