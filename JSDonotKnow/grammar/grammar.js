// 语句 表达式 运算符

// 获取 {...} 代码块的结果值
var a, b;
a = eval('if(true){b = 3 + 30;}');
console.log(a); // 33;

b = (a++, a); // b = 34, a = 34

// 运算符优先级

//  = 优先于 ,
var a = 42, b;
b = (a++, a); // b=43; a=43;
b = a++, a; // a=44; b=43;

// && || 优先于 =
a && b; // 44 --- && || 返回选择的值
a && (b = 3); // 44 --- 不加括号会报错 a&&b返回一个值不能作为左值

// && 优先 ||
true || false && false; // true;
(true || false) && false; // false


// 运算符的关联 --- 从左至右 从右至左

// && || 是左关联
a && b && c; // 等同于 (a && b) && c;

// ?:  = 是右关联
a ? b : c ? d : e; // a ? b : (c ? d : e)
a = b = c = 3;  // a = (b = (c = 3))


switch(a){
    default: console.log('default');
    case 1: console.log(1);
    case 2: console.log(2);
    case 3: console.log(3);break;
    case 4: console.log(4);
}
// default 1 2 3