import { Monkey, simulateRound } from "./monkey.ts";

const lines: string = await Deno.readTextFile("./input.txt");
const input: Monkey[] = lines.split("\n\n").filter((l) => l).map((l) =>
  new Monkey(l)
);

export function solve(monkeys: Monkey[]): number {
  for (let i = 0; i < 20; i++) {
    simulateRound(monkeys);
  }

  const inspects = monkeys.map((m) => m.inspects).sort((a, b) => b - a);
  return inspects[0] * inspects[1];
}

console.info(solve(input));
