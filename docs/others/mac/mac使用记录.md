# Mac 使用记录

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

## iina 播放器使用

快捷键

```bash
space # 暂停、开始
cmd + → # 下一个媒体
cmd + ← # 上一个媒体
cmd + shift + p # 播放列表
cmd + [ # 0.5倍速
cmd + ] # 2 倍速
option + cmd + [ # 0.9091 倍速
option + cmd + ] # 1.1 倍速
```
