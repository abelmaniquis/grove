$(document).ready(function() {
    
    
var socket = io();
var input = $(".inputMessage");
var messages = $('.messages');
var myUsername = "";
var myStatus = "";
    
$.getJSON("/profile/mine", function(data){
    
    myUsername = (data.username.local.username);
    
    if(data.username.info.hasOwnProperty('userStatus')){
        myStatus = (data.username.info.userStatus);
    }else{
        myStatus = "";
    }
    
    socket.emit('added user',myUsername);
});
    
    input.on('keydown',function(event){
        if (event.keyCode !=13){
            return;
        }
        
        var message = '<span class="username">' + myUsername + "</span>" + "(" + myStatus + ") " + ":     " + input.val();
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