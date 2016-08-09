//Set up
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;

// Database/mongoDB
var mongoose = require("mongoose");
var configDB = require('./config/database.js');

//Chatroom configuration====================================================
require('./config/chatroom');

//Database configuration====================================================
mongoose.connect(configDB.url);
//set up express application

require('./config/config.express')(app);

//Passing passport for configuration
require('./config/config.passport')(); //pass passport for configuration

//Routing===========================================
require('./config/routes.js')(app); //load routes and a fully configured passport
//=================================================


//routeApp;

//launch===========================================
app.listen(port, function(){
    console.log('Listening on port: ' + port);
});


