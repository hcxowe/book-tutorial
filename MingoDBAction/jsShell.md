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