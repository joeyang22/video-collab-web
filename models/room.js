var mongoose = require('mongoose');
var Schema = monogoose.Schema;

var Room = new Schema({
  name:String,
  adminId: String,
  songs: [{type: Schema.Types.ObjectId, ref: 'Song'}]
});

mongoose.model('Room', Room);
