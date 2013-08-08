var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var moment = require("moment.min");

Alloy.CFG.activeColor = "#a2a2a2";

Alloy.CFG.defaultLimit = Alloy.isTablet ? 20 : 10;

Alloy.Globals.formatDate = function(_date, extra) {
    if (!_date) return;
    var tObj = moment();
    var dObj = moment(_date);
    if (extra) return dObj.format("hh:mm");
    return dObj.date() == tObj.date() && dObj.month() == tObj.month() && dObj.year() == tObj.year() ? dObj.format("hh:mm") : dObj.format("L") + " " + dObj.format("hh:mm");
};

Alloy.createController("index");