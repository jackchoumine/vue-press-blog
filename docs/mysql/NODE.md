![](https://tva1.sinaimg.cn/large/e6c9d24egy1h14zzwtrkqj21aa0kkdj0.jpg)

```sql
SELECT emp_id, emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts
FROM master.dbo.employee;
```

## 条件查询

```sql
SELECT emp_id, emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts
FROM master.dbo.employee
WHERE emp_name = 'Zhu Ge Liang' -- 使用单引号
```

查询薪水大于 10000

```sql
SELECT emp_id, emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts
FROM master.dbo.employee
WHERE salary >= 10000
```

日期过滤

```SQL
SELECT emp_name, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts
FROM master.dbo.employee
WHERE hire_date >= '2016-01-01'
```

区间查询

```sql
-- 条件查询
SELECT emp_name, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts
FROM master.dbo.employee
WHERE hire_date >= '2016-01-01' AND salary  BETWEEN 9000 AND 10000;
```

非空查询

```sql
SELECT emp_name, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts
FROM master.dbo.employee
WHERE job_id IS NOT NULL
```

范围查询

```SQL
SELECT emp_name, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts
FROM master.dbo.employee
WHERE job_id IN (8,9,10)
```

字符串模式匹配`LIKE`

`%`匹配一个和多个字符；

`_`匹配一个字符。

两者结合使用。

```SQL
SELECT emp_name
FROM master.dbo.employee
WHERE emp_name LIKE 'Guan%'
```

转义 `%`、`_`

```sql
WHERE emp_name  LIKE 'Guan%' ESCAPE '%'
```

sql server 不区分大小写。

## 复杂条件

逻辑运算符: `AND`、`OR`、`NOT`、`()`

```sql
SELECT emp_name, salary
, bonus
FROM master.dbo.employee
WHERE bonus IS NOT NULL AND salary >= 10000;
```

OR 可与 IN 构造等价条件。

运算优先级。

```sql
SELECT emp_name, salary
, bonus, job_id
FROM master.dbo.employee
WHERE job_id ='4' OR job_id ='7' AND salary >= 9000;
```

```bash
emp_name     salary  bonus  job_id
-----------  ------  -----  ------
Huang Zhong  8000    null   4
wei yan      7500    null   4
zhao yun     15000   6000   7
```

> 为何有一条包含 7500 的记录？

因为 `AND` 条件优先级高。

```sql
SELECT emp_name, salary
, bonus, job_id
FROM master.dbo.employee
WHERE job_id ='4' OR (job_id ='7' AND salary >= 9000);
```

结果和上面一样。

```sql
SELECT emp_name, salary
, bonus, job_id
FROM master.dbo.employee
WHERE (job_id ='4' OR job_id ='7') AND salary >= 9000;
```

结果：

```bash
emp_name  salary  bonus  job_id
--------  ------  -----  ------
zhao yun  15000   6000   7
```

`OR` 子句 可构造等价的 `IN`子句。

上面等价 `IN` 子句

```SQL
SELECT emp_name, salary
, bonus, job_id
FROM master.dbo.employee
WHERE job_id IN ('4','7') AND salary >= 9000;
```
