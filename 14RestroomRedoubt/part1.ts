import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

let getDirections = false
let grid: string[][] = []
let directions: string[] = []

file.on('line', (line: string) => {
  if (line !== '') {
   if (!getDirections) {
      let arrRow = line.split('')
      grid.push(arrRow)
    } else {
      directions = [...directions, ...line.split(',')]
    }
  } else {
    getDirections = true
  }
})

file.on('close', () => {
  console.log('Part 1 =', grid, directions)
})
