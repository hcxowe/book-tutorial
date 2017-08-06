### innerHTML与DOM方法
- 在旧版浏览器如IE6，innerHTML比DOM操作快
- 新版浏览器差距不明显

### 节点克隆
- 旧版浏览器，使用cloneNode()克隆节点，稍微快一点
- 新版本chrome中，克隆会快很多

### HTML集合
- getElementsByName,getElementsByClassName,getElementsByTagName得到一个nodelist
- 该nodeList是一个类数组，集合中的节点变更是实时反映到该对象中
- 获取html集合是个十分耗时的操作
- 使用nextSibling来遍历节点比childNodes在IE6、7中会快很多，其他浏览器差不多

### 元素节点
- DOM元素属性中有一些会过滤掉非元素节点，比如注释和文本节点
    - child 与 childNodes
    - firstElementChild 与 firstChild
    - lastElementChild 与 lastChild
    - nextElementSibling 与 nextSibling
    - previousElementSibling 与 previousSibling

- IE8只支持child属性
- html源码中的空白属于文本节点

### querySelectorAll querySelector
- 速度比getElementsBy??快
- 得到的集合不会获取之后的变更

### 重排与重绘
- 节点几何属性变化会引起浏览器重新构建渲染树受到影响的部分，这个过程为重排
- 重排之后浏览器会重新绘制该部分，这个过程为重绘
- 渲染树变化会进行排队，当执行一些操作会强制刷新队列要求任务立即执行来获取最新的的布局信息
- 重排重绘花费的代价非常高，合并多次对DOM和样式的修改，一次性处理，最小化重绘跟重排

### 批量修改DOM
- 将元素脱离文档流
    - 隐藏元素
    - 文档片段 document fragment
    - 将节点拷贝到一个脱离文档流的节点中
- 进行改变
- 把元素放回文档流中

### 缓存布局信息
- 对于连续变更布局信息如动画，将布局信息保存在局部变量中，避免强制刷新浏览器渲染队列

### 事件委托
- 利用事件的冒泡将事件监听绑定在上一层节点中，从而减少事件监听的次数，节约绑定事件处理器的开销

### 总结
- 最小化DOM访问次数，尽可能在js端处理
- 需要两次以上访问某个节点，使用局部变量保存引用
- HTML集合可能会实时连系着文档，这里的处理需要注意
- 尽量使用更快的API，如querySelector(ALL)
- 要留意重排与重绘，批量修改样式时，脱离文档流操作，利用缓存减少访问布局信息的次数
- 动画使用绝对定位
- 使用事件委托，减少事件处理器的数量

