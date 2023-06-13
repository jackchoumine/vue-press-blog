# js 技巧

## 一行代码

1. 判断浏览器 tab 是否为活动窗口 `document.hidden`

```js
const isActiveView = () => !document.hidden;
```

`document.hidden` 将来可能被移出，使用最新的标准：

```js
const isActiveTab = () => document.visibilityState === 'visible';
document.addEventListener(
	'visibilitychange',
	(event) => {
		console.log(event);
		console.log(document.visibilityState);
	},
	false
);
```

[详细信息](https://www.w3.org/TR/page-visibility/#idl-def-document-visibilitystate)

2. 获取当前时间

`new Date().toTimeString()` 返回带时区的时间

`new Date().toTimeString().slice(0,8)` 返回时间

3. 判断 DOM 元素是否已获得焦点

```js
const elementIsInFocus = (el) => el === document.activeElement;
elementIsInFocus(anyElement);
```

4. 是否支持 touch 事件

```js
const touchSupported = () => {
	'ontouchstart' in window ||
		(window.DocumentTouch && document instanceof window.DocumentTouch);
};
console.log(touchSupported());
```

5. 判断 apple 设备

```js
const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
console.log(isAppleDevice);
```

6. 页面滚动到顶部

```js
const goToTop = () => window.scrollTo(0, 0);
goToTop();
```

```js
window.scrollTo({
	top: 0,
	left: 0,
	behavior: 'smooth',
});
```

window.scrollTo() 方法接受 x 和 y 坐标参数，用于指定滚动目标位置。全都设置为 0，可以回到页面顶部。

思考：如何滚动到指定的元素？使用场景，滚动到表单验证不通过的元素上。

```js
ele.scrollIntoView({
	behavior: 'smooth',
	block: 'nearest',
});
```

7. 生成随机字符串

场景：希望改变 vue 组件的 key，让元素重新渲染。

```js
const randomStr = Math.random().toString(36); // toString 的参数是一个数字，表示进制 2-36
```

> 为何使用 36，因为 10 个数字何 26 个小写字母的和刚好为 36。

> 不想含有数字，如何实现？

```js
const randomStr = Math.random().toString(36).slice(2);
```

> 想要包含大写字母，如何实现？ 不能实现。
