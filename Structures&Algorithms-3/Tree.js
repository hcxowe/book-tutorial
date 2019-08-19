const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}

function defaultCompare() {}

class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
        this.root = null
    }

    insert(key) {
        if (this.root == null) {
            this.root = new Node(key)
        } else {
            this.insertNode(this.root, key)
        }
    }

    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else {
            if (node.right == null) {
                node.right = new Node(key)
            } else {
                this.insertNode(node.right, key)
            }
        }
    }

    search(key) {
        return this.searchNode(this.root, key)
    }

    searchNode(node, key) {
        if (node == null) {
            return false
        }

        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            return this.searchNode(node.left, key)
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            return this.searchNode(node.right, key)
        } else {
            return true
        }
    }

    /* 中序遍历 */
    inOrderTraverse(cb) {
        this.inOrderTraverseNode(this.root, cb)
    }

    inOrderTraverseNode(node, cb) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, cb)
            cb(node.key)
            this.inOrderTraverseNode(node.right, cb)
        }
    }

    /* 先序遍历 */
    preOrderTraverse(cb) {
        this.preOrderTraverseNode(this.root, cb)
    }

    preOrderTraverseNode(node, cb) {
        if (node != null) {
            cb(node.key)
            this.preOrderTraverseNode(node.left, cb)
            this.preOrderTraverseNode(node.right, cb)
        }
    }

    /* 后序遍历 */
    postOrderTraverse(cb) {
        this.postOrderTraverseNode(this.root, cb)
    }

    postOrderTraverseNode(node, cb) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, cb)
            this.postOrderTraverseNode(node.right, cb)
            cb(node.key)
        }
    }

    min() {
        return this.minNode(this.root)
    }

    minNode(node) {
        let current = node
        while (current != null && current.left != null) {
            current = current.left
        }

        return current
    }

    max() {
        return this.maxNode(this.root)
    }

    maxNode(node) {
        let current = node
        while (current != null && current.right != null) {
            current = node.right
        }

        return current
    }

    remove(key) {
        this.root = this.removeNode(this.root, key)
    }

    removeNode(node, key) {
        if (node == null) {
            return false
        }

        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key)
            return node
        } else if (this.compareFn(key, node.ley) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key)
            return node
        } else {
            if (node.left == null && node.right == null) {
                node = null
                return node
            }

            if (node.left == null) {
                node = node.right
                return node
            } else if (node.right == null) {
                node = node.left
                return node
            }

            let aux = this.minNode(node.right)
            node.key = aux.key
            node.right = this.removeNode(node.right, key)
            return node
        }
    }
}