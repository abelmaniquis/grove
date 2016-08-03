//app/routes.js
module.exports =function(passport,app,express,path,io,server,port,configDB){
  //app.use(express.static('public'));
//https://scotch.io/tutorials/use-expressjs-to-deliver-html-files
/*-------------------
LOGIN PAGE
--------------------*/
  app.get("/",function(req,res){
    //load login page by default
    console.log("HERE IS THE LOGIN PAGE");
    res.sendFile(path.join(__dirname + '../../../client/login.html'));
  });

/*------------------------------
SIGNUP PAGE
-------------------------------*/

  app.get("/signup",function(req,res){
    console.log("HERE IS THE SIGNUP PAGE");
    res.sendFile(path.join(__dirname + '../../../client/signup.html'));
  });
  
/*
Process the signup form
*/
  app.post('/signup',passport.authenticate('local-login',{
    successRedirect : '/chat', //redirect to chat page
    failureRedirect: '/signup', //redirect back to signup page
    failureFlash: 'Invalid username or password.' //display message upon failure to login, may require flash library
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
  app.get("/profile",function(req,res){
    console.log("HERE IS THE PROFILE PAGE")
    res.sendFile(path.join(__dirname + '../../../client/profile.html'));
  });
  
  app.get('information',isLoggedIn,function(req,res){
    res.send({user:req.user});
    
  });
  
  app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
    console.log("Log out");
  });
  
/*
DATABASE.JSON
*/

};

function isLoggedIn(req,res,next){
  if(req.isAuthenticated())
    return next();
  
  res.redirect('/');
}

//Look up chrome ARC