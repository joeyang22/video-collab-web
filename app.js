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

var mongoose = require('mongoose');

var uri = (app.get('env') == 'development')?
'mongodb://localhost/5000' : 'mongodb://heroku_kf13ptv1:3qjE4hszg1c5FIyshYgsUm9e5udjJkvu@ds027415.mongolab.com:27415/heroku_kf13ptv1';

mongoose.connect(uri, function(err){
  if (err){
    console.log('error: ',err);
  }else{
    console.log('connected to  '+uri);
  }
});

module.exports = app;
