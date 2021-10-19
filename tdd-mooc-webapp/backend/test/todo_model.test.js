const chai = require('chai')
const expect = chai.expect
const Todo = require('../models/Todo')
chai.use(require('chai-as-promised'))

describe("Todo model", function () {
  it("should save a todo with text and set completed as false", async function () {
    const todo = await Todo.query().insertAndFetch({ text: "Say Hello" }).execute()
    expect(todo.completed).to.equal(false)
  });

  it("should not accept a todo without text", async function () {
    const failingQuery = Todo.query().insertAndFetch({ completed: true })
    await expect(failingQuery.execute()).to.be.rejectedWith(Error)
  });

});
