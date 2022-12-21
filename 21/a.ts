import { loadMonkeys } from "./monkey.ts";

function solve(): number {
  const monkeys = loadMonkeys();
  const rootMonkey = monkeys["root"];
  const rootNumber = rootMonkey.calculate();
  return rootNumber;
}

console.info(solve());
