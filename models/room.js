var buckets = require('buckets-js');

exports.Room = function (adminId){
  this.id = getRandomRoomName(4);
  this.adminId = adminId;
  this.videos = buckets.PriorityQueue(videoVotesComparator);
}

function videoVotesComparator(a,b){
  return b.votes - a.votes;
}

function getRandomRoomName(length){
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  var text = "";
  for (var i = 0; i< length; i++){
    text+=alphabet.charAt(Math.floor(Math.random()*alphabet.length));
  }
  return text;
}
