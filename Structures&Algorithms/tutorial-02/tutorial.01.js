/**
 * 列表
 */

function List() {
    this.size = 0;
    this.pos = 0;
    this.dataStore = [];
}

List.prototype = {
    append: function(item) {
        this.dataStore.push(item);
        this.size++;
    },

    remove: function(item) {
        for (var i=0; i<this.dataStore.length; i++) {
            if (this.dataStore[i] == item) {
                this.dataStore.splict(i, 1);
                this.size--;
                return true;
            }
        }

        return false;
    },

    find: function(item) {
        for (var i=0; i<this.dataStore.length; i++) {
            if (this.dataStore[i] == item) {
                return i;
            }
        }

        return -1;
    },

    length: function() {
        return this.size;
    },

    toString: function() {
        return this.dataStore;
    },

    insert: function(newItem, afterItem) {
        var index = this.find(afterItem);

        if (~index) {
            return false;
        }

        this.dataStore.splice(index+1, 0, newItem);
        this.size++;
        return;
    },

    clear: function() {
        this.dataStore.length = 0;
        this.size = 0;
        this.pos = 0;
    },

    contains: function(item) {
        return !!~this.find(item);
    },

    front: function() {
        this.pos = 0;
    },

    end: function() {
        this.pos = this.size - 1;
    },

    prev: function() {
        if (this.pos > 0) {
            this.pos--;
        }
    },

    next: function() {
        if (this.pos < this.size) {
            this.pos++;
        }
    },

    currPos: function() {
        return this.pos;
    },

    moveTo: function(pos) {
        this.pos = pos;
    },

    getCurItem: function() {
        return this.dataStore[pos];
    },

    hasNext: function() {
        return this.pos < this.size;
    },

    hasPrev: function() {
        return this.pos > 0;
    }
};