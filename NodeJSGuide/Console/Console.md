## console (控制台)

### console.assert

简单的断言测试，验证 value 是否为真。 如果不为真，则抛出 AssertionError

```js
console.assert(true, 'does nothing');
// 通过

console.assert(false, 'Whoops %s', 'didn\'t work');
// AssertionError: Whoops didn't work
```

### console.dir

查看一个对象中的内容并且将该对象的信息输出到控制台中

```js
console.dir({x: 1, y: 2}, {
    showHidden: false, // 是否显示对象中的不可枚举属性和 symbol 属性
    depth: 2,   // 告诉 util.inspect() 函数当格式化对象时要递归多少次
    colors: false // 如果为 true，则输出会带有 ANSI 颜色代码
});
// { x: 1, y: 2}
```

### console.error & console.warn

打印到 stderr，并带上换行符

### console.info & console.log

打印到 stdout，并带上换行符

### console.time & console.timeEnd

启动一个定时器，用以计算一个操作的持续时间。 定时器由一个唯一的 label 标识。 当调用 console.timeEnd() 时，可以使用相同的 label 来停止定时器，并以毫秒为单位将持续时间输出到 stdout。 定时器持续时间精确到亚毫秒。

```js
console.time('100-elements');
for (let i = 0; i < 100; i++) {
  ;
}
console.timeEnd('100-elements');
// 打印 100-elements: 225.438ms
```

### console.trace

打印字符串 'Trace :' 到 stderr ，并通过 util.format() 格式化消息与堆栈跟踪在代码中的当前位置

```js
console.trace('trace');
Trace: trace
    at repl:1:9
    at sigintHandlersWrap (vm.js:22:35)
    at sigintHandlersWrap (vm.js:96:12)
    at ContextifyScript.Script.runInThisContext (vm.js:21:12)
    at REPLServer.defaultEval (repl.js:340:29)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)
    at REPLServer.<anonymous> (repl.js:538:10)
    at emitOne (events.js:101:20)
    at REPLServer.emit (events.js:188:7)
```

