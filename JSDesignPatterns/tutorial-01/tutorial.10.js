// ### Factory 工厂模式

/**
 * 使用工厂模式的场景：
 *  - 当对象或组件设置设计高复杂性时
 *  - 当需要根据所在的不同环境轻松生成对象的不同实例时
 *  - 当处理很多共享相同属性的小型对象或组件时
 *  - 在编写只需要满足一个API契约的其他对象的实例对象时，对于解耦是很有用的
 */

// 简单的工厂模式实现
function Car() {

}
function Trunk() {

}

function VehcleFactory() {

}

VehcleFactory.prototype.vehcleClass = Car;
VehcleFactory.prototype.createVehcle = function(type) {
    if (type === 'Car') {
        this.vehcleClass = Car;
    }else if (type === 'Trunk') {
        this.vehcleClass = Trunk;
    }

    return new this.vehcleClass();
};

var cFactory = new VehcleFactory();
var car = cFactory.createVehcle('Car');