# 跨站点请求伪造 CSRF

## CSRF

CSRF - Cross Site Request Forgery - 跨站点请求伪造

攻击者伪造请求，诱使用户访问

## CSRF 进阶


## CSRF 防御

### 验证码

### Referer 检测

### Anti CSRF Token

CSRF为什么能攻击成功，本质原因是重要操作的所有参数都可以被攻击者获取到或猜测到

服务器与客户端共同持有一个随机的Token，每次请求都进行Token的验证

