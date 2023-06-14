# node 学习笔记 --- path 模块

path 路径提供了操作文件目录的工具。

## 常用方法

|         方法          | 参数说明             | 返回值             | 功能                                                                  |
| :-------------------: | :------------------- | :----------------- | :-------------------------------------------------------------------- |
|   join([...paths])    | 一系列字符路径字符串 | 根据平台连接路径   | 连接路径，得到一个相对路径或者绝对路径。上级目录：`..`，当前目录：`.` |
|  resolve([...paths])  | 一系列路径           | 一个绝对路径字符串 | 从右边到左边解析参数，得到一个绝对路径                                |
|   isAbsoulte(path)    | 字符串               | boolean            | 判断路径是否为绝对路径                                                |
|   relative(from,to)   | 路径                 | 路径               |
|    normalize(path)    | 路径                 | 路径               | 格式化有个路径，忽视`..`和`.`                                         |
|     dirname(path)     | string               | 路径               |                                                                       |
| basename(path[,.ext]) | string               | 路径               | 获取路径的最后一部分                                                  |
|     extname(path)     | string               | 文件扩展名         | 获取文件扩展名，没有`.`或`..`在第一个，将返回`''`                     |
|      parse(path)      | string               | object             | 把字符串路径解析成对象                                                |
|  format(pathObject)   | object               | string             |                                                                       |

```javascript
console.log(path.basename('/foo/bar/baz/asdf/quux.html')) // quux.html
console.log(path.basename('/foo/bar/baz/asdf/quux', '.html')) // quux
console.log(path.dirname('/foo/bar/baz/asdf/quux')) // /foo/bar/baz/asdf
console.log(
  path.format({
    root: '/ignored', // 有 dir ,root 将被忽视
    dir: '/home/user/dir',
    base: 'file.txt',
  })
) ///home/user/dir\file.txt
console.log(path.parse('/home/user/dir/file.txt'))
/*{ root: '/',
  dir: '/home/user/dir',
  base: 'file.txt',
  ext: '.txt',
  name: 'file' }
*/
console.log(path.parse('C:\\path\\dir\\file.txt'))
/*
{ root: 'C:\\',
  dir: 'C:\\path\\dir',
  base: 'file.txt',
  ext: '.txt',
  name: 'file' }
*/
```

```bash
┌──────────────────-───┬────────────┐
│          dir       │    base   │
├──────┬              ├──────┬─────┤
│ root │             │ name │ ext │
"  /   home/user/dir / file  .txt "
└──────┴──────────────┴──────┴--─────┘
```

```bash
┌──────────────────-───┬────────-────┐
│          dir       │    base    │
├──────┬              ├──────┬──-───┤
│ root │              │ name │ ext │
" C:\      path\dir   \ file  .txt "
└──────┴────────────--──┴──────┴─-────┘
```

## 常用属性

|   属性    | 说明             |
| :-------: | :--------------- |
|    sep    | 平台文件分割符号 |
| delimiter | 路径分割符号     |

## 更多参考

> 1. [Path | Node.js v11.3.0 Documentation][1]

[1]: https://nodejs.org/api/path.html
