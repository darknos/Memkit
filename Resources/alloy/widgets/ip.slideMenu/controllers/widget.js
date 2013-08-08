function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "ip.slideMenu/" + s : s.substring(0, index) + "/ip.slideMenu/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function isPortrait() {
        var dpi = Ti.Platform.displayCaps.dpi;
        var w = Ti.Platform.displayCaps.platformWidth / (dpi / 160);
        var h = Ti.Platform.displayCaps.platformHeight / (dpi / 160);
        return h > w;
    }
    function showMenu() {
        $.menuShown = true;
        $.win.add(clickKiller);
        $.win.animate(animateShowMenu);
    }
    function hideMenu() {
        $.win.remove(clickKiller);
        if ($.menuDisabled) return;
        $.menuShown = false;
        $.win.animate(animateHideMenu);
    }
    function pinMenu() {
        $.menuShown = false;
        $.win.remove(clickKiller);
        $.win.animate(animatePinMenu);
    }
    new (require("alloy/widget"))("ip.slideMenu");
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.leftMenu = Ti.UI.createView({
        top: 0,
        right: 0,
        width: 256,
        zIndex: "1",
        id: "leftMenu"
    });
    $.__views.leftMenu && $.addTopLevelView($.__views.leftMenu);
    $.__views.tableView = Ti.UI.createTableView({
        rowHeight: "44dp",
        backgroundColor: "#690303",
        allowSelection: false,
        separatorColor: "transparent",
        id: "tableView"
    });
    $.__views.leftMenu.add($.__views.tableView);
    $.__views.win = Ti.UI.createView({
        left: 0,
        right: -5,
        zIndex: "10",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.innerwin = Ti.UI.createView({
        right: 5,
        zIndex: "10",
        id: "innerwin"
    });
    $.__views.win.add($.__views.innerwin);
    $.__views.shadow = Ti.UI.createView({
        backgroundImage: WPATH("images/shadow.png"),
        opacity: .5,
        id: "shadow",
        right: "-5",
        top: "0",
        bottom: "0",
        width: "5"
    });
    $.__views.win.add($.__views.shadow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tableView.separatorStyle = Titanium.UI.iPhone.TableViewSeparatorStyle.NONE;
    clickKiller = Ti.UI.createView({
        width: "100%",
        left: 0,
        right: 5,
        backgroundColor: "transparent",
        zIndex: 50,
        id: "clickKiller"
    });
    $.clickKiller = clickKiller;
    $.menuShown = false;
    $.menuDisabled = false;
    var animateHideMenu = Ti.UI.createAnimation({
        left: 0,
        right: -5,
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        duration: 150
    });
    var animateShowMenu = Ti.UI.createAnimation({
        left: -256,
        right: 251,
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        duration: 150
    });
    var animatePinMenu = Ti.UI.createAnimation({
        left: 0,
        right: 251,
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        duration: 0
    });
    $.clickKiller.addEventListener("singletap", hideMenu);
    exports.toggleSlider = function() {
        $.menuDisabled || ($.menuShown ? hideMenu() : showMenu());
    };
    exports.showMenu = function() {
        showMenu();
    };
    exports.hideMenu = function() {
        hideMenu();
    };
    $.lastOrientation = Ti.UI.orientation;
    if (Alloy.isTablet) {
        Titanium.Gesture.addEventListener("orientationchange", function(e) {
            var orientation = e.orientation;
            if (orientation == Ti.UI.PORTRAIT || orientation == Ti.UI.UPSIDE_PORTRAIT) {
                $.menuDisabled = false;
                Ti.App.fireEvent("enableMenu");
                if ($.lastOrientation != orientation) {
                    hideMenu();
                    $.lastOrientation = orientation;
                }
            }
            if (orientation == Ti.UI.LANDSCAPE_LEFT || orientation == Ti.UI.LANDSCAPE_RIGHT) {
                Ti.App.fireEvent("disableMenu");
                $.menuDisabled = true;
                if ($.lastOrientation != orientation) {
                    pinMenu();
                    $.lastOrientation = orientation;
                }
            }
        });
        if (!isPortrait()) {
            Ti.App.fireEvent("disableMenu");
            $.menuDisabled = true;
            pinMenu();
            Ti.API.info("PIN MENU");
        }
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;