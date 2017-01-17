/**
 * 自定义事件插件模式
 */

;(function($, window, document, undefined){

    $.widget('ao.eventStatus', {
        options: {

        },

        _create: function() {
            var self = this;

            self.element.addClass('my-widget');

            self.element.on('myEventStart', function(e) {
                console.log('event start');
            });

            self.element.on('myEventEnd', function(e) {
                console.log('event end');
            });

            self.element.off('myEventStart', function(e) {
                console.log('unsubscribed to this event');
            });
        },

        destroy: function() {
            $.Widget.prototype.destory.apply(this, arguments);
        }

    });

}(jQuery, window, document));