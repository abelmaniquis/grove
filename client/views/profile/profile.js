$(document).ready(function() {
    
    $.getJSON("/profile/mine", function(data) {}).done(function(user) {
        
        var currentScreen,nextScreen, previousScreen
        
        var userName = user.username.local.username;
        var displayStatus = user.username.info.userStatus;
        
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
            console.log(user.info.userStatus);
            var newStatus = user.info.userStatus;
            console.log(newStatus);
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
