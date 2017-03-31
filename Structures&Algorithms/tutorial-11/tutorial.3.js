/**
 * 排序算法 - 选择排序
 */

var numAry = require('./tutorial.01');

function selectionSort(arr) {
    var min;
    for (var i=0, len=arr.length; i < len-1; i++) {
        min = i;
        for (var j=i+1; j < len; j++) {
            if (arr[min] > arr[j]) {
               min = j;
            }
        }

        if (min != i) {   
            arr[i] = arr[i] ^ arr[min];
            arr[min] = arr[i] ^ arr[min];
            arr[i] = arr[i] ^ arr[min];
        }
    }
}

console.log('选择排序');

var start = new Date().getTime();
console.log(start);
selectionSort(numAry.dataStore);
var end = new Date().getTime();
console.log(end);

console.log(numAry.toString());
console.log('数组大小'+ numAry.dataStore.length + ', 用时:' + (end - start) + 'ms');

