function Controller() {
    function loadMoreData() {
        Alloy.Globals.feedbackView($.loader);
        if (error) {
            error = false;
            $.parent.fireEvent("reloadNews", {
                fullReload: false
            });
            return;
        }
        $.loadMore.text = "Загрузка...";
        Alloy.Globals.loadMoreData();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.loader = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            backgroundColor: "#fff",
            width: "30.34%",
            top: 23,
            left: "2.5%",
            height: 225
        });
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            backgroundColor: "#fff",
            width: "100%",
            bottom: 11,
            height: 99
        });
        _.extend(o, {
            id: "loader"
        });
        return o;
    }());
    $.__views.loader && $.addTopLevelView($.__views.loader);
    loadMoreData ? $.__views.loader.addEventListener("singletap", loadMoreData) : __defers["$.__views.loader!singletap!loadMoreData"] = true;
    $.__views.loadMore = Ti.UI.createLabel({
        text: "Загрузить еще",
        touchEnabled: false,
        width: "90%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "loadMore"
    });
    $.__views.loader.add($.__views.loadMore);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.category_id = 0;
    $.offset = 0;
    $.limit = 20;
    var error = false;
    $.parent = null;
    $.setStage = function(args) {
        Ti.API.info("loadMore has NewStage: " + args.category_id + "/" + args.offset + "/" + args.limit);
        $.category_id = args.category_id;
        $.offset = args.offset;
        $.limit = args.limit;
    };
    $.showError = function() {
        error = true;
        $.loadMore.text = "Ошибка загрузки! Нажмите для повторной попытки.";
    };
    __defers["$.__views.loader!singletap!loadMoreData"] && $.__views.loader.addEventListener("singletap", loadMoreData);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;