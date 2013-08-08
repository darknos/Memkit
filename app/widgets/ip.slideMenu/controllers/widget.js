//var measurement = require('alloy/measurement');

function isPortrait() {
	var dpi = Ti.Platform.displayCaps.dpi;
    var w = Ti.Platform.displayCaps.platformWidth/(dpi/160);
    var h = Ti.Platform.displayCaps.platformHeight/(dpi/160);
    return (w<h);    
}

//$.innerwin.width = measurement.pointPXToDP(Ti.Platform.displayCaps.platformWidth);
$.tableView.separatorStyle = OS_IOS ? Titanium.UI.iPhone.TableViewSeparatorStyle.NONE : null;

clickKiller = Ti.UI.createView({
    width : '100%',
    left:0,
    right: 5,
    backgroundColor : 'transparent',
    zIndex : 50,
    id : "clickKiller"
});

$.clickKiller = clickKiller;

$.menuShown = false;
$.menuDisabled = false;
var animateHideMenu = Ti.UI.createAnimation({
    left : 0,
    right : -5,
    curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
    duration : 150
});

var animateShowMenu = Ti.UI.createAnimation({
    left : -256,
    right : 256-5,
    curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
    duration : 150
});

var animatePinMenu = Ti.UI.createAnimation({
    left : 0,
    right : 256-5,
    curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
    duration : 0
});


function showMenu() {
    $.menuShown = true;
    $.win.add(clickKiller);
    //$.shadow.animate(animateRightS);
    $.win.animate(animateShowMenu);
}

function hideMenu() {
    $.win.remove(clickKiller);
    if ($.menuDisabled) return;
    $.menuShown = false;
    $.win.animate(animateHideMenu);
    //$.shadow.animate(animateLeftS);
}

function pinMenu() {
    $.menuShown = false;
    $.win.remove(clickKiller);
    $.win.animate(animatePinMenu);
}

$.clickKiller.addEventListener('singletap', hideMenu);


exports.toggleSlider = function() {
    if (!$.menuDisabled) {
        if (!$.menuShown) {
            showMenu();
        } else {
            hideMenu();
        }
    }
};

exports.showMenu = function() {
    showMenu();
};

exports.hideMenu = function() {
    hideMenu();
};



$.lastOrientation = Ti.UI.orientation;

if (Alloy.isTablet) {
    Titanium.Gesture.addEventListener('orientationchange', function(e) {
        var orientation = e.orientation;
        if (orientation == Ti.UI.PORTRAIT || orientation == Ti.UI.UPSIDE_PORTRAIT) {
        	$.menuDisabled = false;
        	Ti.App.fireEvent('enableMenu');
            if ($.lastOrientation != orientation) {
                hideMenu();
                $.lastOrientation = orientation;  
            }
        }
        if (orientation == Ti.UI.LANDSCAPE_LEFT || orientation == Ti.UI.LANDSCAPE_RIGHT) {
            Ti.App.fireEvent('disableMenu');
            $.menuDisabled = true;
            if ($.lastOrientation != orientation) {
                pinMenu();
                $.lastOrientation = orientation;
            }
        }
    });
    
    if (!isPortrait()) {
    	Ti.App.fireEvent('disableMenu');
        $.menuDisabled = true;
        pinMenu();
        Ti.API.info('PIN MENU')
    }
}