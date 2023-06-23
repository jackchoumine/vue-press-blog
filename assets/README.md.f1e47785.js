import{_ as s,o as a,c as n,R as l}from"./chunks/framework.bf742a9e.js";const C=JSON.parse('{"title":"VuePress 搭建博客","description":"","frontmatter":{},"headers":[],"relativePath":"README.md","filePath":"README.md"}'),e={name:"README.md"},p=l(`<h1 id="vuepress-搭建博客" tabindex="-1">VuePress 搭建博客 <a class="header-anchor" href="#vuepress-搭建博客" aria-label="Permalink to &quot;VuePress 搭建博客&quot;">​</a></h1><h2 id="文章编辑" tabindex="-1">文章编辑 <a class="header-anchor" href="#文章编辑" aria-label="Permalink to &quot;文章编辑&quot;">​</a></h2><ol><li>自定义容器</li></ol><div class="language-md line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">::: tip 提醒</span></span>
<span class="line"><span style="color:#A6ACCD;">这里是 tip 容器</span></span>
<span class="line"><span style="color:#A6ACCD;">:::</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">::: warning 警告</span></span>
<span class="line"><span style="color:#A6ACCD;">这里是警告容器</span></span>
<span class="line"><span style="color:#A6ACCD;">:::</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">::: danger 危险</span></span>
<span class="line"><span style="color:#A6ACCD;">这里是危险容器</span></span>
<span class="line"><span style="color:#A6ACCD;">:::</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">::: details</span></span>
<span class="line"><span style="color:#A6ACCD;">This is a details block, which does not work in IE / Edge</span></span>
<span class="line"><span style="color:#A6ACCD;">:::</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><ol start="2"><li>添加代码复制按钮</li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-D</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@mr-hope/vuepress-plugin-copy-code</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>配置</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@mr-hope/copy-code</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;">]]</span><span style="color:#89DDFF;">,</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="3"><li>图片放大</li></ol><p>使用 <code>@vuepress/plugin-medium-zoom</code> 插件 没有生效，有空再看看其他方案。</p><blockquote><p>其他问题</p></blockquote><p>1 px 问题解决方案</p><p>transform</p><ol start="2"><li>useEffect</li></ol><p>执行 updated willUnmount 依赖传递情况</p><ol start="3"><li>Array.form vs new Array</li></ol><p>类数组你会怎么实现</p><p>new Array() vs new Array(undefined)</p><ol start="4"><li>await 解决什么问题</li></ol><p>依赖关系</p><ol start="6"><li><p>vNode 解决了什么问题</p></li><li><p>说说居中布局</p></li><li><p>说说你的印象最深刻的博客</p></li><li><p>symbol for</p></li><li><p>MongoDB update 时没有数据 结果如何</p></li></ol><h2 id="常用的表情和符号" tabindex="-1">常用的表情和符号 <a class="header-anchor" href="#常用的表情和符号" aria-label="Permalink to &quot;常用的表情和符号&quot;">​</a></h2><p>✅ 😎 🔴 ❌ 👌</p><p>① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨ ⑩ ⑪ ⑫ ⑬ ⑭ ⑮ ⑯ ⑰ ⑱ ⑲ ⑳</p>`,24),o=[p];function r(i,t,c,d,u,b){return a(),n("div",null,o)}const A=s(e,[["render",r]]);export{C as __pageData,A as default};
