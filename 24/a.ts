import { createForecast, loadValley } from "./valley.ts";

const lines: string = Deno.readTextFileSync("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

export function solve(): number {
  const [valley, blizzards] = loadValley(input);
  createForecast(blizzards, valley);

  const minutes = valley.traverse(valley.entrance, valley.exit, 0);
  return minutes;
}

console.info(solve());
