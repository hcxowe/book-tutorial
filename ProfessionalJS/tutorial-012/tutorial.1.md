## DOM2&DOM3

> DOM2级规范定义了一些模块，用于增强DOM1级。‘DOM2级核心’为不同的DOM类型引入了一些与XML命名空间有关的方法，这些变化只针对XML和XHTML文档。'DOM2级核心'还定义了以编程方式创建Document实例的方法，也支持创建DocumentType对象

- DOM2级样式
    - 每个元素都有一个style对象，用来确定和修改行内的样式
    - 要确定某个元素的计算样式，使用getComputedStyle()
    - IE中使用元素的currentStyle来获取计算样式
    - 通过document.styleSheets集合访问样式表

- DOM2级遍历和范围
    - 遍历即使用NodeIterator或TreeWalker对DOM执行深度优先的遍历
    - NodeIterator只允许以一个节点的步幅前后移动，TreeWalker在提供相同功能的情况下，还支持在DOM结构的各个方向上移动
    - 范围是选择DOM结构中特定部分，然后在执行相应操作的一种手段