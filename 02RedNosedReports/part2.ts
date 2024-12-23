import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

let sum = 0

const isSafe = (values: number[]) => {
  const differences = values
    .map((value, index) => {
      if (index === 0) {
        return 0
      }
      return value - values[index - 1]
    })
    .splice(1)

  const ascending = differences.every((value) => value >= 1 && value <= 3)
  const descending = differences.every((value) => value <= -1 && value >= -3)
  return ascending || descending
}

file.on('line', (line: string) => {
  if (line !== '') {
    const values = line.split(' ').map((value) => parseInt(value, 10))

    let safeFound = false

    for (let i = 0; i < values.length; i++) {
      const copy = [...values]
      copy.splice(i, 1)
      if (isSafe(copy)) {
        safeFound = true
        break
      }
    }
    if (safeFound) {
      sum += 1
    }
  }
})

file.on('close', () => {
  console.log('Part 2 =', sum)
})
