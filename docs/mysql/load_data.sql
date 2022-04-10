-- 生成 SQL Server 初始化数据
INSERT INTO department
  (dept_name)
VALUES
  ('xing zheng bu');
INSERT INTO department
  (dept_name)
VALUES
  ('hr dep');
INSERT INTO department
  (dept_name)
VALUES
  ('finance department');
INSERT INTO department
  (dept_name)
VALUES
  ('dev department');
INSERT INTO department
  (dept_name)
VALUES
  ('seller department');
INSERT INTO department
  (dept_name)
VALUES
  ('Ministry of Defense');

INSERT INTO job
  (job_title, min_salary, max_salary)
VALUES
  ('General manager', 24000, 50000);
INSERT INTO job
  (job_title, min_salary, max_salary)
VALUES
  ('Deputy General Manager', 20000, 30000);
INSERT INTO job
  (job_title, min_salary, max_salary)
VALUES
  ('Director of Human Resources', 20000, 30000);
INSERT INTO job
  (job_title, min_salary, max_salary)
VALUES
  ('HR Specialist', 5000, 10000);
INSERT INTO job
  (job_title, min_salary, max_salary)
VALUES
  ('financial manager', 10000, 20000);
INSERT INTO job
  (job_title, min_salary, max_salary)
VALUES
  ('accounting', 5000, 8000);
INSERT INTO job
  (job_title, min_salary, max_salary)
VALUES
  ('development manager', 12000, 20000);
INSERT INTO job
  (job_title, min_salary, max_salary)
VALUES
  ('programmer', 5000, 12000);
INSERT INTO job
  (job_title, min_salary, max_salary)
VALUES
  ('sales Manager', 8000, 20000);
INSERT INTO job
  (job_title, min_salary, max_salary)
VALUES
  ('seller', 4000, 8000);

INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('Liu Bei', 'male', 1, NULL, '2000-01-01', 1, 30000, 10000, 'liubei@shuguo.com', NULL, 'Admin', '2000-01-01 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('Guan Yu', 'male', 1, 1, '2000-01-01', 2, 26000, 10000, 'guanyu@shuguo.com', NULL, 'Admin', '2000-01-01 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('Zhang Fei', 'male', 1, 1, '2000-01-01', 2, 24000, 10000, 'zhangfei@shuguo.com', NULL, 'Admin', '2000-01-01 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('Zhu Ge liang', 'male', 2, 1, '2006-03-15', 3, 24000, 8000, 'zhugeliang@shuguo.com', NULL, 'Admin', '2006-03-15 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('Huang Zhong', 'male', 2, 4, '2008-10-25', 4, 8000, NULL, 'huangzhong@shuguo.com', NULL, 'Admin', '2008-10-25 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('wei yan', 'male', 2, 4, '2007-04-01', 4, 7500, NULL, 'weiyan@shuguo.com', NULL, 'Admin', '2007-04-01 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('sun shang xiang', 'female', 3, 1, '2002-08-08', 5, 12000, 5000, 'sunshangxiang@shuguo.com', NULL, 'Admin', '2002-08-08 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('sun ya tou', 'female', 3, 7, '2002-08-08', 6, 6000, NULL, 'sunyahuan@shuguo.com', NULL, 'Admin', '2002-08-08 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('zhao yun', 'male', 4, 1, '2005-12-19', 7, 15000, 6000, 'zhaoyun@shuguo.com', NULL, 'Admin', '2005-12-19 10:00:00', 'Admin', '2006-12-31 10:00:00');
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('liao hua', 'male', 4, 9, '2009-02-17', 8, 6500, NULL, 'liaohua@shuguo.com', NULL, 'Admin', '2009-02-17 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('guan ping', 'male', 4, 9, '2011-07-24', 8, 6800, NULL, 'guanping@shuguo.com', NULL, 'Admin', '2011-07-24 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('zhao si', 'female', 4, 9, '2011-11-10', 8, 6600, NULL, 'zhaoshi@shuguo.com', NULL, 'Admin', '2011-11-10 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('guan xing', 'male', 4, 9, '2011-07-30', 8, 7000, NULL, 'guanxing@shuguo.com', NULL, 'Admin', '2011-07-30 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('zhang bao', 'male', 4, 9, '2012-05-31', 8, 6500, NULL, 'zhangbao@shuguo.com', NULL, 'Admin', '2012-05-31 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('zhao tong', 'male', 4, 9, '2012-05-03', 8, 6000, NULL, 'zhaotong@shuguo.com', NULL, 'Admin', '2012-05-03 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('zhou cang', 'male', 4, 9, '2010-02-20', 8, 8000, NULL, 'zhoucang@shuguo.com', NULL, 'Admin', '2010-02-20 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('ma dai', 'male', 4, 9, '2014-09-16', 8, 5800, NULL, 'madai@shuguo.com', NULL, 'Admin', '2014-09-16 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('fa zheng', 'male', 5, 2, '2017-04-09', 9, 10000, 5000, 'fazheng@shuguo.com', NULL, 'Admin', '2017-04-09 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('peng tong', 'male', 5, 18, '2017-06-06', 10, 4100, 2000, 'pangtong@shuguo.com', NULL, 'Admin', '2017-06-06 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('jiang wan', 'male', 5, 18, '2018-01-28', 10, 4000, 1500, 'jiangwan@shuguo.com', NULL, 'Admin', '2018-01-28 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('黄权', 'male', 5, 18, '2018-03-14', 10, 4200, NULL, 'huangquan@shuguo.com', NULL, 'Admin', '2018-03-14 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('mi lan', 'male', 5, 18, '2018-03-27', 10, 4300, NULL, 'mizhu@shuguo.com', NULL, 'Admin', '2018-03-27 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('deng zhi', 'male', 5, 18, '2018-11-11', 10, 4000, NULL, 'dengzhi@shuguo.com', NULL, 'Admin', '2018-11-11 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('jian ya', 'male', 5, 18, '2019-05-11', 10, 4800, NULL, 'jianyong@shuguo.com', NULL, 'Admin', '2019-05-11 10:00:00', NULL, NULL);
INSERT INTO employee
  (emp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, email, comments, create_by, create_ts, update_by, update_ts)
VALUES
  ('sun qi', 'male', 5, 18, '2018-10-09', 10, 4700, NULL, 'sunqian@shuguo.com', NULL, 'Admin', '2018-10-09 10:00:00', NULL, NULL);

INSERT INTO job_history
  (emp_id, dept_id, job_id, start_date, end_date)
VALUES
  (9, 4, 8, '2005-12-19', '2006-12-31');
