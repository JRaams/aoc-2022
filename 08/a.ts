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
      const col = forest.map((row) => row[x]);
      const left = row.slice(0, x);
      const right = row.slice(x + 1);
      const top = col.slice(0, y);
      const bottom = col.slice(y + 1);

      const height = row[x];
      if (left.every((tree) => tree < height)) {
        result++;
      } else if (right.every((tree) => tree < height)) {
        result++;
      } else if (top.every((tree) => tree < height)) {
        result++;
      } else if (bottom.every((tree) => tree < height)) {
        result++;
      }
    }
  }

  return result;
}

console.info(solve(input));
