$(document).ready(function() {
    var socket = io();
    var input = $(".inputMessage");
    var chatPage = $('#chatPage');
    var messages = $('.messages');
    var addMessage = function(message){
      messages.append('<ul>' + message + '</ul>');  
    };
    
    console.log(socket);
    
    input.on('keydown',function(event){
        if (event.keyCode !=13){
            return;
        }
        var message = input.val();
        addMessage("USERNAME: " + message);
        console.log(message);
        input.val('');
    })
    
});