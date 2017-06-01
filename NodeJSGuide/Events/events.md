## events (事件)

所有能触发事件的对象都是 EventEmitter 类的实例

```js
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('发生了一个事件！');
});

myEmitter.emit('event');
```

### 给监听器传入参数与 this

eventEmitter.emit() 方法允许将任意参数传给监听器函数。 
当一个普通的监听器函数被 EventEmitter 调用时，标准的 this 关键词会被设置指向监听器所附加的 EventEmitter。

```js
const myEmitter = new MyEmitter();
myEmitter.on('event', function(a, b) {
  console.log(a, b, this);
  // 打印:
  //   a b MyEmitter {
  //     domain: null,
  //     _events: { event: [Function] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined }
});

myEmitter.emit('event', 'a', 'b');
```

### 错误事件

当 EventEmitter 实例中发生错误时，会触发一个 'error' 事件

最佳实践，应该始终为 'error' 事件注册监听器

```js
const myEmitter = new MyEmitter();
myEmitter.on('error', (err) => {
  console.error('有错误');
});

myEmitter.emit('error', new Error('whoops!'));
// 打印: 有错误
```

### EventEmitter 类

#### 'newListener' 事件

EventEmitter 实例会在一个监听器被添加到其内部监听器数组之前触发自身的 'newListener' 事件

事实上，在添加监听器之前触发事件有一个微妙但重要的副作用： 'newListener' 回调中任何额外的被注册到相同名称的监听器会在监听器被添加之前被插入

```js
const myEmitter = new MyEmitter();
// 只处理一次，所以不会无限循环
myEmitter.once('newListener', (event, listener) => {
  if (event === 'event') {
    // 在开头插入一个新的监听器
    myEmitter.on('event', () => {
      console.log('B');
    });
  }
});
myEmitter.on('event', () => {
  console.log('A');
});
myEmitter.emit('event');
// 打印:
//   B
//   A
```


#### 'removeListener' 事件



### EventEmitter.defaultMaxListeners 

每个事件默认可以注册最多 10 个监听器。   
单个 EventEmitter 实例的限制可以使用 emitter.setMaxListeners(n) 方法改变。  
所有 EventEmitter 实例的默认值可以使用 EventEmitter.defaultMaxListeners 属性改变

### addListener(type, handler) & on(type, handler)

添加 handler 函数到名为 type 的事件的监听器数组的末尾

### emit(type, [,...args])

### eventNames()

返回一个列出触发器已注册监听器的事件的数组。 数组中的值为字符串或符号

### getMaxListeners() & setMaxListeners(n)

返回 EventEmitter 当前的最大监听器限制值，该值可以通过 emitter.setMaxListeners(n) 设置或默认为 EventEmitter.defaultMaxListeners

### listenerCount(eventName)

返回正在监听名为 eventName 的事件的监听器的数量

### listeners(eventName)

返回名为 eventName 的事件的监听器数组的副本

### once(eventName, listener)

添加一个单次 listener 函数到名为 eventName 的事件。 下次触发 eventName 事件时，监听器会被移除，然后调用

### prependListener(eventName, listener)

添加 listener 函数到名为 eventName 的事件的监听器数组的开头。   
不会检查 listener 是否已被添加。 多次调用并传入相同的 eventName 和 listener 会导致 listener 被添加与调用多次

### prependOnceListener(eventName, listener)

添加一个单次 listener 函数到名为 eventName 的事件的监听器数组的开头。 下次触发 eventName 事件时，监听器会被移除，然后调用

### removeAllListeners([eventName])

移除全部或指定 eventName 的监听器

### removeListener(eventName, listener)

从名为 eventName 的事件的监听器数组中移除指定的 listener  
removeListener 最多只会从监听器数组里移除一个监听器实例。  
如果任何单一的监听器被多次添加到指定 eventName 的监听器数组中，则必须多次调用 removeListener 才能移除每个实例

**注意，一旦一个事件被触发，所有绑定到它的监听器都会按顺序依次触发。 这意味着，在事件触发后、最后一个监听器完成执行前，任何 removeListener() 或 removeAllListeners() 调用都不会从 emit() 中移除它们。 随后的事件会像预期的那样发生**