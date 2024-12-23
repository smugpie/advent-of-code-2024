import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

type Contraption = {
  buttonAX: number
  buttonAY: number
  buttonBX: number
  buttonBY: number
  prizeX: number
  prizeY: number
}

let contraptions: Contraption[] = []

let contraption: Contraption = {
  buttonAX: 0,
  buttonAY: 0,
  buttonBX: 0,
  buttonBY: 0,
  prizeX: 0,
  prizeY: 0
}

let sum = 0

file.on('line', (line: string) => {
  if (line !== '') {
    const matchA = line.match(/Button A: X\+(.+), Y\+(.+)/)
    if (matchA !== null) {
      const [, buttonAX, buttonAY] = matchA
      contraption.buttonAX = +buttonAX
      contraption.buttonAY = +buttonAY
    }
    const matchB = line.match(/Button B: X\+(.+), Y\+(.+)/)
    if (matchB !== null) {
      const [, buttonBX, buttonBY] = matchB
      contraption.buttonBX = +buttonBX
      contraption.buttonBY = +buttonBY
    }
    const matchPrize = line.match(/Prize: X=(.+), Y=(.+)/)
    if (matchPrize !== null) {
      const [, prizeX, prizeY] = matchPrize
      contraption.prizeX = +prizeX
      contraption.prizeY = +prizeY
    }
  } else {
    contraptions.push(contraption)
    contraption = {
      buttonAX: 0,
      buttonAY: 0,
      buttonBX: 0,
      buttonBY: 0,
      prizeX: 0,
      prizeY: 0
    }
  }
})

file.on('close', () => {
  contraptions.push(contraption)

  contraptions.forEach((contraption) => {
    let minTokensRequired = 1000000
    for (let i = 0; i <= 100; i++) {
      for (let j = 0; j <= 100; j++) {
        if (
          contraption.buttonAX * i + contraption.buttonBX * j ===
            contraption.prizeX &&
          contraption.buttonAY * i + contraption.buttonBY * j ===
            contraption.prizeY
        ) {
          minTokensRequired = Math.min(minTokensRequired, 3 * i + j)
        }
      }
    }
    if (minTokensRequired < 1000000) {
      sum += minTokensRequired
    }
  })
  console.log('Part 1 =', sum)
})
