## 让自己习惯JavaScript

### 知道自己使用的JS版本
- 1999年 ECMAScript3, 所有浏览器均支持
- 2009年 ECMAScript5, IE8部分支持，新型浏览器完全支持，ie7-不支持
- 2015年 ECMAScript6, 现代浏览器支持，使用babel可转ES5
- 使用es5shim.js, babel.js进行新版JS的支持

### JS的浮点数
- js中所有数组都是双精度浮点数-doubles 64位
- 浮点数的运算不精确，如：.1 + .2 = 0.30000000000000004
- 位运算符会将浮点数转换为32位整数之后进行运算，位运算符包括：~ & | ^ >> >>> <<
- -64的存储：64的二进制取反+1

### 隐式的强制类型转换
- / % * - 计算前尝试到整数的转换
- \+ 如果操作数中有字符串将进行对字符串的转换
- == 会转化为数字进行相等比较
- 位运算符将操作数转换位32位整数
- 对象到原始类型的转换：valueOf -> toString， Date：toString->valueOf
- 假值：false, 0, null, undefined, "", NaN

### 原始类型优于封装对象
- 5个原始类型： null, number, string, undefined, boolean
- 封装对象：String， Number， boolean
- 获取或者设置原始类型的属性会隐式的创建该类型的封装对象
- typeof可检查原始类型、object、function

### 避免对混合类型使用 == 运算符
- null == undefined; // true
- null和undefined 不等于 其他非null与undefined的类型对象,eg. null == 0; // false
- 原始类型与Date对象，Date使用toString->valueOf转换为原始类型
- 原始类型与非Date对象，Date使用valueOf->toString转换为原始类型
- 原始类型与原始类型，都转换成数字进行比较
- 使用===进行全等比较
- 使用显式强制类型转换

### 分号的插入机制
- 仅在'}'之前，一行的结束和程序的结束处推导分号
- 仅在紧接着的标记无法解析时推导分号
- 下一行以 ( [ + - / 字符开头的语句不会自动插入分号
- 当脚本连接的时候，在脚本之间显示插入分号
- 在return throw break continue ++ -- 的参数之前绝不能换行
- 分号在for循环的头部不适用

### 视字符串为16位的代码单元序列
- js字符串由16位的代码单元组成，而不是由Unicode代码点组成
- js使用两个代码单元表示2<sup>16</sup>及其以上的Unicode代码点。这两个代码单元称为代理对
- 代理会使字符串的方法或属性收到影响，length，chartAt，charCodeAt，此外正则表达式也将收到影响
- 使用第三方库编写可识别代码点的字符串操作