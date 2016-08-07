//app/routes.js
//var passport = require('passport');
module.exports =function(app,passport){ //don't need to pass everything
//app.use(express.static('public'));
//https://scotch.io/tutorials/use-expressjs-to-deliver-html-files
//var passport = require('passport');
var path = require('path');
var route = __dirname + '../../../client';
/*-------------------
LOGIN PAGE
--------------------*/
  app.get("/",function(req,res){
    res.status(200).sendFile(__dirname + '/index.html');
    //load login page by default
   //res.status(200).render(path.join(route +'/index.html')); //set ../../../client/
  });

/*--------------------
LOGIN PAGE
---------------------*/
//show the login form
  app.get("/login",function(req,res){
    res.status(200).sendFile(__dirname + '/login.html');
  })
  
  app.post('/login', passport.authenticate('local-login',{
    successRedirect : '/profile',
    failureRedirect : '/failure'
  }));

/*------------------------------
SIGNUP PAGE
-------------------------------*/

  app.get("/signup",function(req,res){
    res.status(200).sendFile(__dirname + '/signup.html');
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
    res.render(path.join(route + '/client/profile.jade'),{
      user: req.user});
    //res.send({user:req.user});
  });
  
  app.get('/information',function(req,res){
    res.send({user:req.user});
  });
  
  

var socket_io = require('socket.io');
var http = require('http').Server(app);
var io = require('socket.io')(http);
//Load chatroom
app.get('/chat',isLoggedIn,function(req,res){
  //res.send("Hello chat");
  res.sendFile(__dirname + '/chat.html');
})

//http://socket.io/get-started/chat/

io.on('connection',function(socket){
  console.log("A user connected");
});
  
  app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
  });


/*
FAILURE TO SIGN IN
*/
  app.get('/failure',function(req,res){
    res.render(path.join(route + '/failure.jade'));
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
  
  res.redirect('/');
}

//Look up chrome ARC