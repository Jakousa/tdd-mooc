import { expect } from 'chai';
import CLIApplication from '../src/CLIApplication.mjs';
import readline from 'readline'
import sinon from 'sinon';
import fs from 'fs';
import { block, blinker } from './testdata.mjs'

describe('CLIApplication', () => {
  let mock
  let application
  let output
  beforeEach(() => {
    mock = sinon.mock()
    sinon.stub(readline, 'createInterface').returns({ question: mock })
    output = sinon.stub()
    application = new CLIApplication(output)
  })
  afterEach(() => {
    sinon.restore()
  })

  it('should ask for a file path', () => {
    application.askForFilePath()

    expect(mock.calledOnce).to.be.true
  });

  it('should ask for number of iterations', () => {
    application.askForIterations()

    expect(mock.calledOnce).to.be.true
  });

  it('should be able to set filepath', () => {
    const filePath = './testfile.js'
    application.setFilePath(filePath)
    expect(application.filePath).to.equal(filePath)
  })

  it('should be able to set iterations', () => {
    const iterations = 5
    application.setIterations(`${iterations}`)
    expect(application.iterations).to.equal(iterations)
  })


  it('should load a file', () => {
    const contents = 'Test Contents'
    const filePath = './testfile.rlo'
    const stub = sinon.stub(fs, 'readFileSync').returns('Test Contents')
    application.setFilePath(filePath)
    application.loadFile()

    expect(stub.calledWith(filePath)).to.be.true
    expect(application.fileContents).to.equal(contents)
  });

  it('should output resulting pattern after executing a number of iterations on block', () => {
    application.fileContents = block

    application.iterations = 6

    application.run()
    expect(output.calledWith('x = 2, y = 2, rule = B3/S23\n2o$2o!')).to.be.true
  });

  it('should output resulting pattern after executing a number of iterations on blinker', () => {
    application.fileContents = blinker

    application.iterations = 2

    application.run()
    expect(output.calledWith('x = 3, y = 1, rule = B3/S23\n3o!')).to.be.true
  });

});
