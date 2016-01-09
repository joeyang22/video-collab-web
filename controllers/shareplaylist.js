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
  playlistSocket.on(socketConstants.videoAdded, addVideo);
  playlistSocket.on(socketConstants.videoVoted, videoVoted);

}

exports.createNewPlaylist = function(data){
  var room = new Room(data.userId);
  var socket = this;
  rooms[room.id] = room;
  socket.emit(socketConstants.roomCreated, {"roomId":room.id});
  console.log("created room "+room.id);

}

exports.addVideo = function(data){
  var video = new Video(data.videoId)
  var socket = this;
  if (rooms[data.roomId]!= null){
    rooms.videos.add(video);
  }
}

exports.videoVoted = function(data){
  if (rooms[data.room] != null){
    rooms[data.room].videos.forEach(function(video){
      if (video.video_id == data.id){
        video.votes++;
        return false;
      }
    });
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
