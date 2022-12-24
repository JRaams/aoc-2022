import { createForecast, loadValley } from "./valley.ts";

const lines: string = Deno.readTextFileSync("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

export function solve(): number {
  const [valley, blizzards] = loadValley(input);
  createForecast(blizzards, valley);

  console.info("Walk to exit...");
  const minutes1 = valley.traverse(valley.entrance, valley.exit, 0);
  console.info("walk back to entrance....");
  const minutes2 = valley.traverse(valley.exit, valley.entrance, minutes1);
  console.info("walk back to exit...");
  const minutes3 = valley.traverse(valley.entrance, valley.exit, minutes2);
  return minutes3;
}

console.info(solve());
