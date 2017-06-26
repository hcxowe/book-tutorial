# 实体、编码、国际化

## 实体与编码

> NTP --- Network Time Protocol --- 网络时间协议

> P2P --- Perr-to-Peer --- 点对点

### HTTP需要确保它承载的'货物'满足哪些条件

- 可以被正确的识别，以便浏览器和客户端都能正确处理内容

    > 通过`Content-Type`说明媒体格式，`Content-Language`说明语言

- 可以被正确地解包

    > 通过`Content-Length`和`Content-Encoding`说明内容长度与编码格式

- 是最新的

    > 通过实体(ETag)验证码与缓存过期控制 `Expires` `Max-age`

- 符合用户的需求

    > 基于`Accept`系列的内容协商首部

- 在网络上可以快速有效地传输

    > 通过范围请求，差异编码以及其他数据压缩方法

- 完整到达，未被篡改

    > 通过传输编码首部和`Content-MD5`校验和首部

### 作为HTTP数据的容器，HTTP报文实体有哪些格式和行为

实体首部字段

- Content-Type

    > 实体中承载对象的类型

- Content-Length

    > 实体主体的长度或大小

- Content-Language

    > 与所传输对象最相配的人类语言

- Content-Encoding

    > 对象数据所做的任意变换，例如压缩

- Content-Location

    > 一个备用位置，请求时可通过它获得对象

- Content-Range

    > 如果是部分实体，说明它是整体的哪个部分

- Contet-MD5

    > 实体主体内容的校验和

- Last-Modified

    > 所传输内容在服务器上创建或最后修改的日期时间

- Expires

    > 实体数据将要失效的日期时间

- Allow

    > 该资源所允许的各种请求方法

- ETag

    > 这份文档特定实例的唯一 验证码

- Cache-Control

    > 指出应该如何缓存该文档

### HTTP如何描述实体的主体大小，HTTP为确定大小制定了哪些规则

`Content-Length`首部指示出报文中实体主体的字节大小

除非使用分块编码，否则`Content-Length`首部就是带有实体主体的报文必须使用的

规则

1. 如果特定HTTP报文类型中不允许带有主体，就忽略`Content-Length`， 如`HEAD`请求方法获取首部，不包括主体; 1XX, 204, 304响应也可以出现提示性的`Content-Length`

2. 如果报文中含有描述传输编码的Transfer-Encoding首部，那实体就应由一个称为`零字节块`的特殊模式结束，除非报文已经因连接关闭而结束

3. 如果报文中含有`Content-Length`而且没有非恒等的`Transfer-Encoding`首部，则`Content-Length`就是主体的长度，否则就忽略`Content-Length`, 因为传输编码会改变主体的表示和传输方式，因此可能会改变传输数据的字节数

4. 如果报文使用`multipart/byteranges`媒体类型，并且没有指定`Content-Length`，那多部分报文中的每个部分都要说明自身的大小

5. 1-4规则都不匹配，则实体就在连接关闭时结束

### 为了使客户端正确处理内容，使用了哪些实体首部来描述内容的格式、字母和语言

`Content-Type`说明常见的MIME类型
- text/html
- text/plain
- image/gif
- image/jpeg
- audio/x-wav
- model/vrml
- application/vnd.ms-powerpoint
- multipart/byteranges
- message/http
- application/x-www-form-urlencoded
- application/json
- multipart/form-data

### 传输编码和分块编码   

> 传输编码可以改变HTTP传输数据的方式，以改善某些类型内容的通信能力   
    
> 分块编码是一种特殊的传输编码，它把数据切分为若干块，这样可以更可靠地传输长度未知的内容

### 客户端获取所请求内容最新版本的机制

- 标记

- 标签

- 时间

- 校验和
