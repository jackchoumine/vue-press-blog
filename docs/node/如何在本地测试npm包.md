# 如何优雅地在本地测试 npm 包

> 太长不读

## 三种方法

1. npm link

2. npm i . -g

3.

`j-form-table`

```bash
npm link
```

或

```bash
npm i . -g
```

![安装依赖](https://tva1.sinaimg.cn/large/008i3skNgy1gu9ki7kssoj61680audhp02.jpg)

`my-admin`

```bash
npm link j-form-table
```

```bash
npm unlink j-form-table
```

https://maecapozzi.com/how-to-locally-test-an-npm-package/

https://blog.csdn.net/terrychinaz/article/details/112976268

![npm link](https://tva1.sinaimg.cn/large/008i3skNgy1gu9k6nqr5hj60kk07w3z002.jpg)

![不添加.npmignore](https://tva1.sinaimg.cn/large/008i3skNgy1gu9jsldf2vj60ea0nkwfn02.jpg)

![添加.npmignore后](https://tva1.sinaimg.cn/large/008i3skNgy1gu9ju6n8cxj60ey0gc3zc02.jpg)
