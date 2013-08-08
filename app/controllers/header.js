var line = null;
var isMain = 1;

var animMain = Ti.UI.createAnimation({
	height : 2,
	right : 175,
	width : 61,
	duration : 200,
	curve : Ti.UI.ANIMATION_CURVE_EASE_IN
});
var animSection = Ti.UI.createAnimation({
	height : 2,
	right : 52,
	width : 98,
	duration : 200,
	curve : Ti.UI.ANIMATION_CURVE_EASE_IN
});

function OnToggleMenu(e) {
	$.btnMenu.top = 2;
	Alloy.Globals.toggleRightMenu();
	setTimeout(function(e) {
		$.btnMenu.top = 0;
	}, 200);
}

function toMain(e) {
	Alloy.Globals.feedbackLabel(e.source);
	Alloy.Globals.goToMain();
}

if (Alloy.isTablet) {
	$.main.visible = true;
	$.section.visible = true;

	line = Ti.UI.createView({
		height : 2,
		width : 61,
		backgroundColor : '#990000',
		top : 60,
		right : 175
	});

	$.root.add(line);
}

Alloy.Globals.sectionClicked = sectionClicked;
function sectionClicked(e) {
	//Alloy.Globals.feedbackLabel(e.source);
	isMain = 0;
	line.animate(animSection);
	if (!e || !e.onlyAnimation)
		Alloy.Globals.toggleRightMenu();
};
Alloy.Globals.mainClicked = mainClicked;
function mainClicked(e) {
	isMain = 1;
	line.animate(animMain);
};

Ti.App.addEventListener('enableMenu', function(e) {
	$.btnMenu.show();
	if (Alloy.isTablet) {
		$.section.right = 52;
		$.main.right = 175;
		animMain.right = 175;
		animSection.right = 52;
		if (isMain) {
			line.right = 175
		} else {
			line.right = 52
		}
	} else {
		return;
	}
});

Ti.App.addEventListener('disableMenu', function(e) {
	$.btnMenu.hide();
	if (Alloy.isTablet) {
		$.section.right = '2.5%';
		$.main.right = 142;
		animMain.right = 142;
		animSection.right = '2.5%';
		if (isMain) {
			line.right = 142
		} else {
			line.right = '2.5%'
		}
	} else {
		return;
	}
})
