function Controller() {
    function openArticle() {
        Alloy.Globals.feedbackView($.article);
        Alloy.Globals.showArticle(args);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.article = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            backgroundColor: "#fff",
            height: Ti.UI.SIZE,
            bottom: 33,
            layout: "vertical"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            backgroundColor: "#fff",
            width: "30.34%",
            top: 23,
            left: "2.5%",
            height: 225
        });
        _.extend(o, {
            id: "article"
        });
        return o;
    }());
    $.__views.article && $.addTopLevelView($.__views.article);
    openArticle ? $.__views.article.addEventListener("singletap", openArticle) : __defers["$.__views.article!singletap!openArticle"] = true;
    $.__views.section = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            left: 11,
            right: 11,
            top: 0,
            height: 40,
            touchEnabled: false,
            color: "#555",
            font: {
                fontSize: "18dp",
                fontFamily: "Open Sans"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            left: 6,
            right: 6,
            top: 0,
            height: 28,
            touchEnabled: false,
            color: "#555",
            font: {
                fontSize: "14dp",
                fontFamily: "Open Sans"
            }
        });
        _.extend(o, {
            id: "section"
        });
        return o;
    }());
    $.__views.article.add($.__views.section);
    $.__views.photo = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            left: 5,
            right: 5,
            touchEnabled: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            left: 3,
            right: 3,
            top: 28,
            bottom: 64,
            touchEnabled: false
        });
        _.extend(o, {
            id: "photo"
        });
        return o;
    }());
    $.__views.article.add($.__views.photo);
    $.__views.head = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            left: 11,
            right: 11,
            top: 11,
            height: 35,
            touchEnabled: false,
            color: "#555",
            font: {
                fontSize: "14dp",
                fontFamily: "Open Sans"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            left: 6,
            right: 6,
            top: 165,
            height: 35,
            touchEnabled: false,
            color: "#555",
            font: {
                fontSize: "12dp",
                fontFamily: "Open Sans"
            }
        });
        _.extend(o, {
            id: "head"
        });
        return o;
    }());
    $.__views.article.add($.__views.head);
    $.__views.time = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            left: 11,
            right: 11,
            top: 14,
            bottom: 14,
            height: 16,
            color: "#cc0000",
            font: {
                fontSize: "14dp",
                fontFamily: "Open Sans",
                fontWeight: "bold"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            left: 6,
            right: 6,
            top: 205,
            bottom: 11,
            height: 9,
            color: "#cc0000",
            font: {
                fontSize: "11dp",
                fontFamily: "Open Sans",
                fontWeight: "bold"
            }
        });
        _.extend(o, {
            id: "time"
        });
        return o;
    }());
    $.__views.article.add($.__views.time);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.applyData = function(params) {
        Ti.API.info("");
        $.section.text = params.name || "";
        $.photo.image = params.image;
        $.time.text = Alloy.Globals.formatDate(params.time) || "";
        $.head.text = params.head || "";
    };
    $.applyData(args);
    __defers["$.__views.article!singletap!openArticle"] && $.__views.article.addEventListener("singletap", openArticle);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;