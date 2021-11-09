import readline from 'readline'
import fs from 'fs'
import { decode, encode } from './RLEtools.mjs'
import GameOfLife from './GameOfLife.mjs'

export default class CLIApplication {

  iterations
  filePath
  reader
  fileContents
  output

  constructor(output = console.log) {
    this.reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    this.output = output
  }
  
  setFilePath = (filePath) => {
    this.filePath = filePath
  }

  setIterations = (iterations) => {
    this.iterations = Number(iterations)
  }

  loadFile = () => {
    this.fileContents = fs.readFileSync(this.filePath)
  }

  run = () => {
    const array = decode(this.fileContents)
    const gameOfLife = new GameOfLife(array)

    const result = encode(gameOfLife.humanPrint())
    this.output(result)
  }

  askForFilePath = () => {
    this.reader.question('What is the file path?', this.setFilePath)
  }

  askForIterations = () => {
    this.reader.question('How many iterations?', this.setIterations)
  }
}
