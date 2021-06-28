# node 学习笔记 http -- request

前面已经提到，`request`是 http.IncomingMessage 实例，有可读流的接口，在服务端、客户端作用略微有差异

- 服务端处：获取请求方的相关信息，如 request header 等。
- 客户端处：获取响应方返回的相关信息，如 statusCode 等。

服务端例子：

```js
const http = require('http')
const server = http.createServer()
let reqHandler = (req, res) => {
  console.log('1、客户端请求url：' + req.url) //服务端特有
  console.log('2、http请求方法：' + req.method) //服务端特有
  console.log('3、http版本：' + req.httpVersion)
  console.log('4、http版本主板本：' + req.httpVersionMajor)
  console.log('5、http版本次板本：' + req.httpVersionMinor)
  console.log('6、http请求头部:' + JSON.stringify(req.headers))
  console.log('7、http请求原始头部:' + JSON.stringify(req.rawHeaders))
  res.end('ok')
}
server.on('request', reqHandler)
server.listen(3000, () => {
  console.log('监听3000端口')
})
```

代码说明：

> `http.createServer()`创建一个服务器，参数一个请求监听器，每次请求到达，都会执行该函数。
> `请求监听函数`有两个参数，第一个是`req`是一个`http.IncomingMessage`的实例，包含请求内容。在回调函数执行之前，会解析`请求头`，但是**不**会解析`请求体`。
> 回调函数需要调用 `req.end()`结束响应，否则程序一直挂起。end 可接收**字符串**或者 **buffer** 作为响应。

用 curl 请求：

```bash
$ curl http://127.0.0.1:3000/test
```

服务端输出：

```bash
1、客户端请求url：/test
2、http请求方法：GET
3、http版本：1.1
4、http版本主板本：1
5、http版本次板本：1
6、http请求头部:{"host":"127.0.0.1:3000","user-agent":"curl/7.57.0","accept":"*/*"}
7、http请求原始头部:["Host","127.0.0.1:3000","User-Agent","curl/7.57.0","Accept","*/*"]
```

客户端例子

```js
const http = require('http')
let url = 'http://127.0.0.1:3000/test?name=jack&age=24'
http.get(url, res => {
  let { statusCode, statusMessage, headers, rawHeaders, httpVersion } = res
  console.log('1.状态码:' + statusCode) //客户端特有属性
  console.log('2.状态信息:' + statusMessage) //客户端特有属性
  console.log('3.响应头信息:' + JSON.stringify(headers))
  console.log('4.原始响应头信息:' + JSON.stringify(rawHeaders))
  console.log('5.http版本:' + httpVersion)
})
```

客户端输出：

```bash
1.状态码:200
2.状态信息:Ok
3.响应头信息:{"date":"Sat, 22 Sep 2018 18:49:34 GMT","connection":"close","transfer-encoding":"chunked"}
4.原始响应头信息:["Date","Sat, 22 Sep 2018 18:49:34 GMT","Connection","close","Transfer-Encoding","chunked"]
5.http版本:1.1
```

## 属性/方法/事件分类

http.IncomingMessage 的 `属性/方法/事件`不是特别多，按照是否客户端/服务端 特有的，下面进行简单归类。可以看到

- 服务端处特有：url、method
- 客户端处特有：statusCode、statusMessage

| 类型 |         名称          | 服务端 | 客户端 | 意义或者触发条件                                                          |
| :--- | :-------------------: | :----: | :----: | :------------------------------------------------------------------------ |
| 属性 |          url          |   ✓    |   ✕    | `服务端`特有属性                                                          |
| 属性 |        method         |   ✓    |   ✕    | `服务端`特有属性                                                          |
| 属性 |        headers        |   ✓    |   ✓    | 头信息的名称与值的`键值对`。 头信息的名称为小写                           |
| 属性 |      rawHeaders       |   ✓    |   ✓    | 原始的请求头或响应头`列表`,偶数下标是键，一下个元素（奇数）下标是对应键值 |
| 属性 |      statusCode       |   ✕    |   ✓    | `客户端`特有                                                              |
| 属性 |     statusMessage     |   ✕    |   ✓    | `客户端`特有                                                              |
| 属性 |      httpVersion      |   ✓    |   ✓    |
| 属性 |        socket         |   ✓    |   ✓    | net.Socket 对象                                                           |
| 方法 |      .destroy()       |   ✓    |   ✓    |
| 方法 |     .setTimeout()     |   ✓    |   ✓    |
| 方法 | setEncoding(encoding) |   √    |   √    | 设定流编码，将 buffer 设置成字符串                                        |
| 事件 |        aborted        |   ✓    |   ✓    | 请求终止且 socket 已关闭                                                  |
| 事件 |         close         |   ✓    |   ✓    | 底层连接被关闭(需要深入对比两者的不同)                                    |
