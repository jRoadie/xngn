(function() {

    var xngn = function () {

    };

    var default_options = {
        document: ''
    };

    var selfClosingHtmlTags = ['img'];

    var allHtmlTags = ['div', 'h1'].concat(selfClosingHtmlTags);

    var Element = function Element(tag, args) {

        this.tag = tag;
        this.attr = null;
        this.body = '';
        this.sibling = null;

        this.html = function() {
            var dom = '<' + this.tag;
            if(this.attr) {
                dom += ' ' + this.attr;
            }
            if(this.isSelfClosingTag()) {
                dom += ' />';
            } else {
                dom += this.body;
            }
            if(this.sibling) {
                dom += this.sibling.html();
            }
            return dom;
        };

        this.isSelfClosingTag = function () {
            return allHtmlTags.indexOf(this.tag) > -1;
        };

        var self = this;
        for(var i = 0; i < allHtmlTags.length; i++) {
            var t = allHtmlTags[i];
            self[t] = function () {
                self.sibling = window[t].apply(self, arguments);
                return self;
            }
        }

        var attr = args[0],
            elem = [],
            options = args[args.length - 1];
        if(attr.indexOf('="') > 0) { //has attribute TODO: use regex to identify
            //TODO: process attr properly
            this.attr = attr;
            this.tag += ' ' + attr + '>';
        } else {
            elem.push(attr);
            attr = undefined;
        }
        if(!options instanceof Element && options instanceof Object) {
            //TODO: prepare support for options
        } else {
            options = undefined;
        }

    };

    for(var i = 0; i < allHtmlTags.length; i++) {
        var tag = allHtmlTags[i];
        window[tag] = new function () {
            return new Element(tag, arguments)
        };
    }

})();