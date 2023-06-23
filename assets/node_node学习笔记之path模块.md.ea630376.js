import{_ as s,o as a,c as n,R as l}from"./chunks/framework.bf742a9e.js";const A=JSON.parse('{"title":"node 学习笔记 --- path 模块","description":"","frontmatter":{},"headers":[],"relativePath":"node/node学习笔记之path模块.md","filePath":"node/node学习笔记之path模块.md"}'),t={name:"node/node学习笔记之path模块.md"},e=l(`<h1 id="node-学习笔记-path-模块" tabindex="-1">node 学习笔记 --- path 模块 <a class="header-anchor" href="#node-学习笔记-path-模块" aria-label="Permalink to &quot;node 学习笔记 --- path 模块&quot;">​</a></h1><p>path 路径提供了操作文件目录的工具。</p><h2 id="常用方法" tabindex="-1">常用方法 <a class="header-anchor" href="#常用方法" aria-label="Permalink to &quot;常用方法&quot;">​</a></h2><table><thead><tr><th style="text-align:center;">方法</th><th style="text-align:left;">参数说明</th><th style="text-align:left;">返回值</th><th style="text-align:left;">功能</th></tr></thead><tbody><tr><td style="text-align:center;">join([...paths])</td><td style="text-align:left;">一系列字符路径字符串</td><td style="text-align:left;">根据平台连接路径</td><td style="text-align:left;">连接路径，得到一个相对路径或者绝对路径。上级目录：<code>..</code>，当前目录：<code>.</code></td></tr><tr><td style="text-align:center;">resolve([...paths])</td><td style="text-align:left;">一系列路径</td><td style="text-align:left;">一个绝对路径字符串</td><td style="text-align:left;">从右边到左边解析参数，得到一个绝对路径</td></tr><tr><td style="text-align:center;">isAbsoulte(path)</td><td style="text-align:left;">字符串</td><td style="text-align:left;">boolean</td><td style="text-align:left;">判断路径是否为绝对路径</td></tr><tr><td style="text-align:center;">relative(from,to)</td><td style="text-align:left;">路径</td><td style="text-align:left;">路径</td><td style="text-align:left;"></td></tr><tr><td style="text-align:center;">normalize(path)</td><td style="text-align:left;">路径</td><td style="text-align:left;">路径</td><td style="text-align:left;">格式化有个路径，忽视<code>..</code>和<code>.</code></td></tr><tr><td style="text-align:center;">dirname(path)</td><td style="text-align:left;">string</td><td style="text-align:left;">路径</td><td style="text-align:left;"></td></tr><tr><td style="text-align:center;">basename(path[,.ext])</td><td style="text-align:left;">string</td><td style="text-align:left;">路径</td><td style="text-align:left;">获取路径的最后一部分</td></tr><tr><td style="text-align:center;">extname(path)</td><td style="text-align:left;">string</td><td style="text-align:left;">文件扩展名</td><td style="text-align:left;">获取文件扩展名，没有<code>.</code>或<code>..</code>在第一个，将返回<code>&#39;&#39;</code></td></tr><tr><td style="text-align:center;">parse(path)</td><td style="text-align:left;">string</td><td style="text-align:left;">object</td><td style="text-align:left;">把字符串路径解析成对象</td></tr><tr><td style="text-align:center;">format(pathObject)</td><td style="text-align:left;">object</td><td style="text-align:left;">string</td><td style="text-align:left;"></td></tr></tbody></table><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">basename</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/foo/bar/baz/asdf/quux.html</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)) </span><span style="color:#676E95;font-style:italic;">// quux.html</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">basename</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/foo/bar/baz/asdf/quux</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.html</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)) </span><span style="color:#676E95;font-style:italic;">// quux</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">dirname</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/foo/bar/baz/asdf/quux</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)) </span><span style="color:#676E95;font-style:italic;">// /foo/bar/baz/asdf</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">root</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/ignored</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 有 dir ,root 将被忽视</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">dir</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/home/user/dir</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">base</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">file.txt</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">///home/user/dir\\file.txt</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">parse</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/home/user/dir/file.txt</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">))</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/*{ root: &#39;/&#39;,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  dir: &#39;/home/user/dir&#39;,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  base: &#39;file.txt&#39;,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  ext: &#39;.txt&#39;,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  name: &#39;file&#39; }</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">parse</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">C:</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">path</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">dir</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">file.txt</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">))</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">{ root: &#39;C:\\\\&#39;,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  dir: &#39;C:\\\\path\\\\dir&#39;,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  base: &#39;file.txt&#39;,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  ext: &#39;.txt&#39;,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  name: &#39;file&#39; }</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">┌──────────────────-───┬────────────┐</span></span>
<span class="line"><span style="color:#FFCB6B;">│</span><span style="color:#A6ACCD;">          </span><span style="color:#C3E88D;">dir</span><span style="color:#A6ACCD;">       </span><span style="color:#C3E88D;">│</span><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">base</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">│</span></span>
<span class="line"><span style="color:#FFCB6B;">├──────┬</span><span style="color:#A6ACCD;">              </span><span style="color:#C3E88D;">├──────┬─────┤</span></span>
<span class="line"><span style="color:#FFCB6B;">│</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">root</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">│</span><span style="color:#A6ACCD;">             </span><span style="color:#C3E88D;">│</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">│</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ext</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">│</span></span>
<span class="line"><span style="color:#FFCB6B;">&quot;  /   home/user/dir / file  .txt &quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">└──────┴──────────────┴──────┴--─────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">┌──────────────────-───┬────────-────┐</span></span>
<span class="line"><span style="color:#FFCB6B;">│</span><span style="color:#A6ACCD;">          </span><span style="color:#C3E88D;">dir</span><span style="color:#A6ACCD;">       </span><span style="color:#C3E88D;">│</span><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">base</span><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">│</span></span>
<span class="line"><span style="color:#FFCB6B;">├──────┬</span><span style="color:#A6ACCD;">              </span><span style="color:#C3E88D;">├──────┬──-───┤</span></span>
<span class="line"><span style="color:#FFCB6B;">│</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">root</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">│</span><span style="color:#A6ACCD;">              </span><span style="color:#C3E88D;">│</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">│</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ext</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">│</span></span>
<span class="line"><span style="color:#FFCB6B;">&quot; C:\\      path\\dir   \\ file  .txt &quot;</span></span>
<span class="line"><span style="color:#FFCB6B;">└──────┴────────────--──┴──────┴─-────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="常用属性" tabindex="-1">常用属性 <a class="header-anchor" href="#常用属性" aria-label="Permalink to &quot;常用属性&quot;">​</a></h2><table><thead><tr><th style="text-align:center;">属性</th><th style="text-align:left;">说明</th></tr></thead><tbody><tr><td style="text-align:center;">sep</td><td style="text-align:left;">平台文件分割符号</td></tr><tr><td style="text-align:center;">delimiter</td><td style="text-align:left;">路径分割符号</td></tr></tbody></table><h2 id="更多参考" tabindex="-1">更多参考 <a class="header-anchor" href="#更多参考" aria-label="Permalink to &quot;更多参考&quot;">​</a></h2><blockquote><ol><li><a href="https://nodejs.org/api/path.html" target="_blank" rel="noreferrer">Path | Node.js v11.3.0 Documentation</a></li></ol></blockquote>`,11),p=[e];function o(r,c,i,y,d,C){return a(),n("div",null,p)}const b=s(t,[["render",o]]);export{A as __pageData,b as default};
