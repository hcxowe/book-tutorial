/**
 * 排序高级算法 - 快速排序
 */

var numAry = require('./tutorial.01');

function qSort(arr) {
    if (arr.length <= 1) { 
        return arr; 
    }

　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr.splice(pivotIndex, 1)[0];
　　var left = [];
　　var right = [];
　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}

　　return qSort(left).concat([pivot], qSort(right));
}

console.log('快速排序');

var start = new Date().getTime();
var ary= qSort(numAry.dataStore);
var end = new Date().getTime();

console.log(numAry.toString.apply({dataStore:ary}));
console.log('数组大小'+ ary.length + ', 用时:' + (end - start) + 'ms');

