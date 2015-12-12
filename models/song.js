var mongoose = require('mongoose');
var Schema = monogoose.Schema;

var Song = new Schema({
  title: String,
  artist: String,
  track_id: String,
  votes: Number
});

mongoose.model('Song', Song);
