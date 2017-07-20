# Promise 对象

## 概念

Promise 用来传递异步操作消息。它代表了某个未来才会知道结果的事件，并且这个事件提供统一的API供进一步处理

- Promise对象的状态不受外接影响： Pending， Resolved， Rejected 三种状态
- 一旦状态改变就不会在变，任何时候都可以得到这个结果

Promise对象可以将异步操作以同步操作的流程表达出来，避免层层嵌套的回调函数

无法取消Promise，如果不设置回调函数，promise内部抛出的错误不会反应到外部

## 基本用法

```js
var p = new Promise(function(resolve, reject) {
    setTimeout(() => {
        resolve(1); // or reject(msg)
    }, 1000);
});

p.then((data) => {
    // resolved
}, (err) => {
    // rejected
});
```

## Promise.prototype.then()

then方法第一个参数是resolved状态的回调，第二个参数是rejected状态的回调

```js
var p = new Promise(function(resolve, reject) {
    setTimeout(() => {
        resolve(1);
    }, 1000);
});

p.then((data) => {
	return 111;
}, (err) => {
    return 222;
}).then((msg) => {
    console.log(msg)
}, (err) => {
    console.log(err);
});
// 111
```
then返回一个新的Promise, 该Promise对象的状态为前一个Promise的状态

如果前一个回调函数返回一个Promise对象，则then之后的回调函数需要等到该Promise对象的状态改变

### Promise.prototype.catch()

用于指定发生错误时的回调函数

```js
var p = new Promise(function(resolve, reject) {
    throw new Error('new error');
    resolve(1);
});
p.catch((err) => {
    console.log(err);
});
// Error: new error
```
如果Promise状态已经变成resoved，在抛出错误是无效的

### Promise.all()

将多个Promise实例包装成一个新的Promise实例，
```js
var p = Promise.all([p1, p2, p3]);
```
p的状态有p1,p2,p3共同决定
- 只有 p1, p2, p3的状态都变成Resolved, p的状态才会变成Resolved，此时 p1, p2, p3的返回值组成一个数组传递给p的回调函数
- 只要 p1, p2, p3中有一个被Rejected，p的状态就编程Rejected，此时第一个被Rejected的实例的返回值会传递给p的回调函数

### Promise.race()

将多个Promise实例包装成一个新的Promise实例，
```js
var p = Promise.all([p1, p2, p3]);
```

只要p1,p2,p3中有一个实例率先改变状态，p的状态就跟着改变，那个率先改变的Promise实例的返回值，就是传递给p的回调函数

### Promise.resolve()

将现有对象转为Promise对象

如果Promise.resolve方法的参数不是具有then方法的对象，则返回一个新的Promise对象，且状态为Resolved
```js
Promise.resolve('foo');
//等价于
new Promise((resolve) => {
    resolve('foo');
})
```

### Promise.reject()

Promise.reject(reason)方法返回一个新的Promise实例，状态为Rejected，参数reason传递给实例的回调函数

### 附加两个方法done finally

```js
Promise.prototype.done = function (onFilfilled, onRejected) {
    this.then(onFulFilled, onRejected).catch(function(reason) {
        // 抛出一个全局错误
        setTimeout(() => {
            throw reason;
        }, 0)
    });
};

Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
    );
}
```

## 应用

### 加载图片

```js
const preloadImage = function (path) {
    return new Promise((resolve, reject) => {
        var image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = path;
    });
};
```

### Generator与Promise的结合

```js
function getFoo() {
    return new Promise((resolve, reject) => {
        resolve('foo');
    });
}

var g = function *() {
    try {
        var foo = getFoo();
        console.log(foo);
    }
    catch(err) {
        console.log(err);
    }
};

function run(generator) {
    var it = generator();

    function go(result) {
        if (result.done) {
            return result.value;
        }

        return result.value.then((value) => {
            return go(it.next(value));
        }, (err) => {
            return go(it.throw(err));
        });
    }

    go(it.next());
}

run(g);
```

### async函数
