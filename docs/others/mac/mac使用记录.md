# Mac 使用记录

## homebrew

### 安装

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
`系统偏好设置`→`网络`→`高级`→`dns`

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
brew install thefuck # 命令纠错工具 eval $(thefuck --alias) 进 ~/.zhsrc
```

## 前端环境搭建

安装完成 homebrew 之后，设置 dns 后安装 nvm:

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
nvm -v # 查看版本
nvm install --lts # 安装最新的长期支持的node版本
```

## 参考

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

### java 环境搭建

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

## brew 问题

## 访达

```bash
option + cmd + space # 打开 访达窗口
cmd + shift + . # 显示或者隐藏相关文件
# 隐藏系统文件夹
defaults write com.apple.finder AppleShowAllFiles -boolean false ; killall Finder
# 显示系统文件家
defaults write com.apple.finder AppleShowAllFiles -boolean true; killall Finder

cmd + shift + g # 前往任何目录

# 类似 bash here 功能
1. 选中文件夹
2. 服务
3. 新建位于文件夹位置的终端标签页

# 改变打开时的默认窗口大小
1. 打开访达
2. 按住 option，同时调整窗口大小和位置
3. 再次打开时，就是调整过的大小和位置了，其他软件，也能这样设置

# 如何调整终端打开时的位置
# 参考访达打开时的窗口大小

# 移出到废纸篓
cmd + delete

# 完全删除
cmd + option + delete

# 快速预览文件
空格健
esc # 退出预览

# 查看文件夹和文件信息
cmd + i

# 退出优盘
点击优盘傍边的右上箭头
cmd + E # 选中优盘
选中后点击推出 “xx”
```

## mac os

```bash
ctr + com + q # 锁屏
ctrl + 空格 # 切换输入法
cmd + 空格 # 搜索
cmd + h # 显示桌面
cmd + c # 复制
cmd + v # 粘贴
cmd + option + shift + v # 无格式粘贴
cmd + x # 剪切
cmd + z # 撤销 删除文件时也可以
cmd + shift + z # 重做
cmd + w # 关闭当前窗口
cmd + q # 退出程序
cmd + option + F # 退出或者进入全屏
cmd + shift + 3 # 全屏截图

cmd + shift + 4 # 部分截图
鼠标拖动时，以改变窗口的尺寸，然后可按住以下健，以改变窗口形态
空格：固定尺寸，可拖动截图窗口
shift：改变宽或者高
option：宽高放缩
# 窗口截图
# cmd + shift + 4 之后按 空格 可实现窗口截图

cmd + shift + 5 # 录屏
cmd + shift + 6 # 给 touch bar 截图
```

### 修改截图保存位置

```bash
 defaults write com.apple.screencapture location ~/front/jack-picture
 killall SystemUIServer
```

## 终端

```bash
# 自动补全命令
1. 打开编辑器
vim .inputrc #.inputrc 时终端配置文件
2.按 i 粘贴如下文字
set completion-ignore-case on
set show-all-if-ambiguous on
TAB: menu-complete
3. 保存退出 esc 再 :wq

#新建 tab
cmd + t

# code 命令打开项目
# 在 .zshrc 追加
code () { VSCODE_CWD="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;}

# git status 名称为中文的的文件显示乱码
# 设置 git 解决
git config --global core.quotepath false
```

## rectangle 分屏

```bash
ctrl + option + ← # 靠左
ctrl + option + → # 靠右
ctrl + option + ↑ # 靠上
ctrl + option + ↓ # 靠下
ctrl + option + enter # 全屏
ctrl + option + u # 左上
ctrl + option + i # 右上
ctrl + option + j # 左下
ctrl + option + k # 右下
ctrl + option + e # 左边 三分之二
ctrl + option + t # 右边 三分之二
ctrl + option + d # 左边 三分之一
ctrl + option + g # 右边 三分之一
ctrl + option + f # 居中 三分之一
```

## 键盘输入

```bash
# 输入非直角双引号
# 中文输入法下，按双引号健，输入的却是 按住 shift + " →『』，只按 " → 」「
# 如何输入常用的双引号，百度输入法下，去掉直角双引号的勾选
```

## electron 安装很慢

在 .npmrc 文件中加入 electron 镜像

```js
electron_mirror=https://npm.taobao.org/mirrors/electron/
```

重新 npm i

## vscode

```bash
          option + delete # 删除左边整个单词
control + option + delete # 删除左边部分单词
```
