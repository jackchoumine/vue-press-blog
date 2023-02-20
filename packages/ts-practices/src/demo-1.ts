/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-16 09:08:19
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-02-20 10:57:26
 * @Description : 类型操作: keyof in extends 函数重载
 * 参考 https://mp.weixin.qq.com/s/0iwHVcW8nfsKG2xQD9TaLw
 */
type MyPick<T, K extends keyof T> = { [S in K]: T[S] }

// CHECKME S 是哪儿来的？ in 遍历出来的 ，类似 for (variable in object) 的 variable

// interface IUser {
//   name: string
//   age: number /*  */
//   number: number
// }

interface IEditUser {
  name: string
  age: number
}

interface IUser extends IEditUser {
  number: number
}
type EditUser = MyPick<IUser, 'name' | 'age'>

function getValue<T, K extends keyof T>(obj: T, key: K): T[K]
function getValue<T>(obj: T): T

function getValue<T, K extends keyof T>(obj: T, key?: K) {
  return key ? obj[key] : obj
}

getValue<IEditUser>({ name: 'JACKSON', age: 12 })
getValue<IEditUser, 'age'>({ name: 'JACKSON', age: 12 }, 'age')

function getValueByKey<T>(obj: T, key?: keyof T) {
  return key === undefined ? obj : obj[key]
}

getValueByKey<IEditUser>({ name: 'name', age: 12 }, 'age')

type MyExclude<T, U> = T extends U ? never : T

type IsContain<T, U> = T extends U ? true : false

type IsHello = 'age' | 'name' extends 'age' ? true : false

type IsChid = IUser extends IEditUser ? never : IUser

type DHello1 = IsContain<IUser, IEditUser>

type DHello = MyExclude<IUser, IEditUser>

type IsIncludeAge = IsContain<'age' | 'name', 'age'>

type Hello = MyExclude<'age' | 'name', 'age'>
