import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { fallToBottom, moveToLeftWall, moveToRightWall } from "./testing.mjs";

describe("Line clear", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("clears the bottom row", () => {
    board.drop(Tetromino.I_SHAPE);
    moveToLeftWall(board)
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    moveToRightWall(board)
    fallToBottom(board)

    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
     `..........
      ..........
      ..........
      ..........
      ..........
      ....OO....`
    );
  });

  it("clears a middle row", () => {
    board.drop(Tetromino.I_SHAPE);
    moveToLeftWall(board)
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    moveToRightWall(board)
    fallToBottom(board)

    board.drop(Tetromino.I_SHAPE);
    moveToLeftWall(board)
    board.moveRight()
    board.moveRight()
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    moveToRightWall(board)
    fallToBottom(board)

    board.drop(Tetromino.O_SHAPE)
    moveToLeftWall(board)
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       OO........
       IIII..IIII`
     );
  });

  it("moves the above rows down", () => {
    board.drop(Tetromino.I_SHAPE);
    moveToLeftWall(board)
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    moveToRightWall(board)
    fallToBottom(board)

    board.drop(Tetromino.I_SHAPE);
    moveToLeftWall(board)
    board.moveRight()
    board.moveRight()
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    moveToRightWall(board)
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    moveToLeftWall(board)
    board.moveRight()
    board.moveRight()
    fallToBottom(board)
    board.drop(Tetromino.I_SHAPE);
    moveToRightWall(board)
    board.moveLeft()
    fallToBottom(board)

    board.drop(Tetromino.O_SHAPE)
    moveToLeftWall(board)
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .....IIII.
       OOIIII....
       IIII..IIII`
     );
});

});
