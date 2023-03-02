/*
 * @Description :
 * @Date        : 2021-10-27 00:51:42 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-27 01:03:53 +0800
 * @LastEditors : JackChou
 */
declare global {
  type Controller = new (...args: any[]) => unknown
}
