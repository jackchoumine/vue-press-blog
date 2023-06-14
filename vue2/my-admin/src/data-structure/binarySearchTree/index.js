/*
 * @Description: 二叉搜索树
 * @Date: 2021-06-10 22:28:36 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-12 00:47:28 +0800
 * @LastEditors: JackChou
 */
class Node {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null
  }

  insert(value) {
    const node = new Node(value)
    if (!this.root) {
      this.root = node
      return true
    } else {
      return this.insertNode(this.root, node)
    }
  }

  insertNode(node, newNode) {
    if (node.data <= newNode.data) {
      // 在右子树插入
      if (!node.right) {
        node.right = newNode
        return true
      } else {
        return this.insertNode(node.right, newNode)
      }
    } else {
      // 在左子树插入
      if (!node.left) {
        node.left = newNode
        return true
      } else {
        return this.insertNode(node.left, newNode)
      }
    }
  }

  /**
   * 三种情况：
   * 1. 删除叶子节点即没有子节点
   * 2. 该节点有一个子节点
   * 3. 该节点有两个子节点
   * @param {any} value 需要删除的节点
   */
  remove(value) {
    let current = this.root
    let parent = null
    let isLeftChild = true
    while (current.data !== value) {
      parent = current
      if (value < current.data) {
        isLeftChild = true
        current = current.left
      } else {
        isLeftChild = false
        current = current.right
      }
      // 没有找到需要删除的节点
      if (current === null) return false
    }
    if (current.left === null && current.right === null) {
      // 删除的节点是叶子节点
      if (current === this.root) {
        // 删除根节点
        this.root = null
      } else if (isLeftChild) {
        parent.left = null
      } else {
        parent.right = null
      }
    } else if (current.left && current.right === null) {
      // 存在左节点
      if (parent === this.root) {
        // 删除的是根节点
        this.root = current.left
      } else if (isLeftChild) {
        parent.left = current.left
      } else {
        parent.right = current.left
      }
    } else if (current.right && current.left === null) {
      // 存在右节点
      if (parent === this.root) {
        // NOTE  删除的是根节点 容易漏掉
        this.root = current.right
      } else if (isLeftChild) {
        parent.left = current.right
      } else {
        parent.right = current.right
      }
    } else {
      if (isLeftChild) {
        // 删除的节点在左子树，操作该节点的左子树
        let leftMaxNode = current.left
        while (leftMaxNode.right) {
          leftMaxNode = leftMaxNode.right
        }
        parent.left = leftMaxNode
        leftMaxNode.right = current.right
      } else {
        // 删除的节点在右子树，操作该节点的右子树
        let rightMinNode = current.right
        let rightMinNodeParent = current
        while (rightMinNode.left) {
          rightMinNodeParent = rightMinNode
          rightMinNode = rightMinNode.left
        }
        parent.right = rightMinNode
        rightMinNodeParent.left = rightMinNode.right
        if (current !== rightMinNodeParent) {
          rightMinNode.right = current.right
        }
        rightMinNode.left = current.left
      }
      current = null
      /*
               11
         7             15
       5    9       13        20
     3    8  10  12  14   18     25
                            19
       */
      // 中序遍历 11 7 5 3  9 8 10 15 13 12 14 20 18 19 25
    }
    return true
  }

  clear() {
    this.root = null
    return true
  }

  update(oldValue, value) {
    if (this.remove(oldValue)) {
      this.insert(value)
      return true
    } else {
      return false
    }
  }

  search(value) {
    let node = this.root
    let find = false
    while (node) {
      if (node.data < value) {
        node = node.right
      } else if (node.data > value) {
        node = node.left
      } else {
        // 相等找到
        find = true
        break
      }
    }
    return find
  }

  /**
   *中序遍历
   */
  inOrderTraverse(callback) {
    this.midOrderTraverseNode(this.root, callback)
  }

  midOrderTraverseNode(node, callback) {
    if (!node) return null
    else {
      // 左子树
      this.midOrderTraverseNode(node.left, callback)
      // 处理节点
      callback(node.data)
      // 在处理右子树
      this.midOrderTraverseNode(node.right, callback)
    }
  }

  /**
   * 先序遍历 根---> 左子树 ---> 右子树
   */
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback)
  }

  preOrderTraverseNode(node, callback) {
    if (!node) return null
    else {
      // 先处理节点
      callback(node.data)
      // TODO 重点理解
      // 先处理左子树
      this.preOrderTraverseNode(node.left, callback)
      // 在处理右子树
      this.preOrderTraverseNode(node.right, callback)
    }
  }

  /**
   * 后序遍历
   */
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback)
  }

  postOrderTraverseNode(node, callback) {
    if (!node) return null
    else {
      // 遍历左子树
      this.postOrderTraverseNode(node.left, callback)
      // 遍历右子树
      this.postOrderTraverseNode(node.right, callback)
      // 处理节点
      callback(node.data)
    }
  }

  min() {
    let node = this.root
    while (node.left) {
      node = node.left
    }
    return node?.data ?? null
  }

  max() {
    let node = this.root
    while (node.right) {
      node = node.right
    }
    return node?.data ?? null
  }
}
