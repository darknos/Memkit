var XHR = require("xhr");

module.exports = {
	prefix : 'http://sandbox.ipublisher.com.ua/',
	getCategories: function(callback) {
		url = this.prefix + 'categories.php';
		
		_query(url, function(success, data) {
			if (success) {
				callback(true, data.response, data.meta);
			} else {
				if (data && data.meta && data.meta.status == 404) {
					callback(true, [], data.meta);
				} else {
					Ti.API.info('NO DATA RETURNED FROM GETFEED')
					callback(false, data);
				}
			}
		})
	},
	getFeed: function(category_id, offset, limit, only_line, callback) {
		offset = offset || 0;
		limit = limit || 20;
		
		url = this.prefix + 'testData.txt';//'feeds.php?offset=' + offset + '&limit=' + limit + '&category_id=' + category_id + '&only_line=' + only_line;
		
		_query(url, function(success, data) {
			if (success) {
				callback(true, data);//callback(true, data.response, data.meta);
			} else {
				/*if (data && data.meta && data.meta.status == 404) {
					callback(true, [], data.meta);
				} else {*/
					Ti.API.info('NO DATA RETURNED FROM GETFEED')
					//callback(false, data);
				//}
			}
		})
	},
	getArticle: function(article_id, callback) {		
		url = this.prefix + 'article.php?article_id=' + article_id;
		
		_query(url, function(success, data) {
			if (success) {
				callback(true, data.response, data.meta);
			} else {
				if (data && data.meta && data.meta.status == 404) {
					callback(true, [], data.meta);
				} else {
					Ti.API.info('NO DATA RETURNED FROM GETFEED')
					callback(false, data);
				}
			}
		})
	}
}

function _query(url, callback) {
	var xhr = new XHR();
	Ti.API.info('>>>Get data from server:');
	Ti.API.info('URL : ' + url);
	xhr.get(url, onSuccessCallback, onErrorCallback, {
		ttl : 0
	});
	function onSuccessCallback(e) {
		try {
			var data = JSON.parse(e.data);
		} catch(ex) {
			Ti.API.info('Parse Exeption : ' + ex.message);
			callback(false, ex.message);
			return;
		}
		//Ti.API.info('records returned : ' + data.meta.limit);
		//if (data.meta.status == 200) {
		    Ti.API.info('DATA',data)
			callback(true, data);
		//} else {
		//	callback(false, data);
		//}
		Ti.API.info('>>>End');
	};
	function onErrorCallback(e) {
		Ti.API.info('Error on load Data!')
		callback(false, {
			meta : {
				status : 500,
				error : e.data && e.data.error ? e.data.error : 'Ошибка соединения с сетью интернет'
			}
		});
		Ti.API.info('>>>End');
	};
}
