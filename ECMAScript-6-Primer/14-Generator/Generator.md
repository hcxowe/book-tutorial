# Generator

## 简介

Generator函数的声明

```js
function * myGenerator() {
    console.log('1');
    yield 'first';
    console.log('2');
    yield 'second';
    console.log('3');
    yield 'thrid';
    console.log('4');
    return 'ending';
}

var generator = myGenerator();
generator.next(); // 1 { value: first, done: false }
generator.next(); // 2 { value: second, done: false }
generator.next(); // 3 { value: thrid, done: false }
generator.next(); // 4 { value: ending, done: true }
generator.next(); // { value: undefined, done: true }
```
Generator函数执行返回一个遍历器对象

Generator是分段执行的，yield语句是暂停执行的标记，next方法恢复执行到下一个yield或return

## 与Iterator的关系

遍历器本身也有`Symbol.iterator`方法，执行后返回自身
```js
function *gen() {}
var g = gen();
g[Symbol.iterator]() === g; // true;
```

## next方法的参数

```js
function *foo(x) {
    var y = x * (yield (x + 1));
    var z = yield (y + 2);
    return x + y + z;
}

var f = foo(7);
f.next(); // { value: 8, done: false }
f.next(5); // { value: 37, done: false }
f.next(10); // { value: 52, done: true }
f.next(); // { value: undefined, done: true }
```
第一次使用next方法不能带参数，next方法的参数表示上一条yield语句的返回值

## for...of循环

`for...of`循环自动遍历Generator函数
```js
function *foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    return 5;
}

for (let val of foo()) {
    console.log(val); // 1 2 3 4
}
```
一旦next方法的返回对象的done属性为true，for...of循环则终止，且不包含该返回对象

```js
function fibonacci() {
    var rets = [0, 1];

    return function(n) {
        if (typeof rets[n] !== 'undefined') {
            return rets[n];
        }

        var ret = argument.callee(n-1) + argument.callee(n-2);
        rets[n] = ret;
        return ret;
    }  
}

var fi = fibonacci();
fi(10); // 55
```
```js
function fibonacci(n) {
    if (n < 2) {
        return n;
    }

    var [prev, curr] = [0, 1];

    while(--n) {
        [prev, curr] = [curr, prev + curr];
    }

    return curr;
}

fibonacci(10); // 55
```

## Generator.prototype.throw()

```js
var g = function *() {
    while (true) {
        try {
            yield;
        }
        catch (e) {
            if (e != 'a') {
                throw e;
            }

            console.log('内部捕获异常', e);
        }
    }
}

var i = g();
i.next();
try {
    i.throw('a');
    i.throw('b');
}
catch (e) {
    console.log('外部捕获异常', e);
}
// 内部捕获异常a
// 外部捕获异常b
```
如果Generator函数内部没有部署`try...catch`，那么遍历器的throw方法抛出的错误将被外部`try...catch`捕获

如果Generator函数内部部署了`try...catch`，那么遍历器throw方法抛出的错误不影响下一次遍历，否则遍历直接终止

## Generator.prototype.return()

遍历器的return方法可以返回给定的值，并终结Generator函数的遍历

```js
function *gen() {
    yield 1;
    yield 2;
    yield 3;
}

var g = gen();
g.next(); // { value: 1, done: false }
g.return(10); // { value: 10, done: true }
g.next(); // { value: undefined, done: true }
```

```js
function *gen() {
    yield 1;

    try {
        yield 2;
        yield 3;
    }
    finally {
        yield 4;
        yield 5;
    }
    
    yield 6;
}

var g = gen();
g.next(); // { value: 1, done: false }
g.return(10); // { value: 4, done: false }
g.next(); // { value: 5, done: false }
g.next(); // { value: 10, done: true }
g.next(); // { value: undefined, done: true }
```
如果Generator函数内部有`try...finally`，那么return方法会推迟到finally代码块执行完在执行

## yield* 语句

用来在一个Generator函数中执行另一个Generator函数

```js
function *foo() {
    yield 1;
    yield 2;
}
function *boo() {
    yield 'a';
    yield* foo();
    yield 'b';
}

for (let val of boo()) {
    console.log(val); // 'a' 1 2 'b'
}
```
yield* 语句 等同于在Generator函数内部部署一个`for...of`循环

## 作为对象属性的Generator函数

```js
let obj = {
    * generatorMethod() {

    }
}

// 等价于
let obj = {
    generatorMethod: function *() {

    }
}
```

## Generator函数中的this

## Generator函数的推导


## 含义

### Generator与状态机

```js
var clock = function *(_) {
    while (true) {
        yield _;
        console.log('tick');
        yield _;
        console.log('tock');
    }
}
```

### Generator 与 协程

协程是一种程序运行的方式，协作的线程或协作的函数

协程是以多占用内存为代价实现多任务的并行运行

## 应用

### 异步操作的同步化表达

```js
function request(url) {
    ajaxCall(url, function(response) {
        it.next(response);
    });
}

function *main() {
    var result = yield request('http://some.action');
    var resp = JSON.parse(result);
    console.log(resp);
}

var it = main();
it.next();
```

### 控制流程管理

### 部署 Iterator 接口

Generator函数可以在任意对象上部署 Iterator 接口

```js
function *iterEntries(obj) {
    let keys = Object.keys(obj);

    for (let i=0; i<keys.length; i++) {
        let key = keys[i];
        yield [key, obj[key]];
    }
} 


let obj = { x: 3, y: 4 };
for(let [key, value] of iterEntries(obj)) {
    console.log(key, value); // x 3, y 4
}
```

### 作为数据结构

Generator函数可以看做数据结构

```js
function *doStuff() {
    yield fs.readFile.bind(null, '1.txt');
    yield fs.readFile.bind(null, '2.txt');
    yield fs.readFile.bind(null, '3.txt');
}

for (let task of doStuff()) {
    task(); // task是一个函数，执行一个文件读取操作
}
```