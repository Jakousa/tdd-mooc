import _ from 'lodash'

export class Block {
  color;
  location;
  falling

  constructor(color, location = { x: 1, y: 0 }, falling = true) {
    this.color = color;
    this.location = location
    this.falling = falling
  }

  setToStartingLocation(boardWidth) {
    const startingX = (Math.floor((boardWidth / 2) - (this.width() / 2)))
    const newBlock = _.cloneDeep(this)
    newBlock.location.x = startingX
    return newBlock
  }

  fall(board) {
    const newBoard = this.drawOnBoard(board, true)
    const newBlock = _.cloneDeep(this)
    newBlock.location.y++
    try {
      newBlock.drawOnBoard(newBoard)
    } catch (err) {
      newBlock.falling = false
      newBlock.location.y--
    }
    return newBlock
  }

  moveLeft() {
    const newBlock = _.cloneDeep(this)
    newBlock.location.x--
    return newBlock
  }

  moveRight() {
    const newBlock = _.cloneDeep(this)
    newBlock.location.x++
    return newBlock
  }

  drawOnBoard(board, clear = false) {
    const newBoard = JSON.parse(JSON.stringify(board))
    const rows = this.toString().split('\n')
    rows.forEach((row, y) => {
      row.split('').forEach((cell, x) => {
        if (cell === '.') return
        const drawY = this.location.y + y
        const drawX = this.location.x + x
        if (drawY < 0) return
        if (clear) return newBoard[drawY][drawX] = '.'
        if (newBoard[drawY][drawX] !== '.') throw new Error('Can not draw here')
        newBoard[drawY][drawX] = cell
      })
    })
    return newBoard
  }

  width() {
    return this.toString().trim().split('\n')[0].length
  }
  
  height() {
    return this.toString().trim().split('\n').length
  }

  toString() {
    return this.color
  }
}
