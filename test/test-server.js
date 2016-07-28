var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('grove',function(){
  it("should connect to chatroom",function(done){
    chai.request(app)
      .get('/')
      .end(function(err,res){
        res.should.be.html;
      })
  });
  it("should access chat");
  it("should get login info");
});