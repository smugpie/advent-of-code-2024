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
  const matches = code.matchAll(/mul\(([0-9]+),([0-9]+)\)/g)

  let total = 0
  for (const match of matches) {
    total += parseInt(match[1], 10) * parseInt(match[2], 10)
  }

  console.log('Part 1 =', total)
})
