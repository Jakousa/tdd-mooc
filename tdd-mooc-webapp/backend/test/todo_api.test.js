const { expect } = require("chai");
const request = require("supertest");
const sinon = require("sinon")
const { QueryBuilder } = require('objection');

const app = require("../app");
const Todo = require('../models/Todo')
const { createDatabase } = require("./helpers");


const todopath = `/api/todos`;

describe("Todos api", function () {
  let destroyDB;
  let useDB;

  this.beforeAll(async function () {

    const { dropDatabase, useDatabase } = await createDatabase("model");
    useDB = useDatabase;
    destroyDB = dropDatabase;

    await useDB();
  });

  this.beforeEach(function () {
    sinon.stub(Todo, "query").value(() => QueryBuilder.forClass(Todo).resolve([]))
  })

  this.afterEach(async function () {
    sinon.restore()
  });

  this.afterAll(async function () {
    await destroyDB();
  });

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

  it("should ask Todo model for the todos", function (done) {
    const spy = sinon.spy(Todo, "query")
    request(app)
      .get(todopath)
      .end(function(_, res) {
        expect(spy.calledOnce).to.be.true
        done();
      })
  })

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
