import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

let grid: string[][] = []
let antinodes = new Set<string>()

file.on('line', (line: string) => {
  if (line !== '') {
    grid.push(line.split(''))
  }
})

file.on('close', () => {
  const testAntennaChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('')
  testAntennaChars.forEach((antennaChar) => {
    const antennae = []
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === antennaChar) {
          antennae.push({ x: j, y: i })
        }
      }
    }
    if (antennae.length > 0) {
      console.log(antennaChar, antennae)
      for (let i = 0; i < antennae.length - 1; i += 1) {
        for (let j = i + 1; j < antennae.length; j += 1) {
          const diffX = antennae[j].x - antennae[i].x
          const diffY = antennae[j].y - antennae[i].y
          let beforeX = antennae[i].x
          let beforeY = antennae[i].y
          while (true) {
            if (
              beforeX >= 0 &&
              beforeY >= 0 &&
              beforeX < grid[0].length &&
              beforeY < grid.length
            ) {
              antinodes.add(`${beforeY}|${beforeX}`)
            } else {
              break
            }
            beforeX -= diffX
            beforeY -= diffY
          }
          let afterX = antennae[j].x
          let afterY = antennae[j].y
          while (true) {
            if (
              afterX >= 0 &&
              afterY >= 0 &&
              afterX < grid[0].length &&
              afterY < grid.length
            ) {
              antinodes.add(`${afterY}|${afterX}`)
            } else {
              break
            }
            afterX += diffX
            afterY += diffY
          }
        }
      }
    }
  })
  console.log(antinodes.size)
})
