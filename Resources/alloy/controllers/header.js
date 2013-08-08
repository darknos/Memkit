function Controller() {
    function OnToggleMenu() {
        $.btnMenu.top = 2;
        Alloy.Globals.toggleRightMenu();
        setTimeout(function() {
            $.btnMenu.top = 0;
        }, 200);
    }
    function toMain(e) {
        Alloy.Globals.feedbackLabel(e.source);
        Alloy.Globals.goToMain();
    }
    function sectionClicked(e) {
        isMain = 0;
        line.animate(animSection);
        e && e.onlyAnimation || Alloy.Globals.toggleRightMenu();
    }
    function mainClicked() {
        isMain = 1;
        line.animate(animMain);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.root = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            top: 0,
            height: 88
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            top: 0,
            height: 88
        });
        _.extend(o, {
            id: "root"
        });
        return o;
    }());
    $.__views.root && $.addTopLevelView($.__views.root);
    $.__views.timer = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            left: 19,
            top: 27,
            width: 33,
            height: 33,
            backgroundImage: "/images/timer.png"
        });
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            left: 16,
            width: 33,
            height: 33,
            backgroundImage: "/images/timer.png"
        });
        _.extend(o, {
            id: "timer"
        });
        return o;
    }());
    $.__views.root.add($.__views.timer);
    $.__views.logo = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            left: 58,
            width: 217,
            height: 33,
            backgroundImage: "/images/logo.png",
            top: 27
        });
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            left: 53,
            width: 184,
            height: 30,
            backgroundImage: "/images/logo.png"
        });
        _.extend(o, {
            id: "logo"
        });
        return o;
    }());
    $.__views.root.add($.__views.logo);
    toMain ? $.__views.logo.addEventListener("singletap", toMain) : __defers["$.__views.logo!singletap!toMain"] = true;
    $.__views.main = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            height: 83,
            top: 5
        });
        _.extend(o, {
            color: "#666",
            font: {
                fontSize: "15dp",
                fontFamily: "Open Sans"
            },
            right: 175,
            text: "Главная",
            id: "main",
            visible: "false"
        });
        return o;
    }());
    $.__views.root.add($.__views.main);
    toMain ? $.__views.main.addEventListener("singletap", toMain) : __defers["$.__views.main!singletap!toMain"] = true;
    $.__views.section = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            height: 83,
            top: 5
        });
        _.extend(o, {
            color: "#666",
            font: {
                fontSize: "15dp",
                fontFamily: "Open Sans"
            },
            right: 52,
            text: "По рубрикам",
            id: "section",
            visible: "false"
        });
        return o;
    }());
    $.__views.root.add($.__views.section);
    sectionClicked ? $.__views.section.addEventListener("singletap", sectionClicked) : __defers["$.__views.section!singletap!sectionClicked"] = true;
    $.__views.btnMenu = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            right: 0,
            width: 55,
            height: 88,
            backgroundImage: "/images/menu_tablet.png"
        });
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            right: 0,
            width: 88,
            height: 88,
            backgroundImage: "/images/menu_hh.png"
        });
        _.extend(o, {
            id: "btnMenu"
        });
        return o;
    }());
    $.__views.root.add($.__views.btnMenu);
    OnToggleMenu ? $.__views.btnMenu.addEventListener("singletap", OnToggleMenu) : __defers["$.__views.btnMenu!singletap!OnToggleMenu"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var line = null;
    var isMain = 1;
    var animMain = Ti.UI.createAnimation({
        height: 2,
        right: 175,
        width: 61,
        duration: 200,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN
    });
    var animSection = Ti.UI.createAnimation({
        height: 2,
        right: 52,
        width: 98,
        duration: 200,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN
    });
    if (Alloy.isTablet) {
        $.main.visible = true;
        $.section.visible = true;
        line = Ti.UI.createView({
            height: 2,
            width: 61,
            backgroundColor: "#990000",
            top: 60,
            right: 175
        });
        $.root.add(line);
    }
    Alloy.Globals.sectionClicked = sectionClicked;
    Alloy.Globals.mainClicked = mainClicked;
    Ti.App.addEventListener("enableMenu", function() {
        $.btnMenu.show();
        if (!Alloy.isTablet) return;
        $.section.right = 52;
        $.main.right = 175;
        animMain.right = 175;
        animSection.right = 52;
        line.right = isMain ? 175 : 52;
    });
    Ti.App.addEventListener("disableMenu", function() {
        $.btnMenu.hide();
        if (!Alloy.isTablet) return;
        $.section.right = "2.5%";
        $.main.right = 142;
        animMain.right = 142;
        animSection.right = "2.5%";
        line.right = isMain ? 142 : "2.5%";
    });
    __defers["$.__views.logo!singletap!toMain"] && $.__views.logo.addEventListener("singletap", toMain);
    __defers["$.__views.main!singletap!toMain"] && $.__views.main.addEventListener("singletap", toMain);
    __defers["$.__views.section!singletap!sectionClicked"] && $.__views.section.addEventListener("singletap", sectionClicked);
    __defers["$.__views.btnMenu!singletap!OnToggleMenu"] && $.__views.btnMenu.addEventListener("singletap", OnToggleMenu);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;