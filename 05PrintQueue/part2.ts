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
  const invalidManuals: number[][] = []

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

    if (!isManualValid) {
      invalidManuals.push(manuals[i])
    }
  }

  const sortedManuals = invalidManuals.map((manual) => {
    return manual.sort((bef, aft) => {
      if (
        rules.filter((rule) => rule.before === bef && rule.after === aft)
          .length > 0
      ) {
        return 1
      } else if (
        rules.filter((rule) => rule.before === aft && rule.after === bef)
          .length > 0
      ) {
        return -1
      }
      return 0
    })
  })

  const sum = sortedManuals.reduce((acc, cur) => {
    return acc + cur[(cur.length - 1) / 2]
  }, 0)

  console.log('Part 2 =', sum)
})
