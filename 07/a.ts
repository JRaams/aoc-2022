import { getSize, loadDirs } from "./dir.ts";

const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

export function solve(i: string[]): number {
  const dirs = loadDirs(i);

  let sum = 0;
  dirs.forEach((dir) => {
    const size = getSize(dir);
    if (size <= 100_000) {
      sum += size;
    }
  });

  return sum;
}

console.info(solve(input));
