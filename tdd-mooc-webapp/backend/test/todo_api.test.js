const app = require('../app');
const { expect } = require('chai');
const request = require('supertest');

describe('Todo', function() {
  it('should say hello', function(done) {
    request(app)
      .get('/api')
      .end(function(err, res) {
        expect(res.text).to.equal('Hello from backend');
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});