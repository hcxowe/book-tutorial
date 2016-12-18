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

