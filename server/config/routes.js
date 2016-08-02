module.exports =function(passport,app,express,path,io,server,port,configDB){
  app.use(express.static('public'));
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
    failureRedirect: '/signup' //redirect back to signup page
  }));
  
  app.post('/login', passport.authenticate('local-login',{
    successRedirect : '/profile',
    failureRedirect : '/login'
  }));

/*-------------------------------------
CHATROOM

Only accessible to registered users
-------------------------------------*/
  app.get("/chat",function(req,res){
    console.log("HERE IS THE CHAT PAGE")
    res.sendFile(path.join(__dirname + '../../../client/chat.html'));
  
  app.get('information',isLoggedIn,function(req,res){
    res.send({user:req.user});
  });
  
    console.log("================SOCKET STUFF=============================================================");
    console.log(io);
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