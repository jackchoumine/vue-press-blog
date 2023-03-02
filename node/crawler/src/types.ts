/*
 * @Description : 类型定义
 * @Date        : 2021-10-24 18:15:44 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-25 05:53:23 +0800
 * @LastEditors : JackChou
 */

type MovieStringKey = Record<
  'poster' | 'title' | 'region' | 'director' | 'actors' | 'category' | 'enough' | 'showed',
  string
>
type MovieNumberKey = Record<'release' | 'star' | 'votecount' | 'subject', number>

export type Movie = MovieStringKey & MovieNumberKey
// TODO
// https://spin.atomicobject.com/2018/05/14/type-safe-object-merging-2-8/

// https://stackoverflow.com/questions/49682569/typescript-merge-object-types
// TODO
// https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1
