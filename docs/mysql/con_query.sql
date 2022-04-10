-- 条件查询
SELECT salary, emp_name, bonus, job_id, hire_date
FROM master.dbo.employee
WHERE salary >= 7000
ORDER BY bonus DESC;