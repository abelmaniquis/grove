$(document).ready(function(){
    updateCurrentStatus();
    loadPastStatuses();
});


var loadPastStatuses = function(){
    $.getJSON("/profile/mine", function(data) {}).done(function(user) {
        var userName = user.username.local.username;
        var displayStatus = user.username.info.userStatus;
        var statusHistory = user.username.info.statusHistory;
        var statusDates = user.username.info.statusDates;
        
        for(var i = statusHistory.length - 1;i >0; i-=1){
            $("#wallposts").append("<li class='statusUpdate'>" + "<span class='date'>"+statusDates[i] + "</span>" + ": " + statusHistory[i] + "</li>")
        }
        
        $('#userStat').text(displayStatus);
        $('#name').text(userName + "'s");
    });
}

var updateCurrentStatus = function(){
        $('#update').submit(function(event) {
        event.preventDefault();
        
        var field = $('#userUpdatefield').val();1
        $.ajax({
            url: '/profile/' + field,
            method: 'PUT',
            data: {
                myStatus: field
            }
        }).done(function(user) {
            console.log(user);
            /*var newStatus = user.info.userStatus;
            console.log(newStatus);
            $('#wallposts').append(newStatus);
            $('#userStat').text(newStatus);
            $('#userUpdatefield').val("");*/

        }).fail(function(error) {
            console.log(error);
            $.ajax({
                url: '/failure',
                method: 'GET'
            })
        });
    });
}