/**
 * 排序算法 - 插入排序
 */

var numAry = require('./tutorial.01');

function insertionSort(arr) {
    for (var i=1, len=arr.length; i < len; i++) {
        var temp = arr[i];
        var j = i;
        while (j > 0 && arr[j-1] > temp) {
            arr[j] = arr[j-1];
            j--;
        }

        arr[j] = temp;
    }
}

console.log('插入排序');

var start = new Date().getTime();
console.log(start);
insertionSort(numAry.dataStore);
var end = new Date().getTime();
console.log(end);

console.log(numAry.toString());
console.log('数组大小'+ numAry.dataStore.length + ', 用时:' + (end - start) + 'ms');

