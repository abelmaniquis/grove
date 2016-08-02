module.exports = function(io,app,express,server){
  console.log("HERE'S THE CHATROOM");
  console.log(server);
  /*console.log(io);
  console.log(app);
  console.log(express);*/
  //console.log(app);
app.use(express.static('../client'));
  io.on('connection',function(socket){
    console.log("CHAT IS CONNECTED");
    
    socket.on('message',function(message){
      console.log('Received Message: ', message);
      socket.broadcast.emit('message', message);
    });
  });
}



