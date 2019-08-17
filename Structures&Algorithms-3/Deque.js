/* 双端队列 */
class Deque {
    constructor() {
        this.count = 0
        this.lowestCount = 0
        this.items = {}
    }

    addFront(item) {
        if (this.isEmpty()) {
            this.addBack(item)
        }
        else if (this.lowestCount > 0) {
            this.items[--this.lowestCount] = item
        }
        else {
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1]
            }

            this.count++
            this.lowestCount = 0
            this.items[0] = item
        }
    }

    addBack(item) {
        this.items[++this.count] = item
    }

    removeFront() {
        if (this.isEmpty()) {
            return
        }

        let item = this.items[this.lowestCount]
        delete this.items[this.lowestCount++]
        return item
    }

    removeBack() {
        if (this.isEmpty()) {
            return
        }

        let item = this.items[this.count]
        delete this.items[this.lowestCount--]
        return item
    }

    peekFront() {
        if (this.isEmpty()) {
            return
        }

        return this.items[this.lowestCount]
    }

    peekBack() {
        if (this.isEmpty()) {
            return
        }

        return this.items[this.count]
    }

    size() {
        return this.count - this.lowestCount
    }

    isEmpty() {
        return this.size() === 0
    }

    clear() {
        this.lowestCount = 0
        this.count = 0
        this.items = {}
    }

    toString() {
        return Object.values(this.items).join(',')
    }
}