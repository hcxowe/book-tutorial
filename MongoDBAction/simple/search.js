var mongo = require('mongodb');

var server = new mongo.Server('localhost', 27017, { auto_reconnect: true });
var db = new mongo.Db('node-mongo-text', server, { safe: true });

db.open((err, db) => {
    db.collection('users', (err, collection) => {
        collection.find({ username: { $in: ['hcxowe', 'rachel'] }, age: { $lt: 28 } }).toArray((err, docs) => {
            console.log(docs);
            db.close();
        })
    })
})