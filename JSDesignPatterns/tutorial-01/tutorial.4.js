// ### Observer 观察者模式
// 一个对象（subject）,维持一些列依赖于它的对象（观察者），将有关状态的任何变更自动通知他们
// Subject （目标） --- 维护一系列的观察者，方便添加删除观察者
// Observer (观察者) --- 接受订阅内容改变的事件
// ConcreteSubject （具体目标） --- Subject的具体对象。 下面的例子就是将DOM元素实现位一个具体目标
// concreteObserver （具体观察者）---Observer的具体对象， 下面的例子把所有checkbox实现位观察者

// Observer模式要求希望接收到主题通知的观察者必须订阅内容改变的事件  --- 单向的由 Subject -> Observer

// 模拟一些列的Observer
function ObserverList() {
    this.observerList = [];
}

ObserverList.prototype.Add = function(obj) {
    return this.observerList.push(obj);
};

ObserverList.prototype.Empty = function() {
    this.observerList = [];
};

ObserverList.prototype.Count = function() {
    return this.observerList.length;
};

ObserverList.prototype.Get = function(index) {
    if (index > -1 && index < this.observerList.length) {
        return this.observerList[index];
    }
};

ObserverList.prototype.Insert = function(obj, index) {
    
    var poionter = -1;

    if (index === 0) {
        this.observerList.unshift(obj);
        pointer = 0;
    }
    else if (index === this.observerList.length) {
        this.observerList.push(obj);
        pointer = inex;
    }

    return pointer;
};

ObserverList.prototype.IndexOf = function(obj, startIndex) {

    var i = startIndex, 
        pointer = -1;
    
    while (i < this.observerList.length) {

        if (this.observerList[i] === obj) {
            pointer = i;
            break;
        }

        i++;
    }

    return pointer;
};

ObserverList.prototype.RemoveIndexAt = function(index) {

    if (index === 0) {
        this.observerList.shift();
    }
    else if (index === this.observerList.length) {
        this.pop();
    }
};

function extend(obj, extension) {
    for (var key in obj) {
        extension[key] = obj[key];
    }
}

// 模拟目标 Subject
function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype.AddObserver = function(observer) {
    this.observers.Add(observer);
};
Subject.prototype.RemoveObserver = function(observer) {
    this.observers.RemoveObserver(this.observers.IndexOf(observer, 0));
};
Subject.prototype.Notify = function(content) {
    var i = 0,
        len = this.observers.Count();

    for (; i < len; i++) {
        this.observers.Get(i).Update(content);
    }
};

function Observer() {
    this.Update = function() {

    };
}


// eg. 将观察者，目标 附加到DOM元素中
window.onload = function() {
    var controCheckbox = document.getElementById('mainCheckbox'),
        addBtn = document.getElementById('addNewObserver'),
        container = document.getElementById('observerContainer');

    extend(new Subject(), controCheckbox);

    controCheckbox['onclick'] = function() {
        controCheckbox.Notify(controCheckbox.checked);
    };

    addBtn['onclick'] = function() {
        var check = document.createElement('input');
        check.type = 'checkbox';

        extend(new Observer(), check);
        
        check.Update = function(value) {
            this.checked = value;
        };

        controCheckbox.AddObserver(check);

        container.appendChild(check);
    };
};

