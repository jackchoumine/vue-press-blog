# mongoDB 数据库基本使用

## 安装配置数据库

在 D 盘创建一个文件夹安装：D:\Mongo
安装完成后，在 D:\Mongo 会看到一个 bin 目录和一些其他文件。
创建工作目录：
在 D:\mongodb 中创建数据库存放目录:data,日志目录:log\log.txt 。

加入系统变量：
将\bin 加入系统环境变量。完整的目录是 D:\Mongo\bin; 注意分号。

**注册 mongodb 为 window 服务：**
先移除服务：

```js
D:\Mongo\bin
λ mongod --remove // 我不确定上次注册成功没，干脆删除再来一次，结果显示没注册成功
```

2018-07-21T23:49:50.784+0800 I CONTROL [main] Trying to remove Windows service
'MongoDB'
2018-07-21T23:49:50.785+0800 I CONTROL [main] Could not find a service named 'M
ongoDB' to remove

**注册服务：**

```js
D:\Mongo\bin
λ mongod --dbpath=D:\mongodb\data --logpath=D:\mongodb\log\log.txt --install
```

**启动 mongodb**

```js
D:\Mongo\bin # 在任何目录下都可执行该命令
λ net start mongodb
MongoDB 服务正在启动 ..
MongoDB 服务已经启动成功。
```

看上面的提示，说明启动成功。可用 mongodb 管理工具连接了，我用 Robo 3T 1.1.1，连接成功。

- D:\Mongo\bin
  λ net start MongoDB
  MongoDB 服务正在启动 .
  MongoDB 服务无法启动。
  发生服务特定错误: 48.
  请键入 NET HELPMSG 3547 以获得更多的帮助。
  出现以上结果，可能停止刚才启动的 mongoDB，在任务管理器里结束进程，重新启动就好。

**停止服务：**

```js
D:\Mongo
λ net stop MongoDB
MongoDB 服务正在停止.
MongoDB 服务已成功停止。
```

参考：[将 mongodb 注册为 window 服务](https://stackoverflow.com/questions/2438055/how-to-run-mongodb-as-windows-service)

##用 mongoDB Shell 管理数据库
**进入操作界面：**
在 bin 目录下，执行下面脚本：

```js
D:\Mongo\bin
λ mongo
MongoDB shell version v3.4.16-13-gc253cad0df
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.16-13-gc253cad0df
```

看到包含以上信息，说明成功了，MONGO 大写也可以，现在可操作数据库了，用于 MongoDB Shell 是 js 脚本。

**当前正在操作的数据库：**

```js
> db
test
```

MongoDB 默认操作 test 数据库

**查看数据库列表：**

```js
> show dbs
admin        0.000GB
local        0.000GB
```

**\*注意**，没有数据表的数据库，不会显示出来\*

**use DataBaseName，切换或者创建数据库：**

```js
> use bstable_test
switched to db bstable_test
```

已经存在该数据库，切换；不存在该数据库，创建一个。

**创建集合：**

```js
db.createCollection(collection_name[,options])
```

可选参数 options 指定几个集合属性，options 类似 JS 对象。
{
capped:false,//默认 false,指定是否为 规定集合，当为 true 时，需要设置 size
size:number,//正整数，指定集合的存储空间大小，单位字节
max:number,//正整数，指定集合能存储的文档数上限
autoIndexId:false//是否指定集合索引为 \_id ,默认 false
}
当在一个固定集合中插入文档时，先检查 size 是否超出设定，再检查 max 是否超出。
创建一个固定集合：

```js
> db.createCollection("capped_col",{capped:true,size:100,max:2})
{ "ok" : 1 }
```

**删除集合：db.collection_name.drop()**

```js
> db.capped_col.drop()
true
```

返回 true，删除成功。false，删除失败，可能该集合不存在或者其他原因

### MongoDB 支持的数据类型

- Sring:字符串，必须用 UTF-8 UTF-16？
- Intger:数值，32 位或者 64 位，有计算机决定
- Boolean:布尔值
- Double:浮点数
- Min/Max keys:将一个值与 BSON（二进制的 JSON）元素的最低值和最高值相对比。
- Array:数组、列表或者多个值存储在一个键中；
- Timestamp:时间戳，记录文档的变化，时间戳是什么数据类型，什么格式的？
- Object:对象，内嵌文档；
- Null:空值；
- Date:日期，可指定；
- Object ID:文档 ID; 4+3+2+3（时间戳+机器 ID+处理 ID+增量）
- Binary Data:二进制数据；
- Code:js 代码；
- Regular Expression:正则。

### 常见数据库操作

增删改查也可以用 MongoDB Shell 完成。

#### 插入数据

**db.CollectionName.insert(JSONdata)**
集合(数据表)，会创建一个,是一个非固定集合(普通集合)，然后插入一条数据；存在则直接插入。

```js
> db.bstable_test.insert({"name":"Jack"})
WriteResult({ "nInserted" : 1 })
```

```js
> db.bstable.insert([{"a": 3},{"b":3}])
BulkWriteResult({
        "writeErrors" : [ ],
        "writeConcernErrors" : [ ],
        "nInserted" : 2,
        "nUpserted" : 0,
        "nMatched" : 0,
        "nModified" : 0,
        "nRemoved" : 0,
        "upserted" : [ ]
})
```

```
> db.bstable.insertMany([{"a": 3},{"b":3}])
{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("5b538f94fb2f3a5a1e04456b"),
                ObjectId("5b538f94fb2f3a5a1e04456c")
        ]
}
```

```js
> db.bstable.insert({"_id":ObjectId("5b538fbffb2f3a5a1e044568"),"a":9})
WriteResult({ "nInserted" : 1 })
> db.bstable.insert({"_id":ObjectId("5b538fbffb2f3a5a1e044568"),"a":9})
WriteResult({
        "nInserted" : 0,
        "writeError" : {
                "code" : 11000,
                "errmsg" : "E11000 duplicate key error collection: bstable_test.bstable index: _id_ dup key: { : ObjectId('5b538fbffb2f3a5a1e044568') }"
        }
})
//插入失败了，已经处在id。
```

**save：有则修改，无则插入**

```js
> db.bstable.save({"_id":ObjectId("5b538fbffb2f3a5a1e04456d"),"a":5})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
//匹配了一个文档，修改一个文档；
```

```js
> db.bstable.save({"_id":ObjectId("5b538fbffb2f3a5a1e044565"),"a":8})
WriteResult({
        "nMatched" : 0,
        "nUpserted" : 1,
        "nModified" : 0,
        "_id" : ObjectId("5b538fbffb2f3a5a1e044565")
})
//没有找到匹配的文档，插入一个文档
```

```js
> db.bstable.save({"a":10})
WriteResult({ "nInserted" : 1 })
//不指定ID,和 insert 操作一样
```

#### 删除文档：

**db.collection_name.remove(deletion_critteria)**

```
> db.bstable.remove({a:10})
WriteResult({ "nRemoved" : 2 })
//删除 a 为 10 的两条数据
```

remove({a:10},1) 删除匹配的一条数据
remove()，删除所有数据

#### 修改文档

**db.collection_name.update(selection_critteria,update_data)**

```js
> db.bstable.update({a:10},{$set:{a:"10"}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.bstable.update({a:"10"},{$set:{a:"jack"}},{multi:true})
WriteResult({ "nMatched" : 2, "nUpserted" : 0, "nModified" : 2 })
```

#### 查询数据库

**db.collection_name.find([query][,projection])**

- projection:指定返回的键
- db.bstable.find([query]).pretty()将结果格式化输出

db.bstable.findOne() 不能添加条件，返回第一条件数据
query 是查询条件，不设置查询条件，返回所有数据。

- 等于—— {key:value}
- 不等于——{key:{$ne:value}
- 小于——{key:{$lt:value}}
- 小于等于——{key:{$lte:value}}
- 大于——{key:{$gt:value}}
- 大于等于——{key:{$gte:value}}
- 且—— {key1:{$gte:value1},key2:value2} 键不能相同 ——满足 key1 值大于等于 value1 且 key2 值为 value2 的文档。
- 或——{ $or: [{key1: { $gte:value1}},{key3:value3}]} 键可相同

```js
> db.bstable.find({$or:[{a:10},{a:"jack"}]}).pretty()
{ "_id" : ObjectId("5b538fbffb2f3a5a1e044568"), "a" : "jack" }
{ "_id" : ObjectId("5b539a52fb2f3a5a1e044570"), "a" : "jack" }
{ "_id" : ObjectId("5b539a6afb2f3a5a1e044571"), "a" : 10 }
{
        "_id" : ObjectId("5b539c12fb2f3a5a1e044572"),
        "a" : 10,
        "name" : "afafafaafafafagagagagagag",
        "money" : [
                100,
                20
        ]
}
{ "_id" : ObjectId("5b53a063fb2f3a5a1e044573"), "a" : 10, "c" : 100 }
```

**projection：**
指定返回的键，\_id 是默认隐藏的
inclusion 模式:指定返回的键，不返回其他键
db.collection.find(query, {title: 1, by: 1})
exclusion 模式:排除 title 和 by 键值，返回其他键
db.collection.find(query, {title: 0, by: 0})
两种模式不能混用：
db.collection.find(query, {title: 0, by: 1})
若不想指定查询条件参数 query 可以 用 {} 代替，但是需要指定 projection 参数：
querydb.collection.find({}, {title: 1})

```js
$type 操作——基于键值类型查询数据
```

```js
{
  key: {
    $type: 类型数值
  }
}
```

Double 1
String 2
Object 3
Array 4
Binary data 5
Object id 7
Boolean 8
Date 9
Null 10
Regular Expression 11
js 13
Symbol 14
js (with scope) 15
32-bit integer 16
Timestamp 17
64-bit integer 18
Min key 255 Query with -1.
Max key 127

```
//查询键 a 的值是 字符串的文档：
> db.bstable.find({a:{$type:2}})
{ "_id" : ObjectId("5b538fbffb2f3a5a1e044568"), "a" : "jack" }
{ "_id" : ObjectId("5b539a52fb2f3a5a1e044570"), "a" : "jack" }
```

```js
Limit(NUM)和Skip(NUM)——指定返回的文档数和跳过多少文档
> db.bstable.find({a:{$type:1}}).skip(5).limit(1).pretty()
{ "_id" : ObjectId("5b538fbffb2f3a5a1e04456d"), "a" : 5 }
> db.bstable.find({a:{$type:1}}).limit(1).skip(5).pretty()
{ "_id" : ObjectId("5b538fbffb2f3a5a1e04456d"), "a" : 5 }
```

#### 排序

**db.collection_name.find().sort({key:1})** 结果按照字段 key 的值升序
-1 为降序 默认升序
_指定多个字段排序呢？_
.sort(fields) Order by the given fields. There are several equivalent syntaxes:
.sort({field1: -1, field2: 1}) descending by field1, then ascending by field2.
.sort([['field1', 'desc'], ['field2', 'asc']]) same as above
.sort([['field1', 'desc'], 'field2']) same as above
.sort('field1') ascending by field1

#### 聚合操作

`美元符号不能在 markdown 中显示，用人民币符号（¥）代替。`
主要用于处理数据(求均值、求和等)，并返回计算后的结果。
**db.collection_name.aggregate(aggregate_options)**

```js
//按照 $by_user 字段将文档分组
> db.bstable.aggregate([{$group : {_id : "$by_user"}}])
{ "_id" : "Neo4j" }
{ "_id" : "runoob.com" }
```

```
//统计每个作者写文档的数量：通过by_user字段进行分组，并计算by_user字段值相同的总和
> db.bstable.aggregate([{$group:{_id:'$by_user',num_tutorial:{$sum:1}}}])
{ "_id" : "Neo4j", "num_tutorial" : 1 }
{ "_id" : "runoob.com", "num_tutorial" : 2 }
```

##### ￥ sum 计算总和

```
> db.bstable.aggregate([{$group:{_id:'$by_user',num_likes:{$sum:'$likes'}}}])
{ "_id" : "Neo4j", "num_likes" : 750 }
{ "_id" : "runoob.com", "num_likes" : 110 }
```

##### ￥ avg 计算均值

```js
//[{$group:{_id:'by_user',num_avg:{$avg:'$likes'}}}] 计算平均每个作者的喜欢数
> db.bstable.aggregate([{$group:{_id:'by_user',num_avg:{$avg:'$likes'}}}])
{ "_id" : "by_user", "num_avg" : 218.33333333333334 } 860/3
```

##### ￥ addToSet 在结果文档中插入值到一个数组中，但不创建副本。

```js
> db.bstable.aggregate([{$group : {_id : "$by_user", url : {$addToSet: "$url"}}}])
{ "_id" : "Neo4j", "url" : [ "http://www.neo4j.com" ] }
{ "_id" : "runoob.com", "url" : [ "http://www.runoob.com" ] }
```

##### ￥ first/￥ last 根据资源文档的排序 获取第一个/最后一个 数据

```js
> db.bstable.aggregate([{$group : {_id : "$by_user", url : {$first: "$url"}}}])
{ "_id" : "Neo4j", "url" : "http://www.neo4j.com" }
{ "_id" : "runoob.com", "url" : "http://www.runoob.com" }
```

#### 管道操作

管道：在 Unix 和 Linux 中，将当前命令的结果作为下一个命令的参数。
MongoDB 管道是将一个管道的处理结果传递给下一个管道处理。
$project:修改文档的结构。可用来重命名、增加或删除，也可以用于计算结果或嵌套文档。

```js
> db.bstable.aggregate({$project:{title:1,by_user:1}})
{ "_id" : ObjectId("5b5439d393c60fa5fc8dfad7"), "title" : "MongoDB Overview", "by_user" : "runoob.com" }
{ "_id" : ObjectId("5b5439d393c60fa5fc8dfad8"), "title" : "NoSQL Overview", "by_user" : "runoob.com" }
{ "_id" : ObjectId("5b5439d393c60fa5fc8dfad9"), "title" : "Neo4j Overview", "by_user" : "Neo4j" }
```

```js
不想包含 _id：
> db.bstable.aggregate({$project:{title:1,by_user:1,_id:0}})
{ "title" : "MongoDB Overview", "by_user" : "runoob.com" }
{ "title" : "NoSQL Overview", "by_user" : "runoob.com" }
{ "title" : "Neo4j Overview", "by_user" : "Neo4j" }
```

```js
//查找 score 值在 65 到 90 之间的文档。和 db.bstable.find({score:{$gt:65,$lt:90}}).pretty() 一样
> db.bstable.aggregate([{ $match : { score : { $gt : 65, $lte : 90}}}]).pretty()
{
        "_id" : ObjectId("5b5439d393c60fa5fc8dfad7"),
        "title" : "MongoDB Overview",
        "description" : "MongoDB is no sql database",
        "by_user" : "runoob.com",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100,
        "score" : 78
}
{
        "_id" : ObjectId("5b5439d393c60fa5fc8dfad8"),
        "title" : "NoSQL Overview",
        "description" : "No sql database is very fast",
        "by_user" : "runoob.com",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 10,
        "score" : 70
}
{
        "_id" : ObjectId("5b544937760a99abf8e5356d"),
        "title" : "Neo4j Overview",
        "description" : "Neo4j is no sql database",
        "by_user" : "Neo4j",
        "url" : "http://www.neo4j.com",
        "tags" : [
                "database",
                "NoSQL"
        ],
        "likes" : 550,
        "score" : 74
}
{
        "_id" : ObjectId("5b544940760a99abf8e5356f"),
        "title" : "Neo4j Overview",
        "description" : "Neo4j is no sql database",
        "by_user" : "Neo4j",
        "url" : "http://www.neo4j.com",
        "tags" : [
                "database",
                "NoSQL"
        ],
        "likes" : 650,
        "score" : 68
}
{
        "_id" : ObjectId("5b54494d760a99abf8e53573"),
        "title" : "Neo4j Overview",
        "description" : "Neo4j is no sql database",
        "by_user" : "Neo4j",
        "url" : "http://www.neo4j.com",
        "tags" : [
                "database",
                "NoSQL"
        ],
        "likes" : 450,
        "score" : 69
}
{
        "_id" : ObjectId("5b544961760a99abf8e53577"),
        "title" : "Neo4j Overview",
        "description" : "Neo4j is no sql database",
        "by_user" : "Neo4j",
        "url" : "http://www.neo4j.com",
        "tags" : [
                "database",
                "NoSQL"
        ],
        "likes" : 650,
        "score" : 85
}
{
        "_id" : ObjectId("5b54496b760a99abf8e53579"),
        "title" : "Neo4j Overview",
        "description" : "Neo4j is no sql database",
        "by_user" : "Neo4j",
        "url" : "http://www.neo4j.com",
        "tags" : [
                "database",
                "NoSQL"
        ],
        "likes" : 650,
        "score" : 66
}
```
