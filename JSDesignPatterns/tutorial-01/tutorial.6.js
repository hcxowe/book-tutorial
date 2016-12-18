// ### Mediator 中介者模式
// 中介者是一种行为设计模式，它为我们公开一个统一的接口，系统的不同部分可通过这个接口进行通信

// 简单的中介模式
var mediator = (function() {

    var topics = {};

    var subscribe = function(topic, fn) {

        if (!topics[topic]) {
            topics[topic] = [];
        }

        topics[topic].push({
            context: this,
            callback: fn
        });

        return this;
    };

    var publish = function(topic) {

        if (!topics[topic]) {
            return false;
        }

        var args = Array.prototype.slice.call(arguments, 1);

        for (var i = 0, len = topics[topic].length; i < len; i++) {
            var subscription = topics[topic][i];
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    };

    return {
        Publish: publish,
        Subscribe: subscribe,
        installTo: function(obj) {
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };

}());

// eg
$('#chatForm').on('submit', function(e) {
    e.preventDefault();

    var text = $('#chatBox').val(),
        from = $('#fromBox').val(),
        to = $('#toBox').val();

    mediator.Publish('newMessage', { message: text, from: from, to: to });

    return false;
});

mediator.Subscribe('newMessage', function(data) {
    var date = new Date(),
        msg = data.from + ' said "' + data.message + ' "to" ' + data.to;

    $('#chatResult').prepend("" + msg + " (" + date.toLocaleTimeString() + ")");
});

mediator.Subscribe('newMessage', function(data) {
    console.log(data);
});

// ### 如何理解中介者模式与观察者模式之间的区别？
/**
 * 观察者模式中，不存在封装约束的单一对象，Subject与Observer必须合作才能维持约束，
 * 一个对象（subject）负责维护一个观察者列表，当状态变更时自动通知依赖它的所以观察者 
 */
/**
 * 中介者模式，中介者对象接受观察者注册，目标（subject）向中介者发布状态，中介者对象向所有观察者广播通知
 * （subject）通过中介者向所有观察者发布事件，观察者向中介者订阅指定类型的事件
 */