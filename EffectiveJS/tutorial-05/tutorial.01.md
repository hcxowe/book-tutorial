## 数组和字典

### 使用Object的直接实例构造轻量级的字典

- 使用对象字面量构建轻量级字典
- 轻量级字典应该是Object.prototype的直接子类，使用for...in循环时不会被原型污染

### 使用null原型防止原型污染

```js
// ES5存在Object.create方法
var obj = Object.create(null);
Object.getPrototypeOf(obj) === null; //true

// 非ES5下 使用非标准属性__proto__
var obj1 = {__proto__: null};
obj1 instanceof Object; // false;
```
- 优先使用ES5的Object.create方法，避免使用第二种方法，__proto__可移植性弱
- 不要使用__proto__作为字典中的key

### 使用hasOwnProperty方法避免原型污染

- hasOwnProperty方法可判断属性是否为对象自身属性
- 使用Object.prototype.hasOwnProperty.call(obj, xxx)来避免该方法被覆盖的影响
```js
var obj1 = {x:2};
Object.prototype.hasOwnProperty.call(obj1, 'x'); //true
```

### 使用数组不要使用字典来存储有序集合

- for...in循环时，无法保证枚举的顺序
- 使用数组不要使用字典来存储有序集合

### 不要在Object.prototype中增加可枚举的属性

- 避免在Object.prototype中增加属性
- 使用一个函数来代替Object.prototype方法
- 使用ES5的Object.defineProperty方法将属性定义为不可枚举的属性

### 避免在枚举期间修改对象

- 当使用for...in循环枚举一个对象的属性时，确保不要修改该对象
- 当迭代一个对象时，如果对象需要在循环期间被修改，应该使用for循环或者while循环
- 对于有序的数据结构优先使用数组

### 数组迭代要优先使用for循环而不是for...in

```js
var ary = [1,2,3,4,5];
var total = 0;
for (i in ary) {
    total += i;
}
total;//"001234"
```
- for...in循环枚举数组的索引
- 对象属性始终是字符串

### 迭代方法优于循环

- 使用迭代方法 forEach map 替换 for循环
- 在需要提前终止循环的情况下，优先使用for循环，some和every方法也可提前终止循环
- forEach的函数参数如果返回false不会终止循环

```js
var ary = [1,2,3,4,5];
ary.forEach(function(value) {
    console.log(value);

    return false;
});
// 1 2 3 4 5
```

### 在类数组对象上复用通用的数组方法

```js
var arylike = {'0':'a', '1':'b', '2':'c', length: 3};
var ary = Array.prototype.slice.call(arylike);
ary; // ['a', 'b', 'c']
```
- 对于类数组对象，通过提取方法对象并使用其call方法来复用通用的Array方法
- 任意一个具有索引属性和恰当length属性的对象都可以使用通用的Array方法

### 数组字面量优于数组构造函数

- 数组构造函数第一个参数是数字则构建行为是不同的
```js
var ary1 = new Array(10);
var ary2 = new Array(1,2,3);
ary1; //[undefined*10]
ary2; //[1,2,3]
```