var io;
var playlistSocket;
var rooms = {};
var Room = require('../models/room.js');

exports.initializeApp = function (socketIo, socket){
  io = socketIo;
  playlistSocket = socket;

  playlistSocket.on('createNewPlaylist', createNewPlaylist);
  playlistSocket.on('user joined', userJoined);
  playlistSocket.on('video added', addVideo);
  playlistSocket.on('video voted', videoVoted);

}

function createNewPlaylist(data){
  var room = new Room(data.userId);
  rooms[room.id] = room;
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
  if (rooms[data.room] == "active"){
    socket.join(data.roomId);
    io.in(data.room).emit('user joined', data);
  }
}
