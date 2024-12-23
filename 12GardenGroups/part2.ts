import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

type RegionData = {
  id: number
  name: string
  coords: Set<string>
}

let grid: string[][] = []
let priceSum = 0
let regions: RegionData[] = []

file.on('line', (line: string) => {
  if (line !== '') {
    let arrRow = line.split('')
    grid.push(arrRow)
  }
})

const walkAroundRegion = (
  y: number,
  x: number,
  test: string,
  coords: Set<string>
): void => {
  if (grid[y][x] !== test || coords.has(`${y},${x}`)) {
    return
  }

  coords.add(`${y},${x}`)

  if (y > 0) {
    walkAroundRegion(y - 1, x, test, coords)
  }
  if (y < grid.length - 1) {
    walkAroundRegion(y + 1, x, test, coords)
  }
  if (x > 0) {
    walkAroundRegion(y, x - 1, test, coords)
  }
  if (x < grid[0].length - 1) {
    walkAroundRegion(y, x + 1, test, coords)
  }
}

const addOuterCorners = (
  y: number,
  x: number,
  regionCoords: Set<string>
): number => {
  let corners = ''
  if ((y > 0 && !regionCoords.has(`${y - 1},${x}`)) || y === 0) {
    corners += 'u'
  }
  if ((x > 0 && !regionCoords.has(`${y},${x - 1}`)) || x === 0) {
    corners += 'l'
  }
  if (
    (y < grid.length - 1 && !regionCoords.has(`${y + 1},${x}`)) ||
    y === grid.length - 1
  ) {
    corners += 'd'
  }
  if (
    (x < grid[0].length - 1 && !regionCoords.has(`${y},${x + 1}`)) ||
    x === grid[0].length - 1
  ) {
    corners += 'r'
  }

  let totalCorners = 0

  if (corners.length === 2) {
    if (
      corners === 'ul' ||
      corners === 'ld' ||
      corners === 'dr' ||
      corners === 'ur'
    ) {
      totalCorners += 1
    }
  }
  if (corners.length === 3) {
    totalCorners += 2
  }
  if (corners.length === 4) {
    totalCorners += 4
  }

  return totalCorners
}

const addInnerCorners = (
  y: number,
  x: number,
  regionCoords: Set<string>
): number => {
  let totalCorners = 0

  if (y > 0 && x > 0) {
    if (
      regionCoords.has(`${y - 1},${x}`) &&
      regionCoords.has(`${y},${x - 1}`) &&
      !regionCoords.has(`${y - 1},${x - 1}`)
    ) {
      totalCorners += 1
    }
  }

  if (y > 0 && x < grid[0].length - 1) {
    if (
      regionCoords.has(`${y - 1},${x}`) &&
      regionCoords.has(`${y},${x + 1}`) &&
      !regionCoords.has(`${y - 1},${x + 1}`)
    ) {
      totalCorners += 1
    }
  }

  if (y < grid.length - 1 && x > 0) {
    if (
      regionCoords.has(`${y + 1},${x}`) &&
      regionCoords.has(`${y},${x - 1}`) &&
      !regionCoords.has(`${y + 1},${x - 1}`)
    ) {
      totalCorners += 1
    }
  }

  if (y < grid.length - 1 && x < grid[0].length - 1) {
    if (
      regionCoords.has(`${y + 1},${x}`) &&
      regionCoords.has(`${y},${x + 1}`) &&
      !regionCoords.has(`${y + 1},${x + 1}`)
    ) {
      totalCorners += 1
    }
  }
  return totalCorners
}

file.on('close', () => {
  let id = 0
  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[0].length; x += 1) {
      if (
        !regions.find(
          (region) =>
            region.name === grid[y][x] && region.coords.has(`${y},${x}`)
        )
      ) {
        let regionData: RegionData = {
          id,
          name: grid[y][x],
          coords: new Set<string>()
        }
        walkAroundRegion(y, x, grid[y][x], regionData.coords)
        regions.push(regionData)
        id += 1
      }
    }
  }

  regions.forEach((region) => {
    let regionCount = 0
    let regionPrice = 0
    region.coords.forEach((coord) => {
      let [y, x] = coord.split(',').map(Number)

      regionCount += 1
      regionPrice += addOuterCorners(y, x, region.coords)
    })
    region.coords.forEach((coord) => {
      let [y, x] = coord.split(',').map(Number)
      regionPrice += addInnerCorners(y, x, region.coords)
    })

    priceSum += regionPrice * regionCount
  })

  console.log('Part 2 =', priceSum)
})
