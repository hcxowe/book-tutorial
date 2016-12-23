// ### 原型模式 -- 基于现有对象模板，通过克隆方式创建对象的模式
var a = {
    x: 1,
    y: 2,
    getName: function () {
        return this.x;
    },
    arys: [1, 2]
};

var b = Object.create(a);
var c = Object.create(a);
b.prototype === c.prototype;
a.x = 111;
b.x; // 111;

// 注：通过Object.create创建的对象其原型是一样的，修改其中一个原型中的属性都将影响到其他对象

// 其他方式的原型模式
var objInherit = function(obj) {
    function F() {};
    F.prototype = obj;
    return new F();
};
