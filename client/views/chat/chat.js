$(document).ready(function() {
    
    
    var socket = io();
    var input = $(".inputMessage");
    var chatPage = $('#chatPage');
    var messages = $('.messages');
    
    var myUsername = "myUsername";
    
    $.getJSON("profile/mine", function(data) {
    // Make sure the data contains the username as expected before using it
    if (data.hasOwnProperty('username')) {
        console.log(data.username);
        myUsername = (data.username.local.username);
    }else{
        myUsername = "aUsername";
    }
    });
    
    var addMessage = function(message){
      messages.append('<ul>' + myUsername +": " + message + '</ul>');  
    };
    
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