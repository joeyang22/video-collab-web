var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room = new Schema({
  name:String,
  adminId: String,
  songs: [{type: Schema.Types.ObjectId, ref: 'Video'}]
});

mongoose.model('Room', Room);
