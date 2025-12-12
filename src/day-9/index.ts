const path = "src/day-9/input.txt"
const file = Bun.file(path)
const text = await file.text()
const lines = text.split("\n")

interface Tile {
  x: number
  y: number
}

function parseLine(str: string) {
  const values = str.split(',')
  const numbers = values.map(Number);

  return numbers
}

function calculateAxisDistance(start: number, end: number) {
  const highest = start > end ? start : end
  const lowest = end < start ? end : start

  const total = highest - lowest + 1

  return total
}

function partOne() {
  let count = 0
  let tiles = []

  for (const line of lines) {
    const [x, y] = parseLine(line)

    const newDot: Tile = { x, y }
    tiles.push(newDot)
  }

  for (let tile = 0; tile < tiles.length; tile++) {
    const item = tiles[tile]

    for (let i = 0; i < tiles.length; i++) {
      const second = tiles[i]

      if (tile === i) continue

      const distanceX = calculateAxisDistance(item.x, second.x)
      const distanceY = calculateAxisDistance(item.y, second.y)

      const total = distanceX * distanceY

      if (total > count) {
        count = total
      }
    }
  }

  return count
}

const resultOne = partOne()
console.log(`The largest area is: ${resultOne}`)