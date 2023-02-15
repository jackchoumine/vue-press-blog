# scss 学习

## 嵌套规则

```css
.container {
  width: 100px;
}
.container a {
  color: red;
}
.container a:hover {
  text-decoration: underline;
  color: green;
}
.container .top {
  border-top: 1px red solid;
}
.container .top-left {
  border-left: 1px blue solid;
}
```

```scss
.container {
  width: 100px;
  a {
    color: red;
    &:hover {
      text-decoration: underline;
      color: green;
    }
  }
  .top {
    border-top: 1px red solid;
    &-left {
      border-left: 1px blue solid;
    }
  }
}
```

### 选择器嵌套

1. 选择器嵌套，形成后代选择器

2. `&` 获取父级选择器

3. 父级选择器可结合其他字符串，生成新的后代选择器

### 属性嵌套

```css
.container {
  width: 100px;
  color: yellow;
  font-size: 16px;
  font-weight: bold;
}
```

```scss
.container {
  color: yellow;
  // 需要`:`
  font: {
    size: 16px;
    weight: bold;
  }
}
```

### 占位符

`%placeholder` 和 `@extend` 一起使用。

```scss
.button%base {
  display: inline-block;
  margin: {
    top: 10px;
    right: 4px;
  }
  font: {
    size: 20px;
    weight: bold;
  }
}
.btn-primary {
  @extend %base;
  background-color: lightgreen;
  border: {
    color: green;
    style: solid;
    width: 2px;
  }
}
.btn-info {
  @extend %base;
  background-color: #f0f0f0;
  border: {
    color: lightblue;
    style: solid;
    width: 2px;
  }
}
```

编译结果：

```css
.button.btn-info,
.button.btn-primary {
  display: inline-block;
  margin-top: 10px;
  margin-right: 4px;
  font-size: 20px;
  font-weight: bold;
}

.btn-primary {
  background-color: lightgreen;
  border-color: green;
  border-style: solid;
  border-width: 2px;
}

.btn-info {
  background-color: #f0f0f0;
  border-color: lightblue;
  border-style: solid;
  border-width: 2px;
}
```

占位符常常用于提取几个类的共有的样式。

### 变量

css 的变量

```css
:root {
  --font-color: red;
}

body {
  color: var(--font-color);
}

.container {
  --font-color: green;
  color: var(--font-color);
}

.hello {
  --font-color: yellow;
  color: var(--font-color);
}
```

> 作用域：后代选择器里定义的变量覆盖父级的同名变量。

scss 的变量：使用`$`作为前缀。

```scss
$font-color: blue;
:root {
  $font-color: red;
}

body {
  color: $font-color;
}

.container {
  $font-color: green;
  color: $font-color;
}

.hello {
  color: $font-color;
}
```

> 作用域：局部变量覆盖全局变量

> 值有哪些类型：

1. 数字：`1`，`2`，`10px`

2. 字符串：`'foo'`

3. 颜色： rgb， hex 或者文字

4. 布尔值： true false

5. 空值：null

6. 数组（list)：`1px 20px` 是逗号或者空格作为分隔符

7. map：`(key1:value,key2:value2)`

```scss
$layer-index: 10;
$border-width: 10px;
$font-family: 'Open Sans';
$blank-mode: true;
$has-value: null;
$base-padding: 1px 2px 3px 4px;
$color-map: (
  color1: red,
  color2: green,
);

$font-color: red;

:root {
  $font-color: blue;
}

body {
  color: $font-color;
}

.container {
  $font-color: green;
  color: $font-color;
  z-index: $layer-index;
  @if $blank-mode {
    color: lightpink;
  } @else {
    color: $font-color;
  }
  &::after {
    display: inline-block;
    // content: length($base-padding);// 4
    // content: type-of($base-padding); // list
    content: type-of($value: $has-value);
    // content: 'hi';
    color: map-get($map: $color-map, $key: 'color1');
  }
}

.hello {
  color: $font-color;
  font-size: 60px;
}
```

变量默认值：

```scss
$border-width: 5px !default; // 如果变量已经定义，使用定义的值
// 未定义，是这个值
// NOTE 之一 default 前面的 !
```

## 导入

css 引入

```css
@import url(css-file-path-with-ex);
@import url(./var.css);
```

scss 引入

```scss
@import 'scss-file-path';
@import 'var.scss';
@import 'var';
```

哪些情况视为 css 导入：

1. 扩展名为`.css`

2. 路径以`http://`开头

3. 使用`url`语法

4. @import 包含媒体查询

```scss
@import 'var.css';
@import 'http://exmaple.com/css.css';
@import url('var.css');
@import 'landscape' screen and (orientation landscape);
```

> 如何让 scss 文件不编译产生`.css`文件

文件名称使用`_`开头。

局部文件不需要生产`.css`文件。

> 可在哪些位置导入？

文件头部、选择器内部。

```scss
body {
  @import 'var';
}
```

## 混入

混入（mixin）用于定义**可重复**使用的片段，混入指令包含所有 CSS 规则，绝大部分 SCSS 规则，支持传递参数和默认值。

```scss
body {
  @mixin block($top, $right, $bottom: 2px, $left: 5px) {
    width: 100px;
    height: 100px;
    border: {
      width: 10px;
      color: red;
      style: solid;
    }
    padding: {
      top: $top;
      right: $right;
      bottom: $bottom;
      left: $left;
    }
  }
  .container {
    @include block(10px, 0);
    color: lightgreen;
  }
}
```

编译输出：

```css
body .container {
  width: 100px;
  height: 100px;
  border-width: 10px;
  border-color: red;
  border-style: solid;
  padding-top: 10px;
  padding-right: 0;
  padding-bottom: 2px;
  padding-left: 5px;
  color: lightgreen;
}
```
