## JS简介

### JS简史

- JS诞生于1995年，作者是布兰登-艾奇(Brendan Eich)，当时就职于Netscape(网景)公司
- 1995年2月， 网景公司发布javascript1.0，紧接这发布了javascript1.1
- 1996年8月， 微软在IE3中加入JScript
- 1997年javascript1.1提交给了欧洲计算机制造商协会，进行标准定制，经过数月完成了ECMAScript的第一版本

### JS的实现

#### 核心 ECMAScript

- ECMA-262第五版 （ES5）
    - 2009年12月正式发布
    - 加入原生JSON对象
    - 继承的方法和高级属性定义
    - 严格模式

- ECMAScript兼容
    - 支持 类型、值、对象、属性、函数、语句
    - 支持Unicode字符标准
    - 支持正则表达式

- 浏览器对ECMAScript的支持
    - IE5~IE7  ES3
    - IE8      ES5*(最早实现ES5，部分支持)
    - IE9      ES5(不支持严格模式)
    - IE10     ES5
    - Firefox3-  ES3
    - Firefox3.5~3.6 ES5*
    - Firefox4+     ES5
    - chrome1+ ES3
    - chrome2+ ES5

- ECMAScript6
    - 2015年发布的ES6，新版的edge，firefox，chrome正在全面实现中

#### 文档对象模型 DOM

- DOM级别
    - DOM1
        > DOM1主要目标是映射文档的结构

    - DOM2
        > DOM视图，DOM事件，DOM样式，DOM遍历和范围

    - DOM3

- 其他DOM标准
    - SVG 可伸缩矢量图
    - MathML 数学标记语言
    - SMIL 同步多媒体集成语言

- 浏览器对DOM的支持
    - IE8- DOM1
    - IE9+  DOM1 DOM2 DOM3
    - Firefox3+ DOM1 DOM2 DOM3*
    - Chorme1+ DOM1 DOM2*

#### 浏览器对象模式 BOM 

> 所有针对浏览器的javascript扩展都是BOM的一部分

- 弹出新浏览器窗口的功能
- 移动、缩放、关闭浏览器窗口的功能
- 提供浏览器详细信息的navigator对象
- 提供浏览器所加载页面的相信信息location对象
- 提供用户显示器分辨率详细信息的screen对象
- 对cookie的支持
- 像XMLHttpRequest和IE的ActiveXObject这样的自定义对象

### 总结

- ECMAScript 由ECMA-262定义，提供核心语言功能
- DOM 提供访问和操作网页内容的方法和接口
- BOM 提供与浏览器交互的方法和接口
- ES3已经全部支持了
- ES5基本都已经支持了：IE8部分支持，IE9+完整支持(严格模式不支持)
- firefox，chrome新版es5完整支持，ES6大部分支持