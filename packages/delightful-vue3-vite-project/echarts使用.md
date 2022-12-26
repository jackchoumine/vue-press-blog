# echarts 使用

## 标线

在对应的 series 设置 markLine:

```js
const options = {
  series: [
    {
      name: 'Flow',
      type: 'line',
      markLine: {
        data: [
          { type: 'average', name: '平均值' },// 平均值标线
          {
            name: 'min line on close',
            type: 'min',
            valueDim: 'close',
            yAxis: 67, // 标记线x轴的值
          },
          {
            name: 'x轴标线',
            // type: 'max',
            // valueDim: 'close',
            xAxis: '2009/7/7\n6:00', // 第二条标记线x轴的值
          },
        ],
      },
      areaStyle: {},
      lineStyle: {
        width: 1,
      },
      emphasis: {
        focus: 'series',
      },
      markArea: {
        silent: true,
        itemStyle: {
          opacity: 0.3,
        },
        data: [
          [
            {
              xAxis: '2009/9/12\n7:00',
            },
            {
              xAxis: '2009/9/22\n7:00',
            },
          ],
        ],
      },
      data: [22, 1.22, 1.22],
    },
  ],
}
```

> 设置样式


