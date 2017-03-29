/**
 * 队列
 */
function Queue() {
    this.dataStore = [];
}

Queue.prototype = {
    enqueue: function(item) {
        this.dataStore.push(item);
    },

    dequeue: function() {
        this.dataStore.shift();
    },

    front: function() {
        return this.dataStore[0];
    },

    back: function() {
        return this.dataStore[this.dataStore.length-1];
    },

    toString: function() {
        return this.dataStore.join('\n');
    },

    empty: function() {
        return this.dataStore.length == 0;
    }
};