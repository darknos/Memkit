function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ip.advancedListView/" + s : s.substring(0, index) + "/ip.advancedListView/" + s.substring(index + 1);
    return path;
}

function Controller() {
    new (require("alloy/widget"))("ip.advancedListView");
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.root = Ti.UI.createView({
        zIndex: 1,
        id: "root"
    });
    $.__views.root && $.addTopLevelView($.__views.root);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var options = arguments[0] || {};
    var loadingFlag = false;
    var limit = options.limit || 10;
    var offset = options.offset || 0;
    var loadOffset = options.loadOffset || 2;
    var keywords = "";
    var ptr = Alloy.createController("pullToRefresh");
    var section = Ti.UI.createListSection();
    var listView = Ti.UI.createListView(_.extend({
        headerPullView: ptr.getView(),
        sections: [ section ]
    }, options.listview));
    $.root.add(listView);
    listView.addEventListener("scroll", function(e) {
        if (e.source != listView) return;
        ptr.onScroll(e);
        if (loadingFlag) return;
        if (e.contentOffset.y > e.contentSize.height - e.size.height * loadOffset) {
            loadingFlag = true;
            $.loadData(offset, limit, keywords);
        }
    });
    listView.addEventListener("dragend", function() {
        ptr.isReadyToPull() && $.reloadData();
    });
    listView.addEventListener("itemclick", function(e) {
        var item = e.section.getItemAt(e.itemIndex);
        if (item.type && "loading" == item.type) return;
        if (item.type && "error" == item.type) {
            $.reloadData();
            return;
        }
        if (item.type && "noneData" == item.type) return;
        if (!item.no_feedback) {
            var bg = item.bg;
            e.section.updateItemAt(e.itemIndex, _.extend(item, {
                root: {
                    backgroundColor: "#fff"
                }
            }));
        }
        options.clickFunc(item, e);
        item.no_feedback || setTimeout(function() {
            e.section.updateItemAt(e.itemIndex, _.extend(item, {
                root: {
                    backgroundColor: bg
                }
            }));
        }, 300);
    });
    $.startLoading = function() {
        loadingFlag = true;
        ptr.startLoading();
        if (section.items.length > 0) section.appendItems([ {
            template: "templateService",
            label: {
                text: L("loading")
            },
            type: "loading"
        } ], Titanium.UI.iPhone.RowAnimationStyle.NONE); else {
            $.ai = Ti.UI.createActivityIndicator({
                style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
                message: L("loading"),
                color: "gray",
                font: {
                    fontSize: Alloy.CFG.headSize
                }
            });
            $.root.add($.ai);
            $.ai.show();
        }
    };
    $.removeAI = function() {
        if ($.ai) {
            $.ai.hide();
            $.root.remove($.ai);
            $.ai = null;
        }
    };
    $.endLoading = function() {
        setTimeout(function() {
            loadingFlag = false;
        }, 300);
        $.removeAI();
        ptr.endLoading();
    };
    $.stopLoading = function() {
        loadingFlag = true;
        $.removeAI();
        ptr.endLoading();
    };
    $.showError = function(index, _text, _type) {
        loadingFlag = true;
        $.removeAI();
        ptr.endLoading();
        var t = _text || L("error_retry");
        var ty = _type || "error";
        section.replaceItemsAt(index, 1, [ {
            template: "templateService",
            label: {
                text: t
            },
            type: ty
        } ], Titanium.UI.iPhone.RowAnimationStyle.NONE);
    };
    $.reloadData = function() {
        loadingFlag = false;
        section.setItems([], Titanium.UI.iPhone.RowAnimationStyle.NONE);
        offset = 0;
        $.loadData(offset, limit, keywords);
    };
    $.replaceItemsAt = function(offset, count, items) {
        section.replaceItemsAt(offset, count, items, Titanium.UI.iPhone.RowAnimationStyle.NONE);
    };
    $.incOffset = function(inc) {
        offset += inc;
    };
    $.loadData = function(offset, limit, keywords) {
        if (loadingFlag) return;
        options.loadData(offset, limit, keywords);
    };
    $.applyKeywords = function(_keywords) {
        keywords = _keywords;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;