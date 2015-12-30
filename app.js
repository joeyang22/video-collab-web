var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var roomRoutes = require('./routes/roomRoutes.js');

app.set('port', (process.env.PORT || 5000));
app.use('/', roomRoutes);

server.listen(app.get('port'));


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

module.exports = app;
