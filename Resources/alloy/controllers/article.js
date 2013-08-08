function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.webview = Ti.UI.createWebView({
        willHandleTouches: false,
        backgroundColor: "#ededed",
        id: "webview",
        url: "/html/index.html",
        width: "700"
    });
    $.__views.webview && $.addTopLevelView($.__views.webview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var data = arguments[0] || {};
    $.loadArticle = function(id) {
        $.webview.evalJS('loadArticle("' + id + '")');
    };
    $.clearArticle = function() {
        $.webview.evalJS("clearArticle()");
    };
    $.back = function(e) {
        Alloy.Globals.feedbackLabel(e.source);
        Alloy.Globals.clearArticle();
        data.fromMain ? Alloy.Globals.articleOut() : Alloy.Globals.goToMain();
    };
    $.webview.width = "100%";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;