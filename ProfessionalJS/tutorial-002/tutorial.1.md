## 在HTML中使用JS

### \<script\>\</script\>

- type --- 默认为text/javascript
- charset --- 制动src指向的代码的字符编码格式
- defer --- 不阻塞下载，文档加载在</html>后执行,执行顺序HTML5规定按标签出现先后，实际不一定
- async --- 以阻塞下载，一旦下载完成立即执行

> - 在\<script\>嵌入代码时，代码中不要包含\</script\>
> - 使用src指定了外部文件时，嵌入的代码将被忽略

### \<noscript\>\</noscript\>

<strong>该标签中的内容只会在浏览器不支持脚本，或者脚本被禁用的情况下出现</strong>