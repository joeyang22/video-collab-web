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

function createNewPlaylist (data){
  var room = new Room(data.userId);
  var socket = this;
  rooms[room.id] = room;
  socket.emit(socketConstants.roomCreated, {"roomId":room.id});
  console.log("created room "+room.id);


}

function addVideo(data){
  //var video = new Video(data.videoId)
  var socket = this;
  console.log("data added: "+data);
  if (rooms[data.roomId]!= null){
      room = rooms[data.roomId];
      if (room.videoVotes[data.videoId]!= null){
        videoVoted(data);
      }else{
        room.videos.push(data.videoId);
        room.videoVotes[data.videoId] = 1;
        console.log(room.videos);

        socket.emit(socketConstants.videoAdded, {
          "videos":room.videos,
          "video_votes":room.videoVotes
        });
      }
      console.log(room);
  }
}

function videoVoted(data){
  var socket = this;
    console.log("data voted: "+data);
  if (rooms[data.roomId]!= null && room.videoVotes[data.videoId]!= null){
      room = rooms[data.roomId];
      room.videoVotes[data.videoId]++;
      var i = room.videos.indexOf(data.videoId);
      var orderChanged = false;
      while (i>0 && room.videoVotes[room.videos[i-1]]< room.videoVotes[room.videos[i]]){
        var tmp = room.videos[i];
        room.videos[i] = room.videos[i-1];
        room.videos[i-1] = tmp;
        i--;
        orderChanged = true;
      }

      socket.emit(socketConstants.videoVoted, {
        "videos":room.videos,
        "video_votes":room.videoVotes,
        "order_changed":orderChanged
      });
      console.log(room);

  }
}

function userJoined(data){
  var socket = this;
  console.log(rooms);
  if (data != null && rooms[data.roomId] != null){
    socket.join(data.roomId.toUpperCase());
    io.in(data.roomId.toUpperCase()).emit(socketConstants.joinSuccessful, rooms[data.roomId.toUpperCase()]);
  }else{
    console.log("failed to join room");
  }
}
