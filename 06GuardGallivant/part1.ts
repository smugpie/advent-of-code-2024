import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

const grid: string[][] = []
const walkCount = new Set()
type Direction = 'u' | 'd' | 'l' | 'r'
const nextDirection: Record<Direction, Direction> = {
  u: 'r',
  r: 'd',
  d: 'l',
  l: 'u'
}
let currentDirection: Direction = 'u'
const currentLocation: { x: number; y: number } = { x: -1, y: -1 }

file.on('line', (line: string) => {
  if (line !== '') {
    grid.push(line.split(''))
    if (line.includes('^')) {
      walkCount.add(`${grid.length - 1}|${line.indexOf('^')}`)
      currentLocation.x = line.indexOf('^')
      currentLocation.y = grid.length - 1
    }
  }
})

file.on('close', () => {
  let nextLocation: { x: number; y: number } = currentLocation

  while (true) {
    if (currentDirection === 'u') {
      nextLocation = { x: currentLocation.x, y: currentLocation.y - 1 }
    } else if (currentDirection === 'r') {
      nextLocation = { x: currentLocation.x + 1, y: currentLocation.y }
    } else if (currentDirection === 'd') {
      nextLocation = { x: currentLocation.x, y: currentLocation.y + 1 }
    } else if (currentDirection === 'l') {
      nextLocation = { x: currentLocation.x - 1, y: currentLocation.y }
    }

    if (
      nextLocation.x < 0 ||
      nextLocation.y < 0 ||
      nextLocation.x >= grid[0].length ||
      nextLocation.y >= grid.length
    ) {
      break
    }

    if (grid[nextLocation.y][nextLocation.x] === '#') {
      currentDirection = nextDirection[currentDirection]
    } else {
      currentLocation.x = nextLocation.x
      currentLocation.y = nextLocation.y
      walkCount.add(`${currentLocation.y}|${currentLocation.x}`)
    }
  }
  console.log('Part 1 =', walkCount.size)
})
