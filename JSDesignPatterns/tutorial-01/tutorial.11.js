// ### Mixin 模式
// 模式允许对象通过较低的复杂性借用或继承功能

// 一个简单的Mixin模式 

var Car = function(settings) {
    this.model = settings.model || 'no model';
    this.color = settings.color || 'black';
};

var Mixin = function() {

};

Mixin.prototype = {
    driveForward: function() {
        console.log('drive forward');
    },

    driveBackward: function() {
        console.log('drive backward');
    }
};

function augment(rec, giv) {
    if(arguments[2]) {
        for(var i=2,len=arguments.length;i<len; i++){
            rec.prototype[arguments[i]] = giv.prototype[arguments[i]];
        }
    }
    else {
        for(var method in giv.prototype) {
            if(!Object.hasOwnProperty(rec, method)) {
                rec.prototype[method] = giv.prototype[method];
            }
        }
    }
}

augment(Car, Mixin, 'driveForward', 'driveBackward');

var myCar = new Car({
    model: 'SUV model',
    color: 'white'
});

myCar.driveForward(); // drive forward