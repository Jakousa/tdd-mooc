import { Block } from './Block.mjs'

export class Tetromino extends Block {
  static T_SHAPE_ORIENTATIONS = [
    `....
     TTT.
     .T..
     ....`,
    `.T..
     TT..
     .T..
     ....`,
    `....
     .T..
     TTT.
     ....`,
    `.T..
     .TT.
     .T..
     ....`
  ]

  static I_SHAPE_ORIENTATIONS = [
    `....
     IIII
     ....
     ....`,
    `..I.
     ..I.
     ..I.
     ..I.`
  ]

  static O_SHAPE_ORIENTATIONS = [
    `....
     .OO.
     .OO.
     ....`
  ]

  static T_SHAPE = new Tetromino(this.T_SHAPE_ORIENTATIONS)

  static I_SHAPE = new Tetromino(this.I_SHAPE_ORIENTATIONS)

  static O_SHAPE = new Tetromino(this.O_SHAPE_ORIENTATIONS)

  shape;
  rotations;

  constructor(shape, rotations = 0, location = { x: 3, y: -1 }) {
    super(undefined, location)
    this.shape = shape
    this.rotations = this.getNewRotationValue(rotations)
  }

  getNewRotationValue(newRotation) {
    if (newRotation < 0) {
      return this.shape.length - 1
    }
    if (newRotation >= this.shape.length) {
      return 0
    }

    return newRotation
  }

  rotateRight() {
    return new Tetromino(this.shape, this.rotations + 1, this.location)
  }

  rotateLeft() {
    return new Tetromino(this.shape, this.rotations - 1, this.location)
  }

  toString() {
    const shape = this.shape[this.rotations].split('\n').map(t => t.trim()).join('\n')
    return shape + '\n'
  }
}