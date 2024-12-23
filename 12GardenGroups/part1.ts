import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./sampleInput.txt')
})

type RegionData = {
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

const calculatePrice = (y: number, x: number, region: string): number => {
  let price = 0
  if ((y > 0 && grid[y - 1][x] !== region) || y === 0) {
    price += 1
  }
  if (
    (y < grid.length - 1 && grid[y + 1][x] !== region) ||
    y === grid.length - 1
  ) {
    price += 1
  }
  if ((x > 0 && grid[y][x - 1] !== region) || x === 0) {
    price += 1
  }
  if (
    (x < grid[0].length - 1 && grid[y][x + 1] !== region) ||
    x === grid[0].length - 1
  ) {
    price += 1
  }
  return price
}

file.on('close', () => {
  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[0].length; x += 1) {
      if (
        !regions.find(
          (region) =>
            region.name === grid[y][x] && region.coords.has(`${y},${x}`)
        )
      ) {
        let regionData: RegionData = {
          name: grid[y][x],
          coords: new Set<string>()
        }
        walkAroundRegion(y, x, grid[y][x], regionData.coords)
        regions.push(regionData)
      }
    }
  }

  regions.forEach((region) => {
    let regionCount = 0
    let regionPrice = 0
    region.coords.forEach((coord) => {
      let [y, x] = coord.split(',').map(Number)
      regionCount += 1
      regionPrice += calculatePrice(y, x, region.name)
    })
    priceSum += regionPrice * regionCount
  })

  console.log('Part 1 =', priceSum)
})
