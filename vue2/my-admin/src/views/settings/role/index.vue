<!--
 * @Description: 角色管理
 * @Hash: /role
 * @Date: 2021-06-02 00:00:52 +0800
 * @Author: JackChou
 * @LastEditTime: 2022-10-11 01:16:02 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>role</div>
</template>

<script>
// import { MessageBox } from 'element-ui'

export default {
  name: 'RolePage',
  methods: {
    http() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ ok: true })
        }, 5000)
      })
    },
  },
  // async beforeRouteLeave(to, from, next) {
  //   const answer = window.confirm('Do you want submit form?')
  //   answer && (await this.http())
  //   // next()
  //   try {
  //     await MessageBox.confirm('确认操作吗', '提示', {
  //       confirmButtonText: '确定',
  //       cancelButtonText: '取消',
  //       type: 'warning',
  //     })
  //     const res = await this.http()
  //     console.log(res)
  //   } catch (error) {
  //   } finally {
  //     next()
  //   }
  // },
}
</script>

<style></style>
