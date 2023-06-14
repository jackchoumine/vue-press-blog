# node 环境变量

配置环境变量是一种配置应用的好方式，灵活的环境配置方式可使得程序能轻易的运行在各种环境中，而不需要修改源代码。程序可根据不同的环境变量，执行的不同的行为，比如日志记录模块，开发环境下，将日志输出到控制台，线上环境，将日志保存在文件中。

## 不同环境对 Node 程序可能的影响

**Development**:

- 日志输出到控制台；
- 视图不被缓存；
- 生成更多的错误信息；
- 前端资源（JS、CSS）等不被压缩和缓存。

**Production**:

- 中间件和 dependencies 切换到高效的代码路径；
- 只安装 **dependencies** 依赖；devDependencies 和 peerDependencies 被忽略；
  以上不管什么框架，都是相同的：

  **express**

- 视图模板会被缓存；
- 错误信息更加精简；
- CSS 文件被缓存。

**mongoose** - 关闭全局自动索引。这可显著提高性能。

## env 保存环境变量

Node 的环境变量可开箱即用，保存在全局对象 `process.env` 中，当 Node 进程开启后，会**自动访问**环境变量。
process.env 对象和普通对象一样，我们可进行值的获取和设置。
**获取**：

```js
console.log(process.env) //所有环境变量
console.log(process.env.PORT) //端口号
console.log(process.env.NODE_ENV) //进程执行的环境
```

**设置**：
环境变量可**手动设置**或者创建新的环境变量（不推荐创建）。

```js
// server.js
console.log('MY_VARIABLE', process.env.MY_VARIABLE)
console.log('PORT', process.env.PORT)
console.log('NODE_ENV', process.env.NODE_ENV)
const app = require('http').createServer((req, res) => res.send('Ahoy!'))
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
```

**命令行配置**：

```bash
# 在命令中设置环境变量
PORT=3001 MY_VARIABLE='自定义环境变量' NODE_ENV=test node server.js
```

就得到相关输出了。

** npm 脚本配置**：

```json
"scripts": {
	"win": "set NODE_ENV=development&&set PORT=3001&&set MY_VARIABLE=环境变量&&nodemon server.js",
	"unix": "export NODE_ENV=development&&export PORT=3003&&nodemon server.js",
	"unix:1": "export NODE_ENV&&nodemon server.js",
	"cross": "cross-env NODE_ENV=cross PORT=3004 node server.js"
}
```

window 环境下，`set key1=value1&&set key2=value2&&node server.js`.
**&&** 之前没有空格，否则值会多一个值，每个值都要**set** ，需要用 **&&**连接 node 命令。
Unix 或者 Linux 环境下，用`export`。
**跨平台处理**：`cross-env`包。
脚本写成这样：

```js
"cross": "cross-env NODE_ENV=cross PORT=3004 node server.js" # 在脚本最前面加 cross ，不能变量之间用空格间隔。
```

以上环境配置方式不够灵活，不易维护，容易写错。那就采用**配置文件**的方式集中管理环境配置。

## .env 文件配置环境变量

编写.env 文件：

```js
NODE_ENV=development
PORT=3005
# 其他比如数据库连接等配置
MY_VARIABLE=JACK
```

没有语法高亮？

推荐下载 vscode 扩展，DotENV，除了语法高亮，还有拼写检查等功能，墙裂推荐。

然后将其**加入 git 的忽略文件**里，因为配置文件**包含敏感信息**，不要上传到仓库里，而且，团队成员需要各自的配置信息。（那么把代码给分享给其他人，他怎么知道需要配置哪些信息呢？稍后有答案）

安装 **dotenv** 包，将其安装成*development*。

```bash
npm i dotenv
```

修改 server.js，结果如下：

```js
console.log('MY_VARIABLE', process.env.MY_VARIABLE)
const dotenv = require('dotenv')
dotenv.config() // dotenv提供了 config 函数，用于加载配置，别名 load
console.log('MY_VARIABLE', process.env.MY_VARIABLE)
const PORT = process.env.PORT
console.log('PORT', process.env.PORT)
console.log('NODE_ENV', process.env.NODE_ENV)
const app = require('http').createServer((req, res) => res.send('hello!'))
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
```

运行 server.js，检查配置是否加载进来了。
`npm start`
输出：

```bash
MY_VARIABLE undefined
MY_VARIABLE JACK
PORT 3005
NODE_ENV development
Server is listening on port 3005
```

可看到没有加载配置前，**MY_VARIABLE**是**undefined**。

以上方式有一个缺点，在多个文件中使用配置信息，都要引入 dotenv 和执行 config，比较繁琐，且不易维护，我们用一个**config.js**文件将配置信息作为一个模块，导出配置即可。

### config.js 集中管理配置

```js
// config.js
const dotenv = require('dotenv')
dotenv.config()
module.exports = {
  mode: process.env.NODE_ENV,
  port: process.env.PORT,
  my_variable: process.env.MY_VARIABLE
}
```

修改 server.js

```js
// config.js
const dotenv = require('dotenv')
dotenv.config()
module.exports = {
  mode: process.env.NODE_ENV,
  port: process.env.PORT,
  my_variable: process.env.MY_VARIABLE
}
```

运行，同样得到正确的配置信息。

以上方式有一个缺点，就是当你删除或者新增一个配置项时，需要修改两个文件。我只想修改**.env**文件，用下列的方式是极好的：

```js
// config.js
const dotenv = require('dotenv')
const result = dotenv.config()
if (result.error) {
  throw result.error
}
const { parsed: envs } = result
console.log(envs)
module.exports = envs
```

**config**函数读取**.env**，将配置信息包含在一个含有**parsed**的对象返回。

```js
{ parsed: { NODE_ENV: 'development', PORT: '3006', MY_VARIABLE: 'JACK' } }
```

运行脚本，也能得到相同结果。

## 预加载环境变量 -r

程序依赖越少越好，恰好 dotenv 提供了一个可**预加载环境变量**的方法，这样我们就不用将 dotenv 安装为运行时依赖，减少了依赖。

将 dotenv 安装成开发依赖，在运行 node 命令时加上 `-r`（--require）参数。

```bash
node -r dotenv/config server.js
```

## 发挥 npm 脚本的作用

```bash
"scripts":{
	"test":"node -r dotenv/config server.js"
}
```

## 分享配置

配置文件含有敏感信息，不加入版本控制。但是团队成员之间分享代码，想要程序运行起来，就要知道需要配置哪些环境变量，在写一个`.env.example`作为配置环境变量的例子，加入版本控制，在 README 在中说明如何配置。

## 环境变量结合 PM2

还需学习了解

<!-- TODO -->

## 参考

[making-your-node-js-work-everywhere-with-environment-variables](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786)

[working-with-environment-variables-in-node-js](https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html)

[What You Should Know About NODE_ENV](https://dzone.com/articles/what-you-should-know-about-node-env)
