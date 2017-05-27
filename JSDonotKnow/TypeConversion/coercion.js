// 强制类型转换
// 类型转换：将值从一种类型转换另一种类型 --- 静态类型语言的编译时
// 强制类型转换：隐式的类型转换 --- 发生在动态类型语言的运行时

// 不安全的json值 --- undefined，function， symbol， 包含循环引用的对象

// 对象转换为基础类型值时，进行toPrimitive转换 --- 优先 valueOf 在 toString
var obj = {
    toString () {
        return 'string';
    },

    // 返回一个安全的JSON值
    toJSON () {
        return ['json'];
    },

    valueOf () {
        return 123;
    }
}

console.log('obj: ' + obj);  // obj:123
console.log('obj: ' + JSON.stringify(obj));  // obj: ["json"]


var a = {
    b: '2',
    c: '3',
    d: [1,2,3],
    e: {
        a: '4',
        b: '5',
        c: '6'
    }
};

// 只转换包含在第二个数组参数中的属性
console.log(JSON.stringify(a, ['b', 'c', 'e'])); // {"b":"2","c":"3","e":{"b":"5","c":"6"}}

// 针对对象本身与其属性调用第二个函数参数，返回undefined则忽略，深调用
console.log(JSON.stringify(a, function(key, value) {
    if ("c" !== key) {
        return value;
    }

    return;
}));
// {"b":"2","d":[1,2,3],"e":{"a":"4","b":"5"}}

// 第三个参数为数值为缩进space个数， 为字符串为缩进显示为的字符串
console.log(JSON.stringify(a, null, '----'));
/**
{
----"b": "2",
----"c": "3",
----"d": [
--------1,
--------2,
--------3
----],
----"e": {
--------"a": "4",
--------"b": "5",
--------"c": "6"
----}
}
 */

// 转数值
console.log(+true); // 1
console.log(+false);// 0
console.log(+undefined);// NaN
console.log(+null); // 0
console.log(+''); // 0
console.log(+[]); // 0
console.log(+{}); // NaN


// 以下值转换为 false，除此之外的值都转换为 true
if (!undefined) {
    console.log(undefined);
}

if (!null) {
    console.log(null);
}

if (!NaN) {
    console.log(NaN);
}

if (!0) {
    console.log(0);
}

if (!"") {
    console.log("");
}

console.log(+ new Date()); // 1495867396846
console.log(Date.now());// 1495867396846
console.log(new Date().getTime());// 1495867396846

if (~('hello').indexOf('o')) {
    console.log('from hello find o');
}

console.log(~~3.14); // 3

console.log(parseInt(false, 16)); // 250

console.log('' + [null]); // ''   [null] => ''

