/*
 * @Description: 集合
 * @Date: 2021-06-08 00:30:27 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-08 01:46:04 +0800
 * @LastEditors: JackChou
 */
export class MySet {
  constructor() {
    this.obj = {}
  }

  add(value) {
    if (this.has(value)) return false
    else {
      this.obj[value] = value
      return true
    }
  }

  remove(value) {
    if (this.has(value)) {
      delete this.obj[value]
      return true
    } else {
      return false
    }
  }

  clear() {
    this.obj = {}
  }

  has(value) {
    // eslint-disable-next-line no-prototype-builtins
    return this.obj.hasOwnProperty(value)
  }

  size() {
    return Object.keys(this.obj).length
  }

  values() {
    return Object.values(this.obj)
  }

  toString(separator = ',') {
    let str = ''
    Object.keys(this.obj).forEach(key => {
      str += separator + JSON.stringify(this.obj[key])
    })
    return str === '' ? str : str.slice(1)
  }

  /**
   * 并集 ∪
   * @param {MySet} set
   */
  union(set) {
    const _set = [...this.values(), ...set.values()]
    return [...new Set(_set)]
  }

  /**
   * 交集 ∩
   * @param {MySet} set
   */
  intersection(set) {
    const _set = new MySet()
    this.union(set).forEach(value => {
      if (this.has(value) && set.has(value)) {
        _set.add(value)
      }
    })
    return _set.values()
  }

  /**
   * 差集
   * @param {MySet} set
   */
  diff(set) {
    const _set = new MySet()
    this.union(set).forEach(value => {
      if (this.has(value) && !set.has(value)) {
        _set.add(value)
      }
    })
    return _set.values()
  }

  /**
   * 差集
   * @param {MySet} set
   */
  isSubSet(set) {
    return this.values().every(value => set.has(value))
  }
}
