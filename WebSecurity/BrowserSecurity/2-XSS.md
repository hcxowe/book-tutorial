# 跨站脚本攻击 XSS

## XSS

XSS - Cross Site Script - 跨站脚本攻击

通常指黑客通过`HTML注入`篡改网页，插入恶意脚本，从而在用户浏览网页时，控制用户浏览器的一种攻击

XSS的本质是一种`HTML注入`，用户的数据被当成了HTML代码一部分来执行，从而混淆了俄原本的语义，产生了新的语义

### 反射型XSS

反射型XSS，也叫非持久型XSS（Non-persistent XSS），只是简单的把用户输入的数据`反射`给浏览器，黑客往往需要用户`点击`一个恶意链接，才能攻击成功

### 存储型XSS

存储型XSS，也叫做持久型XSS，它会把用户输入的数据`存储`在服务器端，这种XSS具有很强的稳定性

### DOM Based XSS

DOM Based XSS，通过修改页面的DOM节点形成的XSS

## XSS 攻击进阶

`Cookie劫持` `构造GET和POST请求` `XSS钓鱼` `识别用户浏览器` `识别用户安装的软件` `CSS History Hack` `获取用户的真实IP地址`

### XSS 构造技巧

- 利用字符编码
- 利用注释符绕过长度限制
- 利用loction.hash绕过长度限制
- 利用`<base>`标签
- 利用`window.name`

## XSS的防御

### HttpOnly

浏览器禁止页面的JS访问带有HttpOnly属性的Cookie

### 输入检查

检查用户输入的数据中是否包含一些特殊字符，如`< > ' "`, 如果发现特殊字符，则将这些字符过滤或者编码, 须在客户端与服务器端同时进行检查

### 输出检查

在变量输出到HTML页面时，使用编码或转义的方式来防御XSS攻击




