# MongoDB基础知识

### 组成

- 数据库
- 集合
- 文档

### 集合名

- 不能以`system`开头
- 不能有空字符
- 不能有`$`

### 数据库名

- 不能有特殊字符
- 区分大小写
- 最多64字节
- 保留数据库：admin、local、config

### 启动mongodb

- 默认数据目录 `c:\data\db`, 没有则会启动失败
- 默认服务监听`127.0.0.1:27017`

### mongoDB shell

- 默认连接test数据库
- 功能完备的JS解释器

```js
> use foobar // 切换数据库

var post = {
    content: "hcx",
    title: 'handlesome',
    date: new Date() 
};

// 向集合blog插入一条文档post
> foobar.blog.insert(post);

// 在集合blog中查找所有文档，最多显示20条
> foobar.blog.find();

post.comments = [];
// 更新blog中content为hcx的文档为post
> foobar.blog.update({content: 'hcx'}, post);

// 删除文档
> foobar.blog.remove({content: 'hcx'});
```

- 使用 mongo --nodb 设置启动时不连接到任何mongod

```
> mongo --nodb

> conn = new Mongo('127.0.0.1:27017')
> db = conn.getDB('test');
```

## 数据类型

### 基本数据类型

- null 
- 布尔
- 数值
- 字符串
- 日期
- 正则
- 数组
- 内嵌文档
- 对象id - ObjectId

### 创建.mongorc.js文件

如果脚本被频繁加载，可以把它添加到.mongorc.js文件，这个文件会在启动shell时自动运行

`mongo --norc` 禁止加载.mongorc.js

默认这个文件在 `C:\Users\Administrator`