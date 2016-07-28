
module.exports = function(io,server,express,app){
  console.log("io");
  io.on('connection',function(socket){
    console.log("Client Connected");
  })
  
}