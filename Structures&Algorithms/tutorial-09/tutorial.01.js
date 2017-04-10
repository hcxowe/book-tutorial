/**
 * 二叉树与二叉查找树
 */

// 定义节点
function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
}

Node.prototype = {
    show: function() {
        return this.data;
    }
};

function BST() {
    this.root = null;
}

BST.prototype = {
    insert: function(data) {
        var node = new Node(data, null, null);

        if (!this.root) {
            this.root = node;
            return;
        }

        var current = this.root;
        var parent = null;
        while (true) {
            parent = current;
            if (data < current.data) {
                current = current.left;
                if(!current) {
                    parent.left = node;
                    break;
                }
            }
            else {
                current = current.right;
                if (!current) {
                    parent.right = node;
                    break;
                }
            }
        }
    },
    // 中序遍历
    inOrder: function(node) {
        if (node) {
            this.inOrder(node.left);
            console.log(node.data + ' ');
            this.inOrder(node.right);
        }
    },

    // 先序遍历
    preOrder: function(node) {
        if (node) {
            console.log(node.data + ' ');
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    },

    // 后序遍历
    postOrder: function(node) {
        if (node) {
            this.postOrder(node.left);
            this.postOrder(node.right);
            console.log(node.data + ' ');
        }
    },

    getMin: function() {
        var current = this.root;
        while (current.left) {
            current = current.left;
        }

        return current;
    },

    getMax: function() {
        var current = this.root;
        while (current.right) {
            current = current.right;
        }

        return current;
    },

    find: function(data) {
        var current = this.root;
        while (current) {
            if (current.data == data) {
                break;
            }
            else if (current.data > data) {
                current = current.left;
            }
            else {
                current = current.right;
            }
        }

        return current;
    },

    remove: function(data) {
        this.root = this.removeNode(this.root, data);
    },

    getSmallest: function(node) {
        var current = node;
        while (current) {
            if (!current.left) {
                break;
            }

            current = current.left;
        }

        return current;
    },

    removeNode: function(node, data) {
        if (!node) {
            return null;
        }

        if (data == node.data) {
            if (node.left === null && node.right === null){
                return null;
            }

            if (!node.left) {
                return node.right;
            }

            if(!node.right) {
                return node.left;
            }

            var tempNode = this.getSmallest(node.right);
            node.data = tempNode.data;
            node.right = this.removeNode(node.right, tempNode.data);
            return node;
        }
        else if (data < node.data) {
            node.left = this.removeNode(node.left, data);
            return node;
        }
        else {
            node.right = this.removeNode(node.right, data);
            return node;
        }
    },

    totalNode: function() {
        return this.getCountByNode(this.root);
    },

    getCountByNode: function(node) {
        var size = 0;

        if (!node) {
            size = 0;
        }
        else {
            size = 1;
        }

        if (node.left) {
            size += this.getCountByNode(node.left);
        }

        if (node.right) {
            size += this.getCountByNode(node.right);
        }

        return size;
    }
}

var bst = new BST();
bst.insert(5);
bst.insert(2);
bst.insert(3);
bst.insert(4);
bst.insert(1);
bst.insert(6);
bst.insert(7);

//bst.inOrder(bst.root);
//bst.preOrder(bst.root);
//bst.postOrder(bst.root);

//console.log(bst.getMin());
//console.log(bst.getMax());
//console.log(bst.find(4));

//bst.remove(4);
//bst.postOrder(bst.root);

console.log(bst.totalNode());

