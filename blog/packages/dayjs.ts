/*
 * @Description: dayjs 使用
 * @Date: 2021-06-28 21:02:27 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-28 21:03:03 +0800
 * @LastEditors: JackChou
 */
import dayjs from 'dayjs'
console.log(typeof dayjs())
console.log(dayjs().format('YYYY-MM-DD'))
console.log(dayjs('2020-04-19').format('YYYY-MM-DD HH:mm:ss'))
console.log(dayjs(new Date(2020, 3, 19)).format('YYYY-MM-DD HH:mm:ss'))
// 13位数字，毫秒
console.log(dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'))
// 10位数字，秒
console.log(dayjs(9234_5678_90).format('YYYY-MM-DD HH:mm:ss'))
// 自定义格式
const date = dayjs('01-29-2000', 'MM-DD-YYYY')
console.log(date.format('YYYY-MM-DD HH:mm:ss'))
// 传入 dayjs 对象
console.log(dayjs(date).format('YYYY-MM-DD HH:mm:ss'))
// dayjs 是不可变对象，需要一个对象的拷贝，使用 clone
console.log(dayjs(date).format('YYYY-MM-DD HH:mm:ss'))

// 判断是否为Dayjs
console.log('判断是否为Dayjs')
console.log(dayjs('').isValid())
console.log(dayjs.isDayjs(dayjs())) // true
console.log(dayjs.isDayjs(new Date())) // false
console.log('*********')
// 获取 设置
console.log(dayjs().year())
console.log(dayjs().get('y'))
console.log(dayjs().year(3000).format('YYYY-MM-DD HH:mm:ss'))
console.log(dayjs().set('month', 5).format('YYYY-MM-DD'))
// 0 开始
console.log(dayjs().month())
console.log(dayjs().month(5))

// NOTE 增加减少运算
// 当前月的开始时间加一天减4年
console.log(dayjs().startOf('month').add(1, 'day').subtract(4, 'year').format('YYYY-MM-DD'))
// 开始时间
// startOf(unit:string)
// https://day.js.org/docs/zh-CN/manipulate/start-of
console.log(dayjs().startOf('week').format('YYYY-MM-DD'))
// 结束时间
console.log(dayjs().endOf('week').format('YYYY-MM-DD'))

// NOTE 时间差
console.log('时间差')
const date1 = dayjs('2019-01-25')
const date2 = dayjs('2018-06-05')
console.log(date1.diff(date2)) // 20214000000
console.log(date1.diff(date2, 'month')) // 7
console.log(date1.diff(date2, 'month', true)) // 7.645161290322581
console.log(date1.diff(date2, 'day')) // 233∑
// NOTE 时间早晚
console.log(date1.isBefore(date2))
console.log(date1.isAfter(date2))
console.log(dayjs().isSame(dayjs()))
// NOTE 格式化
console.log('格式化')
console.log(dayjs().valueOf()) // 时间戳 毫秒
// console.log(dayjs().format(String))
// https://day.js.org/docs/zh-CN/display/format
console.log(dayjs('2019-01-25').format('[YYYY] YYYY-MM-DDTHH:mm:ssZ[Z]')) // 'YYYY 2019-01-25T00:00:00-02:00Z'
console.log(dayjs().format('{YYYY} MM-DDTHH:mm:ssZ[Z]')) // "{2014} 09-08T08:02:17-05:00Z"

// 插件使用
// https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md
// 文档
// https://day.js.org/docs/zh-CN/installation/browser
