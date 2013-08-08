function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        backgroundColor: "#690303",
        selectedBackgroundColor: "#530101",
        height: "44dp",
        className: "menurow",
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.title = Ti.UI.createLabel({
        color: "white",
        shadowColor: "#555874",
        right: 0,
        shadowOffset: {
            x: 0,
            y: -1
        },
        font: {
            fontSize: "16dp"
        },
        left: "48dp",
        id: "title"
    });
    $.__views.row.add($.__views.title);
    $.__views.separator = Ti.UI.createView({
        height: 1,
        backgroundColor: "#993333",
        bottom: 0,
        width: "90%",
        id: "separator"
    });
    $.__views.row.add($.__views.separator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.title.text = args.title || "";
    $.row.section_id = args.section_id;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;