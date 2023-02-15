# ts 类型操作

- never 代表不可达，比如函数抛异常的时候，返回值就是 never。
- void 代表空，可以是 undefined 或 never。
- any 是任意类型，任何类型都可以赋值给它，它也可以赋值给任何类型（除了 never）。
- unknown 是未知类型，任何类型都可以赋值给它，但是它不可以赋值给别的类型。

## 操作索引类型

对象、class 在 TypeScript 对应的类型是索引类型（Index Type），那么如何对索引类型作修改呢？

- keyof T 是查询索引类型中所有的索引，叫做索引查询。

- T[Key] 是取索引类型某个索引的值，叫做索引访问。

- in 是用于遍历联合类型的运算符。

索引类型（对象、class 等）可以用 string、number 和 symbol 作为 key，这里 keyof T 取出的索引就是 `string | number | symbol` 的联合类型。

```ts
type MapType<T> = {
  [Key in keyof T as `${Key & string}${Key & string}${Key & string}`]: [
    T[Key],
    T[Key],
    T[Key]
  ]
}
type Res = MapType<{ a: 1; b: 2 }>
```

## 交叉类型

```ts
// 交叉类型 & 类似并集，做类型合并
// FIXME: 也不全是并集？？
// 哪些类型可以做交叉？
type ObjType = { a: number } & { c: boolean }
```
