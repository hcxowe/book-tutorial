// 对象的创建方式

// a b c 都是空对象， 但是a、b对象都有一个Object作为原型，c原型位null
var a = {},
    b = new Object(),
    c = Object.create(null);

// 设置对象属性方式
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

