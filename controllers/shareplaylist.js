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

function createNewPlaylist(data){
  var room = new Room(data.userId);
  var socket = this;
  rooms[room.id] = room;
  socket.emit(socketConstants.roomCreated, {"roomId":room.id});
  console.log("created room "+room.id);

}

function addVideo(data){
  var video = new Video(data.title, data.channel, data.videoId)
}

function videoVoted(data){
  if (rooms[data.room] != null){
    rooms[data.room].videos.forEach(function(video){
      if (video.video_id == data.id){
        video.votes++;
        return false;
      }
    })
  }
}

function userJoined(data){
  var socket = this;
    console.log(rooms);
  if (rooms[data.roomId] != null){
    socket.join(data.roomId);
    io.in(data.roomId).emit(socketConstants.joinSuccessful, data);
  }else{
    console.log("failed to join room");
  }
}
