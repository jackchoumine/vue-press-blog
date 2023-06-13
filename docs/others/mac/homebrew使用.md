# homebrew 使用

## 安装

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

报错：`443:Operation time out`
[解决办法](https://zhuanlan.zhihu.com/p/89941189)

解决：在电脑浏览器或者手机浏览器打开[安装地址](https://raw.githubusercontent.com/Homebrew/install/master/install)

拿到访问的内容，新建一个 brew_install.txt ,替换国内源：

```bash
#BREW_REPO = "https://github.com/Homebrew/brew".freeze
BREW_REPO = "git://mirrors.ustc.edu.cn/brew.git".freeze
```

这是清华大学的源，

中科大 brew 镜像源 `http://mirrors.ustc.edu.cn/homebrew.git`
清华 brew 镜像源 `http://mirrors.ustc.edu.cn/homebrew.git`
coding `https://git.coding.net/homebrew/homebrew.git`

> 以上方法不行了，使用此方法：

### 方法一

```bash
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

### 方法二

修改 dns 为 8.8.8.8 或者 114.114.114.114
`系统偏好设置`--->`网络`--->`高级`--->`dns`

```
# cd to homebrew foler
cd "$(brew --repo)"；
# check  git remote status
git remote -v;
# https://github.com/Homebrew/homebrew.git
# update remote url with Coding.net
git remote set-url origin https://git.coding.net/homebrew/homebrew.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://git.coding.net/homebrew/homebre-core.git
brew update
```

## brew 的使用

### 查看版本吧

```bash
brew -v
```

### 搜索软件

```bash
brew search [TEXT|/REGEX/] # 支持正则表达式
```

### 安装软件

```bash
brew install formula
brew reinstall formula # 重新安装
```

### 查看软了信息

```bash
brew info formula
brew info # 显示安装了包数量，文件数量，和总占用空间
brew deps --N formula # 显示某个软件的依赖关系 N 显示的依赖层级
brew deps --installed --tree # 查看已安装的包的依赖，树形显示
```

### 查看安装的软件

```bash
brew list
brew ls # 上面命令的别名
```

### 卸载

```bash
brew remove
brew uninstall formula
brew uninstall formula --force # 强制卸载
```

### 检查更新

```bash
brew outdated # 查看有新版的软件
```

### 更新

```bash
brew update          # 更新所有
brew pin formula     # 锁定某个包,更新所有时，不更新
brew unpin formula   # 取消锁定
brew upgrade formula # 更新某个
```

### 清除旧版本

```bash
brew cleanup # 清除所有旧版本
brew cleanup formula # 清除某个软件的旧版本
brew cleanup -n # 查看了可清除的旧版本
```

### 查看配置

```bash
brew config
```

### 替换 homebrew 源

#### 替换 homebrew 默认源

```bash
cd "$(brew --repo)"
git remote set-url origin git://mirrors.ustc.edu.cn/brew.git
```

#### 替换 homebrew-core 源

```bash
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin git://mirrors.ustc.edu.cn/homebrew-core.git
```

### 问题诊断

```bash
brew doctor
```

### 安装第三方扩展的 brew 服务

```bash
brew tap <github_user/repo>
brew tap --full url
brew tap [--full] user/repo [URL]  # 添加仓库
brew install formula # 安装完第三方 brew 服务，可使用 install 安装相关软件
```

### 查看服务

```bash
brew tap # 已安装的仓库列表
```

### 移出第三方 brew 服务

```bash
brew untap user/repo [user/repo user/repo ...]
```

### brew 服务

```bash
brew services list # 查看当前正在运行的服务
brew services run (formula|--all) # 启动服务 开启不启动
brew services start (formula|--all) # 启动服务 开机启动
brew services restart (formula|--all) # 启动服务 开机启动
brew services stop (formula|--all)
brew services cleanup # 移除所有服务
```

### 常用软件

```bash
brew install thefuck # 命令纠错工具 eval $(thefuck --alias) 进 ~/.zshrc
```

### 参考

> [Homebrew 安装与配置 || 换源、卸载、常用命令、brew cask](https://www.mscto.com/op/385844.html)

## cask 使用

**brew** 是从下载源码解压然后 ./configure && make install ，同时会包含相关依存库。并自动配置好各种环境变量，而且易于卸载。
这个对程序员来说简直是福音，简单的指令，就能快速安装和升级本地的各种开发环境。

**brew cask** 是 已经编译好了的应用包 （.dmg/.pkg），仅仅是下载解压，放在统一的目录中（/opt/homebrew-cask/Caskroom），省掉了自己去下载、解压、拖拽（安装）等蛋疼步骤，同样，卸载相当容易与干净。这个对一般用户来说会比较方便，包含很多在 AppStore 里没有的常用软件。

brew cask 是 brew 的一个子集，也就是一个扩展。它们的使用方式几乎相同。

使用 brew 安装程序是，可能会从 github 克隆相关仓库，会特别慢，如果你是 ssr 科学上网，可设置代理。

```bash
git config --global http.https://github.com.proxy socks5://127.0.0.1:1086
git config --global https.https://github.com.proxy socks5://127.0.0.1:1086
```

[参考问题](git clone 一个 github 上的仓库，太慢，经常连接失败，但是 github 官网流畅访问，为什么？ - 汪小九的回答 - 知乎 https://www.zhihu.com/question/27159393/answer/141047266)

设置代理后，pac 模式下下载速度极快。

### 安装软件

```bash
brew search app-name # 搜索你想要安装的软件
brew install # Formulae 类型的软件，往往是开发工具，比如命令行
brew list node --versions # 查看安装的版本
rm -rf /usr/local/Cellar/node/10.12.0  # 删除
brew info node |grep -i '\/cellar' # 查看版本
brew cask install # Casks 类型的软件，往往带用户界面
brew cask list # 查看安装了那些软件
brew search discord # 搜索 discord 软件
brew info app-name # 查看软件信息
brew outdated # 查看更新
brew upgrade # 升级所有 当然也可以指定升级
brew upgrade xxx # 指定的升级的程序名
brew cleanup # 清理不需要的版本及其安装缓存
brew cleanup package # 删除某个老版本
brew uninstall xxx # 删除不需要的程序
brew cask install discord
ALL_PROXY=socks5://127.0.0.1:1086 brew cask install discord # 如果下载很慢，可使用代理下载，速度飞快
brew list # 安装了哪些软件
brew doctor # 诊断
brew --prefix app-name # 查看安装路径
```

最好不要将 `export ALL_PROXY=socks5://127.0.0.1:1086` 写入到 **.zshrc** 或者 **.bash_profile** 等配置文件中。

因为这可能会导致其他的工具无法正常使用，每次 **HomeBrew** 使用代理前，加上 `ALL_PROXY=socks5://127.0.0.1:1086` 即可。

[解决 macOS HomeBrew 下载缓慢的问题](https://juejin.im/post/5cb1a59ce51d456e8757ddc3)

[macOS 下的包管理器 Homebrew](https://realneo.me/macos-package-manager-homebrew/)

### 解决从 github clone 443

编辑 hosts

```bash
sudo vim /etc/hosts
# 199.232.28.133 raw.githubusercontent.com
ALL_PROXY=socks5://127.0.0.1:1086 brew cask install adoptopenjdk
```

### 常用软件安装

```bash
brew cask install visual-studio-code # vscode
brew install angular-cli # angular cli
brew cask install font-fira-code # 安装 fira-code 字体
brew cask install cakebrew # brew 图形管理
brew cask install launchrocket # 服务查看器
```

## brew 问题

1. 安装软件报错：

```bash
tar: Error opening archive: Failed to open '/Users/jack/Library/Caches/Homebrew/downloads/aef75b0f44e39114353a1efb72d0623f3d0c92782a31dd9cb0afe7160d20fbf8--six-1.16.0_1.big_sur.bottle.tar.gz'
Error: Failure while executing; `tar --extract --no-same-owner --file /Users/jack/Library/Caches/Homebrew/downloads/aef75b0f44e39114353a1efb72d0623f3d0c92782a31dd9cb0afe7160d20fbf8--six-1.16.0_1.big_sur.bottle.tar.gz --directory /private/tmp/d20211101-6634-10gmz2q` exited with 1. Here's the output:
tar: Error opening archive: Failed to open '/Users/jack/Library/Caches/Homebrew/downloads/aef75b0f44e39114353a1efb72d0623f3d0c92782a31dd9cb0afe7160d20fbf8--six-1.16.0_1.big_sur.bottle.tar.gz'
```

解决办法：

根据 [Mac Big Sur 升级后 brew 安装报错问题解决](https://blog.csdn.net/ljl6158999/article/details/118144440)

`bash` 终端

```bash
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile

source ~/.bash_profile
```

`zsh` 终端

```bash
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.zshrc

source ~/.zshrc
```

没有用。

> 根据 [国内 Mac 安装 Homebrew 可能会跳的坑一览](https://zhuanlan.zhihu.com/p/383707713)

暂时去掉国内的镜像，可行。

## java 环境搭建

```bash
brew cask install java # 安装最新的版本
# 安装指定版本
brew tap adoptopenjdk/openjdk
brew cask install adoptopenjdk8
brew cask install adoptopenjdk11
brew cask install adoptopenjdk13
# 更新 .bash_profile
sudo vim .bash_profile
export JAVA_8_HOME=$(/usr/libexec/java_home -v1.8)
export JAVA_11_HOME=$(/usr/libexec/java_home -v11)

alias java8='export JAVA_HOME=$JAVA_8_HOME'
alias java11='export JAVA_HOME=$JAVA_11_HOME'

# default to Java 11
java11
# 刷新
source ~/.bash_profile
# 查看安装的版本
java --version
```

## mysql 安装

`brew install mysql`

没有初始密码的，执行`mysql_secure_installation` 可以设置密码

运行 `brew service start mysql` 可以后台启动 mysql
运行 `mysql.server start` 前台启动 mysql (关闭控制台，服务停止)

密码 KKms8848!!。


## Java 环境搭建

### 安装 tomcat 

```bash
brew install tomcat@8
```
修改`.zshrc`:

```bash
echo 'export PATH="/usr/local/opt/tomcat@8/bin:$PATH"' >> ~/.zshrc
```
启动：
```bash
brew services restart tomcat@8 # 重启服务
brew services stop tomcat@8 # 停止服务
```
访问`http:localhost:8080`，可看到 tomcat 页面。