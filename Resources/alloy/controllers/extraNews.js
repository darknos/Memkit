function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.table = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: "62.8%",
        left: "2.5%",
        layout: "vertical",
        backgroundColor: "#fff",
        top: 0,
        id: "table"
    });
    $.__views.table && $.addTopLevelView($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Data = require("Data");
    arguments[0] || {};
    var offset = 0;
    var limit = 9;
    $.applyData = function() {
        Data.getFeed("", offset, limit, 1, function(success, data) {
            success && _.each(data, function(rec, i) {
                var row = Alloy.createController("extraRow", rec);
                $.table.add(row.getView());
                if (data.length - 1 > i) {
                    var string = Ti.UI.createView({
                        touchEnabled: false,
                        height: 1,
                        top: 0,
                        left: 14,
                        right: 14,
                        backgroundColor: "#ddd"
                    });
                    $.table.add(string);
                }
            });
        });
    };
    $.applyData();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;