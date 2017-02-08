## JSON

> 由于XML过于繁琐，坑长， 2006年Douglas Crockford(道格拉斯·克罗克福德)提交JSOND到IETF万维网工程特别工作组

### 语法

#### 简单值

`5 "hcxowe"`
- JSON字符串必须使用双引号

#### 对象

```JS
    var obj = {
        name: "hcxowe",
        age: 28
    };

    => JSON对象

    {
        "name": "hcxowe",
        "age": 28
    }

    => JSON字符串

    "{"name":"hcxowe","age":28}"

    var ary = [22, "hcxowe", true];

    => JSON对象

    [22, "hcxowe", true]

    => JSON字符串

    "[22,"hcxowe",true]"
```

#### 解析与序列化

- JSON.stringify(obj, filter, tabable) -- obj 序列化为 JSON字符串 默认字符串中不包括任何空白符和缩进
    - obj 要序列化的对象
    - fileter 可以为数组或者函数
        - 为函数时，传递给函数两个参数，key与value，决定如何处理序列化过程
        - 为数组时，序列化的结果只包含数组中的属性
    - tabable 如何处理缩进
        - 如果是数字，则表示每个缩进的空格数
        - 如果是字符串，则这个字符串将被用作缩进字符，字符串最长10个字符

- 假如把一个对象传入JSON.stringify(),序列化对象的顺序如下：
    - 如果对象存在toJSON(),而且能通过该方法的到有效的值，则调用该方法，否则返回对象本身
    - 如果提供了第二个参数，应用这个函数过滤器，传入函数的参数是第一步返回的值
    - 对第二步返回的每个值进行相应的序列化
    - 如果提供第三个参数，执行相应的格式化

- JSON.parse(jsonStr, replacer) -- jsonStr 解析为 js对象
```js
    var book = {
        "title": "javascript",
        "author": "hcxowe",
        "year": 2017
    };

    var jsonStr = JSON.stringify(book);

    var bookCopy = JSON.parse(jsonStr, function(key, value) {
        if (key == "author") {
            return "owexch";
        }
        else {
            return value;
        }
    });

    JSON.stringify(bookCopy);//"{"title":"javascript","author":"owexch","year":2017}"
```

- IE8+原生支持JSON




