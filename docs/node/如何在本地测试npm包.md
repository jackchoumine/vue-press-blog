# 如何优雅地在本地测试 npm 包

需要发布`my-npm`，想在`my-project`项目内测试`my-npm`

`my-npm` 是 npm 的名字，不一定和项目名字相同，为了方便，开发 my-npm 的项目名字也叫 my-npm。

## 三种方法

> 1. npm link

my-npm build 后，执行 `npm link`，然后 my-project `npm link my-npm`

测试完毕，在 my-project `npm unlink my-npm` 释放软连接。

**推荐这种方式，优点：my-npm 再次构建后，在 my-project 直接得到变更后的代码**

> 2. yalc 模拟仓库

全局安装 `npm i yalc -g`

my-npm build 后， 执行 `yalc public`， my-project `yalc add my-npm`

缺点：再次构建后，还需要在`my-project`安装，有点繁琐。

> 3. npm i . -g

my-npm build 后， 执行`npm i . -g`，然后 my-project `npm link my-npm`

测试完毕，my-project `npm unlink my-npm` 释放软连接。

## 这些命令做了啥

link 和 npm i . 都在 npm 的全局 node_modules 内创建了链接到 npm 的软连接。

![安装依赖](https://tva1.sinaimg.cn/large/008i3skNgy1gu9ki7kssoj61680audhp02.jpg)

![npm link](https://tva1.sinaimg.cn/large/008i3skNgy1gu9k6nqr5hj60kk07w3z002.jpg)

yalc 则在项目模拟了一个仓库，在 yarn add 本地的 npm 包。

本质是简化了`yarn add file:npm-path`。

![npm 被移入项目](https://tva1.sinaimg.cn/large/008i3skNgy1gubnsr8rouj60jy08iglw02.jpg)

```bash
# yalc add 之后
"j-form-table": "file:.yalc/j-form-table",
```

常用的 yalc 命令

```bash
yalc publish # 发布
yalc add npm-name # 安装进入项目
yalc update # 升级npm
yalc remove npm-name # 移除 npm
yalc dir npm-name # 查看 npm 的目录
```

## 关于 npmignore

`npmignore` 排除资源，使 npm 体积减少。

不配置 npmignore

![不添加.npmignore](https://tva1.sinaimg.cn/large/008i3skNgy1gu9jsldf2vj60ea0nkwfn02.jpg)

配置了 npmignore

![添加.npmignore后](https://tva1.sinaimg.cn/large/008i3skNgy1gu9ju6n8cxj60ey0gc3zc02.jpg)

`package.json`的 files 字段，指定发布到 npm 的文件。

## 参考

[如何在本地测试 npm 包](https://maecapozzi.com/how-to-locally-test-an-npm-package/)

[如何减少 npm 包的体积](https://blog.csdn.net/terrychinaz/article/details/112976268)
