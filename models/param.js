const mongoose = require('mongoose');
const paramSchema = mongoose.Schema({
     info:{type:String, require:true},

});

const paramModel = mongoose.model('param', paramSchema);

module.exports.getParam = function(limit, callback){
     paramModel.find(callback).limit(limit);
}

module.exports.insertParam = function(query, callback){
     //var query = {"name":name};
     paramModel.create(query, callback);
}
