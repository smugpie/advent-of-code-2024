import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

const grid: string[][] = []
type Direction = 'u' | 'd' | 'l' | 'r'
const nextDirection: Record<Direction, Direction> = {
  u: 'r',
  r: 'd',
  d: 'l',
  l: 'u'
}
const firstLocation: { x: number; y: number } = { x: -1, y: -1 }

file.on('line', (line: string) => {
  if (line !== '') {
    grid.push(line.split(''))
    if (line.includes('^')) {
      firstLocation.x = line.indexOf('^')
      firstLocation.y = grid.length - 1
    }
  }
})

const testPathIsFinite = (grid: string[][]) => {
  const walkCount = new Set()
  const directionChanges = new Set()
  let currentDirection: Direction = 'u'
  let currentLocation: { x: number; y: number } = {
    x: firstLocation.x,
    y: firstLocation.y
  }
  let nextLocation: { x: number; y: number } = {
    x: currentLocation.x,
    y: currentLocation.y
  }
  walkCount.add(`${firstLocation.y}|${firstLocation.x}`)

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
      if (
        directionChanges.has(
          `${currentLocation.y}|${currentLocation.x}|${currentDirection}`
        )
      ) {
        return new Set()
      } else {
        //console.log('adding')
        directionChanges.add(
          `${currentLocation.y}|${currentLocation.x}|${currentDirection}`
        )
      }
    } else {
      currentLocation.x = nextLocation.x
      currentLocation.y = nextLocation.y
      walkCount.add(`${currentLocation.y}|${currentLocation.x}`)
    }
  }
  return walkCount
}

file.on('close', () => {
  let loopedWalkCount = 0
  const initialWalk = testPathIsFinite(grid)
  Array.from(initialWalk).forEach((item) => {
    if (typeof item !== 'string') {
      return
    }
    const newGrid = grid.map((row) => [...row])
    const [y, x] = item.split('|').map((item) => parseInt(item, 10))
    newGrid[y][x] = '#'
    const currentWalk = testPathIsFinite(newGrid)
    //console.log(currentWalk)
    if (currentWalk.size === 0) {
      loopedWalkCount += 1
    }
  })
  console.log('Part 2 =', loopedWalkCount)
})
