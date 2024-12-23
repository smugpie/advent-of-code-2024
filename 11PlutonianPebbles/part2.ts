import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

let stones: number[] = []

file.on('line', (line: string) => {
  if (line !== '') {
    stones = [...stones, ...line.split(' ').map((num) => parseInt(num, 10))]
  }
})

const after25: Record<number, number[]> = {}
const after50: Record<number, number> = {}

const changeStones = (stones: number[]): number[] => {
  const newStones: number[] = []

  stones.forEach((stone, index) => {
    const stoneStr = `${stone}`
    if (stone === 0) {
      newStones.push(1)
    } else if (stoneStr.length % 2 === 0) {
      newStones.push(parseInt(stoneStr.substring(0, stoneStr.length / 2), 10))
      newStones.push(parseInt(stoneStr.substring(stoneStr.length / 2), 10))
    } else {
      newStones.push(stone * 2024)
    }
  })

  return newStones
}

const performIterations = (stone: number, iterations: number): number[] => {
  let changedStone: number[] = [stone]
  if (after25[stone]) {
    changedStone = after25[stone]
  } else {
    for (let i = 1; i <= iterations; i += 1) {
      changedStone = changeStones(changedStone)
    }
    after25[stone] = changedStone
  }

  return changedStone
}

let ct = 0
const ITERATIONS = 25

file.on('close', () => {
  let sum = 0
  stones.forEach((stone) => {
    let changedStoneIteration1 = performIterations(stone, ITERATIONS)

    changedStoneIteration1.forEach((stone2) => {
      if (after50[stone2]) {
        sum += after50[stone2]
        return
      }

      let thisAfter50: number = 0
      let changedStoneIteration2 = performIterations(stone2, ITERATIONS)

      changedStoneIteration2.forEach((stone3) => {
        let changedStoneIteration3 = performIterations(stone3, ITERATIONS)
        sum += changedStoneIteration3.length
        thisAfter50 += changedStoneIteration3.length
      })
      after50[stone2] = thisAfter50
    })
  })

  console.log('Part 2 =', sum)
})
