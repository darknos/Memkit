var args = arguments[0] || {};

$.category_id = 0;
$.offset = 0;
$.limit = 20;
var error = false;
$.parent = null;

function loadMoreData() {
	Alloy.Globals.feedbackView($.loader);
	if (error) {
		error = false;
		$.parent.fireEvent('reloadNews', {
			fullReload : false
		});
		return;
	}
    $.loadMore.text = "Загрузка...";
    Alloy.Globals.loadMoreData();
}

$.setStage = function(args) {
    Ti.API.info('loadMore has NewStage: '+args.category_id+'/'+args.offset+'/'+args.limit);
    $.category_id = args.category_id;
    $.offset = args.offset;
    $.limit = args.limit;
}

$.showError = function() {
	error = true;
	$.loadMore.text = "Ошибка загрузки! Нажмите для повторной попытки.";
}
