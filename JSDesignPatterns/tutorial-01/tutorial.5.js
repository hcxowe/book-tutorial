// ### 发布者/订阅者模式
var pubsub = {};
(function(q) {
    var topics = {},
        subUid = -1;

    q.publish = function(topic, args) {
        if (!topics[topic]) {
            return;
        }

        var subscriber = topics[topic],
            i = 0,
            len = subscriber ? subscriber.length : 0;

        for (; i < len; i++) {
            subscriber[i].func(args);
        }
    }

    q.subscribe = function(topic, fn) {
        if (!topics[topic]) {
            topics[topic] = [];
        }

        var token = (++subUid).toString();

        topics[topic].push({
            token: token,
            func: fn
        });

        return token;
    }

    q.unsubscribe = function(token) {
        for (var n in topics) {
            if (topics[n]) {
                for (var i, len = topics[n].length; i < len; i++) {
                    if (topics[n][i].token == token) {
                        topics[n].splice(i, 1);
                        return token;
                    }
                }
            }
        }

        return this;
    }

}(pubsub));

pubsub.subscribe('xxx', function(args) {
    console.log('get xxx 1', args);
});

pubsub.subscribe('xxx', function(args) {
    console.log('get xxx 2', args);
});

pubsub.publish('xxx', { name: 'hcxowe' });