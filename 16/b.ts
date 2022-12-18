import { Volcano } from "./volcano.ts";

function solve(): number {
  const volcano = new Volcano(26, true);
  const result = volcano.findMaxPressure();
  return result;
}

console.info(solve());
