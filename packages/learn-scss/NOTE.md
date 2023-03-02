# 学习 scss

css 在设计之初，没有考虑可编程性，然而随着 web 应用越来越复杂，大量的 css 文件变得难以维护、可读性也差了，为了解决这些问题，社区出现一些 css 预处理器（css Preprocessor），能把预处理器支持的语法转为 css 语法，这和 js 不支持类型系统，出现 ts 非常相似----当某种语言不支持一些高级特性时，会出现能编程该语言的高级语言。

本文介绍几点：

- 有哪些 css 预处理器？
- scss 简介
- 在 vs code 编译 scss
- scss 常用特性实践

## 有那些预处理器

CSS 预处理器是一个能让你通过预处理器自己独有的语法来生成 CSS 的程序。

- [scss](https://sass-lang.com/)： 2007 年诞生，也是目前最成熟、最浏览的预处理器，拥有庞大的 Ruby 社区支持。受到 less 影响，从 sass 缩进式的语法转为支持大括号嵌套的 scss 语法。
- [less](http://lesscss.org/)：2009 年诞生，受到 sass 影响，又支持 css 语法，社区支持也很完善，可编程能力没有 scss 大。
- [stylus](http://stylus-lang.com/)：2009 年诞生，来自 node 社区，给 node 项目进行 css 预处理支持。

## scss 简介

scss 诞生在 2007 年，是最早的预处理器，然后受到 less 影响，名字从 sass 改为 scss。

sass 使用 ruby 语言编写，配合 HAML (一种缩进语法的 HTML)，sass 也采用缩进的语法规则(_以缩进表示选择器层次结构_)，不支持分号，比如：

```scss
$font-stack:    Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color
```

后来出现 less，支持 css 语法，所以 sass 也采用类似的语法：**大括号表示层次结构、采用分号**，这是 scss 的由来。

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

它们经过预处理器处理，最后得到 CSS:

```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```

SCSS 支持`变量`、`运算`、`混入（mixins）`、`嵌套（nest）`、`模块`的特性。

## 在 vs 实时编译 scss

使用`Live Sass Compiler`和`live server` 扩展，能实时编译 scss 变看到效果:

- 安装扩展
- 编写 scss 文件，和一个 html 文件，
- 在 html 种引入同名的 css 文件，比如 `index.scss`，在 html 引入的 css 为`index.css`
- 环境准备好后，点击 vs code 状态栏的`Watch Sass`，就会监听 scss 文件，并实时编译，并启动一个本地服务并显示端口号，点击右侧`Go live`或者手动输入本地地址，即可看到效果。

会编程成同名的 CSS 文件和一个 source map，类似 js 的 source map，调试用的，先不必关心。

## SCSS 实践

搭建上面的编译环境，我们创建一个项目来学习 SCSS 语法：

```js
├── README.md
├── index.html
└── scss
    └── index.scss
```

在 scss 文件中写入语法：

```scss
body {
  background-color: wheat;
  h1 {
    color: red;
  }
}
```

在 html 种引入同名的 CSS：

```html
<link rel="stylesheet" href="./scss/index.css" />
```

点击 Watch Sass ，会得到同名的 css 文件，浏览器自动打开 html，此时即可以编写 SCSS，实时看到效果了。

### 嵌套

css 使用 `selector1 selector2 selector3` 的形式来定位具体的元素，但是这样容易重复写选择器，阅读性也不好，SCSS 采用大括号嵌套的方式表示层次关系。

```scss
body {
  background-color: wheat;
  h1 {
    color: red; /*scss 注释和 css 一样*/
  }
  article {
    background-color: green;
    #p {
      color: white;
    }
  }
  footer.footer {
    background-color: red;
    color: black;
  }
}
```

编译成 CSS：

```css
body {
  background-color: wheat;
}

body h1 {
  color: red;
}

body article {
  background-color: green;
}

body article #p {
  color: white;
}

body footer.footer {
  background-color: red;
  color: black;
}
/*# sourceMappingURL=index.css.map */
```

### 后代选择器 --- 父级选择器放在子级选择器前面，里面规则不变

但是有时候带有伪类时，上面的规则却不行了，比如 a 的 hover 的样式，`:hover` 不能作为后代选择器。

```scss
article a {
  color: blue;
  :hover {
    color: red;
  }
}
```

该嵌套会变成后代选择器`article a :hover`， 而不是 `article a:hover`。

### `&` 指代父级选择器，可出现在任何父级选择器出现的地方

希望给链接添加 `hover`样式：

```scss
article a {
  color: blue;
  &:hover {
    color: red;
  }
}
```

编译成：

```css
body article a {
  color: blue;
}

body article a:hover {
  color: red;
}
```

父级选择器的另一种用法：在父级选择器之前添加选择器。

```scss
#content aside {
  color: red;
  body.ie & {
    color: green;
  }
}
```

会编译成：

```css
#content aside {
  color: red;
}
body.ie #content aside {
  color: green;
}
```

### 组选择器

以逗号分割的选择器叫**组选择器**，比如

```css
h1,
h2,
h3 {
  margin: 0;
}
```

组选择器的样式会应用到每个选择器上。

SCSS 可这样写：

```scss
h1,
h2,
h3 {
  margin: 0;
}
```

但是当组选择器的元素是一个后代选中器，CSS 需要**重复写选择器**：

```css
.container h1,
.container h2,
.container h3 {
  margin: 0;
}
```

SCSS 不必重复写，在具有共同的父选择器的前面嵌套父选择器就好：

```scss
.container {
  h1,
  h2,
  h3 {
    margin: 0;
  }
}
```

### `+`、`~` 兄弟选择器，`>` 子元素

```html
<h2>学习嵌套</h2>
<p>h2的兄弟选择器</p>
<p>h2的兄弟选择器2</p>
```

想要选择 h2 后面第一个 p，css 选择器`h2 + p`，第二个 p 不会被选中。SCSS 也支持这样的选择器。
想要选择**所有兄弟**呢：`h1 ~ p`。

```html
<article id="content">
  <h2>学习嵌套</h2>
  <p>h2的兄弟选择器</p>
  <p>h2的兄弟选择器2</p>
  <h3>练习scss</h3>
  <p id="p">这是段落</p>
  <a href="http://jackchoumine.github.io" target="_blank" rel="noopener noreferrer"> jackchoumine的博客 </a>
</article>
```

想要选中 article 的所有 p，`article > p`。

```scss
& > p {
  font-size: 30px;
}
```

### 属性嵌套

嵌套属性的规则是这样的：把属性名从中划线 - 的地方断开，在根属性后边添加一个冒号:，紧跟一个 { } 块，把子属性部分写在这个 { } 块中。
比如：

```scss
border: {
  style: solid;
  width: 2px;
  color: red;
}
```

会被编译成：

```css
 {
  border-style: solid;
  border-width: 2px;
  border-color: red;
}
```

还可指定例外规则：

```scss
 {
  border: 4px solid red {
    top: dotted;
    bottom: none;
  }
}
```

被编译成：

```css
 {
  border: 4px solid red;
  border-top: dotted;
  border-bottom: none;
}
```

SCSS `嵌套选择器` 可简化`后代选择器`、`组选择器`、`兄弟选择器`、`子元素选择器`、`& 指向父选择器`，这些选择器结合 CSS 属性选择器，可写出阅读性、可维护性高的选择器。

还可嵌套样式属性 --- `属性嵌套`。

## scss 引入变量一大特性

变量以`$`开头，`:` 后跟着变量值和分号。

比如：`$font-size:30px;`，或者 `$fontSize: 10px;`，虽然变量命名规则没有指定，最佳实践是使用`-`命名方式，力求和属性明一致，更加可读。

注意：

> 变量未声明就使用会报错。_重复声明不会报错，前者被后者覆盖_。
> 重复声明可能会出现错误但是难以定位，最佳实践是只在一个文件里声明用到的变量，然后引入该文件。
> 可在 scss 顶部声明变量，也可在`{}` 内声明，但是作用范围被限定在该大括号内部了。_强烈不建议这样声明变量_

还可对变量进行四则运算。

加法：对于不同类型的单位，计算会报错；

减法：对于不同类型的单位，计算会报错；

乘法：对于不同类型的单位，计算会报错；多个值单位相同时，只需要为一个值提供单位即可。

除法：

1.  如果数值或它的任意部分是存储在一个变量中或是函数的返回值。
2.  如果数值被小括号包围。
3.  如果数值是数学表达式的一部分。

```scss
 {
  font-size: $font-size;
  $border-with: 4px; /*可在规则里声明变量，作用域只限定在该{}内*/
  border: $border-with solid red {
    top: ($border-with + 6) dotted;
    bottom: none;
  }
}
```

颜色值运算：颜色运算，所有算数运算都支持颜色运算，它所采用的是分段运算。
强烈不推荐进行颜色值计算，除非在函数中，因为可读性差。

字符运算：scss 中使用加号 + 进行字符拼接，可在变量中使用也可直接连接字符。

变量使用最佳实践：

1. 只一个文件声明变量。
2. 不要对变量进行过多计算。
3. css 属性只可作为变量值。
4. 命名采用中划线。

## 导入

CSS 可使用`@import`导入其他 CSS 文件，但是只有浏览器执行到该语句时才去加载文件，会导致页面加载慢。

SCSS 也又用该语法导入文件，但是会在生成 CSS 时把文件导入，不需要额外的请求。可引用被导入文件中的变量。

导入文件可不写文件扩展名。

`variable.scss`：

```scss
$font-size: 30px;
$background-color: wheat;
$green-color: green;
```

引入其他文件

```scss
@import './variable';
body {
  background-color: $background-color;
}
```

## 局部导入

上面导入的文件，也会编程成 CSS 文件，但是其实变量已经在另外一个文件了，我们并不想在生成一个文件，可使用**局部导入**：在文件名前面加`_`即为`_variable.scss`，导入是使用`@import ./variable` 或者 `@import ./_variable`都可。

局部文件可以被多个不同的文件引用。当一些样式需要在多个页面甚至多个项目中使用时，这非常有用。在这种情况下，有时需要在你的样式表中对导入的样式稍作修改，sass 有一个功能刚好可以解决这个问题，即默认变量值。

### 设置默认值

`!default`:如果变量已经声明被赋值，使用声明的值，否则使用该值。

```scss
@import './variable';
$background-color: white !default; /* 在被导入文件中已经声明，就是已经声明的，否则使用这个变量*/
$link-color: blue; /*没有 !defalut 导入文件的同名变量被覆盖*/
```

### 规则内导入

可在`{}`导入，在规则内写文件内容一致，只是局部生效。这些变量和混合器不会全局有效，这样我们就可以通过嵌套导入只对站点中某一特定区域运用某种颜色主题或其他通过变量配置的样式。

// TODO 规则类导入并不生效

### 导入 CSS

因为 SCSS 兼容 CSS,在导入 CSS 是，把文件改成`.scss`可避免额外的请求。
但是以下请求会发起额外请求：

1. 导入`.css`文件。
2. 被导入文件的名字是一个 URL 地址。
3. 被导入文件的名字是 CSS 的 url () 值。

### 注释

必要的注释可提高代码可读性。
SCSS 兼容 CSS 的注释，`/* */`，
但是有时候不想编译后的代码里有注释，SCSS 提供了`//` 注释方式。

```scss
article a {
  color/*编译后抹掉*/: $link-color; // 编译后抹掉
  &:hover {
    color: red; /*编译后保留*/
  }
}
```

## 参考

[2019 年，你是否可以抛弃 CSS 预处理器？](https://aotu.io/notes/2019/10/29/css-preprocessor/index.html)

[scss 快速入门](https://www.sass.hk/guide/)

[Sass/SCSS 基本语法介绍，搞懂 CSS 预处理器](https://tw.alphacamp.co/blog/css-preprocessor-sass-scss)
