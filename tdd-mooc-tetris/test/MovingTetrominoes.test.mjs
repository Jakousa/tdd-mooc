import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { fallToBottom, moveToLeftWall, moveToRightWall } from "./testing.mjs";

describe("a falling tetromino", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft()

    expect(board.toString()).to.equalShape(
      `..TTT.....
       ...T......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight()

    expect(board.toString()).to.equalShape(
      `....TTT...
       .....T....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()

    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be moved left beyond the board", () => {
    board.drop(Tetromino.T_SHAPE)
    moveToLeftWall(board)

    expect(board.toString()).to.equalShape(
      `TTT.......
       .T........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be moved right beyond the board", () => {
    board.drop(Tetromino.T_SHAPE)
    moveToRightWall(board)

    expect(board.toString()).to.equalShape(
      `.......TTT
       ........T.
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("cannot be moved down beyond the board (will stop falling)", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
  });

  it("cannot be moved down through other blocks (will stop falling)", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board)

    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    );
  })

  it("cannot be moved left through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToLeftWall(board)
    fallToBottom(board)

    board.drop(Tetromino.T_SHAPE);
    moveToLeftWall(board)
    fallToBottom(board)

    board.drop(Tetromino.T_SHAPE);
    moveToLeftWall(board)
    fallToBottom(board)

    board.drop(Tetromino.T_SHAPE);
    moveToLeftWall(board)
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `TTT.......
       .T........
       TTT.......
       .T........
       TTTTTT....
       .T..T.....`
    );
  })
  it("cannot be moved right through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToRightWall(board)
    fallToBottom(board)

    board.drop(Tetromino.T_SHAPE);
    moveToRightWall(board)
    fallToBottom(board)

    board.drop(Tetromino.T_SHAPE);
    moveToRightWall(board)
    fallToBottom(board)

    board.drop(Tetromino.T_SHAPE);
    moveToRightWall(board)
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `.......TTT
       ........T.
       .......TTT
       ........T.
       ....TTTTTT
       .....T..T.`
    );
  })
});
