import { findAllXs, findAllNeighboringLocationsOfAnArrayOfLocations, makePrettyArrayFromListOfXLocations } from './twoDimensionalArrayHelpers.mjs'

export default class GameOfLife {

  state;

  constructor (startingState) {
    this.state = findAllXs(startingState)
  }

  tick = () => {
    const map = findAllNeighboringLocationsOfAnArrayOfLocations(this.state)
    const newLocations = Object.values(map).flat(1).reduce((acc, val) => ({...acc, [val]: (acc[val] ?? 0) + 1}), {})

    const newXs = []

    Object.keys(newLocations).forEach(loc => {
      if (newLocations[loc] === 1) return;
      const [x, y] = loc.split(',')
      const location = [Number(x), Number(y)]
      if (newLocations[loc] === 2 && map[loc]) newXs.push(location)
      if (newLocations[loc] === 3) newXs.push(location) 
    })
    this.state = newXs
  }

  humanPrint = () => {
    return makePrettyArrayFromListOfXLocations(this.state)
  }
}
