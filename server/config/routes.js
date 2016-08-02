module.exports =function(app,express,path,io,server,port,configDB){
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

/*-------------------------------------
CHATROOM

Only accessible to registered users
-------------------------------------*/
  app.get("/chat",function(req,res){
    console.log("HERE IS THE CHAT PAGE")
    res.sendFile(path.join(__dirname + '../../../client/chat.html'));
  
    console.log("================SOCKET STUFF=============================================================");
    console.log(io);
  });
/*
DATABASE.JSON
*/
app.get("/database",function(req,res){
    res.json(
      configDB
      )
});

};

//Look up chrome ARC