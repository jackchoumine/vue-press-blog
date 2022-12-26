import { Ref } from 'vue'

// Raw value or a ref
export type MaybeRef<T> = Ref<T> | T
// Can't be a raw value
export type LazyOrRef<T> = Ref<T> | (() => T)

// Can be a ref, a getter, or a raw value
export type MaybeLazyRef<T> = MaybeRef<T> | (() => T)
