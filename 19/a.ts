import { Blueprint, loadInput } from "./blueprint.ts";
import { Inventory, maxGeodeCount } from "./inventory.ts";

function solve(): number {
  const bluePrints: Blueprint[] = loadInput();
  const qualityLevelSum = bluePrints.reduce(
    (sum: number, current: Blueprint) =>
      sum + maxGeodeCount(current, 24, new Inventory()) * current.index,
    0,
  );
  return qualityLevelSum;
}

console.info(solve());
