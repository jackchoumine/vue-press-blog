# 常见媒体类型

MIME（Multipurpose Internet Mail Extensions）网络多用途邮件扩展，告知某种扩展名的文件用特定软件打开或处理，也叫 Media Type（Internet Media Type）媒体类型。浏览器从 HTTP 消息头字段 Content-Type 得知资源类型，从而能正确处理网络中传递的资源，实际上媒体类型就是指定`content-type`的值。

用 `/` 区分类型和子类型，类型指定多个类型，子类型更加明确的指定类型。不区分大小写，惯例用小写。

<!--more-->

## 常见的媒体类型：

- <span style="color:blue">text/html：HTML 格式</span>
- <span style="color:blue">text/plain：普通文本</span>
- text/xml : XML 格式
- <span style="color:blue">image/\* : 图片 </span>
- image/gif : gif 图片
- image/jpg : jpg 图片
- image/png : png 图片

## 以 application 开头的媒体类型

- <span style="color:blue">application/json ：JSON 格式数据</span>
- <span style="color:blue">application/x-www-form-urlencoded：form 表单默认以 `key1=val1&key2=val2` 的格式发送数据到服务器（表单默认提交的数据格式），并对 key 和 value 进行 url 编码"</span>
- application/pdf：pdf 格式
- application/msword ： Word 文档格式
- application/octet-stream ： 二进制流数据（如常见的文件下载）
- application/xml ： XML 数据格式
- application/atom+xml ：Atom XML 聚合格式
- application/xhtml+xml ：XHTML 格式

## 上传文件

- <span style="color:blue">multipart/form-data : 在表单中提交文件 enctype="multipart/form-data"</span> 。也可传输`key=value` 数据，性能损耗大，不推荐。

> text/xml vs application/xml

根据[https://datatracker.ietf.org/doc/html/rfc3023](https://datatracker.ietf.org/doc/html/rfc3023#section-9)、[On application/xml and text/xml](http://www.grauw.nl/blog/entry/489/)、[What's the difference between text/xml vs application/xml for webservice response](https://stackoverflow.com/questions/4832357/whats-the-difference-between-text-xml-vs-application-xml-for-webservice-respons)，以及代码的执行结果，两者是一样的。

存在两种估计是历史问题。

> 蓝色更为常用
