/**
 * ### 隐式类型转换
 */
var obj = {
    valueOf: function () {
        return 17;
    },
    toString: function () {
        return 'string';
    }
};

obj + ""; // "17"
~1.2; // -2
true == 1; // true
true == 0; // false
true == 2; // false
obj == 17; // true

var date = new Date;
date.valueOf(); // 1483844549439
date.toString(); // "Sun Jan 08 2017 11:02:29 GMT+0800 (中国标准时间)"
"" + date; // "Sun Jan 08 2017 11:02:29 GMT+0800 (中国标准时间)"
1483844549439 == date; // false

