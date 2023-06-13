# sql-server

## 安装

macOS 下使用 docker 安装

运行：

```bash
docker run -d --name sql_server_2019 -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=JACKsql123' -p 1433:1433 mcr.microsoft.com/mssql/server:2019-latest
```

安装 node slq cli 工具

```bash
npm install -g sql-cli
```

连接

```bash
mssql -u sa -p JACKsql123 # sa 是默认用户名
```

看到类似输出，就是成功了：

```bash
Connecting to localhost...done

sql-cli version 0.6.2
Enter ".help" for usage hints.
```

参考文章

[How to Install SQL Server on MacOS](https://phoenixnap.com/kb/install-sql-server-macos)
