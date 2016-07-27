
module.exports =function(app,express,path,io){
  app.use(express.static('public'));
//https://scotch.io/tutorials/use-expressjs-to-deliver-html-files

app.get("/",function(req,res){
  //load login page by default
  res.sendFile(path.join(__dirname + '/public/login.html'));
})

app.get("/chat",function(req,res){
  //load chatpage
  //should only be accesible by password
  console.log("Chat connected");
  res.sendFile(path.join(__dirname + '/public/chat.html'));
  
  io.on('connection',function(socket){
    console.log('reading io');
  });
  
});

app.get("/signup",function(req,res){
  res.sendFile(path.join(__dirname + '/public/signup.html'));
});
};