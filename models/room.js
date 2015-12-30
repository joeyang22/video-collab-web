var Room = function(adminId){
  var id = getRandomRoomName(4);
  var adminId = adminId;
  var videos = buckets.PriorityQueue(videoVotesComparator);
}

function videoVotesComparator(a,b){
  return b.votes - a.votes;
}

function getRandomRoomName(length){
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  var text = "";
  for (var i = 0; i< length; i++){
    text+=alphabet.charAt(Math.floor(math.random()*alphabet.length));
  }
  return text;
}
