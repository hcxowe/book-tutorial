## 严格模式

> ES5引入严格模式，通过严格模式可以在脚本文件或者函数中选择进行较为严格的全局或者局部的错误条件检测
> 严格模式的好处是可以提早知道代码中存在的错误，及时捕获一些可能导致编程错误的JS行为
> 支持严格模式的浏览器：IE10+,FF4+,SAFARI5.1+, CHROME

### 如何使用

```js
    'use strict';

    function strict() {
        'use strict';
    }
```

### 变量

- 不允许意外创建全局变量
- 不能对变量调用delete操作
- 不能使用保留字，如：implements，interface，let，package...
```js
    'use strict';

    xxx = 'hcxowe'; // 抛出ReferenceError

    var a = 'red';
    delete a; // 抛出ReferenceError
```

### 对象

- 为只读属性赋值会抛出TypeError
- 对不可配置的属性使用delete操作会抛出TypeError
- 对不可扩展的对象添加属性会抛出TypeError
- 使用对象字面量时，属性名必须唯一

### 函数

- 函数参数名称必须唯一
- 命名参数与arguments对象完全独立，修改一个的值不会反应到另一个中
- 不能使用arugments.callee, arguments.caller
- 函数名称不能使用保留字
- 只能在脚本的顶级和函数中声明函数

### eval()

- 他在包含上下文中不在创建变量或者函数

```js
    'use strict';
    function doSomething() {
        eval('var a = 10');
        alert(a); // 抛出ReferenceError, a未声明
    }
```

### eval与arguments

- 不能使用eval与arguments作为标示符

### 抑制this

```js
    'use strict';
    var name = 'hcxowe';
    function foo() {
        alert(this.name); // 抛出错误TypeError
    }
```

### 其他变化

- 去掉了with语句
- 去掉了八进制字面量




