import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

const grid: string[][] = []

file.on('line', (line: string) => {
  if (line !== '') {
    grid.push(`...${line}...`.split(''))
  }
})

file.on('close', () => {
  const emptyRow = Array(grid[0].length).fill('.')
  grid.unshift(emptyRow)
  grid.unshift(emptyRow)
  grid.unshift(emptyRow)
  grid.push(emptyRow)
  grid.push(emptyRow)
  grid.push(emptyRow)

  let count = 0
  for (let i = 3; i <= grid.length - 3; i++) {
    for (let j = 3; j <= grid[i].length - 3; j++) {
      if (grid[i][j] === 'X') {
        if (
          grid[i][j + 1] === 'M' &&
          grid[i][j + 2] === 'A' &&
          grid[i][j + 3] === 'S'
        ) {
          count += 1
        }
        if (
          grid[i][j - 1] === 'M' &&
          grid[i][j - 2] === 'A' &&
          grid[i][j - 3] === 'S'
        ) {
          count += 1
        }
        if (
          grid[i + 1][j] === 'M' &&
          grid[i + 2][j] === 'A' &&
          grid[i + 3][j] === 'S'
        ) {
          count += 1
        }
        if (
          grid[i - 1][j] === 'M' &&
          grid[i - 2][j] === 'A' &&
          grid[i - 3][j] === 'S'
        ) {
          count += 1
        }
        if (
          grid[i + 1][j + 1] === 'M' &&
          grid[i + 2][j + 2] === 'A' &&
          grid[i + 3][j + 3] === 'S'
        ) {
          count += 1
        }
        if (
          grid[i - 1][j + 1] === 'M' &&
          grid[i - 2][j + 2] === 'A' &&
          grid[i - 3][j + 3] === 'S'
        ) {
          count += 1
        }
        if (
          grid[i + 1][j - 1] === 'M' &&
          grid[i + 2][j - 2] === 'A' &&
          grid[i + 3][j - 3] === 'S'
        ) {
          count += 1
        }
        if (
          grid[i - 1][j - 1] === 'M' &&
          grid[i - 2][j - 2] === 'A' &&
          grid[i - 3][j - 3] === 'S'
        ) {
          count += 1
        }
      }
    }
  }
  console.log('Part 1 =', count)
})
