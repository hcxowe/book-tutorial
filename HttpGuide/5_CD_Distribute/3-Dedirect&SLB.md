# 内容发布与分发

## 重定向与负载均衡

> MAC --- Media Access Control --- 媒体访问控制

> NECP --- Network Element Control Protocol --- 网元控制协议

### 为什么要重定向

- 可靠地执行HTTP事务
- 最小化时延
- 节约网络带宽

### 重定向到何地

服务器，代理，缓存，网关

### 重定向的目标

尽快的将HTTP报文发送到可用的Web服务器上去

### HTTP重定向

Web服务器确定最佳的可用服务器，将短的重定向报文发回给客户端，告诉客户端向找到的最佳服务器重新请求

缺点：
- 需要原始服务器进行大量处理来判断要重定向到哪台服务器
- 增加时延，访问页面需要进行两次往返
- 如果重定向服务器出故障，站点就会瘫痪

### DNS重定向

DNS允许将几个IP地址关联到一个域中，可以配置DNS解析程序，或对其进行编程，已返回可变的IP地址

缺点：
- DNS的查询结果可能会被记住，无法打到平衡负载的功能

### 任播路由

在任播寻址中，几个地理上分散的Web服务器拥有完全相同的IP地址，而且会通过骨干路由器的`最短路径`路由功能将客户端的请求发送给离他最近的服务器

缺点：
- 要使用分布式任播技术，服务器就必须 使用路由器语言
- 路由器不需能够处理可能出现的地址冲突

### 策略路由

### IP MAC转发

在以太网中，HTTP报文都是以携带地址的数据分组的形式发送的，每个分组都有一个第四层地址，由源IP，目的IP，以及TCP端口号组成。此外每个分组还有一个第二次地址MAC地址，第二次设备的任务是接受具有特定输入MAC地址的分组，然后将其转发到特定的输出MAC地址上去

### IP地址转发

在IP地址转发中，交换机或第四层设备会检测输入分组中的TCP/IP地址，并通过修改目的IP，对分组进行响应的转发

### WCCP --- Web缓存协调协议

### ICP --- 缓存间通信协议

### HTCP --- 超文本缓存协议

### NECP --- 网元控制协议

### CARP --- 缓存阵列路由协议

### WPAD --- Web代理自动发现协议