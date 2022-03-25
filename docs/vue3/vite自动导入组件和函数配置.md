## 自动引入自定义组件

```bash
npm i -D unplugin-vue-components
```

vite 配置

```js
import AutoImportComponents from 'unplugin-vue-components/vite'
export default defineConfig({
  plugins: [
    AutoImportComponents({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.md$/, // .md
      ],
      dts: true, // 自动生成 component.d.ts  NOTE必须在 tsconfig.json 中添加 component.d.ts, 编辑器不再飘红和提示props
    }),
  ],
})
```

自动导入组件库的组件

```js
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
// 添加 resolvers
AutoImportComponents({
  // ...
  resolvers: [VantResolver(), ElementPlusResolver()], // ElementPlusResolver(),
})
```

message, notification 等引入样式不生效 安装 vite-plugin-style-import 即可。

插件添加

```js
import styleImport, { VantResolve, ElementPlusResolve } from 'vite-plugin-style-import'
// 添加插件
styleImport({
  resolves: [VantResolve(), ElementPlusResolve()],
  // 自定义规则
  // 错误提示在不到样式，添加这个
  libs: [
    {
      libraryName: 'element-plus',
      esModule: true,
      resolveStyle: (name) => {
        return `element-plus/lib/theme-chalk/${name}.css`
      },
    },
  ],
})
```

如何配置库的全局选项：main.js 中配置

```js
const app = createApp(App)
app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 } // 在 app 创建之前挂载之后设置
app.mount('#vue-app')
```

> 注意

`自动生成 component.d.ts 必须在 tsconfig.json 的 include 中添加 component.d.ts, 编辑器不再飘红和并且提示 props`

> element-plus 提示找不到样式，安装`^1.0.2-beta.71`解决。

## 自动引入 vue、vue-router 等库的 hook

`npm i -D unplugin-auto-import`

配置

```js
import AutoImportHook from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImportHook({
      imports: ['vue'],
    }),
  ],
})
```

不再需要手动导入如下的函数：

```js
import { ref, onMounted } from 'vue' // 少写很多代码，太棒了 😎
```

> 注意：需要把自动生成的声明文件`auto-imports.d.ts` 纳入 ts 编译文件中，否则提示 ref onMounted 等函
> 数 any 类型。

> 自动导入后 eslint 检测到变量未定义，如何跳过呢？

> 目前没找到自动化的办法，只能手动添加 eslint 全局变量。

```js
globals: {
    // 用到的全局变量，eslint 会跳过检查
    // 常用的 vue 和 vue-router
    defineProps: true,
    defineEmits: true,
    ref: true,
    shallowRef: true,
    onMounted: true,
    watch: true,
    computed: true,
    createApp: true,
    customRef: true,
    defineAsyncComponent: true,
    defineComponent: true,
    effectScope: true,
    EffectScope: true,
    getCurrentInstance: true,
    getCurrentScope: true,
    isReadonly: true,
    isRef: true,
    markRaw: true,
    nextTick: true,
    onActivated: true,
    onBeforeMount: true,
    onBeforeUnmount: true,
    onBeforeUpdate: true,
    onDeactivated: true,
    onErrorCaptured: true,
    onMounted: true,
    onRenderTracked: true,
    onRenderTriggered: true,
    onScopeDispose: true,
    onServerPrefetch: true,
    onUnmounted: true,
    onUpdated: true,
    resolveComponent: true,
    shallowReactive: true,
    shallowReadonly: true,
    toRaw: true,
    toRefs: true,
    toRef: true,
    triggerRef: true,
    unref: true,
    h: true,
    inject: true,
    provide: true,
    reactive: true,
    readonly: true,
    useAttrs: true,
    useCssModule: true,
    useRoute: true,
    useRouter: true,
    useSlots: true,
    watchEffect: true,
  }
```

[更多讨论](https://github.com/antfu/unplugin-auto-import/issues/3)

[更多配置](https://github.com/antfu/unplugin-auto-import)

## 修改打包输出目录

```js
{
  build: {
    outDir:'path', // 打包输出目录 默认 dist
    rollupOptions: {
      output: {
        // 输出产物
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
   },
  // base: '/' // 本地开发服务器静态资源目录 一般不需要修改 默认 /
}
```

### 参考

[尤大推荐的神器 unplugin-vue-components, 解放双手！以后再也不用呆呆的手动引入 (组件，ui (Element-ui) 库，vue hooks 等)](https://juejin.cn/post/7012446423367024676)
