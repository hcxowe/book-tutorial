/**
 * 栈
 */
function Stack() {
    this.dataStore = [];
    this.top = 0;
}

Stack.prototype =  {
    push: function(item) {
        this.dataStore.push(item);
        this.top++;
    },

    peek: function() {
        return this.dataStore[this.dataStore.length-1];
    },

    pop: function() {
        return this.dataStore.pop();
        this.top--;
    },

    clear: function() {
        this.dataStore.length = 0;
        this.top = 0;
    },

    length: function() {
        return this.dataStore.length;
    },

    toString: function(split) {
        return this.dataStore;
    }
};

// 数制间的转换
function numTranslate(num, base) {
    var stack = new Stack();

    do {
        stack.push(num % base);
        num = Math.floor(num / base);
    }
    while(num > 0);

    return stack.toString().reverse().join('');
}

function parseBaseNum(str, base) {
    var num = 0;
    for (var i=0,len=str.length; i<len; i++) {
        num += str[i] * Math.pow(base, len-i-1);
    }

    return num;
}

console.log(numTranslate(8, 2)); // 1000
console.log(parseInt(numTranslate(8, 2), 2));
console.log(parseBaseNum('1111111', 2));
