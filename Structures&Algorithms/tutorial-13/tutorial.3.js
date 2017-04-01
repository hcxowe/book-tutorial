/**
 * 高级算法
 */

// 背包问题 -- 递归方法
function knapsack(capacity, size, value, n) {
    if (n == 0 || capacity == 0) {
        return 0;
    }

    if (size[n-1] > capacity) {
        return knapsack(capacity, size, value, n-1);
    }
    else {
        return Math.max(value[n-1] + knapsack(capacity-size[n-1], size, value, n-1), knapsack(capacity, size, value, n-1));
    }
}


var value = [4,5,10,11,13];
var size = [3,4,7,8,9];
var capacity = 16;
var n = 5;
var start = new Date().getTime();
console.log(knapsack(capacity, size, value, n));
var end = new Date().getTime();

console.log('使用递归计算背包问题, 用时:' + (end - start) + 'ms');