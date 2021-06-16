/*
 * @Description: 集合测试
 * @Date: 2021-06-08 00:32:35 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-08 01:46:35 +0800
 * @LastEditors: JackChou
 */
import { MySet } from '@ds/index.js'
describe('MySet', () => {
  const mySet = new MySet()
  it('add', () => {
    expect(mySet.add('1')).toBe(true)
    expect(mySet.add('1')).toBe(false)
  })
  it('add', () => {
    expect(mySet.has('1')).toBe(true)
  })
  it('remove', () => {
    expect(mySet.remove('1')).toBe(true)
    expect(mySet.remove('100')).toBe(false)
  })
  it('clear', () => {
    mySet.clear()
    expect(mySet.has('1')).toBe(false)
  })
  it('size', () => {
    mySet.clear()
    mySet.add('0')
    mySet.add('1')
    expect(mySet.size()).toBe(2)
  })
  it('values', () => {
    mySet.clear()
    mySet.add('0')
    mySet.add('1')
    expect(mySet.values()).toEqual(['0', '1'])
  })
  it('toString', () => {
    mySet.clear()
    mySet.add('0')
    mySet.add('1')
    expect(mySet.toString()).toEqual('"0","1"')
  })
  it('union', () => {
    const mySet = new MySet()
    mySet.add('1')
    mySet.add('2')
    mySet.add('3')
    const mySet2 = new MySet()
    mySet2.add('3')
    mySet2.add('4')
    expect(mySet.union(mySet2)).toEqual(['1', '2', '3', '4'])
    expect(mySet2.union(mySet)).toEqual(['3', '4', '1', '2'])
  })
  it('intersection', () => {
    const mySet = new MySet()
    mySet.add('1')
    mySet.add('2')
    mySet.add('3')
    const mySet2 = new MySet()
    mySet2.add('3')
    mySet2.add('4')
    expect(mySet.intersection(mySet2)).toEqual(['3'])
    expect(mySet2.intersection(mySet)).toEqual(['3'])
  })
  it('diff', () => {
    const mySet = new MySet()
    mySet.add('1')
    mySet.add('2')
    mySet.add('3')
    const mySet2 = new MySet()
    mySet2.add('3')
    mySet2.add('4')
    expect(mySet.diff(mySet2)).toEqual(['1', '2'])
    expect(mySet2.diff(mySet)).toEqual(['4'])
  })
  it('isSubSet', () => {
    const mySet = new MySet()
    mySet.add('1')
    mySet.add('2')
    mySet.add('3')
    const mySet2 = new MySet()
    mySet2.add('3')
    mySet2.add('4')
    expect(mySet.isSubSet(mySet2)).toEqual(false)
    expect(mySet2.isSubSet(mySet)).toBe(false)
    const mySet3 = new MySet()
    mySet3.add('2')
    mySet3.add('1')
    expect(mySet3.isSubSet(mySet)).toBe(true)
  })
})
