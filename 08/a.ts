const lines: string = await Deno.readTextFile("./input.txt");
const input: number[][] = lines.split("\n").filter((l) => l).map((line) =>
  line.split("").map(Number)
);

export function solve(forest: number[][]): number {
  // Outer edge
  let result = 4 * (forest.length - 1);

  // Inner trees
  for (let y = 1; y < forest.length - 1; y++) {
    const row = forest[y];

    for (let x = 1; x < row.length - 1; x++) {
      const col = forest.map((r) => r[x]);
      const top = col.slice(0, y);
      const right = row.slice(x + 1);
      const bottom = col.slice(y + 1);
      const left = row.slice(0, x);

      const height = row[x];
      if (top.every((t) => t < height)) {
        result++;
      } else if (right.every((t) => t < height)) {
        result++;
      } else if (bottom.every((t) => t < height)) {
        result++;
      } else if (left.every((t) => t < height)) {
        result++;
      }
    }
  }

  return result;
}

console.info(solve(input));
