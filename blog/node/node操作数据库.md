# node 操作数据库

## 连接数据库

```javascript
let MongoClient = require('mongodb').MongoClient
let assert = require('assert')
let mongodb = {
  //用户认证信息
  user: '', //用户名
  password: '',
  host: '', //ip
  port: 3717, //
  database: '',
}
const dev_db_url = `mongodb://${mongodb.user}:${mongodb.password}@${mongodb.host}:${mongodb.port}/${mongodb.database}`
const collectionName = 'zqj_node_test'
MongoClient.connect(dev_db_url, (err, client) => {
  //回调函数的 client 是一个 MongoClient 对象，包含数据库的相关配置
  console.dir(client['s']['options'])
  console.dir(client['s']['url'])
  if (err) {
    console.log('数据库连接错误！')
    console.log(err.stack)
    throw err
  }
  console.log('accessed successfully ! ')
  const db = client.db('chiq') //db是数据库
  /*
   *在此操作数据库
   */
  insertDocuments(db, result => {
    console.info(result)
  })
  client.close() //关闭数据库连接
})
//插入数据
function insertDocuments(db, callback) {
  const collection = db.collection(collectionName)
  let books = [
    {
      name: 'test1',
      price: 12,
    },
    {
      name: 'test2',
      price: 12,
    },
    {
      name: 'test2',
      price: 15,
    },
    {
      name: 'test3',
      price: 9,
    },
  ]
  let sizeOfBooks = books['length']
  //回调函数的 result 是包含插入文档的一个对象,可根据它判断是否成功插入
  collection.insertMany(books, function (err, result) {
    assert.equal(err, null)
    assert.equal(sizeOfBooks, result.result.n)
    assert.equal(sizeOfBooks, result.ops.length)
    console.log(`Inserted ${sizeOfBooks} documents into the collection`)
    callback(result)
  })
}
```

** promise 写法：**

MongoClient.connect() 返回一个 promise ,可在 then 函数操作数据库。

```javascript
let MongoClient = require('mongodb').MongoClient
let assert = require('assert')
let Promise = require('promise')
let mongodb = {
  user: 'chiq',
  password: '123456',
  host: '',
  port: 27017,
  database: 'chiq',
}
const dev_db_url = `mongodb://${mongodb.user}:${mongodb.password}@${mongodb.host}:${mongodb.port}/${mongodb.database}`
const collectionName = 'zqj_node_test'
let books = [
  {
    name: 'test1',
    price: 12,
  },
  {
    name: 'test2',
    price: 12,
  },
  {
    name: 'test2',
    price: 15,
  },
  {
    name: 'test3',
    price: 9,
  },
]
MongoClient.connect(dev_db_url, {
  useNewUrlParser: true,
})
  .then(function (client) {
    console.log('数据库连接成功! ')
    const collection = client.db('chiq').collection(collectionName)
    let wheres = {
      name: '周其军',
      price: 12000,
    }
    collection.insertMany(books).then(res => {
      console.log(res)
    })
  })
  .catch(function (err) {
    console.log('数据库连接错误')
    console.log(err)
  })
```

## 查询

```javascript
function findDocuments(db, callback) {
  const collection = db.collection(collectionName)
  let wheres = { price: 9, name: 'test3' }
  collection.find(wheres).toArray((err, docs) => {
    console.dir(docs)
  })
}
//查询结果在 docs 中，是一个数组
```
