/* 队列 */
class Queue {
    constructor() {
        this.count = 0
        this.lowestCount = 0
        this.items = {}
    }

    enqueue(item) {
        this.items[this.count++] = item
    }

    dequeue() {
        if (this.isEmpty()) {
            return
        }

        let ret = this.items[this.lowestCount]
        delete this.items[this.lowestCount++]
        return ret
    }

    peek() {
        return this.items[this.lowestCount]
    }

    isEmpty() {
        return this.size() == 0
    }

    size() {
        return this.count - this.lowestCount
    }

    clear() {
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }

    toString() {
        return Object.values(this.items).join(',')
    }
}