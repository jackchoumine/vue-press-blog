import type { Directive } from 'vue'

const clickOutside: Directive = {
  //   app.directive('clickOutside', {

  // created(el, binding) {
  //   console.log('created')
  //   console.log(el)
  //   console.log(binding)
  // },
  // beforeMount(el, binding) {
  //   console.log('beforeMount')
  //   console.log(el)
  //   console.log(binding)
  // },
  mounted(el, binding) {
    console.log('mounted')
    const { value, instance } = binding
    // NOTE 技巧：处理函数挂载在元素上，方便解绑时移出事件监听
    el.onClick = (event: Event) => {
      if (el.contains(event.target)) {
        console.log('clickInside')
      } else {
        // 点击外部
        console.log('clickOutside')
        console.log(instance)
        value && value()
      }
    }
    document.addEventListener('click', el.onClick, false)
  },
  // beforeUpdate(el, binding) {
  //   console.log('beforeUpdate')
  //   console.log(el)
  //   console.log(binding)
  // },
  // updated(el, binding) {
  //   console.log('updated')
  //   console.log(el)
  //   console.log(binding)
  // },
  beforeUnmount(el) {
    console.log('beforeUnmount')
    document.removeEventListener('click', el.onClick, false)
  },
  // unmounted(el, binding) {
  //   console.log('unmounted')
  //   console.log(el)
  //   console.log(binding)
  // }
  //   })

  //   return app
}

export default clickOutside
