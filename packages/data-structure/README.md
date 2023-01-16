# 数据结构和算法

## vitest 测试环境搭建

### 安装依赖

`yarn create vite`、 选择 Vanilla 和 typescript

`pnpm i`

`pnpm add -D vitest`

### 修改配置

`vite.config.ts` 文件顶部添加`/// <reference types="vitest"/>`

```ts
// @ts-nocheck
/// <reference  types="vitest"/>
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
  },
})
```

添加脚本 `"unit":"vitest"`

### 验证是否可用

编写一个可用性测试:

`can-use.test.js`

```js
test('可用性测试', () => {
  expect(1 + 2).toBe(3)
})
```

`pnpm unit`，测试通过，环境搭建完毕。

> `.test.ts` 文件提示类型错误，需要在`tsconfig.json`里添加`types`

```json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
    // "isolatedModules": true,
  }
}
```

## 参考资料

[JavaScript 数据结构与算法 全套教程](https://www.youtube.com/playlist?list=PLkNxDxyJqb-zYVDrpRJbxabUxOTEB3N8k)
