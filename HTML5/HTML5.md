# HTML5要点

- `id, class, title, style, lang, dir`可用在所有元素上
- 自定义元素属性格式`data-*`
- `title`对某些元素来说是必需的，如 `<abbr>`
- HTML新属性：`hidden, contenteditable, contextmenu, draggable, dropzone, spellcheck, role, aria-*, manifest`
- dataset API
- 自闭合元素：`<img/> <br/> <meta/> <hr/> <base/> <link/> <keygen/> <area/> <col/> <command/> <embed/> <input/> <param/> <source/> <track/> <wbr/>`
- 最佳实践
    - 标记使用小写
    - 所有属性都用引号括起来
    - 闭合所有元素
    - 嵌套所有元素
    - 为所有非布尔型属性提供值
    - 根据语义使用元素
- 能给`<body>`元素添加的属性应该只有`id class lang dir`
- `<meta>` 有4个特有属性：`charset http-equiv content name`
    - 使用`http-equiv`属性来代替name，能够替换由服务器所创建的HTTP响应头

- 分节元素：`section article nav aside header footer`
    - `<section>`元素可以被用于就主题上分组的内容，通常有一个标题
    - `<article>`元素就像一篇新的文章一样，它可以独立于所在的文档或网站存在
    - `<nav>`元素被用作文档内部重要的导航块
    - `<aside>`元素包含的是与主要内容有点关联的内容，相关到足以使整个流程无法工作，但实际上不是内容的一部分

- 嵌入式元素：`embed video audio source track canvas img iframe object param map area`
    - iframe 的 srcdoc 属性的值是HTML，被用来创建一个将显示 iframe 里面的文档

## 表单

- input
    - type: `text, password, checkbox, radio, submit, reset, file, hidden, image, button, search, tel, url, email, datetime, date, month, week, time, datatime-local, number, range, color`
    - require 标记一个表单字段是必需的
    - min & max
    - step
    - placeholder
    - pattern
    - readonly
    - disabled
    - maxlength
    - size
    - form
    - autocomplete
    - autofocus


# CSS3

## 最佳实践
- 最大限度的减少HTTP请求
- 使用外部样式
- 统一浏览器样式
- 使用最弱的特定性以便重写
- 不要使用内联样式或!important修饰符