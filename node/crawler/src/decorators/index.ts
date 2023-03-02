/*
 * @Description :
 * @Date        : 2021-10-26 21:36:17 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-29 22:30:33 +0800
 * @LastEditors : JackChou
 */
import 'reflect-metadata'
import { RequestHandler } from 'express'
import { isFunction } from '../utils'
// FIXME 编译后无法识别路径别名
// import { isFunction } from '@utils/index'
import router from '../route'
// FIXME 如何声明全局类型
type Controller = new (...args: any[]) => unknown

enum Method {
  get = 'get',
  post = 'post',
  delete = 'delete',
  put = 'put',
  patch = 'patch',
}
export function controller(root: string = '') {
  return function (constructor: Controller) {
    const prototype = constructor.prototype

    Object.keys(prototype).forEach(key => {
      const path: string = Reflect.getMetadata('path', prototype, key)
      const _path = `${root}${path}`
      const method: Method = Reflect.getMetadata('method', prototype, key)
      const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', prototype, key) || []
      console.log(_path)
      console.log(method)
      console.log(middlewares)

      const handler: RequestHandler = prototype[key]
      if (path && method && isFunction(handler)) {
        // NOTE 将 method 声明为 Method 类型，不再报错
        // WHY
        router[method](_path, ...middlewares, handler)
      } else {
        router[method](_path, handler)
      }
    })
  }
}

export function use(middleware: RequestHandler) {
  return function (constructor: any, methodName: string, descriptor: PropertyDescriptor) {
    // FIXME:有点复杂
    const originalMiddlewares: RequestHandler[] = Reflect.getMetadata('middlewares', constructor, methodName) || []
    // NOTE 方法装饰器从下到上，从右到左执行
    // unshift 保证下面的中间件在后面，处理路由时后执行
    // 这样可使得书写顺序和执行顺序一致
    originalMiddlewares.unshift(middleware)
    Reflect.defineMetadata('middlewares', originalMiddlewares, constructor, methodName)
  }
}

export function get(path = '') {
  return function (prototype: any, methodName: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('path', path, prototype, methodName)
    Reflect.defineMetadata('method', 'get', prototype, methodName)
  }
}

export const post = getRequestDecorator(Method.post)
// NOTE 装饰器模式改善代码
// export function post(path: string) {
//   return function (prototype: any, methodName: string, descriptor: PropertyDescriptor) {
//     Reflect.defineMetadata('path', path, prototype, methodName)
//     Reflect.defineMetadata('method', 'post', prototype, methodName)
//   }
// }
export const remove = getRequestDecorator(Method.delete)
export const put = getRequestDecorator(Method.put)
export const patch = getRequestDecorator(Method.patch)

function getRequestDecorator(method: Method) {
  return function (path = '') {
    return function (prototype: any, methodName: string, descriptor: PropertyDescriptor) {
      Reflect.defineMetadata('path', path, prototype, methodName)
      Reflect.defineMetadata('method', method, prototype, methodName)
    }
  }
}
