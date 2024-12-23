import * as fs from 'fs'
import * as readline from 'readline'

var file = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

type FileFormat = {
  id: number
  blocks: number
}

let disk: FileFormat[] = []

file.on('line', (line: string) => {
  if (line !== '') {
    const layout: string[] = line.split('')
    let isFile = true
    let fileID = 0
    disk = layout
      .map((cur: string) => {
        if (!isFile) {
          isFile = !isFile
          return { id: -1, blocks: +cur }
        } else {
          isFile = !isFile
          return { id: fileID++, blocks: +cur }
        }
      })
      .filter((file: FileFormat) => file.blocks !== 0)
  }
})

file.on('close', () => {
  while (true) {
    const firstSpace = disk.findIndex((file) => file.id === -1)
    if (firstSpace === -1) {
      break
    }

    const numBlocksToFill = disk[firstSpace].blocks
    if (numBlocksToFill < disk[disk.length - 1].blocks) {
      disk[disk.length - 1].blocks -= numBlocksToFill
      disk[firstSpace].id = disk[disk.length - 1].id
    } else if (numBlocksToFill === disk[disk.length - 1].blocks) {
      disk[firstSpace].id = disk[disk.length - 1].id
      disk.pop()
    } else {
      disk[firstSpace] = {
        id: disk[disk.length - 1].id,
        blocks: disk[disk.length - 1].blocks
      }
      disk.splice(firstSpace + 1, 0, {
        id: -1,
        blocks: numBlocksToFill - disk[disk.length - 1].blocks
      })
      disk.pop()
    }
  }

  let sum = 0
  let count = 0
  disk.forEach((file, index) => {
    for (let i = count; i < count + file.blocks; i++) {
      sum += file.id * i
    }
    count += file.blocks
  })
  console.log('Part 1 =', sum)
})
