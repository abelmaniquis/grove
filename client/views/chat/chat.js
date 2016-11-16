$(document).ready(function() {
    
    
var socket = io();
var input = $(".inputMessage");
var messages = $('.messages');
var myUsername = "";
    
$.getJSON("/profile/mine", function(data){

    if (data.username.local.hasOwnProperty('name')) {
        myUsername = (data.username.local.name);
    }else{
        myUsername = (data.username.local.username);
    }
    
    socket.emit('added user',myUsername);
});
    
    input.on('keydown',function(event){
        if (event.keyCode !=13){
            return;
        }
        
        var message = myUsername + ":     " + input.val();
        addMessage(message);
            socket.emit('message',message);
        input.val('');
    });
    socket.on('message',addMessage);
    

function addMessage(message){
      messages.append('<ul>' + message + '</ul>'); 
      playSound();
};
    
function playSound(){
    var audio = new Audio('sounds/arpeggio.mp3');
    audio.play();
};
    
});