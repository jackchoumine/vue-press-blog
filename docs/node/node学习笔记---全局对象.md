# node 学习笔记 --- 全局对象

## global 对象

node 用一个类似 window 的对象，是`全局变量`的宿主。
全局变量：

- global 的属性；
- 隐士定义的变量；
- 最外层定义的变量。
  node 不可能在最外层定义变量，因为所有代码都在当前模块，而模块不是最外层上下文。

## process

`process` 是全局变量，global 的属性。描述当前 node 进程的状态，提供了一个与 操作系统的简单接口，命令行程序需要与之打交道。

- `process.argv` 是命令行参数，第一个是 node，第二个元素是脚本文件名，第三个元素开始是运行的参数。

```js
// test.1.js
console.log(process.argv)
```

运行：

```bash
$ node test.1.js 'jackzhou' age=23 location=Chengdu
[ 'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\Administrator\\Desktop\\nodeJS学习\\node开发指南笔记\\test.
1.js',
  'jackzhou',
  'age=23',
  'location=Chengdu' ]
```

- `process.stdout` 是标准输出流，通常我们使用 `console.log()`向标准输出打印字符串，而 `process.stdout.write()` 函数提供了更底层的接口。
- `process.stdin`是标准输入流
- `process.nextTick(callback)`的功能是为事件循环设置一项任务， node 会在下次事件循环响应时调用 callback。
  一个 node 进程只有一个线程，任何时刻，只有一个事件在执行。如果一个事件占用大量 CPU 时间，事件循环中的下一个事件，就需要等待很久，node 的一个编程原则是尽量缩短每个事件的执行时间。`process.nextTick()`可把复杂工作拆散成一个个较小的事件，从而缩短事件等待时间。

## console

console 对象提供标准输出，用于标准输出流（stdout）或者标准错误流（stderr）。

- `console.log()`,输出字符并`换行`。
- error 。
- trace：向标准输出流输出调用栈。
