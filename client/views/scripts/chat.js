$(document).ready(function() {
    var input = $(".inputMessage")
    var chatPage = $('#chatPage');
    
    var addMessage = function(message){
      chatPage.append('<div>' + message + '</div>');  
    };
    
    input.on('keydown',function(event){
        console.log("I see this");
    })
    
});