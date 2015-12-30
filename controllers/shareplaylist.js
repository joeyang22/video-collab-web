var io;
var playlistSocket;
var rooms = {};
var room = require('../models/room.js');
exports.createPlaylist = function (socketIo, socket){
  io = socketIo;
  playlistSocket = socket;

  playlistSocket.on('createNewPlaylist', createNewPlaylist);
  playlistSocket.on('user joined', userJoined);
  playlistSocket.on('video added', addVide);
  playlistSocket.on('video voted', videoVoted);

}
function createNewPlaylist(data){
  var room = new Room(data.userId);
  rooms[room.id] = room;
}

function addVideo(data){
  var video = new Video(data.title, data.channel, data.videoID, )
}

function videoVoted(data){
  if (rooms[data.room] != null){
    if (rooms[data.room][data.videoId])
  }
}

function userJoined(data){
  var socket = this;
  if (rooms[data.room] == "active"){
    socket.join(data.roomId);
    io.in(data.room).emit('user joined', data);
  }
}
