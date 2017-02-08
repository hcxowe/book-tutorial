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

#### IE中的事件对象

- 使用DOM0级方法添加事件处理程序时，event对象作为window对象的一个属性存在

```js
    var btn = document.getElementById('button');
    
    btn.onclick = function() {
        var event = window.event;
        alert(event.type);
    };

    btn.attachEvent('onclick', function(event) {
        alert(event.type);
        event == window.event; //true
    });

    <input onclick="alert(event.type);"></input>
```

- 事件对象属性
    - cancelBubble -- true取消事件冒泡与stopPropagation作用一样
    - returnValue -- false取消事件默认行为
    - srcElement -- 事件目标
    - type -- 事件类型

#### 跨浏览器事件对象

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
        },

        getEvent: function(event) {
            return event ? event : window.event;
        },

        getTarget: function(event) {
            return event.target || event.srcElement;
        },

        preventDefault: function(event) {
            if (typeof event.preventDefault === 'function') {
                event.preventDefault();
            }
            else {
                event.returnValue = false;
            }
        },

        stopPropagation: function(event) {
            if (typeof event.stopPropagation === 'function') {
                event.stopPropagation();
            }
            else {
                event.cancelBubble = true;
            }
        },

        getRelatedTarget: function(event) {
            if (event.relatedTarget) {
                reutrn event.relatedTarget;
            }
            else if (event.toElement) {
                return event.toElement;
            }
            else if (event.fromElement) {
                return event.fromElement;
            }
            else {
                return null;
            }
        },

        getButton: function(event) {
            if (document.implementation.hasFeature('MouseEvent', '2.0)) {
                return event.button;
            }
            else {
                switch (event.button) {
                    case 0:
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                        return 0;
                    case 2:
                    case 6:
                        return 2;
                    case 4:
                        return 1;
                }
            }
        },

        getCharCode: function(event) {
            if (event.charCode) {
                return event.charCode;
            }
            else {
                return event.keyCode;
            }
        }
    };
```

### 事件类型

- DOM3级事件类型
    - UI事件 -- 用户与页面上的元素交互时触发
    - 焦点事件 -- 获取或失去焦点触发
    - 鼠标事件
    - 滚轮事件
    - 文本事件 -- 在文档中输入文本时触发
    - 键盘事件
    - 合成事件 -- 输入法编辑器输入字符触发
    - 变动事件 -- 当底层DOM结构发生变化时触发

- 所有浏览器都支持DOM2事件，IE9+支持DOM3级事件

#### UI事件

- load -- 当页面加载完成后在window上触发，img加载完成后在img元素上触发，嵌入内容加载完成时在object元素上触发
    - 在不属于DOM文档的图像（为添加到文档的img元素或Image对象）上触发load事件时，IE8-不会生成Eevent对象
    - img设置了src就会进行下载图片
    - script设置src并且加入到文档后才开始下载js文件
    - link元素设置href并且加入到文档后才开始下载css文件
    - IE8-不支持script元素的onload事件

- unload -- 页面卸载后在window上触发，嵌入内容卸载后在object元素上触发
- abort -- 用户停止下载过程时，如果嵌入内容没有加载完，在object元素上触发
- error -- 发生js错误时在window上触发，当无法加载图片时在img元素上触发，当无法加载嵌入内容时在object元素上触发
- select -- 当用户选择文本框中的一个或多个字符时触发
- resize -- 当窗口或者框架的大小变化时在window或框架上触发
    - 该事件可能被频繁触发，不宜在处理程序中加入耗时代码

- scroll -- 当用户滚动 带滚动条的元素中的内容时在该元素上触发

#### 焦点事件

- blur -- 元素失去焦点触发 该事件不冒泡
- focus -- 在元素获得焦点时触发 该事件不冒泡
- focusin -- 在元素获得焦点时触发 支持冒泡
- focusout -- 在元素失去焦点时触发 

- 在焦点从页面的一个元素移动到另一个元素时，依次触发下列事件
    - focusout 失去焦点的元素上触发
    - focusin 得到焦点的元素上触发
    - blur 失去焦点的元素上触发
    - focus 得到焦点的元素上触发

#### 鼠标与滚轮事件

- click
- dblclick
- mousedown
- mouseup
- mouseenter 光标从元素外首次移动到元素内触发，不冒泡
- mouseleave 不冒泡
- mousemove
- mouseout 光标从元素移入另一个元素时触发，可以时元素外部也可能是元素的子元素
- mouseover 光标在元素外部，首次移入元素内触发

- 触发mousedown和mouseup才会触发click，取消其中一个则不会触发click
- 触发dblclick需要经过两次click，取消其中一个click过程则不会触发dblclick

- 双击的事件触发顺序
    - mousedown
    - mouseup
    - click
    - mousedown
    - mouseup
    - click
    - dblclick
- IE8-的双击事件触发顺序
    - mousedown
    - mouseup
    - click
    - mouseup
    - dblclick

- mousewheel -- 滚轮事件

- 鼠标事件对象的clictX与clictY属性是发生事件时鼠标在视口中的位置
- 鼠标事件对象的pageX与pageY属性是发生事件时鼠标在页面中的位置
- IE8-不支持pageX与pageY，不过可以通过body来获取滚动信息来获取页面位置
```js
    // 标准模式document.documentElement 混杂模式 document.body
    var pageX = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
    var pageY = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
```

- 屏幕坐标位置screenX与screenY -- 发生事件时鼠标相对屏幕的位置

- 检测修改键的状态
```js
    event.shiftKey
    event.ctrlKey
    event.altKey
    event.metaKey // windows是win键 mac是Cmd键 IE8-不支持
```

- event.button -- 0 主鼠标按钮 1 中间的鼠标按钮 2 次鼠标按钮
    - IE8-的button属性有01234567个值


#### 键盘与文本事件

- keydown
- keyup
- keypress
- textInput -- 在文本插入文本框之前触发 IE9+
- keydown，keypress都是在字符插入文本框之前触发
- event.keyCode -- 按键的字符码
- event.charCode -- 按键的字符码
- 能够插入或者删除字符的键都会触发keypress事件

#### 复合事件

#### 变动事件

> 在DOM中的某一部分发生变化时给出提示，变动事件是针对XML和HTML DOM设计的

- DOMSubtreeModified -- 在DOM结构中发生任何变化是触发
- DOMNodeInserted -- 在一个节点作为子节点被插入到另一个节点时触发
- DOMNodeRemoved -- 在节点从其父节点中被移除时触发
- DOMNodeInsertedIntoDocument -- 在一个节点被直接过间接插入文档时触发
- DOMNodeRemoveFromDocument -- 在一个节点直接或间接移除文档时触发
- DOMAttrModified -- 在特性被修改之后触发
- DOMCharacterDataModified -- 在文本节点的值发生变化时触发

- IE8-不支持任何变动事件

#### HTML5事件

- comtextmenu -- 右键菜单事件
- beforeunload -- 页面卸载之前触发，控制权交由用户
- DOMContentLoaded -- DOM树构建完成时触发，IE8-不支持
- readystatechange 
    - uninitialized
    - loading
    - interactive -- 可以操作对象了
    - complete -- 完成加载
```js
    EventUtil.addHandler(document, 'readystatechange', function(event) {
        if(document.readyState == 'interactive' || document.readyState == 'complete') {
            EventUtil.removeHandler(document, 'readystatechange', arguments.callee);
        }
    });
```

- haschange事件
    - 当URL的参数列表擦生变化时在window对象上触发
    - event.oldURL
    - event.newURL
    - IE8+支持该事件，但不支持oldURL与newURL

#### 设备事件

- orientationchage事件
    - 设备由横向查看模式切换为纵向查看模式

- MozOrientation事件

- deviceorientation事件
    - 加速器检测到设备方向变化时在window对象上触发

- devicemotion事件
    - 设备移动时触发

#### 触摸与手势识别

- touchstart -- 手指触摸屏幕时触发
- touchmove 
- tochend
- touchcancel

- gesturestart -- 当一个手指在屏幕上另一个手指触摸屏幕时触发
- gesturechange -- 任何一根手指位置反生变化时触发
- gestureend -- 任何一根手指离开屏幕时触发

### 内存和性能

- 每个函数都是对象，对象将占用内存，内存中对象越多，性能越差
- 指定事件处理程序需要进行DOM访问，延迟页面交互时间

#### 事件委托

> 利用事件冒泡机制，指定一个事件处理程序来管理一种事件的处理

#### 移除事件处理程序

- 如果带有事件处理程序的元素被innerHtml删除了，那么该处理程序极有可能不会被回收
- 在不需要事件处理程序时手动移除

### 模拟事件

#### DOM中的事件模拟

- document.createEvent(typeStr) -- 创建事件，参数取值：
    - UIEvents
    - MouseEvents
    - MutationEvents -- DOM变动
    - HTMLEvents

- dispatchEvent(Event) -- 触发事件

- 模拟鼠标事件

```js
    var btn = doucment.getElementById('button');
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, true, document,defaultView, 0,0,0,0,0,false,false,false,false,0,null);

    btn.dispatchEvent(event);
```
- 模拟键盘事件 DOM3才有相应事件类型

- 自定义事件 DOM3中使用CustomEvent创建

#### IE中的事件模拟

- document.createEventObject() --创建事件对象
- 给上一步创建的对象添加必要的属性
- 元素上调用fireEvent(type, event)触发事件

```js
    var btn = document.getElementById('button');
    
    var event = document.createEventObject();
    event.screenX = 100;
    event.screenY = 0;
    event.clientX = 0;
    event.clientY = 0;
    event.ctrlKey = false;
    event.shiftKey = false;
    event.altKey = false;
    event.button = 0;

    btn.fireEvent('onclick', event);
```

### 小结

#### 使用事件时，需要考虑如下一些内存与性能方面的问题
- 限制一个页面中事件处理程序的数量
- 事件委托
- 在浏览器卸载前移除页面中所有事件处理程序