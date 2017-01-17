/**
 * 使用DOM-to-Object Bridge模式的原型继承
 */

var myObject = {
    init: function(options, elem) {
        this.options = $.extend({}, this.options, options);

        this.elem = elem;
        this.$elem = $(elem);

        this._build();

        return this;
    },
    options: {
        name: 'no name'
    },
    _build: function() {
        this.$elem.html('<h1>' + this.options.name + '</h1>');
    },
    myMethod: function(content) {
        this.$elem.append(content);
    }
};

if (typeof Object.create !== 'undefined') {
    Object.create = function(o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

$.plugin = function(name, object) {
    $.fn[name] = function(options) {
        return this.each(function() {
            if (!$.data(this, name)) {
                $.data(this, name, Object.create(object).init(options, this));
            }
        });
    }
};


// 用法
$.plugin('myobj', myObject);
$(body).myobj({name:'hcxowe'});

var collection = $(body).data('myobj');
collection.myMethod('meicuo, this is a test.');
