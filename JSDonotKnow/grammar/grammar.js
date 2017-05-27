// 语句 表达式 运算符

// 获取 {...} 代码块的结果值
var a, b;
a = eval('if(true){b = 3 + 30;}');
console.log(a); // 33;

b = (a++, a); // b = 34, a = 34

