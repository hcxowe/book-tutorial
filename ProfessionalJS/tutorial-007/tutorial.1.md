## 函数表达式

### 函数声明 函数表达式

### 递归

```js
    var factorial = function f(n) {
        if (n < 1) {
            return 1;
        }

        return n * f(n-1);
    }
```
- 命名函数只在函数内部有效

### 闭包

- 闭包指有权访问另一个函数作用域中的变量的函数
- 闭包可能会导致占用内存过多

### 模仿块级作用域

- JS会忽略重复声明的变量
- 函数声明之后不能跟括号
- 函数表达式之后可以跟括号
```js
    function() {}(); // error
    (function() {})(); // right
```

### 私有变量

```js
    function MyObject() {
        var privateVar = 10;

        function getPrivateVar() {
            return privateVar;
        }

        this.publicMethod = function() {
            privateVar++;
            return getPrivateVar();
        }
    }

    var obj = new MyObject();
    obj.publicMethod(); // 11
```

### 静态私有变量

```js
    var obj = (function(name) {
        var staticVar = 10;
        function getStaticVar() {
            return staticVar;
        }

        var MyObject = function(name) {
            var privateVar = 100;
            var getPrivateVar = function() {
                console.log(privateVar);
            }

            this.name = name;
            this.getName = function() {
                console.log(this.name);
            };
            this.objMethod = function() {
                console.log(getStaticVar());
                console.log(getPrivateVar());
                console.log(this.getPublicVar());
            };
        };

        MyObject.prototype = {
            publicVar: 1000,
            getPublicVar: function() {
                console.log(this.publicVar);
            }
        };

        return new MyObject(name);
    }('hcxowe'));
```

### 模块模式

```js
    var app = function() {
        var privateVar = 10;
        
        function getPrivateVar() {
            return staticVar;
        }

        var exportObj = {};

        export.getPublicMethod = function() {
            privateVar++;
            getPrivateVar();
        };

        return exportObj;
    }();
```

### 小结

- 函数声明需要名字
- 函数表达式可以不需要名字，没有名字的函数表达式为匿名函数，有名字的函数表达式，该函数名称只在该函数内部有效
- 创建并立即调用一个函数，这样子既可以执行其中代码，有可以不在内存中留下对该函数的引用
- 使用闭包可以实现私有属性、公有属性的概念
- 闭包需要维护额外的作用域，占用内存多