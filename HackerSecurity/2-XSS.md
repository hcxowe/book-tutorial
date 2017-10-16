# XSS

> XSS - Cross Site Scripting

**想办法将你的脚本内容在目标网站中目标用户的浏览器上执行**

### XSS分类

共同点，就是浏览器直接或间接的执行了用户输入的XSS

#### 反射型XSS / 非持久型XSS

发出请求时，XSS代码出现在URL中，作为输入提交到服务器，服务器解析后，在相应内容中出现这段XSS代码，最后浏览器执行。这个过程就像一次反射，故成为反射型XSS

#### 存储型XSS / 持久型XSS

提交的XSS存放在服务端，下次请求目标页面不再提交XSS代码，例如，将XSS代码存放在内存，数据库，文件系统中，下次响应带上了XSS代码

#### DOM XSS

DOM XSS 并不需要服务端参与，浏览器DOM解析了XSS代码，例如，直接将用户输入部分当作html插入到DOM中

### 常用的输入点

1. document.URL
2. document.URLUnencoded
3. document.location
4. document.referrer
5. window.location
6. window.name
7. document.cookie

#### 常用的输出点

1. document.write
2. document.writeln
3. document.body.innerHtml
4. document.form[0].action
5. document.attachEvent
6. document.create...
7. document.execCommand
8. ...

### XSS危害

1. 挂马
2. 盗取cookie
3. DoS
4. 钓鱼攻击
5. 蠕虫
6. 劫持用户Web行为，甚至进一步渗透内网
7. 篡改数据