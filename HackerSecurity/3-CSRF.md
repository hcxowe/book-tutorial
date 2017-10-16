# CSRF

> CSRF - Cross Site Request Forgery -  跨站请求伪造

### 关键点

1. 跨域发出一个GET请求
2. 可以无JS参与
3. 请求是身份认证后的

### CSRF 类型

#### HTML CSRF

HTML中能够设置src/href等链接地址的标签都可以发起一个GET请求
```html
<style>
    background: url("");
</style>
<link rel="" type="" href="">
<img src="" alt="">
<a href=""></a>
<meta http-equiv="refresh" content="0; url=">
<iframe src=""></iframe>
<script src=""></script>
<bgsound src="">
<embed src="">
<video src="" width="" height="" controls></video>
<audio src="" controls></audio>
```

POST请求只能通过form提交方式

#### JSON HiJacking

通过劫持AJAX返回的json需要解析的过程来实施攻击，比如劫持跨域的回调函数，或者劫持Array

#### Flash CSRF

### 危害

- 篡改目标网站上的用户数据
- 盗取用户隐私数据
- 作为其他攻击的辅助攻击方法
- 传播CSRF蠕虫

