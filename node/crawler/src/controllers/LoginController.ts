/*
 * @Description :
 * @Date        : 2021-10-26 21:11:55 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-29 21:12:20 +0800
 * @LastEditors : JackChou
 */
import { Response, Request } from 'express'

import { get, controller } from '../decorators'

@controller()
class LoginController {
  @get('login')
  login(req: Request, res: Response) {
    res.json({ data: [{ name: 'jack', age: 20 }] })
  }

  @get('')
  home(req: Request, res: Response) {
    const html = `<html>
    <body>
      <form action="login" method="post">
        <input type="password" placeholder=请输入密码 name="password" />
        <button>登录</button>
      </form>
    </body>
  </html>`
    res.send(html)
  }
}

export default LoginController
