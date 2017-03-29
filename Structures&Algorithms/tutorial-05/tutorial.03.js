/**
 * 链表
 */

// 循环链表
function Node(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
}

function List() {
    this.head = new Node('head');
    this.head.next = this.head;
    //this.head.prev = this.head;
};

List.prototype = {
    find: function(value) {
        var node = this.head.next;
        while (node && node.value != value) {
            if (node != this.head) {
                node = node.next;    
            }
            else {
                node = null;
            }
        }

        return node;
    },

    insert: function(newItem, item) {
        var node = this.find(item);
        
        if (!node) {
            return false;
        }

        var newNode = new Node(newItem);
        newNode.next = node.next;
        newNode.prev = node;
        node.next = newNode;
        newNode.next.prev = newNode;
        return true;
    },

    remove: function(item) {
        var node = this.find(item);

        if (node == this.head) {
            return false;
        }
        
        node.next.prev = node.prev;
        node.prev.next = node.next;
        return true;
    },

    move: function(value, size) {
        var dir = size > 0;
        size = Math.abs(size);

        var item = this.find(value);

        if (item == this.head) {
            return null;
        }
        
        while(size--) {
            item = dir ? item.next : item.prev;
            if (item == this.head) {
                size++;
            }
        }

        return item;
    },

    display: function() {
        var node = this.head.next;
        while (node != this.head) {
            console.log(node.value);
            node = node.next;
        }
    },

    length: function() {
        var len = 0;
        var node = this.head.next;
        while (node != this.head) {
            len++;
            node = node.next;
        }

        return len;
    }
};

var cities = new List();
var n = 40;
var m = 2;

for (var i=n; i>0; i--) {
    cities.insert(i, 'head');
}

var index = 1;
while(cities.length() > m) {
    console.log(cities.move(index, m).value);
    cities.remove(cities.move(index, m).value);
    index = cities.move(index, m).value;
}

console.log('ret:')
cities.display();