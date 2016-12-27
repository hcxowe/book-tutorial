### 脚本位置
- 脚本可并行下载
- 脚本下载会阻塞其他资源下载
- 脚本执行会阻塞资源下载与其他脚本执行
- 脚本放在body最后

### 组织脚本
- 脚本下载执行时会阻塞页面渲染
- 合并脚本，使用CDN能提升性能

### 无阻塞脚本
- 延迟脚本
    - asyn与defer都采用并行下载，下载过程不阻塞
    - asyn加载完成后自动执行，defer需要等待页面完成后执行

- 动态脚本元素
```javascript
// 动态加载脚本函数
function loadScript(url, callBack) {
    var script = document.createElement('script');
    script.type = 'text/javascript';

    if (script.readyState) {
        script.onreadystatechange = function() {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
                script.onreadystatechange = null;
                callBack && callBack();
            }
        };
    }
    else {
        script.onload = function() {
            callBack && callBack();
        };
    }

    script.src = 'xxx.js';
    document.getElementsByTagName('head')[0].appendChild(script);
}
```
- XMLHttpRequest脚本注入 -- 不能跨域
```javascript
var xhr = new XMLHttpRequest();
xhr.open('get', 'xxx.js', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300 && xhr.status == 304) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = xhr.responseText;
            document.body.appendChild(script);
        }
    }
};

xhr.send(null);
```

###总结
- 将脚本放在body闭合之前，可确保脚本在执行前页面已经完成了渲染
- 合并脚本减少脚本数量
- 使用无阻赛下载JavaScript的方法
    - defer async
    - 动态创建<script>下载并执行
    - XHR下载脚本并脚本注入页面