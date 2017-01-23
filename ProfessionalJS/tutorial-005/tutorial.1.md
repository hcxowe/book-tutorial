## 引用类型

### Object

### Array

- 数组最多可以包含4294967295个项
- 数组检测方法 Array.isArray()
```js
    function isArray(ary) {
        if (typeof Array.isArray === 'function') {
            return Array.isArray(ary);
        }

        return Object.prototype.toString.call(ary) === '[object Array]';
    }
```
- 调用数组的valueOf方法返回的还是数组自身
- 调用数组的toString方法返回是数组每项调用toString然后使用逗号链接起来的字符串
- null,undefined的数组项在使用toString时转化为空字符串
```js
    [1, undefined*2, 2].toString(); // 1,,,2
```
- 栈与队列方法
    - push pop
    - unshift shift
    - push,unshift可以在数组尾部与头部添加多个项，并返回添加之后数组的长度
    - pop,shift删除并返回尾部或头部的数组项

- 重排序方法
    - reverse 颠倒数组
    - sort    数组排序，默认按字符串排序，可传入比较函数，函数返回大于零升序，小于零降序

- 操作方法
    - concat 
    - slice(start, end) 
    - splice(start, end, newitem1, newitem2)

- 位置方法
    - indexOf lastIndexOf 使用全等查找

- 迭代方法 - 都不改变原数组
    - every 将数组每一项传递给给定函数，函数都返回true则返回true
    - filter 将数组每一项传递给给定函数，函数返回true的项组成新的数组返回
    - forEach 对数组每一项运行给定函数
    - map 将数组每一项传递给给定函数，将函数返回值组成新的数组
    - some 将数组每一项传递给给定函数，有一项使函数返回true则返回true

- 归并方法 - 都不改变原数组
    - reduce
    - reduceRight

### Date
    - Date.parse('yyyy-MM-dd hh:mm:ss'); es5支持该格式的日期字符串，返回时间戳
    - Date.UTC()
    - Date.now()  返回调用该方法时的时间毫秒数 
```js
    var date = new Date(Date.parse('2016-12-12 12:12:12')); // Mon Dec 12 2016 12:12:12 GMT+0800 (中国标准时间)

    // 会加上本地时区
    Date.UTC(2016, 11, 12, 12, 12, 12); // Mon Dec 12 2016 20:12:12 GMT+0800 (中国标准时间)

    Date.now(); // 1485159495099

    date.toLocaleString();
```

### RegExp

- 标示
    - g 全局模式
    - i 不区分大小写
    - m 多行模式

- 原字符
    - [] {} () \ | ? * + . ^ $

- exec
```js
    var text = 'cat, bat, cat, dat';
    var pattern = /.at/g;
    var matches = pattern.exec(text); 
    matches.index; // 0
    matches[0]; // cat
    matches = pattern.exec(text); 
    matches.index; // 5
    matches[0]; // bat
```
- test 判断是否匹配，返回true|false

### Function

- 函数声明
- 函数表达式
- 内部属性 
    - arguments 
        - arguments.callee 函数本身
        - arguments.caller 严格模式出错，非严格模式为undefined
        - arguments.callee.caller 函数的调用者
    - this
    - caller 函数的调用者

- 函数属性和方法
    - length 函数显示接受的参数个数
    - prototype 函数原型

### 基本包装类型

- Number
    - IE8- 不能正确舍入[-0.94, -0.5]与[0.5, 0.94]返回0，而不是正确的-1 1
    - toFixed() 四舍五入保留指定小数位
    - toExponential() 数值的指数形式，保留指定小数位
    
- String
    - charAt  返回指定位置的字符
    - charCodeAt 返回指定位置的字符的编码
    - concat 字符串链接，返回新字符串
    - slice(start, end) 将传入的负值加上字符串的长度在进行操作
    - substr(start, length) start为负值将加上字符串的长度
    - substring(start, end) 将负值转化为0
    - indexOf(char, start) start默认为0
    - lastIndexOf(char, start) start默认为0
    - trim() 删除字符串前置或后置空格
    - toUpperCase()
    - toLowerCase()
    - match(/.../) 匹配正则，同exec一样
    - search(/../) 从头查找匹配，返回匹配的索引，没找到返回-1
    - replace() 替换
    ```js
        var text = 'aat, bat, cat, dat';
        var result = text.replace(/(.at)/g, 'word ($1)');
        result; // "word (aat), word (bat), word (cat), word (dat)"

        text.replace(/(.at)/g, function(value, index, str){
            return '*at';
        }); // "*at, *at, *at, *at"
    ``
    - split(splt, length) 转数组, 第一个分隔符，第二个参数为指定分隔的个数
    ```js
        var colorstr = 'red, blue, yellow';
        colorstr.split(/,\s*/);  // ['red', 'blue', 'yellow']
    ```
    - localeCompare 比较字符串
    - fromCharCode 传入字符编码，返回字符串
- Boolean

### 单体内置对象 - 由JS实现，不用显示实例化内置对象

- Global
    - isNaN()
    - isArray()
    - parseInt()
    - parseFloat()
    - encodeURI() 
    - decodeURI()
    - encodeURIComponent()
    - decodeURIComponent()
    ```js
        var url = "http://www.goldmsg.com?userId='丶吹风'&password='123456'"
        var estr1 = window.encodeURI(url);
        var estr2 = window.encodeURIComponent(url);
        estr1; // "http://www.goldmsg.com?userId='%E4%B8%B6%E5%90%B9%E9%A3%8E'&password='123456'"
        estr2; // "http%3A%2F%2Fwww.goldmsg.com%3FuserId%3D'%E4%B8%B6%E5%90%B9%E9%A3%8E'%26password%3D'123456'"

        window.decodeURI(estr1); // "http://www.goldmsg.com?userId='丶吹风'&password='123456'"
        window.decodeURIComponent(estr2); // "http://www.goldmsg.com?userId='丶吹风'&password='123456'"
    ```

    - eval()

    - undefined
    - NaN
    - Infinity
    - Object
    - Array
    - Boolean
    - String
    - Number
    - Date
    - RegExp
    - Error
    - EvalError
    - RangeError
    - ReferenceError
    - SyntaxError
    - TypeError
    - URIError

- window 

- Math
    - min()
    - max()
    - ceil() 向上舍入取整
    - floor() 向下舍入取整
    - round() 四舍五入取整
    - random() 0-1随机数
    - abs()
    - exp()
    - log()
    - pow()
    - sqrt()
    - acos()
    - asin()
    - atan()
    - atan2()
    - cos()
    - sin()
    - tan()

