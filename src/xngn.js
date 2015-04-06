(function() {

    var xngn = function () {

    };

    var default_options = {
        document: ''
    };

    var selfClosingHtmlTags = ['img'];

    var allHtmlTags = ['div', 'h1'].concat(selfClosingHtmlTags);

    var taglibs = {
        a: function() {
            return new EETag('a', this, arguments);
        },
        div: function() {
            return new EETag('div', this, arguments);
        },
        img: function() {
            return new EETag('img', this, arguments);
        },
        p: function() {
            return new EETag('p', this, arguments);
        },
        span: function() {
            return new EETag('span', this, arguments);
        }
    };

    function EETag(tag, caller, args) {

        this.tag = tag;
        this.attr = null;
        this.text = '';
        this.options = undefined;
        this.sibling = null;

        var that = this;
        var setProperties = function(arg) {
            if(arg.indexOf('="') > 0) { //TODO: use regex to identify
                that.attr = arg;
            } else if(typeof arg === 'string' || arg instanceof String) {
                that.text = arg; //TODO: use escape html function to render text
            } else if(!arg instanceof EETag && arg instanceof Object) { //TODO: use PlainObject instead of {}
                that.options = arg;
            }
        };

        for(var i = 0; i < args.length; i++) {
            setProperties(args[i])
        }

        if(caller instanceof EETag) {
            this.sibling = caller;
        }

    }

    var el_proto = EETag.prototype;
    el_proto.html = function() {
        var dom = '<' + this.tag;

        if(this.attr) {
            dom += ' ' + this.attr;
        }

        if(this.isSelfClosingTag()) {
            dom += ' />';
        } else {
            dom += '>';
            dom += this.text;
            dom += '</' + tag + '>'
        }

        if(this.sibling) {
            dom = this.sibling.html() + dom;
        }
        console.log(tag)
console.log(dom)
        return dom;
    };

    el_proto.isSelfClosingTag = function () {
        return selfClosingHtmlTags.indexOf(this.tag) > -1;
    };

    for(var tag in taglibs) {
        if(taglibs.hasOwnProperty(tag)) {
            window[tag] = EETag.prototype[tag] = taglibs[tag];
        }
    }

})();