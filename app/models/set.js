exports.definition = {
	config: {
        "URL" : "http://sandbox.ipublisher.com.ua/testData.txt",
        "debug" : 1,
        "adapter" : {
            "type" : "restapi",
            "collection_name" : "set",
            "idAttribute" : "id"
        },
        "parentNode" : "sets" //your root node
	},		
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});
		
		return Model;
	},
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});
		
		return Collection;
	}
}

