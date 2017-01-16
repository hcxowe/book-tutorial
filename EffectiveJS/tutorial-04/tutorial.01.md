## 对象与原型

### 理解prototype、getPrototype、__proto__之间的不同

- Class.prototype用于建立通过new Class()创建的对象的原型
- Object.getPrototype是ES5中Object的方法，用于获取对象的原型
- __proto__是获取对象的原型对象的非标准方法
- 类是由一个构造函数和一个关联的原型组成

### 使用Object.getPrototype而非__proto__来获取对象原型

- 拥有null原型的对象没有__proto__属性
- 在不支持Object.getPrototype的环境中实现该函数

### 始终不要修改__proto__属性

### 使构造函数与new运算符无关

```js
// 通过重新显示调用new创建对象
function User(name) {
    if (!(this instanceof User)) {
        return new User(name);
    }

    this.name = name;
}
```
```js
// 通过Object.create
function User(name) {
    var self = this instanceof User 
               ? this
               : Object.create(User.prototype);

    self.name = name;

    return self;
}
```

### 在原型中存储方法

- 将方法存储在实例对象中将创建函数的多个副本，会导致内存占用高，但是不涉及在原型链上查找方法
- 将方法存储在原型中，多个实例共享该方法，内存占用低，涉及原型链查找方法

### 使用闭包存储私有数据

```js
function User(name) {
    this.getName = function() {
        return name;
    }
}

var user = new User('hcxowe');
user.getName(); // hcxowe
```

### 只将实例状态存储在实例对象中

### 认识到this变量的隐式绑定问题

- this变量的作用域总是由其最近的封闭函数所确定
- 使用一个局部变量是的this绑定对于内部函数是可用的

### 在子类的构造函数中调用父类的构造函数

### 不要重用父类的属性名称

### 避免继承标准类

- 标准类创建的对象都有一个[[Class]]属性，使用Object.prototype.toString可以输出这个属性的字符串
- 通过属性委托避免使用标准类的继承

### 将原型视为实现细节

- 对象是接口，原型是实现
- 避免检查无法控制的对象的原型结构
- 避免检查无法控制的对象内部的属性

### 避免使用轻率的猴子补丁

- 为不支持一些对象方法的环境实现该方法称为补丁
