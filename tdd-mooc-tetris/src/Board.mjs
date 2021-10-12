import _ from 'lodash'
import { Scoreboard } from './ScoreBoard.mjs';

export class Board {
  width;
  height;
  board;
  fallingBlock;
  scoreboard

  constructor(width, height, scoreboard = new Scoreboard()) {
    const initialBoard = () => {
      let board = []
      for (let i = 0; i < this.height; i++) {
        board[i] = []
        for (let j = 0; j < this.width; j++) {
          board[i][j] = '.'
        }
      }
      return board 
    }

    this.width = width;
    this.height = height;
    this.board = initialBoard()
    this.scoreboard = scoreboard
  }

  drop(block) {
    if (this.hasFalling()) throw new Error("already falling")
    const centeredblock = block.setToStartingLocation(this.width)
    this.fallingBlock = centeredblock
  }

  moveLeft() {
    const oldBlock = this.fallingBlock
    const newBlock = this.fallingBlock.moveLeft(this.getBoard())
    if (this.canNewBlockBeDrawn(newBlock, oldBlock)) {
      this.fallingBlock = newBlock
    }
  }

  moveRight() {
    const oldBlock = this.fallingBlock
    const newBlock = this.fallingBlock.moveRight(this.getBoard())
    if (this.canNewBlockBeDrawn(newBlock, oldBlock)) {
      this.fallingBlock = newBlock
    }
  }

  rotateRight() {
    const oldBlock = this.fallingBlock
    const newBlock = this.fallingBlock.rotateRight(this.getBoard())
    if (this.canNewBlockBeDrawn(newBlock, oldBlock)) {
      return this.fallingBlock = newBlock
    }
    const oneLeft = newBlock.moveLeft()
    if (this.canNewBlockBeDrawn(oneLeft, oldBlock)) {
      return this.fallingBlock = oneLeft
    }
    const oneRight = newBlock.moveRight()
    if (this.canNewBlockBeDrawn(oneRight, oldBlock)) {
      return this.fallingBlock = oneRight
    }
  }

  rotateLeft() {
    const oldBlock = this.fallingBlock
    const newBlock = this.fallingBlock.rotateLeft(this.getBoard())
    if (this.canNewBlockBeDrawn(newBlock, oldBlock)) {
      return this.fallingBlock = newBlock
    }
    const oneLeft = newBlock.moveLeft()
    if (this.canNewBlockBeDrawn(oneLeft, oldBlock)) {
      return this.fallingBlock = oneLeft
    }
    const oneRight = newBlock.moveRight()
    if (this.canNewBlockBeDrawn(oneRight, oldBlock)) {
      return this.fallingBlock = oneRight
    }
  }

  canNewBlockBeDrawn(newBlock, oldBlock) {
    const drawOnBoard = (block, board, clear = false) => {
      const newBoard = JSON.parse(JSON.stringify(board))
      const rows = block.toString().split('\n')
      rows.forEach((row, y) => {
        row.split('').forEach((cell, x) => {
          if (cell === '.') return
          const drawY = block.location.y + y
          const drawX = block.location.x + x
          if (drawY < 0) return
          if (clear) return newBoard[drawY][drawX] = '.'
          if (newBoard[drawY][drawX] !== '.') throw new Error('Can nott draw here')
          newBoard[drawY][drawX] = cell
        })
      })
      return newBoard
    }
    let comparisonBoard = _.cloneDeep(this.getBoard())
    if (oldBlock) comparisonBoard = drawOnBoard(oldBlock, comparisonBoard, true)

    try {
      newBlock.drawOnBoard(comparisonBoard)
    } catch (err) {
      return false
    }
    return true
  }

  checkForClears() {
    const board = this.getBoard()
    const indexesToBeRemoved = board.map((row, idx) => {
      if (row.find(char => char === '.')) return undefined
      return idx
    }).filter(id => id !== undefined)
    this.scoreboard.clear(indexesToBeRemoved.length)
    indexesToBeRemoved.forEach(idx => {      
      board.splice(idx, 1);
      board.unshift(board[0].map(_ => '.'))
    })
    this.board = board
  }

  saveFallingBlockToBoard() {
    this.board = this.fallingBlock.drawOnBoard(this.board)
    this.fallingBlock = undefined
  }


  tick() {
    if (!this.fallingBlock) return this.checkForClears()

    const newBlock1 = this.fallingBlock.fall(this.getBoard())
    this.fallingBlock = newBlock1
    if (!this.fallingBlock.falling) this.saveFallingBlockToBoard()
  }

  hasFalling() {
    return !!this.fallingBlock
  }

  getBoard() {
    return this.fallingBlock ? this.fallingBlock.drawOnBoard(this.board) : this.board
  }

  toString(board = this.getBoard()) {

    let draw = ''

    for (const row of board) {
      for (const cell of row) {
        draw = draw + cell
      }
      draw = draw + '\n'
    }

    return draw;
  }
}
