import { expect } from "chai";
import { fallToBottom, moveToLeftWall, moveToRightWall } from "./testing.mjs";
import { Board } from "../src/Board.mjs";
import { Scoreboard } from "../src/Scoreboard.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Scoreboard", () => {
  let scoreboard;
  let board
  beforeEach(() => {
    scoreboard = new Scoreboard()
    board = new Board(10, 6, scoreboard);
  });

  it("starts at 0", () => {
    expect(scoreboard.score).to.equal(0)
  });

  it("can be increased with single clear", () => {
    scoreboard.single()
    expect(scoreboard.score).to.equal(1)
  })

  it("can be increased with double clear", () => {
    scoreboard.double()
    expect(scoreboard.score).to.equal(3)    
  })

  it("can be increased with triple clear", () => {
    scoreboard.triple()
    expect(scoreboard.score).to.equal(5)
  })

  it("can be increased with tetris clear", () => {
    scoreboard.tetris()
    expect(scoreboard.score).to.equal(8)
  })

  it("is increased on row clear", () => {
    board.drop(Tetromino.I_SHAPE);
    moveToLeftWall(board)
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    moveToRightWall(board)
    fallToBottom(board)

    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board)

    expect(scoreboard.score).to.equal(1)
  });

  it("is increased on a second row clear", () => {
    board.drop(Tetromino.I_SHAPE);
    moveToLeftWall(board)
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    moveToRightWall(board)
    fallToBottom(board)

    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board)

    board.drop(Tetromino.I_SHAPE);
    moveToLeftWall(board)
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    moveToRightWall(board)
    fallToBottom(board)

    expect(scoreboard.score).to.equal(2)
  });

  it("is increased more on multi-row clear", () => {
    board.drop(Tetromino.I_SHAPE);
    moveToLeftWall(board)
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    moveToRightWall(board)
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    moveToLeftWall(board)
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    moveToRightWall(board)
    fallToBottom(board)

    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board)

    expect(scoreboard.score).to.equal(3)
  });
});
