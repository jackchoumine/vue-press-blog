/*
 * @Description: 二叉搜索树测试
 * @Date: 2021-06-10 22:35:38 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-12 00:48:37 +0800
 * @LastEditors: JackChou
 */
import { BinarySearchTree } from '@ds/index.js'
describe('BinarySearchTree', () => {
  const binarySearchTree = new BinarySearchTree()
  it('insert', () => {
    expect(binarySearchTree.insert(11)).toBe(true)
    expect(binarySearchTree.insert(7)).toBe(true)
    expect(binarySearchTree.insert(15)).toBe(true)
    expect(binarySearchTree.insert(5)).toBe(true)
    expect(binarySearchTree.insert(3)).toBe(true)
    expect(binarySearchTree.insert(9)).toBe(true)
    expect(binarySearchTree.insert(8)).toBe(true)
    expect(binarySearchTree.insert(10)).toBe(true)
    expect(binarySearchTree.insert(13)).toBe(true)
    expect(binarySearchTree.insert(12)).toBe(true)
    expect(binarySearchTree.insert(14)).toBe(true)
    expect(binarySearchTree.insert(20)).toBe(true)
    expect(binarySearchTree.insert(18)).toBe(true)
    expect(binarySearchTree.insert(25)).toBe(true)
    expect(binarySearchTree.insert(6)).toBe(true)
  })
  it('preOrderTraverse', () => {
    let str = ''
    const callback = value => {
      str += value + ','
    }
    expect(binarySearchTree.preOrderTraverse(callback)).toBe()
    console.log(str)
  })
  it('inOrderTraverse', () => {
    let str = ''
    const callback = value => {
      str += value + ','
    }
    expect(binarySearchTree.inOrderTraverse(callback)).toBe()
    console.log(str)
  })
  it('postOrderTraverse', () => {
    let str = ''
    const callback = value => {
      str += value + ','
    }
    expect(binarySearchTree.postOrderTraverse(callback)).toBe()
    console.log(str)
  })
  it('min', () => {
    expect(binarySearchTree.min()).toBe(3)
    binarySearchTree.insert(0)
    expect(binarySearchTree.min()).toBe(0)
  })
  it('max', () => {
    expect(binarySearchTree.max()).toBe(25)
    binarySearchTree.insert(100)
    expect(binarySearchTree.max()).toBe(100)
  })
  it('search', () => {
    expect(binarySearchTree.search(4)).toBe(false)
    expect(binarySearchTree.search(40)).toBe(false)
    expect(binarySearchTree.search(10)).toBe(true)
  })
  it('remove', () => {
    binarySearchTree.clear()
    binarySearchTree.insert(11)
    binarySearchTree.insert(7)
    binarySearchTree.insert(15)
    binarySearchTree.insert(5)
    binarySearchTree.insert(9)
    binarySearchTree.insert(13)
    binarySearchTree.insert(20)
    binarySearchTree.insert(3)
    binarySearchTree.insert(8)
    binarySearchTree.insert(10)
    binarySearchTree.insert(12)
    binarySearchTree.insert(14)
    binarySearchTree.insert(18)
    binarySearchTree.insert(25)
    binarySearchTree.insert(19)
    expect(binarySearchTree.search(4)).toBe(false)
    let str = ''
    const callback = value => {
      str += value + ','
    }
    expect(binarySearchTree.inOrderTraverse(callback)).toBe()
    console.log(str)
    expect(binarySearchTree.remove(9)).toBe(true)
    expect(binarySearchTree.remove(15)).toBe(true)
    expect(binarySearchTree.remove(13)).toBe(true)
    expect(binarySearchTree.remove(7)).toBe(true)
    let str2 = ''
    const callback2 = value => {
      str2 += value + ','
    }
    expect(binarySearchTree.inOrderTraverse(callback2)).toBe()
    console.log(str2)
  })
  it('update', () => {
    expect(binarySearchTree.update(3, 4)).toBe(true)
    expect(binarySearchTree.update(1000, 3)).toBe(false)
    let str2 = ''
    const callback2 = value => {
      str2 += value + ','
    }
    expect(binarySearchTree.inOrderTraverse(callback2)).toBe()
    console.log(str2)
    expect(binarySearchTree.update(18, 7)).toBe(true)
    let str = ''
    const callback = value => {
      str += value + ','
    }
    expect(binarySearchTree.inOrderTraverse(callback)).toBe()
    console.log(str)
  })
})
