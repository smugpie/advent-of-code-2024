import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

let getDirections = false
let grid: string[][] = []
let directions: string[] = []
let robotPosition = { x: 0, y: 0 }

file.on('line', (line: string) => {
  if (line !== '') {
   if (!getDirections) {
      let arrRow = line.split('')
      grid.push(arrRow)
      if (line.includes('@')) {
        robotPosition = { x: line.indexOf('@'), y: grid.length - 1 }
      }
    } else {
      directions = [...directions, ...line.split('')]
    }
  } else {
    getDirections = true
  }
})

file.on('close', () => {
  directions.forEach((direction) => {
    let nextY: number = robotPosition.y
    let nextX: number = robotPosition.x
    if (direction === '^') {
      while (true) {
        nextY -= 1
        if (grid[nextY][robotPosition.x] === '#') {
          break
        } else if (grid[nextY][robotPosition.x] === '.') {
          for (let i = nextY; i < robotPosition.y; i++) {
            grid[i][robotPosition.x] = grid[i + 1][robotPosition.x]
            grid[i + 1][robotPosition.x] = '.'
          }
          robotPosition.y -= 1
          break
        }
      }
    } else if (direction === 'v') {
      while (true) {
        nextY += 1
        if (grid[nextY][robotPosition.x] === '#') {
          break
        } else if (grid[nextY][robotPosition.x] === '.') {
          for (let i = nextY; i > robotPosition.y; i--) {
            grid[i][robotPosition.x] = grid[i - 1][robotPosition.x]
            grid[i - 1][robotPosition.x] = '.'
          }
          robotPosition.y += 1
          break
        }
      }
    } else if (direction === '<') {
      while (true) {
        nextX -= 1
        if (grid[robotPosition.y][nextX] === '#') {
          break
        } else if (grid[robotPosition.y][nextX] === '.') {
          for (let i = nextX; i < robotPosition.x; i++) {
            grid[robotPosition.y][i] = grid[robotPosition.y][i + 1]
            grid[robotPosition.y][i + 1] = '.'
          }
          robotPosition.x -= 1
          break
        }
      }
    } else if (direction === '>') {
      while (true) {
        nextX += 1
        if (grid[robotPosition.y][nextX] === '#') {
          break
        } else if (grid[robotPosition.y][nextX] === '.') {
          for (let i = nextX; i > robotPosition.x; i--) {
            grid[robotPosition.y][i] = grid[robotPosition.y][i - 1]
            grid[robotPosition.y][i - 1] = '.'
          }
          robotPosition.x += 1
          break
        }
      }
    }
  })

  let sum = 0;
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell === 'O') {
        sum += 100 * rowIndex + cellIndex
      }
    })
  })

  grid.forEach((row) => {
    console.log(row.join(''))
  })
  console.log('Part 1 =', sum)
})
