<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-21 18:53:32
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-05-06 00:22:42
 * @Description :
-->

# pnpm 使用

## 常用命令

```bash
pnpm i package-name
pnpm i package-name -w # 安装到根工作空间
pnpm i package-name -r # 递归安装到所有工作空间
pnpm i package-name -f=workspace # 指定工作空间
pnpm -F 'delight*' i mitt # 指定工作空间安装依赖
pnpm i package-name -D # 安装到开发依赖
pnpm i package-name -P # 安装到生产依赖
pnpm i package-name --save-peer # 安装到peer依赖
pnpm i package-name -g # 全局安装
pnpm i package-name -DW # 安装到根工作空间的开发依赖
pnpm i package-name -DR # 递归安装到所有工作空间的开发依赖

pnpm up package-name # 更新到最新版本
```

```bash
pnpm dev -f=workspace # 指定工作空间执行dev命令
```
