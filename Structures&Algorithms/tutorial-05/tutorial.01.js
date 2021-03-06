/**
 * 链表
 */

// 单向链表
function Node(item) {
    this.item = item;
    this.next = null;
}

function List() {
    this.head = new Node('head');
};

List.prototype = {
    find: function(item) {
        var node = this.head;
        while (node.item != item) {
            node = node.next;
        }

        return node || -1;
    },

    insert: function(newItem, item) {
        var node = this.find(item);
        
        if (node == -1) {
            return false;
        }

        var newNode = new Node(newItem);
        newNode.next = node.next;
        node.next = newNode;
        return true;
    },

    findPrevious: function(item) {
        var node = this.head;
        while (node.next != null && node.next.item != item) {
            node = node.next;
        }

        return node || -1;
    },

    remove: function(item) {
        var prevNode = this.findPrevious(item);

        if (prevNode != -1) {
            prevNode.next = prevNode.next.next;
        }
    },

    display: function() {
        var node = this.head;
        while (node.next != null) {
            console.log(node.next.item);
            node = node.next;
        }
    }
};

var cities = new List();

cities.insert('xxx', 'head');
cities.insert('yyy', 'xxx');
cities.insert('zzz', 'yyy');

cities.display();

cities.remove('xxx');

cities.display();