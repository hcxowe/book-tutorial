// ### Command 命令模式
// 将方法调用、请求或操作封装到单一对象中，从而根据我们不同请求对客户进行参数化和传递可供执行的方法调用

var CarManger = (function() {
    var action = {
        requireInfo: function(model, id) {
            console.log('execute requireInfo', model, id);
        },

        buyVahicle: function(model, id) {
            console.log('execute buyVahicle', model, id);
        },

        arrangeViewing: function(model, id) {
            console.log('execute arrangeViewing', model, id);
        }
    };

    return {
        execute: function(type) {
            if (typeof action[type] === 'function') {
                action[type].apply(this, [].slice.call(arguments, 1));
            }
            else{
                console.log('not find command!');
            }
        }
    }
}());

CarManger.execute('requireInfo', '111','3334'); // execute requireInfo 111 3334

// 命令模式需要用户知道有那些命令，这些命令有什么作用，否则无法使用命令模式~~！