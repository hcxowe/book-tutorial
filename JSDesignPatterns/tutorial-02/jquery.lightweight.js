/**
 * jQuery lightweight plugin boilerplate
 * Original author:
 * comments:
 * Licensed under the MIT license
 */

;(function($, window, document, undefined) {
    // undefined在ES3中可修改，ES5中不可修改，这里保证是真正的undefined
    // window与document通过参数传递进来当作局部变量可加快访问效率
    var pluginName = 'defaultPluginName',
        defaults = {
            propertyName: 'value'
        };

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults= defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype.init = function() {

    };

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    }

}(jQuery, window, document));