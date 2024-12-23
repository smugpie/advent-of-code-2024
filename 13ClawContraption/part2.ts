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
      contraption.prizeX = +prizeX + 10000000000000
      contraption.prizeY = +prizeY + 10000000000000
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
  console.time('Part 2')
  contraptions.forEach((contraption) => {
    const { buttonAX, buttonAY, buttonBX, buttonBY, prizeX, prizeY } =
      contraption

    const A =
      (buttonBX * prizeY - buttonBY * prizeX) /
      (buttonBX * buttonAY - buttonBY * buttonAX)
    const B =
      (buttonAX * prizeY - buttonAY * prizeX) /
      (buttonAX * buttonBY - buttonAY * buttonBX)

    console.timeLog('Part 2')
    if (Math.floor(A) === A && Math.floor(B) === B) {
      console.log('minTokensRequired', A * 3 + B)
      sum += A * 3 + B
      return
    }
  })
  console.timeEnd('Part 2')
  console.log('Part 2 =', sum)
})
