# 高性能网站设计指南

## 性能黄金法则

### 减少HTTP请求
1. 图片地图

    ```javascript
    <img usemap="#map" src="/imgs/imagemap.gif" alt="">
    <map>
        <area shape="rect" coords="0,0,31,31" href="#" alt="">
    </map>
    ```

2. CSS Sprites
    
    多个小图片合并为一个图片，通过设置背景图片然后调整背景偏移应用小图片
    
    ```javascript
    <div style="background-image: url(sprites.gif);
            background-position: -260px -90px;
            width: 16px; height: 16px;">
    </div>
    ```

3. 内联图片
     ```
     data: [<mediatype>][;base64],<data>
     ```
     - 无需额外请求
     - IE8以下不支持
     - 编码会增加图片整体大小
     - 存在大小限制

4. 合并脚本和样式表

### 使用内容发布网络
- 内容发布网络 (Content Delivery Network)
    - 它是一组分布在不同地理位置的多个服务器，CDN会选择网络阶跃数最小的服务器或者响应时间最短的服务器响应请求
    - CDN用于发布静态内容：js css 图片 flash

### 添加Expires头
1. Expires头：
    - web服务器使用Expires头来告诉浏览器可以使用一个文件缓存直到指定的时间为止
    ```javascript
    Expires:Mon, 18 Dec 2017 15:10:04 GMT
    ```
    - Expires设置的时间需要服务器跟浏览器端系统时间同步，否则文件缓存可能会失效

2. Max-age 和 mod_expires
    ```javascript
    Cache-Control: max-age=315360000
    ```
    - web服务器使用max-age设置文件被缓存多久
    - Expires与Cache-Control同时出现，max-age将会重写Expires

### 压缩文件

1. 压缩原理
    - 浏览器在头中添加Accept-Encoding表示支持的压缩格式
    ```javascript
    Accept-Encoding： gzip, defiate
    ```
    - web服务器在头中添加Content-Encoding表示内容是什么压缩格式
    ```javascript
    Content-Encoding: gzip
    ```
    服务器发送浏览器支持的压缩内容，浏览器解压内容然后使用

2. 代理缓存
    - 当浏览器通过代理来发送请求时，在web服务器的相应中添加Vary头，服务器告诉代理根据一个或者多个请求头来改变缓存的响应
    ```javascript
    Vary: Accept-Encoding
    ```
    - 禁用代理
    ```javascript
    Cache-Control: Private
    ```

### 将样式表放在顶部

- 白屏 (IE)
    > 将样式文件放在文档底部，浏览器为了避免重绘页面，会阻止页面逐步呈现，当样式都加载完成时才绘制页面
    实际上，用户感觉缓慢的页面反而是加载最快的。

    > @import 规则会导致组件下载时的无序性，也会导致白屏现象


- 闪烁 (其他浏览器)
    > 将样式文件放在文档底部，浏览器加载页面逐步呈现，当样式都加载完成时重绘页面

    <strong>使用link标签将样式表放在head中</strong>

### 将脚本放在底部

- 脚本阻塞下载和内容呈现，直到脚本加载完成；因为脚本有可能修改页面，或者脚本之间有依赖加载顺序
- 并行下载：http1.1建议从一个主机上并行下载两个文件，实际上根据浏览器自身设置来决定
- script支持延时与异步  defer async

### 避免CSS表达式
- IE8已不支持CSS表达式
- CSS表达式执行频率过高，导致性能差

### 使用外部JS与CSS

- 相比而言，内联更快一些，因为少了http请求外部文件的开销，但是内联无法利用缓存，二次加载时候明显快过内联
- 浏览器存在几种空缓存情况：文件过期、用户手动清理、缓存过多自动清理
- 在页面加载之后，利用iframe加载一些其他页面需要用到的js和css，可以为将来访问某个页面增加效率

### 减少DNS查询 Domain Name System

- TTL time-to-live 存活时间
- 通过访问不同主机增加并行下载量会增加DNS查找，这里需要做出平衡，找到最优点
- Keep-Alive可以重用连接，减少tcp/ip响应时间

### 精简JS与CSS

- 精简：从代码中移除注释和不必要的空白符减少文件大小
- 混淆：在精简的基础上，修改代码:使用更短的变量函数名

### 避免重定向

- 重定向：将用户从一个URL重新路由到另一个
- 重定向可以跟踪用户从当前页面去到了哪里（内部或者外部）
- 信标：在用户跳转之前，请求一个非常小的图片来统计去向
- 站内使用Referer：带有URL请求参数的http请求，子页面统计这个url参数确定该url页面用户的去向
- 站外使用信标：web服务器通过信标的请求日志统计用户出站去向

### 删除重复脚本

- 确保脚本只被加载一次，现有工程化模块化使用脚本管理器管理脚本的加载

### 配置ETag 

- ETag(Entity Tag)：web服务器确认缓存有效性的一种机制，他相当于一个文件的唯一标识码
- ETag与Last-Modified一起使用的时候必须全匹配才能返回304
- 如果使用服务器集群，每个服务器上同一个文件有不同的ETag，浏览器加载不一定使用同一个服务器，可能会导致同个文件多次下载
- 如果不需要在last-modified之外在验证，则可以移除ETag验证配置

### 使Ajax可缓存

