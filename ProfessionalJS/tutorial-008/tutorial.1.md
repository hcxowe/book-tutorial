## BOM

### window对象

- var 定义的全局变量，不能通过delete删除
- 直接在window对象上的定义的属性可以通过delete删除

### 窗口位置

```js
// 获取窗口相对于屏幕的左上角的位置
var leftPos = (typeof window.screenLeft == 'number) ? window.screenLeft : window.screenX;

var topPos = (typeof window.screenTop == 'number') : window.screenTop : window.screenY;
```

### 窗口大小

- innerWidth、innerHeight 浏览器文档视窗宽高
- outerWidth、outerHeight 浏览器宽高

```js
    // 获取浏览器页面视口大小

    var pageWidth = window.innerWidth;
    var pageHeight= window.innerHeight;

    // ie
    if (typeof pageWidth != 'number') {
        // 标准模式
        if (document.compatMode == 'CSS1Compat') {
            pageWidth = document.documentElement.clientWidth;
            pageHieght = document.documentElement.clientHeight;
        }
        // 混杂模式
        else {
            pageWidth = document.body.clientWidth;
            pageHieght= document.body.clientHeight;
        }
    }
```

### 导航和打开窗口

- window.open(url, iframeID/_self/_blank/_parent/_top, opts);

- setTimeout(fn, timeout);

- setInterval(fn, interval);

- 定时器回调函数到时后不一定准确执行，会进入事件队列 排队执行

### 系统对话框

- alert();
- confirm();
- prompt();

### location对象

- hash 
- host  如果有显示ip:port
- hostname 不带端口的服务器名称
- href  页面完整的url
- pathname url中的目录和文件名
- port 端口号
- protocol 协议，http、https
- search 查询字符串，以?号开头
- assign(url) 改变浏览器当前加载页面
- reload([true]) 重新加载页面, true强制刷新
- replace(url) 导航到指定URL，不能回到之前的页面

### navigator对象

- navigator用于识别浏览器
- IE是以COM对象的方式实现插件的，COM对象使用唯一标示符来标识

### screen对象

- 用于查询显示器信息

### history对象

- history保存着用户上网的历史记录
- history.go(n); 前进N页 n可以为负数
- history.back();
- history.forward();

### 小结

- 使用框架时，每个框架都有自己的window对象以及所有的原生构造函数以及其他函数的副本
- top对象始终指向最外围的框架，也就是整个浏览器窗口