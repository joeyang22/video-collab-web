var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var playlist = require('./controllers/shareplaylist.js');
var Room = require('./models/room.js').Room;
var Video = require('./models/video.js').Video;

app.set('port', (process.env.PORT || 5000));
server.listen(app.get('port'));

//Tests
var rm = new Room("asdsa");

rm.videos.add(new Video("one"));
rm.videos.add(new Video("two"));
rm.videos.add(new Video("three"));

console.log(rm.videos.peek());

rm.videos.forEach(function(video){
  if (video.video_id == "one"){
    rm.videos.add(new Video("one", video.votes+1));
    rm.videos.remove(video);
  }else if (video.video_id =="two"){
    video.votes+=1;
    console.log("wqewq");
  }
});

rm.videos.add(new Video("tester"));


console.log(rm.videos.peek());

io.on('connection', function(socket){
  console.log('a user connected');
  playlist.initializeApp(io, socket);
  socket.on('disconnected', function(){
    console.log('user disconnected');
  });
});

module.exports = app;
