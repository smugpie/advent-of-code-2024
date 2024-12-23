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
  firstArray = firstArray.sort((a, b) => a - b)
  secondArray = secondArray.sort((a, b) => a - b)
  const totals = firstArray
    .map((item, index) => Math.abs(item - secondArray[index]))
    .reduce((acc, curr) => acc + curr, 0)
  console.log('Part 1 =', totals)
})
