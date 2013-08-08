function Controller() {
    function articleIn() {
        $.viewType = "article";
        var art = Ti.UI.createAnimation({
            left: 0,
            duration: 200
        });
        var list = Ti.UI.createAnimation({
            left: "100%",
            duration: 200
        });
        $.list.animate(list);
        $.article.animate(art);
    }
    function articleOut() {
        $.viewType = "list";
        var art = Ti.UI.createAnimation({
            left: "-100%",
            duration: 200
        });
        var list = Ti.UI.createAnimation({
            left: 0,
            duration: 200
        });
        $.list.animate(list);
        $.article.animate(art);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.root = Ti.UI.createView({
        backgroundColor: "#ededed",
        id: "root"
    });
    $.__views.root && $.addTopLevelView($.__views.root);
    $.__views.__alloyId0 = Alloy.createController("header", {
        id: "__alloyId0",
        __parentSymbol: $.__views.root
    });
    $.__views.__alloyId0.setParent($.__views.root);
    $.__views.list = Ti.UI.createScrollView({
        top: 88,
        layout: "vertical",
        scrolltype: "vertical",
        contentWidth: "100%",
        showVerticalScrollIndicator: true,
        width: "100%",
        left: 0,
        id: "list"
    });
    $.__views.root.add($.__views.list);
    $.__views.ptr = Alloy.createController("pullToRefresh", {
        id: "ptr",
        __parentSymbol: $.__views.list
    });
    $.__views.ptr.setParent($.__views.list);
    $.__views.article = Ti.UI.createView({
        top: 88,
        scrolltype: "vertical",
        contentWidth: "100%",
        showVerticalScrollIndicator: true,
        width: "100%",
        left: "-100%",
        id: "article"
    });
    $.__views.root.add($.__views.article);
    $.__views.articleContent = Alloy.createController("article", {
        id: "articleContent",
        __parentSymbol: $.__views.article
    });
    $.__views.articleContent.setParent($.__views.article);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Data = require("Data");
    arguments[0] || {};
    var loader = null;
    var loadMore = null;
    $.innerList = null;
    $.limit = Alloy.CFG.defaultLimit || 10;
    $.offset = 0;
    $.count = 0;
    $.categoryId = -1;
    var sets = Alloy.Collections.instance("set");
    sets.fetch({
        success: function(data) {
            Ti.API.info("SET", data.toJSON());
        },
        error: function() {
            $.ai.hide();
            $.errorLbl.visible = true;
        }
    });
    $.viewType = "list";
    var innerParams = {
        left: 16,
        right: 16,
        height: Ti.UI.SIZE,
        layout: "vertical",
        top: 0
    };
    Alloy.Globals.clearArticle = function() {
        $.articleContent.clearArticle();
    };
    Alloy.Globals.clearList = function() {
        if ($.innerList) {
            $.list.remove($.innerList);
            $.innerList = null;
        }
        $.offset = 0;
        $.limit = Alloy.CFG.defaultLimit || 10;
    };
    $.root.addEventListener("afterOpen", function() {
        Alloy.Globals.showList("", 0, Alloy.CFG.defaultLimit);
    });
    $.root.addEventListener("reloadNews", function(e) {
        $.offset = e.fullReload ? -1 : 0;
        Alloy.Globals.showList($.categoryId, 0, $.limit);
    });
    $.list.addEventListener("scroll", function(e) {
        if (e.source != $.list || false) return;
        $.ptr.onScroll(e);
    });
    $.list.addEventListener("dragend", function(e) {
        if (e.source != $.list || false) return;
        if ($.ptr.isReadyToPull()) {
            $.offset = -1;
            Alloy.Globals.showList($.categoryId, 0, $.limit);
        }
    });
    Alloy.Globals.loadMoreData = function() {
        Alloy.Globals.showList($.categoryId, $.count, $.limit);
    };
    Alloy.Globals.showList = function(category_id, off, lim) {
        $.viewType = "list";
        lim || (lim = Alloy.CFG.defaultLimit || 10);
        $.offset = off;
        $.limit = lim;
        $.categoryId = category_id;
        if (Alloy.isTablet) {
            innerParams.layout = "horizontal";
            innerParams.left = 5;
            innerParams.right = 5;
        }
        loader || (loader = Alloy.createController("loader", {
            parent: $.root
        }));
        if (0 == $.offset) {
            Alloy.Globals.clearList();
            Alloy.Globals.articleOut();
        }
        Data.getFeed($.categoryId, $.offset, $.limit, 0, function(success, data) {
            var newlist = false;
            if (!$.innerList) {
                newlist = true;
                $.count = 0;
                $.innerList = Ti.UI.createView(innerParams);
                loader.startLoading();
            }
            $.ptr.startLoading();
            data = data.sets;
            Ti.API.info("SUCCESS", success, data.length);
            if (success && data.length) {
                _.each(data, function(rec) {
                    var row = Alloy.createController("singleNews", rec);
                    $.innerList.add(row.getView());
                });
                if (loadMore) {
                    $.innerList.remove(loadMore.getView());
                    loadMore = null;
                }
                0 == $.offset && loader.endLoading();
                $.ptr.endLoading();
                newlist && $.list.add($.innerList);
            } else {
                $.ptr.endLoading();
                0 == $.offset ? loader.showError() : loadMore.showError();
            }
        });
    };
    Alloy.Globals.showArticle = function(_data) {
        $.articleContent.clearArticle();
        $.articleContent.loadArticle(_data.id);
        articleIn();
    };
    Alloy.Globals.articleIn = articleIn;
    Alloy.Globals.articleOut = articleOut;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;