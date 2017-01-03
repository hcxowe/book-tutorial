###编程实践

1. 松耦合
    当修改一个组件而不需要更改其他组件的时候，就算是松耦合，组件知道的越少，就越有利于形成整个系统

2. 将js从css中抽离: 禁用CSS表达式，其会高频率重复计算css表达式，严重影响性能
    IE8- 有个css表达式特性
    ```css
    .box {
        width: expression(document.body.offsetWidth + 'px');
    }
    ```

3. 将css从js中抽离：js修改样式通过修改DOM元素的className属性完成

    ```javascript
    element.className += " hidden";
    ```

4. 将js从html中抽离：禁止在html加入js代码，如DOM元素中加入onclick之类的紧耦合代码，script标签中的js代码

5. 将html从js中抽离：将html代码嵌入js会造成调试困难，抽离可提高代码的可维护性
    - html模板从远程服务器上获取：通过ajax拿到片段在加入页面  例如jQuery的$.load()
    - 客户端模板，客户端保存html模板 如 ```'<li><a href="{#url#}">{#name#}</a><li>'```,其中{#url#}，{#name#}在程序中被替换然后加入页面, 客户端模板可放置在html的注释节点或者自定义类型的script标签中
       
       ```javascript
       <ul id="list"><!--<li><a href="{#url#}">{#name#}</a><li>-->
       </ul>
       ```
       通过如下代码获取:
       ```javascript
       var ul = document.getElementById('list'),
            template = ul.firstChild.nodeValue;
        ```
       
       或者
       
       ```javascript
       <srcipt type="text/x-my-template" id="list-item">
            <li><a href="{#url#}">{#name#}</a><li>
       </srcipt>
       ```
       通过如下代码获取:
       ```javascript
       var script = document.getElementById('list-item'),
            template = script.text;
       ```     
       
6. 避免使用全局变量，全局变量的缺点：命名冲突. 代码脆弱. 难以测试

7. 推荐使用命名空间：定义一个大的命名空间，在其下定义多个子命名空间，然后在定义需要的变量
    ```javascript
    var YourGlobal = {
        namespace: function(ns){
            var parts = ns.split('.'),
                object = this,
                i,
                len;

            for (i=0, len=parts.length; i<len; i++) {
                if (!object[parts[i]]) {
                    object[parts[i]] = {};
                }

                object = object[parts[i]];
            }
            
            return object;
        }
    };

    YourGlobal.namespace('goldmsg.hcxowe'); 
    ```

8. 推荐使用模块： 异步模块定义（AMD），同步模块定义（CMD）

9. 如果脚本非常短，并且不需要和其他代码产生交互，可以使用立即执行函数来实现零全局变量方式
    ```javascript
    (function($, window) {
        var doc = window.document;
        //codes
    }(jQuery, window));
    ```

10. 事件处理：隔离应用逻辑：将应用逻辑从事件处理程序中抽离出来。eg.
    ```javascript
    var MyApplication = {
        handleClick: function(event) {

            // event的相关操作锁定在此方法中进行处理
            event.preventDefault();
            event.stopPropagation();

            // 提取必要信息传入showPopup，不要整个传入event
            this.showPopup(event.clientX, event.clientY);
        },
        showPopup: function(x, y) {
            var pop = docment.getElementById('popup');
            pop.style.left = x + 'px';
            pop.style.top = y + 'px';
        }
    };

    document.addEventListener('click', function(){
        MyApplication.handleClick(event);
    });

    // 可以这样调用测试应用逻辑是否正确
    MyApplication.showPopup(10, 10);
    ```

11. 检测：
    - 检测原始值使用typeof： typeof xxx; 返回 string number boolean undefined function object， 
        ```javascript
        typeof null; // object
        typeof xsfdsf; // undefined  typeof检测一个未声明的变量时不会报错，输出undefined
        ```
    
    - 检测引用值使用instanceof：instanceof会检测构造函数与原型链
        ```javascript
        new Date() instanceof Date; //true
        new RegExp() instanceof RegExp; //true
        new Error() instanceof Error; //true
        [] instanceof Object; // true, 每个对象都继承自Object
        var Person = function() {};
        var pople = new Person();
        pople instanceof Person; // true instanceof是唯一用于检测自定义类型的方法
        ```

        instanceof检测存在一个问题：
        使用iframe时，如果父子都定义了Person类型，当父的一个Person实例对象传入子iframe中时，使用instanceof检测该对象不会认为是子iframe中定义的

    - 检测函数：
        instanceof typeof都可以用于检测函数，
        但是instanceof不能跨iframe使用，
        typeof在检测IE8-DOM的方法（如getElementById）的时候返回Object，这是因为IE实现DOM的机制导致的，检测DOM方法可以使用in来检测是否存在该方法
        eg. ```"querySelectorAll" in document; // true ```
        
    - 检测数组：也是由于跨iframe时，instanceof检测不准，故使用如下通用方法
        ```javascript
        function isArray(array) {
            if (typeof Array.isArray === 'function') {
                return Array.isArray(array);
            }
            else{
                return Object.prototype.toString.call(arrya) === "[object Array]";
            }
        }
        ```

    - 检测属性：使用 in 操作符判断对象是否存在一个属性，会搜索原型链； hasOwnProperty()方法用于判断对象自身是否存在某个属性；

12. 将配置数据从代码中分离
    什么是配置数据：url 需要展现给用户的字符串 重复的值 配置项 任何可能发生变更的值

13. 禁止修改不是自己创建的对象：
    原生对象（Object，Array，Function）
    DOM对象 （document）
    BOM对象 （window）
    类库对象 （jQuery） 

14. 阻止修改的方法：
    Object.prevertExtension - 防止扩展：不能添加，可以删除修改 
    Object.seal - 密封：防止扩展并且不能删除已存在的属性方法
    Object.freeze - 冻结：防止扩展&密封并不能修改已存在的属性方法


15. 浏览器嗅探方法：特性检测 》 用户代理检测， 尽可能避免使用特性推测跟浏览器推测
    - User-Agent检测  chrome输出 "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.87 Safari/537.36"
    - 特性检测：对特定的功能进行嗅探
  
        ```javascript
        if (document.getElementById) {
            // doSomething
        }
        ```
    - 避免特性推断：从一个特性推断另一个特性的存在
    
        ```javascript
        if ( window.ActiveXObject) {
            element = document.all[xxx];
        }
        ```
    - 避免浏览器推断