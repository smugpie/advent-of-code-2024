import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

let sum = 0

file.on('line', (line: string) => {
  if (line !== '') {
    const values = line.split(' ').map((value) => parseInt(value, 10))
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
    if (ascending || descending) {
      sum += 1
    }
  }
})

file.on('close', () => {
  console.log('Part 1 =', sum)
})
