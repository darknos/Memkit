// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
var moment = require('moment.min');

Alloy.CFG.activeColor = '#a2a2a2';

Alloy.CFG.defaultLimit = Alloy.isTablet ? 20 : 10;

Alloy.Globals.formatDate = function(_date, extra) {
    if (!_date)
        return;

    var tObj = moment();
    var dObj = moment(_date);
    
    if (extra) {
    	return dObj.format("hh:mm");
    }

    if (dObj.date() == tObj.date() && dObj.month() == tObj.month() && dObj.year() == tObj.year()) {
        return dObj.format("hh:mm");
    } else {
        return dObj.format('L') + ' ' + dObj.format("hh:mm");
    }
}