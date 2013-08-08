var data = arguments[0] || {};

$.loadArticle = function(id) {
   	$.webview.evalJS('loadArticle("'+id+'")');
}

$.clearArticle = function() {
    $.webview.evalJS('clearArticle()');
}

$.back = function(e) {
    Alloy.Globals.feedbackLabel(e.source);
    Alloy.Globals.clearArticle();

    if (data.fromMain) {
        Alloy.Globals.articleOut();
    } else {
        Alloy.Globals.goToMain();
    }
}

$.webview.width = "100%";