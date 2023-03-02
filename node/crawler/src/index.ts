/*
 * @Description :
 * @Date        : 2021-10-25 00:04:12 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-31 21:02:26 +0800
 * @LastEditors : JackChou
 */
import express, { NextFunction, Request, Response } from 'express'
// import cookieSession from 'cookie-session'
import session from 'express-session'
import './controllers'
import router from './route'

const PORT = 3000
const ONE_DAY = 1000 * 60 * 60 * 24

const app = express()

// application/json
app.use(express.json())
// x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// FIXME: 如何使用?
app.use(
  session({
    name: 'session', // 存放在 cookie 的 key，如果不写的话预设是 connect.sid
    secret: 'mySecret', //  用来签名存放在 cookie 的 sessionID
    saveUninitialized: false,
    resave: true,
  })
)

// https://medium.com/johnny%E7%9A%84%E8%BD%89%E8%81%B7%E5%B7%A5%E7%A8%8B%E5%B8%AB%E7%AD%86%E8%A8%98/node-js-cookie-session%E9%A9%97%E8%AD%89%E5%8E%9F%E7%90%86%E4%BB%A5%E5%8F%8Aexpress-session%E5%A5%97%E4%BB%B6%E4%BD%BF%E7%94%A8-aeafa386837e

app.use((req: Request, res, next: NextFunction) => {
  // TODO 类型融合
  // req.name = 'Jack'
  next()
})

app.use(router)

app.listen(PORT, () => {
  console.log(`koa server is running at port ${PORT}`)
})
