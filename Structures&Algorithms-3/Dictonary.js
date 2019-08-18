/* 字典 */
class Dictionary {
    constructor(toStringFn = defaultToString) {
        this.toStringFn = toStringFn
        this.table = {}
    }

    set(key, value) {
        if (key == null && value == null) {
            return false
        }

        let tableKey = this.toStringFn(key)
        this.table[tableKey] = new ValuePair(key, value)
        return true
    }

    get(key) {
        let valuePair = this.table[this.toStringFn(key)]
        return valuePair == null ? undefined : valuePair.value
    }

    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[this.toStringFn(key)]
            return true
        }

        return false
    }

    hasKey(key) {
        return this.table[this.toStringFn(key)] != null
    }

    clear() {
        this.table = {}
    }

    size() {
        return Object.keys(this.table).length
    }

    isEmpty() {
        return this.size() === 0
    }

    keys() {
        return Object.keys(this.table)
    }

    values() {
        return Object.values(this.table)
    }

    keyValues() {
        return Object.values(this.table)
    }

    forEach(cb) {

    }
}

function defaultToString(item) {
    if (item === null) {
        return 'null'
    }

    if (item === undefined) {
        return 'undefined'
    }

    if (typeof item === 'string' || item instanceof String) {
        return '' + item
    }

    return item.toString()
}

class ValuePair {
    constructor(key, value) {
        this.key = key
        this.value = value
    }

    toString() {
        return this.key + ': ' + this.value
    }
}