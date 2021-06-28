# commonJS 和 ES6 模块在 Vue 中混用

|    引入    |        导出        | 是否可行 |                                          说明                                          |
| :--------: | :----------------: | :------: | :------------------------------------------------------------------------------------: |
|  require   |   module.exports   |    ×     | 报错：`TypeError: Cannot assign to read only property 'exports' of object '#<Object>'` |
|  require   |       export       |    √     |                                                                                        |
| **import** |     **export**     |    √     |                                      **推荐使用**                                      |
| **import** | **module.exports** |    ×     |                                       报错：同上                                       |

目前 node 还不支持 ES6 模块，需要用 webpack 统一模块化方案。**require**、**module.exports** 是 CommonJS 的引入导出模块方案，却不同在同一个文件内使用，这点很让人费解。

**注意**：目前 node 的模块化方案，只有 CommonJS，require 和 module.exports 是可以混用的。
