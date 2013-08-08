exports.definition = {
    config: {
        URL: "http://sandbox.ipublisher.com.ua/testData.txt",
        debug: 1,
        adapter: {
            type: "restapi",
            collection_name: "set",
            idAttribute: "id"
        },
        parentNode: "sets"
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("set", exports.definition, []);

collection = Alloy.C("set", exports.definition, model);

exports.Model = model;

exports.Collection = collection;