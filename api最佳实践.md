# API 最近实践

## 参考

[22 条 API 最佳实践](https://mp.weixin.qq.com/s?__biz=MzU3MDAzNDg1MA==&mid=2247519833&idx=1&sn=538b2cf89f702974fe7b8606378b1dc5&chksm=fcf75194cb80d882bb29134ef21180800627942ec9c7286ff37dae667afad766944fc6b0e274&mpshare=1&scene=24&srcid=1215NQTugc2Lo3owUtHDUj0U&sharer_sharetime=1671079435640&sharer_shareid=6ea1cd940892aa32a4f1ab29bba65a51#rd)

[RESTful Web API 设计](https://learn.microsoft.com/zh-cn/azure/architecture/best-practices/api-design)

[REST API 设计最佳实践手册——如何使用 JavaScript、Node.js 和 Express.js 构建 REST API](https://www.freecodecamp.org/chinese/news/rest-api-design-best-practices-build-a-rest-api/)

[Restful API 设计最佳实践](http://kaelzhang81.github.io/2019/05/24/Restful-API%E8%AE%BE%E8%AE%A1%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/)

在`.npmrc`文件中使用`save-prefix`和`save-exact`可以引起冲突。

`save-prefix`和`save-exact`都是 npm 中与包版本相关的选项。

- `save-prefix`指定将要使用什么符号（默认情况下是`^`）来安装依赖包。例如，如果你将`save-prefix`设置为`~`，`npm install package-name`将安装相应的“兼容”版本，例如`~1.x.x`，使得你可以在紧急情况下安装某些更新的小版本。
- `save-exact`指示 npm 保存完全的版本号，而不是一个范围。可以通过运行`npm install package-name --save-exact`来安装完全的版本。

如果在`.npmrc`文件中同时设置了这两个选项，`save-exact`将会优先生效，因为它的优先级更高。如果你需要确保使用`save-prefix`而非`save-exact`，你可以在运行`npm install`命令时解释它的参数，例如：

```bash
npm install package-name --save-prefix="~"
```

这将会覆盖`.npmrc`中的`save-exact`选项并使用`~`来安装`package-name`的依赖包。
