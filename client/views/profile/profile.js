$(document).ready(function() {
    
    $('#uploadForm').submit(function(){
        console.log("This will upload a file!");
        $("#upload-status").empty().text("file is uploading...");
        $(this).ajaxSubmit({
             
        });
    });
    
    $.getJSON("/profile/mine", function(data) {}).done(function(user) {
        console.log(user);
        var userName = user.username.local.username;
        var displayStatus = user.username.info.userStatus;
        
        console.log(user.username.info);
        $('#userStat').text(displayStatus);
        $('#name').text(userName + "'s");
        $('#friendsList').append("<li>A friend</li>");
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


//https://codeforgeek.com/2014/11/ajax-file-upload-node-js/
