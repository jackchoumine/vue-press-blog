# scss 学习

## 后代选择器

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

> 知识点

## 嵌套规则

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

作用域：局部变量覆盖全局变量。
