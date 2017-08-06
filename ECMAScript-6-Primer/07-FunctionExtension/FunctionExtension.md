# 函数的扩展

## 函数参数的默认值

## rest参数

```js
function foo(...vals) {
    console.log(vals);
}

foo(1,2,3,4,5); // [1,2,3,4,5]
```

## 扩展运算符

```js
console.log(...[1,2,3]); // 1 2 3
```
