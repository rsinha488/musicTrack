var mongoose = require('mongoose');

var genreSchema = new mongoose.Schema({
   
    name : {
        type: String,
        required: true
    }
});
var trackSchema = new mongoose.Schema({
  
    title : {
        type: String,
        required: true
    },
    rating : {
        type: Number,
        min: 0,
        max: 5,
        "default": 0
    },
    genres :[genreSchema]
});
//
//var trackSchema = new mongoose.Schema({
//    count : {
//        type: Number,
//        required: true
//    },
//    next : String,
//    previous : Number,
//    results : [resultSchema]
//});

    mongoose.model('Track', trackSchema);