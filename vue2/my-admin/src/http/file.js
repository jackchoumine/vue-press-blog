/*
 * @Description:
 * @Date: 2021-07-05 21:54:17 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-05 21:55:37 +0800
 * @LastEditors: JackChou
 */
const that = this
const params = {
  taskId: that.fieId
}
const xhr = new XMLHttpRequest()
xhr.open('POST', '/ids/fap/session/pcap-export-download', true)
xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
xhr.responseType = 'blob'
xhr.onload = function (e) {
  if (this.status === 200) {
    const blob = this.response
    const a = document.createElement('a')
    const url = window.URL.createObjectURL(blob)
    a.href = url
    // 获取后端文件名称
    const fileName = decodeURI(xhr.getResponseHeader('content-disposition'))
    console.log(fileName) // attachment;filename=日志文件20201211092152.zip
    // 截取=字符串后面的内容
    const str = fileName.match(/=(\S*)/)[1]
    console.log(str)
    a.download = str
    a.click()
    window.URL.revokeObjectURL(url)
  }
}
// 参数是json格式
xhr.send(JSON.stringify(params))

// form data
const form = document.createElement('form')
form.style.display = 'none'
form.action = '/hmonitor-web/warn/event/export'
form.method = 'post'
document.body.appendChild(form)
// that.queryForm 参数
// @ts-ignore
const objs = that.$.extend(true, {}, that.queryForm)
delete objs.currentPage
delete objs.pageSize
for (const key in objs) {
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = key
  input.value = objs[key]
  form.appendChild(input)
}
form.submit()
form.remove()

// get
// window.location.href = ‘./download’ + “?remote=” +this.remote;
