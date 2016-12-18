// ### 构造器模式   Constructor Model

// ##### 对象的创建方式

// a b c 都是空对象， 但是a、b对象都有一个Object作为原型，c原型位null
var a = {},
    b = new Object(),
    c = Object.create(null);

// #### 设置对象属性方式
a.name = 'hcxowe';
a[age] = 28;
Object.defineProperty(a, 'work', {
    value: 'coder',
    writable: false,
    configurable: false,
    enumerable: false
});

Object.definePropertys(a, {
    'color': {
        value: 'blue',
        writable: false,
        configurable: false,
        enumerable: false
    },
    'shoew': {
        value: 42,
        writable: false,
        configurable: false,
        enumerable: false
    }
});

// a 最后为 Object {name: "hcxowe", age: 28, work: "coder", color: "blue", shoew: 42}

// 遍历a，设置enumerable为false的属性都不会被遍历出来
for (var item in a) {
    console.log(item);
}
// name age

// #### 通过Object.create 原型继承
var pubObj = {name: 'pub', getName: function(){console.log(this.name);}};
var subObj = Object.create(pubObj);
subObj.time = new Date();

subObj.getName(); // pub
subObj.time; // Sun Dec 18 2016 08:46:39 GMT+0800 (中国标准时间)

// ### 基本构造器
function Person(name, age, work) {
    this.name = name;
    this.age  = age;
    this.work = work;

    this.getName = function() {
        return this.name;
    }
}

var man = new Person('hcx', 28, 'coder');
man.getName(); // name

// #### 带原型的构造器
function Person(name, age, work) {
    this.name = name;
    this.age  = age;
    this.work = work;
}

Person.prototype = {
    getName: function(){
        return this.name;
    }
};

var man = new Person('hcx', 28, 'coder');
man.getName(); // name