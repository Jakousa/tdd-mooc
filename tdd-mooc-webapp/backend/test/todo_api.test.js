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

  it("should send new todo to Todo model", function (done) {
    const spy = sinon.spy(Todo, "query")
    request(app)
      .post(todopath)
      .send({ text: "Say Hello" })
      .end(function (_, res) {
        expect(spy.calledOnce).to.be.true
        done();
      });
  });

  it.only("should accept a todo and return it", function (done) {
    const path = todopath + '/123'

    request(app)
      .put(path)
      .send({ completed: true })
      .end(function (_, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it("should send todo to Todo model", function (done) {
    const path = todopath + '/123'
    const spy = sinon.spy(Todo, "query")
    request(app)
      .put(path)
      .send({ completed: true })
      .end(function (_, res) {
        expect(spy.calledOnce).to.be.true
        done();
      });
  });

  it("should delete a todo and return no content", function (done) {
    const path = todopath + '/123'

    request(app)
      .delete(path)
      .end(function (_, res) {
        expect(res.statusCode).to.equal(204);
        done();
      });
  });

  it("should send id to Todo model", function (done) {
    const path = todopath + '/123'
    const spy = sinon.spy(Todo, "query")
    request(app)
      .delete(path)
      .send({ completed: true })
      .end(function (_, res) {
        expect(spy.calledOnce).to.be.true
        done();
      });
  });
});
