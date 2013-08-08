$.lastUpdated.text = L('update') + String.formatDate(new Date()) + " " + String.formatTime(new Date());
var readyToPull = false;
var loading = false;

$.startLoading = function() {
	loading = 1;
	$.status.text = L('loading');
	$.arrow.hide();
	if (OS_IOS)
		$.ai.show();
};

$.endLoading = function() {
	loading = 0;
	readyToPull = 0;
	$.status.text = 'Потяните для обновления';
	$.lastUpdated.text = 'Обновлено: ' + String.formatDate(new Date()) + " " + String.formatTime(new Date());
	if (OS_IOS)
		$.ai.hide();
	$.arrow.show();
	$.arrow.animate({
		transform : Ti.UI.create2DMatrix({
			rotate : 0
		}),
		duration : 0
	});
};

$.onScroll = function(e) {
	if (loading) {
		return;
	}
	if (e.y < -65 && !readyToPull) {
		readyToPull = 1;
		$.arrow.animate({
			transform : Ti.UI.create2DMatrix({
				rotate : -180
			}),
			duration : 200
		});
		$.status.text = 'Отпустите для обновления';
	}
	if (e.y > -65 && readyToPull) {
		readyToPull = 0;
		$.arrow.animate({
			transform : Ti.UI.create2DMatrix({
				rotate : 0
			}),
			duration : 200
		});
		$.status.text = 'Потяните для обновления';
	}
}

$.isReadyToPull= function(){
	return readyToPull;
}
