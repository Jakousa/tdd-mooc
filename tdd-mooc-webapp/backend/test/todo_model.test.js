const chai = require("chai");
const expect = chai.expect;
const Todo = require("../models/Todo");
chai.use(require("chai-as-promised"));
const { createDatabase } = require("./helpers");

describe("Todo model", function () {
  let destroyDB;
  let useDB;

  this.beforeAll(async function () {
    const { dropDatabase, useDatabase } = await createDatabase("model");
    useDB = useDatabase;
    destroyDB = dropDatabase;

    await useDB();
  });

  this.afterEach(async function () {
    await Todo.knex().raw(`TRUNCATE TABLE ${Todo.tableName} RESTART IDENTITY CASCADE`)
  });

  this.afterAll(async function () {
    await destroyDB();
  });

  it("should start testing with an empty database", async function () {
    const todo = await Todo.query()
      .insertAndFetch({ text: "Say Hello" })
      .execute();
    expect(todo.id).to.equal(1);
  });

  it("tests should not depend on other tests", async function () {
    const todo = await Todo.query()
      .insertAndFetch({ text: "Say Hello" })
      .execute();
    expect(todo.id).to.equal(1);
  });

  it("should save a todo with text and set completed as false", async function () {
    const todo = await Todo.query()
      .insertAndFetch({ text: "Say Hello" })
      .execute();
    expect(todo.completed).to.equal(false);
  });

  it("should not accept a todo without text", async function () {
    const failingQuery = Todo.query().insertAndFetch({ completed: true });
    await expect(failingQuery.execute()).to.be.rejectedWith(Error);
  });
});
