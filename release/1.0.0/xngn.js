(function($) {
    var xprs = {};
    var services = {};
    var filters = {};
    var scopes = {
        global: {},
        request: {}
    };

    var TagLib = function(tag, attr, body) {
        $.extend(this, attr, {
            tag: tag,
            body: body
        })
    };

    var taglibs = {};

    var ExpressEngine = function($dom) {

    };

    var xproto = ExpressEngine.prototype;

    /**
     * Initializing the whole Engine
     * */
    xproto.init = function() {

    };

    xproto.service = function(service) {

    };
    xproto.taglib = function(name) {

    };
    xproto.compile = function(template) {

    };
    xproto.render = function(template, data) {

    };

    xproto.init();

    window.xngn = ExpressEngine;
})(jQuery);