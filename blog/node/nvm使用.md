# nvm 使用

使用 nvm（Node.js Version Manager Node.js 版本管理器）可以更轻松地在**单个本地环境**上安装和管理 Node.js 的**多个版本**。

## 安装 nvm

通过 brew

```bash
brew install nvm
```

通过 curl

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

## 配置环境变量

在`.zshrc`或者`.bash_profile` 添加

```bash
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

> 验证

```bash
source ~/.zshrc
nvm -v # 输出版本号说明安装成功
```

## 使用

```bash
nvm ls # 查看安装了哪些版本
nvm install node # 安装最新版本
nvm install version-no # 安装指定版本
nvm install 14.0.0
nvm which version-no # 查看安装目录
nvm install --lts # 安装长支持版本
nvm install --lts=version-symbol # 通过版本代号安装长支持版本
nvm uninstall --lts=version-symbol # 通过版本代号安装长支持版本
nvm use version-no # 切换版本
nvm use default # 默认版本
nvm use stable # 稳定版本
nvm use system # 系统版本 TODO 什么叫系统版本？
nvm alias default version # 设置默认版本
```

> 绿色箭头的是当前使用的版本，并列出了可安装的长期支持版本
> 每个长期支持的版本都有一个化学元素的代号
> npm 和 node 绑定了，切换 node 版本，npm 也会切换

安装最新的 npm

```bash
nvm install-latest-npm
```
