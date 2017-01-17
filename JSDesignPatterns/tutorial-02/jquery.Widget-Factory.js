/**
 * jQuery UI Widget-Factory plugin boilerplate
 * author:
 */
;(function($, window, document, undefined) {

    $.widget('namespace.widgetname', {
        options: {
            someValue: null
        },

        _create: function() {

        },

        destory: function() {

        },

        methodB: function(event) {
            this._trigger('methodA', event, {
                key: value
            });
        },

        methodA: function(event) {

        },

        _setOption: function(key, value) {
            switch (key) {
                case 'someValue': 
                    break;
                
                default: 
                    break;
            }

            $.Widget.prototype._setOption.apply(this, arguments);
        }
    });

}(jQuery, window, document));