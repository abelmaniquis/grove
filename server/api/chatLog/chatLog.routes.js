var express = require('express');
var ChatLog = require('./chatLog.model.js');

module.exports = function(app){
  var date = new Date;
  console.log(date.toString());
  var todaysDate = date.toString();
  
  var todaysLog = new ChatLog
  
  todaysLog.date = todaysDate;
  
  app.get('/chatLog', function(req,res){
    res.json(
      todaysLog
    )
  });
  
  app.post('/chatLog',function(req,res){
    console.log(todaysLog);
    req.status(200);
  });
  
  app.put('/chatlog/:date/:name/:comment',function(req,res){
    todaysLog.time.push(req.params.date);
    todaysLog.names.push(req.params.name);
    todaysLog.comments.push(req.params.comment);
    console.log(todaysLog);
    todaysLog.save();
  })
  
  app.put('/chatLog/addtoLog/:time/:comment',function(req,res,next){
    console.log(req.params.time);
    console.log(req.params.comment);
    
    ChatLog.findById(req.params._id,function(err,chatlog){
      if(err){
        next(err);
      }
      console.log(chatlog);
      chatlog.comments.push(req);
      console.log(chatlog);
    })
    
    req.status(200).json({thisInfo:req.params.time});
  });
  
};

function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/failure');
  }
};
