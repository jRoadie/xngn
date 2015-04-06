(function() {

    var taglibs = {
        a: function() {
            return new TagLib('a', arguments);
        },
        div: function() {
            return new TagLib('div', arguments);
        },
        img: function() {
            return new TagLib('img', arguments);
        },
        p: function() {
            return new TagLib('p', arguments);
        },
        span: function() {
            return new TagLib('span', arguments);
        }
    };

    xngn = function () {

    };

    xngn.taglib = function (name, handler) {
        if(handler) {
            window[name] = taglibs[name] = handler;
        } else {
            return taglibs[name];
        }
    };

    xngn.html = function () {
        var compile = function (taglib) {
            var dom = '<' + taglib.tag;

            if(taglib.attr) {
                dom += ' ' + taglib.attr;
            }

            if(taglib.isSelfClosingTag()) {
                dom += '/>';
            } else {
                dom += '>';
                for(var i = 0; i < taglib.children.length; i++) {
                    var child = taglib.children[i];
                    if(child instanceof TagLib) {
                        dom += compile(child);
                    } else {
                        dom += child;
                    }
                }
                dom += '</' + taglib.tag + '>'
            }

            return dom;
        };

        var _dom = '';
        for(var i = 0; i < arguments.length; i++) {
            var taglib = arguments[i];
            if(taglib instanceof TagLib) {
                _dom += compile(taglib)
            }
        }
        return _dom;
    };

    var default_options = {
        document: ''
    };

    var selfClosingHtmlTags = ['img'];

    var allHtmlTags = ['div', 'h1'].concat(selfClosingHtmlTags);

    function TagLib(tag, args) {

        this.tag = tag;
        this.attr = null;
        this.children = [];
        this.options = undefined;

        var that = this;
        var setProperties = function(arg) {

            if(typeof arg === 'number' || arg instanceof Number) {
                arg = arg + '';
            }

            if(arg instanceof TagLib) {
                that.children.push(arg)
            } else if(typeof arg === 'string' || arg instanceof String) {
                if(arg.indexOf('="') > 0) { //TODO: use regex to identify
                    that.attr = arg;
                } else {
                    that.children.push(arg); //TODO: use escape html function to render text
                }
            } else if(!arg instanceof TagLib && arg instanceof Object) { //TODO: use PlainObject instead of {}
                that.options = arg;
            }
        };

        for(var i = 0; i < args.length; i++) {
            setProperties(args[i])
        }

    }

    var taglib_proto = TagLib.prototype;
    taglib_proto.isSelfClosingTag = function () {
        return selfClosingHtmlTags.indexOf(this.tag) > -1;
    };

    for(var tag in taglibs) {
        if(taglibs.hasOwnProperty(tag)) {
            window[tag] = taglibs[tag];
        }
    }

})();