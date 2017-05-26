// 如何测试性能

// 计算一段程序前后的时间差
// 计算时间差有许多问题：
//  1、所处环境计算运行时间的精度不准确 
//  2、系统或引擎在这段时间有没有收到其他方面的影响 
//  3、时间间隔的计算有延时 
//  4、不清楚测试的js环境是否优化过
var test = {
    startTime: 0,
    start () {
        this.startTime = (new Date()).getTime();
    },
    end() {
        var endTime = (new Date()).getTime();
        var interval = endTime - this.startTime
        
        this.startTime = endTime;
        return interval;
    }
}

test.start();

var i = 0;
while (i++ < 100000000) {
}

console.log(test.end());


startTime = (new Date()).getTime();
i = 0;
while (++i < 100000000) {
}

console.log(test.end());
// 对于循环中的a++与++a这种性能问题，是无关紧要的


// 尾调用优化 Tail Call Optimization
// 尾调用： 一个出现在另一个函数结尾出的函数调用，这个调用结束后没有其余事情要做了
function foo(x) {
    return x;
}

function bar(y) {
    return foo(y + 1); // 尾调用
}

// 尾调用优化可以解决递归时 引擎会限制递归栈的深度 的问题
function fact(n, res) {
    if (n < 2) {
        return res;
    }

    return fact(n-1, n*res);
}
function factorial(n) {
    return fact(n, 1);
}

factorial(5);


// 未进行优化的递归
function factorial1(n) {
    if (n < 2) {
        return n;
    }

    return n * factorial1(n - 1);
}