const path = "src/day-6/input.txt"
const file = Bun.file(path)
const text = await file.text()
const lines = text.split("\n")

type Row = string[][]

function parseLines(lines: string[], splitChar: string): Row {
  const parsedArr: Row = []

  for (const line of lines) {
    const splitArr = line.split(splitChar)
    const filterEmpty = splitArr.filter(val => val !== '')
    parsedArr.push(filterEmpty)
  }

  return parsedArr
}

function calculateValue(nums: number[], operation: string) {
  let result = 0

  switch (operation) {
    case '+':
      result = nums.reduce((prev, cur) => prev + cur, 0)
      break
    case '*':
      result = nums.reduce((prev, cur) => prev * cur, 1)
      break
  }

  return result
}

function partOne() {
  const parsedArr = parseLines(lines, ' ')
  const operations = parsedArr[parsedArr.length - 1]
  const numbers = parsedArr
    .slice(0, -1)
    .map((row) => row.map(val => Number(val)))

  let sum = 0

  for (let col = 0; col < numbers[0].length; col++) {
    const nums: number[] = []
    const operation = operations[col]

    for (let row = 0; row < numbers.length; row++) {
      nums.push(numbers[row][col])
    }

    const result = calculateValue(nums, operation)

    sum += result
  }

  return sum
}

function partTwo() {
  const parsedArr = parseLines(lines, '')
  const parsedArrFull = parseLines(lines, ' ')
  const operations = parsedArrFull[parsedArr.length - 1]
  const numbers = parsedArr
    .slice(0, -1)
    .map((row) => row.map(val => Number(val)))

  let sum = 0
  let combinedNums = []

  for (let col = 0; col < numbers[0].length; col++) {
    const nums = []
    const finalNums = []

    for (let row = 0; row < numbers.length; row++) {
      nums.push(numbers[row][col])
    }

    const removedZeros = nums.filter(num => num !== 0)
    let combinedValue = ''

    for (const num of removedZeros) {
      const toString = num.toString()
      combinedValue += toString
    }

    finalNums.push(Number(combinedValue))
    combinedNums.push(...finalNums)
  }

  const nestedArrays: number[][] = []
  let currentGroup = []

  for (let i = 0; i < combinedNums.length; i++) {
    const currentValue = combinedNums[i]

    if (currentValue === 0) {
      nestedArrays.push(currentGroup)
      currentGroup = []
    } else {
      currentGroup.push(currentValue)
    }

    // Final element has no final '0', so we push it manually
    if (i === combinedNums.length - 1) {
      nestedArrays.push(currentGroup)
    }
  }

  for (let col = 0; col < nestedArrays.length; col++) {
    const nums = nestedArrays[col]
    const operation = operations[col]

    const result = calculateValue(nums, operation)

    sum += result
  }

  return sum
}

const resultOne = partOne()
const resultTwo = partTwo()

console.log(`The total value is: ${resultOne}`)
console.log(`The total value is: ${resultTwo}`)