// ### 模块模式  Moudle Model
// 实现模块的方法： 对象字面量、Module模式、AMD、CommonJS、ECMAScript Harmony

// #### 对象字面量实现模块
var myModule = {
    moduleName: 'myModule',

    // 模块配置
    myConfig: {

    },

    // 模块方法
    myMethod1: function() {

    },
    myMethod2: function() {

    },
    myMethod3: function() {

    }
};

// #### Module模式
var libraryModule = (function() {
    
    // 私有变量 保存所有书
    var books = [];

    // 私有方法
    function doPrivateSomething() {

    }

    // 返回公有对象
    return {

        // 添加书籍
        addBook: function(name, price) {
            books.push({
                name: name,
                price: price
            });
        },

        // 获取书籍数量
        getCount: function() {
            return books.length;
        },

        // 获取所有数据的总价格
        getTotalPrice: function() {
            var i = 0,
                len = books.length,
                total = 0;

            for (; i < len; i++) {
                total += books[i].price;
            }

            return total;
        }
    };
}());

libraryModule.addBook('js', 10);
libraryModule.addBook('css', 12);
libraryModule.addBook('html', 14);

libraryModule.getCount(); // 3
libraryModule.getTotalPrice(); // 36

// Module模式的变化

// ##### 引入混入 -- 把全局变量引入到模块的匿名函数
var hcxModule = (function($, window) {
    
    function getElement(selector) {
        return $(selector);
    }
    
    function getDocument() {
        return window.document;
    }
    
    return {
        // codes
    };

}(jQuery, window));

// 安全的命名空间方法
// 在一个全局变量下得到一个指定路径的对象
var myModule = {};

// ns以.分隔
myModule.namespace = function(ns) {

    // 不是字符串参数，返回myModule
    if (!ns || (typeof ns !== 'string')) {
        return this;
    }

    var ary = ns.splict('.'),
        i   = 0,
        len = ary.length,
        that= this;

    for (; i < len; i++) {

        // 如果不存在则创建一个空对象
        if (!that[ary[i]]) {
            that[ary[i]] = {};
        }

        that = that[ary[i]];
    }

    return that;
};

var myNS = myModule.namespace('hcx.owe');


// ####缺点
// 1. 不方便修改模块成员的可见性
//２．


// ### Revealing Module 揭示模块
// Module模式的一种稍有改进的模式
var myRevealingModule = (function() {

    var privateCounter = 0;

    function privateFun() {
        privateCounter++;
    }

    function publicFun() {
        publicIncrement();
    }

    function publicIncrement() {
        privateFun();
    }

    function publicGetCount() {
        return privateCounter;
    }

    return {
        start: publicFun,
        increment: publicIncrement,
        count: publicGetCount
    };
}());

// 这种模式私有方法在声明的时候已经确定了实现的方式
// 模式中的私有方法如果调用了公有的方法，返回的对象中的引用该公有方法的属性在之后变更了，则私有方法还是引用的模式中的公有方法
// 也就是说返回对象中的公有方法与模式实现中的公有方法是脱钩的