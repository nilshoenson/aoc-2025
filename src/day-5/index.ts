const path = "src/day-5/input.txt"
const file = Bun.file(path)
const text = await file.text()
const lines = text.split("\n")

function splitArrays(lines: string[]) {
  const splitIndex = lines.findIndex(val => val === "")
  const ranges = lines.slice(0, splitIndex)
  const availableIds = lines.slice(splitIndex + 1, lines.length)

  return { ranges, availableIds }
}

function rangesToArray(ranges: string[]) {
  let allRanges = []

  for (const range of ranges) {
    const parsed = generateRangeArr(range)

    allRanges.push(parsed)
  }

  return allRanges
}

function generateRangeArr(range: string) {
  const items = range.split('-')
  const start = Number(items[0])
  const end = Number(items[1])

  return [start, end]
}

function convertToNumbers(ids: string[]) {
  const convertToNums = ids.map(Number)

  return convertToNums
}

function checkIfBetweenValues(start: number, end: number, value: number) {
  if (value === start || value === end) {
    return value
  } else if (value > start && value < end) {
    return value
  }
}

function checkAvailability(ranges: number[][], ids: number[]) {
  let num = []

  for (let i = 0; i < ids.length; i++) {
    const selectedId = ids[i]

    for (const range of ranges) {
      const start = range[0]
      const end = range[1]
      const inRange = checkIfBetweenValues(start, end, selectedId)

      if (inRange) num.push(inRange)
    }
  }

  const uniqueValues = new Set(num)

  return uniqueValues.size
}

function partOne() {
  const { ranges, availableIds } = splitArrays(lines)

  const rangeArr = rangesToArray(ranges)
  const availableArr = convertToNumbers(availableIds)
  const availableItems = checkAvailability(rangeArr, availableArr)

  return availableItems
}

const resultOne = partOne()

console.log(`The total fresh available ingredient IDs are: ${resultOne}`)