// import default from modules
import { expect } from 'chai';
import { output, input, decode, encode } from '../src/RLEtools.mjs';
import { block } from './testdata.mjs'

// Write ES6 mocha tests with Chai assertions
describe('RLEtools', () => {
  it('output should output x and y', () => {
    const rle = output()
    expect( rle.includes('x')).to.equal(true);
    expect( rle.includes('y')).to.equal(true);
    expect( rle.includes(0)).to.equal(true);
    expect( rle.includes(0)).to.equal(true);
  });

  it('input should accept a block', () => {
    input(block)

    const rle = output()
    expect( rle.includes(2)).to.equal(true)
  })

  it('decode should turn block into 2 dimensional array', () => {
    const output = decode(block)
    const expectedOutput = [
      ['x', 'x'],
      ['x', 'x']
    ]

    expect(output).to.have.deep.members(expectedOutput)
  })

  it('encode should turn 2 dimensional array into a block', () => {
    const array = [
      ['x', 'x'],
      ['x', 'x']
    ]
    const output = encode(array)
    const expectedOutput = `x = 2, y = 2, rule = B3/S23
2o$2o!`

    expect(output).to.equal(expectedOutput)
  })
});
