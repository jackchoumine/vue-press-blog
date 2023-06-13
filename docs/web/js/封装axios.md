# 如何优雅地封装 axios

工作中接手他人的项目，看到一些 axios 封装很是复杂，难用，现在来总结一下 axios 封装 xhr 的问题。

![](https://tva1.sinaimg.cn/large/008vxvgGly1h856xt5v1tj306k08wt9h.jpg)

在 vue 项目中使用，希望达到下面的效果：

- 引用方便，在组件中，通过 `this.$http[method]` 使用；

- 兼容 REST 风格封装，使用 JSON 进行交互，提供常用的四种方法；

- 不同请求方法，参数格式一致，`this.$http.get(url,params)`、`this.$http.post(url,params)`；

- 可进行二次确认，`this.$http.delete(url,params,{content:'删除后不可恢复!',type:'danger'})`；

- 统一处理错误，同时提供抛出错误的方法，比如 `this.$http.getWithError(url)`，使用时可在函数里捕获错误；

- 错误时，控制台有特别的日志输出，要是公司有条件，可提交到服务器，方便排查问题；

- 重复请求，可取消；

- 用户切换路径，取消请求；

- 文件下载；

<!--BUG https://attacomsian.com/blog/javascript-download-file -->

> 额外的功能

有 mock 服务的，可指定是否走 mock 服务，似乎很多公司都没有这个。

能想到的就是以上了，根据上面的需求，封装 GET 和 POST

## 封装实现

### 基本封装

```js
import axios from 'axios'
import { logInfo, redLog, blackLog } from '@/utils'
// 创建一个实例，此后都在此实例上改造
const http = axios.create({
  // timeout: 1000 * 4,
  withCredentials: true,
})
// 请求拦截器
const beforeRequest = config => {
  // 设置 token
  const token = localStorage.getItem('token')
  token && (config.headers.Authorization = token)
  // NOTE  添加自定义头部
  config.headers['my-header'] = 'jack'
  return config
}

http.interceptors.request.use(beforeRequest)

// 响应拦截器
const responseSuccess = response => {
  // eslint-disable-next-line yoda
  // 这里没有必要进行判断，axios 内部已经判断
  // const isOk = 200 <= response.status && response.status < 300
  return Promise.resolve(response.data)
}

const responseFailed = error => {
  const { response } = error
  if (response) {
    // handleError(response)
    logInfo(response)
    // cons error = new Error(response.data.msg)
    return Promise.reject()
  } else if (!window.navigator.onLine) {
    redLog('没有网络')
    return Promise.reject(new Error('请检查网络连接'))
  }
  return Promise.reject(error)
}
http.interceptors.response.use(responseSuccess, responseFailed)

export default {
  get,
}
```

> 关于请求头的指定

axios 根据参数格式，自动采设置`content-type`：传递对象，设置为 json 提交，传递字符串时，资源设置为 `application/x-www-form-urlencoded;charset=UTF-8`。

> 希望只传递对象，且不想 axios 自动设置，就手动设置 content-type 为 `json`

```js
const http = axios.create({
  withCredentials: true,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
  },
})
```

> 关于拦截器

可在请求发送之前和返回之后，在拦截器里做一些你想要的操作，比如转化格式，添加自定义的请求头，处理错误，都是在拦截器里操作。这正是我们使用它的理由。

拦截器接收两个函数，第一个 `onResolved`，第二个为`onRejected`，他们的作用和 promise.then 的参数一致。

希望在请求发送之前执行某些操作，自请求拦截器里操作。

希望在响应返回 JS 代码之前，执行操作在响应拦截器里操作。

> axios 不知道返回我们希望的数据，需要在响应拦截器里处理一下：

```js
const responseSuccess = response => {
  // eslint-disable-next-line yoda
  // 这里没有必要进行判断，axios 内部已经判断
  // const isOk = 200 <= response.status && response.status < 300
  return Promise.resolve(response.data)
}
```

> 错误处理，很关键

在响应拦截器里统一处理常见的错误，比如`404`、`403`、断网等。

::: tip 争论

> 只有 status 为 200 --- 299 才是成功吗？

REST 风格主张在接口设计中充分利用 http 语义，使用 http 状态码来表示接口状态，我也喜欢这种方式。有几个好处：

1. 通用：http 是通用协议，没有额外的沟通成本；
2. 自带文档：充分利用 http 的语义写 REST 风格的 API，可不写文档。理由：它们已被很多人了解。
3. 好理解：由于上面的原因，接口好理解。
4. 方便调试：基于 1、2 的原因，联调很方便。
5. 对新人友好：新成员加入团队，没有规范文档，没有项目说明，基于前面三点，能让新人快速投入。

> 需要额外定义错误状态吗？

遵循 REST 风格的 API，额外指定错误状态码，违背了充分利用 http 语义的原则，增加了沟通成本，是有害的。

> 不额外指定错误状态码，如何指定错误信息？

利用 http 状态码和返回消息表示错误，可`减少联调难度`，减少沟通。

有些公司路径错误、参数格式不对，状态码都是 200，而且返回的错误信息不具体，随着接口参数字段的增加，调试难度成倍增加，文档还写得垃圾。**最后进度延期，就让前端背锅。**

http 状态码本身对 http 请求结果进行了分类，而且浏览器会显示错误的请求，外加自定义的信息，可大大降低调试成本。

比如参数不符合预期，就设置状态码为`400`，在消息里面给出正确的参数提示和用户用户的信息：

```js
{
  msg:'输入不符合要求，请检查',// 给用户看的
  content:'id 必须为数字；date 必需' // 给开发看的
}
```

> **额外指定错误状态码，是非常不好的实践。**

> 给出具体的错误信息会带来安全风险？

有人说，给出具体的接口错误信息，有安全风险。这属于后台代码问题，而不是接口设计问题。

好的接口设计应该是易用的、能提高团队协作效率的。

:::

### 如何在组件种中更方便的使用

在 main.js 挂载到 vue 的原型上。

```js
Vue.prototype.$http = http // 组件中 使用 this.$http 使用
```

### 如何优雅得封装 POST

`优雅`是关键词。有些团队使用 GET 或者 POST 来执行一些危险操作，比如删除，再执行前，往往需要用户二次确认，通常的做法：`每个需要确认的接口，都写一遍二次确认的代码`，这是很不优雅的写法，会导致代码难以理解和维护。

优雅的写法：在接口中传递参数，指定是否需要二次确认。

以 Element UI 的确认框为例子：

```js
import { MessageBox } from 'element-ui'
export const post = (url, params, confirm = false) => {
  return new Promise((resolve, reject) => {
    if (confirm || confirm.confirm) {
      MessageBox.confirm(confirm.confirm || '确认操作吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // NOTE 不要使用 {} 包裹 params
          resolve(http.post(url, params))
        })
        .catch(_ => {
          console.log('取消请求')
        })
    } else {
      resolve(http.post(url, params))
    }
  })
}
```

用户点击取消时，执行 `catch`，执行 reject ，会报错错误，但是这不是错误，所以不做处理。

这些调用：

```js
async postHttp() {
      try {
        const res = await this.$http.post('admin/test', { name: 'jack', age: 24 }, { confirm: '确定发送吗？' })
        console.log(res)
      } catch (error) {
        this.$message(error.msg)
      }
    }
```

![](https://tva1.sinaimg.cn/large/008i3skNgy1gs5ayz0l8mj30t80bw75m.jpg)

### 如何处理错误

当接口出错时，往往需要提示用户，通常的做法是在每个接口调用的 catch 函数里写，比如上面的
`this.$message(error.msg)`。

> 可以统一处理吗？

**可以**，在响应拦截器中。

```js
import { Message } from 'element-ui'

const message = ({ data }) => {
  Message({ message: data.msg, type: 'error' })
}
const responseFailed = error => {
  const { response } = error
  if (response) {
    // handleError(response)
    message(response)
    logInfo(response)
    // cons error = new Error(response.data.msg)
    return Promise.reject()
  } else if (!window.navigator.onLine) {
    redLog('没有网络')
    return Promise.reject(new Error('请检查网络连接'))
  }
  return Promise.reject(error)
}

http.interceptors.response.use(responseSuccess, responseFailed)
```

message 是错误提示框。

logInfo(response) 是错误输出，`方便调试`，输出如下：

![](https://tva1.sinaimg.cn/large/008i3skNgy1gs5bewaxovj30t40bu40p.jpg)

> 还有哪些可能的需求？

1. 提交错误日志到服务器，方便监控状态和复现问题；

2. 针对不同的错误，进行不同的处理。

401 时，跳转到注册页面，用户注册后跳转回来；

403 时，提示用户用登录，登录后再跳转回来；

断网时，显示断网组件等。

> 需要再 rejected 错误吗？

如果已经给可能出现的错误，统一处理了，可以不再 reject ,而是`resolve()`

缺点：

1. 接口不遵循 RESTful 理念，会增加额外的处理成本。

比如 404 也返回 200，在消息体里使用 code:404 表示没有资源，对 axios 而言，其实是成功的，还需要在响应成功拦截器里编写处理函数。

2. 使用者会困惑

都 resolve 了，还报错？还没数据？

优点：不用额外处理错误了，在 then 里拿数据即可。

```js
postHttp2() {
      this.$http.post('admin/test', `{ name: 'jack', age: 24 }`)
      .then(res => {
        console.log(res)
      })
    }
```

> 可见，还是 reject 好。

> 其实还可再提供一个 resolve 的接口，外部这样调用。

```js
this.$http.getNoError().then()
```

### 如何取消请求

axios 可取消请求，我使用`new CancelToken`来取消。

```html
<template>
  <div>
    <button @click="axiosGet">axiosGet 请求</button>
    <button @click="cancelAxiosGet">取消 axiosGet 请求</button>
  </div>
</template>

<script>
  import axios from 'axios'
  const CancelToken = axios.CancelToken
  export default {
    name: 'MyRouter',
    data() {
      return {
        cancel: '',
      }
    },
    methods: {
      axiosGet() {
        axios
          .get('admin/test', {
            cancelToken: new CancelToken(c => {
              this.cancel = c
            }),
          })
          .then(res => {
            console.log(res.data)
          })
          .catch(error => {
            if (axios.isCancel(error)) {
              console.log('取消请求')
            } else {
              console.log(error)
            }
          })
          .finally(() => {
            this.cancel = null
          })
      },
      // 取消请求
      cancelAxiosGet() {
        this.cancel && this.cancel('取消请求')
      },
    },
  }
</script>
```

### 取消的原理

```js
new CancelToken(c => {
  this.cancel = c
})
```

调用 `CancelToken`，得到一个取消配置，配置有 promise 实例。CancelToken 参数是一个函数，axios 调用该函数时，又传递一个函数，就是取消函数 c， c 又调用取消配置的 promise.resolve，在请求适配器内，检测到 promise 变化，在 then 中执行 xhr 的 reject 方法。

```js
function CancelToken(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('executor must be a function.')
  }

  var resolvePromise
  // NOTE 添加一个 promise 实例
  this.promise = new Promise(function promiseExecutor(resolve) {
    // 函数
    resolvePromise = resolve
  })

  var token = this
  fn(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return
    }
    token.reason = new Cancel(message)
    resolvePromise(token.reason)
  })
}
```

可这样调用：

```js
let resole = null
const cancel = new CancelToken(onResoled => {
  resole = onResoled
})

resolve()
// 等同一执行
cancel.promise.then(message => {
  //
})
```

比如：

```js
let myPromise = null
function myXHR() {
  const promise = new Promise(resolve => {
    resole()
  })
  myPromise = promise
  return promise
}

// 可以这样执行
myXHR().then(res => {})
// 也可以
myPromise.then()
```

CancelToken 有一个 promise 属性，可以调用这样调用：

```js
config.cancelToken.promise.then(message => {
  reject(message) // reject 是 xhr 的，而 message 是 cancel 函数传入的。
})
```

关键源码：

```js
function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let request = new XMLHttpRequest()
    if (config.cancelToken) {
      config.cancelToken.promise.then(function onCanceled(cancel) {
        // 取消请求
        request.abort()
        reject(cancel)
        // Clean up request
        request = null
      })
    }
  })
}
```

组件的取消请求，需要用户手动点击按钮，要是能自动判断请求是否重复，取消重复请求才是期望的。

### 如何取消重复请求

既然取消的标准还是保存在请求配置里，就可以在拦截器里判断是否重复，然后取消重复。

三种取消重复请求方案：

1. 只允许最新的请求发送，老的请求都取消

实现关键：在**请求拦截器**里记录请求时，先判断是否已经存在，存在取消，再添加，保证记录都不同。

优点：多次请求，保证了最新的请求发出，用户拿到的一定是最新的数据，类似**防抖**。

缺点：

①. 由于只有一个请求发出，可能失败，同时，网络慢的话，用户会等待更久。

②. 同时可能后台已经处理请求到一半了，然后请求被取消了，马上又进来一个请求，可能会造成效率不会太高。

> 只允许最新的请求发出

![允许最新的请求发出](https://tva1.sinaimg.cn/large/008vxvgGly1h854izzaymj31hq0dwn1y.jpg)

---

2. 只允许最老的请求发送，新的请求都取消

实现关键：在**请求拦截器**里记录请求和取消请求，**在响应拦截器**重置记录，让用户可以再次发出。

优点：多次请求，保证了最老的请求发出，服务器压力小。

缺点：用户拿到的可能不是最新的数据。

![](https://tva1.sinaimg.cn/large/008vxvgGly1h86dhkhojmj31cu0lmqci.jpg)

发出 14 个，后来的都取消了，第一个成功返回。

---

3. 允许多个请求发送，有一个请求成功，取消其他还在处理的请求

实现关键：在**请求拦截器**记录每个请求，在**响应成功拦截器**中取消其他请求。

优点：能保证请求至少返回一个，尤其是当单个失败的可能性比较大，允许发出多个，那么用户频繁操作，成功的概率就更大。

缺点：

①. 用户拿到的数据不能保证是最新的。

②. 能否成功取消，由**网络速度**和这**这部分代码**执行速度决定，网络比代码快，比如网络 10 毫秒内返回，可能无法请求，原因是第一个网络成功了，第二个请求还没发出，即网络返回了，判断重复的函数还没执行。

> 重复的请求都发出

![重复的请求都发出](https://tva1.sinaimg.cn/large/008vxvgGly1h85566dyiij31gy078jsq.jpg)

> 有一个请求成功后，其他正在进行的请求取消

![有一个请求成功，其他的请求取消](https://tva1.sinaimg.cn/large/008vxvgGly1h8557j50ycj31fe05i75p.jpg)

### 取消重复请求的具体实现

当 url、method、参数一样，就是相同请求。

第三种方案成功拿到数据的可能性大，它对用户更加友好，就讲它如何实现。

在请求拦截器里记录请求：

```js{2,9,15-19,24}
// NOTE 用于记录重复的请求
let repeatRequests = {}

function generateRequestKey(config) {
  const { method, url, params, data } = config
  const split = '---'
  const array = [`url:`, url, `${split}method:`, method]
  params && array.push(`${split}params:`, qs.stringify(params))
  data && array.push(`${split}data:`, typeof data === 'object' ? JSON.stringify(data) : data)
  return array.join('')
}

function addPendingRequest(config) {
  const requestKey = generateRequestKey(config)
  config.cancelToken = new axios.CancelToken(cancel => {
    !repeatRequests[requestKey] && (repeatRequests[requestKey] = [])
    repeatRequests[requestKey].push(cancel)
  })
  return config
}
// 请求拦截器
const beforeRequest = config => {
  // NOTE 记录请求
  addPendingRequest(config)
  return config
}

http.interceptors.request.use(beforeRequest)
```

在响应拦截器的成功方法中取消请求：

```js{7,14}
function removePendingRequest(config) {
  const requestKey = generateRequestKey(config)
  const needCancel = repeatRequests[requestKey]?.length > 1
  if (needCancel) {
    // 不重复，不取消
    repeatRequests[requestKey].forEach(cancel => {
      cancel(requestKey)
    })
  }
  needCancel ? (repeatRequests[requestKey] = []) : (repeatRequests = {})
}
// 响应拦截器
const responseSuccess = response => {
  removePendingRequest(response.config)
  return Promise.resolve(response.data)
}
```

高亮部分为关键代码。

:::tip 如何判断重复请求
对于 post、put 请求， data 的格式在请求时被 axios 根据`content-type`修改了，因为在请求拦截器和响应拦截器里都要获取请求标识，
都调用了 `generateRequestKey`, 需要把 data 处理成相同的格式。

所以有：

`typeof data === 'object' ? JSON.stringify(data) : data`

:::

## 总结

优雅地封装 axios 的关键：

1. 提供快捷方法；

2. 统一处理错误；

3. 能二次确认；

4. 能取消重复请求；

5. 合理使用拦截器。

实现了关键功能，其他功能可根据需要添加。

如果你有想说的，欢迎在 issue 里告诉我。
