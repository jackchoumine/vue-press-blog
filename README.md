# pnpm monorepo 创建vue UI 库

## 问题

1. vite 按照组件拆分样式文件？

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({ include: './lib' })],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'my-button',
      fileName: 'my-button',
    },
    rollupOptions: {
      // 排除不想打包的依赖
      external: ['vue'],
      output: {
        // 外部依赖为一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
```

修改package.json

```json
{
  "exports": {
    ".": {
      "import": "./dist/jack-components.js",
      "require": "./dist/jack-components.umd.js"
    }
  },
}
```

2. 最外层的 package.json 的依赖是 packages 里的项目共享的吗？

是的。

> 只要版本好一致，多个项目都用到了，就可安装到外部的 package.json 里。

这样安装有什么坏处吗？

控制台会提示依赖丢失，但是不影响运行。

3. 如何在外层把依赖安装到某个项目？

```bash
pnpm i package-name -F project-name # -F 指定安装的项目
```

4. 指定使用pnpm作为包管理器

使用`only-allow`包。

```js
"scripts": {
    "preinstall": "npx only-allow pnpm",
  },
```

> 在最外层的 package.json 设置，其他项目也会生效。

5. 如何一次性安装所有项目的依赖？

```bash
pnpm i -r # -r 遍历安装
```

6. 如何在外层执行某个项目的脚本？

7. `tsconfig.json` 如何共用？

