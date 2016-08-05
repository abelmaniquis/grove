//app/routes.js
//var passport = require('passport');
var path = require('path');
module.exports =function(app,passport){ //don't need to pass everything
//app.use(express.static('public'));
//https://scotch.io/tutorials/use-expressjs-to-deliver-html-files

//var passport = require('passport');

console.log(passport);

var route = __dirname + '../../../client';
/*-------------------
LOGIN PAGE
--------------------*/
  app.get("/",function(req,res){
    //load login page by default
    console.log("HERE IS THE HOME PAGE");
   res.status(200).sendFile(path.join(route +'/index.html')); //set ../../../client/
  });

/*--------------------
LOGIN PAGE
---------------------*/
  app.get("/login",function(req,res){
    res.status(200).sendFile(path.join(route + '/login.html'));
  })


/*------------------------------
SIGNUP PAGE
-------------------------------*/

  app.get("/signup",function(req,res){
    res.status(200).sendFile(path.join(route + '/signup.html'));
  });
  
/*
Process the signup form
Do all our passport stuff here
*/
  app.post('/signup',passport.authenticate('local-signup',{
    successRedirect : '/profile', //redirect to chat page
    failureRedirect: '/signup' //redirect back to signup page
    //failureFlash: 'Invalid username or password.' //display message upon failure to login, may require flash library
  }));
  //Process the login form
  app.post('/login', passport.authenticate('local-login',{
    successRedirect : '/profile',
    failureRedirect : '/login'
  }));

/*-------------------------------------
PROFILE
Only accessible to registered users
use route middlware to verify this (isLoggedIn function)
-------------------------------------*/
  app.get("/profile",isLoggedIn,function(req,res){
    console.log("HERE IS THE PROFILE PAGE")
    res.sendFile(path.join(route + '/client/profile.html'));
  });
  
  app.get('/information',function(req,res){
    
    /*
        USING THIS TO TEST THE USER AND PASSWORD
        CURRENTLY PASSING IN AN EMPTY OBJECT
        GET THE USER OUT OF SESSION AND PASS TO TEMPLATE
    */
    
    //console.log({user:req.user});
    res.send({user:req.user});
    
  });
  
  app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
    console.log("Log out");
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