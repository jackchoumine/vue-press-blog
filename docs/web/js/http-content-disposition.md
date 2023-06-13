# http header Content-Disposition 学习

Content-Disposition 在响应头中，告诉浏览器如何处理返回的内容，在表单提交中，说明表单字段信息。

## 在响应头中

用在响应头中，告诉浏览器如何处理返回的内容。

```bash
'Content-Disposition': 'inline'
```

预览，返回的内容替换当前页面，可使用`a`标签的`target="_blank"`打开新标签。

```bash
'Content-Disposition': 'attachment'
```

下载，使用 a 访问，会把路径作为名字，文件后缀名浏览器自动识别。

```bash
'Content-Disposition': 'attachment;filename=filename'
```

下载，指定文件名字。

> 文件名含有中文，使用`encodeURIComponent`编码，否则报错。

Invalid character in header content ["Content-Disposition"]。

## 在请求头中

页面上有表单，并且我们选择的表单提交方式为 `multipart/form-data` 时，`Content-Disposition `会出现在请求体中。

可能会这样出现：

```bash
Content-Disposition: form-data
Content-Disposition: form-data; name="fieldName"
Content-Disposition: form-data; name="fieldName"; filename="filename.jpg"
```

![](https://tva1.sinaimg.cn/large/008vxvgGly1h8bxww4n74j31200e4402.jpg)

[实例代码](https://github.com/jackchoumine/crud-node)

## 参考

[Hi gays, 你造 Content-Disposition 吗？](https://juejin.cn/post/6844903911740932110)
