/**
 * 高级算法
 */

// 动态规划 -- 计算斐波那契数列
function dynFib(n) {
    var val = [];
    for (var i=0; i < n; i++) {
        val[i] = 0;
    }

    if(n < 2) {
        return n;
    }
    else if (n == 2) {
        return 1;
    }
    else {
        val[1] = 1;
        val[2] = 1;
        for (var i=3; i<n; i++) {
            val[i] = val[i-1] + val[i-2];
        }

        return val[n-1];
    }
}

// 另一个动态规划版本
function iterFib(n) {
    if (n < 2) {
        return n;
    }

    var last = 1;
    var nextLast = 1;
    var result = 1;
    for (var i=3; i<n; i++) {
        result = last + nextLast;
        nextLast = last;
        last = result;
    }

    return result;
}

// 递归的方法
function recurFib(n) {
    if (n < 2) {
        return n;
    }

    return recurFib(n-1) + recurFib(n-2);
}

var n = 30;
var start = new Date().getTime();
console.log(dynFib(n));
var end = new Date().getTime();

console.log('使用动态规划计算第'+ n +'个斐波那契数, 用时:' + (end - start) + 'ms');

start = new Date().getTime();
console.log(iterFib(n));
end = new Date().getTime();

console.log('使用动态规划2计算第'+ n +'个斐波那契数, 用时:' + (end - start) + 'ms');

start = new Date().getTime();
console.log(dynFib(n));
end = new Date().getTime();

console.log('使用递归计算第'+ n +'个斐波那契数, 用时:' + (end - start) + 'ms');