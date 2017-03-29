/**
 * 链表
 */

// 双向链表
function Node(item) {
    this.item = item;
    this.next = null;
    this.prev = null;
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
        newNode.prev = node;
        node.next = newNode;
        return true;
    },

    remove: function(item) {
        var node = this.find(item);

        if (node.next) {
            node.next.prev = node.prev;
            node.prev.next = node.next;
        }
        else {
            node.prev.next = null;
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