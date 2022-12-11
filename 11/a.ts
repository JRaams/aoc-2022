import { Monkey } from "./monkey.ts";

const lines: string = await Deno.readTextFile("./input.txt");
const input: Monkey[] = lines.split("\n\n").filter((l) => l).map((l) =>
  new Monkey(l)
);

export function simulateRound(monkeys: Monkey[]): void {
  monkeys.forEach((monkey) => {
    for (let itemIndex = monkey.items.length - 1; itemIndex >= 0; itemIndex--) {
      monkey.inspects++;
      let item = monkey.items[itemIndex];

      const operand = monkey.operand === "old" ? item : Number(monkey.operand);
      if (monkey.operation === "multiplication") {
        item *= operand;
      } else {
        item += operand;
      }
      item = Math.floor(item / 3);

      const monkeyIndex = item % monkey.testCase === 0
        ? monkey.testTrue
        : monkey.testFalse;
      monkey.items.splice(itemIndex, 1);
      monkeys[monkeyIndex].items.push(item);
    }
  });
}

export function solve(monkeys: Monkey[]): number {
  for (let i = 0; i < 20; i++) {
    simulateRound(monkeys);
  }

  const inspects = monkeys.map((m) => m.inspects).sort((a, b) => b - a);
  return inspects[0] * inspects[1];
}

console.info(solve(input));
