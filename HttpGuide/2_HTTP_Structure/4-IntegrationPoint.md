# HTTP结构

## 集成点：网关、隧道、中继

> CGI --- Common Gateway Interface --- 通用网关协议   
> RPC --- Remote Proceduce Call --- 远程接口调用   
> XML --- Extensible Markup Language --- 扩展标记语言   
> SOAP --- Simple Object Access Protocol --- 简单对象访问协议

### 在HTTP和其他协议及应用程序之间起到接口作用的网关

#### 客户端和服务器端网关
Web网关在一侧使用HTTP协议，另一侧使用其他协议，通过 `< 客户端协议 > / < 服务器协议 >`进行对网关的描述
- 服务器网关 `HTTP / Other Protocol`
- 客户端网关 `Other Protocol / HTTP`

#### 协议网关
- `HTTP / *` 服务器端Web网关
- `HTTP / HTTPS` 服务器端安全网关
- `HTTPS / HTTP` 客户端安全加速器网关

#### 资源网关
- CGI
- 服务器扩展API

### 允许不同类型的Web应用程序相互通信的应用程序接口

### 允许用户在HTTP连接上发送非HTTP流量的隧道

Web隧道，可以通过HTTP应用程序访问使用非HTTP协议的应用程序，允许用户通过HTTP连接发送非HTTP流量

### 作为一种简化的HTTP代理，一次将数据转发一跳的中继

HTTP中继是没有完全遵守HTTP规范的简单HTTP代理。中继负责处理HTTP中建立连接的部分，然后对字节进行盲转发

简单的忙中继无法正确处理Connection首部，所以有潜在的挂起Keep-alive连接的可能