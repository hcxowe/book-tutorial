## 基本概念

### 语法

- 区分大小写
- 标示符：变量，函数，属性，函数参数的名字，由 数字 字母 _ $ 组成
- 严格模式：   'use strict'
- 语句：可省略末尾分号，解析器自动不上，具体规则如下
    - 仅在'}'之前，一行的结束和程序的结束处推导分号
    - 仅在紧接着的标记无法解析时推导分号
    - 下一行以 ( [ + - / 字符开头的语句不会自动插入分号
    - 当脚本连接的时候，在脚本之间显示插入分号
    - 在return throw break continue ++ -- 的参数之前绝不能换行
    - 分号在for循环的头部不适用
- 关键字与保留字不作为标示符使用
- typeof判断数据类型，输出：number string undefined object boolean function
- undefined： 未赋值的变量，未参入函数的实参
- undefined 派生自 null
- null 空值，空对象
- boolean： 0 == false， !0 == true
- 八进制在严格模式下无效： 0765 === 501
- 进行算术运算时，八进制，十六进制转换为十进制计算
- 浮点数采用IEEE754标准，会产生舍入误差 0.1 + 0.2 != 0.3
- 1/0 == Infinity; -1/0 == -Infinity; 0/1 == 0; 0/0 == NaN; NaN != NaN;
- 数值转换方法：
    - Number()
        - boolean: true,false 转换为 1,0
        - null: 0
        - undefined: NaN
        - 字符串：
            - 忽略前导0
            - "" : 0
            - 符合十六进制的字符串：对应的十进制
            - 其他字符串： NaN
        - 其他对象：valueOf -> toString

    - parseInt()
        - 忽略空字符，第一个有效字符不是数字或者符号，返回NaN
        - "" : NaN
        - 能识别十六进制，十进制，八进制（默认方式ES3支持，ES5不支持）
        - 函数第二个参数明确指定转换方式

    - parseFloat()
        - 只能解析十进制
        - 第二个小数点无效

- 

