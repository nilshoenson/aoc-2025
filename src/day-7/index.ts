const path = "src/day-7/input.txt"
const file = Bun.file(path)
const text = await file.text()
const lines = text.split("\n")

const STARTING_CHARACTER = 'S'
const SPLIT_CHARACTER = '^'

function parseLine(str: string) {
  const values = str.split('')

  return values
}

export function at<K>(grid: K[][], position: { x: number; y: number }) {
  return grid[position.y]?.[position.x]
}

function partOne() {
  let splits = 0
  const beams = new Set<number>();

  for (const line of lines) {
    const cols = parseLine(line)

    for (let i = 0; i < cols.length; i++) {
      const col = cols[i];

      if (col === STARTING_CHARACTER) {
        beams.add(i);
      } else if (col === SPLIT_CHARACTER && beams.has(i)) {
        beams.add(i - 1);
        beams.add(i + 1);
        beams.delete(i);

        splits += 1;
      }
    }
  }

  return splits
}

const resultOne = partOne()
console.log(`Time the beam gets split: ${resultOne}`)