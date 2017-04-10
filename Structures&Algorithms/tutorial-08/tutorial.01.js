/**
 * 集合
 */
function Set() {
    this.dataStore = [];
}

Set.prototype = {
    add: function(data) {
        var pos = this.dataStore.indexOf(data);
    
        if (!~pos) {
            this.dataStore.push(data);
        }
        else {
            this.dataStore[pos] = data;
        }
    },

    remove: function(data) {
       var pos = this.dataStore.indexOf(data);
    
        if (~pos) {
            delete this.dataStore.splice(pos, 1);
        }
    }, 

    containes: function(data){
        return ~this.dataStore.indexOf(data);
    },

    union: function(set){
        var tempSet = new Set();
        for (var i=0,len=this.dataStore.length; i<len; i++) {
            tempSet.add(this.dataStore[i]);
        }

        for (var j=0, size=set.dataStore.length; j<size; j++) {
            if (!tempSet.containes(set.dataStore[j])) {
                tempSet.dataStore.push(set.dataStore[j]);
            }
        }

        return tempSet;
    },

    intersect: function(set) {
        var tempSet = new Set();

        for (var i=0,len=this.dataStore.length; i<len; i++) {
            if (set.containes(this.dataStore[i])) {
                tempSet.dataStore.push(this.dataStore[i]);
            }
        }

        return tempSet;
    },

    subSet: function(set) {
        if (this.size() > set.size()) {
            return false;
        }

        for (var i=0, len=this.size(); i<len; i++) {
            if (!set.containes(this.dataStore[i])) {
                return false;
            }
        }

        return true;
    },

    size: function() {
        return this.dataStore.length;
    },

    show: function() {
        return this.dataStore;
    }
};

var set1 = new Set();
var set2 = new Set();

set1.add('hcx');
set1.add('owe');
set1.add('xxx');

set2.add('xxx');
set2.add('yyy');
set2.add('zzz');

console.log(set1.show());
console.log(set2.show());

console.log(set1.subSet(set2));

console.log(set1.union(set2).show());

console.log(set1.intersect(set2).show());