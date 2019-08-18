/* 散列表 */
class HashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn
        this.table = {}
    }

    put(key, value) {
        if (key == null && value == null) {
            return false
        }

        let position = this.hasCode(key)
        this.table[position] = new ValuePair(key, value)
        return true
    }

    remove(key) {
        if (key == null) {
            return false
        }

        let position = this.hasCode(key)
        delete this.table[position] 

        return true
    }

    get(key) {
        if (key == null) {
            return undefined
        }

        let valuePair = this.table[this.hasCode(key)]
        return valuePair === null ? undefined : valuePair.value
    }

    loseloseHashCode(key) {
        if (typeof key === "number") {
            return key
        }
    
        let tableKey = this.toStrFn(key)
        let hash = 0
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i)
        }

        return hash % 37
    }

    hasCode(key) {
        return this.loseloseHashCode(key)
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