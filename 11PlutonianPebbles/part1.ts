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

file.on('close', () => {
  let sum = 0
  stones.forEach((stone, index) => {
    let changedStone: number[] = [stone]
    for (let i = 1; i <= 25; i += 1) {
      changedStone = changeStones(changedStone)
    }
    sum += changedStone.length
  })

  console.log('Part 1 =', sum)
})
