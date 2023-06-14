/*
 * @Description : mongoDB 连接
 * @Date        : 2022-04-14 21:41:05 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-14 21:51:46 +0800
 * @LastEditors : JackChou
 */
const mongoose = require('mongoose')

// test 是文档名称，没有会新建
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', err => console.error('connection error:', err.message))

db.on('open', () => {
  console.log('connected to mongoDB')
})

const Cat = mongoose.model('Cat', { name: String })
const tomCat = new Cat({ name: 'Tom' })

tomCat.save().then(res => {
  // 关闭数据库连接方法一
  // mongoose.connection.close()
  // 关闭数据库连接方法二
  mongoose.disconnect()
  console.log(res)
  console.log('meow')
})
