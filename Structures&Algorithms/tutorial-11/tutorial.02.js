/**
 * 排序算法 - 冒泡排序
 */

var numAry = require('./tutorial.01');

function bubbleSort(arr) {
    for (var i=arr.length-1; i > 0; i--) {
        for (var j=0; j < i; j++) {
            if (arr[j] > arr[j+1]) {
                arr[j] = arr[j] ^ arr[j+1];
                arr[j+1] = arr[j] ^ arr[j+1];
                arr[j] = arr[j] ^ arr[j+1];
            }
        }
    }
}

console.log('冒泡排序');

var start = new Date().getTime();
console.log(start);
bubbleSort(numAry.dataStore);
var end = new Date().getTime();
console.log(end);

console.log(numAry.toString());
console.log('用时:' + (end - start) + 'ms');

