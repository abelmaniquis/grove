$(document).ready(function() {

    $.getJSON("profile/mine", function(data) {
        console.log(data);
        if (data.username.local.hasOwnProperty('name')) {
            $('#name').text(data.username.local.name);
        }
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
            console.log(user);
        }).fail(function(error) {
            console.log(error);
        });
    });

});