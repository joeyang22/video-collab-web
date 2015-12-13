var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 5000));

server.listen(app.get('port'));

app.get('/', function(req, res){
  res.json({'asdf':'asdf'});
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
