## DOM

> DOM(文档对象模型)是针对HTML与XML文档的一个API(应用程序编程接口)

### 节点层次

#### 文档元素
    - 文档的最外层元素
    - html文档的文档元素是 <html></html>
    - xml文档可能是任意元素

#### Node类型
- nodeType -- 节点类型
    - Node.ELEMENT_NODE -- 1
    - Node.ATTRIBUTE_NODE -- 2
    - Node.TEXT_NODE -- 3
    - Node.CDATA_SECTION_NODE -- 4
    - Node.ENTITY_REFERENCE_NODE -- 5
    - Node.ENTITY_NODE -- 6
    - Node.PROCESSING_INSTRUCTION_NODE -- 7
    - Node.COMMENT_NODE -- 8
    - Node.DOCUMENT -- 9
    - Node.DOCUMENT_TYPE_NODE -- 10
    - Node.DOCUMENT_FRAGMENT_NODE -- 11
    - Node.NOTATION_NODE -- 12
- nodeName -- 标签名
- nodeValue -- 始终为null
- childNodes -- 子节点
    - NodeList对象 -- 基于DOM结构动态执行查询结构，DOM结构改变自动反映到NodeList对象中
    - IE8-将NodeList实现为一个COM对象
```js
    document.childNodes[1];
    document.childNodes.item(1);

    // IE8-无效
    var aryNodes = Array.prototype.slice.apply(document.childNodes, 0);

    // 通用类数组转数组方法
    function convertToArray(nodes) {
        var ary = null;
        try {
            ary = Array.prototype.slice.apply(nodes, 0);
        }
        catch(e) {
            ary = [];
            for (var i=0, len=nodes.length; i < len; i++) {
                ary.push(nodes[i]);
            }
        }

        return ary;
    }
```
- parentNode -- 父节点
- previousSibling -- 前一个兄弟节点
- nextSibling -- 后一个兄弟节点
- firstChild -- 第一个子节点
- lastChild -- 最后一个子节点
- hasChildNodes() -- 是否有子节点
- ownerDocument -- 文档节点 -- html中为document对象

- 操作节点
    - appendChild() -- 向nodeList的末尾添加一个节点
    - insertBefore(newNode, node) -- 在node之前插入newNode
    - replaceChild(newNode, node) -- 将node替换为newNode
    - removeChild(node) -- 移除node节点
    - cloneNode(isdeep) -- 克隆节点，isdeep是否进行深复制
        - 该方法不会复制节点的js属性，如事件处理程序
        - IE会复制事件处理程序
    - normalize() -- 处理文档树中的文本节点，空文本节点就删除，相邻的文本节点合并

- IE9-不会为空白符创建节点

#### Document类型

##### document
- 表示整个HTML文档
- nodeType -- 9
- nodeName -- #document
- nodeValue -- null
- parentNode -- null
- ownerDocument -- null

##### 文档的子节点
- DocumentType -- 文档类型独立与其他部分的实体
- documentElement -- 始终指向HTML页面中的html元素
- body
- 文档前后的注释节点在各个浏览器上处理不同

##### 文档信息

- title
- URL -- 文档地址
- domain 
    - 不能设置domain为URL中不包含的域
    - domian设置松散的域之后不能在设置回紧绷的域

```js
    document.domain = 'wrox.com';
    document.domian = 'p2p.wrox.com'; // error
```

- referrer -- 链接到当前页面的那个页面的URL

##### 查找元素

- getElementById()
    - IE8-不区分大小写
- getElementsByTagName()
- getElementsByName()

##### 特殊集合

- document.anchors 文档中所有带name属性的a元素
- document.forms 文档中所有form元素
- document.images 文档中所有的img元素
- document.links 文档中所有带href特性的元素

##### DOM一致性检测

- document.implementation -- 检测浏览器实现了DOM的哪些部分

##### 文档写入

- write
- writeln
- open
- close
- 在页面加载完成之后使用write或writeln则会重写整个页面

#### Element类型

##### Element
- nodeType -- 1
- nodeName -- 元素标签名
- nodeValue -- null
- parentNode -- Document / Element
- tagName -- 元素标签名
- HTML中标签名始终以大写表示

##### html元素

- id -- 唯一标示
- title -- 元素的附加说明
- lang -- 元素内容的语言代码
- dir -- 语言方向
- className -- CSS类

##### 取得特性

- getAttribute()
- setAttribute()
    - 特性名会转化为小写
- removeAttribute()
- IE会为自定义特性创建属性
- 设置元素的属性并不会添加相应的特性，IE则会

##### attributes属性
- getNameItem(name)
- removeNameItem(name)
- setNameItem(node)
- item(pos)
```js
    var id = element.attributes.getNameItem('id').nodeValue;
    id = element.attributes['id'].nodeValue;
    element.attributes['id'].nodeValue = 'newid';

    var oldAtr = element.attributes.removeNameItem('name');
```

##### 创建元素

- document.createElement('tagname')
- createElement('<div id="id"></div>'); 可以使用完整的元素标签来创建元素

##### 元素的子节点

#### Text类型

- nodeType -- 3
- nodeName -- #text
- nodeValue -- 节点文本
- parentNode -- Element
- data -- 节点文本
- appendData(text) -- text添加到节点末尾
- deleteData(offset, count) -- 在offset处删除count个字符
- insertData(offset, text) -- 在offset处插入text
- replaceData(offset, count, text) -- 替换
- splitText(offset) -- 从offset处将文本节点分成两个文本节点
- substringData(offset, count) -- 子字符串
- length -- 文本的长度

##### 创建文本节点

- document.createTextNode(text)
- element.normalize() -- 合并相邻的子文本节点

##### 分割文本节点

- splitText 一个文本分割为两个文本节点

#### Comment类型

- nodeType -- 8
- nodeName -- #comment
- nodeValue -- 注释的内容
- parentNode -- document / element
- document.createComment(text) -- 创建注释节点

#### CDATASection类型

- nodeType -- 4
- nodeName -- #cdata-section

#### DocumentType类型

- nodeType -- 10
- nodeName -- doctype的名称
- nodeValue -- null
- parentNode -- document
- document.doctype

#### DocumentFragment类型

- 文档片段
- nodeType -- 11
- nodeName -- #document-fragment
- nodeValue -- null
- parentNode -- null

```js
    var fragment = document.createDocumentFragment();
    var ul = document.createElement('ul');
    for (var i = 0; i < 3; i++) {
        ul.appendChild(document.createElement('li'));
    }
    
    fragment.appendChild(ul);
    
    document.body.appendChild(fragment);
```

#### Attr类型

- 元素的特性
- nodeType -- 2
- nodeName -- 特性的名称
- nodeValue -- 特性的值
- parentNode -- null
- name -- 特性的名称
- value -- 特性的值
- specified -- 代码指定特性还是默认特性

```js
    var attr = document.createAttribute('align');
    attr.value = 'left';
    element.setAttributeNode(attr);

    element.attributes['align'].value; // left
    element.getAttributeNode('align').value; // left
    element.getAttribute('align');  // left
```

### DOM操作技术

#### 动态脚本

- 插入外部脚本文件
```js
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'client.js';
    document.body.appendChild(script);
```

- 直接插入js脚本代码
    - IE不允许DOM访问其子节点

```js
    function loadScriptString(code) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        try {
            script.appendChild(document.createTextNode(code));
        }
        catch(e) {
            script.text = code;
        }

        document.body.appendChild(script);
    }

    // 等同于把字符串传给eval函数
    eval(code);
```

#### 动态样式

```js
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'xxx.css';

    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
```

- IE也不允许DOM访问style的子节点

```js
    function loadStyleString(css) {
        var style = document.createElement('style');
        style.type = 'text/css';
        try {
            style.appendChild(document.createTextNode('css'));
        }
        catch(e) {
            style.styleSheet.cssText = css;
        }

        var head = document.getElementsByTagName('head')[0];

        head.appendChild(style);
    }
```

#### table

```js
    var table = document.createElement('table');
    table.border = 1;
    table.width  = '100%';

    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    tbody.insertRow(0);
    tbody.rows[0].insertCell(0);
    tbody.rows[0].cells[0].appendChild(document.createTextNode('Cell 1,1'));
    tbody.rows[0].insertCell(1);
    tbody.rows[0].cells[1].appendChild(document.createTextNode('Cell 2,1'));

    tbody.insertRow(1);
    tbody.rows[1].insertCell(0);
    tbody.rows[1].cells[0].appendChild(document.createTextNode('Cell 1,2'));
    tbody.rows[1].insertCell(1);
    tbody.rows[1].cells[1].appendChild(document.createTextNode('Cell 2,2'));

    document.body.appendChild(table);
```

#### NodeList

- NodeList NanedNodeMap HTMLCollection他们的实例是动态的，每次文档结构变化都会得到更新

### 小结

- 最基本的节点类型是Node，所有其他类型都继承自Node
- Document类型表示整个文档，document是Document的一个实例
- Element节点表示文档中的所有HTML和XML元素
- 其他节点类型：文本内容，注释，文档类型，CDATA区域，文档片段
- DOM操作是JS程序开销最大的部分，尽力减少DOM操作