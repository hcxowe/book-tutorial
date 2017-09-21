/**
 * 命名空间：window对象的一个属性，包裹自身，防止变量污染
 */

// Hcx 即是一个命名空间
if (typeof Hcx === 'undefined') {
    Hcx = {};
    Hcx.Array = {};
    Hcx.Function = {};
    Hcx.XHR = {};
}

// jQuery的防冲突实现
var _jQuery = window.jQuery, _$ = window.$;  // 保存可能冲突的变量

jQuery.extend({
    noConflict: function(deep) {
        window.$ = _$; // 这里把保存的变量赋值回去
        if (deep) {
            window.jQuery = _jQuery;
        }

        return jQuery; // 返回jQuery自身，用户可以自己定义一个变量保存
    }
});

/**
 * 对象扩展：能将新功能添加到自己的命名空间， 如 jQuery.extend()方法
 */
Object.keys = Object.keys || function(obj) {
    var a = [];
    for (a[length] in obj){

    }

    return a;
}

/**
 * mass Framework 的 mix 方法
 */
function mix(target, source) {
    var args = [].slice.call(arguments),
        i = 1,
        key,
        ride = typeof args[args.length - 1] == 'boolean' ? args.pop() : true; // 获取最后一个参数，表示是否覆盖已有属性

    // 处理扩展自身情形
    if (args.length == 1) {
        target = !this.window ? this : {};
        i = 0;
    }

    while ((source = args[i++])) {
        for (key in source) {
            if (ride || !(key in target)) {
                target[key] = source[key];
            }
        }
    }

    return target;
}

/**
 * jQuery 的 extend()方法
 */
jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

/**
 * 数组化： 将类数组转化为数组，从而可以使用数组的简便方法
 */

// 自定义一个类数组， 其他常见的类数组有 arguments， NodeList， HTMLCollection 等等
var arrayLike = {
    '1': 1,
    '2': 2,
    length: 2
};

// 一般通过[].slice.call()

/**
 * jQuery的数组化方法
 */
var markArray = function(array) {
    var ret = [];
    if (array != null) {
        var i = array.length;

        // window对象 字符串 函数 有length属性
        if (i == null || typeof array === 'string' || jQuery.isFunction(array) || array.setInterval) {
            ret[0] = array;
        } 
        else {
            while(i) {
                ret[--i] = array[i];
            }
        }
    }

    return ret;
}

/**
 * Prototype 的 $A方法
 */
function $A(iterable) {
    if (!iterable) {
        return [];
    }

    if (iterable.toArray) {
        return iterable.toArray();
    }

    var length = iterable.length || 0, results = new Array(length);

    while (length--) {
        ret[length] = iterable[length];
    }

    return ret;
}

/**
 * 类型的判定：
 * typeof输出 string number undefined function boolean object， IE下 typeof还会输出unknown
 * instanceof 只要对象的原型上存在该对象则返回true， 跨iframe的对象无法判断
 */

// 这里由于人们把document.all认为是IE特有的，导致chrome有如下输出
typeof document.all; // undefined 
document.all; // HTMLAllCollection[60028]

undefined == void 0; // true
typeof new Boolean(true); // Object

window == document;// IE678 true
document == window; // IE678 false

// 因为隐式的类型转换，有如下现象
1<2<3; // true
3>2>1; // false  3>2 true => true转化为1 => 1>1 == false

function isNaN(obj) {
    return obj !== obj;
}

function isNull(obj) {
    return obj === null;
}

function isUndefined(obj) {
    return obj === void 0;
}


/**
 * jQuery的类型判定实现
 */

var class2type = {};
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;

jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

// 类数组判定
function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

jQuery.extend({
    type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ? class2type[ toString.call( obj ) ] || "object" : typeof obj;
	},

    isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

    isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},
    // 判定是否为纯净对象：不是DOM BOM对象，也不是自定义的对象的实例
	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	}
});

/**
 * 主流框架引入的机制 -- domReady
 * 1、支持DOMContentLoaded
 * 2、旧版本IE使用Diego Perini的hack方法
 */

// Diego Perini的hack方法
function IEContentLoaded(w, fn) {
    var d = w.document, 
        done = false,
        init = function() {
            if (!done) {
                done = true;
                fn();
            }
        };

    (function() {
        try {
            d.documentElement.doScroll('left');
        }
        catch(e) {
            setTimeout(argument.callee, 50);
            return;
        }

        init();
    });

    d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
            d.onreadystatechange = null;
            init();
        }
    };
}

/**
 * 无冲突处理：多个库共存
 */

/** 
 * jQuery的无冲突实现
 * 
 */
// 现将要被覆盖的变量保存起来
var _jQuery = window.jQuery,
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};