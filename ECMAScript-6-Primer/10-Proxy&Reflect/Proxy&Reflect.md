# Proxy 与 Reflect

## Proxy

Proxy用于修改某些操作的默认行为，等同于在语言方面坐出修改，属于`元编程`，对编程语言进行编程

Proxy在目标对象前设置`拦截`层，对对象的访问都需要经过这层拦截，可以对外接的访问进行过滤和改写，代理对目标对象的某些操作

### Proxy实例的方法

#### get

```js
var obj = {
    name: 'hcx'
};

var proxy = new Proxy(obj, {
    get: function(target, property) {
        if (property in target) {
            return target[property];
        }
        else {
            throw new ReferenceError('Property "' + property + '" does not exist.');
        }
    }
});

proxy.name; // hcx
proxy.age; // ReferenceError
```

#### set

```js
let person = new Proxy({}, {
    set (obj, prop, value) {
        if (prop == 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
            }

            if (value > 200) {
                throw new RangeError('The age seems invalid');
            }
        }

        obj[prop] = value;
    }
});

person.age = 'xxx'; // TypeError: The age is not an integer
person.age = 300; // RangeError: The age seems invalid
person.age = 100;
```

#### apply

apply 拦截函数的调用，call，apply操作

```js
var foo = function() { console.log('foo')};

var p = new Proxy(foo, {
    apply (target, ctx, args) {
        console.log('apply proxy');
    }
});

foo(); // foo
p(); // apply proxy
p.apply(null, []); // apply proxy
p.call(null); // apply proxy
```

#### has

has方法隐藏某些属性，不被 in 操作符发现

```js
var target = {
    _prop: '_foo',
    prop: 'foo'
};

var p = new Proxy(target, {
    has (target, key) {
        if (key[0] == '_') {
            return false;
        }

        return key in target;
    }
});

'_prop' in p; // false
'prop' in p; // true
```

#### construct

construct 用于拦截new命令

#### deleteProperty

deleteProperty用于delete拦截，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除

#### defineProperty

defineProperty 拦截Object.defineProperty

#### enumerate

enumerate 拦截 for...in 循环

 ```js
 var target = {
     _prop: '_prop',
     prop: 'prop',
     foo: 'foo',
     _bar: '_bar'
 };

 var p = new Proxy(target, {
     enumerate (target) {
         console.log('enumerate');
         return Object.keys(target).filter(key => key[0] !== '_')[Symbol.iterator]();
     }
 });

 for (let key in p) {
     console.log(key);
 }
 ```

 #### getOwnPropertyDescriptor

 getOwnPropertyDescriptor 拦截Object.getOwnPropertyDescriptor 返回一个属性描述对象或undefined

 #### getPrototypeOf

 getPrototypeOf 拦截 Object.getPrototypeOf 运算符

 #### isExtensible

 isExtensible 拦截 Object.isExtensible 操作

 #### ownKeys

 ownKeys 拦截 Object.keys 操作

 #### preventExtensions

 preventExtensions 拦截 Object.preventExtensions, 该方法必须返回一个布尔值

 #### setPrototypeOf

 setPrototypeOf 主要用于拦截 Object.setPrototypeOf 方法

 ### Proxy.revocable

 Proxy.revocable 返回一个可取消的Proxy实例

 ```js
 let target = {};
 let handler = {};

 let {proxy, revoke} = Proxy.revocable(target, handler);

 proxy.foo = 123;
 proxy.foo; // 123

 revoke(); // 取消Proxy实例

 proxy.foo; // TypeError: Cannot perform 'get' on a proxy that has been revoked
 ```

## Reflect

作用：
- 将Object对象一些明显属于语言层面的方法放到Reflect对象上
- 修改某些Object方法的返回结果，让其变得更合理
- 让Object操作都变成函数行为
- Reflect对象的方法与Proxy对象的方法一一对应，这就让Proxy对象可以方便的用对应的Reflect方法完成默认行为 

```js
var logObj = new Proxy(obj, {
    get (target, key) {
        console.log('get', target, key);
        return Reflect.get(target, key);
    },
    deleteProperty (target, key) {
        console.log('delet' + key);
        return Reflect.deleteProperty(target, key);
    },
    has (target, key) {
        console.log('has' + key);
        return Reflect.has(target, name);
    }
});
```
每一个Proxy拦截操作内部都调用了对应的Reflect方法，保证原生行为能够正常执行