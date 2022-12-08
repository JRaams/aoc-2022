const lines: string = await Deno.readTextFile("./input.txt");
const input: number[][] = lines.split("\n").filter((l) => l).map((line) =>
  line.split("").map(Number)
);

function getScenicScore(
  forest: number[][],
  y: number,
  x: number,
): number {
  let scoreTop = 0;
  let scoreRight = 0;
  let scoreBottom = 0;
  let scoreLeft = 0;

  const height = forest[y][x];
  for (let j = y - 1; j >= 0; j--) {
    scoreTop++;
    if (forest[j][x] >= height) break;
  }
  for (let i = x + 1; i < forest[y].length; i++) {
    scoreRight++;
    if (forest[y][i] >= height) break;
  }
  for (let j = y + 1; j < forest.length; j++) {
    scoreBottom++;
    if (forest[j][x] >= height) break;
  }
  for (let i = x - 1; i >= 0; i--) {
    scoreLeft++;
    if (forest[y][i] >= height) break;
  }

  return scoreTop * scoreRight * scoreBottom * scoreLeft;
}

function solve(forest: number[][]): number {
  let result = 0;

  for (let y = 1; y < forest.length - 1; y++) {
    for (let x = 1; x < forest[y].length - 1; x++) {
      const score = getScenicScore(forest, y, x);
      if (score > result) {
        result = score;
      }
    }
  }

  return result;
}

console.info(solve(input));
