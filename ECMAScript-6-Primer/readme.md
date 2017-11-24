# ES6要点

# 介绍

- ES6 -- ES2015 -- 最新的语言规范
- ES6规范于2015年6月完成
- 以后版本将遵循 `ES[YYYY]` 格式


# 工具集

- 要想让ES6在工作，你需要一个 **JavaScript-to-JavaScript** 的转换机
- 转换应该满足如下功能
  - 允许您将最新版本中的代码编译为较旧版本的语言
  - 随着浏览器的支持越来越好，我们将把ES2016和ES2017转到ES6+
  - 更好的源映射功能
  - 目前在生产中运行ES6源代码的最可靠的方法(尽管浏览器支持到了ES5)
- Babel
- 使用Babel将ES6转换为ES5
- 使用`babelify`将`babel`合并到`Gulp, Grount, npm run`的构建过程中
- 使用`NodeJS v4.x.x+`, Node能更好的支持ES6，这样多谢了V8
- 使用`babel-node`，将模块转化到ES5
- Babel有一个蓬勃发展的生态系统，已经支持了一些ES2016，并有插件支持


# 解构赋值

- `var {foo} = pony` == `var foo = pony.foo`
- `var {foo: baz} = pony` == `var baz = pony.foo`
- 可以提供默认值, `var {foo='bar'} = baz`, 如果`baz.foo` === `undefined` 则 `foo = 'bar'`
- `var {foo, bar: baz} = {foo: 0, bar: 1}` == `var foo = 0, baz = 1`
- 更深的. `var {foo: {bar}} = { foo: { bar: 'baz' } }` == `var bar = 'baz'`
- 可以设置别名. `var {foo: {bar: deep}} = { foo: { bar: 'baz' } }` == `var deep = 'baz'`
- `var {foo} = {}` == `var foo = undefined`
- 没有找到的深层嵌套属性会产生错误, `var {foo: {bar}} = {}`会报错
- 数组也可进行解构, `var [a, b] = [0, 1]` == `var a = 0, b = 1`
- 可以跳过数组中的项, `var [a, , b] = [0, 1, 2]` ==  `var a = 0, b = 2`
- 你可以不使用第三个变量来进行值交换, `[a, b] = [b, a]`
- 在函数参数中使用解构
  - 设置默认参数 `function foo (bar=2) {}`
  - 默认配置 `function foo (bar={ a: 1, b: 2 }) {}`
  - 变异体 `function foo ({ a=1, b=2 }) {}`
  - 如果没有提供任何东西，则默认为空对象,  `function foo ({ a=1, b=2 } = {}) {}`

# 扩展操作符和rest参数

- rest参数优于arguments参数
  - 使用方式 `function foo (...everything) {}`
  - `everything` 为所有传给foo方法的参数的数组
  - 可以在`...everything`前面列出一些命名参数, `function foo (bar, ...rest) {}`
  - 命名参数不在`...rest`中
  - `...rest` 必须是最后一个参数
- 扩展操作符， `...`
  - 扩展数组参数可以避免使用`.apply`, `fn(...[1, 2, 3])` == `fn(1, 2, 3)`
  - 更容易连接 `[1, 2, ...[3, 4, 5], 6, 7]` == `[1,2,3,4,5,6,7]`
  - 将类数组或迭代类型转换为数组, `[...document.querySelectorAll('img')]`
  - `[a, , ...rest] = [1, 2, 3, 4, 5]` ==  `var a = 1, rest = [3, 4, 5]`
  - `new Date(...[2015, 11, 8])`


# 箭头函数

- 声明函数的简单方法 `param => returnValue`
- `[1, 2].map(x => x * 2)`
- 使用方式
  - `p1 => expr` 简单的单参数，表达式返回值
  - `p1 => expr` 隐式的`return`返回`expr`的值
  - 返回一个对象时需要使用括号括起来 `() => ({ foo: 'bar' })`
  - 当有多个参数的时候需要使用括号括起来, `() => expr` || `(p1, p2) => expr`
  - 大括号可以有多个语句的代码块，如果有返回值需显式的 `return`,  `() => {}` 
- 箭头函数被绑定到当前词法作用域
  - `this` 与父作用域中的 `this` 相同
  - `this` 不能被如 `.call`, `.apply` 等方法修改
  - `arguments` 也是父函数的`arguments`; 使用 `(...args)` 来代替`arguments`

# 模板字面量

- 除了`"` 与 `'` 还可以使用 `` ` `` 来定义字符串
- 使用 `` ` `` 来定义字符串为模板字符串
- 模板字面量可以多行
- 模板字面量可以进行插值 `` `ponyfoo.com is ${rating}` `` ， `rating` 是一个变量
- 可以在大括号中使用表达式 `` `${2 * 3}` `` 或 `` `${foo()}` ``

# 对象字面量

- `{ foo: foo }` == `{ foo }`
- 计算属性名, `{ [prefix + 'Foo']: 'bar'  }`, 当 `prefix: 'moz'`, 结果为 `{ mozFoo: 'bar' }`
- 不能将计算属性名和属性值组合在一起, `{ [foo] }` 是无效的
- 对象的方法定义可以使用另一种更简洁的语法来声明, `{ foo () {} }`


# 类

- 跟传统的类不同，它只是原型继承的语法糖
- 类的声明, `class Foo {}`
- 实例方法支持对象中定义方法的方式, `class Foo { bar () {} }`
- 静态方法需要 `static` 前缀关键字, `class Foo { static isPonyFoo () {} }`
- 构造函数 `class Foo { constructor () { /*初始化*/ } }`
- 继承 `class PonyFoo extends Foo {}`


# Let & Const

- `let` `const` `var` 都可声明变量
- `let` 支持块级作用域
- `let` 提升到块级的顶部, `var` 提升到函数的顶部
- "暂时性死区" -- TDZ
  - `let foo` 被声明，它会作用到块级开始
  - 在到达声明语句之前，访问`foo`都将报错
  - 当变量在其声明到达之前被操纵时，可以帮助防止出现bug
- `const`具有跟`let`相同的特性
- `const` 声明变量必须初始化, `const foo = 'bar'`
- `const` 变量的值不能变更，如果是对引用对象，指的是引用的地址不能变，地址中的内容还是可以改变的
- 不能重复声明变量


# Symbols

- ES6新增原始类型
- 创建符号变量 `var symbol = Symbol()`
- 可以符号增加一个描述, `Symbol('ponyfoo')`
- 符号是独一无二的. `Symbol()`, `Symbol()`, `Symbol('foo')`, `Symbol('foo')` 都是不等的
- `typeof Symbol() === 'symbol'` => `true`
- `Symbol.for(key)`
  - 如果描述为 `key` 的符号变量存在, 返回这个符号变量
  - 否则使用`key`创建一个符号变量
  - `Symbol.keyFor(symbol)` 返货`symbol`的`key`
  - Symbol是全局的，包括一下方式定义的Symbol
    - `window`
    - `eval` 
    - `<iframe>`, `Symbol.for('foo') === iframe.contentWindow.Symbol.for('foo')`
- 内置的Symbol值
  - Symbol.hasInstance 对象使用 instanceof 运算符的时候会调用 对象自身的 Symbol.hasInstance 属性指定的方法
  - Symbol.isConcatSpreadable 布尔值，表示该对象使用Array.prototype.concat时是否可以展开
  - Symbol.species 方法，对象作为构造函数创造实例时会调用这个方法
  - Symbol.match 当执行str.match()时调用
- Symbol作为属性名，不会出现在 `for...in` `for...of` `Object.keys` `Object.getOwnPropertyNames`中
- 使用`Object.getOwnPropertySymbols`获取对象所有的Symbol属性，返回一个数组


# Iterators

- `Iterator`定义了如何对任何对象进行迭代，而不仅仅是数组和数组
- [Symbol.iterator]符号值用于将迭代器赋值给任何对象
- `var foo = { [Symbol.iterator]: iterable}`, 或 `foo[Symbol.iterator] = iterable`
- `iterable`是一个返回`iterator`对象的方法，该对象具有`next`方法
- `next`方法返回具有两个属性对象 `{value: *, done: boolean}`
  - `value`属性 - 迭代序列中的当前值
  - `done`属性 - 是否还有更多的项目需要进行迭代
- 有`[Symbol.iterator]`的对象是可迭代的
- 一些内置的如 `Array`, `String`, `arguments`, `NodeList` 在ES6中默认是可迭代的
- 可迭代对象可以使用`for..of`进行遍历
- 可迭代对象可以使用扩展操作符, `[...document.querySelectorAll('a')]`
- 您还可以使用`Array.from(document.querySelectorAll(' a '))`合成一个iterable序列到一个数组中
- 小心别在循环中使用`...` 或 `Array.from`产生无限循环


# Generators

- 生成器函数是一种特殊的迭代器，使用 `function* generator () {}` 语法声明
- 生成器函数使用`yield`来提交一个元素序列
- 生成器函数还可以使用`yield*`将其委托给另一个生成器函数——或者任何可迭代对象
- 生成器函数返回一个生成器对象，该对象遵循_iterable_和_iterable_协议
  - `g = generator()`, `g` 可迭代,  因为 `g[Symbol.iterator]` 是一个方法
  - `g = generator()`, `g` 是迭代器, 因为 `g.next` 是一个方法
  - 生成器对象`g`的迭代器是生成器本身 `g[Symbol.iterator]() === g`
- `Array.from(g)`, `[...g]`, `for (let item of g)`, 只是调用 `g.next()`
- 生成器函数执行在四个不同的情况下会被挂起，并记住最后一个位置
  - `yield` 表达式返回序列中的下一个值
  - `return` 语句返回序列中的最后一个值
  - `throw` 语句在生成器中停止执行
  - 到达生成器函数的末尾 `{ done: true }`
- 一旦`g`序列结束，`g.next()`只会简单的返回`{ done: true }`
- 生成器可以很容易的实现异步流的同步方式
  - 用户提供的生成器函数
  - 当异步操作发生时，用户代码被暂停
  - 调用 `g.next()`, 继续执行用户代码


# Promises

- 参照`Promises/A+`规范，在ES6之前已经被广泛的实现了
- Promises 的表现像一棵树. 通过`p.then(handler) & p.catch(handler)`添加分支
- 创建promise对象 `p`: `new Promise((resolve, reject) => { /* resolver */ })`
  - `resolve(value)` `p`将提供value值调用该回调
  - `reject(reason)` `p`将通过`reason`错误调用该回调
  - 您可以异步调用这些方法，阻塞promise树的更深层分支
- 调用`p.then` & `p.catch` 将创建另一个promise
- Promises从__pending__开始，并在__fulfilled__ 或 __rejected__时永久变更为 resolved 或 rejected 状态
- Promises 状态只能变更一次，之后就会固定为一种状态不在变更
- `.then` 处理分支 与 `.catch` 处理分支，只能执行一个
- `catch` 用于指定发生错误时的回调函数
- `Promise.resolve(value)` 创建promise对象，并设置为resolved状态，使用value值调用resolve分支
- `Promise.reject(reason)` 创建promise对象，并设置为rejected状态，使用reason值调用reject分支
- `Promise.all(...promises)` 创建promise对象，当所有`...promises`都resolved之后该promise变更为resolved，...promise的返回值组成一个数组传递给promise的回调； 其中一个rejected则该promise变更为rejected，rejected的reason传递给promise的回调
- `Promise.race(...promises)` 创建promise对象，只要...promises中有一个实例率先改变状态，promise的状态就跟着改变，那个率先改变的Promise实例的返回值，就是传递给p的回调函数


# Map

- 使用普通的JavaScript对象创建一个hashmap的通用模式
  - 允许键是任意值，甚至可以使用DOM元素或函数作为输入的键
- `Map`是可迭代的
- `var map = new Map()`
- 初始化map, `var map = new Map([['a', 1], ['b', 2]]);`
- `map.set(key, value)`设置键-值
- `map.get(key)` 获取值
- `map.has(key)` 检查是否有对应key
- `map.delete(key)` 删除对应键-值
- `for (let [key, value] of map)` 遍历
- `0 -0` `NaN`与自身，Map都视为同一个键
- Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就是两个键
- 对同一个键多次赋值，后面的值将覆盖前面的值

# WeakMap

- `WeakMap` 不可迭代，所以不能使用一些遍历方法 如`.forEach`
- `WeakMap` 键必须是引用对象
- `WeakMap` 键名所指的对象不计入垃圾回收机制，键名对象被回收后，WeakMap自动移除对应的键值对


# Set

- `Set` 没有键，只有值
- `set.add(value)`
- `set.delete(value)`
- `set.has(value)`
- `set.clear()`
- `set.keys()`
- `set.values()`
- `set.entries()`
- `set.forEach()`
- Set不会有重复值


# WeakSets

- `WeakSet` 也是不重复的值的集合
- `WeakSet` WeakSet的成员只能是对象
- 垃圾回收机制会自动回收`WeakSet`中对象所占用的内存，并不考虑对象是否存在与`WeakSet`中
- `WeakSet` 是不可遍历的


# Proxy

- `new Proxy(target, handler)`, `target` 代理的目标对象， `handler` 是代理配置
- `proxy`的默认行为是调用代理对象`target`自身行为
- 处理程序可以决定如何在常规对象属性访问语义上访问底层目标对象
- 将代理目标的引用传递给代理，对如何与`target`进行交并互保持严格的控制
- 创建一个可撤销的代理：`Proxy.revocable(target, handler)`
  - 该方法返回包含 `proxy` and `revoke` 属性的对象`var {proxy, revoke} = Proxy.revocable(target, handler)`
  - 正常配置代理 `new Proxy(target, handler)`
  - 在调用`revoke()`之后，代理将会对任何操作进行代理
- `get` -- 代理 `proxy.prop` 与 `proxy['prop']` 操作
- `set` -- 代理 `proxy.prop = value` 与 `proxy['prop'] = value`
- `deleteProperty` -- 代理 `delete` 操作
- `defineProperty` -- 代理 `Object.defineProperty`
- `enumerate` -- 代理 `for..in` 循环
- `ownKeys` -- 代理 `Object.keys`
- `apply` -- 代理 拦截函数的调用，call，apply操作
- `construct` -- 代理 `new` 操作
- `getPrototypeOf` -- 代理 内部调用 `GetPrototypeOf` -- 代理 `Object.setPrototypeOf`
- `isExtensible` -- 代理 `Object.isExtensible`
- `preventExtensions` -- 代理 `Object.preventExtensions`
- `getOwnPropertyDescriptor` -- 代理  `Object.getOwnPropertyDescriptor`


# Reflect

- `Reflect` ES6中为静态内置 跟`Math`一样
- `Reflect` 修改某些Object方法的返回结果，让其变得更合理
- `Reflect` 对象的方法与Proxy对象的方法一一对应，这就让Proxy对象可以方便的用对应的Reflect方法完成默认行为 
- `Reflect` 让Object操作都变成函数行为

# `Number`

- `0b`二进制, `0o` 八进制, `0x` 十六进制
- `Number.isNaN`, `Number.isFinite`
- `Number.parseInt`, `Number.parseFloat`
- `Number.isInteger` 检查是否为整数
- `Number.EPSILON` 帮助计算出两个数字之间可以忽略的差异 -- 例如处理 `0.1 + 0.2` 与 `0.3` 的差异
- `Number.MAX_SAFE_INTEGER` 可以用JS表示的最大整数
- `Number.MIN_SAFE_INTEGER` 可以用JS表示的最小整数
- `Number.isSafeInteger` 检查数值是否在安全范围内


# `Math`

- `Math.sign` -- 数值的符号位
- `Math.trunc` -- 数值的整数部分
- `Math.cbrt` -- 立方根的值, <code class='md-code md-code-inline'>∛‾10</code>
- ...

# `Array`

- `Array.from` -- 创建 `Array` 通过类数组对象 `arguments` ，可迭代的对象
- `Array.of` -- 类似于 `new Array(...items)`, 差别在于一个参数的时候，`new Array(3) => [undefined*3], Array.of(3) => [3]`
- `Array.prototype.copyWithin` -- 拷贝数组中的一段到数组其他位置
- `Array.prototype.fill` -- 用所提供的值填充现有数组的所有元素
- `Array.prototype.find` -- 返回第一个满足回调函数的项
- `Array.prototype.findIndex` -- 返回第一个满足回调函数的项的位置
- `Array.prototype.keys` -- 返回一个迭代器，该迭代器生成一个序列，该序列包含数组的键
- `Array.prototype.values` -- 返回一个迭代器，该迭代器生成一个序列，该序列包含数组的值
- `Array.prototype.entries` -- 返回一个迭代器，该迭代器生成一个序列，该序列包含数组的键值对
- `Array.prototype[Symbol.iterator]` -- 与 `Array.prototype.values` 一样

# `Object`

- `Object.assign` -- 属性浅复制
- `Object.is` -- 类似 `===` 操作, 但是有一点例外 `Object.is(NaN, NaN) => true; Object.is(+0, -0) => false`
- `Object.getOwnPropertySymbols` -- 返回对象所有Symbol属性
- `Object.setPrototypeOf` -- 改变原型. 等同于 `Object.prototype.__proto__` 设置操作

# Strings & Unicode

- String 操作
  - `String.prototype.startsWith` -- 字符串是否以 `value` 开始
  - `String.prototype.endsWith` -- 字符串是否以 `value` 结束
  - `String.prototype.includes` -- 字符串是否包含 `value`
  - `String.prototype.repeat` -- 返回字符串重复次数的次数
  - `String.prototype[Symbol.iterator]` -- 迭代一个unicode代码点的序列 
- Unicode
  - `String.prototype.codePointAt` -- 在字符串中给定位置以10进制表示的代码
  - `String.fromCodePoint` -- 提供 `...codepoints`代码参数, 返回由unicode表示组成的字符串
  - `String.prototype.normalize` -- 返回字符串的unicode表示的规范化版本

# Modules

- `Strict Mode` 在ES6模块系统中默认开启
- ES6模块 `export` API
- `export default value` 默认导出值
- `export var foo = 'bar'` 导出命名属性值
- `export { foo, bar }`
- `export { foo as ponyfoo }`
- `export { foo as default }`
- `import 'foo'` 加载 `foo` 模块
- `import foo from 'ponyfoo'` 将默认的导出`ponyfoo`为一个局部的`foo`变量
- `import {foo, bar} from 'baz'` 导入命名导出变量`foo,bar`
- `import {foo as bar} from 'baz'` 导入命名导出变量`foo`但是起别名为`bar`
- `import {default} from 'foo'` 导入默认的模块默认导出
- `import {default as bar} from 'foo'`
- `import foo, {bar, baz} from 'foo'` 在一个声明中混合默认的`foo`和指定的导出`bar`和`baz`
- `import * as foo from 'foo'` 导入模块命名导出
  - `foo[name]`
  - `foo.default` 默认导出