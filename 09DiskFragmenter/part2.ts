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
let maxFileID = 0

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
    maxFileID = disk[disk.length - 1].id
  }
})

file.on('close', () => {
  for (let i = maxFileID; i > 0; i -= 1) {
    const fileToMove = disk.findIndex((file) => file.id === i)
    const blocksToFill = disk[fileToMove].blocks

    const firstSpace = disk.findIndex(
      (file) => file.id === -1 && file.blocks >= blocksToFill
    )
    if (firstSpace !== -1 && fileToMove > firstSpace) {
      const spaceFound = disk[firstSpace].blocks
      disk[fileToMove].id = -1
      if (disk[firstSpace].blocks === blocksToFill) {
        disk[firstSpace].id = i
      } else {
        disk[firstSpace].id = i
        disk[firstSpace].blocks = blocksToFill
        disk.splice(firstSpace + 1, 0, {
          id: -1,
          blocks: spaceFound - blocksToFill
        })
      }
    }
  }

  let sum = 0
  let count = 0
  disk.forEach((file) => {
    if (file.id !== -1) {
      for (let i = count; i < count + file.blocks; i++) {
        sum += file.id * i
      }
    }
    count += file.blocks
  })
  console.log('Part 2 =', sum)
})
