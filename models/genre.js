const mongoose = require('mongoose');
const genreSchema = mongoose.Schema({
     name:{type:String, require:true},

});

const genreModel = mongoose.model('genre', genreSchema);

module.exports.getGenres = function(limit, callback){
     genreModel.find(callback).limit(limit);
}

module.exports.insertGenre = function(query, callback){
     //var query = {"name":name};
     genreModel.create(query, callback);
}
