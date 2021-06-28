# node 核心模块之 querystring 和 url

querystring 用于解析和序列化查询字符串。
url 是和整个 url 相关的模块

## querystring

### 两个常用方法：

1. 解析方法： parse

- parse(queryStr[,sep='&'[,eq='='[,options]]])
  `queryStr` —— 查询字符串，往往是 key1=value1&key2=value2&key2=value3 的形式; `前面没 ？`
  `sep`:界定 键值对 的分割符，默认 '`&`';
  `eq`:界定 键值 的分割符，默认 '`=`';
  `options`:对象，decodeURIComponent：解码查询字符串时用到的函数，默认 `querystring.unescape()`
  `mayKeys`:number,解析的键的最大数量，默认 1000。
  返回值：类似{key1:value1,key2:[value2,value3]}的对象。`不继承自 Object,也就是无Object 类的方法。如： toString()、hasOwnProperty()。`

```js
const qs = require('querystring')
let url =
  'newwindow=1&ei=heGsW4zNM-TY9AOmmavoBQ&q=https+%E6%A8%A1%E5%9D%97+nodejs&oq=https+%E6%A8%A1%E5%9D%97+nodejs&gs_l=psy-ab.3..'
query = qs.parse(url, null, null)
console.log(query)
/*
{ newwindow: '1',
  ei: 'heGsW4zNM-TY9AOmmavoBQ',
  q: 'https 模块 nodejs',
  oq: 'https 模块 nodejs',
  gs_l: 'psy-ab.3..' 
}
*/
```

2. 序列化方法：stringify

- stringify(queryObj[,sep='&'[,eq='='[,options]]])
  与 parse 相反的操作。
  queryObjet 属性的类型为 string/string[]/number/number[]/boolean/boolean[] ，则属性值会被序列化。其他类型值会被转为`空字符串`。options 没有 maxkeys 属性。

```js
const qs = require('querystring')
let queryStr = qs.stringify({ foo: 'bar', baz: ['jack'], students: ['jack', 'tom'] })
console.log(queryStr) //foo=bar&baz=jack&students=jack&students=tom
```

## url

url 模块的功能有生成 、解析、拼接 URL。

### 生成 URL()

URL(input[.base]) input 要解析的 url ,url 是相对 url, 则要解析 base

###解析 url url.parse(url[,queryObject])
queryObject 为 true 时，查询字符串会转为一个`对象`。

```js
const url = require('url')
const myURL = url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash')
console.log(myURL.query)
/*
Url {
  protocol: 'https:',
  slashes: true,//斜杠
  auth: 'user:pass',
  host: 'sub.host.com:8080',
  port: '8080',
  hostname: 'sub.host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash' 
}
*/
```

`常见用法：`

```js
const url = require('url')
const myURL = url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash', true)
console.log(myURL.query) // {query:'string}
console.log(myURL.path) ///p/a/t/h?query=string  不含 hash
console.log(myURL.pathname) ///p/a/t/h 只有路径
```

### format(urlObj[,options]),将 URL 对象，转为字符串。

options:

- fragment=false，
- unicode=false，是否采用 Unicode 编码集；
- auth=false，是否显示认证信息。

```js
const url = require('url')
const myURL = new url.URL('https://a:b@你好你好?abc#foo')

console.log(myURL.href)
// 输出 https://a:b@xn--6qqa088eba/?abc#foo

console.log(myURL.toString())
// 输出 https://a:b@xn--6qqa088eba/?abc#foo

// url 的format 可控制函数输出形式
console.log(url.format(myURL, { fragment: true, unicode: true, auth: true }))
// 输出 'https://你好你好/?abc'
```

### resolve(form,to) 拼接 url

```js
url.resolve('/one/two/three', 'four') // '/one/two/four'
url.resolve('http://example.com/', '/one') // 'http://example.com/one'
url.resolve('http://example.com/one', '/two') // 'http://example.com/two'
```
