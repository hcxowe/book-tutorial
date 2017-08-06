# 变量的解构赋值

## 数组的解构赋值

### 基本用法

```js
var [a, b, c] = [1, 2, 3];
a; // 1
b; // 2
c; // 3
```

解构不成功，变量的值就是undefined
```js
let [x, y, ...z] = [1];
x; // 1
y; // undefined
z; // []
```

只要数据结构具备Iterator接口，都可以采用数组形式的解构赋值

### 默认值

```js
let [x=1, y=2] = [3, undefined];
x; // 3
y; // 2
```
默认值要生效，需要判断数组成员是否严格不等于undefined

## 对象的解构赋值

### 基本用法

```js
var {x, y} = {x: 1, y: 2};
x; // 1
y; // 2

var {a: i, b: j} = {a: 'iii', b: 'jjj'};
i; // iii
j; // jjj
```

### 默认值

```js
var {x: x=3, y: y='yyy'} = {x: 4};
x; // 4 
y; // yyy
```
如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错

## 字符串的解构赋值

```js
let [a, b, c] = 'hcx';
a; // h
b; // c
c; // x

let {length: len} = 'hcxowe';
len; // 6
```

## 数值和布尔值的解构赋值

```js
let {toString} = 123;
toString === Number.prototype.toString; // true

let {toString: toStr} = true;
toStr === Boolean.prototype.toString; // true

let {x} = undefined; // TypeError: Cannot match against 'undefined' or 'null'
let {y} = null; // TypeError: Cannot match against 'undefined' or 'null'
```
只要等号右边的值不是对象，就先将其转化为对象， null与undefined无法对它们进行解构赋值

## 函数参数的解构赋值

```js
function add([x, y]) {
    return x + y;
}

add([1, 2]); // 3

function move({x = 0, y = 0}) {
    return [x, y];
}

move({x: 3, y: 4}); // [3, 4]
move({y: 5}); // [0, 5]
move(); // [0, 0]

function move1({x, y} = {x: 0, y: 0}){
    return [x, y];
}

move1(); // [0, 0]
move1({y: 5}); // [undefined, 5]
move1({x: 3, y: 4});  // [3, 4]
```

## 圆括号问题

ES6规则：只要有可能导致解构歧义，就不能使用圆括号
- 变量声明语句中，模式不能带有圆括号   
`var [(a)] = 1; // SyntaxError: Unexpected token (`
- 函数参数中，模式不能带有圆括号   
`function foo([(z)]) { return z;} // SyntaxError: Unexpected token (`
- 不能将整个模式或嵌套模式中的一层放在圆括号中
`({x: a}) = {x: 1}`

可以使用圆括号的情况：赋值语句的非模式部分
```js
[(a)] = [1]; 
a; // 1

({p: (d)}) = {};
d; // undefined
```

## 解构赋值的用途

### 交换变量的值

`[x, y] = [y, x]`

### 从函数返回多个值

```js
function foo() {
    return [1, 2, 3]
}

var [a, b, c] = foo();
```

### 函数参数的定义

```js
function foo({x, y, z}) {
    reutrn [x, y, z];
}

foo({x: 3, z: 4}); // [3, undefined, 4]
```

### 提取JSON数据

```js
let json = {
    id: 1,
    name: 'hcxowe',
    likes: [1, 2] 
};

let {id, name, likes: arr} = json;
```

### 函数参数默认值

```js
function foo(url, {
    method: 'GET',
    cache: false,
    async: true,
    success: function(){},
    error: function(){}
});

foo('xxx.action', {
    cache: true,
    async: false
})
```

### 遍历Map

```js
var map = new Map();
map.set('x', 1);
map.set('y', 'str');

for (let [key, value] of map) {
    console.log(`key: ${key}, value: ${value}`);
}

// key: x, value: 1
// key: y, value: str
```

### 输入模块指定方法

```js
// module A
module.exports = {
    a: 1,
    b: 2,
    c: function() {}
}
```

```js
import { a, c } from A
```