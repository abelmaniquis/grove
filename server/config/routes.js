
module.exports =function(app,express,path,io,server,port){
  app.use(express.static('public'));
//https://scotch.io/tutorials/use-expressjs-to-deliver-html-files
/*-------------------
LOGIN PAGE
--------------------*/
  app.get("/",function(req,res){
    //load login page by default
    console.log("Here is the login page");
    res.sendFile(path.join(__dirname + '/../../client/public/login.html'));
  });

/*------------------------------
SIGNUP PAGE
-------------------------------*/

  app.get("/signup",function(req,res){
    console.log("Here is router/signup");
    res.sendFile(path.join(__dirname + '/../../client/public/signup.html'));
  });

/*-------------------------------------
CHATROOM

Only accessible to registered users
-------------------------------------*/
  app.get("/chat",function(req,res){
    console.log("Here is router/chat")
    res.sendFile(path.join(__dirname + '/../../client/public/chat.html'));
  })
};

//Look up chrome ARC