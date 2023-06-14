# 常用的 tailwind 类

按照属性对元素的影响，将 css 属性分类别来学习，这些属性的顺序也常常是 css 书写顺序，`按照这种属性`书写，更容易维护，常见的编码规范都大致按照这个顺序。

`布局`、`定位`、`尺寸`、`文本样式`、`背景`、`轮廓和阴影`、`动画`、`其他（伪元素、伪类等）`，类名也按照这个顺序写，方便维护。

## 布局

### display

| 类名         | 属性值       |
| ------------ | ------------ |
| block        | block        |
| hidden       | none         |
| inline       | inline       |
| inline-block | inline-block |
| flex         | flex         |
| grid         | grid         |
| table        | table        |

常用的值，就是这些。none 对应 hidden，display 值和类名一致。

### flex 是布局重点

容器属性

`flex-direction`、`flex-wrap`、`flex-flow`、`justify-content`、`align-items`、`align-content`

主轴方向`flex-direction`：

| 类名             | 属性值         |
| ---------------- | -------------- |
| flex-row         | row            |
| flex-row-reverse | row-reverse    |
| flex-col         | column         |
| flex-col-reverse | column-reverse |

主轴是否换行`flex-wrap`：

| 类名              | 属性值       | 说明       |
| ----------------- | ------------ | ---------- |
| flex-nowrap       | nowrap       |            |
| flex-wrap         | wrap         |            |
| flex-wrap-reverse | wrap-reverse | 换行后反转 |

主轴对齐`justify-content`：

| 类名            | 属性值        | 说明                 |
| --------------- | ------------- | -------------------- |
| justify-start   | flex-start    |                      |
| justify-center  | center        |                      |
| justify-end     | flex-end      |                      |
| justify-between | space-between | 空间平分在 item 之间 |
| justify-around  | space-around  | 空间环绕             |
| justify-evenly  | space-evenly  | 前两种的结合         |

交叉轴对齐`align-items`：

| 类名           | 属性值     | 说明 |
| -------------- | ---------- | ---- |
| items-start    | flex-start |      |
| items-center   | center     |      |
| items-end      | flex-end   |      |
| items-baseline | baseline   |      |
| items-stretch  | stretch    |      |

交叉轴的空间分配`align-content`，即元素有多行的时候：

| 类名            | 属性值        | 说明 |
| --------------- | ------------- | ---- |
| content-start   | flex-start    |      |
| content-center  | center        |      |
| content-end     | flex-end      |      |
| content-between | space-between |      |
| content-around  | around        |      |
| content-evenly  | space-evenly  |      |

项目属性

`order`、`flex`、`flex-grow`、`flex-shrink`、`flex-basis`、`align-self`

### 更多阅读

[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## 定位

## 尺寸

## 文本样式

## 背景

## 轮廓和阴影

## 动画

## 其他
