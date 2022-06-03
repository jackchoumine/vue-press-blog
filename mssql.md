# mssql 学习

sql 命令分类

- DDL --- Data Definition Language 数据定义语言
- DML --- Data Manipulation Language 数据操作语言
- DQL --- Data Query Language 数据查询语言
- DCL --- Data Control Language 数据控制语言

[sql 语言分类](https://media.geeksforgeeks.org/wp-content/uploads/20210920153429/new.png)

## 数据定义语言

定义数据库的三级结构，包括外模式、概念模式、内模式及其相互之间的映像，定义数据的完整性、安全控制等约束

CREATE
ALTER
DROP
TRUNCATE
COMMENT
RENAME

### 数据库

1. 创建

```sql
CREATE databaseName
```

2. 查询

```sql
SELECT [name] from [master].[sys].databases
SELECT [name] from [master].[sys].databases ORDER BY [name]
```

3. 修改名字

```sql
ALTER DATABASE oldTableName MODIFY NAME = newTableName

ALTER DATABASE MasonTest MODIFY NAME = masonTest
```

4. 删除

```sql
DROP DATABASE  [ IF EXISTS ]database_name [,database_name2,...]; -- 可删除多个
```

磁盘上的文件也被删除，删除前需要做两件事：

- 备份，以备恢复时使用
- 无法删除当前正在使用的数据库

### schema 模式

模式是数据库系统种一个逻辑结构，是对象的集合，对象包括表、字段、关系模型、视图、存储过程等。

模式的好处：

- 允许多用户使用同一个数据库；
- 将数据库组织成逻辑组，方便管理；
- 避免命名冲突。`hr.employees`和`sales.employees` 是不同的表。

mySql 的数据库和模式是同一个概念。

一个模式属于一个数据库，但是，一个数据库有多个模式。

sql serer 有一些内置模式：`dbo`、`guest`、`sys` 和 `INFORMATION_SCHEMA`。`sys` 和 `INFORMATION_SCHEMA` 保存这系统对象，不能删除。

新建一个数据库，其默认的模式为`dbo`。新建一个账户，这个账户使用`dbo`作为模式。

1. 创建模式

```sql
CREATE SCHEMA schema_name [AUTHORIZATION owner_name]
-- CREATE SCHEMA 子句指定模式名字
-- AUTHORIZATION 子句指定拥有这个模式的用户
```

2. 查看

```sql
SELECT
s.name AS schemaName,
u.name AS schemaOwner
FROM sys.schemas s
INNER JOIN sys.sysusers u ON u.uid = s.principal_id
ORDER BY s.name;
```

3. 在 schema 里创建表

```sql
CREATE TABLE schemaName.tableName
```

4. 删除

```sql
DROP SCHEMA IF EXISTS schemaName
```

删除 schema 之前，请确保里面没有对象。

### 表

1. 创建

```sql
-- 1. 指定数据库、schema、表
CREATE TABLE database_name.schema_name.table_name (
  -- 2. 指定列及数据类型
  -- 3. 指定约束条件
  pk_col dataType PRIMARY KEY, -- 主键通常作为第一列
  col2 dataType NOT NULL,
  col3 dataType UNIQUE,
  FOREIGN KEY (pk_col) REFERENCES sales.stores (store_id)
)
```

标识

```sql
IDENTITY(seed,increment) -- seed 1 increment 1
```

列的标识自增，插入数据不用插入这个一列。

```sql
CREATE TABLE hr.person (
    person_id INT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender CHAR(1) NOT NULL
);
-- 插入数据成功，输出 person_id
INSERT INTO person(first_name,last_name,gender)
OUTPUT inserted.person_id
values
('Mason','Doe','M')
```

IDENTITY vs Sequence

[SQL Server Sequence](https://www.sqlservertutorial.net/sql-server-basics/sql-server-sequence/)

2. 删除

```sql
DROP TABLE database_name.schema_name.table_name
```

不允许删除被引用为外键的表，删除前需要解除外键约束。

```sql
CREATE SCHEMA procurement;
GO

CREATE TABLE procurement.supplier_groups (
    group_id INT IDENTITY PRIMARY KEY,
    group_name VARCHAR (50) NOT NULL
);

CREATE TABLE procurement.suppliers (
    supplier_id INT IDENTITY PRIMARY KEY,
    supplier_name VARCHAR (50) NOT NULL,
    group_id INT NOT NULL,
    FOREIGN KEY (group_id) REFERENCES procurement.supplier_groups (group_id)
);
CREATE TABLE [WIJMO_OLAP].[dbo].[Users_Apikey_Redash] (
    id INT IDENTITY (1, 1),
	usrId INT NOT NULL PRIMARY KEY,
	fullName VARCHAR (20) NOT NULL,
	apikey VARCHAR(40) NOT NULL,
	createAt DATETIME2 NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updateAt DATETIME2,
);
```

```sql
DROP TABLE procurement.supplier_groups -- 删除被作为外籍的表，不允许
```

解除外键约束：① 删除外键 ② 删除外键表

<!-- BUG 这里无法解除约束 -->

```sql

```

3. 删除表中的数据

```sql
TRUNCATE TABLE table_name
DELETE FROM person
```

区别：

- `DELETE` 每一行都有日志记录，`TRUNCATE`只有一次日志记录
- `TRUNCATE`锁定更少，`DELETE` 每一行都有锁。
- `TRUNCATE`的标识被重置，`DELETE` 不被重置。

4. 重命名

```sql
EXEC sp_rename 'oldTableName', 'newTableName';
```

5. 添加列

```sql
ALTER TABLE table_name
ADD colName dataType constraint_1
```

6. 修改列

```sql
ALTER TABLE table_name
ALTER COLUMN colName dataType
```

修改数据类型

```sql
CREATE TABLE T1 (C INT);

INSERT INTO  T1 VALUES (1),(2),(3)

ALTER TABLE T1 ALTER COLUMN C VARCHAR(10)

INSERT INTO  T1 VALUES ('3'),('21'),('31')
```

添加新的约束。

添加非空约束，必须把为`NULL`的值设置为非 NULL 值。

```sql
INSERT INTO  T1 VALUES ('3'),('21'),('31'),(NULL) --插入空值
ALTER TABLE T1 ALTER COLUMN C VARCHAR(10)  NOT NULL -- 存在 NULL, 报错
-- 先修改 null 值
UPDATE T1 SET C='' WHERE C IS NULL
-- 再添加非空约束
ALTER TABLE T1 ALTER COLUMN C VARCHAR(10)  NOT NULL
```

2. 删除列

```sql
ALTER TABLE table_name
DROP COLUMN column_name1, column_name2 -- 可一次删除多列
```

> 具有`check`约束的列,需要先删除约束
> 不得删除主键列和外键列

删除 check 约束

```sql
ALTER TABLE procurement.price_lists DROP CONSTRAINT ck_positive_price
```

5. 计算列

有时候需要更加其他列计算得到一个新的列:

```sql
SELECT first_name + '' + last_name AS full_name FROM persons -- 根据 first_name 和 last_name 计算得到 full_name
```

每次查询都编写`first_name + '' + last_name`, 不方便, 要是有一种方法能自动算就好了.

```sql
ALTER TABLE table_name ADD full_name AS (first_name + '' + last_name)
```

```sql
SELECT TOP (1000) [person_id]
      ,[first_name]
      ,[last_name]
      ,[dob]
	  ,[full_name]
FROM [MasonTest].[procurement].[persons]
```

计算列在每次查询都去计算, 希望计算列的数据持久化到磁盘.

```sql
ALTER TABLE table_name ADD full_name AS (first_name + '' + last_name) PERSISTED
```

> 只有当表达式的值是固定的,才能持久化

```sql
ALTER TABLE persons
ADD age_in_years
    AS (CONVERT(INT,CONVERT(CHAR(8),GETDATE(),112))-CONVERT(CHAR(8),dob,112))/10000
PERSISTED;
```

> GETDATE 函数不是固定的值.

添加计算列语法:

```sql
ALTER TABLE table_name
ADD column_name AS expression [PERSISTED];
```

新建表格时添加计算列:

```sql
CREATE TABLE table_name(
    column_name AS expression [PERSISTED],
);
```

## 数据类型

### 精确数值

| Data Type  | Lower limit       | Upper limit                | Memory 字节 |
| ---------- | ----------------- | -------------------------- | ----------- |
| bit        | 0                 | 1                          | 1           |
| tinyint    | 0                 | 255                        | 1           |
| smallint   | -32767            | 32767                      | 2           |
| int        | -2147000000 21 亿 | 2147000000 21 亿           | 4           |
| bigint     |                   |                            | 8           |
| smallmoney | - 214,478.3648    | 214,478.3647               | 4           |
| money      |                   | 922,337, 203, 685,477.5807 | 8           |
| numeric    | -10^38            | 10^38                      | 5-17        |
| decimal    |                   |                            |             |

### 近似数值

float(n)

### 时间类型

| Data Type      | 精度           | 最早时间         | 上限             | 存储 |
| -------------- | -------------- | ---------------- | ---------------- | ---- |
| date           | 1 天           | 0001-01-01       | 9999-12-31       | 3    |
| smalldatetime  | 1 分钟         | 1900-01-01       | 2079-06-06       | 4    |
| datetime       | .000,.003,.007 | 1753-01-01       | 9999-06-06       | 8    |
| time           | 100 纳秒       | 00:00:00.0000000 | 23:59:59.9999999 | 5    |
| datetimeoffset | 100 纳秒       |                  |                  |      |
|                |                |                  |                  |      |

## 数据操作语言

INSERT
UPDATE
DELETE
MERGE
CALL
EXPLAIN PLAN
LOCK TABLE

## 数据查询语言

SELECT

```sql
SELECT @@version
```

`Microsoft SQL Server 2008 R2 (SP2) - 10.50.4000.0 (X64) Jun 28 2012 08:36:30 Copyright (c) Microsoft Corporation Standard Edition (64-bit) on Windows NT 6.2 <X64> (Build 9200: ) (Hypervisor) `

## 数据控制语言

授权，角色控制等

GRANT 授权
REVOKE 取消授权

## 事务控制语言

SAVEPOINT 设置保存点
ROLLBACK 回滚
SET TRANSACTION

```sql
/****** Script for SelectTopNRows command from SSMS  ******/
SELECT
      [pathname]
      ,[name]
      ,[initiatorType]
      ,[decodedBodySize]
      ,[encodedBodySize]
      ,[requestStart]
      ,[responseEnd]
      ,[responseStart]
      ,[duration]
      ,[transferSize]
      ,[userName]
	  ,[visitAt]
	  ,[title]
  FROM [WIJMO_OLAP].[dbo].[T_RESOURCE] where duration>1000
  AND initiatorType in ('xmlhttprequest','fetch','other')
  -- AND CHARINDEX('cubes',[pathname]) > 0
  AND [pathName]='/cubes/F_SODetail_5'
  AND [userName] = 'Andy.Z.Liang'
  -- AND [pathname] = '/cubes/f_salesorderdetail_combine'
  order by duration desc --[pathname] CONTAINS '"cubes"' --initiatorType = 'xmlhttprequest'

SELECT  [pathname]
      ,[name]
      ,[initiatorType]
      ,[decodedBodySize]
      ,[encodedBodySize]
      ,[requestStart]
      ,[responseEnd]
      ,[responseStart]
      ,[duration]
      ,[transferSize]
      ,[userName]
	  ,[visitAt]
FROM [WIJMO_OLAP].[dbo].[T_RESOURCE] WHERE visitAt = '2022-05-26 13:51:10'

ALTER TABLE [WIJMO_OLAP].[dbo].[T_RESOURCE] ALTER COLUMN visitAt DATETIME2

SELECT DISTINCT [initiatorType] FROM [WIJMO_OLAP].[dbo].[T_RESOURCE]

DELETE FROM [WIJMO_OLAP].[dbo].[T_RESOURCE] WHERE visitAt is null

SELECT COUNT(*) FROM [WIJMO_OLAP].[dbo].[T_RESOURCE] WHERE visitAt is not null

DELETE FROM [WIJMO_OLAP].[dbo].[T_RESOURCE] WHERE CHARINDEX('google',[name])>0
```
