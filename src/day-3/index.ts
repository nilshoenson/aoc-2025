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

const resultOne = partOne()

console.log(`The total output joltage is: ${resultOne}`)