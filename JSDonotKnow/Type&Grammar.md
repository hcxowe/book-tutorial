# 类型与语法

## 类型

- 函数是object的一个子类型，可调用对象，它有一个内部属性[[]Call]，该属性使其可以被调用
- 函数的length属性的值是该函数声明参数的个数
- 数组也是对象，数组元素按数字顺序来进行索引

- `.`会被优先识别为数字常量的一部分，然后在是对象属性访问运算符
- 数值的误差范围值： Number.EPSILON == 2.220446049250313e-16 == 2^-52
- undefined与null类型只有一个值undefined与null，他们的名称即是类型也是值
- undefined与null的区别
    - null表示空值，undefined表示未定义值
    - null是关键字，undefined是标示符，关键字不能当作变量，标示符可以
- 不是数字的数字任然是数字类型 NaN
- NaN是js中唯一一个不等于自身的值

## 原生函数

- Function.prototype是一个空函数，RegExp.prototype是一个空正则表达式，Array.prototype是一个空数组

## 强制类型转换

- 不安全的JSON值：`undefined`， `function`， `symbol`， 包含循环引用的对象
- `JSON.stringify()`在对象中遇到`undefined`，`function`与`symbol`会自动忽略，在数组中则会返回`null`
- `toJSON()`应该返回一个能够被字符串化的安全的`JSON`值
- 使用`Object.create(null)`创建的对象，以为原型为`null`没有`valueOf`与`toString`方法，故不能进行强制类型转换
- 能转为为`false`的假值：`undefined, null, NaN, +0, -0, false, ''`, 假值意外的值都转换为true
- `!!document.all;` false
- 构造函数如果没有参数可以不用带`()`
- 隐式强制类型转换的作用是减少冗余，让代码更简洁
- `+` 如果操作数中至少一个是字符串或者能够转换为字符串，则是字符串拼接操作，否则为数字加法运算
- `[] == ![]` true
- `'',\n`等空字符串被ToNumber强制类型转换为0
- `> < <= >=`
    - 比较双方首先调用ToPromitive，如果结果出现非字符串，就根据ToNumber规则将双方强制类型转换为数字来比较
    - 比较双方都是字符串，则按字母顺序来比较

## 语法

- 语句都有一个结果值
    - var的结果值是undefined
    - 代码块`{...}`的结果值是其最后一个语句/表达式的结果
    - 代码中是无法获得这个结果值的
    - 可以通过`eval`执行语句来获得结果值

- JS不支持goto语句，但是支持便签语法，通过continue与break可以进行到标签的跳转
- else if 是我们自己发明的语法，js只有if...else

## 语法

- 用`,`来连接一系列语句时，它的优先级最低，其他操作数的优先级都比它高
- `&&`的优先级比`=`高
- `&&`的优先级比`||`高, `||`优先级比`?`高
- `?:, =`是右关联
- `do...while`循环后面必须带`;`, `while, for`循环则不需要
-  `switch(a) ... case `, a 和 case 表达式的匹配算法与 === 相同