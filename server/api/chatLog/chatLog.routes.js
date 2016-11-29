var express = require('express');
var ChatLog = require('./chatLog.model.js');

module.exports = function(app){
  
  app.get('/chatLog', function(req,res){
    res.json(
      req.chatLog
    )
  });
  
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
