
module.exports =function(app,express,path){
  app.use(express.static('public'));
//https://scotch.io/tutorials/use-expressjs-to-deliver-html-files

app.get("/",function(req,res){
  //load login page by default
  res.sendFile(path.join(__dirname + '/public/login.html'));
})

app.get("/chat",function(req,res){
  //load chatpage
  //should only be accesible by password
  res.sendFile(path.join(__dirname + '/public/chat.html'));
});

app.get("/signup",function(req,res){
  res.sendFile(path.join(__dirname + '/public/signup.html'));
});
};