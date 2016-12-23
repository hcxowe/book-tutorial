// ### Facade 外观模式
// 提供一个方便的高层次的接口，隐藏底层的真是复杂实现   
// 就像JQUERY封装了一些复杂的DOM兼容性操作以提供一套简单的接口以供使用

//  一个简单的外观模式
var addEvent = function (ele, type, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(type, fn, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + type, fn);
    } else {
        ele['on' + type] = fn;
    }
};

// 注： 当使用Facade模式时，要试着了解设计的任何性能成本，并确认是否值得抽象