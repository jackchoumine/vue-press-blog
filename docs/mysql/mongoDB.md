# mongoDB 使用

## 安装

```bash
docker run -d -p 27017:27017 --name test-mongo mongo:latest
docker exec -it container-id bash # 进入 container
mongosh # 进入 mongo shell
show databases # 查看数据
```

```bash
mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
```

## mongoose 连接数据

```js
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
```
