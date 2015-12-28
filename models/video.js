var mongoose = require('mongoose');
var Schema = monogoose.Schema;

var Video = new Schema({
  title: String,
  channel: String,
  video_id: String,
  votes: Number
});

mongoose.model('Video', Video);
