const app = require('../app');
const { expect } = require('chai');
const request = require('supertest');

const todopath = `/api/todos`

describe('Todos', function() {
  it('should say hello', function(done) {
    request(app)
      .get('/api')
      .end(function(err, res) {
        expect(res.text).to.equal('Hello from backend');
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it('should respond with an empty array', function(done) {
    request(app)
      .get(todopath)
      .end(function(err, res) {
        expect(res.body).to.be.an('array');
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

});