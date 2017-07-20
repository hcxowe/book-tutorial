# 点击劫持 ClickJacking

## 什么是点击劫持

点击劫持是一种视觉上的欺骗手段，攻击者使用一个透明的，不可见的iframe，覆盖在一个网页上，然后诱使用户在该网页上进行操作，此时用户将在不知情的情况下点击透明的iframe页面。通过调整iframe页面的位置，可以诱使用户恰好点击在iframe页面的一些功能性按钮上。

## 防御ClickJacking

针对传统的ClickJacking，通过禁止跨域的iframe来防范

### frame busting

```js
if (top.location != location) {
    top.location = self.location;
}
```
以上代码，禁止iframe嵌套

### X-Fram-Options

浏览器增加一个HTTP头-X-Frame-Options，它有三个可选值：DENY/SAMEORIGIN/ALLOW-FRAME，当值为DENY时，浏览器拒绝当前页面加载任何iframe页面，SAMEORIGIN只能加载同源下的页面，ALLOW-FRAME允许加载iframe