# node 学习笔记 http 模块 -- http.Server

node 的优势之一，就是能快速搭建一个 HTTP 服务器，该优势是 http 模块在发挥作用，有必要学习该模块。

## 简单服务器例子

```js
const http = require('http')
const PORT = 3000
const HOST = '127.0.0.1'
const BACKLOG = 233
let listeningHandler = error => {
  if (error) {
    console.log('服务启动出现错误！')
    return 0
  }
  console.log(`服务已启动：
    监听的段端口是：${PORT},
    主机名是：${HOST},
    最大连接数是:${BACKLOG}`)
}
//创建服务器
let server = http.createServer((request, response) => {
  let protReq = Object.getPrototypeOf(request)
  console.log(protReq) //IncomingMessage
  let protRes = Object.getPrototypeOf(response)
  console.log(protRes) //ServerResponse
  const { headers, method, url } = request
  let body = []
  request
    .on('error', err => {
      console.error(err)
    })
    .on('data', chunk => {
      body.push(chunk)
    })
    .on('end', () => {
      body = Buffer.concat(body).toString() // Buffer??
      response.on('error', err => {
        console.error(err)
      })

      response.statusCode = 200
      response.statusMessage = 'Ok'
      response.setHeader('Content-Type', 'application/json')
      // 上面三行可被下面一行代替:
      // response.writeHead(200, 'Ok',{'Content-Type': 'application/json'})

      const responseBody = { headers, method, url, body }

      response.write(JSON.stringify(responseBody))
      response.end()
      // 上面两行可被下面一行代替:
      // response.end(JSON.stringify(responseBody))

      // 返回处理结束
    })
})
let protServer = Object.getPrototypeOf(server)
console.log(protServer) //Server
server.listen(PORT, HOST, BACKLOG, listeningHandler)
server.on('error', error => {
  if (error.code === 'EADDRINUSE') {
    console.log('端口/路径/handle已经被另一个服务器占用，正在重新监听')
    setTimeout(() => {
      server.close()
      server.listen(PORT, HOST)
    }, 1000)
  }
})

// 发起请求
var client = http.get('http://127.0.0.1:3000', function (clientRes) {
  let prot = Object.getPrototypeOf(clientRes)
  console.log(prot)
  clientRes.pipe(process.stdout)
})
let protClient = Object.getPrototypeOf(client)
console.log(protClient) //ClientRequest
```

上述一个简单的服务涉及到 4 个实例，大部时候，我们只用到 request、response。

- server：http.Sever 的实例，表示一个服务器，用来处理客户单请求，是一个`EventEmitter`，会发射事件，如：request、connection、close、checkContinue、connect、upgrade、clientError 等。request 事件监听函数为 function(req,res){}，用于处理 http 请求。
- client：http.ClientRequest 的实例，发起请求，这里就想自己发起请求。
- response ： http.ServerResponse 的实例，返回给客户端的响应。
- request/clientRes ：http.IncomingMessage 实例，request 是客户端出的请求；clientRes 服务器返回的响应。
  > <span style="color:gray;">很奇怪，response 和 clientRes 其实都是响应信息，原型居然不一样，这样设计的理由是什么呢 ？大胆猜测下：功能不同，服务器里的 response 是需要返回给客户端（浏览器）的，而 clientRes 是不需要返回给客户端的（此时它就是客户端）。</span>

## IncomingMessage、ServerResponse

IncomingMessage 在客户端和服务端都有，他们的功能不同：
server 端：获取请求相关信息；
client 端：返回请求的响应。
IncomingMessage 有三个属性需要注意：

- method：只能 server 端有，获取请求方法；
- url : 只有服务端有，请求路径；
- statusCode/statusMessage：只在 client 端有，获取请求状态。
  [源码详情](https://github.com/nodejs/node/blob/8aca934009225b30bff7d7927d2eb9f667dbff9f/lib/_http_incoming.js#L62)

IncomingMessage 实现了`Readable stream` （可读流）的接口，具有可读流一些方法，在操作一些大文件时很有用。Stream 又是 `EventEmitter`的实例，请求处理函数中的`request`是 IncomingMessage 的实例，所以 request 具有一些事件，又有方法，还有一些属性。 - error : 请求中出现错误时触发； - data : 请求照片那个的数据块还在传递时触发； - end : 数据传递完毕触发。 - destroy() - setTimeout()

ServerResponse 和 IncomingMessage 类似，是可写流（Writable Stream）, 具有`流`和`事件发生器`的特点：

- `error `: 响应出错时触发；
- drain：流中有数据时触发；
- finish ：当响应头和响应主体的都交给操作系统通过网络传输时触发，此时并不意味着客户端收到响应了。该事件触发后，响应对象不再触发其他事件；
- close ：response.end() 被调用时触发；
- 其他设置响应状态、响应头和响应主体的方法：
  - `res.setHeader(field,value)`;
  - `res.getHeader(field)`;
  - `res.removeHeader(field)`;
  - `res.statusCode = 200`、`res.status.message = 'OK'`;
  - `res.writeHead(code,[message,]{field:value})`。

ServerResponse 常用方法：

- setEndcoding([endcoding]),设置编码。默认 null，则以 Buffer 存储。常见 utf8。
- pause()，暂停数据接收和发送事件，方便实现下载功能。
- resume，从暂停中恢复。

## http.Server 静态方法、属性和事件

**属性：**

- METHODS : 解析器支持的请求方法列表，数组，常见的都支持；
- STATUS_CODES：http 响应状态集合，对象，键为 状态码，值为状态信息；
- `createServer([requestListener])` 任何网路服务程序都需要创建 一个服务对象，node 中由该函数完成，返回一个 `http.Server` 实例，可加一个回调函数作为`请求监听器`，每当有请求到达，都会执行该函数，监听器的第一个参数是 `req`，第二个参数是 `res`。http.Server 继承 net.Server，具有一些额外的事件：
  - `request` : 请求到达时触发。每个连接可能有多个请求（长连接）；
  - `close`：服务关闭时触发。

```javascript
const http = require('http')
let server = http.createServer();
let requestHandler = (req,ress){
	//do something
};
server.on('request', requestHandler);
```

**方法：**

- `listen:` 监听服务器的某个端口或者路径，`server.listen(PORT, HOST, BACKLOG, listeningHandler)`，`listening` 属性表示服务是否在监听连接，而当服务器在监听时（触发 listening 事件 ，一个 net.Server 的事件），会调用 listen 方法，所以绑定监听就会执行回调函数。
- `request:`作为客户端发请请求。具有`options`和`callback`参数。
  - options 参数：
    - host:请求网站的域名或 ip;
    - port:端口号，默认 80；
    - method：请求方法，默认 GET;
    - path:相对于根路径的路径，默认`/`。**querystring** 应包含在其中，必须以`/`开头，否则报错；
    - headers:关联数组对象，请求头包含在其中。
  - callback:传递一个参数，为`ServerResponse`的实例或者`http.ClientResponse`的实例。
  - 返回值：`IncomingMessage`或者`http.ClientRequest`的实例；
  - **注意:**需要调用`req.end()`结束请求，否则服务器不会收到信息。
- `get:`发请 GET 请求，无需手动`req.end()`。

**事件：**

- `request`：当客户端发起请求时触发。两个参数`req`和`res`表示请求和响应；
- `connection`:建立 TCP 连接时触发，有一个`socket`参数，net.Socket 的实例。connection 事件的粒度大于 request，因为客户端在`Keep-Alive`模式下，同一个连接会发送多个请求。
- `close`:服务器关闭时触发。
- `checkContinue`、`upgrade`、`clientError`等事件，事件复杂 HTTP 服务器时才会用到。

##http.ClientRequest

http.get(options[, callback]) 和 http.request(options[,callback]) 用户发起请求，都返回一个 `http.ClientRequest` 的实例，callback 被调用时只传入一个参数，该参数是 `http.IncomingMessage` 的一个实例。
get 函数请求方法是 GET，且`自动调用 req.end()`。request 则不会。

发送 GET

```js
let http = require('http')
let options = {
  protocol: 'http:',
  host: '163.com',
  method: 'GET',
  path: '/',
  timeout: 1000 * 60,
}
let req = http.request(options)
// 设置请求头部
req.setHeader('Cache-Control', 'max-age=0')
req.on('response', res => {
  res.setEncoding('utf8')
  res.on('data', chunk => {
    console.log('收到数据：%s', chunk)
  })
})
req.on('error', err => {
  console.log('请求出错', err)
})
req.on('timeout', err => {
  console.log('请求超时', err)
})
req.setTimeout(1000 * 60, err => {
  console.log('请求超时', err)
})
req.end()
```

发送 POST:

```js
let http = require('http')
let options = {
  protocol: 'http:',
  host: '163.com',
  method: 'POST',
  path: '/',
  timeout: 1000 * 60,
}
let req = http.request(options)
// 设置请求头部
req.setHeader('Cache-Control', 'max-age=0')
req.on('response', res => {
  res.setEncoding('utf8')
  res.on('data', chunk => {
    console.log('收到数据：%s', chunk)
  })
})
//提交POST数据 必须在 监听 response 事件之后
req.write('name=jack&age=37')
req.on('error', err => {
  console.log('请求出错', err)
})
req.on('timeout', err => {
  console.log('请求超时', err)
})
req.setTimeout(1000 * 60, err => {
  console.log('请求超时', err)
})
req.end()
```

**http.ClientRequest**方法、事件
事件：

- `response`，响应达到时触发。回调函数参数是`http.ClientResponse`。
  方法：
- `abort:`终止请求。
- `setTimeout(timeMillsecond,callback):`设置请求超时。
- 此外还有 request.setNoDelay([noDelay])、 request.setSocketKeepAlive
  ([enable], [initialDelay])。
  http.ClientRequest 内部创建了一个 socket 来发起请求：
  > ```js
  > this.onSocket(net.createConnection(options))
  > ```

```
[代码](https://github.com/nodejs/node/blob/8aca934009225b30bff7d7927d2eb9f667dbff9f/lib/_http_client.js#L276)

参考文章：
[http模块概览](https://github.com/chyingp/nodejs-learning-guide/blob/master/%E6%A8%A1%E5%9D%97/http.md)
[Anatomy of an http transaction](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)




```

<!-- BUG -->

[继续学 http 模块](https://www.bilibili.com/video/BV1zY4y1p7Cm?p=8&spm_id_from=pageDriver)
