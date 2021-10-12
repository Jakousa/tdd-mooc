import _ from 'lodash'
import { expect } from "chai";
import { Shufflebag } from "../src/Shufflebag.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

import { Board } from "../src/Board.mjs";

describe("Shufflebag", () => {
  let board
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("gives a tetromino out", () => {
    const shufflebag = new Shufflebag()

    const tetromino = shufflebag.pop()
    expect(tetromino instanceof Tetromino).to.be.true
  });

  it("gives a different tetromino next", () => {
    const shufflebag = new Shufflebag([Tetromino.T_SHAPE, Tetromino.O_SHAPE])
    const tetromino1 = shufflebag.pop()
    const tetromino2 = shufflebag.pop()
    expect(_.isEqual(tetromino1.shape, tetromino2.shape)).to.be.false
  });

  it("gives a new tetromino after exhausting the list", () => {
    const shufflebag = new Shufflebag([Tetromino.T_SHAPE, Tetromino.O_SHAPE])

    shufflebag.pop()
    shufflebag.pop()
    expect(shufflebag.pop()).to.not.be.undefined
  });

  it("gives all of the tetrominoes given in a loop", () => {
    const shufflebag = new Shufflebag([Tetromino.T_SHAPE, Tetromino.O_SHAPE])

    const tetrominoes = [shufflebag.pop(), shufflebag.pop()]
    const newTetrominoes = [shufflebag.pop(), shufflebag.pop()]

    tetrominoes.forEach(tetromino => {
      const same = newTetrominoes.find(newTetromino => _.isEqual(tetromino.shape, newTetromino.shape))
      expect(_.isEqual(same.shape, tetromino.shape)).to.be.true
    })
  });
});
