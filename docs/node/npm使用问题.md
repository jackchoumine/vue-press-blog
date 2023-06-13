# 记录使用 npm 的问题

## node-sass 安装不上

node-sass 有资源放在美国亚马逊上,不科学上网,很慢.

1. 设置 taobao 源:

.npmrc 可跨平台

```bash
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
puppeteer_download_host=https://npm.taobao.org/mirrors/mirrors
registry=https://registry.npm.taobao.org
```

一次性使用:

```bash
SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass
```

同理， puppeteer 下载很慢。

```bash
puppeteer_download_host=https://npm.taobao.org/mirrors/mirrors
```

2. 科学上网

```bash
npm config set proxy socks5://127.0.0.1:1086
npm i node-sass

# 下载完成后删除 http 代理
npm config delete proxy
```

> 参考

[安装 node-sass 的正确姿势](https://mp.weixin.qq.com/s/uufvjn_XATUrEYjYc062EQ)

## npm s module_name 报错

```bash
λ npm search connect
npm WARN search fast search endpoint errored. Using old search.
npm WARN Failed to read search cache. Rebuilding
npm WARN Building the local index for the first time, please be patient
npm ERR! No search sources available

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\Administrator\AppData\Roaming\npm-cache\_logs\2018-08-25T1
2_25_05_745Z-debug.log
```

可能是 npm 镜像设置的问题，查看当前使用的镜像

```bash
λ nrm ls

  npm ---- https://registry.npmjs.org/
* cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
```

使用了 cnpm ，切换到 npm 官方镜像就可以了。

```bash
λ nrm use npm

   Registry has been set to: https://registry.npmjs.org/
```

> 参考：[今天使用 npm search 的时候出现了一段错误](https://www.firegod.cn/2017/04/npm-search-error/)
