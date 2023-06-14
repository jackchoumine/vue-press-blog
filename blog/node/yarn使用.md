# yarn 的使用

npm 有时候安装依赖巨慢，而 yarn 就快得多，为了提升开发体验，有必要学习 yarn。

## yarn 解决什么问题

yarn 是用脸书、谷歌等多家公司联合开发的 node 包管理器，**旨在解决 npm 安装依赖时，版本不确定的问题。** 相同的依赖，安装的顺序不同，最后得到的依赖会不同，这就导致在相同的依赖，运行结果却不同。`npm 5+ 以后的版本加入了 package-lock.json 可以用来锁定依赖版本`。引入版本锁定文件后，虽然版本不确定的问题得以解决， yarn 还是具备以下 优势：

- 速度快---缓存安装过的依赖，**并行下载**，速度极快；
- 安全---在执行代码之前，会对依赖的完整性进行校验；
- 可靠---保证不同平台的依赖相同。

### 常用命令

#### 初始化依赖描述文件

```bash
yarn init # 初始化依赖描述文件
yarn init -y # 使用默认值初始化依赖描述
```

#### 执行脚本

```bash
yarn run command
```

#### 添加依赖

```bash
yarn install # 安装全部依赖
yarn # 安装全部依赖

yarn add package # 默认安装成【生产依赖】，最新版本。
yarn add package@version # 默认安装主版本里最新的
yarn add package@version -E # 安装精确版本
yarn add package@version -T # 安装次版本里最新的
yarn add package@tag
yarn add file:/path/to/local/folder # 安装本地包，用于测试还没发布的包
yarn add package --dev # 开发依赖
yarn add package -D
yarn remove package # 卸载依赖
yarn global add package # 全局安装
yarn global remove package # 全局卸载
```

> 全局安装是一个坏习惯，因为全局包不会出现在项目依赖里，拿到你的项目的人，难以得到想要的依赖。
> **本地安装**就能确保每个用你项目的人，都有相同的依赖。

#### 查看依赖

```ba
yarn list # 本地依赖
yarn global list # 全局依赖
```

#### 缓存相关

Yarn 将每个包存储在你的文件系统 - 用户目录 - 全局缓存中。yarn cache list 将列出已缓存的每个包。

```bash
yarn cache list --pattern <pattern> # 列出匹配指定模式的缓存的包
yarn cache dir # 输出全局缓存路径
yarn config set cache-folder <path> # 改变缓存路径
yarn cache clean [packname] # 清除包缓存
```

#### 验证依赖

```bash
yarn check #验证当前项目 package.json 里的依赖版本和 yarn 的 lock 文件是否匹配。
yarn check --integrity # 验证当前项目 package.json 里包内容的版本的 hash 值是否与 yarn 的 lock 文件一致。 这有助于验证包依赖没有更改。
```

#### 升级依赖

```bash
yarn upgrade package
yarn upgrade package@version
yarn upgrade package@tag
```

#### 卸载依赖

```bash
yarn remove package
yarn global remove package # 全局卸载
```

### 配置相关

设置配置信息

```bash
yarn config set key value
```

查看配置

```bash
yarn config get key
yarn config list # 配置列表
```

删除配置

```bash
yarn config delete key
```

### 查看包信息

```bash
yarn info package
yarn info package --json # 以 JSON 格式显示
yarn info package field # 查看字段
yarn info package time # 查看包发布的时间
yarn bin # 查看可执行文件的目录
```

#### 查看过时的包

```bash
yarn outdated
yarn outdated package # 查看
```

## 开发包时常有的命令

```bash
yarn version # 升级包的版本
yarn version --new-version <version> # 指定一个新版本
yarn login # 登录 只需要输入用户名和邮箱
yarn logout # 退出
yarn publish # 发布包
```

[yarn version](https://classic.yarnpkg.com/zh-Hans/docs/cli/version)
