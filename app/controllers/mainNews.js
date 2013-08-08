var args = arguments[0] || {};

$.applyData = function(params) {
    Ti.API.info('PARAMS', params.toString())
    
    if (params.image != 'none') {
        $.photo.image = params.image;
    } else {
        $.photo.image = null;
    }
    $.head.text = params.name || "";
    $.desc.text = params.desc || '';   
}

$.applyData(args);

function openArticle() {
    Alloy.Globals.feedbackView($.article);
    Alloy.Globals.showArticle(args);
};