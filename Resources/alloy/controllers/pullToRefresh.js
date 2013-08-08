function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.tableHeader = Ti.UI.createView({
        touchEnabled: false,
        top: -60,
        height: 60,
        width: 250,
        visible: true,
        backgroundColor: "#ededed",
        id: "tableHeader"
    });
    $.__views.tableHeader && $.addTopLevelView($.__views.tableHeader);
    $.__views.arrow = Ti.UI.createView({
        touchEnabled: false,
        backgroundImage: "/images/blackArrow.png",
        width: 22,
        height: 48,
        bottom: 4,
        left: 0,
        id: "arrow"
    });
    $.__views.tableHeader.add($.__views.arrow);
    $.__views.status = Ti.UI.createLabel({
        touchEnabled: false,
        text: "Отпустите для обновления",
        bottom: 30,
        height: 14,
        color: "#000",
        textAlign: "center",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        id: "status"
    });
    $.__views.tableHeader.add($.__views.status);
    $.__views.lastUpdated = Ti.UI.createLabel({
        touchEnabled: false,
        bottom: 15,
        height: 12,
        color: "#000",
        textAlign: "center",
        font: {
            fontSize: 12
        },
        id: "lastUpdated"
    });
    $.__views.tableHeader.add($.__views.lastUpdated);
    $.__views.ai = Ti.UI.createActivityIndicator({
        left: 23,
        bottom: 13,
        width: 30,
        height: 30,
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
        id: "ai"
    });
    $.__views.tableHeader.add($.__views.ai);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.lastUpdated.text = L("update") + String.formatDate(new Date()) + " " + String.formatTime(new Date());
    var readyToPull = false;
    var loading = false;
    $.startLoading = function() {
        loading = 1;
        $.status.text = L("loading");
        $.arrow.hide();
        $.ai.show();
    };
    $.endLoading = function() {
        loading = 0;
        readyToPull = 0;
        $.status.text = "Потяните для обновления";
        $.lastUpdated.text = "Обновлено: " + String.formatDate(new Date()) + " " + String.formatTime(new Date());
        $.ai.hide();
        $.arrow.show();
        $.arrow.animate({
            transform: Ti.UI.create2DMatrix({
                rotate: 0
            }),
            duration: 0
        });
    };
    $.onScroll = function(e) {
        if (loading) return;
        if (-65 > e.y && !readyToPull) {
            readyToPull = 1;
            $.arrow.animate({
                transform: Ti.UI.create2DMatrix({
                    rotate: -180
                }),
                duration: 200
            });
            $.status.text = "Отпустите для обновления";
        }
        if (e.y > -65 && readyToPull) {
            readyToPull = 0;
            $.arrow.animate({
                transform: Ti.UI.create2DMatrix({
                    rotate: 0
                }),
                duration: 200
            });
            $.status.text = "Потяните для обновления";
        }
    };
    $.isReadyToPull = function() {
        return readyToPull;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;