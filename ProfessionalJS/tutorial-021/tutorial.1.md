## Ajax与Comet

### XMLHttpRequest对象

```js
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        // readyState取值：0-未初始化，1-启动，2-发送，3-接收， 4-完成
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                alert(xhr.responseText);
            }
            else {

            }
        }
    };

    xhr.open('get', 'test.text', true);
    xhr.send();

    xhr.abort(); // 可以取消请求
```

#### HTTP头部信息

- 默认发送XHR请求的同事，还会发送下列头部信息：
    - Accept -- 浏览器能够处理的内容类型
    - Accept-Charset -- 浏览器能够显示的字符集
    - Accept-Encoding -- 浏览器能够处理的字符集
    - Accept- Language -- 浏览器当前设置的语言
    - Connection -- 浏览器与服务器之间的链接类型
    - Cookie -- 当前页面设置的任何Cookie
    - Host -- 发出请求的页面所在的域
    - Referer -- 发出请求的页面的URL
    - User-Agent -- 浏览器用户代理字符串

- 使用XHR.setRequestHeader(key, value)设置http请求头
- 使用XHR.getResponseHeader(key)获取响应头key字段对应的值
- 使用XHR.getALLResponseHeaders()获取所有响应头信息

##### GET请求

- 查询字符串中每个参数的名称跟值都必须使用encodeURIComponent进行编码才能放到URL的末尾

```js
    // 向url末尾添加name=value
    function addURLParam(url, name, value) {
        url += (url.indexOf('?') === -1) ? '?' : '&';
        url += encodeURIComponent(name) + '=' + encodeURIComponent(value);

        return url;
    }
```

##### POST请求

```js
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        // readyState取值：0-未初始化，1-启动，2-发送，3-接收， 4-完成
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                alert(xhr.responseText);
            }
            else {

            }
        }
    };

    xhr.open('post', 'test.action', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send({name:'hcxowe',age:30});
```

### XMLHttpRequest 2级

#### FromData

```js
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        // readyState取值：0-未初始化，1-启动，2-发送，3-接收， 4-完成
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                alert(xhr.responseText);
            }
            else {

            }
        }
    };

    xhr.open('post', 'test.action', true);
    xhr.send(new FormData(form));
```

- 使用FormData不必明确的在XHR对象上设置请求头部，XHR能够识别传入的数据类型是FormData实例，并自动配置头部信息

#### 超时设定

- IE8为XHR添加了一个timeout属性，如果超时之后会触发timeout事件

```js
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        // readyState取值：0-未初始化，1-启动，2-发送，3-接收， 4-完成
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                alert(xhr.responseText);
            }
            else {

            }
        }
    };

    xhr.open('post', 'test.action', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.timeout = 1000;
    xhr.ontimeout = function() {
        alert('time out');
    };

    xhr.send(null);
```

#### overrideMineType()方法

- 能够重写服务器返回的MIME类型

### 进度事件

- loadstart
- progress
- error
- abort
- load -- 在接受完整的响应数据时触发，IE8+只支持该事件
- loadend


### 跨资源共享


### 其他跨域技术

#### 图像Ping

```js
    var img = new Image();
    img.onload = img.onerror = function() {
        alert('done');
    };

    img.src = 'http://www.text.com/test?name=hcxowe';
```

#### JSONP

```js
    function handleResponse(resp) {

    }

    var script = document.createElement('script');
    script.src = 'http://xxx.net/json/?callback=handleResponse';
    document.body.appendChild(script);
```

#### Comet

#### Web Sockets

### 小结

- 负责Ajax的核心是XMLHttpRequest对象
- XMLHttpRequest的基本用法在不同浏览器间还是相对规范的，可以放心使用
- 同源策略是对XHR的一个主要约束
- CORS Cross-Origin Resource Sharing 跨域资源共享
- IE8通过XDomainRequest来支持CORS，其他浏览器原生支持CORS
- 图像ping和JSONP是另外两种跨域通信技术
- Comet可以让服务器实时向客户端推送数据
- Comet实现方式有：长轮询和HTTP流，所有浏览器都支持长轮询，HTTP流部分浏览器支持
- web sockets是一种与服务器进行全双工，双向通信的信道