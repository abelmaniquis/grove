
//Set up
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");

var configDB = require('./config/database.js')

//configuration
mongoose.connect(configDB.url);

app.use(bodyParser())
