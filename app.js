var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var playlistRoom = require('./controllers/playlistRoom.js');
var Room = require('./models/room.js').Room;

app.set('port', (process.env.PORT || 5000));
server.listen(app.get('port'));

io.on('connection', function(socket){
  console.log('a user connected');
  playlistRoom.initializeApp(io, socket);
  socket.on('disconnected', function(){
    console.log('user disconnected');
  });
});

module.exports = app;
