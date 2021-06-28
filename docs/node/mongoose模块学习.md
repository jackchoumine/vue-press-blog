# mongoose 学习

用 mongoose 具有数据验证、操作数据库等方便的特点，可提高开发效率和体验，文本总结 mongoose 的基本使用。

## 连接数据库

用字符串连接

```js
let mongoose = require('mongoose');
let DB_URL='mogodb://user:pass@host:prot/database';
//连接
mongoose.connect(DB_URL[,options]);//若url没指定认证信息，可在user和pass里指定。connect 返回一个 promise ,回调函数可在then里调用
//mongoose.connect(url).then(callback)
mongoose.connection.on('connected',function(){
console.log('mongoose 连接成功！')
});
mongoose.connection.on('error',function(){
console.log('mongoDB 连接出错：'+error);
});
mongoose.connection.on('disconnected',function(){
console.log('mongoDB 连接断开！');
});
```

## Schema

schema 是 mongoose 里用到的一种数据模式（或者文档格式约束），可用于表结构的定义，MVC 架构中 Model 的定义，每个 schema 映射到 一个 collection，schema 不具备操作数据库的能力。
定义 UserSchema

```js
let mongoose = require('mongoose')
let Schema = mongoose.Schema
//由 Schema 编译生成 Model
let UserSchema = new Schema(
  {
    userName: {
      type: String,
      max: 100,
      lowercase: true
    },
    userPass: String, //直接指定字段类型
    userAge: {
      type: Number, //指定数值范围，可选
      min: 18,
      maxlength: 120
    },
    loginDate: {
      type: Date,
      required: true //loginDate是必需字段
    }
  }, // model 对象定义完了
  //集合的额外配置项，和 model 对象的定义同级
  {
    capped: {
      //这是封顶集合
      size: 1024,
      max: 100,
      autoIndexId: true
    }
  },
  {
    collection: 'collection_name' //指定表名，默认 用户model名称的复数
  },
  {
    id: false //默认生成一个虚拟 id,指向文档 _id,可禁用
  }
)
//将 Schema 转为 Model,第一个参数是往往是一个单数名词，会被转为 复数形式，充当表名。若已经指定表名，不会转换。Model 的实例是数据库中的文档
let User = mongoose.model('User', UserSchema)
module.exports = User
```

- [ ] get:重写该属性的 get 方法用 Object.defineProperty()
- [ ] set:重写该属性的 set 方法用 Object.defineProperty()
- [ ] username:{type:String,index:true,unique:true},指定索引且唯一，

String 类型字段可设置为属性

- [ ] trim,boolean，删除字段值的前后空格
- [ ] match,RegExp，用正则验证字段值
- [ ] enum,Array，用数组验证一个字段值
- [ ] minlength:Number，验证字段值长度
- [ ] maxlength: 同上

数值类型字段

- [ ] max
- [ ] min

Date 类型字段

- min:Date，最小日期
- max:Date，最大日期

Mixed 类型字段可设置的属性，该类型的字段值可包含任意类型的值。

Array 类型 字段，该字段保存一个数组，保存数组的字段默认保存一个空数组，可用法 default 属性重写默认值

```js
let ToySchema = new Schema({name:String});
let ToyBoxSchema =  new Schema({
toys:[ToySchema],
buffers:[Buffer],
numbers:{type:[Number]，default:undefined,},
});
```

Map 类型的字段，Map 类型的字段是一个内嵌文档。

```js
const userSchema = new Schema({
  nestedDoc: {
    type: Map, //nestedDoc 字段是一个字段值为 String 的 Map
    of: String //用 of 指定该map的字段值的类型
  }
})
const User = mongoose.model('User', userSchema)
let user = new User({
  nestedDoc: {
    github: 'jack',
    twitter: '@jack222'
  }
})
console.log(user.nesteDoc)
// Map { 'github' => 'jack', 'twitter' => '@jack222' }
console.log(user.nesteDoc.get['github'])
//jack
// nestedDoc 是一个 Map，可调用 Map 的方法设置值
let user = new User({
  nestedDoc: {}
})
user.nestedDoc.set('github', 'jack')
user.set('nestedDoc.twitter', '@jack222')
```

## 常见数据库操作

### 插入

```js
//导入 model 定义
let User = require('./user')
function insert() {
  let user = new User({
    username: 'Tom',
    userPass: '12134',
    userAge: 12,
    loginDate: new Date()
  })
  user.save(function (error, result) {
    if (error) {
      console.log('插入数据失败！Error:' + error)
      throw error
    }
    console.log(result) //result是插入成功的文档
  })
}
insert()
```

### 其他插入操作 create 静态方法

```js
User.create(user, callback)
Model.insertMany(docs, callback)
```

### 更新

#### 根据条件更新

Model.update(conditions,updateData,[options],[callback]);

```js
let User = require('./user.js')
function update() {
  let wheres = { username: 'Tom' }
  let updatestr = { userPass: 'abcd' }
  User.update(wheres, updatestr, function (err, res) {
    if (err) {
      console.log('更新数据错误')
      throw err
    }
    console.log('更新成功：' + res)
  })
}
update()
```

#### 根据 id 更新

Model.findByIdAndUpdate(id,[updatedata],[options],[callback])

```js
let User = require('./user')
function updateById() {
  let id = 'xxxx'
  let updatestr = { username: 'newname' }
  User.findByIdAndUpdate(id, updatestr, function (error, res) {
    if (error) throw error
    console.log(res)
  })
}
```

#### 其他更新

Model.findOneAndUpdate([conditions],[updatestr],[options],[callback]) ###删除

### 根据条件删除

Model.remove(conditions,[callback]);

```js
let User = require('./user')
function remove() {
  var wheres = { username: 'Tom' }
  User.remove(wheres, function (err, res) {
    if (err) throw err
    console.log(res)
  })
}
```

#### 其他删除方法

- Model.findByIdAndRemove(id,[options],[callbacK]);
- Model.findOneAndRemove(conditions,[options],[callback]);
- Model.deleteOne(conditions,[options],[callback]);
- Model.deleteMany(conditions,[options],[callback]);

### 查询

Model 的多个静态方法可查询文档。可包含查询参数的 find、findById、count、update 都可按下面两种方式执行：

- 有回调函数，操作会立即执行，查询结果会作为回调函数的参数。
- 不传回调函数，返回一个 Query 实例，是一个查询器接口，可用 .then() 方法继续后续的操作。

#### 条件查询

Model.find(conditions,[fields],[options],[callback]);

```js
let User = require('./user')
function findByConditions() {
  let wheres = { userName: 'Tom' }
  let fieldStr = { username: 1, _id: 0 } //输出名字，不输出 id, id 默认为 1
  User.find(wheres, function (err, res) {
    if (err) throw err
    console.log('查询到的结果是：' + res)
  })
  //不传递回调函数
  let query = User.find()
  query.select('username')
  query.exec(function (err, user) {
    if (err) throw err
    console.log('查询结果：' + users)
  })
}
findByConditions()
```

传入回调函数，就需要用 json 格式的对象指定查询条件。

```js
User.find({name:/tom/,'name.last':'JACK',age:{$gt:18,$lt:39},likes:{$in:['jack','zhou']}}
.select({name:1,occupation:1})
.exec(callback);
```

和下面查询等价：

```js
User.find({ occupation: /tom/ })
  .where('name.last')
  .equals('JACK')
  .where('age')
  .gt(17)
  .lt(39)
  .where('likes')
  .in(['jack', 'zhou'])
  .select('name occupation')
  .exec(callback)
```

条件范围查询（没有符合在 markdown 中无法显示，用 ¥ 代替）：
￥ or 或
￥ nor 或取反 且（？？）
￥ gt 大于
￥ gte 等于大于
￥ lt 小于
￥ lte 小于等于
￥ ne 不等于
￥ in 在多个范围内
￥ nin
￥ all 匹配数组中多个值
￥ regex 正则，用于模糊查询
￥ size 匹配数组大小
￥ maxDistance 范围查询，距离（基于 LBS）
￥ mod 取模运算
￥ near 邻域查询 查询附近的位置
￥ exists 字段是否存在
￥ elemMatch 匹配内数组内的元素
￥ within 范围查询 基于 LBS
￥ box 范围查询，矩形范围，基于 LBS
￥ center 圆形范围查询
￥ centerSphere 球星范围查询
￥ slice 查询字段集合中的元素，比如从第几个之后，第 N 到 M

#### 数量查询

Model.count(conditions,[callback]),回调的 res 是数值

#### 根据 ID 查询

Model.findById(id,[fields],[options],[callback])

#### 模糊查询

用正则表达式

```js
var User = require('./user.js')

function getByRegex() {
  var wheres = { username: { $regex: /m/i } }

  User.find(wheres, function (err, res) {
    if (err) {
      console.log('Error:' + err)
    } else {
      console.log('Res:' + res)
    }
  })
}
getByRegex()
```

#### 分页查询

```js
var User = require('./user.js')

function getByPager() {
  var pageSize = 5 //一页多少条
  var currentPage = 1 //当前第几页
  var sort = { loginDate: -1 } //排序（按登录时间倒序）
  var condition = {} //条件
  var skipNum = (currentPage - 1) * pageSize //跳过数

  User.find(condition)
    .skip(skipNum)
    .limit(pageSize)
    .sort(sort)
    .exec(function (err, res) {
      if (err) {
        console.log('Error:' + err)
      } else {
        console.log('Res:' + res)
      }
    })
}

getByPager()
```

### 其他操作

#### 索引和默认值

```js
let User = new Schema({
  username: { type: String, index: true, unique: true },
  loginDate: { type: Date, default: Date.now }
})
```

#### LBS 地址位置

```js
lbs:{type:Array,index:'2d',sparse:true,}
```

#### 其他常用方法

##### 去重

Model.distinct(field,[conditions],[callback]);

##### 查询一条记录

Model.findOne(conditions,[fields],[options],[callbacK]);

##### 查询一条记录并删除

Model.findOneAndRemove(conditions,[options],[callbacK]);

##### 查询一条记录并更新

Model.findOneAndUpdate(conditions,[update],[options],[callbacK]);

> [更多用法，见 mongoose API](http://mongoosejs.com/docs/index.html)
