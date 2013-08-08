var Data = require('Data');
var data = [];
var titles = [[0, 'Главная'], [7, 'Политика'], [432, 'Экспертиза'], [10, 'Общество'], [14, 'Экономика'], [21, 'Происшествия'], [42, 'Наука и Технологии'], [11, 'Здоровье'], [25, 'Путешествия'], [12, 'Культура'], [9, 'Аналитика'], [240, 'Интервью']];
var section = 0;

_.times(titles.length, function(i) {
	data.push(Alloy.createController('menuRow', {
		title : titles[i][1],
		section_id : titles[i][0]
	}).getView());
});

var imgTableViewRow = Ti.UI.createView({
	touchEnabled : false,
	height : 105,
});
imgTableViewRow.add(Ti.UI.createView({
	backgroundImage : '/images/hint.png',
	left : '5%',
	top : 11,
	width : 105,
	height : 105
}));
$.menu.tableView.footerView = imgTableViewRow;

$.menu.tableView.headerView = Ti.UI.createView({
	height : '30dp',
	backgroundColor: "#690303" 
});

$.menu.tableView.data = data;

//SWAP MENU ON CLICK
$.menu.tableView.addEventListener('click', function selectRow(e) {
	section = e.index;
	if (OS_ANDROID || OS_IOS) {
		$.menu.tableView.selectRow(e.index);
	}
	//clear content
	Alloy.Globals.showList(e.row.section_id, 0, Alloy.CFG.defaultLimit);
	Alloy.Globals.articleOut();
	if (Alloy.isTablet) {
		if (e.index != 0) {
			Alloy.Globals.sectionClicked();
			Alloy.Globals.goToMain();
		}
	}

	$.menu.hideMenu();
});

//Global toggle Menu
Alloy.Globals.toggleRightMenu = function(e) {
	$.menu.toggleSlider();
};

Alloy.Globals.goToMain = function() {
	if (Alloy.Globals.selectedNews)
		Alloy.Globals.selectedNews.backgroundColor = 'white';
	Alloy.Globals.articleOut();
	$.menu.tableView.selectRow(0);
	Alloy.Globals.showList('', 0, 20);
	if (Alloy.isTablet) {
		Alloy.Globals.mainClicked();
	}
};

Alloy.Globals.feedbackView = function(obj) {
	obj.backgroundColor = Alloy.CFG.activeColor;
	setTimeout(function(e) {
		if (obj)
			obj.backgroundColor = '#fff';
	}, 200);
}
Alloy.Globals.feedbackLabel = function(obj, back, parent) {
	obj.color = 'black';
	if (back && parent)
		parent.backgroundColor = Alloy.CFG.activeColor;
	setTimeout(function(e) {
		if (obj)
			obj.color = '#666';
		if (parent)
			parent.backgroundColor = '#fff';
	}, 200)
}

$.root.addEventListener("open", function() {
	$.menu.tableView.selectRow(0);
});

$.window = Alloy.createController("MIGNews");
$.menu.innerwin.add($.window.getView());
$.window.getView().fireEvent("afterOpen");

if (OS_IOS)
	$.root.open();
else
	$.root.open();

// -----ANDROID BACK-----
var dialog = Ti.UI.createOptionDialog({
	cancel : 1,
	buttonNames : ['Да', 'Отмена'],
	title : 'Закрыть приложение?'
});

dialog.addEventListener('click', function(e) {
	if (e.index == 0) {
		$.root.close();
	}
});

$.root.addEventListener('android:back', function() {
	if ($.window.viewType == 'article') {
		Alloy.Globals.articleOut();
		return;
	}
	if (section != 0) {
		section = 0;
		Alloy.Globals.showList('', 0, Alloy.CFG.defaultLimit);
		return;
	}
	dialog.show();
});
