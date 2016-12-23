/**
 * 汉罗塔递归: 
 * 要将所有盘子从1移到3可拆分为三步：
 * 1、把最低下盘子上方的盘子移动到2
 * 2、把最低那个盘子从1移动到3
 * 3、把2上的所有盘子移动到3
 * 如何将2上的所有盘子移动到3，需要重复之前的步骤
 * @param {Number} disc 盘子数量
 * @param {String} src  第一根柱子名字
 * @param {String} aux  第二根柱子名字
 * @param {String} dst  第三根柱子名字
 */
var hanoi = function (disc, src, aux, dst) {
    if (disc > 0) {
        hanoi(disc - 1, src, dst, aux);
        console.log('move disc:' + disc + ' from:' + src + ' to:' + dst);
        hanoi(disc - 1, aux, src, dst);
    }
}

hanoi(3, 'disc', 'aux', 'dst');
/*
    move disc:1 from:disc to:dst
    move disc:2 from:disc to:aux
    move disc:1 from:dst to:aux
    move disc:3 from:disc to:dst
    move disc:1 from:aux to:disc
    move disc:2 from:aux to:dst
    move disc:1 from:disc to:dst
 */


/**
 * 记忆:
 * 利用模块功能，调用模块返回的接口时，记录其中可以暂存的数据以供之后使用
 */
// 斐波那契数列 f(n) = f(n-1) + f(n-2);
var fibonacci = (function () {
    var memo = [0, 1];
    var fib = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }

        return result;
    };

    return fib;
}());


/**
 * 通用的记忆模式
 */
var memoizer = function (memo, formula) {
    var recur = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = formula(recur, n);
            memo[n] = result;
        }

        return result;
    }

    return recur;
};

// 定义算法
var fobi = memoizer([0, 1], function (recur, n) {
    return recur(n - 1) + recur(n - 2);
});

var fact = memoizer([1, 1], function (recur, n) {
    return n * recur(n - 1);
});

// 判断是否是数组
function isArray(ary) {
    return Object.prototype.toString.call(ary) === '[object Array]';
}

function isNumber(num) {
    return typeof num === 'number' && ISfINITE(num);
}



/**
 * # 优美的特性：
 *  - 函数是顶级对象
 *  - 基于原型继承的动态对象
 *  - 对象字面量和数组字面量
 */

/**
 * # 毒瘤
 *  - 全局变量
 *  - 作用域：全局作用域or函数作用域
 *  - 自动插入分号
 *  - 保留字
 *  - Unicode
 *  - typeof   - typeof null == 'object' // true;
 *  - parseInt
 *  - +
 *  - 浮点数 0.1+0.2 != 0.3
 *  - NaN  typeof NaN === 'number'; //true  NaN != NaN;//true
 *  - 类数组 - js并不存在真正的数组，使用类模仿数组，性能差很多
 *  - 假值  0 null undefined "" false NaN
 */
// 在函数顶部声明所有变量
// 语句末尾加分号
// 不使用保留字做变量
// 始终为parseInt指定基数参数

/**
 * # 糟粕
 *  - ==  涉及隐式类型转化  
 *  - with 动态加入词法作用域， 容易产生全局变量 性能低下
 *  - eval 无法对语句做出优化，验证影响性能， 还会改变词法作用域
 *  - continue
 *  - 没有块级作用域  使用try{}catch(e){}能创建跨级作用域
 *  - ++ -- 
 *  - 位运算符 & | ^ ~ >> >>> <<  位运算的操作的都是整数，所以js使用位运算符都会先将浮点数转换为整数进行操作
 *  - void 运算符 接受一个运算数 返回undefined 
 */