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


