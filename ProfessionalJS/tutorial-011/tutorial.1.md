## DOM扩展

### 选择符API

- querySelector()
- querySelectorAll() -- 获取所有符合CSS选择器的元素集合的快照
- matchesSelector() -- 判断元素是否符合CSS选择器

### 元素遍历

- childElementCount -- 子元素的个数
- firstElementChild -- 第一个子元素
- lastElementChild -- 最后一个子元素
- previousElementSibling -- 前一个同辈元素
- nextElementSibling -- 后一个同辈元素

### HTML5

- getElementsByClassName()
- classList
    - add(value)
    - contains(value)
    - remove(value)
    - toggle(value)

- 焦点管理
    - document.activeElement 获取当前获得了焦点的元素
    - document.hasFocus() 文档是否获取到了焦点

- HTMLDocument的变化
    - readyState
        - loading 正在加载文档
        - complete 已经加载完文档
    - compatMode -- 'CSS1Compat'标准模式， 'BackCompat'混杂模式
    - head -- 引用<head></head>元素

- 字符集属性

    - document.charset 
    - document.defaultCharset

- 自定义数据属性

```js
    <div id='myDiv' data-appId='12345' data-myname='hcxowe'/></div>

    var div = document.getElementById('myDiv');
    var appId = div.dataset.appId;
    var name  = div.dataset.myname;

    div.dataset.appId = 35412;
    div.dataset.myname = 'ewoxch';
```

- 插入标记

    - innerHTML
    - outerHtml
    - insertAdjaventHtml(posFlag, ele)
    - 

- scrollIntoView方法 -- 使元素出现在视口中

### 专有扩展

#### 文档模式

##### ie的模式
- IE5 混杂模式
- IE7 IE7标准模式
- IE8 IE8标准模式 -- 可以使用Selectors API，更多css2选择器，某些css3
- IE9 IE9标准模式 -- es5， 完整的CSS3，更多的html5功能

```
    <meta http-equiv='X-UA-Compatible' content='IE=8'>
    // 这里的content可以取：Edge：最新的文档模式来渲染页面， EmulateIE9, EmulateIE8, EmulateIE7, 9, 8, 7, 5 
```
        
#### children属性

- IE8- children属性会包含注释节点
- IE9+ children属性只包含元素节点

#### contains() -- 判断某个节点是不是另一个节点的后代

#### 插入文本

- innerText -- 返回元素中包含的所有文本内容
- outerText -- 读模式跟innerText一样，写模式会取代元素

#### 滚动

- scrollIntoView()
- scrollIntoViewIfNeeded(alignCenter)
- scrollByLines(lineCount)
- scrollByPages(pageCount)

### 小结

- Selectors API
- Element Traversal
- HTML5
