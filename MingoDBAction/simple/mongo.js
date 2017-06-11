var mongo = require('mongodb');

var server = new mongo.Server('localhost', 27017, { auto_reconnect: true });

var db = new mongo.Db('node-mongo-text', server, { safe: true });

db.open((err, db) => {
    if (err) {
        throw err;
    }

    db.collection('users', (err, collection) => {
        collection.insert({ username: 'hcxowe', age: 28 }, (err, docs) => {
            console.log(docs);
            //db.close(false);
        });
    });

    db.collection('users', (err, collection) => {
        collection.insert( { username: 'rachel', age: 27 }, (err, docs) => {
            console.log(docs);
            db.close(true);
        });
    });

    console.log('成功建立数据库连接');
});

db.on('close', (err, db) => {
    if (err) {
        throw err;
    }

    console.log('成功关闭数据库连接');
});

