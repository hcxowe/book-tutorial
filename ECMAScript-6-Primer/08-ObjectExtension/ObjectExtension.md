# 对象的扩展

## 属性的简洁表示法

```js
var x = 1;
let obj = {
    x,
    y: 2,
    method() {
        console.log(this.x);
    }
}

obj.method(); // 1
```