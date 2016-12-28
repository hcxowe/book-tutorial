/**
 * 数组 Array
 * 标准定义：一个存储元素的线性集合
 * 在javascript中数组是特殊的对象，索引是该对象的属性，索引可能是整数但是都会转换成字符串属性
 * 效率不如其他语言中的数组
 */

// 判断一个对象是否为数组
function isArray(ary) {
    return typeof ary === 'object' && Object.prototype.toString.call(ary) === '[object Array]';
}

// 创建方法
var ary1 = [];  // []
ary1.length = 5;
ary1; // [undefined × 5]
var ary2 = [1,2,3,4,5]; // [1, 2, 3, 4, 5]
var ary3 = new Array(1,2,3,4,5); // [1, 2, 3, 4, 5]
var ary4 = new Array(5); // [undefined × 5]

// 数组方法

// 返回参数在数组的索引，不存在返回-1
ary2.indexOf(1); // 0

// 返回字符串
ary2.toString(); // 1,2,3,4,5
ary2.join(','); // 1,2,3,4,5


// 创建新数组方法

// 返回组合后的数组
ary2.concat([6,7], [[11,22],[33,44]]); // [1, 2, 3, 4, 5, 6, 7, Array[2], Array[2]]

ary2 = [1,2,3,4,5];

// 返回截取的字符串,并向原数组中添加项
ary2.splice(1, 2, 11, 22); // [2, 3]
ary2; // [1, 11, 22, 4, 5]

// 返回截取的字符串, 并不修改原数组
ary2.slice(1, 3); // [11, 22]


// 队列方法
// 尾部添加，返回数组长度
ary2.push(0,8,9); // 8
ary2; //[1, 11, 22, 4, 5, 0, 8, 9]

// 删除并返回数组的最后一个元素
ary2.pop(); // 9

// 删除并返回数组的第一个元素
ary2.shift(); // 1
ary2; // [11, 22, 4, 5, 0, 8]

// 在数组头部添加元素，返回数组长度
ary2.unshift(1, 11); // 8
ary2; // [1, 11, 11, 22, 4, 5, 0, 8]


// 排序方法

// 反转数组，修改原数组
ary2.reverse(); // [8, 0, 5, 4, 22, 11, 11, 1]

// 排序，默认按字符串排序，修改并返回原数组
ary2.sort(); // [0, 1, 11, 11, 22, 4, 5, 8]

// 指定比较函数，修改并返回原数组
ary2.sort(function(x, y){return x - y;}); // [0, 1, 4, 5, 8, 11, 11, 22]


// 迭代器方法

// 循环遍历
ary2.forEach(function(value, index, ary) {
    if (value > 5) {
        return false; // 终止遍历
    }

    console.log(value, index);
});
//  0 0
//  1 1
//  4 2
//  5 3
//  8 4
//  11 5
//  11 6
//  22 7

// 每个数组元素令函数返回true则返回true，否则返回false
ary2.every(function(value) {
    return value > -1;
});
// true

// 只要一个数组元素令函数返回true则返回true，否则返回false
ary2.some(function(value) {
    return value > 20;
});
// true

// 初始函数的参数为数组的第一第二个元素，之后将函数返回的值作为下次函数的第一个参数
ary2.reduce(function(sum, x) {
    return sum + x;
}); // 62

// 从右向左计算
ary2.reduceRight(function(sum, y) {
    return sum - y;
}); // -18

// 遍历数组每个元素，将函数的返回值当作返回数组的一个元素， 不改变原数组
ary2.map(function(value) {
    return value * 2;
}); // [0, 2, 8, 10, 16, 22, 22, 44]

// 将函数返回true的所有数组元素组成新的数组返回， 不改变原数组
ary2.filter(function(value) {
    return value > 10;
}); // [11, 11, 22]

ary2; // [0, 1, 4, 5, 8, 11, 11, 22]