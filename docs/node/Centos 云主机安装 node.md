# Centos 云主机安装 node

xShell 登录云主机
新建一个文件夹安装：

```js
mkdir node
cd node //进入 node 目录
```

安装

```js
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
sudo yum -y install nodejs
```

看到
Installed:
nodejs.x86_64 2:8.11.3-1nodesource

Complete!

就是安装好了。

```js
node -v
v8.11.3
npm -v
5.6.0
```

# nvm 安装

```js
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

V0.33.11，是想要安装的版本，可选择其他。

重启终端就可用了。

## nvm 常用命令

```bash
nvm ls # 查看所有安装的 node 版本，带箭头，绿色的，为正在使用的版本。
nvm ls-remote # 查看可安装的 node 版本
nvm install version # 安装特定版本的 node
nvm uninstall version #卸载
nvm use version # 切换正在用的版本
```
