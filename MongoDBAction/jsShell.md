## JavaScript shell

### 切换&创建

> use users

不需要显示创建，集合会在第一次插入数据时自动创建

### 插入

> db.users.insert({ name: 'hcxowe', age: 28 })

### 查询

> db.users.find() --- 查询所有   

> db.users.count() --- 查询数量

> db.users.find({ name: 'hcxowe' }) --- 查询 name === 'hcxowe' 的文档

> db.users.find({ name: 'hcxowe', age: 28 }) --- 多条件查询   

> db.users.find( $and: [{ name: 'hcxowe' }, { age: 28 }]) --- 使用 $and 操作符   
> db.users.find( $or: [{ name: 'hcxowe'}, { age: 20 }]) --- 使用 $or 操作符   
> db.users.find( { age: { $gt: 20, $lt: 30 }} ) --- 使用 $ge $lt 设置age范围， 此外还有 $gte(大于等于) $lte(小于等于) $ne(不等于)

### 更新

> db.users.update({name: 'hcxowe'}, {$set: {age: 28}}) --- 为name为hcxowe的数据设置age=8。 update默认只更新第一个文档

### 替换更新

> db.users.update({name: 'hcxowe'}, {age: 28}) --- 替换匹配的文档，但_id相同

### 高级更新

> db.users.update({name: 'hcxowe}, {$set: {movies: []}})   
> db.users.update({name: 'hcxowe'}, {$push: {movies: 'The Gold Book'}})   --- $push 给数组添加项，可重复
> db.users.update({name: 'hcxowe'}, {$addToSet: {movies: 'The Gold Book'}}, false, false) --- $addToSet 给数组添加项，不能添加重复数据， 第三个参数表示当文档不存在时是否插入一个， 第四个参数表示是否是多个更新

### 删除字段

> db.users.update({name: 'hcxowe'}, {$unset: {name: 1}}) --- 删除文档的那么字段

### 格式化输出

> db.users.find().pretty() --- 以易读的方式输出文档

### 删除文档

> db.users.remove({name: 'hcxowe'}) --- 删除匹配的文档

 ### 删除集合

 > db.users.drop() --- 删除users

 ### 帮助

 > help --- shell的帮主信息

 > db.help() --- db的方法

 ### 查询计划

 ```js
 // 向number集合中添加20000个文档
 for (var i=0; i<20000; i++) {
    db.numer.save({ num: i });
 }
 ```

 > db.numer.find({ num: { $gt: 500, $lt: 510 } }).explain('executionStats') --- 查看 mongodb 是如何获取指定条件的文档的

 > db.number.createIndex({ num: 1 }) --- 创建索引，{num: 1} 表示应该为 number 集合中所有文档的 num 键建立升序索引

 > db.numer.getIndexes() --- 获取索引信息
 
 > db.numer.find({ num: { $gt: 500, $lt: 510 } }).explain('executionStats') --- 查看此时输出的信息，应答时间大幅减少

 ### 获取数据库信息

 > show dbs --- 获取数据库列表

 > show collections --- 获取集合列表

 > db.stats() --- 低级别数据库和集合分析

 > db.number.stats() --- 查看指定集合的信息

 ### 命令如何执行

 > 无论什么功能，所有数据库命令都是在一个叫做$cmd的虚拟集合上实现查询

 > db.stats() 等价于 db.runCommand({ dbstats: 1 })

 > db.runCommand --- 可以查看方法的实现

 > db.numer.get 然后两次 Tab 可以查看已 get 开头的方法