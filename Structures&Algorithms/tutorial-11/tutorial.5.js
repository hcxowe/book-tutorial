/**
 * 排序高级算法 - 希尔排序
 */

var numAry = require('./tutorial.01');

function shellSort(arr) {
    var N = arr.length;
    var h = 1;
    var tem;
    while (h < N/3) {
        h = 3 * h + 1;
    }

    while (h >=1) {
        for (var i=h; i<N; i++) {
            for (var j=i; j>=h && arr[j] < arr[j-h]; j-=h) {
                tem = arr[j];
                arr[j] = arr[j-h];
                arr[j-h] = tem; 
            }
        }

        h = (h - 1) / 3;
    }
}

console.log('希尔排序');

var start = new Date().getTime();
console.log(start);
shellSort(numAry.dataStore);
//numAry.dataStore.sort();
var end = new Date().getTime();

console.log(end);

console.log(numAry.toString());
console.log('数组大小'+ numAry.dataStore.length + ', 用时:' + (end - start) + 'ms');

