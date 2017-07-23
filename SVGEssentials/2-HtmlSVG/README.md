# 在网页中使用SVG

## 将SVG作为图像

SVG与主页面是分离的

浏览器不会加载SVG自己引用的文件

SVG脚本根据安全设置不同可能无法运行

URL片段(URL中#后面的部分) 可能被忽略

使用SVG的方式： img标签src文件引入， css中的url文件引入， 作为应用程序使用object标签引入， 内联SVG
```html
<style>
    div {
        background-image: url('./cat.svg');
    }
</style>

<div>
    <img src="./cat.svg">
</div>

<object data="./cat.svg" type="image/svg+xml" title="Cat Object" alt="Stick Figure of a Cat">
    <p>No SVG Support!</p>
</object>
```

