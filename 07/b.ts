import { Dir, getSize, loadDirs } from "./dir.ts";

const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

export function solve(i: string[]): number {
  const dirs = loadDirs(i);

  // Calculate sizes per directory
  const dirSizes: Record<number, Dir> = {};
  const totalSize = getSize(dirs[0]);
  dirs.forEach((dir) => {
    const size = getSize(dir);
    dirSizes[size] = dir;
  });

  // Calculate amount of space that is still needed
  const CURRENT_SPACE = 70_000_000 - totalSize;
  const SPACE_TO_REMOVE = 30_000_000 - CURRENT_SPACE;

  // Calculate smallest possible size
  let smallestSize = Number.MAX_VALUE;
  Object.entries(dirSizes).forEach(([size, dir]) => {
    const numSize = Number(size);
    if (numSize < SPACE_TO_REMOVE) return;

    if (numSize < smallestSize) {
      smallestSize = numSize;
    }
  });

  return smallestSize;
}

console.info(solve(input));
