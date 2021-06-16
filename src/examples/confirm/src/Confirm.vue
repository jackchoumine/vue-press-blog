<!--
 * @Description: 确认弹窗
 * @Date: 2021-06-03 14:49:13 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-03 17:41:02 +0800
 * @LastEditors: JackChou
-->
<template>
  <div v-if="show" ref="myModal" class="modal" @click="close">
    <div ref="myModalContent" class="modal-content">
      <div>{{ title }}</div>
      <slot name="default">
        <div>{{ content }}</div>
      </slot>
      <slot name="footer">
        <div class="footer">
          <el-button type="default" @click="hiddenModal">取消</el-button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Confirm',
  props: {
    title: {
      type: String,
      default: '确定操作吗？',
    },
    content: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    close(event) {
      const isContainsModalContent = this.$refs.myModalContent ? this.$refs.myModalContent.contains(event?.target) : ''
      if (!isContainsModalContent) {
        console.log('点击到了弹窗内容以外')
        // NOTE 点击到弹窗内容以外的区域，才关闭弹窗
        this.show = false
      }
    },
    hiddenModal() {
      this.show = false
    },
  },
}
</script>

<style lang="less">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99; // 确保弹窗在顶层
  width: 100%;
  height: 100%;
  background-color: #faebd799;
  &-content {
    position: relative;
    left: 50%;
    top: 50%;
    width: 20vw;
    height: 200px;
    z-index: 999; //
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // align-items: flex-end;
    background-color: #fff;
    .footer {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
