# node 路由

## 路由

路由是值服务器根据客户端的不同请求`路径`和`方法`，对请求做出`不同处理`(执行不同的处理函数)。

**server.js**

```javascript
var http = require('http')
//route 是路由处理函数，类似 java 的 controller
// handle 在 route 里调用，类似 java 里的 service 类的方法，根据不同请求，执行不同 handle
// request.url 是传递给 handle 的参数，根据参数调用相应的处理函数
function startServer(route, handle) {
  var onRequest = function (request, response) {
    console.log('Request received ' + request.url)
    route(handle, request.url, response)
  }
  var server = http.createServer(onRequest)
  server.listen(3001, '127.0.0.1')
  console.log('Server started on localhost port 3000')
}

module.exports = {
  startServer: startServer
}
```

**app.js**

```javascript
var server = require('./server')
var router = require('./router')
var handler = require('./handler')
var handle = {}
//根据路径调用不同的处理函数
handle['/'] = handler.home
handle['/home'] = handler.home
handle['/review'] = handler.review
handle['/api/v1/records'] = handler.api_records
//启动 http 服务器
server.startServer(router.route, handle)
```

**router.js**

```js
/**
 * 路由控制，类似 java 里的 controller
 */
var fs = require('fs')
//handle 是路由处理函数
function route(handle, pathname, response) {
  console.log('Routing a request for ' + pathname)
  if ('function' === typeof handle[pathname]) {
    handle[pathname](response)
  } else {
    response.writeHead(404, {
      'Content-Type': 'text/html'
    })
    fs.createReadStream(__dirname + '/404.html', 'utf8').pipe(response)
  }
}

module.exports = {
  route: route
}
```

```js
/**
 * 根据不同的路径返回不同的页面 调用不同的处理函数
 */
var fs = require('fs')

function home(response) {
  response.writeHead(200, {
    'Content-Type': 'text/html'
  })
  fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(response)
}

function review(response) {
  response.writeHead(200, {
    'Content-Type': 'text/html'
  })
  fs.createReadStream(__dirname + '/review.html', 'utf8').pipe(response)
}

function api_records(response) {
  response.writeHead(200, {
    'Content-Type': 'application/json'
  })
  var jsonObj = {
    name: '2012'
  }
  response.end(JSON.stringify(jsonObj))
}

module.exports = {
  home: home,
  review: review,
  api_records: api_records
}
```

**app.js**

```js
var server = require('./server')
var router = require('./router')
var handler = require('./handler')

var handle = {}
handle['/'] = handler.home
handle['/home'] = handler.home
handle['/review'] = handler.review
handle['/api/v1/records'] = handler.api_records

console.log('app started!') //加提示
server.startServer(router.route, handle)
```

**home.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>home</title>
  </head>
  <body>
    <h1>home page</h1>
  </body>
</html>
```

其他页面就不写出来了。
