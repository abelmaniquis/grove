var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.js;
var storage = server.storage;

chai.use(chaiHttp);

describe('grove',function(){
  it('should be able to access the login page');
  it('should be able to access the signup page');
  it('should be able to access the chat room');
  it('should save a user on get');
  
});