import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

const lines: string[] = []

file.on('line', (line: string) => {
  if (line !== '') {
    lines.push(line)
  }
})

file.on('close', () => {
  const code = lines.join('|')
  const matches = code.matchAll(
    /(do\(\))|(don\'t\(\))|(mul\(([0-9]+),([0-9]+)\))/g
  )

  let total = 0
  let enabled = true
  for (const match of matches) {
    if (match[0] === 'do()') {
      enabled = true
    } else if (match[0] === "don't()") {
      enabled = false
    } else if (enabled) {
      total += parseInt(match[4], 10) * parseInt(match[5], 10)
    }
  }

  console.log('Part 2 =', total)
})
