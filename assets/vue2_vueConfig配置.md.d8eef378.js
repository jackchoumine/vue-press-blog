import{_ as s,o as a,c as n,R as l}from"./chunks/framework.bf742a9e.js";const u=JSON.parse('{"title":"vue2-demos","description":"","frontmatter":{},"headers":[],"relativePath":"vue2/vueConfig配置.md","filePath":"vue2/vueConfig配置.md"}'),e={name:"vue2/vueConfig配置.md"},p=l(`<h1 id="vue2-demos" tabindex="-1">vue2-demos <a class="header-anchor" href="#vue2-demos" aria-label="Permalink to &quot;vue2-demos&quot;">​</a></h1><h2 id="project-setup" tabindex="-1">Project setup <a class="header-anchor" href="#project-setup" aria-label="Permalink to &quot;Project setup&quot;">​</a></h2><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm install</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="compiles-and-hot-reloads-for-development" tabindex="-1">Compiles and hot-reloads for development <a class="header-anchor" href="#compiles-and-hot-reloads-for-development" aria-label="Permalink to &quot;Compiles and hot-reloads for development&quot;">​</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm run serve</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="compiles-and-minifies-for-production" tabindex="-1">Compiles and minifies for production <a class="header-anchor" href="#compiles-and-minifies-for-production" aria-label="Permalink to &quot;Compiles and minifies for production&quot;">​</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm run build</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="lints-and-fixes-files" tabindex="-1">Lints and fixes files <a class="header-anchor" href="#lints-and-fixes-files" aria-label="Permalink to &quot;Lints and fixes files&quot;">​</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm run lint</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="customize-configuration" tabindex="-1">Customize configuration <a class="header-anchor" href="#customize-configuration" aria-label="Permalink to &quot;Customize configuration&quot;">​</a></h3><p>See <a href="https://cli.vuejs.org/config/" target="_blank" rel="noreferrer">Configuration Reference</a>.</p><h2 id="学习记录" tabindex="-1">学习记录 <a class="header-anchor" href="#学习记录" aria-label="Permalink to &quot;学习记录&quot;">​</a></h2><blockquote><p>运行环境</p></blockquote><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">node v14</span><span style="color:#89DDFF;">.</span><span style="color:#F78C6C;">15.4</span></span>
<span class="line"><span style="color:#A6ACCD;">npm v6</span><span style="color:#89DDFF;">.</span><span style="color:#F78C6C;">14</span></span>
<span class="line"><span style="color:#A6ACCD;">vue</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">cli </span><span style="color:#F78C6C;">4.5</span><span style="color:#89DDFF;">.</span><span style="color:#F78C6C;">11</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="vue-config-js-配置" tabindex="-1">vue.config.js 配置 <a class="header-anchor" href="#vue-config-js-配置" aria-label="Permalink to &quot;vue.config.js 配置&quot;">​</a></h3><ol><li>提供参数提示</li></ol><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">typedef</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;"> import(&quot;@vue/cli-service&quot;).ProjectOptions </span><span style="color:#89DDFF;font-style:italic;">}</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#FFCB6B;font-style:italic;">Options</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * 其它代码</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/** </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">type</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;">Options</span><span style="color:#89DDFF;font-style:italic;">}</span><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><ol start="2"><li>配置别名和扩展名</li></ol><p><code>resolve</code>函数：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> path </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">path</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> resolve </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">dir</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(__dirname</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> dir)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>第一种方式：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">chainWebpack</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">config</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">config</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">resolve</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">alias</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">src/</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@com</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">src/components</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">views</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">src/views</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">config</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">resolve</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">extensions</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>第二种方式：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">configureWebpack</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">resolve</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">extensions</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">alias</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">: </span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">src/</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@com</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">: </span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">src/components</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#FFCB6B;">views</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">src/views</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">},</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><blockquote><p>参考</p></blockquote><p><a href="https://blog.csdn.net/muzidigbig/article/details/115665717#:~:text=vue.config.js%20%28%E7%9B%B8%E5%BD%93%E4%BA%8E%E4%B9%8B%E5%89%8D%E7%9A%84webpack.config.js%29%20%E6%98%AF%E4%B8%80%E4%B8%AA%E5%8F%AF%E9%80%89%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%EF%BC%8C%E5%A6%82%E6%9E%9C%E9%A1%B9%E7%9B%AE%E7%9A%84%20%28%E5%92%8C%20package.json%20%E5%90%8C%E7%BA%A7%E7%9A%84%29%20%E6%A0%B9%E7%9B%AE%E5%BD%95%E4%B8%AD%E5%AD%98%E5%9C%A8%E8%BF%99%E4%B8%AA%E6%96%87%E4%BB%B6%EF%BC%8C%E9%82%A3%E4%B9%88%E5%AE%83%E4%BC%9A%E8%A2%AB%20%40vue%2Fcli-service,%E8%87%AA%E5%8A%A8%E5%8A%A0%E8%BD%BD%E3%80%82%20%E4%BD%A0%E4%B9%9F%E5%8F%AF%E4%BB%A5%E4%BD%BF%E7%94%A8%20package.json%20%E4%B8%AD%E7%9A%84%20vue%20%E5%AD%97%E6%AE%B5%EF%BC%8C%E4%BD%86%E6%98%AF%E6%B3%A8%E6%84%8F%E8%BF%99%E7%A7%8D%E5%86%99%E6%B3%95%E9%9C%80%E8%A6%81%E4%BD%A0%E4%B8%A5%E6%A0%BC%E9%81%B5%E7%85%A7%20JSON%20%E7%9A%84%E6%A0%BC%E5%BC%8F%E6%9D%A5%E5%86%99%E3%80%82" target="_blank" rel="noreferrer">vue.config.js 配置</a></p><p><a href="https://blog.csdn.net/weixin_41192489/article/details/112635196" target="_blank" rel="noreferrer">vue 配置【详解】 vue.config.js （ 含 webpack 配置 ）</a></p><p><a href="https://blog.csdn.net/weixin_45256858/article/details/107733151" target="_blank" rel="noreferrer">vue alias 别名配置</a></p><p><a href="https://blog.csdn.net/zhangyizuishuai/article/details/109537305" target="_blank" rel="noreferrer">vue.config.js 配置路径别名等</a></p><p><a href="https://staven630.github.io/vue-cli4-config/" target="_blank" rel="noreferrer">vue-cli4 全面配置(持续更新)</a></p><ol start="3"><li>配置 less</li></ol><p>感觉 scss 的语法更加接近 css，更喜欢用 scss,奈何配置一直不成功，只能转到 less 了。</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">&quot;less&quot;</span><span style="color:#82AAFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">^4.1.1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">,</span></span>
<span class="line"><span style="color:#FFCB6B;">&quot;less-loader&quot;</span><span style="color:#82AAFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">^5.0.0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">,</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><blockquote><p>less-loader 版本过高，可能报错：<code>TypeError: this.getOptions is not a function</code>，降低版本试试。最后降到<code>5.0.0</code>，可行。</p></blockquote><p>其他 less 配置，后续再配置。</p>`,35),o=[p];function t(r,c,i,F,y,D){return a(),n("div",null,o)}const C=s(e,[["render",t]]);export{u as __pageData,C as default};
