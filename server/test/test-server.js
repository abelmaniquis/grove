var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.js;
var storage = server.storage;

chai.use(chaiHttp);

describe('grove',function(){
  it('should open the profile on login',function(done){
    chai.request(app)
    .get('/')
    .end(function(res){
      res.should.have.status(200);
    });
  });
  it('should be able to access the login page',function(done){
    chai.request(app)
    .get('/login')
    .end(function(res){
      res.should.have.status(200);
    });
  it('should be able to access the signup page',function(done){
  });
  })
});