const lines: string = await Deno.readTextFile("./input.txt");
const input: number[][] = lines.split("\n").filter((l) => l).map((line) =>
  line.split("").map(Number)
);

function getScenicScore(
  y: number,
  x: number,
  row: number[],
  col: number[],
): number {
  let scoreTop = 0;
  let scoreRight = 0;
  let scoreBottom = 0;
  let scoreLeft = 0;

  const height = row[x];
  for (let j = y - 1; j >= 0; j--) {
    scoreTop++;
    if (col[j] >= height) break;
  }
  for (let i = x + 1; i < row.length; i++) {
    scoreRight++;
    if (row[i] >= height) break;
  }
  for (let j = y + 1; j < col.length; j++) {
    scoreBottom++;
    if (col[j] >= height) break;
  }
  for (let i = x - 1; i >= 0; i--) {
    scoreLeft++;
    if (row[i] >= height) break;
  }

  return scoreTop * scoreRight * scoreBottom * scoreLeft;
}

function solve(forest: number[][]): number {
  let result = 0;

  for (let y = 1; y < forest.length - 1; y++) {
    const row = forest[y];

    for (let x = 1; x < row.length - 1; x++) {
      const col = forest.map((r) => r[x]);

      const score = getScenicScore(y, x, row, col);
      if (score > result) {
        result = score;
      }
    }
  }

  return result;
}

console.info(solve(input));
