# let 与 const 命令

> TDZ --- Temporal Dead Zone --- 暂时性死区

## let

### 不存在变量提升

```js
console.log(a); // ReferenceError
let a = 1;
```
变量一定要在声明之后使用

### 暂时性死区

```js
var a = 1;

if (true) {
    console.log(a); // ReferenceError
    let a = 2;
}
```
在代码块内，使用let命令声明变量之前，该变量都不可用

### 不允许重复声明

```js
let a = 1;
let a = 2; // TypeError: Identifier 'a' has already been declared
var a = 3; // TypeError: Identifier 'a' has already been declared
```

### 块级作用域

特征同函数作用域

可以用用于替换立即执行匿名函数（IIFE）
```js
// 块级作用域
{
    let a = 2;
}

// IIFE
(function(){
    var a = 2;
}{})
```
ES6中块级作用域外部无法调用块级作用域内部定义的函数   
严格模式下，函数只能再顶层作用域或函数作用域内声明

## const

const声明变量时必须初始化，作用域同let命令相同

## ES6声明变量的方法
- var  `var a;`
- let   `let a;`
- const `const a = 1;`
- function  `function foo(){}`
- import    `import data from 'xx.js'`
- class     `class A {}`

## 全局对象的属性

`var` `function` 声明的全局变量依旧是全局对象的属性   
`let` `const` `class` 声明的全局变量不属于全局对象的属性 

```js
var a = 1;
window.a; // 1

let b = 2;
window.b; // undefined
```