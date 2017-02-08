## 表单脚本

### 表单的基本知识

- acceptCharset -- 服务器能够处理的字符集
- action -- 接受请求的URL
- elements -- 表单中所有控件的集合
- enctype -- 请求的编码类型 如：application/x-www-form-urlencoded
- length -- 表单中的控件数量
- method -- 要发送的HTTP请求类型
- name -- 表单名称
- reset() -- 重置表单
- submit() -- 提交表单
- target -- 用于发送请求的接受响应的窗口名称

#### 获取表单的方式
```js
    // 如果表单设置Id为form1
    var form1 = document.getElementById('form1');

    var form2 = document.forms['form1'];
    var form3 = document.forms[0]; // 如果只有一个form
```

#### 提交表单

```js
    // 这三种方式提交表单会触发表单的submit事件
    <input type="submit">Submit</input>
    <input type="image" src="xxx.gif"></img>
    <button type="submit">Submit</button>

    // 这样提交不会触发表单submit事件
    form.submit();
```

#### 重置表单

```js
    // 这三种方式提交表单会触发表单的reset事件
    <input type="reset">Submit</input>
    <button type="reset">Submit</button>
    form.reset();
```

#### 表单字段

- 表单字段包括:&lt;input&gt;&lt;textarea&gt;&lt;button&gt;&lt;fieldset&gt;&lt;select&gt;
```js
    var form = document.getElementById('form');

    // 获取第一个表单字段
    var field1 = form.elements[0];

    // 获取name或id为value的表单字段的集合(如果同名不止一个)
    var field2 = form.elements['value'];

    var count = form.length;
```
- form.elements; --对象会将所有表单字段的name与id作为他的一个属性

##### 共有的表单字段属性

- disabled -- 是否禁用
- form -- 所属的表单元素
- name -- 当前字段的名称
- readOnly -- 是否只读
- tabIndex -- table序号
- type -- 字段的类型
- value -- 当前字段将被提交给服务器的值

#### 共有的表单字段方法

- focus()
- blur()

#### 共有的表单字段事件

- blur
- change -- input或textarea元素在失去焦点并且值变更了触发，或者select改变选项触发
- focus


### 文本框脚本

#### input
- size  -- 设置文本框能够显示的字符数，这里并没限制输入数目
- maxlength -- 设置最大字符数
- value -- 设置初始值

#### textarea

- rows -- 设置文本框的字符行数
- cols -- 设置文本框的字符列数

- rows与cols只是设置文本框的显示大小，用户可以自己调整，通过设置textarea的css样式resize:none;可以禁用拖动，另外一种是通过设置width，length，max-width，max-length来限制不过会出现图标

#### 选择文本

- select() -- 选择文本框所有文本
- select事件
    - 当用户选择了文本触发
    - IE8-只要用户选择了一个字符就会触发
    - 调用select()也会触发

- 获取文本
    - html5为文本框提供了两个属性selectionStart与selectionEnd
    - IE8-提供了document.selection对象来获取
    ```js
        function getSelectedText(textbox) {
            if (typeof textbox.selectionStart == 'number') {
                return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
            }
            else if (document.selection) {
                return document.selection.createRange().text;
            }
        }
    ```

- 选择部分文本

    - html5提供setSelectionRange(start, end)方法设置选择的文本`form.elements[1].setSelectionRange(1,2);`
    - IE8-选择部分文本方法：
    ```js
        textbox.value = 'hello hcxowe';
        var range = textbox.createTextRange();

        // 选择所有文本
        range.collapse(true);
        range.moveStart('character', 0);
        range.moveEnd('character', textbox.value.length);
        range.select();

        // 选择前三个字符
        range.collapse(true);
        range.moveStart('character', 0);
        range.moveEnd('character', 3);
        range.select();
    ```

    - 跨浏览器方法
    ```js
        function selectText(textbox, startIndex, stopIndex) {
            if (textbox.setSelectionRange) {
                textbox.setSelectionRange(startIndex, stopIndex);
            }
            else if (textbox.createTextRange) {
                 var range = textbox.createTextRange();
                range.collapse(true);
                range.moveStart('character', startIndex);
                range.moveEnd('character', stopIndex-startIndex);
                range.select();
            }
        }
    ```

#### 过滤输入

```js
    // 屏蔽非数字
    EventUtil.addHandler(textbox, 'keypress', function(event) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        var charCode = EventUtil.getCharCode(event);

        if(!/\d/.test(String.fromCharCode(charCode)) && charCode > 9) {
            EventUtil.preventDefault(event);
        }
    });
```

- 操作剪切板
    - beforecopy
    - copy
    - beforecut
    - cut
    - beforepaste
    - paste

    ```js
        var EventUtil = {
            getClipboardText: function(event) {
                var clipboardData = event.clipboardData || window.clipboardData;
                return clipboardData.getData('text');
            },

            setClipboardText: function(event, value) {
                if (event.clipboardData) {
                    return event.clipboardData.setData('text/plain', value);
                }
                else if (window.clipboardData) {
                    return window.clipboardData.setData('text', value);
                }

            }
        }
    ```

- 自动切换焦点

#### HTML5约束验证API

- 必填字段  设置required属性
- 其他输入类型
    - input 的type增加了'email','url','number','range','datetime', 'datetime-local','data','month','week','time'
- 输入模式
    - pattern -- 一个正则表达式用来限制输入
- 检查有效性
    - 使用checkValidity()方法可以检测表单中某个字段是否有效

- 禁用验证
    - form设置novalidate属性来设置表单不进行验证

### 选择框脚本

选择框是通过select与option元素创建的

- select元素提供如下属性方法：
    - add(newOption, relOption)
    - multiple --- 是否可以多选
    - options -- select中option的集合
    - remove(index) -- 移除选择框中指定索引的option元素
    - selectedIndex(index) -- 选中项
    - size -- 选择框可见的行数

- 选择项的值
    1. 如果指定了value属性，则使用value属性设置的值
    2. 如果为指定value属性，则使用选项的文本
    3. IE8如果未指定value会返回空字符串

- option元素提供如下属性方法：
    - index -- 当前选项在options集合中的索引
    - label -- 当前选项的标签
    - selected -- 是否已经被选中
    - text -- 选项的文本
    - value -- 选项的值

#### 选择选项

#### 添加选项

#### 移除选项

#### 移动和重排选项

- appendChild(), 如果传入一个页面中存在的元素，则该方法就会先从该元素的父元素中移除该元素，然后把该元素添加到指定的位置


### 表单序列化

- 浏览器如何将数据发送给服务器
    1. 对表单字段的名称和值进行URL编码，使用&分隔
    2. 不发送禁用的的表达字段
    3. 只发送勾选的复选框和单选按钮
    4. 不发送type为reset和submit的按钮
    5. 多选选择框中的每个选中的值单独一个条目
    6. 在单击提交按钮提交表单的情况下，也会发送提交按钮；否则不发送提交按钮
    7. select元素的值就是选中的option元素的value，如果没有指定value特性，则为option元素的文本

### 富文本编辑

- document.designMode -- 设置页面可编辑
- 为元素添加contenteditable特性即可编辑该元素

#### 操作富文本

- document.execCommand()