# HTTP: Web基础

## HTTP概述

> MIME --- Multipurpose Internet Mail Extension --- 多用途因特网邮件扩展   
> URI --- Uniform Resource Identifier --- 统一资源标示符   
> URL --- Uniform Resource Location --- 统一资源定位符   
> URN --- Uniform Resource Name --- 统一资源名   
> IP --- Internet Protocol --- 网际协议

### Web客户端与服务器是如何通信的？

通过HTTP协议，客户端发送请求，服务器返回响应

### 资源来自何方？

通过URI定位资源，确定资源位于何处

### Web事务是怎样工作的？

通过名为HTTP报文(http message)的格式化数据块进行的

### HTTP通信所使用的报文格式？

起始行： 方法 请求资源 协议/版本号    GET /index.html HTTP/1.1

首部： 一些列键值对   Accept: text/html, text/plain

主体： 需要发送的数据

### 底层TCP网络传输模式？

应用层  |  HTTP   
安全层  | SSL/TSL   
传输层  | TCP   
网络层  | IP   
数据链路层 | 网络特有的链路接口   
物理层  | 物理网络硬件   

### 有哪些不同的HTTP协议变体？

HTTP/0.9   
HTTP/1.0   
HTTP/1.0+   
HTTP/1.1   
HTTP/2.0