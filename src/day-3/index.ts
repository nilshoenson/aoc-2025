const path = "src/day-3/input.txt"
const file = Bun.file(path)
const text = await file.text()
const lines = text.split("\n")

function parseLine(str: string) {
  const values = str.split('')
  const numbers = values.map(Number);

  return numbers
}

function getLargestValues(arr: number[], startIndex: number, endIndex: number) {
  let largestValue = 0
  let finalIndex = 0

  for (let index = startIndex; index < endIndex; index++) {
    const value = arr[index]

    if (value > largestValue) {
      largestValue = value
      finalIndex = index
    }
  }

  return { value: largestValue, index: finalIndex }
}

function partOne() {
  let count = 0

  for (const line of lines) {
    const values = parseLine(line)

    const { value: firstValue, index: firstIndex } = getLargestValues(values, 0, values.length - 1)
    const { value: secondValue } = getLargestValues(values, firstIndex + 1, values.length)

    const combined = [firstValue, secondValue]
    const sum = Number(combined.join(""));

    count += sum
  }

  return count
}

function partTwo() {
  const REQUIRED_CHARACTERS = 12
  let count = 0

  for (const line of lines) {
    const values = parseLine(line)

    let elements = []
    let startIndex = 0

    for (let index = 0; index < REQUIRED_CHARACTERS; index++) {
      let removed = REQUIRED_CHARACTERS - (index + 1)
      const { value, index: updatedIndex } = getLargestValues(values, startIndex, values.length - removed)
      startIndex = (updatedIndex + 1)

      elements.push(value)
    }

    const sum = Number(elements.join(""));

    count += sum
  }

  return count
}

const resultOne = partOne()
const resultTwo = partTwo()

console.log(`The total output joltage is: ${resultOne}`)
console.log(`The total output joltage is: ${resultTwo}`)