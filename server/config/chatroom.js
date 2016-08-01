module.exports = function(io,app,express){
  console.log("HERE'S THE CHATROOM");
  console.log(io);
  console.log("|");
  console.log("|");
  console.log(app);
  console.log("|");
  console.log("|");
  console.log(express);
app.use(express.static('../../api/client/public'));
  io.on('connection',function(socket){
    console.log("CHAT IS CONNECTED");
  });
}