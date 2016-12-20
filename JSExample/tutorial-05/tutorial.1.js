// ## javascript直接访问用户界面

// ### 访问一个特定的页面元素，并且找到其父元素与子元素 
/**
 * getElementById
 * getElementsByTagName
 * getElementsByClassName
 * querySelector
 * querySelectorAll
 */

var ele = document.getElementById('ider');
var parent = ele.parentNode;
var childs = ele.childNodes;

// 通过childNodes获取子节点时，IE8会忽略空白文本节点

// imgs是一个NodeList类对象，文档之后发生了变更会反映到该集合中：如果新增一个img也会加入集合中
var imgs = document.getElementsByTagName('img'); 
// 获取第三个img节点对象
imgs.item(2); 

// imgs是一个NodeList类对象，文档之后发生了变更不会反映到该集合中
var images = document.querySelectorAll('img');


// ### 设置节点的CSS样式属性
/**
 * createAttribute
 * setAttribute
 */

// 需要使用驼峰命名style的属性
ele.style.backgroundColor = 'green';
ele.setAttribute('style', 'background-color:red;');
ele.setAttribute('class', 'red-class');

// 获取计算样式
window.getComputedStyle && window.getComputedStyle(ele).getPropertyValue('background-color'); // 返回ele最后计算出来的背景色
// IE不支持getComputedstyle,它使用节点的currentStyle来获取, 属性使用驼峰
ele.currentStyle && ele.currentStyle['backgroundColor']; 


// ### 对无序列表应用条纹主题
/**
 * ul>li*10
 * 现代浏览器可以使用css来设置 li:nth-child(odd/even){background-color:#ccc;}
 * 现代浏览器也可以通过js的querySelectorAll('li:ntn-child(odd/even)')获取节点设置background-color来实现
 * 对于IE8不支持该伪元素选择器，只能通过获取所有li，计算奇偶来设置background-color来实现
 */

try {
    var lis = document.querySelectorAll('li:nth-child(2n+1)');
    for (var i = 0, len = lis.length; i < len; i++) {
        lis[i].setAttribute(style, 'background-color:#ccc');
    }   
}
catch (e) {

}

// IE8-
//var lies = document.getElementsByTagName('li');
try {
    var lies = document.querySelectorAll('li');
    for (var i = 0, len = lies.length; i < len; i++) {
        if ((i + 1) % 2) {
            lies[i].setAttribute('style', 'background-color:#ccc');
        }
    }
}
catch (e) {

}

// ### 节点操作方法
/**
 * createElement(type)
 * createTextNode(str)
 * insertBefore(ele)
 * appendChild(ele)
 * removeChild(ele)
 */

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

// 渐出
var fadingObject = {
    yellowColor: function(val) {
        return '#ffff' + val;    
    },
    fade: function(id, start, finish) {
        this.count = this.start = start;
        this.finish = finish;
        this.id = id;
        this.countDown = function() {
            this.count += ~~(this.finish-this.start)/50;
            if (this.count >= this.finish) {
                document.getElementById(this.id).style.backgroundColor = 'transparent';
                this.countDown = null;
                return;
            }

            document.getElementById(this.id).style.backgroundColor = this.yellowColor(this.count);
            setTimeout(this.countDown.binder(this), 50);
        };
    }
};

fadingObject.fade("iderd", 0, 1000);
fadingObject.countDown();