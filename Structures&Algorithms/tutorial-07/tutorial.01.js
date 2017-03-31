/**
 * 散列
 */
function HashTable() {
    this.table = new Array(137);
}

HashTable.prototype = {
    buildChains: function() {
        for (var i=0; i<this.table.length; i++) {
            this.table[i] = new Array();
        }
    },

    simpleHash: function(data) {
        var total = 0;
        for (var i=0; i<data.length; ++i) {
            total += data.charCodeAt(i);
        }

        return total % this.table.length;
    },

    betterHash: function(str) {
        var H = 37;
        var total = 0;
        for (var i=0; i<this.table.length; i++) {
            total += H * total + this.table.charCodeAt(i);
        }

        return parseInt(total % this.table.length);
    },

    put: function(key, value) {
        var pos = this.betterHash(key);
        this.table[pos] = value;
    },

    get: function(key) {
        return this.table[this.betterHash(key)];
    },

    showDistro: function() {
        var n = 0;
        for (var i=0; i<this.table.length; i++) {
            if (this.table[i] != undefined) {
                console.log(this.table[i]);
            }
        }
    }
};