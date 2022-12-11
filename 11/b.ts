import { Monkey, simulateRound } from "./monkey.ts";

const lines: string = await Deno.readTextFile("./input.txt");
const input: Monkey[] = lines.split("\n\n").filter((l) => l).map((l) =>
  new Monkey(l)
);

export function solve(monkeys: Monkey[]): number {
  const totalWorryTestProduct = input.reduce(
    (prev: number, curr: Monkey) => prev * curr.testCase,
    1,
  );

  for (let i = 0; i < 10000; i++) {
    simulateRound(monkeys, (item) => item % totalWorryTestProduct);
  }

  const inspects = monkeys.map((m) => m.inspects).sort((a, b) => b - a);
  return inspects[0] * inspects[1];
}

console.info(solve(input));
