import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

let sum = 0

const testValue = (finalValue: number, values: number[]) => {
  const [first, ...rest] = values
  if (rest.length === 0) {
    return finalValue === first
  }
  const [valueToCombine, ...otherValues] = rest
  if (testValue(finalValue, [first + valueToCombine, ...otherValues])) {
    return true
  }
  if (testValue(finalValue, [first * valueToCombine, ...otherValues])) {
    return true
  }
  if (
    testValue(finalValue, [
      parseInt(`${first}${valueToCombine}`, 10),
      ...otherValues
    ])
  ) {
    return true
  }
  return false
}

file.on('line', (line: string) => {
  if (line !== '') {
    const [totalString, valuesString] = line.split(': ')
    const total = parseInt(totalString, 10)
    const values = valuesString.split(' ').map((value) => parseInt(value, 10))
    if (testValue(total, values)) {
      sum += total
    }
  }
})

file.on('close', () => {
  console.log('Part 2 =', sum)
})
