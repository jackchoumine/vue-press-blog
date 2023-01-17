import { isRef, unref } from 'vue'

import { LazyOrRef, MaybeLazyRef } from '../hooks/types'

// https://logaretm.com/blog/juggling-refs-around
export function isWatchable<T>(value: MaybeLazyRef<T>): value is LazyOrRef<T> {
  return isRef(value) || typeof value === 'function'
}

export function unravel<T>(value: MaybeLazyRef<T>): T {
  if (typeof value === 'function') {
    // casting because there is  a typescript bug
    // https://github.com/microsoft/TypeScript/issues/37663
    return (value as () => T)()
  }

  return unref(value)
}
