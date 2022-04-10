-- 条件查询
SELECT emp_name, salary
, bonus, job_id
FROM master.dbo.employee
WHERE job_id IN ('4','7') AND salary >= 9000;