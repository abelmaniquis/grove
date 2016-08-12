$(document).ready(function() {
    var socket = io();
    var input = $(".inputMessage");
    var chatPage = $('#chatPage');
    var messages = $('.messages');
    
    var myUsername = "myUsername";
    
    
    var addMessage = function(message){
      messages.append('<ul>' + myUsername + message + '</ul>');  
    };
    
    console.log(socket);
    
    input.on('keydown',function(event){
        if (event.keyCode !=13){
            return;
        }
        var message = input.val();
        addMessage(message);
            socket.emit('message',message);
        input.val('');
    });
    
    socket.on('message',addMessage);
});