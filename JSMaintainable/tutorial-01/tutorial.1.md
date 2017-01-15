## 代码风格规范

1. 使用制表符Tab进行缩进
    a. 制表符和缩进层次对应
    b. 编辑器可设置制表符长度

2. 语句末尾总是使用分号

3. 每行代码长度不大于80字符

4. 换行，在运算符之后换行，换行增加两个层级的缩进， 例外：变量赋值换行需要跟第一行值对齐

5. 空行
    a. 函数之间
    b. 局部变量与第一条语句之间
    c. 注释之前
    d. 不同逻辑片段之间

6. 命名：驼峰命名，变量使用名词前缀，函数使用动词前缀:常用的动词： can has is get set
    ```var thisIsMyName && function getName(){}```

7. 常量命名：大写字母与下划线  
    ```var MAX_VALUE = 100;```

8. 构造函数以大写开头
    ```javascript
    function Person(){}; 
    var xxx = new Person();
    ```

9. 用加号连接需要分行的字符串
    ```javascript
    var str = 'sfsdfsdfs sdf ssadf sdf ' + 
            'sencendl sfsf sfd';
    ```

10. 数字：禁用八进制，浮点数不能省略整数部分或小数部分  
    ```javascript
    var price = .4;
    var price = 10.; 
    var num   = 010; // 八进制
    ```

11. null的使用：
    a. 用来初始化一个变量，这个变量将来可能赋值为对象
    b. 用来和一个已经初始化的变量比较
    c. 当函数期望得到一个对象参数时，用作参数传入
    d. 当函数期望返回一个对象时，用作返回值

    不适用：
    a. 不要用null检测是否传入了某个参数
    b. 不要用null检测一个未初始化的变量

12. 对象的创建：推荐使用对象字面量，不用Object构造函数创建
    ```javascript
    var obj = {
        name: 'hcxowe',
        age: 18
    };
    var obj = new Object();
    obj.name = 'hcxowe';
    obj.age = 18;
    ```

13. 数组的创建：推荐使用数组字面量，不用Array构造函数创建

14. 注释：
    a. 所有函数需要添加注释
    ```javascript
    /**
    * 说明函数的作用
    * @method createElemet
    * @parent {Node} 父节点对象
    * @type   {string} 节点类型
    * @return {Object} 创建的节点对象
    */
    function createElemet(parent, type) {
        var ele = document.createElemet(type);
        parent.appendChild(ele);
    
        return ele;
    }
    ```

    b. 代码中需要说明逻辑的地方. 特别说明都需要添加注释

15. 所有块语句都要使用花括符
    ```javascript
    if (true) {
       doSomeThing(); 
    }
    ```
    
16. 块语句间隔，推荐： () 两边添加空格
    ```javascript
    if (true) {
       doSomeThing(); 
    }
    ```

17. switch语句，推荐：
    ```javascript
    switch (type) {
        case 1: 
            break;

        case 2: 
        case 3:
            break;

        default:
            // codes
    }
    ```

18. 禁止使用with语句

19. for-in循环：遍历对象，会遍历原型继承而来的可枚举属性，使用hasOwnProperty()过滤是否是自身属性, 禁止用于遍历数组
    ```javascript
    for (item in obj) {
        if (obj.hasOwnProperty(item)) {
            console.log(item);
        }
    }
    ```

20. 变量的定义，因为存在变量声明提升，所以把变量声明起始位置，并合并var语句
    ```javascript
    function doSomeThing(ary) {
        var i = 0,
            len = ary.length;

        for (; i<len; i++) {
            // codes
        }
    }
    ```

21. 函数声明： 先声明再使用，函数声明不能出现在块语句中，否则可能出现意料之外的事情

22. 立即执行函数: 需要使用括号包裹
    ```javascript
    var method = (function($) {
        var xxx = 10;
        return {
            getSomething: function() {
                return xxx;
            }
        }
    }(jQuery));
    ```

23. 严格模式： 禁止使用全局严格模式，推荐使用函数中的严格模式

24. 相等： 使用 == 或者 != 时，会进行类型转换
    a. 数字与字符串比较，字符串会先转换成数字在进行比较
    b. 数字与布尔值比较，布尔值会先转换成数字在进行比较
    c. 一个对象与另一个不是对象比较，对象会调用valueOf或者调用toString()得到一个基本类型在进行a b 所示的转换比较

    推荐不使用 == 和 != , 而使用 === 和 !==

25. 存在将字符串当作代码来执行的地方：
    a. eval() 方法
        ```eval('alert("hi")');```
    b. Function
        ```foo = new Function('alert("hi")');```
    c. setTimeout || setInterval
        ```setTimeout('alert("hi")', 100);setInterval('alert("hi")', 100);```
    
    禁止使用eval与Function，定时器禁止传入字符串参数

26. 禁止使用基本类型包装对象：String. Number. Boolean



