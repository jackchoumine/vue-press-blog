# SQL 学习笔记

创建 databse

```SQL
CREATE DATABASE <databaseName>
```

修改名字：

```SQL
ALTER DATABASE <databassName>
MODFIY NAME = <newName>
```

```SQL
ALTER DATABASE MasonTest
modify name = masonTest
```

删除 database

```SQL
DROP DATABASE <databaseName>
```

```SQL
use master
go
drop database MasonTest
go
```

## 数据类型

为何充分利用存储空间和限制用户输入，需要指定列的数据类型。

> 有哪些数据类型？

几大类

- 精确数值
- 近似数值
- 日期和时间
- 普通字符串
- unicode 字符串
- 二进制
- 其他

### 精确数值

### 参考

[数据类型](https://www.guru99.com/sql-server-datatype. html)

## 表

> 建表

```SQL
create table TABLENAME
(
  COLUMN_1 datatype [NULL |NOT NULl],
  COLUMN_2 datatype [NULL |NOT NULl]
  CONSTRAINT PK PRIMARY KEY (Course_ID) -- 指定主键 可选
)


domComplete: 8686
domContentLoadedEventEnd: 6782
domInteractive: 6309
firstContentfulPaint: 5671

id:
host: "localhost:3000"
initiatorType: "navigation"
ip: "::1"
pathname: "/dashboard/2877"

userName: "Mason.Q.Zhou"
title: "Sr Eng, BI"
visitAt: "2022-04-24 18:37:13"
country: "China"
department: "NESC-G MIS/CD"

CREATE TABLE T_NEW_NAV
(
  id text NOT NULL,
  userAgent text NOT NULL,
  ip text NOT NULL,
  host text NOT NULL,
  effectiveType text NOT NULL,
  initiatorType text NOT NULL,
  type text NOT NULL,
  domInteractive int NOT NULL,
  domContentLoadedEventEnd int NOT NULL,
  domComplete int NOT NULL,
  firstContentfulPaint int NOT NULL,
  userName: text NOT NULL,
  visitAt: text NOT NULL,
  title: text NOT NULL,
  country: text NOT NULL,
  department: text NOT NULL,
)

CREATE TABLE T_RESOURCE
(
  id BIGINT NOT NULL,
  userAgent text NOT NULL,
  ip text NOT NULL,
  pathname text NOT NULL,
  effectiveType text NOT NULL,
  name text NOT NULL,
  initiatorType text NOT NULL,
  decodedBodySize int NOT NULL,
  encodedBodySize int NOT NULL,
  requestStart int NOT NULL,
  responseEnd int NOT NULL,
  responseStart int NOT NULL,
  duration int NOT NULL,
  transferSize int NOT NULL,
  rrt int NOT NULL,
  downlink int NOT NULL
)

CREATE TABLE T_PAINT
(
  id BIGINT NOT NULL,
  userAgent text NOT NULL,
  ip text NOT NULL,
  pathname text NOT NULL,
  name text NOT NULL,
  startTime int NOT NULL,
)
```

```SQL
CREATE TABLE COURSE
(
Course_ID Int,
Course_Name Varchar(10)
)
```

> 插入数据

```SQL
INSERT INTO tableName
(column_1, column_2, ... )
VALUES
(expression_1, expression_2, ... ),
(expression_1, expression_2, ... ),
...;
```

往 COURSE 表插入几条数据：

```SQL
Insert into COURSE values (1,'SQL'); -- 字符串使用单引号
Insert into COURSE values (2,'Python');
Insert into COURSE values (3,'SQL');
Insert into COURSE values (4,'C');
```

> 查询

```SQL
SELECT expression
FROM tableName
[WHERE condition];

SELECT * FROM COURSE -- 显示所有列
```

> 从已经存在的表新建表

```SQL
SELECT (Column 1, …) INTO <NewTableName> FROM <OldTableName>;
SELECT name INTO T_COURSE_NAME FROM COURSE;
```

> 使用操作界面建表

<!-- 自行操作 -->

> 插入新列

```sql
ALTER TABLE tableName ADD column_1 datatype,column_2 datatype;
ALTER TABLE COURSE ADD teacher Varchar(50)
```

修改列的数据类型

```SQL
ALTER TABLE TableName
ALTER COLUMN ColumnName NVARCHAR(200) [NULL | NOT NULL]
```

URL 的数据类型

<!-- https://stackoverflow.com/questions/1159928/what-is-the-best-column-type-for-url -->

<!-- https://stackoverflow.com/questions/408825/how-to-change-the-data-type-of-a-column-without-dropping-the-column-with-query/20424114 -->

Difference between datetime and timestamp in sqlserver? [duplicate]

<!-- https://stackoverflow.com/questions/7105093/difference-between-datetime-and-timestamp-in-sqlserver -->

执行主键

```SQL
ALTER TABLE tableName
add CONSTRAINT constraintName PRIMARY KEY (COLUMN_1,COLUMN_2,...) -- 指定主键 可选

ALTER TABLE students
ADD CONSTRAINT students_pk PRIMARY KEY (admission)
```

> 删表

```sql
DROP TABLE tableName
DROP TABLE T_COURSE_NAME
```

```SQL
DELETE TABLE tableName -- 删除表数据，表结构不会删除
DELETE FROM TableName
-- DROP 无法回滚，DELETE 可回滚
```

## 主键

主键是用于唯一标识行数据的一列或者几列，值唯一

主键的约束：

1. 每个表只能有一个主键
2. 主键的值可区分每一行，值不为 NULL
3. 不能插入已经存在的 row

外键: 引入 A 表的主键作为自己的一列或者几列，这些列在该表中叫外键，A 表叫父表，该表叫子表，外键关联
了父表和子表或者从属表，又叫关系键。

外键的的约束:

1. 外键允许为 NULL
2. 子表插入数据，不允许插入父表中不存在的主键的行

外键的作用：保证数据的完整性和一致性

```sql
ALTER TABLE [WIJMO_OLAP].[dbo].[T_RESOURCE] ADD rowId text, userName text,title text ,visitAt text ,country text,department text;
ALTER TABLE [WIJMO_OLAP].[dbo].[T_RESOURCE] ADD host text;
```
