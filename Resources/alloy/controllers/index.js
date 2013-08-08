function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.root = Ti.UI.createWindow({
        backgroundColor: "#ededed",
        navBarHidden: "true",
        exitOnClose: true,
        id: "root"
    });
    $.__views.root && $.addTopLevelView($.__views.root);
    $.__views.menu = Alloy.createWidget("ip.slideMenu", "widget", {
        id: "menu",
        __parentSymbol: $.__views.root
    });
    $.__views.menu.setParent($.__views.root);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("Data");
    var data = [];
    var titles = [ [ 0, "Главная" ], [ 7, "Политика" ], [ 432, "Экспертиза" ], [ 10, "Общество" ], [ 14, "Экономика" ], [ 21, "Происшествия" ], [ 42, "Наука и Технологии" ], [ 11, "Здоровье" ], [ 25, "Путешествия" ], [ 12, "Культура" ], [ 9, "Аналитика" ], [ 240, "Интервью" ] ];
    var section = 0;
    _.times(titles.length, function(i) {
        data.push(Alloy.createController("menuRow", {
            title: titles[i][1],
            section_id: titles[i][0]
        }).getView());
    });
    var imgTableViewRow = Ti.UI.createView({
        touchEnabled: false,
        height: 105
    });
    imgTableViewRow.add(Ti.UI.createView({
        backgroundImage: "/images/hint.png",
        left: "5%",
        top: 11,
        width: 105,
        height: 105
    }));
    $.menu.tableView.footerView = imgTableViewRow;
    $.menu.tableView.headerView = Ti.UI.createView({
        height: "30dp",
        backgroundColor: "#690303"
    });
    $.menu.tableView.data = data;
    $.menu.tableView.addEventListener("click", function(e) {
        section = e.index;
        $.menu.tableView.selectRow(e.index);
        Alloy.Globals.showList(e.row.section_id, 0, Alloy.CFG.defaultLimit);
        Alloy.Globals.articleOut();
        if (Alloy.isTablet && 0 != e.index) {
            Alloy.Globals.sectionClicked();
            Alloy.Globals.goToMain();
        }
        $.menu.hideMenu();
    });
    Alloy.Globals.toggleRightMenu = function() {
        $.menu.toggleSlider();
    };
    Alloy.Globals.goToMain = function() {
        Alloy.Globals.selectedNews && (Alloy.Globals.selectedNews.backgroundColor = "white");
        Alloy.Globals.articleOut();
        $.menu.tableView.selectRow(0);
        Alloy.Globals.showList("", 0, 20);
        Alloy.isTablet && Alloy.Globals.mainClicked();
    };
    Alloy.Globals.feedbackView = function(obj) {
        obj.backgroundColor = Alloy.CFG.activeColor;
        setTimeout(function() {
            obj && (obj.backgroundColor = "#fff");
        }, 200);
    };
    Alloy.Globals.feedbackLabel = function(obj, back, parent) {
        obj.color = "black";
        back && parent && (parent.backgroundColor = Alloy.CFG.activeColor);
        setTimeout(function() {
            obj && (obj.color = "#666");
            parent && (parent.backgroundColor = "#fff");
        }, 200);
    };
    $.root.addEventListener("open", function() {
        $.menu.tableView.selectRow(0);
    });
    $.window = Alloy.createController("MIGNews");
    $.menu.innerwin.add($.window.getView());
    $.window.getView().fireEvent("afterOpen");
    $.root.open();
    var dialog = Ti.UI.createOptionDialog({
        cancel: 1,
        buttonNames: [ "Да", "Отмена" ],
        title: "Закрыть приложение?"
    });
    dialog.addEventListener("click", function(e) {
        0 == e.index && $.root.close();
    });
    $.root.addEventListener("android:back", function() {
        if ("article" == $.window.viewType) {
            Alloy.Globals.articleOut();
            return;
        }
        if (0 != section) {
            section = 0;
            Alloy.Globals.showList("", 0, Alloy.CFG.defaultLimit);
            return;
        }
        dialog.show();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;