const express = require('express');
const app = express();
const http = require('http').Server(app);
const util = require('util');
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');


  socket.on('startDrawing', function(coords){
    socket.broadcast.emit('startDrawing', coords);
    console.log("broadcasted startDrawing with" + util.inspect(coords, {depth: null}));
  });
   socket.on('stopDrawing', function(){
    socket.broadcast.emit('stopDrawing');
    console.log("broadcasted stop Drawing");
  });
  socket.on('draw', function(coords){
    socket.broadcast.emit('draw', coords);
    console.log("broadcasted draw with" + util.inspect(coords, {depth: null}));
  });
  socket.on('changeColor', function(event){
    socket.broadcast.emit('changeColor', event);
    console.log("broadcasted changeColor with"+ util.inspect(event, {depth: null}));
  });
  socket.on('clear', function(){
    socket.broadcast.emit('clear');
    console.log("broadcasted clear with");
  });


  socket.on('disconnect', function(){
    console.log('the user disconnected');
  });

});




http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.use(express.static('public'));


