const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

function hasOverlap(a1: number, a2: number, b1: number, b2: number): boolean {
  for (let i = a1; i <= a2; i++) {
    for (let j = b1; j <= b2; j++) {
      if (i === j) {
        return true;
      }
    }
  }

  return false;
}

function solve(lines: string[]): number {
  let count = 0;

  lines.forEach((line) => {
    const [elfA, elfB] = line.split(",");
    const [a1, a2] = elfA.split("-").map(Number);
    const [b1, b2] = elfB.split("-").map(Number);

    if (hasOverlap(a1, a2, b1, b2)) {
      count++;
    }
  });

  return count;
}

console.info(solve(input));
