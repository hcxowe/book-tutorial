# Iterator 与 for...of 循环

## Iterator

任何数据结构，只要部署Iterator接口，就可以完成遍历操作

凡是部署了Symbol.iterator属性的数据结构，就成为部署了遍历器接口，调用这个接口就会返回一个遍历器对象

## 数据结构的默认Iterator接口

原生具有Iterator接口的数据结构： 数组， 类数组对象，Set， Map

```js
var array = [1, 2, 3];
var iter = array[Symbol.iterator]();
iter.next(); // {value: 1, done:false}
iter.next(); // {value: 2, done:false}
iter.next(); // {value: 3, done:false}
iter.next(); // {value: undefined, done:true}
```

## 调用Iterator接口的场合

### 解构赋值

对数组和Set结构进行解构赋值时，会默认调用Symbol.iterator方法

```js
let set = new Set().add('a').add('b').add('c');

let [x, y] = set;

x; // a
y; // b

let [a, ...rest] = set;
a; // a
rest; // [b, c]
```

### 扩展运算符

```js
var str = 'hello';
[...str]; // [h, e, l, l, o]
```

### yield*

```js
let generator = function *() {
    yield 1;
    yield* [2, 3, 4];
    yield 5;
};

var iter = generator();
iter.next(); // {value: 1, done: false}
iter.next(); // {value: 2, done: false}
iter.next(); // {value: 3, done: false}
iter.next(); // {value: 4, done: false}
iter.next(); // {value: 5, done: false}
iter.next(); // {value: undefined, done: true}
```

### 其他

任何接受数组作为参数的场合其实都调用了遍历器接口

- for...of
- Array.from
- Map(), Set(), WeakSet(), WeakMap()
- Promise.all()
- promise.rece()

## 字符串的Iteartor接口

```js
var str = 'hello';
var iter = str[Symbol.iterator]();
iter.next(); // {vaue: h, done:false}
iter.next(); // {vaue: e, done:false}
iter.next(); // {vaue: l, done:false}
iter.next(); // {vaue: l, done:false}
iter.next(); // {vaue: o, done:false}
iter.next(); // {vaue: undefined, done:true}
```

## Iterator接口与Generator函数

```js
var myIterator = {};
myIterator[Symbol.iterator] = function *() {
    yield 1;
    yield 2;
    yield 3;
};

[...myIterator]; // [1, 2, 3]
```

## 遍历器对象的return throw

return 方法使用场合：如果`for...of`循环提前退出（出错或break或continue），就会调用`return`方法

```js
function readLinesSync(file) {
    return {
        next () {
            if (file.isAtEndOfFile()) {
                file.close();
                return { done: true };
            }
        },

        return () {
            file.close();
            return { done: true };
        }
    }
}

for (let line of readLinesSync(filename)) {
    break;
}
```

## for...of 循环

### 数组

```js
var arr = ['a', 'b', 'c', 'd'];
arr.foo = 'other';

for (let index in arr) {
    console.log(index); // 0, 1, 2, 3, foo
}

for (let val of arr) {
    console.log(val); // a, b, c, d
}
```
for...of 循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性

### Set与Map结构

遍历顺序是按照各个成员被添加进数据结构的顺序

Set结构遍历时返回一个值， Map结构遍历时返回一个数组，该数组的两个成员分别为当前Map成员的键名与键值

```js
var set = new Set(['a', 'b', 'c', 'c']);
for (let val of set) {
    console.log(val); // a b c
}

var map = new Map().set(('a', 1)).set('b', 2);
for (let pair of map) {
    console.log(pair); // ['a', 1] ['b', 2]
}
for (let [key, value] of map) {
    console.log(key + " : " + value); // a : 1, b : 2
}
```

### 计算生产的数据结构

- keys() 返回一个遍历器，用于遍历[键，值]组成的数组
- values() 返回一个遍历器，用于遍历所有的键名
- entries() 返回一个遍历器，用于遍历所有的键值

### 类数组对象

对于字符串来说，`for...of` 会正确识别32位UTF-16字符

### 对象

## 遍历语法

### for循环
```js
for(var i=0; i<array.length; i++) {
    console.log(array[i]);
}
``` 
基本遍历方法

### forEach
```js
array.forEach(function(value) {
    console.log(value)
})
```
 无法使用break，continue，return命令中途跳出循环

 ### for...in

 主要用于对象的遍历，不确定遍历顺序，会遍历原型链上的键

 ### for...of

 语法简洁，可以与break，continue，return配合使用， 提供了遍历所有数据结构的统一操作接口