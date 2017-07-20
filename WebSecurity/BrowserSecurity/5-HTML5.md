# HTML5 安全

## HTML5新标签

### 新标签的XSS

`video` `audio` 通过`src`属性添加一段视频/音频，可能发生XSS

### iframe的sandbox

HTML5中，专门为iframe定义了一个新的属性 sandbox，设置该属性后，iframe加载的内容将被视为一个独立的源

### Link Types: noreferrer

HTML5中为`<a>` `<img>` 定义了一个新的Link Types: noreferrer，指定Link Types: noreferrer后，浏览器在请求该标签指定的地址时将不会发送Referer

### Cross-Origin Resource Sharing

### postMessage - 跨窗口传递消息

### Web Storage

