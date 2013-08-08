function Controller() {
    function openNews() {
        Alloy.Globals.feedbackView($.root);
        Alloy.Globals.showArticle(args);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.root = Ti.UI.createView({
        height: 30,
        backgroundColor: "#fff",
        id: "root"
    });
    $.__views.root && $.addTopLevelView($.__views.root);
    openNews ? $.__views.root.addEventListener("singletap", openNews) : __defers["$.__views.root!singletap!openNews"] = true;
    $.__views.time = Ti.UI.createLabel({
        touchEnabled: false,
        left: 14,
        width: 30,
        color: "#cc0000",
        font: {
            fontSize: "11dp",
            fontFamily: "Open Sans",
            fontWeight: "bold"
        },
        id: "time"
    });
    $.__views.root.add($.__views.time);
    $.__views.name = Ti.UI.createLabel({
        touchEnabled: false,
        left: 55,
        right: 14,
        color: "#666",
        font: {
            fontSize: "13dp",
            fontFamily: "OpenSans"
        },
        height: 22,
        id: "name"
    });
    $.__views.root.add($.__views.name);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.time.text = Alloy.Globals.formatDate(args.time, true) || "";
    $.name.text = args.head || "";
    __defers["$.__views.root!singletap!openNews"] && $.__views.root.addEventListener("singletap", openNews);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;