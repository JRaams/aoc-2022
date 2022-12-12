import { AStar } from "../helpers/astar.ts";
import { LoadHeightMap } from "./heightmap.ts";

const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

export function solve(i: string[]): number {
  const { heights, targetPos } = LoadHeightMap(i);

  let minSteps = Number.MAX_VALUE;

  heights.forEach((row) => {
    row.forEach((pos) => {
      if (pos.char !== "a") return;
      heights.forEach((r2) => {
        r2.forEach((pos2) => {
          pos2.f = 0;
          pos2.g = 0;
          pos2.h = 0;
          pos2.parent = undefined;
        });
      });

      const path = AStar(pos, targetPos);
      if (0 < path.length && path.length < minSteps) {
        minSteps = path.length;
      }
    });
  });

  return minSteps - 1;
}

console.info(solve(input));
