const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

export function findBadge(a: string[], b: string[], c: string[]): string {
  const AB = a.filter((x) => b.includes(x));
  const BC = AB.filter((x) => c.includes(x));
  return BC[0];
}

export function getBadges(lines: string[]): string[] {
  const badges: string[] = [];

  for (let i = 0; i < lines.length - 2; i += 3) {
    const [sack0, sack1, sack2] = lines.slice(i, i + 3).map((l) => l.split(""));
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
