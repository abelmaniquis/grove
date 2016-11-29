$(document).ready(function() {
    
    $.getJSON("/profile/mine", function(data) {}).done(function(user) {
        
        var userName = user.username.local.username;
        var displayStatus = user.username.info.userStatus;
        
        var statusHistory = user.username.info.statusHistory;
        var statusDates = user.username.info.statusDates;
        
        console.log(statusDates,statusHistory);
        
        for(var i = statusHistory.length - 1;i >0; i-=1){
            $("#wallposts").append("<li class='statusUpdate'>" + "<span class='date'>"+statusDates[i] + "</span>" + ": " + statusHistory[i] + "</li>")
        }
        
        $('#userStat').text(displayStatus);
        $('#name').text(userName + "'s");
    });

    $('#update').submit(function(event) {
        event.preventDefault();
        var field = $('#userUpdatefield').val();
        $.ajax({
            url: '/profile/' + field,
            method: 'PUT',
            data: {
                myStatus: field
            }
        }).done(function(user) {
            var newStatus = user.info.userStatus;
            $('#wallposts').append(newStatus);
            $('#userStat').text(newStatus);
            $('#userUpdatefield').val("");

        }).fail(function(error) {
            console.log(error);
            $.ajax({
                url: '/failure',
                method: 'GET'
            })
        });
    });
    
    $('#email-form').submit(function(event){
        event.preventDefault();
    })
    
});


//https://codeforgeek.com/2014/11/ajax-file-upload-node-js/
