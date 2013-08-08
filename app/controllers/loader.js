var args = arguments[0] || {};
var parent = args.parent || null;
var error = false;

if (Alloy.isTablet) {
	$.root.top = 77;
} else {
	$.root.top = 55;
}

if (OS_IOS) {
	$.ai.style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK
}

$.startLoading = function() {
	if (!parent) {
		return;
	}
	if (OS_IOS) {
		$.ai.show();
	}
	$.message.text = 'Загрузка...';
	parent.add($.root);
};

$.endLoading = function() {
	if (!parent) {
		return;
	}
	if (OS_IOS) {
		$.ai.hide();
	}
	parent.remove($.root);
};

$.showError = function() {
	error = true;
	if (OS_IOS) {
		$.ai.hide();
	}
	$.message.text = 'Ошибка загрузки! Проверьте соединение с сетью интернет.';
}
function reload() {
	if (!error) {
		return;
	}
	error = false;
	parent.remove($.root);
	parent.fireEvent('reloadNews', {
		fullReload : true
	});
}

