export class Monkey {
  index: number;
  items: number[];
  operation: "multiplication" | "addition";
  operand: string;
  testCase: number;
  testTrue: number;
  testFalse: number;
  inspects = 0;

  constructor(i: string) {
    const lines = i.split("\n").filter((l) => l);
    lines.reverse();

    const index = lines.pop()!.split(" ")[1];
    const startingItems = lines.pop()!.split(": ")[1];
    const operation = lines.pop()!.split("new = old ")[1].split(" ");
    const test = lines.pop()!.split("by ")[1];
    const testTrue = lines.pop()!.split("monkey ")[1];
    const testFalse = lines.pop()!.split("monkey ")[1];

    this.index = Number(index.replace(":", ""));
    this.items = startingItems.split(", ").map(Number);
    this.operation = operation[0] === "*" ? "multiplication" : "addition";
    this.operand = operation[1];
    this.testCase = Number(test);
    this.testTrue = Number(testTrue);
    this.testFalse = Number(testFalse);
  }
}

export function simulateRound(
  monkeys: Monkey[],
  manageWorry: (_: number) => number,
): void {
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
      item = manageWorry(item);

      const monkeyIndex = item % monkey.testCase === 0
        ? monkey.testTrue
        : monkey.testFalse;
      monkey.items.splice(itemIndex, 1);
      monkeys[monkeyIndex].items.push(item);
    }
  });
}
