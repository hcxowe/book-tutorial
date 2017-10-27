# 查询

```
> db.users.find() // 查询所有

> db.users.find({age: 27}) // 指定查询条件

> db.users.find({}, {username: 1, email: 1})  // 指定返回的键， 默认会返回_id这个键

> db.users.find({}, {username: 1, _id: 0}) // 去掉默认的_id

> db.user.find({
    age: {
        $gte: 18,
        $lt: 30 
    }
  }) // 所有age大于等于18小于30的文档  之外还有 $gt $lte $ne

> db.users.find({
    num: {
        $in: [1,2,3]
    }
  }) // 查找num为1||2||3的文档

> db.users.find({
    num: {
        $nin: [1,2,3]
    }
  }) // 查找num不为1||2||3的文档

> db.users.find({
    $or: [
        {
            username: {
                $in: ['hcx', 'fxm']
            }
        },
        {
            age: {
                $gte: 18,
                $lt: 30
            }
        }
    ]
  }) // 查找username为hcx或fxm，或者age 大于等18小于30的文档

> db.users.find({num: {$mod: [5, 1]}}) // 查找num的值除以5余1的文档 $mod 取模运算符

> db.users.find({num: {$not: {$mod: [5, 1]}}) // 取的是上一条查询的补集

> db.stock.find({desc: 'mp3'}).limit(50).skip(50).sort({price: -1}) // 查找desc为mp3的文档跳过前50条取50条按price降序排序
```

**条件语句是内层文档的键，修改器则是外层文档的键**

