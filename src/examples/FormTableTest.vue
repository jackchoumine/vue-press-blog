<!--
 * @Description: 测试组件
 * @Date: 2021-06-09 20:49:21 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-09 21:09:14 +0800
 * @LastEditors: JackChou
-->
<template>
  <div>
    <FormTable title="使用例子" :data="data" :titleList="titleList" />
    <FormTable title="使用例子2" :data="data" :titleList="titleList" :titleWidth="150" />
  </div>
</template>

<script>
export default {
  name: 'FormTableTest',
  data() {
    return {
      data: {
        name: 'LiHei',
        job: 'web dev',
        slary: '3000',
        address: '四川省成都市成华区十里店寺庙',
        education: '本科',
        isGood: 1,
      },
      titleList: [
        { title: '姓名', prop: 'name' },
        {
          title: '头像',
          // 自定义 title 属性值
          titleTips: data => {
            return (data.image && '生成图，点击放大') || '暂无头像'
          },
          prop: 'image',
        },
        {
          title: '职业',
          prop: 'job',
        },
        {
          title: '月薪',
          prop: (h, data) => {
            return <span>{data.slary + '$'}</span>
          },
          enableCopy: true, // 开启点击赋值内容
        },
        {
          title: '住址',
          prop: 'address',
          span: 2,
        },
        {
          title: '学历',
          prop: 'education',
          span: 1,
        },
        {
          title: '是否统招',
          prop: (h, data) => {
            const map = { 0: '否', 1: '是' }
            return <span>{map[data.isGood]}</span>
          },
          span: 2,
        },
      ],
    }
  },
}
</script>
