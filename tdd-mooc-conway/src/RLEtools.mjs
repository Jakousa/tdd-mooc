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

export const encode = () => {
  
}