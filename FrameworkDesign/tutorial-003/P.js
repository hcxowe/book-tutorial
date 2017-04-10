var P = (function(prototype, ownProperty, undefined) {
    function isObject(o) {
        return typeof o === 'object';
    }

    function isFunction(f) {
        return typeof f === 'function';
    }
    
    // 中介者构造器
    function BareConstructor() {

    };

    function P(_superClass, definition) {
        // 没有传入两个参数，设置Object为父类
        if (definition === undefined) {
            definition = _superClass;
            _superClass = Object;
        }

        function C() {
            var self = new Bare;
            console.log(self.init);

            if (isFunction(self.init)) {
                self.init.apply(self, arguments);
            }

            return self;
        }

        // 这个构造器函数是为了不让C使用new就能返回实例
        function Bare() {

        }

        C.Bare = Bare;

        var _super = BareConstructor[prototype] = _superClass[prototype];
        var proto = Bare[prototype] = C[prototype] = new BareConstructor;

        proto.constructor = C;

        C.mixin = function(def) {
            Bare[prototype] = C[prototype] = P(C, def)[prototype];
            return C;
        }

        return (C.open = function(def) {
            var extensions = {};

            if (isFunction(def)) {
                extensions = def.call(C, proto, _super, C, _superClass);
            }
            else if (isObject(def)) {
                extensions = def;
            }

            if (isObject(extensions)) {
                for (var ext in extensions) {
                    if (ownProperty.call(extensions, ext)) {
                        proto[ext] = extensions[ext];
                    }
                }
            }

            if(!isFunction(proto.init)) {
                proto.init = _superClass;
            }

            return C;
        })(definition);
    }

    return P;
}('prototype', ({}).hasOwnProperty));

var Animal = P(function(proto, superProto) {
    proto.init = function(name) {
        this.name = name;
    };

    proto.move = function(meters) {
        console.log(this.name + ' move ' + meters + 'm.');
    };
});

var a = new Animal('aaa');
var b = Animal('bbb');

a.move(1);
b.move(2);