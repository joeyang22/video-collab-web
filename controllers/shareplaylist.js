var io;
var playlistSocket;
var rooms = {};
var Room = require('../models/room.js').Room;
var socketConstants = require('../socketConstants.js');

exports.initializeApp = function (socketIo, socket){
  io = socketIo;
  playlistSocket = socket;
  playlistSocket.on(socketConstants.createPlaylist, createNewPlaylist);
  playlistSocket.on(socketConstants.joiningRoom, userJoined);
  playlistSocket.on(socketConstants.addingVideo, addVideo);
  playlistSocket.on(socketConstants.votingVideo, videoVoted);

}

exports.createNewPlaylist = function(data){
  var room = new Room(data.userId);
  var socket = this;
  rooms[room.id] = room;
  socket.emit(socketConstants.roomCreated, {"roomId":room.id});
  console.log("created room "+room.id);


}

exports.addVideo = function(data){
  //var video = new Video(data.videoId)
  var socket = this;
  if (rooms[data.roomId]!= null){
      room = rooms[data.roomId];
      if (videoVotes[data.videoId]!= null){
        videoVoted(data);
      }else{
        room.videos.push(data.videoId);
        room.videoVotes[videoId] = 1;
        socket.emit(socketConstants.videoAdded, {
          "videos":room.videos,
          "video_votes":room.videoVotes
        });
      }
  }
  console.log(rooms);
}

exports.videoVoted = function(data){
  var socket = this;
  if (rooms[data.roomId]!= null && room.videoVotes.contains(data.roomId)){
      room = rooms[data.roomId];
      room.videoVotes[data.videoId]++;
      var i = room.videos.indexOf(data.videoId);
      var orderChanged = false;
      while (i>0 && videoVotes[videos[i-1]]< videoVotes[videos[i]]){
        var tmp = videos[i];
        videos[i] = videos[i-1];
        videos[i-1] = tmp;
        i--;
        orderChanged = true;
      }

      socket.emit(socketConstants.videoVoted, {
        "videos":room.videos,
        "video_votes":room.videoVotes,
        "order_changed":orderChanged
      })
      console.log(rooms);
  }
}

exports.userJoined = function(data){
  var socket = this;
  console.log(rooms);
  if (data != null && rooms[data.roomId] != null){
    socket.join(data.roomId.toUpperCase());
    io.in(data.roomId.toUpperCase()).emit(socketConstants.joinSuccessful, rooms[data.roomId.toUpperCase()].videos.toArray());
  }else{
    console.log("failed to join room");
  }
}
