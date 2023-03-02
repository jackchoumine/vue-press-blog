/*
 * @Description :
 * @Date        : 2021-10-26 22:51:06 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-31 19:18:48 +0800
 * @LastEditors : JackChou
 */
import path from 'path'
import fs from 'fs'
import { NextFunction, Request, Response } from 'express'
import { controller, get, post, use } from '../decorators'
import { Movie } from '../types'

interface BodyRequest<T extends Record<PropertyKey, unknown>> extends Request {
  body: T
}
@controller()
class MovieController {
  @get('/movies/:id?')
  getMovies(req: Request<{ id: number }>, res: Response) {
    const filePath = path.resolve(__dirname, '../../data/playing.json')
    const { id } = req.params
    console.log(req.query, req.params)
    if (fs.existsSync(filePath)) {
      const json = fs.readFileSync(filePath, 'utf-8')
      const data = JSON.parse(json)
      const queryKeys = Object.keys(req.query)
      if (queryKeys.length && !id) {
        // @ts-ignore
        const filteredData = filterData(queryKeys, data, req.query)
        res.send(filteredData)
      } else {
        // FIXME 返回啥 204 vs 404
        const result = id ? data[id] : data
        if (!result) {
          res.sendStatus(404)
        } else {
          res.send(result)
        }
      }
    } else {
      res.send([])
    }
  }

  @post('/movie')
  @use(useCheckLogin)
  @use(useTest)
  createMovie(req: BodyRequest<Movie>, res: Response) {
    const { body } = req
    console.log(body)
    return res.json({ success: true, id: '121020' })
  }
}

export default MovieController

/**
 * @description: 检查登录
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function useCheckLogin(req: Request, res: Response, next: NextFunction) {
  console.log(req.session)
  // @ts-ignore
  const hasLogin = !!req.session!.login
  next()
  // hasLogin ? next() : res.sendStatus(401)
}

function useTest(req: Request, res: Response, next: NextFunction) {
  console.log('middleware')
  next()
}

function filterData<K extends keyof Movie>(keys: K[], data: Movie[], query: Record<string, unknown>): Movie[] {
  return data.filter(item => {
    return keys.some(key => item[key] == query[key])
  })
}
