const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

export function findDuplicates(lines: string[]): string[] {
  return lines.map((line) => {
    const itemsA = line.slice(0, line.length / 2).split("");
    const itemsB = line.slice(line.length / 2, line.length).split("");
    const duplicateItems = itemsA.filter((x) => itemsB.includes(x));
    return duplicateItems[0];
  });
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
