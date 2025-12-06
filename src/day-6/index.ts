
const path = "src/day-6/input.txt"
const file = Bun.file(path)
const text = await file.text()
const lines = text.split("\n")

type Row = string[][]

function parseLines(lines: string[]): Row {
  const parsedArr: Row = []

  for (const line of lines) {
    const splitArr = line.split(' ')
    const filterEmpty = splitArr.filter(val => val !== '')
    parsedArr.push(filterEmpty)
  }

  return parsedArr
}

function partOne() {
  const parsedArr = parseLines(lines)
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

    let result = 0
    switch (operation) {
      case '+':
        result = nums.reduce((prev, cur) => prev + cur, 0)
        break
      case '*':
        result = nums.reduce((prev, cur) => prev * cur, 1)
        break
    }

    sum += result
  }

  return sum
}

const resultOne = partOne()

console.log(`The total value is: ${resultOne}`)