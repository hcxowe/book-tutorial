# 跨站点请求伪造 CSRF

## CSRF

CSRF - Cross Site Request Forgery - 跨站点请求伪造

攻击者伪造请求，诱使用户访问

其原理是攻击者构造网站后台某个功能接口的请求地址，诱导用户去点击或者用特殊方法让该请求地址自动加载。用户在登录状态下这个请求被服务端接收后会被误以为是用户合法的操作

对于 GET 形式的接口地址可轻易被攻击，对于 POST 形式的接口地址也不是百分百安全，攻击者可诱导用户进入带 Form 表单可用POST方式提交参数的页面

## CSRF 进阶


## CSRF 防御

### 验证码

### Referer 检测

### Anti CSRF Token

CSRF为什么能攻击成功，本质原因是重要操作的所有参数都可以被攻击者获取到或猜测到

服务器与客户端共同持有一个随机的Token，每次请求都进行Token的验证

