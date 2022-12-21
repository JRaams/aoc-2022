export abstract class Monkey {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public abstract calculate(): number;
}

export class NumberMonkey extends Monkey {
  private value: number;

  constructor(name: string, value: number) {
    super(name);
    this.value = value;
  }

  public calculate(): number {
    return this.value;
  }
}

export class OperationMonkey extends Monkey {
  public monkeyA!: Monkey;
  public monkeyB!: Monkey;
  private operation: string;

  constructor(name: string, operation: string) {
    super(name);
    this.operation = operation;
  }

  public calculate(): number {
    switch (this.operation) {
      case "*":
        return this.monkeyA.calculate() * this.monkeyB.calculate();
      case "/":
        return this.monkeyA.calculate() / this.monkeyB.calculate();
      case "+":
        return this.monkeyA.calculate() + this.monkeyB.calculate();
      case "-":
        return this.monkeyA.calculate() - this.monkeyB.calculate();
      default:
        throw new Error(`Invalid operation: ${this.operation}`);
    }
  }
}

export function loadMonkeys(): Record<string, Monkey> {
  const line: string = Deno.readTextFileSync("./input.txt");
  const input: string[] = line.split("\n").filter((l) => l);
  const monkeys: Record<string, Monkey> = {};

  input.forEach((line) => {
    const [name, job] = line.split(": ");
    const jobNumber = Number(job);

    if (isNaN(jobNumber)) {
      const operation = job.split(" ")[1];
      monkeys[name] = new OperationMonkey(name, operation);
    } else {
      monkeys[name] = new NumberMonkey(name, jobNumber);
    }
  });

  input.forEach((line) => {
    const [name, job] = line.split(": ");
    const jobNumber = Number(job);
    if (!isNaN(jobNumber)) return;

    const [monkeyAName, _, monkeyBName] = job.split(" ");
    const monkey = monkeys[name] as OperationMonkey;
    monkey.monkeyA = monkeys[monkeyAName];
    monkey.monkeyB = monkeys[monkeyBName];
  });

  return monkeys;
}
