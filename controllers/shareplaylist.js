var io;
var playlistSocket;
var rooms = {};
var Room = require('../models/room.js').Room;

exports.initializeApp = function (socketIo, socket){
  io = socketIo;
  playlistSocket = socket;

  playlistSocket.on('createNewPlaylist', createNewPlaylist);
  playlistSocket.on('joining room', userJoined);
  playlistSocket.on('video added', addVideo);
  playlistSocket.on('video voted', videoVoted);

}

function createNewPlaylist(data){
  var room = new Room(data.userId);
  var socket = this;
  rooms[room.id] = room;
  socket.emit('room created', {"roomId":room.id});
  console.log(rooms);
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
    io.in(data.roomId).emit('user joined', data);
    console.log("joined room succesfully");
  }else{
    console.log("failed to join room");
  }
}
