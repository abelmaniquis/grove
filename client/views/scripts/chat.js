$(document).ready(function() {
    //var socket = io();
    var input = $(".inputMessage");
    var chatPage = $('#chatPage');
    var messages = $('messages');
    var addMessage = function(message){
      messages.append('<ul>' + message + '</ul>');  
    };
    
    input.on('keydown',function(event){
        addMessage;
        console.log("I see this");
    })
    
});