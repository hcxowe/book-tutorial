/**
 * 排序算法
 */

// 随机数据数组
function CArray(num) {
    this.dataStore = [];
    this.pos = 0;
    this.count = num;
 
    for (var i=0; i<num; i++) {
        this.dataStore[i] = i;
    }
}

CArray.prototype = {
    setData: function() {
        for (var i=0; i<this.count; i++) {
            this.dataStore[i] = Math.floor(Math.random() * (this.count + 1));
        }
    },

    clear: function() {
        for (var i=0; i<this.dataStore.length; i++) {
            this.dataStore[i] = 0;
        }
    },

    insert: function(ele) {
        this.dataStore[this.pos++] = ele;
    },

    toString: function() {
        var str = "";
        for (var i=0, len=this.dataStore.length; i<len; i++) {
            
            if (i > 0 && (i % 10 == 0)) {
                str += '\n';
            }

            str += this.dataStore[i] + ' ';
        }

        return str;
    },

    swap: function(arr, index1, index2) {
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;

        // 异或交换值
        // arr[index1] = arr[index1] ^ arr[index2];
        // arr[index2] = arr[index1] ^ arr[index2];
        // arr[index1] = arr[index1] ^ arr[index2];
    }
};

var numAry = new CArray(100000);
numAry.setData();
//console.log(numAry.toString());

module.exports = numAry;

