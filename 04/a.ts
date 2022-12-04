const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

function solve(lines: string[]): number {
  let count = 0;

  lines.forEach((line) => {
    const [elfA, elfB] = line.split(",");
    const [a1, a2] = elfA.split("-").map(Number);
    const [b1, b2] = elfB.split("-").map(Number);

    if (
      a1 <= b1 && a2 >= b2 ||
      b1 <= a1 && b2 >= a2
    ) {
      count++;
    }
  });

  return count;
}

console.info(solve(input));
