# node 核心模块学习之 Buffer

- [node 核心模块学习之 Buffer](#node-核心模块学习之-buffer)
  - [何为 Buffer](#何为-buffer)
  - [实例化 Buffer](#实例化-buffer)
  - [编码](#编码)
  - [读写缓冲区](#读写缓冲区)
  - [填充](#填充)
  - [buffer 比较](#buffer-比较)
  - [buffer.equals(buffer)](#bufferequalsbuffer)
  - [buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])](#bufcomparetarget-targetstart-targetend-sourcestart-sourceend)
  - [arr.sort(Buffer.compare) -- buffer 数组排序，](#arrsortbuffercompare----buffer-数组排序)
  - [检查 buffer](#检查-buffer)
  - [计算需要分配的内存](#计算需要分配的内存)
  - [buffer 大小 buffer.length](#buffer-大小-bufferlength)
  - [buffer 连接 Buffer.concat(bufferList[,totalLength])](#buffer-连接-bufferconcatbufferlisttotallength)
  - [bufSource.copy(bufTarget[,targetStart[,sourceStart[,sourceEnd]]])](#bufsourcecopybuftargettargetstartsourcestartsourceend)
  - [截取 buf.slice([start=0[, end=buf.length]])](#截取-bufslicestart0-endbuflength)
  - [查找 buf.indexOf(value[,byteOffset=0][,encoding=‘utf8’])](#查找-bufindexofvaluebyteoffset0encodingutf8)
  - [buffer 转 String 和 Object](#buffer-转-string-和-object)
  - [buffer 遍历](#buffer-遍历)
  - [TODO](#todo)

## 何为 Buffer

在 ES6 引入 TypeArray 之前，JS 没有能读取和操作二进制数据流的机制，Buffer 作为 Node API 引入，以便能和 TCP 网络流、文件流等进行交互。 目前 ES6 中有 TypeArray 了，Buffer 类以更加优化和适用的于 Node 操作的方式实现了 Unit8Array API。
总之，Buffer 就是用来`操作二进制数据`的，位于全局变量中，无需引入即可使用。
Buffer 实例类似于 整型数组，`缓冲区大小在创建是确定，不能调整`，内存有 C++申请，JS 分配。

> Instances of the Buffer class are similar to arrays of integers but correspond to fixed-sized, raw memory allocations outside the V8 heap. The size of the Buffer is established when it is created and cannot be changed.

> ...mechanism for reading or manipulating streams of binary data. The Buffer class was introduced as part of the Node.js API to make it possible to interact with octet streams in the context of things like TCP streams and file system operations。

Buffer 缓存区，计算机读取速度和处理速度不匹配，读取速度高于处理速度时，会开辟`一段内存区域`来存放待处理的数据，这段内存就叫`缓冲区`。

## 实例化 Buffer

在 v6.0 之前创建 Buffer 对象直接使用 new Buffer()构造函数来创建对象实例，但是 Buffer 对内存的权限操作相比很大，可以直接捕获一些敏感信息，存在安全隐患，之后的版本，用下面几个函数实例画一个 Buffer：

- Buffer.from()
- Buffer.alloc()
- Buffer.allocUnsafe()
  | 函数|参数|返回值|
  |:--:|:--:|:--:|:--:|:--:|
  |from|arry|包含 array 的字节副本的 Buffer,数组中的每一项表示一个`8位字节`的数字，故值在`0--255`以内，否则取余|
  |from|buffer|从 buffer 复制一个新的 buffer|
  |from|arrayBuffer[,byteOffet,[,length]]|与 arrayBuffer 共享内存的 Buffer|
  |from|string[,encoding]|string 初始化的 Buffer|
  |alloc|size[,fill[encoding]]|指定大小的 Buffer 实例额，省略 fill,默认用 0 填充|
  |allocUnsafe|size|指定大小的 buffer,不被初始化，可能包含敏感信息|
  给`allocUnsafe`分配的内存不被初始化，即归零，内存速度快，但是可能包含旧数据，不覆盖这些数据，就可能造成内存泄漏。

### 编码

支持以下编码：

- utf8
- ascii
- base64
- binary
- utf16le
- hex

## 读写缓冲区

**`buffer.write(string[offset,[length]][,encoding])`**

- string - 写入缓冲区的字符串；
- offset - 开始写入的位置，默认 0；
- length - 写入字节，默认 buf.length
- encoding - 编码，默认 utf8。

返回值:`int`：写入的实际大小，没有足够的空间保存，只会写入一部分。
**`buffer.toString([endcoding[,start=0[,end=buffer.length]]])` **
解码指定缓冲区的数据，并按 endcoding 编码格式返回字符串。

```js
let buf = Buffer.alloc(10) //分配 10 个字节的空间
console.log(buf) //<Buffer 00 00 00 00 00 00 00 00 00 00> 没 fill ,用 0 填充

let len = buf.write('this is a buffer') // 16个字节
console.log(buf) //<Buffer 74 68 69 73 20 69 73 20 61 20>
console.log(len) //10

// 上面的代码和下面的一样
let buffer = Buffer.from('this is a buffer'.substring(0, 10))
console.log(buffer) //<Buffer 74 68 69 73 20 69 73 20 61 20>
console.log(buffer.length) //10

let buf2 = Buffer.alloc(8, 10) // 分配 8 个字节的内存，用 10 填充
console.log(buf2) //<Buffer 0a 0a 0a 0a 0a 0a 0a 0a>
let size = buf2.write('this a buffer', 2, 2) //从索引 2 开始写，写入2字节的数据
console.log(buf2) //<Buffer 00 00 74 68 00 00 00 00>
console.log(size) //2
console.log(buf.toString('utf16le', 2, 8)) //獩椠⁳
console.log(buf.toString('base64', 2, 8)) //aXMgaXMg
console.log(buf.toString('ascii', 2, 8)) //is is
console.log(buf.toString('utf8', 2, 8)) //is is
console.log(buf.toString('hex', 2, 8)) //697320697320
```

## 填充

buffer.fill(value[,offset=0[,end=buffer.length]][,endcoding])
value 可以是 `Buffer` 、`String` 、`Int`。

```js
const buf1 = Buffer.alloc(10).fill('abcd') //空间足够，循环填充
console.log(buf1.toString()) //abcdabcdab  循环填充，知道空间满
const buf2 = Buffer.alloc(3).fill('abcdef') //空间不够，截断
console.log(buf2.toString()) //abc
const buf3 = Buffer.alloc(10).fill('abc', 3) //从索引 3 开始填充
console.log(buf3) //<Buffer 00 00 00 61 62 63 61 62 63 61>
console.log(buf3.toString()) //abcabcabca
const buf4 = Buffer.alloc(10).fill('abc', 3, 7) //从索引 3 开始填充,到索引 7 结束
console.log(buf4) //<Buffer 00 00 00 61 62 63 61 00 00 00>
console.log(buf4.toString()) // abca
```

```js
let buffer = Buffer.alloc(10).fill('abcd')
console.log(buffer.toString())
buffer = Buffer.alloc(10).fill(34) // 改变原来的 buffer
console.log(buffer.toString())
```

## buffer 比较

### buffer.equals(buffer)

比较两个 buffer 的数据是否相同。

```js
// 例子一：编码一样，内容相同
var buf1 = Buffer.from('A')
var buf2 = Buffer.from('A')

console.log(buf1.equals(buf2)) // true

// 例子二：编码一样，内容不同
var buf3 = Buffer.from('A')
var buf4 = Buffer.from('B')

console.log(buf3.equals(buf4)) // false

// 例子三：编码不一样，内容相同
var buf5 = Buffer.from('ABC') // <Buffer 41 42 43>
var buf6 = Buffer.from('414243', 'hex') //<Buffer 41 42 43>
var buf7 = Buffer.from('414243', 'utf16le') //<Buffer 34 00 31 00 34 00 32 00 34 00 33 00>
console.log(buf5.equals(buf6)) //true
console.log(buf7.equals(buf6)) //false
```

### buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])

compare 可规定比较的范围，返回一个数字。

```js
const buf1 = Buffer.from('ABC')
const buf2 = Buffer.from('BCD')
const buf3 = Buffer.from('ABCD')

console.log(buf1.compare(buf1)) //0

console.log(buf1.compare(buf2)) //-1

console.log(buf1.compare(buf3)) //-1

console.log(buf2.compare(buf1)) //1

console.log(buf2.compare(buf3)) //1

//  ABC BCD ABCD
console.log([buf1, buf2, buf3].sort(Buffer.compare)) //[ <Buffer 41 42 43>, <Buffer 41 42 43 44>, <Buffer 42 43 44> ]  ABC ABCD BCD
```

### arr.sort(Buffer.compare) -- buffer 数组排序，

按`位`比较，第一位能比出结果的，就确定了。

```js
const buf1 = Buffer.from('81234')
const buf2 = Buffer.from('80234')
const arr = [buf1, buf2]
console.log(arr) //[ <Buffer 38 31 32 33 34>, <Buffer 38 30 32 33 34> ]
console.log(arr.sort(Buffer.compare)) //[ <Buffer 38 30 32 33 34>, <Buffer 38 31 32 33 34> ] 第一位，38=38，不能得出顺序，第二位，30 < 31,buf2 排在前面来。
```

## 检查 buffer

`Buffer.isBuffer(object)`

## 计算需要分配的内存

`Buffer.byteLength(string, encoding=‘utf8’)`

## buffer 大小 buffer.length

```js
console.log(Buffer.byteLength('☃☃')) // 6 需要 6 个字节存储 两个☃☃
let buffer = Buffer.alloc(10).fill('☃', 4) // 从索引 4 开始存，刚好能存 2 个 ☃
console.log(buffer.length) // 10 给 buffer 分配的内存空间
console.log('☃☃'.length) //2  字符串长度
console.log(buffer.toString()) // '☃☃'
console.log(buffer.toString().length) // 6 单位是字节
console.log(Buffer.byteLength('☃☃')) // 6 需要 6 个字节存储两个☃

let buffer2 = Buffer.alloc(10).fill('☃', 5) // 从索引 5 开始存，刚好能存 2 个 ☃ 还差 1 字节空间
console.log(buffer2.toString()) // '☃�' 有一个乱码
console.log(buffer2.toString().length) // 7
```

### buffer 连接 Buffer.concat(bufferList[,totalLength])

totalLength 是所有 bufferList 元素长度的累加。
totalLength > 实际累加长度，用 0 填充；
totalLength < 实际累计长度，后面的舍弃。

```js
//接着上面的代码
let buf3 = Buffer.concat(arr, 4)
console.log(buf3) //<Buffer 38 30 32 33 34 38> 舍弃四位
let buf4 = Buffer.concat(arr, 12)
console.log(buf4) //<Buffer 38 30 32 33 34 38 31 32 33 34 00 00> 0 填充两位
```

## bufSource.copy(bufTarget[,targetStart[,sourceStart[,sourceEnd]]])

复制 bufSource 的 sourceStart -- sourceEnd-1 的字节到 bufTarget 的 target 位置开始存放。
返回值`int`：实际存入的字节数。`目标 buffer 空间不够，复制源会被截断。`

```js
const buf1 = Buffer.alloc(10) //分配 10 个字节的空间
const buf2 = Buffer.from('copyFunction')
console.log('复制前 buf1', buf1) //复制前 buf1 <Buffer 00 00 00 00 00 00 00 00 00 00>

console.log('复制前 buf2', buf2) //复制前 buf2 <Buffer 63 6f 70 79 46 75 6e 63 74 69 6f 6e>

let result = buf2.copy(buf1, 4, 1, 5) //复制 buf1 1--5 字节到 buf2 的  第 4 个索引位置开始存放，用 6 个字节来存放4个字节的数据，空间足够。
console.log('复制后 buf1', buf1) //复制后 buf1 <Buffer 00 00 00 00 6f 70 79 46 00 00>
console.log(buf1.toString()) //opyF
console.log('复制后 buf2', buf2) //复制后 buf2 <Buffer 63 6f 70 79 46 75 6e 63 74 69 6f 6e>
console.log(buf2.toString()) //copyFunction
console.log('复制后 result', result) // 4
```

## 截取 buf.slice([start=0[, end=buf.length]])

从 buf 中截取一部分，组成新的 buffer , 两者内存是共享的，所以修改时，会相互影响。

```js
let buf1 = Buffer.alloc(5).fill('abcd')
let buf2 = buf1.slice()
console.log(buf2.toString()) //abcda
let buf3 = buf1.slice(2, 4)
console.log(buf3) //cd
console.log(buf3.toString()) //cd
// 测试共享内存
console.log((buf3[0] = '100')) // 100 修改 buf3 的第一个值 为 d,返回修改后的值
console.log(buf3[0].toString()) //100
console.log(buf3) //<Buffer 64 64>
console.log(buf3.toString()) //dd  修改了
console.log(buf1) //<Buffer 61 62 64 64 61>
console.log(buf1.toString()) //abdd buf1 也修改了
```

## 查找 buf.indexOf(value[,byteOffset=0][,encoding=‘utf8’])

从 buf 的 byteOffset 位置开始查找 value，找到一个 value,返回其索引，否则返回 -1。value 可以是 `String` 、`Int` 、`Buffer`。

```js
const buf2 = Buffer.from('copyFunction')
let result = buf2.indexOf('c', 3, 'utf8')
let result2 = buf2.indexOf('c')
let result3 = buf2.indexOf('C')
console.log(result) // 7 索引 3 之后第一个 c 的索引
console.log(result2) // 0 第一个 c
console.log(result3) // -1
buf2.indexOf(Buffer.from('copy'), 2, 'utf8') //-1
buf2.indexOf(9, 4) //-1
```

```js
let buffer = Buffer.alloc(10).fill('abcd')
console.log(buffer.toString()) // abcdabcdab

// 递归查找所有 buffer
let index = [] //这里很关键 存储查找到的下标
function recursiveIndexOf(buffer, char, start) {
  if (start < 0) {
    start = 0
  }
  if (start > buffer.length - 1) {
    return -1
  } // 开始下标大于 buffer 最大下标，返回 -1，也是递归出口
  let index = buffer.indexOf(char, start)
  if (index !== -1) {
    index.push(index)
    recursiveIndexOf(buffer, char, index + 1)
  }
  return index
}
let result = recursiveIndexOf(buffer, 'a', 0)
console.log(result) //[0,4,8]
```

## buffer 转 String 和 Object

`buf.toString([encoding=utf8[,start=0[,end=buf.length]]])`、`buf.toJSON()`
`toJSON 返回一个对象。{type:'Buffer',data:[]}` data 是 buffer 的值。

```js
let buffer = Buffer.alloc(10).fill('abcd')
console.log(buffer.toString()) //abcd
console.log(buffer.toJSON()) //{ type: 'Buffer',data: [ 97, 98, 99, 100, 97, 98, 99, 100, 97, 98 ] }
console.log(Object.getPrototypeOf(buffer.toJSON())) // {}  可见 toJSON 返回的是对象
console.log(buffer[0]) //97
console.log(buffer.toJSON().data[0]) //97
console.log(buffer.toJSON().data) //[ 97, 98, 99, 100, 97, 98, 99, 100, 97, 98 ]
console.log(JSON.stringify(buffer.toJSON())) // 变成 json 字符串
```

## buffer 遍历

`buffer.keys()`、`buffer.values()` 、`buffer.entries()`

```js
let buffer = Buffer.alloc(10).fill('abcd')
for (let key of buffer.keys()) {
  process.stdout.write(`${key}`) //输出不换行，write 只能接收 String 和 Buffer 作为参数，可用模板字符串转换
  // console.log(key) 这样输出会换行
}
//0123456789
console.log()
for (let value of buffer.values()) {
  process.stdout.write(`${value}`) //9798991009798991009798
}
console.log('')
for (let entriy of buffer.entries()) {
  console.log('buffer[%d]==%d', entriy[0], entriy[1])
}
/* 
buffer[0]==97
buffer[1]==98
buffer[2]==99
buffer[3]==100
buffer[4]==97
buffer[5]==98
buffer[6]==99
buffer[7]==100
buffer[8]==97
buffer[9]==98 
*/
```

## TODO

- TypeArray vs Buffer vs ArrayBuffer ####参考文章：
- [NodeJS stream 一：Buffer](https://www.cnblogs.com/dolphinX/p/6279805.html)
- [Nodejs 进阶：核心模块 Buffer 常用 API 使用总结](https://www.cnblogs.com/chyingp/p/nodejs-learning-buffer.html)
- [Do you want a better understanding of Buffer in Node.js? Check this out.](https://medium.freecodecamp.org/do-you-want-a-better-understanding-of-buffer-in-node-js-check-this-out-2e29de2968e8)
