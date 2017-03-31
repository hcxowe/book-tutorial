/**
 * 字典
 */
function Dictionary() {
    this.dataStore = new Array;
}

Dictionary.prototype = {
    add: function(key, value) {
        this.dataStore[key] = value;
    },

    find: function(key) {
        return this.dataStore[key];
    },

    remove: function(key) {
        delete this.dataStore[key];
    },

    show: function() {
        Object.keys(this.dataStore).sort().forEach(function(key) {
            console.log(key + "->" + this.dataStore[key]);
        }, this);
    },

    count: function() {
        return Object.keys(this.dataStore).length;
    },

    clear: function() {
        Object.keys(this.dataStore).forEach(function(key){
            delete this.dataStore[key];
        }, this);
    }
};

var dic = new Dictionary();
dic.add('x', [1,2,3]);
dic.add('y', {a:2,b:3});
dic.add('z', new Date());
dic.add('a', new Date());
dic.add('1', new Date());

dic.show();
console.log(dic.count());

dic.clear();

console.log(dic.count());