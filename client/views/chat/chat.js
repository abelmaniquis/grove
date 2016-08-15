$(document).ready(function() {
    
    
var socket = io();
var input = $(".inputMessage");
var messages = $('.messages');
var myUsername = "";
    
$.getJSON("profile/mine", function(data){
// Make sure the data contains the username as expected before using it
    if (data.hasOwnProperty('username')) {
        myUsername = (data.username.local.username);
    }else{
        myUsername = "aUsername";
    }
    socket.emit('added user',myUsername);
});
    
    input.on('keydown',function(event){
        if (event.keyCode !=13){
            return;
        }
        
        var message = input.val();
        
        addMessage(message);
            socket.emit('message', myUsername + ": " + message);
        input.val('');
    });
    socket.on('message',addMessage);
    

function addMessage(message){
      messages.append('<ul>' + message + '</ul>'); 
      playSound();
};
    
function playSound(){
    var audio = new Audio('arpeggio.mp3');
    audio.play();
    /*$('#notify')[0].volume = 0.5;
    $('#notify')[0].load();
    $('#notify')[0].play();*/
};
    
});