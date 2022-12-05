const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

function solve(lines: string[]): number {
  let count = 0;

  lines.forEach((line) => {
    const [elfA, elfB] = line.split(",");
    const [a1, a2] = elfA.split("-").map(Number);
    const [b1, b2] = elfB.split("-").map(Number);

    if (a2 >= b1 && b2 >= a1) {
      count++;
    }
  });

  return count;
}

console.info(solve(input));
