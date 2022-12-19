import { Blueprint, loadInput } from "./blueprint.ts";
import { maxGeodeCount } from "./factory.ts";
import { Inventory } from "./inventory.ts";

function solve(): number {
  const bluePrints: Blueprint[] = loadInput().slice(0, 3);

  const result = bluePrints.reduce(
    (sum: number, current: Blueprint) =>
      sum *= maxGeodeCount(current, 32, new Inventory()),
    1,
  );
  return result;
}

console.info(solve());
