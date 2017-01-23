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

### 关键字与保留字

- 关键字与保留字不作为标示符使用

### 数据类型
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

- 字符串： 由16位Unicode字符组成的字符序列
    - 转义序列：
        - \n 换行
        - \r 回车
        - \t 制表
        - \b 退格
        - \xnn 以十六进制标示一个字符
        - \unnnn 以十六进制标示一个Unicode字符

    - 字符串创建之后就不能改变了，要改变变量的字符串值需要进行销毁原有值重新赋值

### 操作符

- 一元操作符
    - ++ / --
    ```js
        var str = '2';
        ++str; // 3

        str = true;
        str--; // 1
    ```

    - 一元加减操作符
    ```js
        var str = '01';
        +str; // 1

        str = '1.1';
        +str; // 1

        str = false;
        +str; // 0

        -+1; // -1
        +-1; // -1
    ```
- 位操作符
    - 按内存中数值的位来操作数值
    - 位操作符会将64位的值转化为32位进行操作，之后再转回64位值
    - 负数存储使用二进制补码：数值绝对值的二进制-> 反码 -> 加1
    - 按位非  ~
    ```js
        var a = 18;  // 00000000000000000000000000001010
        ~a;          // 11111111111111111111111111110101
        a;           // -19
    ```
    - 按位与 &
    - 按位或 |
    - 按位异或 ^
    - 左移 << 不影响符号位，使用0填充空位
    - 右移 >> 保留符号位，使用符号位来填充空位
    - 无符号右移 >>> 使用0填充空位 

- 布尔操作符
    - 逻辑非 !
    - 逻辑与 &&
    - 逻辑或 ||

- 乘性操作符
    - 乘法 \* 
    ```js
        1 * 2; //2
        Infinity * 0; // NaN
        Infinity * 1; // Infinity
        Infinity * -1; // -Infinity
    ```
    - 除法 /
    ```js
        10 / 2; // 5
        NaN / 10; // NaN
        Infinity / Infinity; // NaN
        0 / 0; // NaN
        1 / 0; // Infinity
        -1 / 0; // -Infinity
        Infinity / 10; // Infinity
    ```
    - 求模 %
    ```js
        9 % 2; //1
        Infinity % 9; //NaN
        100 % 0;  // NaN
        Infinity % Infinity; // NaN
        99 % Infinity;  // 99
        0 % 22; // 0
    ```
- 加性操作符
    - 加法 \+
        - 存在一个操作数为字符串则将另一个操作数转换为字符串
        - 当一个操作数为对象时，首先调用valueOf方法进行转换，没有valueOf方法则调用toString方法
        - Date对象会首先调用toString方法
    ```js
        1 + 1;  // 2
        Infinity + Infinity; // Infinity
        -Infinity + -Infinity; // -Infinity
        -Infinity + Infinity; // NaN
        var obj = {
            toString:function(){return 'string';}, 
            valueOf:function(){return 123;}
        };
        123 + obj; // 246
        '123' + obj; // '123123'
    ```

    - 减法 \-

- 关系操作符
    - > < >= <= 
    - 如果两个比较操作数为数值 按数值大小比较
    - 如果两个比较操作数为字符串，按字符编码值比较
    - 其他情况将不是数值的操作数调用valueOf&&toString方法转换为数值进行比较
    - 任何操作数与NaN比较结果都为false

- 相等操作符
    - == != 
    - 操作数都不是字符串和都不是对象时，将不是数值的操作数转换为数值比较相等性
    - 操作数都是对象，则比较他们引用的是否为同一对象
    - 操作数都是字符串，比较字符串值是否一致
    - null undefined 不会进行任何转换
    ```js
        false == 0; // true
        '123' == 123; // true
        null == undefined; //true
        NaN != NaN; // true
        [] != []; // true
        ({}) != {}; // true
    ```
    - === !===
    - 不进行类型转换进行比较

- 条件操作符
    - value = boolean_expression ? true_value : false_value;

- 赋值操作符
    - = += -= *=...

- 逗号操作符
    - 用在赋值时，逗号操作符返回表达式最后一项

### 语句

- if
- do-while
- while
- for
- for-in
    - 遍历对象属性的顺序是不定的
- label 
    - 标签，使用break和continue语句引用，常见于for循环配合使用，一把很少应到
    ```js
        var num = 0;
        outermost: 
        for (var i=0; i<10; i++){
            for (var j=0; j<10; j++) {
                if (i==5 && j==5) {
                    break outermost;
                }

                num++;
            }    
        }

        num;  // 55
    ```

- break,continue
    ```js
        var num = 0;
        outermost: 
        for (var i=0; i<10; i++){
            for (var j=0; j<10; j++) {
                if (i==5 && j==5) {
                    continue outermost;
                }

                num++;
            }    
        }

        num;  // 95
    ```

- with
    - with在当前作用域前使用指定的变量添加一个新的作用域
    - with会导致性能下降
    - 未来ES版本将去掉with语句
    - 尽量避免使用with语句

- switch
    - switch语句在比较值时使用的是全等操作符，不会发生类型转换

### 函数
    - 严格模式下
        - 函数命名不能为eval、arguments
        - 函数参数命名不能为eval、arguments
        - 不能出现两个同名的参数
    - 命名参数的值与arguments对象中对应的值会同步
    - js中所有参数传递的都是值
    - 函数没有重载
    - 不必指定返回类型，函数没有指定返回值，默认返回undefined


### 总结

- 基本数据类型：Undefined, Null, Boolean, String, Number, Object
- Nuber可以表示所有数值：整数，浮点数
- Object是所有对象的基础类型
- ES5的严格模式对语言中容易出错的地方进行限制
- 函数是js语言中的一等公民