var options = arguments[0] || {};
var loadingFlag = false;
var limit = options.limit || 10;
var offset = options.offset || 0;
var loadOffset = options.loadOffset || 2;
var keywords = '';

// -----PULL TO REFRESH-----
var ptr = Alloy.createController('pullToRefresh');

// -----LISTVIEW-----
var section = Ti.UI.createListSection();
var listView = Ti.UI.createListView(_.extend({
	headerPullView : ptr.getView(),
	sections : [section],
}, options.listview));
$.root.add(listView);

// -----EVENTS-----
listView.addEventListener('scroll', function(e) {
	if (e.source != listView)
		return;
	ptr.onScroll(e);
	if (loadingFlag) {
		return;
	}
	if (e.contentOffset.y > e.contentSize.height - e.size.height * loadOffset) {
		loadingFlag = true;
		$.loadData(offset, limit, keywords);
	}
});

listView.addEventListener('dragend', function(e) {
	if (ptr.isReadyToPull()) {
		$.reloadData();
	}
});

listView.addEventListener('itemclick', function(e) {
	var item = e.section.getItemAt(e.itemIndex);
	if (item.type && item.type == 'loading') {
		return;
	}
	if (item.type && item.type == 'error') {
		$.reloadData();
		return;
	}
	if (item.type && item.type == 'noneData') {
		return;
	}
	if (!item.no_feedback) {
    	var bg = item.bg;
    	e.section.updateItemAt(e.itemIndex, _.extend(item, {
    		root : {
    			backgroundColor : '#fff'
    		}
    	}));
	}
	options.clickFunc(item, e);
	if (!item.no_feedback) {
    	setTimeout(function() {
    		e.section.updateItemAt(e.itemIndex, _.extend(item, {
    			root : {
    				backgroundColor : bg
    			}
    		}));
    	}, 300);
	}
});

// -----INTERFACE-----
$.startLoading = function() {
	loadingFlag = true;
	ptr.startLoading();
	if (section.items.length > 0) {
    	section.appendItems([{
    		template : 'templateService',
    		label : {
    			text : L('loading')
    		},
    		type : 'loading'
    	}], Titanium.UI.iPhone.RowAnimationStyle.NONE);
	} else {
		$.ai = Ti.UI.createActivityIndicator({
			style : Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
			message : L('loading'),
			color : 'gray',
			font : {
				fontSize : Alloy.CFG.headSize
			}
		});
		$.root.add($.ai);
		$.ai.show();
	}
}

$.removeAI = function() {
	if ($.ai) {
		$.ai.hide();
		$.root.remove($.ai);
		$.ai = null;
	}
}

$.endLoading = function() {
	setTimeout(function() {
		loadingFlag = false;
	}, 300);
	$.removeAI();
	ptr.endLoading();
}

$.stopLoading = function() {
	loadingFlag = true;
	$.removeAI();
	ptr.endLoading();
}

$.showError = function(index, _text, _type) {
	loadingFlag = true;
	$.removeAI();
	ptr.endLoading();
	var t = _text || L('error_retry');
	var ty = _type || 'error';
	section.replaceItemsAt(index, 1, [{
		template : 'templateService',
		label : {
			text : t
		},
		type : ty
	}], Titanium.UI.iPhone.RowAnimationStyle.NONE);
}

$.reloadData = function() {
	loadingFlag = false;
	section.setItems([], Titanium.UI.iPhone.RowAnimationStyle.NONE);
	offset = 0;
	$.loadData(offset, limit, keywords);
}

$.replaceItemsAt = function(offset, count, items) {
    section.replaceItemsAt(offset, count, items, Titanium.UI.iPhone.RowAnimationStyle.NONE);
}

$.incOffset = function(inc) {
	offset += inc;
}

$.loadData = function(offset, limit, keywords) {
	if (loadingFlag)
		return;
	options.loadData(offset, limit, keywords);
};

$.applyKeywords = function(_keywords) {
	keywords = _keywords;
}
