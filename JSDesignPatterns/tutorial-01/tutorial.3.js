// ### 单例模式
var mySingleton = (function() {
    var instance = null;

    function init() {
        var privateVariable = 'this is a private';
        function privateFun() {
            return privateVariable;
        }

        return {
            publicFun: function(){
                privateFun();
            },
            publicVariable: 'this is a public'
        };
    }

    return {
        getInstance: function() {
            if (instance == null) {
                instance = init();
            }

            return instance;
        }
    };
}());

var a = mySingleton.getInstance();
var b = mySingleton.getInstance();
a === b; // true;

// 只有一个实例，唯一的实例是可以扩展的
mySingleton.getInstance = function() {
    if (this._instance == null) {
        if (isFoo()) {
            this._instance = new FooSingleton();
        }
        else {
            this._instance = new BasicSingleton();
        }
    }

    return this._instance;
}


// 单例模式用来协调其他对象
var Singletoner = (function(){
    
    function Singleton(optinos) {
        
        this.options = options || {};

        this.name = 'singletoner';
    }

    var instance = null;

    var _static = {

        name: 'singletoner',
        
        getInstance: function(options) {
            if (instance === null) {
                instance = new Singleton(options);
            }

            return instance;
        }
    };

    return _static;
}());