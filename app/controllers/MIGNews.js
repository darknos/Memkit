var Data = require('Data');
var args = arguments[0] || {};
var loader = null;
var loadMore = null;

$.innerList = null;

$.limit = Alloy.CFG.defaultLimit || 10;
$.offset = 0;
$.count = 0;
$.categoryId = -1;

var sets = Alloy.Collections.instance('set');
sets.fetch({
    success : function(data) {
        Ti.API.info('SET', data.toJSON())
    },
    error : function() {
        $.ai.hide();
        $.errorLbl.visible = true;
    }
});

$.viewType = 'list';

// -----MENU-----
var innerParams = {
    left : 16,
    right : 16,
    height : Ti.UI.SIZE,
    layout : 'vertical',
    top : 0
};

// -----CLEAR LOGIC-----
Alloy.Globals.clearArticle = function() {
    $.articleContent.clearArticle();
}
Alloy.Globals.clearList = function() {
    if ($.innerList) {
        $.list.remove($.innerList);
        $.innerList = null;
    }
    $.offset = 0;
    $.limit = Alloy.CFG.defaultLimit || 10;
}
// -----EVENTS-----
$.root.addEventListener("afterOpen", function(e) {
    Alloy.Globals.showList('', 0, Alloy.CFG.defaultLimit);
});

$.root.addEventListener('reloadNews', function(e) {
    if (e.fullReload) {
        $.offset = -1;
    } else {
        $.offset = 0;
    }
    Alloy.Globals.showList($.categoryId, 0, $.limit);
});

if (OS_IOS) {
    $.list.addEventListener('scroll', function(e) {
        if (e.source != $.list || OS_ANDROID)
            return;
        $.ptr.onScroll(e);
    });

    $.list.addEventListener('dragend', function(e) {
        if (e.source != $.list || OS_ANDROID)
            return;
        if ($.ptr.isReadyToPull()) {
            $.offset = -1;
            Alloy.Globals.showList($.categoryId, 0, $.limit);
        }
    });
}

// -----LIST-----
Alloy.Globals.loadMoreData = function() {
    Alloy.Globals.showList($.categoryId, $.count, $.limit);
}

Alloy.Globals.showList = function(category_id, off, lim) {
    $.viewType = 'list';
    if (!lim)
        lim = Alloy.CFG.defaultLimit || 10;
    //if (category_id == $.categoryId && off == $.offset && lim == $.limit) {
    //	return;
    //}

    $.offset = off;
    $.limit = lim;
    $.categoryId = category_id;

    if (Alloy.isTablet) {
        innerParams.layout = 'horizontal';
        innerParams.left = 5;
        innerParams.right = 5;
    }
    if (!loader) {
        loader = Alloy.createController('loader', {
            parent : $.root
        });
    }

    if ($.offset == 0) {
        Alloy.Globals.clearList();
        Alloy.Globals.articleOut();
    }

    Data.getFeed($.categoryId, $.offset, $.limit, 0, function(success, data) {
        var newlist = false;
        if (!$.innerList) {
            newlist = true;
            $.count = 0;
            $.innerList = Ti.UI.createView(innerParams);
            loader.startLoading();
        }
        if (OS_IOS) {
            $.ptr.startLoading();
        }

        data = data.sets;
        Ti.API.info('SUCCESS', success, data.length)

        if (success && data.length) {
            var extra = null;

            _.each(data, function(rec, i) {
                /*if (!category_id && i == 0 && newlist) {
                 var row = Alloy.createController('mainNews', rec);
                 $.innerList.add(row.getView());
                 if (Alloy.isTablet) {
                 //extra = Alloy.createController('extraNews');
                 //$.innerList.add(extra.getView());
                 }
                 } else {*/
                var row = Alloy.createController('singleNews', rec);
                $.innerList.add(row.getView());
                //}

            });

            if (loadMore) {
                $.innerList.remove(loadMore.getView());
                loadMore = null;
            }

            /*$.count += data.length;
             if ($.offset < meta.total) {
             loadMore = Alloy.createController('loadMore');
             loadMore.parent = $.root;
             loadMore.setStage({
             category_id : $.categoryId,
             offset : $.offset,
             limit : $.limit
             });
             $.innerList.add(loadMore.getView());
             }*/
            if ($.offset == 0) {
                loader.endLoading();
            }
            if (OS_IOS) {
                $.ptr.endLoading();
            }

            if (newlist) {
                $.list.add($.innerList);
            }
        } else {
            if (OS_IOS) {
                $.ptr.endLoading();
            }
            if ($.offset == 0) {
                loader.showError();
            } else {
                loadMore.showError();
            }
        }
    });
};

// -----ARTICLE SHOW LOGIC-----
Alloy.Globals.showArticle = function(_data) {
    $.articleContent.clearArticle();
    $.articleContent.loadArticle(_data.id);
    articleIn();
};

function articleIn() {
    $.viewType = 'article';
    var art = Ti.UI.createAnimation({
        left : 0,
        duration : 200
    })
    var list = Ti.UI.createAnimation({
        left : '100%',
        duration : 200
    })
    $.list.animate(list);
    $.article.animate(art);
}

Alloy.Globals.articleIn = articleIn;

function articleOut() {
    $.viewType = 'list';
    var art = Ti.UI.createAnimation({
        left : "-100%",
        duration : 200
    })
    var list = Ti.UI.createAnimation({
        left : 0,
        duration : 200
    })
    $.list.animate(list)
    $.article.animate(art)
}

Alloy.Globals.articleOut = articleOut;
