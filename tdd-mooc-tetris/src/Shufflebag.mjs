import _ from 'lodash'
import { Tetromino } from './Tetromino.mjs'

export class Shufflebag {
  fullBag;
  bag;

  constructor(shapesArray = [Tetromino.T_SHAPE, Tetromino.I_SHAPE, Tetromino.O_SHAPE]) {
    this.fullBag = shapesArray
    this.bag = _.shuffle(this.fullBag)
  }

  shuffle() {
    this.bag = _.shuffle(this.bag)
  }

  pop() {
    const element = this.bag.pop()
    if (!this.bag.length) this.bag = _.shuffle(this.fullBag)
    return element
  }

}