## 客户端检测

### 能力检测

> 检测浏览器的能力

- IE8- typeof检测document.createElement返回object

```js
    function hasCreateElement() {
        // IE8- 不生效
        return typeof document.createElement == 'function';
    }
```

- ActiveX对象不使用typeof检测某个属性会报错，使用typeof会返回'unknown'
```js
    var xhr = new ActiveXObject('Microsoft.XMLHttp');
    if (xhr.open) { // 这里会报错

    }

    // 检测任何对象属性是否存在函数
    function isHostMethod(object, property) {
        var t = typeof object[property];

        return t == 'function' || (!!(t == 'object' && object[property])) || t == 'unknown';
    }
```

### 怪癖检测

> 怪癖检测的目标是识别浏览器的特殊行为

- IE8-中，如果实例属性与原型中某个不可枚举的属性同名，则该实例属性并不会出现在for-in循环中

```js
    // 检测怪癖特性
    var hasDontEnumQuirk = function() {
        var o = {
            toString: function() {}
        };

        for (var prop in o) {
            if (prop == 'toString') {
                return false;
            }
        }

        return true;
    }
```

### 用户代理检测

> 检测客户端浏览器，通过检测用户代理字符串来确定使用的浏览器，该字符串通过navigator.userAgent属性访问

```js
navigator.userAgent;
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36"
```
- 电子欺骗
    - 浏览器通过在自己的用户代理字符串中加入一些错误或误导性的信息来达到欺骗服务器目的

- 用户代理字符串检测技术

```js
    var client = function() {
        // 渲染引擎
        var engine = {
            ie: 0,
            gecko: 0,
            webkit: 0,
            khtml: 0,
            opera: 0,

            // 版本号
            ver: null
        };

        // 浏览器
        var browser = {
            ie: 0,
            firefox: 0,
            safari: 0,
            konq: 0,
            opera: 0,
            chrome: 0,

            // 版本号
            ver: null
        };

        var system = {
            win: false, 
            mac: false,
            x11: false,

            // 移动设备
            iphone: false,
            ipod: false,
            ipad: false,
            ios: false,
            android: false,
            nokiaN: false,
            winMobile: false,

            // 游戏系统
            wii: false,
            ps: false
        };

        var ua = navigator.userAgent;

        // opera浏览器检测
        if (window.opara) {
            engine.ver = browser.ver = window.opera.version();
            engine.opera = browser.opera = parseFloat(engine.ver);
        }
        // 检测webkit引擎
        else if (/AppleWebKit\/(\S+)/.test(ua)) {
            engine.ver = RegExp['$1'];
            engine.webkit = parseFloat(engine.ver);
            
            // 确定chrome 或者 safari
            if (/Chrome\/(\S+)/.test(ua)) {
                browser.ver = RegExp['$1'];
                browser.chrome = parseFloat(browser.ver);
            }
            else if (/Version\/(\S+)/.test(ua)) {
                browser.ver = RegExp['$1'];
                browser.safari = parseFloat(browser.ver);
            }
            else {
                var safariVersion = 1;

                if (engine.webkit < 100) {
                    safariVersion = 1;
                }
                else if (engine.webkit < 312) {
                    safariVersion = 1.2;
                }
                else if (engine.webkit < 412) {
                    safariVersion = 1.3;
                }
                else {
                    safariVersion = 2;
                }

                browser.safari = browser.ver = safariVersion;
            }

        }
        // 检测khtml引擎
        else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
            engine.ver = browser.ver = RegExp['$1'];
            engine.khtml = browser.konq = parseFloat(engine.ver);
        }
        // 检测Gecko引擎
        else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
            engine.ver = RegExp['$1'];
            engine.gecko = parseFloat(engine.ver);

            // 确定是不是firefox
            if (/Firefox\/(\S+)/.test(ua)) {
                browser.ver = RegExp['$1'];
                browser.firefox = parseFloat(browser.ver);
            }
        }
        // IE
        else if (/MSIE ([^;]+)/.test(ua)) {
            engine.ver = browser.ver = RegExp['$1'];
            engine.ie = browser.ie = parseFloat(engine.ver);
        }

        // 检测浏览器
        browser.ie = engine.ie;
        browser.opera = engine.opera;

        var p = navigator.platform;
        system.win = p.indexOf('Win') == 0;
        system.mac = p.indexOf('Mac') == 0;
        system.x11 = (p.indexOf('X11') == 0) || (p.indexOf('Linux') == 0);

        if (system.win) {
            if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
                if (RegExp['$1'] == 'NT') {
                    switch (RegExp['$2']) {
                        case '5.0':
                            system.win = '2000';
                            break;
                        case '5.1':
                            system.win = 'XP';
                            break;
                        case '6.0':
                            system.win = 'Vista';
                            break;
                        case '6.1':
                            system.win = '7';
                            break;
                        default: 
                            system.win = 'NT';
                            break;
                    }
                }
                else if (RegExp['$1']) {
                    system.win = 'ME';
                }
                else {
                    system.win = RegExp['$1'];
                }
            }
        }

        // 移动设备
        system.iphone = ua.indexOf('iPhone') > -1;
        system.ipod = ua.indexOf('iPod') > -1;
        system.ipad = ua.indexOf('iPad') > -1;
        system.nokiaN = ua.indexOf('NokiaN') > -1;

        // windows mobile
        if (system.win == 'CE') {
            system.winMobile = system.win;
        }
        else if (system.win == 'Ph') {
            if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
                system.win = 'Phone';
                system.winMobile = parseFloat(RegExp['$1']);
            }
        }

        // 检测IOS版本
        if (system.mac && ua.indexOf('Mobile') > -1) {
            if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
                system.ios = parseFloat(RegExp.$1.repalce('_', '.'));
            }
            else {
                system.ios = 2; // 猜测
            }
        }

        // 检测安卓版本
        if (/Android (\d+\.\d+)/.test(ua)) {
            system.android = parseFloat(RegExp.$1);
        }
        
        // 游戏系统
        system.wii = ua.indexOf('wii') > -1;
        system.ps = /playstation/i.test(ua);

        return {
            engine: engine,
            browser: browser,
            system: system
        };
    }();
```

### 小结

- 能力检测：在编写代码之前先检测特定浏览器的能力
- 怪癖检测：运行一小段代码，确定浏览器是否存在某一个怪癖行为
- 用户代理检测：通过用户代理字符串来检测浏览器