var args = arguments[0] || {};

$.time.text = Alloy.Globals.formatDate(args.time, true) || '';
$.name.text = args.head || '';

function openNews() {
	Alloy.Globals.feedbackView($.root);
	Alloy.Globals.showArticle(args);
};
