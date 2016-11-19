$(document).ready(function() {

    $.getJSON("/profile/mine", function(data) {}).done(function(user) {
        console.log(user);
        var userName = user.username.local.username;
        var displayStatus = user.username.info.userStatus;
        
        console.log(user.username.info);
        $('#userStat').text(displayStatus);
        $('#name').text(userName + "'s");
        $('#friendsList').append("A friend");
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
             var displayStatus = user.info.userStatus;
            $('#userStat').text(displayStatus);
            $('#userUpdateField').val("");

        }).fail(function(error) {
            console.log(error);
            $.ajax({
                url: '/failure',
                method: 'GET'
            })
        });
    });

});