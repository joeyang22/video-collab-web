var buckets = require('buckets-js');

exports.Room = function() {
  this.id = getRandomRoomName(4);
  this.videos = [];
  this.videoVotes = {};
  this.users = {};
  this.nowPlaying = "";
}

function videoVotesComparator(a, b) {
  console.log("a is: " + a.video_id + " a votes: " + a.votes);
  console.log("b is: " + b.video_id + " b votes: " + b.votes);
  if (a.votes > b.votes) {

    return -1;
  } else if (a.votes < b.votes) {
    return 1;
  } else {
    return 0;
  }
}

function getRandomRoomName(length) {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  var text = "";
  for (var i = 0; i < length; i++) {
    text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return text;
}