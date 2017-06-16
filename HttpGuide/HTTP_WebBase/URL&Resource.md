# HTTP: Web基础

## URL与资源

> URI --- Uniform Resource Identifier --- 统一资源标示符   
> URL --- Uniform Resource Location --- 统一资源定位符   
> URN --- Uniform Resource Name --- 统一资源名   
> SMTP --- Simple Mail Transfer Protocol --- 简单邮件传输协议
> RTSP --- Real Time Transfer Protocol --- 实时流传输协议
> IETF --- Internet Engineering Task Force --- 因特网工程任务组
> PURL --- Persistent Uniform Resource Location --- 永久统一资源定位符

### URL语法，各种URL组件的含义及其所做的工作

通用格式：`<scheme>://<user>:<password>@<host>:<port>/<path>;<param>?<query>#<frag>`   

scheme - 方案 ： 获取资源使用的协议   
user - 用户 ： 某些方案访问资源所需的用户名   
password - 密码 ：对应用户的密码   
host - 主机 ： 资源宿主服务器的主机名/ip地址  
port - 端口 ： 资源宿主服务器监听的端口   
path - 路径 ： 服务器上资源的本地名   
param - 参数 ： 某些方案需要这个组件指定输入参数，参数为名/值对，多个参数使用分号隔开   
query - 查询 ： 使用字符 ? 将其与URL其余部分分隔   
frag - 片段 : 一小片或一部分资源的名字， 使用 # 与URL其他部分隔开

### URL快捷方式 - 相对URL与自动扩展URL

URL分两种方式： 相对URL与绝对URL   
绝对URL包含访问资源所需的全部信息   
相对URL需要根据基础URL进行解析为绝对URL
   
   
自动扩展
- 浏览器自动补全主机名，方案等简单技巧来节省用户输入URL的时间
- 浏览器从历史记录中匹配输入的部分URL, 提示一些完整的URL供用户选择

### URL的编码和字符规则

通过 转义序列 用US-ASCII字符集的有限子集对任意字符值或数据进行编码，实现URL的可移植性和完整性，比如 ~ 转义 %7， 空格 转移 %20， % 转义 %25

有些字符在URL中有特殊的含义，使用在特殊含义之外的地方时需要进行编码： `% / . .. # ? ; : $ + @ & = { } | \ ^ ~ [ ] ' < > "`
一定范围内的十六进制字符需要编码：`0x00-0x1F, 0x7F  >0x7F`

在发送URL之前最好把所有不安全或受限字符都进行编码

### 支持各种因特网信息系统的常见URL方案

常见的方案： `http; https; mailto; ftp; rtsp; rtspu; file; news; telnet;`

### URN

URN为对象提供一个稳定的名称，无论对象被搬移到那里都能够追踪到它