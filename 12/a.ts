import { AStar } from "../helpers/astar.ts";
import { LoadHeightMap } from "./heightmap.ts";

const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

export function solve(i: string[]): number {
  const { currentPos, targetPos } = LoadHeightMap(i);
  const path = AStar(currentPos, targetPos);
  return path.length - 1;
}

console.info(solve(input));
