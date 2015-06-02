(function($) {
    var xprs = {};
    var services = {};
    var filters = {};
    var scopes = {
        global: {},
        request: {}
    };

    var operators = {
        '<~': ''
    };

    var TagLib = function(tag, attr, body) {
        $.extend(this, attr, {
            tag: tag,
            body: body
        })
    };

    var taglibs = {};

    var taglets = {};
    var scriptlets = {};

    var Node = function Node() {
        $.each(this, {
            tag: '',
            scriptlets: [],
            childNodes: []
        })
    };

    var Taglet = function Taglet(def) {
        $.extend(this, {
            tag: '',
            attr: {},
            template: '',
            templateUrl: '',
            scriptlets: []
        }, def);
    };

    $.extend(Taglet.prototype, {
        compile: function() {

        },
        render: function() {

        }
    });

    var Scriptlet = function Scriptlet() {

    };

    var ExpressEngine = function($dom) {

    };

    var taglet = ExpressEngine.taglet = function(def) {
        taglets[def.tag] = new Taglet(def);
    };

    ExpressEngine.scriptlet = function() {

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

    (function() {
        taglet({
            tag: 'let'
        });
        taglet({
            tag: 'each',
            processor: function(attr, body) {

            }
        })
    })();

    window.xngn = ExpressEngine;
})(jQuery);