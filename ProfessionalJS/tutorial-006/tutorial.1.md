## 面向对象的程序设计

### 理解对象

#### 属性类型

##### 属性类型 

- Configurable
    - 能否通过delete删除属性从而重新定义属性
    - 能否修改属性的特性
    - 能否把属性修改为访问器属性
    - 默认为true

- Enumerable
    - 能否通过for-in循环返回属性
    - 默认为true

- Writable
    - 能否修改属性的值
    - 默认为true

- Value
    - 属性的数据值

```js
Object.defineProperty(obj, 'porperty', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: 'value'
});
```
- 一旦属性设置为不可配置就不能在变回可配置了

##### 访问器属性

- Configurable
    - 能否通过delete删除属性从而重新定义属性
    - 能否修改属性的特性
    - 能否把属性修改为访问器属性
    - 默认为true

- Enumerable
    - 能否通过for-in循环返回属性
    - 默认为true

- Get
    - 读取属性时调用的函数
    - 默认为undefined
    
- Set
    - 设置属性时调用的函数
    - 默认为undefined

```js
    Object.defineProperty(Obj, 'property', {
        get: function() {
            return this.property;
        },
        set: function(value) {
            this.property = value;
        }
    });
```
- 访问器属性不包含数据值
- 包含一对getter与setter函数

#### 定义多个属性

```
    var book = {};
    Object.defineProperties(book, {
        _year: {
            writable: true, 
            value: 2017
        },

        edition: {
            configurable: false,
            value: 0
        },

        year: {
            get: function() {
                return this._year;
            }
        }
    });
```

#### 读取属性的特性

```js
    // getOwnPropertyDescriptor 只能取得自身属性
    var descriptor = Object.getOwnPropertyDescriptor(book, '_year');
    descriptor.value; // 2017
    descriptor.writable; // true
    descriptor.configurable; // false
    descriptor.enumerable; // false
```

> 使用Object.defineProperty或者Object.defineProperties定义的属性，未显式指定的特性值为false或者undefined

> obj.xxx = 123; 这种方式定义属性时，特性默认为true

### 创建对象

#### 工厂模式
```js
    function createPerson(name, age) {
        var obj = {};
        obj.name = name;
        obj.age  = age;

        return obj;
    }
```

#### 构造函数模式
```js
    function Person(name, age) {
        this.name = name;
        this.age  = age;
    }

    var per1 = new Person('hcx', 'age');
```
- 创建新对象
- 将新对象作为构造函数的作用域
- 执行构造函数
- 返回新对象

#### 原型模式
```js
    function Person() {
    }

    Person.prototype.name = 'hcx';
    Person.prototype.sayName = function() {
        cnosole.log(this.name);
    }

    var per = new Person('hcx', 28);
    per.sayName(); // hcx
```
- prototype
- \_\_proto\_\_
- prototype.constructor
- isPrototype()
- Object.getPrototypeOf()
- 实例属性屏蔽原型属性
- Object.hasOwnProperty()，从Object继承而来，会有覆盖的可能
- Object.keys() 返回对象上自身的可枚举属性的字符串数组
- Object.getOwnPropertyNames() 获取自身属性，无论是否可枚举

#### 组合使用构造函数模式和原型模式

```js
    function Person(name, age) {
        this.name = name;
        this.age  = age;
    }

    Person.prototype.sayName = function() {
        cnosole.log(this.name);
    }

    var per = new Person('hcx', 28);
    per.sayName(); // hcx
```

#### 动态原型模式

```js
    function Person(name, age) {
        this.name = name;
        this.age  = age;
        if (typeof this.sayName === 'undefined') {
            Person.prototype.sayName = function() {
                console.log(this.name);
            }
        }
    }

    var per = new Person('hcx', 28);
    per.sayName(); // hcx
```

#### 寄生构造函数模式

```js
    function Person(name, age) {
        var o = {};
        o.name = name; 
        o.age  = age;
        o.sayName = function() {
            console.log(this.name);
        };

        return o;
    }
```

#### 稳妥构造函数模式

```js
    function Person() {
        var name = 'hcx';
        var age  = 28;

        var o = {};
        o.sayName = function() {
            console.log(name);
        };

        return o;
    }
```

### 继承

#### 借用构造函数

```js
    function SuperType() {
        this.colors = ['red', 'blue', 'green'];
    }

    function SuberType() {
        SuperType.call(this);
    }

    var suber = new SuberType();
    suber.colors; // ["red", "blue", "green"]
```

#### 组合继承

```js
    function SuperType(name) {
        this.name = name;
        this.colors = ['red', 'blue', 'green'];
    }

    SuperType.prototype.sayName = function() {
        console.log(this.name);
    }

    function SuberType(name) {
        SuperType.call(this, name);
    }

    SuberType.prototype = new SuperType();
    SuberType.prototype.constructor = SuberType;
    SuberType.prototype.showColors = function() {
        console.log(this.colors.toString());
    }

    var suber = new SuberType('hcx');
    suber.sayName(); // hcx
    suber.showColors(); // red,blue,green
```

#### 原型式继承

```js
    function createObject(proto) {
        function F(){}

        F.prototype = proto;

        return new F();
    }
```
- ES5中，Object.create()标准化了原型式继承

#### 寄生式继承

#### 寄生组合式继承

```js
    function inheritPrototype(subType, superType) {
        var prototype = Object(superType.prototype);
        prototype.constructor = subType;
        subType.prototype = prototype;
    }

    function SuperType(name) {
        this.name = name;
        this.colors = ['red', 'blue', 'green'];
    }

    SuperType.prototype.sayName = function() {
        console.log(this.name);
    }

    function SuberType(name) {
        SuperType.call(this, name);
    }

    inheritPrototype(SuberType, SuperType);

    SuberType.prototype.newMethod = function() {
        console.log('method');
    }

    var suber = new SuberType('hcx');
```

### 小结

- JS支持面向对象编程，但是没有类与接口
- 创建对象方式
    - 工厂模式
    - 构造函数模式
    - 原型模式

- JS通过原型链实现继承

- 继承模式
    - 原型式继承
    - 寄生式继承
    - 寄生组合式继承