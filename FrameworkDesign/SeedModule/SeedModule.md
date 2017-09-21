# 种子模块

> 种子模块也称核心模块，框架最先执行部分，具有扩展性，常用，稳定特点
>> 扩展性：可以将其他模块包含进来   
>> 稳定： 不轻易变更

> 种子模块具体应该包括：对象扩展，数组化，类型判定，简单的事件绑定与卸载，无冲突处理，domready

### 命名空间

如jQuery的短命名$与长命名jQuery，为自己的框架/类库定义一个命名空间

```js
window.$ = window.jQuery = {};
```

### 对象扩展

如jQuery的$.extend方法

```js
jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// 如果第一个参数为布尔值，则为deep的赋值
	if ( typeof target === "boolean" ) {
		deep = target;

		// 跳过布尔值为target赋值
		target = arguments[ i ] || {};
		i++;
	}
    
    // 当target不是object护着function时，赋值为{}
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

    // 如果只传递了一个参数则扩展jquery自身
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// 只处理不为null/undefined的参数
		if ( ( options = arguments[ i ] ) != null ) {

			// 遍历对象
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// 阻止无限循环，如果其他参数中存在target，则会无限循环
				if ( target === copy ) {
					continue;
				}

                // 如果是普通对象或者数组，进行递归
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// 这里递归
					target[ name ] = jQuery.extend( deep, clone, copy );
				} 
                // 如果是基本类型则直接赋值，排除undefined
                else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// 最后返回扩展后的对象
	return target;
};
```

### 数组化

将浏览器中存在的类数组对象转换成真正的数组

```js
makeArray: function( arr, results ) {
    var ret = results || [];

    if ( arr != null ) {
        if ( isArrayLike( Object( arr ) ) ) {
            jQuery.merge( ret,
                typeof arr === "string" ?
                [ arr ] : arr
            );
        } else {
            push.call( ret, arr );
        }
    }

    return ret;
}
```

### 类型判定

```js
var class2type = {};

jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

type: function( obj ) {
    if ( obj == null ) {
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[ toString.call( obj ) ] || "object" :
        typeof obj;
}

isFunction: function( obj ) {
    return jQuery.type( obj ) === "function";
}

isArray: Array.isArray || function( obj ) {
    return jQuery.type( obj ) === "array";
},

isWindow: function( obj ) {
    /* jshint eqeqeq: false */
    return obj != null && obj == obj.window;
},

isNumeric: function( obj ) {

    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    // adding 1 corrects loss of precision from parseFloat (#15100)
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
```

### domReady

```js
jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};
```

### 无冲突处理

```js
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

if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}
```