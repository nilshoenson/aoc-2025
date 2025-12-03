const path = "src/day-1/input.txt"
const file = Bun.file(path)
const text = await file.text()
const lines = text.split("\n")

const MAX_VALUE = 100
const START_VALUE = 50

function relativeValue(value: number, max: number) {
  return ((value % max) + max) % max
}

function parseLine(line: string) {
  const direction = line[0]
  const value = Number(line.slice(1))

  return { direction, value }
}

function partOne() {
  let currentValue = START_VALUE
  let count = 0

  for (const item of lines) {
    const { direction, value } = parseLine(item)

    if (direction === "L") {
      currentValue -= value
    } else {
      currentValue += value
    }

    const newValue = relativeValue(currentValue, MAX_VALUE)

    if (newValue === 0) {
      count += 1
    }
  }

  return count
}

function partTwo() {
  let currentValue = START_VALUE
  let count = 0

  for (const item of lines) {
    const { direction, value } = parseLine(item)

    for (let i = 0; i < value; i++) {
      if (direction === "L") {
        currentValue -= 1
      } else {
        currentValue += 1
      }

      const wrappedValue = relativeValue(currentValue, MAX_VALUE)

      if (wrappedValue === 0 || wrappedValue === 100) {
        count += 1
      }
    }
  }

  return count
}

const resultOne = partOne()
const resultTwo = partTwo()

console.log(`The amount of times it hit zero in the first part is: ${resultOne}`)
console.log(`The amount of times it hit zero in the second part is: ${resultTwo}`)