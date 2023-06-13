# Chocolatey 包管理器的使用 

Chocolatey 是 window 平台的包管理器，类似 node 的 npm 和 mac 的 brew，通过它，可搜索、安装、管理、更新各种各样的软件。特别适合管理一些小众、轻量的开源软件。**最重要的是，有些软件需要设置环境变量才能用，而使用 chocolatey 安装，有些软件能自动设置环境变量。对开发者来说，使用一条命令就能搭建开发环了。**

## 常用命令

```bash
choco -v # 查看版本
choco config list # 查看配置
choco config get <configName 
choco config set <configName> <value> # 设置配置
choco config set proxy http://localhost:1080 # 设置科学上网，加速下载
choco config unset proxy # 取消代理

choco find keyword # 搜索
choco list keyword # 同上 
# 搜索结果中 带有 [Approved] 是经过认证的，意味着更加安全，质量也有保障。
#  Possibly broken 可能损坏了，不推荐安装
choco -? # - 后面是选项参数
choco list keyword -a # 搜索所有版本
choco list keyword -e # 精确匹配 -e 是  --exact 的缩写
choco list keyword --approved-oly # 只搜索通过的认证的包
choco list keyword --version=value # 搜索特定版本的包

choco -h #帮助
choco -y # 默认同意所有操作询问
choco list -l # 只显示本地安装的包
choco list --localonly # 同上

choco install pkgname1 pkgname2 # 安装
choco install pkgname -version 7.22.0 # 安装特定版本的包
# 如何安装特定范围的版本？目前还不支持
choco install pkgname -y # 直接安装，不需要再次确认运行脚本

# 指定目录安装
choco install jdk8 -params 'installdir=c:\\java8'

choco uninstall pkgname # 卸载
choco list -l # 查看版本号
choco outdated # 查看过时的包，可更新的包，最后一个 pinned 选项是说明包是否禁止升级

choco pin add -n=pkgname # 禁 止包升级，在升级所有时特别有用
choco pin add -n=git # 禁止 git 升级
choco pin add -n=git --version 1.2.3 # 禁止某个版本升级
choco pin remove --name git # 从禁止升级列表中移除

choco upgrade pkgname # 更新
choco upgrade --except="pkg1,pk2" # 更新是排除某些包和 pin 功能类似
choco upgrade all # 更新所有
```

> 去chocolatey 网站可搜索你想要的包 [choco 网页找包](https://chocolatey.org/packages)


### 包的类型


|后缀 |是否在`卸载或更改程序`中出现|说明|例子|
|:---:|:------------------------:|:---|:--|
|无后缀|会|已经安装，跳过，否则安装 `.install`包|nodejs|
|`.portable`|不会|压缩包（zip），类似免安装软件|putty.portable|
|`.commandline`|不会|将来会别废弃，不推荐使用|nodejs.commandline|



> 在 `卸载或更改程序`出现，意味着你可手动卸载和更改，和动安装的`.msi`、`.exe`类似。

> 推荐安装的类型：无后缀 > `.install` > `.portable` > `.commandline`。


win7 安装 `curl`：
```bash
choco find curl # 搜索到 curl
choco install curl # 安装 安装完了会询问你是否执行脚本
```
配置 curl 的环境变量
`找到 curl 的安装目录`（安装完毕，会显示安装在个目录）→ `进入 choco 的安装路口 lib `，我的是*D:\soft_setup\ChocolateyInstall\lib* → 找到 curl ,打开`\tools\curl-7.72.0-win64-mingw\bin`,复制完整的绝对路径 → 将路径加入环境变量 path → `curl -V`，显示版本号就表示成功了。

## 修改 chocolatey 的安装路径

默认的安装路径是`C:\ProgramData\chocolatey\lib`，这个路径是环境变量 ChocolateyInstall 的值，修改该值，就是实现指定安装目录了。

我将其修改为为 `D:\soft_setup\ChocolateyInstall`，方便和通过其实方式安装的软件集中管理。

## 缺点

- 被墙，即使科学上网，有时也会很慢；
- 安装的软件不创建桌面快捷方式，可能会找不到；
- 指定安装路径不方便，可指定安装路径，对不同的软件格式比如`msi`、`exe`也不同；
- **安装 chocolatey ** 就需要一定的门槛。我安装了几次才成功，然后想重新安装，一直不成功。
- 软件不是很多。

## 强烈推荐的软件


|          软件|功能                      |类似的软件|
|-------------:|:------------------------|:---------|
|       wox|快速启动软件、查询文件等，配合 everything 体验更好|listary|
| Treesize Free|整理和查找大文件||
| Spacesniffer|列出文件占用的空间|和上面的功能类似|
|              7zip|压缩、解压软件|peazip|
|    ccleaner|清除磁盘垃圾，告别360卫士全家桶||
| adwcleaner|木马查找软件，查找流氓软件||
|filezilla.server|可在移动设备上播放电脑视频||
|mpv|视频播放软件||
|irfanview|图片浏览器||
|shotcut|视频剪辑||
|qtranslate|轻量翻译软件||

## 开发环境

> gcc

```bash
choco install mingw -y # 安装完毕，gcc -v 检查是否成功
```

> 一键安装

```bash
choco install treesizefree irfanview spacesniffer ccleaner mpv wox -y
```

## 参考

- [[Win] 使用 Chocolatey 管理你的小软件们](https://zhuanlan.zhihu.com/p/42441423)
- [Windows 程序包管理器 Chocolatey：一条命令装软件](https://www.cnblogs.com/sitoi/p/11811399.html)

