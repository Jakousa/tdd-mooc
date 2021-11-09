export const findAllXs = (inputArray) => {
  const listOfLocations = []
  inputArray.forEach((row, y) => {
    row.forEach((char, x) => {
      if (char === 'x') listOfLocations.push([x, y])
    })
  })
  return listOfLocations
}

export const findAllNeighborsOfAnX = (inputLocation) => {
  const [x, y] = inputLocation
  const surroundingLocations = [
    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
    [x - 1, y],                 [x + 1, y],
    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]
  ]

  return surroundingLocations
}

export const findAllLocationsNeighboringAnX = (inputArray) => {
  const xs = findAllXs(inputArray)
  const map = {}
  xs.forEach(xLocation => {
    map[xLocation] = findAllNeighborsOfAnX(xLocation)
  })

  return map
}

export const findAllNeighboringLocationsOfAnArrayOfLocations = (locationArray) => {
  const map = {}
  locationArray.forEach(location => {
    map[location] = findAllNeighborsOfAnX(location)
  })
  return map
}

export const makePrettyArrayFromListOfXLocations = (locationArray) => {
  const outputArray = []
  let smallestX = 0
  let smallestY = 0
  let largestX = 0
  let largestY = 0

  locationArray.forEach(location => {
    const [x, y] = location
    smallestX = Math.min(x, smallestX ?? x)
    smallestY = Math.min(y, smallestY ?? y)
  })

  locationArray.forEach(location => {
    const [initialX, initialY] = location
    const x = initialX + - 1 * smallestX
    const y = initialY + - 1 * smallestY
    largestX = Math.max(x + 1, largestX)
    largestY = Math.max(y + 1, largestY)
    if (!outputArray[y]) outputArray[y] = []
    outputArray[y][x] = 'x'
  })

  for (let i = 0; i < largestY; i++) {
    for (let j = 0; j < largestX; j++) {
      if (!outputArray[i]) outputArray[i] = []
      if (outputArray[i][j] !== 'x') outputArray[i][j] = '.'
    }    
  }
  return outputArray
}