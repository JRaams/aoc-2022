const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

export class RuckSack {
  public itemsA: string[];
  public itemsB: string[];
  public duplicateItem!: string;

  constructor(items: string) {
    // const compartmentA = items.slice(0, items.length / 2).split("");
    // this.itemsA = compartmentA.filter((c) => c === c.toLowerCase());
    // const compartmentB = items.slice(items.length / 2, items.length).split("");
    // this.itemsB = compartmentB.filter((c) => c === c.toLowerCase());

    this.itemsA = items.slice(0, items.length / 2).split("");
    this.itemsB = items.slice(items.length / 2, items.length).split("");

    this.itemsA.forEach((item) => {
      if (this.itemsB.includes(item)) {
        this.duplicateItem = item;
        return;
      }
    });
  }
}

export function findDuplicates(lines: string[]): string[] {
  return lines.map((line) => new RuckSack(line)).map((r) => r.duplicateItem);
}

export function priority(item: string): number {
  const charCode = item.charCodeAt(0);

  if (charCode > 90) {
    return charCode - 96;
  } else {
    return charCode - 38;
  }
}

function solve(lines: string[]): number {
  return findDuplicates(lines).map(priority).reduce((a, b) => a + b, 0);
}

console.info(solve(input));
