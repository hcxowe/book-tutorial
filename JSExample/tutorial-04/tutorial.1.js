// ### 保持对象私有
// 闭关特性：内部函数总能访问外部函数的变量和参数，即使外部函数返回了。
// 私有数据成员命名以一个'_'开头
function Article(title, author) {
    var _title = title;
    this.author = author;

    this.getTitle = function() {
        return _title;
    }

    this.setTitle = function(title) {
        _title = title;
    }
}

var article = new Article('html5', 'hcxowe');
article._title; // undefined;
article.getTitle(); // html5


// ### 对象属性的更多控制
/**
 *  Object.defineProperty(target, key, {
 *      value: xxxx, // 属性默认值
 *      set: function(value) {}, // 属性的setter
 *      get: function() {}, // 属性的getter
 *      writable: false, // 是否可以赋值， 默认为false
 *      configurable: false, // 是否可以通过属性描述符来修改， 默认为false
 *      enumerable: false // 是否可以被枚举， 默认为false
 *  });
 * 
 *  Object.preventExtensions(target); // 对象不能添加新的属性，可以修改删除
 *  Object.seal(target); // 不能添加，删除属性， 但是可以修改属性包括使用defineProperty修改属性配置
 *  Object.freeze(target); // 冻结对象，不能进行添加 删除 修改属性包括使用defineProperty修改属性配置
 */
var data = {};
Object.defineProperty(data, 'type', {
    value: 'book',
    enumerable: false,
    configurable: false,
    writable: false
});

var group = 'history';
Object.defineProperty(data, 'category', {
    get: function() {
        return group;
    },
    set: function(value) {
        group = value;
    },
    enumerable: false,
    configurable: false,
    writable: false
});

// ### Function.bind在定时器上的应用，下面是一段输出倒计时的功能
function Counter(id, start, finish) {
    this.count = this.start = start;
    this.finish = finish;
    this.id = id;
    this.countDown = function() {
        if (this.count == this.finish) {
            this.countDown = null;
            return;
        }

        console.log(this.count--);
        setTimeout(this.countDown.bind(this), 1000);
    }
}

var theCounter = new Counter('id', 10, 0);
theCounter.countDown();
// 注： 如果去掉bind或者Function.bind未定义的话，定时器在执行的时候找不到this


// bind的profile
Function.prototype.binder = function(context) {

    var args = Array.prototype.slice.call(arguments, 1),
        fn = this;
    
    // 如果存在bind方法则使用提供的bind方法
    if (typeof fn.bind === 'function') {
        return fn.bind(context, args);
    }
    else {
        return function() {
            args = args.concat(Array.prototype.slice.call(arguments));
            fn.apply(context, args);
        }
    }
    
};


// ### for循环定时器输出 0-9
for (var i = 0, len = 10; i < 10; i++) {
    setTimeout((function(i){return function(){console.log(i);}}(i)), 1000);
}