const path = "src/day-4/input.txt"
const file = Bun.file(path)
const text = await file.text()
const lines = text.split("\n")

interface Dot {
  x: number
  y: number
  value: string
}

function parseLine(str: string) {
  const values = str.split('')

  return values
}

function calculateRange(num: number) {
  const start = num - 1
  const end = num + 1

  return [start, num, end]
}

function generateGridDots(lineAmount: number) {
  let dots: Dot[] = []

  for (let row = 0; row < lineAmount; row++) {
    const element = lines[row]
    const cols = parseLine(element)
    const numberOfCols = cols.length

    for (let col = 0; col < numberOfCols; col++) {
      const value = element[col]
      const newDot: Dot = {
        x: col + 1,
        y: row + 1,
        value
      }

      dots.push(newDot)
    }
  }

  return dots
}

const ROLL_OF_PAPER = '@'
const CUTOFF = 4

function partOne() {
  const numberOfLines = lines.length
  const dots = generateGridDots(numberOfLines)

  let accessibleRows = 0

  for (const entry of dots) {
    if (entry.value !== ROLL_OF_PAPER) continue

    const xRange = calculateRange(entry.x)
    const yRange = calculateRange(entry.y)

    const arrWithinRange = dots.filter(val => xRange.includes(val.x) && yRange.includes(val.y));
    const arrWithoutValue = arrWithinRange.filter(val => val !== entry);

    let rollsOfPaper = 0

    for (const item of arrWithoutValue) {
      if (item.value === ROLL_OF_PAPER) {
        rollsOfPaper += 1
      }
    }

    if (rollsOfPaper < CUTOFF) {
      accessibleRows += 1
    }
  }

  return accessibleRows
}

const resultOne = partOne()

console.log(`The total roles of paper that can be accessed are: ${resultOne}`)