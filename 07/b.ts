import { getSize, loadDirs } from "./dir.ts";

const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

export function solve(i: string[]): number {
  const dirs = loadDirs(i);
  const dirSizes = dirs.map(getSize);

  const CURRENT_SPACE = 70_000_000 - getSize(dirs[0]);
  const SPACE_TO_REMOVE = 30_000_000 - CURRENT_SPACE;

  let smallestSize = Number.MAX_VALUE;
  dirSizes.filter((ds) => ds >= SPACE_TO_REMOVE).forEach((size) => {
    if (size < smallestSize) {
      smallestSize = size;
    }
  });

  return smallestSize;
}

console.info(solve(input));
