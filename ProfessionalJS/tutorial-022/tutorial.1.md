## 高级技巧

### 高级函数

#### 安全的类型检测

- typeof 检查基本类型 string number boolean undefined object function
- instanceof 原型链上是否存在

#### 作用域安全的构造函数

```js
    function Person(name, age) {
        if (this instanceof Person) {
            this.name = name;
            this.age  = age;
        }
        else { 
            return new Person(name, age);
        }
    }
```

#### 惰性载入函数

```js
    // 调用时处理
    function createXHR() {
        if (typeof XMLHttpRequest != 'undefined') {
            createXHR = function() {
                return new XMLHttpRequest();
            };
        }
        else if (typeof ActiveXObject != 'undefined') {
            createXHR = function() {
                if (typeof arguments.callee.activeXString != 'string') {
                    var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'],
                        i,
                        len;

                    for (i=0,len=versions.length; i<len; i++) {
                        try {
                            new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            break;
                        }
                        catch (ex) {

                        }
                    }
                }

                return new ActiveXObject(arguments.callee.activeXString);
            };
        }
        else {
            createXHR = function() {
                throw new  Error('no XHR object');
            }
        }

        return createXHR();
    }

    // 加载处理函数
    var createXHR = (function() {
        if (typeof XMLHttpRequest != 'undefined') {
            return function() {
                return new XMLHttpRequest();
            };
        }
        else if (typeof ActiveXObject != 'undefined') {
           return function() {
                if (typeof arguments.callee.activeXString != 'string') {
                    var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'],
                        i,
                        len;

                    for (i=0,len=versions.length; i<len; i++) {
                        try {
                            new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            break;
                        }
                        catch (ex) {

                        }
                    }
                }

                return new ActiveXObject(arguments.callee.activeXString);
            };
        }
        else {
           return function() {
                throw new  Error('no XHR object');
            }
        }
    }{});
```

#### 函数绑定

- Function.bind

```js
    function bind(fn, context) {
        var args = Array.prototype.slice.call(arguments, 2);
        return function() {
            args = args.concat(Arrya.prototype.slice.call(arguments, 0));
            return fn.apply(context, args);
        }
    }
```

#### 函数柯里化

```js
    function curry(fn) {
        var args = Array.prototype.slice.call(arguments, 1);

        return function() {
            args = args.concat(Arrya.prototype.slice.call(arguments, 0));

            return fn.apply(null, args);
        }
    }
```

### 防篡改对象

#### 不可扩展对象

- Object.preventExtensions(obj) -- 不能给对象添加新成员

#### 密封对象

- Object.seal(obj) -- 不可扩展，不可配置，不能删除属性和方法

#### 冻结对象

- Object.freeze(obj) -- 不可扩展，密封，不可修改属性值

### 高级定时器

- setTimeout()

- setInterval() 
    - 当使用setInterval时，仅当没有该定时器的任何其他代码实例时，才讲定时器代码添加到队列中

#### 函数节流

```js   
    // 100ms没该函数指挥执行一次method
    function throttle(method, context) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function() {
            method.call(context);
        }, 100);
    }
```

### 自定义事件

```js
    function EventTarget() {
        this.handlers = {};
    }

    EventTarget.prototype = {
        addHandler: function(type, handler) {
            if (typeof this.handlers[type] == 'undefined') {
                this.handers[type] = [handler];
            }
            else {
                this.handlers[type].push(handler);
            }
        },

        removeHandler: function(type, handler) {
            var headlers = this.handlers[type];
            if (!headlers) {
                return;
            }

            for (var i=0, i<headlers.length; i<len; i++) {
                if (headlers[i] === headler) {
                    break;
                }
            }

            handlers.splice(i, 1);
        },

        fireHandler: function(event) {
            if (!event.target) {
                event.target = this;
            }

            var headlers = this.handlers[event.type];
            if (!headlers) {
                return;
            }

            for (var i=0, i<headlers.length; i<len; i++) {
                headkers[i](event);
            }
        }
    };
```

### 拖放

```js
    var DragDrop = (function() {
        var dragdrop = new EventTarget(),
            dragging = null, 
            diffX = 0,
            diffY = 0;

        function handleEvent(event) {
            event = event || window.event;
            var target = event.target || event.srcElement;

            switch (event.type) {
                case 'mousedown':
                    if (target.className.indexOf('draggable') > -1) {
                        dragging = target;
                        diffX = event.clientX - target.offsetLeft;
                        diffY = event.clientY - target.offsetTop;
                        dragdrop.fireHandler({
                            type:'dragstart', 
                            target:dragging, 
                            x:event.clientX, 
                            y:event.clientY
                        });
                    }
                    break;
                
                case 'mousemove':
                    if (dragging !== null) {
                        dragging.style.left = (event.clientX + diffX) + 'px';
                        dragging.style.top  = (event.clientY + diffY) + 'px';
                        dragdrop.fireHandler({
                            type:'drag', 
                            target:dragging, 
                            x:event.clientX, 
                            y:event.clientY
                        });
                    }
                    break;

                case 'mouseup':
                    dragdrop.fireHandler({
                            type:'dragend', 
                            target:dragging, 
                            x:event.clientX, 
                            y:event.clientY
                    });
                    dragging = null;
                    break;
            }
        };

        dragdrop.enable = function() {
                EventUtil.addHandler(document, 'mousedown', handleEvent);
                EventUtil.addHandler(document, 'mousemove', handleEvent);
                EventUtil.addHandler(document, 'mouseup', handleEvent);
        };

        dragdrop.disable = function() {
            EventUtil.removeHandler(document, 'mousedown', handleEvent);
            EventUtil.removeHandler(document, 'mousemove', handleEvent);
            EventUtil.removeHandler(document, 'mouseup', handleEvent);
        };

        return dragdrop;
    }());
```

### 小结

