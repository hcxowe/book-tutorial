/* 基于对象的 Stack */
class Stack {
    constructor() {
        this.count = 0
        this.items = {}
    }

    push(item) {
        this.items[this.count++] = item
    }

    size() {
        return this.count
    }

    isEmpty() {
        return this.count === 0
    }

    pop() {
        if (this.count == 0) {
            return
        }

        this.count--

        let ret = this.items[this.count]
        delete this.items[this.count]
        return ret
    }

    peek() {
        return this.items[this.count - 1]
    }

    clear() {
        this.items = {}
        this.count = 0
    }

    toString() {
        return Object.values(this.items).join(',')
    }
}

function baseConcerter(decNumber, base) {
    const remStack = new Stack()
    const digits = '0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZ'
    let number = decNumber
    let rem
    let baseString = ''

    if (!(base >= 2 && base <= 36)) {
        return ''
    }

    while(number > 0) {
        rem = Math.floor(number % base)
        remStack.push(rem)
        number = Math.floor(number / base)
    }

    while(!remStack.isEmpty()) {
        baseString += digits[remStack.pop()]
    }

    return baseString
}