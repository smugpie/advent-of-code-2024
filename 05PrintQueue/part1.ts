import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

const rules: Record<string, number>[] = []
const manuals: number[][] = []

file.on('line', (line: string) => {
  if (line.includes('|')) {
    const [before, after] = line.split('|')
    rules.push({ before: parseInt(before, 10), after: parseInt(after, 10) })
  } else if (line.includes(',')) {
    manuals.push(line.split(',').map((item) => parseInt(item, 10)))
  }
})

file.on('close', () => {
  let validManuals = 0
  let sum = 0
  for (let i = 0; i < manuals.length; i++) {
    let isManualValid = true
    for (let j = 0; j < manuals[i].length - 1; j++) {
      const test = manuals[i][j]
      const allBefores = [...manuals[i]].slice(0, j)
      const allAfters = [...manuals[i]].slice(j + 1)

      allBefores.forEach((item) => {
        if (
          rules.filter((rule) => rule.before === test && rule.after === item)
            .length > 0
        ) {
          isManualValid = false
        }
      })

      allAfters.forEach((item) => {
        if (
          rules.filter((rule) => rule.after === test && rule.before === item)
            .length > 0
        ) {
          isManualValid = false
        }
      })
    }

    if (isManualValid) {
      validManuals += 1
      const middleNumber = manuals[i][(manuals[i].length - 1) / 2]
      sum += middleNumber
    }
  }
  console.log('Part 1 =', sum)
})
