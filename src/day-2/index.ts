const path = "src/day-2/input.txt"
const file = Bun.file(path)
const text = await file.text();
const ranges = text.split(",")

function parseRange(range: string) {
  const items = range.split('-')
  const start = Number(items[0])
  const end = Number(items[1])

  return { start, end }
}

function parseNumber(num: number) {
  const str = num.toString()
  const digits = str.length
  const middle = digits / 2

  const start = str.slice(0, middle)
  const end = str.slice(middle, digits)

  if (start === end) {
    return num
  }

  return 0
}

function partOne() {
  let count = 0

  for (const range in ranges) {
    const selectedRange = ranges[range]

    const { start, end } = parseRange(selectedRange)

    for (let i = start; i <= end; i++) {
      const uniqueValue = parseNumber(i)

      count += uniqueValue
    }
  }

  return count
}
const resultOne = partOne()

console.log(`Adding all IDs up turns into: ${resultOne}`)