import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

let grid: number[][] = []

file.on('line', (line: string) => {
  if (line !== '') {
    grid.push(line.split('').map((item) => +item))
  }
})

const walk = (
  y: number,
  x: number,
  test: number,
  trailheadsList: Set<string>
): void => {
  if (test === 9) {
    if (grid[y][x] === 9) {
      trailheadsList.add(`${y},${x}`)
    }
    return
  }

  if (grid[y][x] !== test) {
    return
  }

  const next = test + 1
  if (y > 0) {
    walk(y - 1, x, next, trailheadsList)
  }
  if (y < grid.length - 1) {
    walk(y + 1, x, next, trailheadsList)
  }
  if (x > 0) {
    walk(y, x - 1, next, trailheadsList)
  }
  if (x < grid[0].length - 1) {
    walk(y, x + 1, next, trailheadsList)
  }
}

file.on('close', () => {
  let trailheads = 0
  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[0].length; x += 1) {
      if (grid[y][x] === 0) {
        let trailheadsList = new Set<string>()
        walk(y, x, 0, trailheadsList)
        trailheads += trailheadsList.size
      }
    }
  }

  console.log('Part 1 =', trailheads)
})
