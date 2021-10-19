const app = require("../app");
const { expect } = require("chai");
const request = require("supertest");

const todopath = `/api/todos`;

describe("Todos", function () {
  it("should say hello", function (done) {
    request(app)
      .get("/api")
      .end(function (_, res) {
        expect(res.text).to.equal("Hello from backend");
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it("should respond with an empty array", function (done) {
    request(app)
      .get(todopath)
      .end(function (_, res) {
        expect(res.body).to.be.an("array");
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it("should accept a new todo", function (done) {
    request(app)
      .post(todopath)
      .send({ text: "Say Hello" })
      .end(function (_, res) {
        expect(res.body.text).to.equal("Say Hello");
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});
