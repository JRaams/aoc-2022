const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

export class RuckSack {
  public allItems: string[];
  public itemsA: string[];
  public itemsB: string[];
  public duplicateItem!: string;
  public badge!: string;

  constructor(items: string) {
    this.allItems = items.split("");
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

export function findBadge(a: RuckSack, b: RuckSack, c: RuckSack): string {
  for (let i = 0; i < a.allItems.length; i++) {
    for (let j = 0; j < b.allItems.length; j++) {
      for (let k = 0; k < c.allItems.length; k++) {
        if (a.allItems[i] === b.allItems[j]) {
          if (b.allItems[j] === c.allItems[k]) {
            return a.allItems[i];
          }
        }
      }
    }
  }

  throw new Error("no badge found");
}

export function getBadges(lines: string[]): string[] {
  const sacks: RuckSack[] = lines.map((line) => new RuckSack(line));
  const badges: string[] = [];

  for (let i = 0; i < sacks.length - 2; i += 3) {
    const [sack0, sack1, sack2] = sacks.slice(i, i + 3);
    const badge = findBadge(sack0, sack1, sack2);
    badges.push(badge);
  }

  return badges;
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
  return getBadges(lines).map(priority).reduce((a, b) => a + b, 0);
}

console.info(solve(input));
