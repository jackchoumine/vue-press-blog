/*
 * @Description: 链表测试
 * @Date: 2021-06-06 18:30:28 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-07 19:57:00 +0800
 * @LastEditors: JackChou
 */
import { LinkList } from '@ds/index.js'
describe('LinkList', () => {
  const linkList = new LinkList()
  const jack = { name: 'JackChou' }
  const tom = { name: 'Tom' }
  it('append', () => {
    expect(linkList.append(jack)).toBe(true)
    expect(linkList + '').toBe(JSON.stringify(jack))
  })
  it('size', () => {
    expect(linkList.append(tom)).toBe(true)
    expect(linkList.size()).toBe(2)
    expect(linkList.length).toBe(2)
    expect(linkList.toString('|')).toBe(JSON.stringify(jack) + '|' + JSON.stringify(tom))
  })
  it('insert', () => {
    const el = { name: '小名' }
    expect(linkList.insert(el)).toBe(true)
    expect(linkList + '').toBe(JSON.stringify(el) + ',' + JSON.stringify(jack) + ',' + JSON.stringify(tom))
    linkList.insert('test', 2)
    linkList.insert('4', 4)
  })
  it('get', () => {
    expect(linkList.get(0)).toEqual({ name: '小名' })
    expect(linkList.get(1)).toEqual(jack)
    expect(linkList.get(5)).toEqual(null)
    expect(linkList.get(4)).toEqual('4')
    expect(linkList.get(6)).toEqual(null)
  })
  it('indexOf', () => {
    expect(linkList.indexOf(jack)).toEqual(1)
    expect(linkList.indexOf('jack')).toEqual(-1)
    expect(linkList.indexOf(4)).toEqual(-1)
    expect(linkList.indexOf('4')).toEqual(4)
    expect(linkList.indexOf('test')).toEqual(2)
  })
  it('update', () => {
    expect(linkList.update(0, 1)).toEqual(true)
    expect(linkList.indexOf('test')).toEqual(2)
    expect(linkList.indexOf(1)).toEqual(0)
    expect(linkList.update(1, 'update')).toEqual(true)
    expect(linkList.indexOf('update')).toEqual(1)
  })
  it('removeAt', () => {
    expect(linkList.removeAt(0)).toEqual(true)
    expect(linkList.removeAt(5)).toEqual(false)
    expect(linkList.removeAt(1)).toEqual(true)
    expect(linkList.removeAt(0)).toEqual(true)
  })
  it('remove', () => {
    linkList.clear()
    linkList.append(0)
    linkList.append(1)
    linkList.append(2)
    linkList.append(3)
    linkList.append(4)
    // console.log(linkList + '')
    expect(linkList.remove(4)).toEqual(true)
    expect(linkList.remove(1)).toEqual(true)
    expect(linkList.remove(0)).toEqual(true)
    expect(linkList.append('JACK')).toEqual(true)
    expect(linkList.remove('JACK')).toEqual(true)
    expect(linkList.remove(2)).toEqual(true)
    // console.log(linkList + '')
  })
})
