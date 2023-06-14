# vue 项目路由在 history 模式下，部署在 apache 上，刷新浏览器，出现 404，如何修改？

方案一：

```bash
/var/www/html
├── .htaccess # 新建这个文件
├── index.html
└── static
```

文件内容：

```bash
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

写入这个内容也也行

```bash
FallbackResource /index.html
```

方案二：编辑 config 文件

内容为

```bash
<VirtualHost *:80>
    ## ...
    <Directory /var/www/html>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

重启服务：`sudo service httpd restart`

参考：

[[Vue.js] vue-router 设定 history mode 移除网址的 #](https://chenuin.blogspot.com/2019/01/vue-history-mode.html)

[Example Server Configurations](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations)
