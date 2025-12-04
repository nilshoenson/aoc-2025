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

function getAdjacentRolls(entry: Dot, data: Dot[]) {
  const xRange = calculateRange(entry.x)
  const yRange = calculateRange(entry.y)

  const arrWithinRange = data.filter(val => xRange.includes(val.x) && yRange.includes(val.y));
  const arrWithoutValue = arrWithinRange.filter(val => val !== entry);

  let rollsOfPaper = 0

  for (const item of arrWithoutValue) {
    if (item.value === ROLL_OF_PAPER) {
      rollsOfPaper += 1
    }
  }

  return rollsOfPaper
}

const ROLL_OF_PAPER = '@'
const CUTOFF = 4

function partOne() {
  const numberOfLines = lines.length
  const dots = generateGridDots(numberOfLines)

  let accessibleRows = 0

  for (const entry of dots) {
    if (entry.value !== ROLL_OF_PAPER) continue

    const rollsOfPaper = getAdjacentRolls(entry, dots)

    if (rollsOfPaper < CUTOFF) {
      accessibleRows += 1
    }
  }

  return accessibleRows
}

const REMOVED_PAPER = 'x'

function partTwo() {
  const numberOfLines = lines.length
  let dots = generateGridDots(numberOfLines)

  let totalRemovedRolls = 0

  while (true) {
    let accessibleRows = 0
    let removedRolls = []

    for (const entry of dots) {
      if (entry.value !== ROLL_OF_PAPER) continue

      const rollsOfPaper = getAdjacentRolls(entry, dots)

      if (rollsOfPaper < CUTOFF) {
        accessibleRows += 1
        removedRolls.push(entry)
      }
    }

    totalRemovedRolls += removedRolls.length

    if (removedRolls.length === 0) {
      break
    }

    for (const removed of removedRolls) {
      const dot = dots.find(d => d.x === removed.x && d.y === removed.y)

      if (dot) {
        dot.value = REMOVED_PAPER
      }
    }
  }

  return totalRemovedRolls
}

const resultOne = partOne()
const resultTwo = partTwo()

console.log(`The total roles of paper that can be accessed are: ${resultOne}`)
console.log(`The total roles of paper that can be accessed are: ${resultTwo}`)