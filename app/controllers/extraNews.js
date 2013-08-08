var Data = require('Data');
var args = arguments[0] || {};
var offset = 0;
var limit = 9;

$.applyData = function() {
	Data.getFeed('', offset, limit, 1, function(success, data, meta) {
		if (success) {
			_.each(data, function(rec, i) {
				var row = Alloy.createController('extraRow', rec);
				$.table.add(row.getView());

				if (i < data.length - 1) {
                    var string = Ti.UI.createView({
                        touchEnabled : false,
                        height : 1,
                        top : 0,
                        left : 14,
                        right : 14,
                        backgroundColor : '#ddd'
                    });
					$.table.add(string);
				}
			});
		} else {

		}
	});
}

$.applyData();

