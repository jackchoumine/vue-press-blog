/*
 * @Description : 连接数据库
 * @Date        : 2022-04-14 21:02:33 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-04-14 21:22:37 +0800
 * @LastEditors : JackChou
 */
const mssql = require('mssql')

const sqlConfig = {
  user: 'sa', // process.env.DB_USER,
  password: 'JACKsql123',
  database: 'master', // process.env.DB_NAME,
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    // encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
}

async function testMSSQL() {
  try {
    await mssql.connect(sqlConfig)
    const sql =
      /* sql*/
      `SELECT salary, emp_name, bonus, job_id, hire_date
        FROM employee WHERE emp_name = 'Liu Bei' AND salary > 10000
        ORDER BY salary DESC`
    const result = await mssql.query(sql)
    console.log(result.recordset)
    mssql.close()
  } catch (error) {
    console.log(error)
  }
}

testMSSQL()
