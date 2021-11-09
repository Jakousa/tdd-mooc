let state = `x = 0, y = 0`

export const output = () => {
  return state
}

export const input = (RLE) => {
  state = RLE
}

export const decode = (RLE) => {
  const rows = RLE.split('\n')
  const meaningfulRows = rows.filter(row => row[0] !== "#")
//  const headerLine = meaningfulRows[0]
  meaningfulRows.shift()
  const joinedString = meaningfulRows.join()

  const array = []
  joinedString.split('$').forEach((row, yIndex) => {
    if (!array[yIndex]) array[yIndex] = []
    let lastNumber = undefined
    row.split('').forEach(char => {
      if (!isNaN(Number(char))) {
        if (lastNumber) { 
          lastNumber += char
        } else {
          lastNumber = char
        }
      } else {
        let number
        if (lastNumber) {
          number = Number(lastNumber)
          lastNumber = undefined
        } else {
          number = 1
        }
        for (let index = 0; index < number; index++) {
          if (char === 'b') array[yIndex].push('.')
          if (char === 'o') array[yIndex].push('x')
        }
      }
    })
  })

  return array
}

export const encode = (array) => {
  const y = array.length
  const x = array[0].length
  const headerLine = `x = ${x}, y = ${y}, rule = B3/S23`
  let string = ``
  array.forEach((row, idx) => {
    let identicalCount = 0
    let previousCharacter = row[0]
    row.forEach(character => {
      identicalCount++
      if (previousCharacter === character) return;
      string += identicalCount
      string += previousCharacter
      identicalCount = 0;
      previousCharacter = character
    })
    string += identicalCount
    string += previousCharacter
    string += (idx === array.length - 1) ? '!' : '$'
  })

  return headerLine + '\n' + string.replaceAll('x', 'o').replaceAll('.', 'b')
}