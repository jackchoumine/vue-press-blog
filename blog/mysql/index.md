#

## 重置密码

```bash
brew services stop mysql
pkill mysqld
rm -rf /usr/local/var/mysql/ # NOTE: this will delete your existing database!!!
brew postinstall mysql
brew services restart mysql
mysql -u root
```

[Reset mysql root password in Mac OS:](https://gist.github.com/zubaer-ahammed/c81c9a0e37adc1cb9a6cdc61c4190f52)
