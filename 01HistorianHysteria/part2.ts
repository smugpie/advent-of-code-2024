import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

let firstArray: number[] = []
let secondArray: number[] = []

file.on('line', (line: string) => {
  if (line !== '') {
    const [first, second] = line.split('   ')
    firstArray.push(parseInt(first, 10))
    secondArray.push(parseInt(second, 10))
  }
})

file.on('close', () => {
  const totals = firstArray
    .map((item) => {
      const testArrayLength = [...secondArray].filter(
        (testItem) => testItem === item
      ).length
      return item * testArrayLength
    })
    .reduce((acc, curr) => acc + curr, 0)
  console.log('Part 2 =', totals)
})
