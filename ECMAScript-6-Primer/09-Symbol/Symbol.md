# Symbol

## Symbol概述
ES6加入的新的原始类型Symbol，它表示独一无二的值，JS有了7种类型

Symbol函数前不能使用new命令   
Symbol值不能与其他类型的值进行计算，否则会报错   
Symbol可以转化为布尔值，不能转化为数值

```js
var s = Symbol();
var s1 = Symbol();

typeof s; // symbol

s === s1; // false
```

## 作为属性名的Symbol

每一个Symbol都是不相等的   
Symbol值作为属性名时不能使用点运算符   
在对象内部使用Symbol值定义属性时，Symbol值必须放在方括号中

```js
var s1 = Symbol();
var s2 = Symbol();

var obj = {
    [s1]: 1,
    [s2]: 2
}

obj[s1]; // 1
```

## 属性名的遍历

Symbol作为属性名，不会出现在 `for...in` `for...of` `Object.keys` `Object.getOwnPropertyNames`中，使用`Object.getOwnPropertySymbols`获取对象所有的Symbol属性

## Symbol.for & Symbol.keyFor

Symbol.for 方法会先在全局搜索指定参数为名称的Symbol值，如果有就返回这个Symbol值，如果没有则新建一个Symbol值    
Symbol.keyFor 方法返回一个已经登记的Symbol值，如果未找到返回undefined   
iframe窗口生成的Symbol值可以在主页面得到

## 内置的Symbol值

### Symbol.hasInstance

对象使用 instanceof 运算符的时候会调用 对象自身的 Symbol.hasInstance 属性指定的方法   
`foo instanceof Foo` => `Foo.[Symbol.hasInstance](foo)`

### Symbol.isConcatSpreadable

布尔值，表示该对象使用Array.prototype.concat时是否可以展开

### Symbol.species

方法，对象作为构造函数创造实例时会调用这个方法

### Symbol.match

当执行str.match()时调用

### Symbol.replace

### Symbol.search

### Symbol.split

### Symbol.iterator

### Symbol.toPrimitive

### Symbol.toStringTag

### Symbol.unscopables