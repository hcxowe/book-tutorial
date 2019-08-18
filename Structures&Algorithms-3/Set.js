/* 集合 */
class Set {
    constructor() {
        this.items = {}
    }

    add(item) {
        if (this.has(item)) {
            return false
        }

        this.items[item] = item
        return true
    }

    delete(item) {
        if (this.has(item)) {
            delete this.items[item]
            return true
        }

        return false
    }

    has(item) {
        return Object.prototype.hasOwnProperty.call(this.items, item)
    }

    clear() {
        this.items = {}
    }

    size() {
        return Object.keys(this.items).length
    }

    values() {
        return Object.values(this.items)
    } 

    /* 并集 */
    union(otherSet) {
        let unionSet = new Set()
        this.values().forEach(value => unionSet.add(value))
        otherSet.values().forEach(value => unionSet.add(value))
        return unionSet
    }

    /* 交集 */
    intersection(otherSet) {
        let intersectionSet = new Set()
        let values = this.values()
        let otherValues = otherSet.values()
        let biggerSet = values
        let smallerSet = otherValues

        if (otherValues.length - values.length > 0) {
            biggerSet = otherValues
            smallerSet = values
        }

        smallerSet.forEach(value => {
            if (biggerSet.includes(value)) {
                intersectionSet.add(value)
            }
        })

        return intersectionSet
    }

    /* 差集 */
    difference(otherSet) {
        let differenceSet = new Set()

        this.values().forEach(value => {
            if (!otherSet.has(value)) {
                differenceSet.add(value)
            }
        })

        return differenceSet
    }

    /* 子集 */
    isSubsetOf(otherSet) {
        if (this.size() > otherSet.size()) {
            return false
        }

        let isSubset = true
        this.values().every(value => {
            if (!otherSet.has(value)) {
                isSubset = false
                return false
            }

            return true
        })

        return isSubset
    }
} 