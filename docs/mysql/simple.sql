-- 简单查询
-- SELECT COL1, COL2, COL3 FROM TABLE
-- SELECT top(10)
--   emp_name
-- FROM employee;

-- 排查重复记录 DISTINCT COL1
-- SELECT DISTINCT sex
-- FROM employee;

-- 指定别名 as 别名 
-- 含空格 是双引号
SELECT DISTINCT sex AS "性别"
FROM employee;


SELECT @@SERVERNAME
SELECT @@VERSION
