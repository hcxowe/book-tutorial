# 创建、更新和删除文档

## 插入并保存文档

```
> db.foo.insert({bar: 'baz'})
> db.foo.bachInsert([{bar: 'foo'},{bar: 'eft'},{bar: 'bar'}])

> Object.bsonsize(db.foo) // 文档大小
```
**所有文档都必须小于16M**   
**没有_id字段，就自动增加一个**


## 删除文档

```
> db.foo.remove({}) // 删除所有文档，并不会删除集合

> db.foo.drop() // 清空集合
```

## 更新文档

**使用_id作为查询条件比使用随机字段速度更快，因为是通过_id建立的索引**

```
> db.foo.update({name: 'hcx'}, {name:'fxm',age:22}) // 整体替换， _id不变，除非指定_id

> db.foo.update({name: 'fxm'}, {$inc: {age: 1}}) // $inc 修改器 给age增加指定的值，age不存在则会创建

> db.foo.update({name: 'fxm'}, {$set: {favorite: 'game'}}) // 设置值，如果不存在键则创建

> db.foo.update({name: 'fxm'}, {$unset: {favorite: 'game'}}) // 删除favorite

> db.foo.update({name: 'fxm'}, {$push: {favorites: {name: 'hcx'}}}) // 为数组添加一项，如果数组不存在则创建

> db.foo.update({name: 'fxm'}, {
    $push: {
        favorites: {
            $each: [{name:'hyx;}, {name: 'fxm'}]
        }
    }
}) // 一次性添加多个项到数组

> db.foo.update({name: 'fxm'}, {
    $push: {
        favorites: {
            $each: [{name:'hyx',age:1}, {name: 'fxm',age:3}]
            $slice: -10, // 数组值保留后十个加入的项
            $sort: {age: -1} // 倒序
        }
    }
})

> db.foo.update({age: {$ne: 99}}, {$push: {age: 99}}) // 如果age中没有99这个项，则添加一个99到age

> db.foo.update({name: 'fxm'}, {$addToSet: {age:99}}) // 可防止重复插入

> db.foo.update({name: 'fxm'}, {$addToSet: {age: {$each: [99, 1, 2, 3]}}}) // 插入多个值并可防止重复插入
```

**$slice $sort只能与$push和$each一起使用**

#### 删除元素
```
> db.lists.insert({todo: ['hcx', 'owe', 'fxm', 'hyx'])

> db.lists.update({}, {$pull: {todo: 'hcx'}}) // 删除todo数组中hcx项

> db.lists.update({}, {$pop: {todo: 1}}) // 尾部删除一个

> db.lists.update({}, {$pop: {todo: -1}}) // 头部删除一个
```

#### 基于位置的数组修改器

```
> db.ary.insert({commets: [{author: 'hcx', votes: 1}]})

// 已知位置
> db.ary.update({}, {$inc: {'commets.0.votes': 1}) // commets第一个项的votes加1

// 未知位置
> db.ary.update({'commets.author: 'hcx'}, {$set: {'commets.$.votes': 1}})
```






