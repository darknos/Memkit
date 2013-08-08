(function() {
    var p, t = Object.prototype.toString;
    Array.isArray = Array.isArray || function(a) {
        return "[object Array]" == t.call(a);
    };
    var g, q = String.prototype.trim;
    if (q) g = function(a) {
        return null == a ? "" : q.call(a);
    }; else {
        var h, m;
        /\S/.test(" ") ? (h = /^[\s\xA0]+/, m = /[\s\xA0]+$/) : (h = /^\s+/, m = /\s+$/);
        g = function(a) {
            return null == a ? "" : a.toString().replace(h, "").replace(m, "");
        };
    }
    var u = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }, r = {}, s = function() {};
    s.prototype = {
        otag: "{{",
        ctag: "}}",
        pragmas: {},
        buffer: [],
        pragmas_implemented: {
            "IMPLICIT-ITERATOR": !0
        },
        context: {},
        render: function(a, b, c, d) {
            d || (this.context = b, this.buffer = []);
            if (this.includes("", a)) {
                a = this.render_pragmas(a);
                var e = this.render_section(a, b, c);
                !1 === e && (e = this.render_tags(a, b, c, d));
                if (d) return e;
                this.sendLines(e);
            } else {
                if (d) return a;
                this.send(a);
            }
        },
        send: function(a) {
            "" !== a && this.buffer.push(a);
        },
        sendLines: function(a) {
            if (a) {
                a = a.split("\n");
                for (var b = 0; a.length > b; b++) this.send(a[b]);
            }
        },
        render_pragmas: function(a) {
            if (!this.includes("%", a)) return a;
            var b = this, c = this.getCachedRegex("render_pragmas", function(a, b) {
                return RegExp(a + "%([\\w-]+) ?([\\w]+=[\\w]+)?" + b, "g");
            });
            return a.replace(c, function(a, c, j) {
                if (!b.pragmas_implemented[c]) throw {
                    message: "This implementation of mustache doesn't understand the '" + c + "' pragma"
                };
                b.pragmas[c] = {};
                j && (a = j.split("="), b.pragmas[c][a[0]] = a[1]);
                return "";
            });
        },
        render_partial: function(a, b, c) {
            a = g(a);
            if (!c || void 0 === c[a]) throw {
                message: "unknown_partial '" + a + "'"
            };
            return b && "object" == typeof b[a] ? this.render(c[a], b[a], c, !0) : this.render(c[a], b, c, !0);
        },
        render_section: function(a, b, c) {
            if (!this.includes("#", a) && !this.includes("^", a)) return !1;
            var d = this, e = this.getCachedRegex("render_section", function(a, b) {
                return RegExp("^([\\s\\S]*?)" + a + "(\\^|\\#)\\s*(.+)\\s*" + b + "\n*([\\s\\S]*?)" + a + "\\/\\s*\\3\\s*" + b + "\\s*([\\s\\S]*)$", "g");
            });
            return a.replace(e, function(a, e, g, f, k, l) {
                a = e ? d.render_tags(e, b, c, !0) : "";
                l = l ? d.render(l, b, c, !0) : "";
                var n;
                f = d.find(f, b);
                "^" === g ? n = !f || Array.isArray(f) && 0 === f.length ? d.render(k, b, c, !0) : "" : "#" === g && (n = Array.isArray(f) ? d.map(f, function(a) {
                    return d.render(k, d.create_context(a), c, !0);
                }).join("") : d.is_object(f) ? d.render(k, d.create_context(f), c, !0) : "function" == typeof f ? f.call(b, k, function(a) {
                    return d.render(a, b, c, !0);
                }) : f ? d.render(k, b, c, !0) : "");
                return a + n + l;
            });
        },
        render_tags: function(a, b, c, d) {
            var e = this, j = function() {
                return e.getCachedRegex("render_tags", function(a, b) {
                    return RegExp(a + "(=|!|>|&|\\{|%)?([^#\\^]+?)\\1?" + b + "+", "g");
                });
            }, g = j(), h = function(a, d, f) {
                switch (d) {
                  case "!":
                    return "";

                  case "=":
                    return e.set_delimiters(f), g = j(), "";

                  case ">":
                    return e.render_partial(f, b, c);

                  case "{":
                  case "&":
                    return e.find(f, b);

                  default:
                    return a = e.find(f, b), String(a).replace(/&(?!\w+;)|[<>"']/g, function(a) {
                        return u[a] || a;
                    });
                }
            };
            a = a.split("\n");
            for (var f = 0; a.length > f; f++) a[f] = a[f].replace(g, h, this), d || this.send(a[f]);
            if (d) return a.join("\n");
        },
        set_delimiters: function(a) {
            a = a.split(" ");
            this.otag = this.escape_regex(a[0]);
            this.ctag = this.escape_regex(a[1]);
        },
        escape_regex: function(a) {
            arguments.callee.sRE || (arguments.callee.sRE = RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)", "g"));
            return a.replace(arguments.callee.sRE, "\\$1");
        },
        find: function(a, b) {
            a = g(a);
            var c;
            if (a.match(/([a-z_]+)\./gi)) {
                var d = this.walk_context(a, b);
                (!1 === d || 0 === d || d) && (c = d);
            } else !1 === b[a] || 0 === b[a] || b[a] ? c = b[a] : (!1 === this.context[a] || 0 === this.context[a] || this.context[a]) && (c = this.context[a]);
            return "function" == typeof c ? c.apply(b) : void 0 !== c ? c : "";
        },
        walk_context: function(a, b) {
            for (var c = a.split("."), d = void 0 != b[c[0]] ? b : this.context, e = d[c.shift()]; void 0 != e && c.length > 0; ) d = e, 
            e = e[c.shift()];
            return "function" == typeof e ? e.apply(d) : e;
        },
        includes: function(a, b) {
            return -1 != b.indexOf(this.otag + a);
        },
        create_context: function(a) {
            if (this.is_object(a)) return a;
            var b = ".";
            this.pragmas["IMPLICIT-ITERATOR"] && (b = this.pragmas["IMPLICIT-ITERATOR"].iterator);
            var c = {};
            c[b] = a;
            return c;
        },
        is_object: function(a) {
            return a && "object" == typeof a;
        },
        map: function(a, b) {
            if ("function" == typeof a.map) return a.map(b);
            for (var c = [], d = a.length, e = 0; d > e; e++) c.push(b(a[e]));
            return c;
        },
        getCachedRegex: function(a, b) {
            var c = r[this.otag];
            c || (c = r[this.otag] = {});
            var d = c[this.ctag];
            d || (d = c[this.ctag] = {});
            (c = d[a]) || (c = d[a] = b(this.otag, this.ctag));
            return c;
        }
    };
    p = {
        name: "mustache.js",
        version: "0.4.0",
        to_html: function(a, b, c, d) {
            var e = new s();
            d && (e.send = d);
            e.render(a, b || {}, c);
            if (!d) return e.buffer.join("\n");
        }
    };
    (function() {
        var a = {
            VERSION: "0.10.2",
            templates: {},
            $: "undefined" != typeof window ? window.jQuery || window.Zepto || null : null,
            addTemplate: function(b, c) {
                if ("object" == typeof b) for (var d in b) this.addTemplate(d, b[d]); else a[b] ? console.error("Invalid name: " + b + ".") : a.templates[b] ? console.error('Template "' + b + '  " exists') : (a.templates[b] = c, 
                a[b] = function(c, d) {
                    c = c || {};
                    var g = p.to_html(a.templates[b], c, a.templates);
                    return a.$ && !d ? a.$(g) : g;
                });
            },
            clearAll: function() {
                for (var b in a.templates) delete a[b];
                a.templates = {};
            },
            refresh: function() {
                a.clearAll();
                a.grabTemplates();
            },
            grabTemplates: function() {
                var b, c, e, d = document.getElementsByTagName("script"), g = [];
                b = 0;
                for (c = d.length; c > b; b++) (e = d[b]) && e.innerHTML && e.id && ("text/html" === e.type || "text/x-icanhaz" === e.type) && (a.addTemplate(e.id, "".trim ? e.innerHTML.trim() : e.innerHTML.replace(/^\s+/, "").replace(/\s+$/, "")), 
                g.unshift(e));
                b = 0;
                for (c = g.length; c > b; b++) g[b].parentNode.removeChild(g[b]);
            }
        };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = a), 
        exports.ich = a) : this.ich = a;
        "undefined" != typeof document && (a.$ ? a.$(function() {
            a.grabTemplates();
        }) : document.addEventListener("DOMContentLoaded", function() {
            a.grabTemplates();
        }, !0));
    })();
})();