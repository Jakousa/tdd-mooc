import _ from 'lodash'

export class Scoreboard {

  score;

  constructor() {
    this.score = 0;
  }

  clear(rowInteger) {
    if (rowInteger === 0) return
    if (rowInteger === 1) this.single()
    if (rowInteger === 2) this.double()
    if (rowInteger === 3) this.triple()
    if (rowInteger === 4) this.tetris()
  }

  single() {
    this.score += 1
  } 
  
  double() {
    this.score += 3
  }

  triple() {
    this.score += 5
  }

  tetris() {
    this.score += 8
  }
}
