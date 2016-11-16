module.exports = function(io){
    var numUsers = 0;

    io.on('connection', function(socket){
        numUsers++;
        socket.on('message', function(chatInput){
            socket.broadcast.emit('message', chatInput);
        });
        socket.on('add user', function(){
            socket.broadcast.emit('message', "A new user has joined the room");
        });
    });
}