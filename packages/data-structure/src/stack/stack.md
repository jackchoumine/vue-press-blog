# 栈结构

## 简介

数组是一种线性结构，并且可在数组的任意位置插入和删除元素。栈和队列是常见的**受限的**线性结构。

如图：

![栈结构](https://gitee.com/jackzhoumine/jack-picture/raw/master/data-structure/stack.png)

栈是一种后进先出的线性结构。

实现栈结构的常见方式：

基于数组实现；

基于链表实现。

## 栈的常见操作

1. push(item)--入栈
2. pop()--移除栈顶元素，返回移除的元素；
3. peek()--获取栈顶元素，不删除；
4. isEmpty()--判断栈中是否有元素；
5. size()--返回元素个数，类似数组的 length ;
6. toString()--将栈中元素以字符串形式返回。

## 应用

### 十进制转二进制

关键：对 2 取余，入栈，再依次出栈。

```js
export function des2(n = 2, convertNumber = 0) {
  const stack = new Stack()
  while (convertNumber > 0) {
    stack.push(convertNumber % n)
    convertNumber = Math.floor(convertNumber / 2)
  }

  let bin = ''
  while (!stack.isEmpty()) {
    bin += stack.peek()
    stack.pop()
  }
  return bin
}
```
