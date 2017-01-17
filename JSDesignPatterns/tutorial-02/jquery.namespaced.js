/**
 * jQuery namespaced 'Starter' plugin boilerplate
 * author:
 */

;(function($) {
    
    if ($.myNamespace) {
        $.myNamespace = {};
    }

    $.myNamespace.myPluginName = function(el, myFunctionParam, options) {
        var base = this;
        base.$el = $(el);
        base.el = el;

        base.$el,data('myNamespace.myPluginName', base);

        base.init = function() {
            base.myFunctionParam = myFunctionParam;

            base.options = $.extend({}, $.myNamespace.myPluginName.defaultOptions, options);

            // other code
        };

        base.functionName = function(parameters) {

        };

        base.init();
    };

    $.myNamespace.myPluginName.defaultOptions = {
        myDefaultValue: ""
    };

    $.fn.mynamespace_myPluginName = function(myFunctionParam, options) {
        return this.each(function() {
            (new $.myNamespace.myPluginName(this, myFunctionParam, options));
        });
    }

}(jQuery));