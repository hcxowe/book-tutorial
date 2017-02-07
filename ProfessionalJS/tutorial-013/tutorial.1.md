## 事件

- IE8是最后一个使用其专有事件系统的主要浏览器

### 事件流

- 事件流描述的是从页面中接收事件的顺序

#### 事件冒泡

#### 事件捕获

#### DOM事件流

- 捕获阶段
- 目标阶段
- 冒泡阶段
- IE8-不支持DOM事件流

### 事件处理程序

> 响应某个事件的函数就叫做事件处理程序

#### HTML事件处理程序

```html
    <script>
        function showMessage() {
            alert('clicl');
        }
    </script>

    <input type="button" value='click me' onclick="alert('click');"></input>
    <input type="button" value='click me' onclick="showMessage();"></input>
    <input type="button" value='click me' onclick="alert(event.type);"></input>
    <!--onlick的事件处理程序中this执行当前元素-->
    <input type="button" value='click me' onclick="alert(this.value);"></input>
    <input type="button" value='click me' onclick="alert(value);"></input>

    <!--如果当前元素是一个变淡输入元素，则其作用域中会包含访问表单元素的入口-->
    <form>
        <input type='text' name="username" value=""></input>
        <input type="button" value="getName" onclick="alert(username.value);"></input>
    </form>
```

- 缺点：
    - 存在时差问题
        > 如果在事件处理程序不具备执行条件时触发了事件，将会出错
        > 使用try-catch可防止该问题
    - 扩展事件处理程序的作用域链在不同浏览器中会导致不同的结果
    - HTML与js代码紧耦合，要修改不方便

#### DOM0级事件处理程序

```js
    var btn = document.getElementById('button');
    btn.onclick = function() {
        alert('click');
    };

    btn.onclick = null; // 删除事件处理程序
```
- 代码执行才会给btn添加事件处理程序
- 程序中this引用当前元素
- 事件处理程序会在事件流的冒泡阶段处理

#### DOM2级事件处理程序

- addEventListener(type, fun, isbh);removeEventListener(type, fun, isbh);

```js
    var btn = document.getElementById('button');

    // 冒泡阶段按添加监听顺序触发
    btn.addEventListener('click', function() {
        alert('maopao1');
        alert(this.id); // button
    }, false);

    btn.addEventListener('click', function() {
        alert('maopao2');
    }, false);

    // 捕获阶段触发
    btn.addEventListener('click', function(event) {
        alert('buhuo');
    }, true);
```

- 使用removeEventListener来移除监听，函数接受参数必须与addeventListener接受的参数一致，否则无法移除监听
- addeventListener接受匿名函数的监听无法移除
- IE9+支持DOM2事件处理程序

#### IE事件处理程序

- attachEvent('on'+type, fun); detachEvent('on'+type, fun);
- attachEvent的事件处理程序会在全局作用域中执行，this等于window

```js
    var btn = document.getElementById('button');
    btn.attachEvent('onclick', function() {
        alert('hcx');
    });

    btn.attachEvent('onclick', function() {
        alert('owe');
    });
```

- 事件处理程序以添加相反的顺序执行，触发时输出'owehcx'
- 匿名函数作为处理程序的监听无法移除

#### 跨浏览器的事件处理程序

```js
    var EventUtil = {
        addHandler: function(element, type, handler) {
            if (element.addeventListener) {
                element.addEventListener(type, handler, false);
            }
            else if (element.attachEvent) {
                element.attachEvent('on'+type, handler);
            }
            else {
                element['on'+type] = handler;
            }
        },

        removeHandler: function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            }
            else if (element.detachEvent) {
                element.detachEvent('on'+type, handler);
            }
            else {
                element['on'+type] = null;
            }
        }
    };
```

### 事件对象

#### DOM中的事件对象

> 兼容DOM的浏览器会将一个event对象传入事件处理程序中，无论使用的是DOM0级还是2级

```js
    var btn = document.getElementById('button');
    btn.onclick = function(event) {
        alert(event.type);
    };

    btn.addeventListener('click', function(evet) {
        alert(event.type);
    });

    <input type="button" value='click me' onclick="alert(event.type);"></input>
```

- 事件对象属性

    - bubbles -- 是否冒泡
    - cancelable -- 是否可以取消事件默认行为
    - currentTarget -- 事件处理程序当前正在处理事件的那个元素
    - defaultPrevented -- 是否已经调用过preventDefault() - DOM3新增
    - detail -- 与事件相关的细节信息
    - eventPhase -- 事件阶段： 1 捕获 2 目标 3 冒泡
    - preventDefault -- 取消事件的默认行为
    - stopImmediatePropagation -- 取消事件的进一步捕获冒泡，同时阻止任何事件处理程序被调用 - DOM3新增
    - stopPropagation - 取消事件的进一步捕获或冒泡
    - targer -- 事件的目标
    - trusted -- true表示事件是浏览器生成的，false表示事件是由开发人员创建的 - DOM3新增
    - type -- 被触发的事件的类型
    - view -- 与事件关联的抽象视图

- 事件处理程序内部，对象this始终等于currentTarget的值