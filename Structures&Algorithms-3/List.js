/* 单向链表 */
function defaultEquals(a, b) {
    return a === b
}

class Node {
    constructor(item) {
        this.item = item
        this.next = null
    }
}

class LinkList {
    constructor(equalsFn = defaultEquals) {
        this.count = 0
        this.head = null
        this.equalsFn = equalsFn
    }

    push(item) {
        let node = new Node(item)

        let current

        if (!this.head) {
            this.head = node
        }
        else {
            current = this.head
            while (current.next) {
                current = current.next
            }

            current.next = node
        }

        this.count++
    }

    insert(item, index) {
        if (index < 0 || index > this.count) {
            return false
        }

        let node = new Node(item)
        if (index == 0) {
            let current = this.head
            node.next = current
            this.head = node
        }
        else {
            let previous = this.getItemAt(index - 1)
            let current = previous.next

            nodex.next = current
            previous.next = node
        }

        this.count++
        return true
    }

    getItemAt(index) {
        if (index < 0 || index > this.count) {
            return
        }

        let node = this.head
        for (let i = 0; i < index && node; i++) {
            node = node.next
        }

        return node
    }

    remove(item) {
        let index = this.indexOf(item)
        this.removeAt(index)
    }
    
    removeAt(index) {
        if (index < 0 || index > this.count) {
            return
        }

        let current = this.head

        if (index == 0) {
            this.head = current.next
        }
        else {
            let previous = this.getItemAt(index - 1)
            current = previous.next
            previous.next = current.next
        }

        this.count--
        return current.item
    }

    indexOf(item) {
        let current = this.head
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(item, current.item)) {
                return i
            }

            current = current.next
        }

        return -1
    }

    isEmpty() {
        return this.count === 0
    }

    size() {
        return this.count
    }

    getHead() {
        return this.head
    }

    toString() {

    }
}

