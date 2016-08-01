
module.exports = function(io){
  console.log("HERE'S THE CHATROOM");
  //console.log(io);
  io.on('connection',function(socket){
    console.log("CHAT IS CONNECTED");
  });
}