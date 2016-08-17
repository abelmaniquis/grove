var app = require('../server.js').app;
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);
  it('should be able to access the login page',function(done){
    chai.request(app)
    .get('/')
    .end(function(err,res){
      should.equal(err,null);
      res.should.have.status(200);
      done();
    });
  });
  it('should be able to access the login page',function(done){
    chai.request(app)
    .get('/login')
    .end(function(err,res){
      should.equal(err,null);
      res.should.have.status(200);
      done();
    });
  });
  it('should accept a successful login',function(done){
    chai.request(app)
    .post('/login')
    .send({'name':'carl',
      'password':'abcde'
    }).end(function(err,res){
      should.equal(err,null);
      res.should.have.status(200);
      done();
    })
  })