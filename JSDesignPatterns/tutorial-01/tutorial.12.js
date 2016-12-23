// ### Decorator 装饰者模式

function MacBook() {
    this.cast = function() {
        return 997;
    };
}

function Memory(mac) {
    var v = mac.cast();
    mac.cast = function() {
        return v + 75;
    }
}

function Engraving(mac) {
    var v = mac.cast();
    mac.cast = function() {
        return v + 75;
    }
}

function Insurance(mac) {
    var v = mac.cast();
    mac.cast = function() {
        return v + 75;
    }
}

var mb = new MacBook();
Memory(mb);
Engraving(mb);
Insurance(mb);

mb.cast(); // 1222