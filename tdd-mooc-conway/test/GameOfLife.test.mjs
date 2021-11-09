import { expect } from 'chai';
import GameOfLife from '../src/GameOfLife.mjs';

describe('GameOfLife', () => {
  it('should be able to accept and human print a 2 dimensional array', () => {
    const block = [['x', 'x'], ['x', 'x']]

    const game = new GameOfLife(block)

    expect(game.humanPrint()).to.have.deep.members(block)
  });

  it('should be able to accept and human print a 2 dimensional array', () => {
    const blinkerInitial = [['x', 'x', 'x']]

    const game = new GameOfLife(blinkerInitial)

    expect(game.humanPrint()).to.have.deep.members(blinkerInitial)
  });

  it('should have tick that forwards the state', () => {
    const initialState = [['x']]
    const nextState = []

    const game = new GameOfLife(initialState)

    game.tick()

    expect(game.humanPrint()).to.have.deep.members(nextState)
  });

  it('should have tick that forwards the state', () => {
    const blinkerInitial = [['.', '.', '.'], ['x', 'x', 'x']]
    const blinkerNext = [['.', 'x'], ['.', 'x'], ['.', 'x']]

    const game = new GameOfLife(blinkerInitial)

    game.tick()

    expect(game.humanPrint()).to.have.deep.members(blinkerNext)
  });
  
  it('should be able to draw when over the border', () => {
    const blinkerInitial = [['x', 'x', 'x']]
    const blinkerNext = [['.', 'x'], ['.', 'x'], ['.', 'x']]

    const game = new GameOfLife(blinkerInitial)

    game.tick()

    expect(game.humanPrint()).to.have.deep.members(blinkerNext)
  });

});
