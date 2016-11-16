$(document).ready(function() {
    $.getJSON("/profile/mine", function(data) {
    }).done(function(user){
        console.log(user);
        
        var userName = user.username.local.username;
        $('#name').text(userName + "'s");
    });
    
    $('#update').submit(function(event) {
        event.preventDefault();
        var field = $('#userUpdatefield').val();
        $.ajax({
            url: '/profile',
            method: 'PUT',
            data: {
                name: field
            }
        }).done(function(user) {
            console.log(user.info.userStatus);
            console.log(user.local.username);
            
            var displayName = user.local.username;
            var displayStatus = user.info.userStatus;
            
            $('#name').text(displayName);
            $('#userStat').text(displayStatus);
            
        }).fail(function(error) {
            console.log(error);
            $.ajax({
                url:'/failure',
                method:'GET'
            })
        });
    });

});