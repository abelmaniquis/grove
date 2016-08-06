var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.js;
var storage = server.storage;

chai.use(chaiHttp);

describe('grove',function(){
  it('should be able to be tested')
  it('should return status(200)',function(done){
    chai.request(app)
    .get('/')
    .end(function(res){
      res.should.have.status(200);
    });
  })
});