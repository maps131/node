var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

var Info = new Schema({
    name:{
        type:String,
        require:true
    },
    word:{
        type:String,
        require:true
    }
});

// var msg = mongoose.model('Info',Info);
module.exports = mongoose.model('Info', Info);