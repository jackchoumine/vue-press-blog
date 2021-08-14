# dayjs 使用

轻量的处理时间和日期的 JavaScript 库。
Dayjs 并没有改变或覆盖 Javascript 原生的 Date.prototype， 而是创造了一个全新的包含 Javascript Date 对象的 Dayjs 的对象。
Dayjs 对象是不可变的, 所有的 API 操作都将返回一个新的 Dayjs 对象。

## 常用函数

1. 格式化

```js
dayjs().add(-age, 'year').format('YYYY-MM-DD')
console.log(dayjs(1628817109298).format(dateFormat));// 2021-08-13
console.log(dayjs('1628817109298').format(dateFormat));// 1634-11-10
```
> 参数必须是 number 类型。

2. 格式判断

```js
dayjs('1970-00-00', 'YYYY-MM-DD').isValid() // true
```

> 参数必须是 字符串 + 格式


3. 时间运算

4. 时间前后判断
