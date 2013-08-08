var args = arguments[0] || {};

$.applyData = function(params) {
    
    Ti.API.info('')
    $.section.text = params.name || "";
    //if (params.image != 'none') {
        $.photo.image = params.image;
    //} else {
    //    $.photo.image = null;
    //}
    $.time.text = Alloy.Globals.formatDate(params.time) || "";
    $.head.text = params.head || "";
}

$.applyData(args);

function openArticle() {
    Alloy.Globals.feedbackView($.article);
    Alloy.Globals.showArticle(args);
};

