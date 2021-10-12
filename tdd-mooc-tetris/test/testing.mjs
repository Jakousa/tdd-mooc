import { Assertion } from "chai";

export function normalize(s) {
  return s.replaceAll(" ", "").trim() + "\n";
}

export function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

export function moveToLeftWall(board) {
  for (let i = 0; i < 10; i++) {
    board.moveLeft();
  }
}

export function moveToRightWall(board) {
  for (let i = 0; i < 10; i++) {
    board.moveRight();
  }
}

Assertion.addMethod("equalShape", function (expected) {
  const actual = this._obj;
  new Assertion(actual).to.be.a("string");

  expected = normalize(expected);
  this.assert(
    actual === expected,
    "expected #{this} to equal #{exp} but got #{act}",
    "expected #{this} to not equal #{act}",
    expected,
    actual
  );
});
