import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { fallToBottom, moveToLeftWall, moveToRightWall } from "./testing.mjs";

describe("A tetromino", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `....TT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `...TT.....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("T shape can be rotated when against the left wall", () => {
    board.drop(Tetromino.T_SHAPE)
    board.rotateRight()
    moveToLeftWall(board)
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `TTT.......
       .T........
       ..........
       ..........
       ..........
       ..........`
    );
  })

  it("T shape can be rotated when against the right wall", () => {
    board.drop(Tetromino.T_SHAPE)
    board.rotateRight()
    moveToRightWall(board)
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `.......TTT
       ........T.
       ..........
       ..........
       ..........
       ..........`
    );
  })

  it("can not be rotated left between blocks without space", () => {
    board.drop(Tetromino.I_SHAPE);
    board.moveLeft()
    board.moveLeft()
    board.rotateLeft()
    fallToBottom(board)

    board.drop(Tetromino.I_SHAPE);
    board.moveRight()
    board.rotateLeft()
    fallToBottom(board)

    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft()
    board.tick()
    board.tick()
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...ITTI...
       ...IT.I...
       ...I..I...
       ...I..I...`
    );
  });

  it("can not be rotated right between blocks without space", () => {
    board.drop(Tetromino.I_SHAPE);
    board.moveLeft()
    board.moveLeft()
    board.rotateLeft()
    fallToBottom(board)

    board.drop(Tetromino.I_SHAPE);
    board.moveRight()
    board.rotateLeft()
    fallToBottom(board)

    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft()
    board.tick()
    board.tick()
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...ITTI...
       ...IT.I...
       ...I..I...
       ...I..I...`
    );
  });

  it("can not be rotated between wall and a block without space", () => {
    board.drop(Tetromino.I_SHAPE);
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.rotateLeft()
    fallToBottom(board)

    board.drop(Tetromino.T_SHAPE);
    moveToLeftWall(board)
    board.rotateLeft()
    board.moveLeft()
    board.tick()
    board.tick()
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       T.........
       TTI.......
       T.I.......
       ..I.......
       ..I.......`
    );
  });
});
