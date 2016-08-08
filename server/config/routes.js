//app/routes.js
//var passport = require('passport');
module.exports =function(app,passport,io){ //don't need to pass everything
//app.use(express.static('public'));
//https://scotch.io/tutorials/use-expressjs-to-deliver-html-files
//var passport = require('passport');
var path = require('path');
var route = __dirname + '../../../client';

/*-------------------

LOGIN PAGE

--------------------*/
  app.get("/",function(req,res){
    res.status(200).sendFile(__dirname + '/client/index.html');
  });

/*--------------------

LOGIN PAGE

---------------------*/
//show the login form
  app.get("/login",function(req,res){
    res.status(200).sendFile(__dirname + '/client/login.html');
  })
  
  app.post('/login', passport.authenticate('local-login',{
    successRedirect : '/profile',
    failureRedirect : '/failure'
  }));

/*------------------------------
SIGNUP PAGE
-------------------------------*/

  app.get("/signup",function(req,res){
    res.status(200).sendFile(__dirname + '/client/signup.html');
  });

/*
Process the signup form
Do all our passport stuff here
*/
  //process the signup form
  app.post('/signup',passport.authenticate('local-signup',{
    successRedirect : '/profile', //redirect to chat page
    failureRedirect: '/failure' //redirect back to signup page
  }));
  //Process the login form

/*-------------------------------------
PROFILE
Only accessible to registered users
use route middlware to verify this (isLoggedIn function)
-------------------------------------*/
  app.get("/profile",isLoggedIn,function(req,res){
    //testing login access
    res.status(200).sendFile(__dirname + 'client/profile.html')
  });

/*-------------------------------------------
INFORMATION:
this is to check to see if the user object has been passed
----------------------------------------------*/
  
  app.get('/information',function(req,res){
    res.send({user:req.user});
  });
  
 
/*--------------------------------------------

CHAT

Getting socket.io to respond
http://stackoverflow.com/questions/24793255/socket-io-cant-get-it-to-work-having-404s-on-some-kind-of-polling-call

Currently on server.js

---------------------------------------------*/

//Load chatroom

  app.get('/chat',function(req,res){
    res.status(200).sendFile(__dirname + '/config/client/chat.html');
  })
  
  //Once the app GETS chat. socket.io should connect. and then should do the following:

//http://socket.io/get-started/chat/
  var numUsers = 0;
  
  io.on('connection',function(socket){
    var addedUser = false;
    console.log("A user connected");
    
    socket.on(' new message',function(data){
      socket.broadcast.emit('new message', {
        //username: username from database
        message: data
      })
    });
    
  });



/*--------------------------------
LOGOUT
---------------------------------*/
  app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
  });


/*
FAILURE TO SIGN IN
*/
  app.get('/failure',function(req,res){
    res.sendFile(__dirname + '/failure.html');
  });
};



/*------------------------------------------
FUNCTION FOR CHECKING IF USER IS LOGGED IN
--------------------------------------------*/

function isLoggedIn(req,res,next){
  if(req.isAuthenticated())
    return next();
  else{
    console.log("ACCESS DENIED");
  }
  
  res.redirect('/failure');
}

//Look up chrome ARC