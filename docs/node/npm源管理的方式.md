# npm 源管理的方式

## 推荐的方式 -- nrm 管理

```bash
npm i nrm -g
nrm list # 查看源 前面有 * 的是正在使用的
nrm use registry-name # 切换源

nrm test registry-name # 测试
nrm add registry-name url # 添加新的源
nrm del registry-name # 删除源

nrm set-auth -u username -p password registry-name # 对源添加认证信息
nrm publish # 发布 npm
```

## npm 命令

```bash
npm config set registry url
npm config get registry
```

全局的 `.npmrc` 会修改

## 手动修改全局的 ~/.npmrc

```bash
registry = https://registry.npm.taobao.org
```

## 项目内局部使用

在项目里创建`.npmrc`，然后设置源。

## 安装命令使用

```bash
npm i npm-name --registry url # 从该 url 下载 npm
```
