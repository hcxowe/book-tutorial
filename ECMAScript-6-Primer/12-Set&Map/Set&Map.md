# Set与Map数据结构

## Set

类似于数组，成员的值都是唯一的

向Set 加入值不会发生类型转换，但是NaN加入时是等于自身的

```js
var set = new Set([1,2,3,4,5,4,3,2,1,NaN,NaN]);
[...set]; // [1,2,3,4,5,NaN]
```

### 属性

- Set.prototype.constructor
- Set.prototype.size

### 方法

- add(value)
- delete(value)
- has(value)
- clear()
- keys()
- values()
- entries()
- forEach()

keys方法与values方法的行为一致，因为Set没有键名

## WeakSet

WeakSet也是不重复的值的集合

WeakSet的成员只能是对象

垃圾回收机制会自动回收WeakSet中对象所占用的内存，并不考虑对象是否存在与WeakSet中

WeakSet是不可遍历的

方法
- add(value)
- delete(value)
- has(value)

WeakSet可以用来储存DOM节点，而不用担心节点移除时会引发内存泄漏

## Map

Map结构提供`值-值`的对应

对同一个键多次赋值，后面的值将覆盖前面的值

Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就是两个键

`0 -0` `NaN`与自身，Map都视为同一个键

### 属性与方法

- size
- set(key, value)
- get(key)
- has(key)
- delete(key)
- keys()
- values()
- entries()
- forEach()

## WeakMap

只接受对象作为键名

键名所指的对象不计入垃圾回收机制，键名对象被回收后，WeakMap自动移除对应的键值对

专用场合：它的键所对应的对象可能会在将来消失， 如 DOM节点的移除