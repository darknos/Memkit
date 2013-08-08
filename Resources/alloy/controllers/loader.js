function Controller() {
    function reload() {
        if (!error) return;
        error = false;
        parent.remove($.root);
        parent.fireEvent("reloadNews", {
            fullReload: true
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.root = Ti.UI.createView({
        id: "root"
    });
    $.__views.root && $.addTopLevelView($.__views.root);
    reload ? $.__views.root.addEventListener("singletap", reload) : __defers["$.__views.root!singletap!reload"] = true;
    $.__views.ai = Ti.UI.createActivityIndicator({
        left: "40%",
        id: "ai"
    });
    $.__views.root.add($.__views.ai);
    $.__views.message = Ti.UI.createLabel({
        color: "#7e7e7e",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "20dp"
        },
        width: "90%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "message"
    });
    $.__views.root.add($.__views.message);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var parent = args.parent || null;
    var error = false;
    $.root.top = Alloy.isTablet ? 77 : 55;
    $.ai.style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
    $.startLoading = function() {
        if (!parent) return;
        $.ai.show();
        $.message.text = "Загрузка...";
        parent.add($.root);
    };
    $.endLoading = function() {
        if (!parent) return;
        $.ai.hide();
        parent.remove($.root);
    };
    $.showError = function() {
        error = true;
        $.ai.hide();
        $.message.text = "Ошибка загрузки! Проверьте соединение с сетью интернет.";
    };
    __defers["$.__views.root!singletap!reload"] && $.__views.root.addEventListener("singletap", reload);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;