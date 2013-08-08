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
            bottom: 33,
            height: Ti.UI.SIZE,
            layout: "vertical"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            backgroundColor: "#fff",
            width: "30.34%",
            top: 0,
            left: "2.5%",
            height: 278
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
            color: "#990000",
            font: {
                fontSize: "16dp",
                fontFamily: "Open Sans"
            },
            text: "Главное"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            left: 6,
            right: 6,
            top: 0,
            height: 30,
            touchEnabled: false,
            color: "#990000",
            font: {
                fontSize: "14dp",
                fontFamily: "Open Sans"
            },
            text: "Главное"
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
            left: 5,
            right: 5,
            top: 30,
            bottom: 112,
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
            top: 20,
            left: 11,
            right: 11,
            height: "auto",
            touchEnabled: false,
            color: "#555",
            font: {
                fontSize: "16dp",
                fontFamily: "Open Sans",
                fontWeight: "bold"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            left: 11,
            right: 11,
            top: 171,
            height: 36,
            touchEnabled: false,
            color: "#990000",
            font: {
                fontSize: "12dp",
                fontFamily: "Open Sans",
                fontWeight: "bold"
            }
        });
        _.extend(o, {
            id: "head"
        });
        return o;
    }());
    $.__views.article.add($.__views.head);
    $.__views.desc = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            left: 11,
            right: 11,
            top: 16,
            bottom: 40,
            height: "auto",
            touchEnabled: false,
            color: "#555",
            font: {
                fontSize: "16dp",
                fontFamily: "Open Sans"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            left: 11,
            right: 11,
            top: 208,
            bottom: 50,
            height: 46,
            touchEnabled: false,
            color: "#555",
            font: {
                fontSize: "11dp",
                fontFamily: "Open Sans"
            }
        });
        _.extend(o, {
            id: "desc"
        });
        return o;
    }());
    $.__views.article.add($.__views.desc);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.applyData = function(params) {
        Ti.API.info("PARAMS", params.toString());
        $.photo.image = "none" != params.image ? params.image : null;
        $.head.text = params.name || "";
        $.desc.text = params.desc || "";
    };
    $.applyData(args);
    __defers["$.__views.article!singletap!openArticle"] && $.__views.article.addEventListener("singletap", openArticle);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;