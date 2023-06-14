/*
 * @Description: stack 测试
 * @Date: 2021-06-04 22:41:48 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-10 19:32:24 +0800
 * @LastEditors: JackChou
 */
// import { hashFunction } from '@ds/index.js'
import { HashTable } from '@ds/index.js'
// describe('hashFunction', () => {
//   it('hashFunction', () => {
//     expect(hashFunction('abc', 7)).toBe(4)
//     expect(hashFunction('cba', 7)).toBe(3)
//     expect(hashFunction('nba', 7)).toBe(5)
//     expect(hashFunction('undefined', 7)).toBe(3)
//   })
// })
describe('hashTable', () => {
  const hashTable = new HashTable()
  it('put', () => {
    expect(hashTable.put('abc', 7)).toBe(true)
    expect(hashTable.count).toBe(1)
    expect(hashTable.get('abc')).toBe(7)
    expect(hashTable.put('abc', 8)).toBe(true)
    expect(hashTable.get('abc')).toBe(8)
    expect(hashTable.count).toBe(1)
    expect(hashTable.put('abc', 7)).toBe(true)
    expect(hashTable.put('hello', 'world')).toBe(true)
    expect(hashTable.get('hello')).toBe('world')
    expect(hashTable.size()).toBe(2)
  })
  it('remove', () => {
    hashTable.clear()
    expect(hashTable.put('abc', 7)).toBe(true)
    expect(hashTable.remove('abc')).toBe(true)
    expect(hashTable.size()).toBe(0)
    expect(hashTable.put('hello', { name: 'jack' })).toBe(true)
    expect(hashTable.remove('abc')).toBe(false)
    expect(hashTable.get('hello')).toEqual({ name: 'jack' })
    expect(hashTable.size()).toBe(1)
  })
})
