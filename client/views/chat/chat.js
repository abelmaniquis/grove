$(document).ready(function() {
    var socket = io();
    var input = $(".inputMessage");
    var messages = $('.messages');
    var myUsername = "";
    var myStatus = "";

    $.getJSON("/profile/mine", function(data) {
        
        myUsername = (data.username.local.username);

        if (data.username.info.hasOwnProperty('userStatus')) {
            myStatus = (data.username.info.userStatus);
        }
        else {
            myStatus = "";
        }
        socket.emit('added user: ', myUsername);
    });
    
    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = '<span class="username">'  + myUsername + "</span>" + "(" + myStatus + ") " + ":     " + input.val();
    
        addMessage(message);
        
        socket.emit('message', message);
        input.val('');
    });
    
    socket.on('message', addMessage);
    socket.on("login", notifyLogin());
    
    
    function addMessage(message) {
        $(".messages").append('<li>' + message + '</li>');
        console.log(message)
        playSound();
    };
    
    function notifyLogin(){
        $(".messages").append("<li> A user has logged in</li>");
    }
    
    function logMessage(name,input){
        var thedate = new Date().toString().replace(/ /g, "_");
        console.log(thedate,name + ": ",input);
    }

    function playSound() {
        var audio = new Audio('sounds/arpeggio.mp3');
        audio.play();
    };

});