import { createContext } from './createContext'

const [modalProvider, useContext] = createContext('modal')

export const Modal = defineComponent({
  name: 'MyModal',
  setup(props, { slots }) {
    const id = 'id' + Math.random().toString(16).slice(2)
    modalProvider(computed(() => ({ headerId: 'hello' + id })))
    return () =>
      h(
        'div',
        {
          id,
        },
        slots
      )
  },
})

export const ModalHeader = defineComponent({
  name: 'ModalHeader',
  setup(props, { slots }) {
    // @ts-ignore
    const { headerId } = unref(useContext())
    return () =>
      h(
        'div',
        {
          id: headerId,
        },
        slots
      )
  },
})
