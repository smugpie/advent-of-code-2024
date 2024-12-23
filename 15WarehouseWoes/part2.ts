import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./sampleInput.txt')
})

let getDirections = false
let grid: string[][] = []
let directions: string[] = []
let robotPosition = { x: 0, y: 0 }

file.on('line', (line: string) => {
  if (line !== '') {
   if (!getDirections) {
      let arrRow = line.split('')
      grid.push(arrRow.reduce<string[]>((acc, cur) => {
        if (cur === '#') {
          return [...acc, '##']
        } else if (cur === '.') {
          return [...acc, '..']
        } else if (cur === '@') {
          return [...acc, '@.']
        } else if (cur === 'O') {
          return [...acc, '[]']
        }
        return [...acc, '..']
      }, [] as string[]))
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

const anyPositionContainsCharacter = (y: number, positions: number[], character: string): boolean => {
  for (let i = 0; i < positions.length; i++) {
    if (grid[y][positions[i]] === character) {
      return true
    }
  return false
}

const allPositionsContainCharacter = (y: number, positions: number[], character: string): boolean => {
  for (let i = 0; i < positions.length; i++) {
    if (grid[y][positions[i]] !== character) {
      return false
    }
  return true
}

const nextItemsToMove = (positions: number[], firstLine: string[], nextLine: string[]): number[] => {
  for ()
}

file.on('close', () => {
  directions.forEach((direction) => {
    let nextY: number = robotPosition.y
    let nextX: number = robotPosition.x
    let movements: number[][] = []
    if (direction === '^') {
      while (true) {
        nextY -= 1
        if (anyPositionContainsCharacter(nextY, movements[movements.length - 1], '#')) {
          break
        } else if (allPositionsContainCharacter(nextY, movements[movements.length - 1], '.')) {
          for (let i = nextY; i < robotPosition.y; i++) {
            grid[i][robotPosition.x] = grid[i + 1][robotPosition.x]
            grid[i + 1][robotPosition.x] = '.'
          }
          robotPosition.y -= 1
          break
        } else {
          movements.push(nextItemsToMove(movements[movements.length - 1], grid[nextY + 1], grid[nextY]))
        }
      }
    } else if (direction === 'v') {
      movements.push([robotPosition.x])
      while (true) {
        nextY += 1
        if (anyPositionContainsCharacter(nextY, movements[movements.length - 1], '#')) {
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
      if (cell === '[') {
        sum += 100 * rowIndex + cellIndex
      }
    })
  }) 

  grid.forEach((row) => {
    console.log(row.join(''))
  })
  console.log('Part 2 =', sum)
})
