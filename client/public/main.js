$(document).ready(function(){
    var socket = io();
    var input = $('input');
    var messages = $('#messages');

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    input.on('keydown', function(event) {
        console.log("Keydown");
        if (event.keyCode != 13) {
            console.log("enter key pressed");
            return;
        }

        var message = input.val();
        addMessage(message);
            socket.emit('message',message);
        input.val('');
    });
    socket.on('message', addMessage);
});