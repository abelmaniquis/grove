
module.exports =function(app,express,path,io,server,port){
  app.use(express.static('public'));
//https://scotch.io/tutorials/use-expressjs-to-deliver-html-files
/*-------------------
LOGIN PAGE
--------------------*/
  app.get("/",function(req,res){
    //load login page by default
    res.sendFile(path.join(__dirname + '/../../client/public/login.html'));
    console.log(__dirname);
  });

/*------------------------------
SIGNUP PAGE
-------------------------------*/

  app.get("/signup",function(req,res){
    res.sendFile(path.join(__dirname + '/../../client/public/signup.html'));
  });

/*-------------------------------------
CHATROOM

Only accessible to registered users
-------------------------------------*/
  app.get("/chat",function(req,res){
    res.sendFile(path.join(__dirname + '/../../client/public/chat.html'));
  })
};

//Look up chrome ARC