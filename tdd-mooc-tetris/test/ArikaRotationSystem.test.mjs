import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Start positions arika style", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("starts T shape correctly", () => {
    board.drop(Tetromino.T_SHAPE);

    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("starts O shape correctly", () => {
    board.drop(Tetromino.O_SHAPE);

    expect(board.toString()).to.equalShape(
      `....OO....
       ....OO....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("starts I shape correctly", () => {
    board.drop(Tetromino.I_SHAPE);

    expect(board.toString()).to.equalShape(
      `...IIII...
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

});
