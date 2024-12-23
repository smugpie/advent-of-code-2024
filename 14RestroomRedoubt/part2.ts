import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

let GRID_X = 101
let GRID_Y = 103

type Robot = {
  positionX: number
  positionY: number
  velocityX: number
  velocityY: number
}

let robots: Robot[] = []

file.on('line', (line: string) => {
  if (line !== '') {
    const data = line.match(/p=(.+),(.+) v=(.+),(.+)/)
    if (data !== null) {
      const [, positionX, positionY, velocityX, velocityY] = data
      robots.push({
        positionX: +positionX,
        positionY: +positionY,

        velocityX: +velocityX,
        velocityY: +velocityY
      })
    }
  }
})

const positionsAfterSeconds = (robots: Robot[], seconds: number): Robot[] => {
  return robots.map((robot) => {
    let positionY = (robot.positionY + robot.velocityY * seconds) % GRID_Y
    while (positionY < 0) {
      positionY += GRID_Y
    }
    let positionX = (robot.positionX + robot.velocityX * seconds) % GRID_X
    while (positionX < 0) {
      positionX += GRID_X
    }
    return {
      ...robot,
      positionX,
      positionY
    }
  })
}

const keypress = async () => {
  process.stdin.setRawMode(true)
  return new Promise<void>((resolve) =>
    process.stdin.once('data', () => {
      process.stdin.setRawMode(false)
      resolve()
    })
  )
}

const displayGrid = (robots: Robot[], seconds: number) => {
  let grid = Array.from({ length: GRID_Y }, () => Array(GRID_X).fill('.'))
  robots.forEach((robot) => {
    grid[robot.positionY][robot.positionX] = '#'
  })

  const gridText = grid.map((row) => row.join('')).join('\n')
  if (gridText.indexOf('########') !== -1) {
    console.log(grid.map((row) => row.join('')).join('\n'))
    console.log('Seconds:', seconds)
  }
}

file.on('close', async () => {
  let seconds = 0
  let robotPositions = robots
  while (true) {
    robotPositions = positionsAfterSeconds(robotPositions, 1)
    seconds += 1

    displayGrid(robotPositions, seconds)
    //await keypress()
  }
})
