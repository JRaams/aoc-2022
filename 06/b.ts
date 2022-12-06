const lines: string = await Deno.readTextFile("./input.txt");
const input: string = lines.split("\n").filter((l) => l)[0];

export function solve(line: string): number {
  const chars = line.split("");

  for (let i = 13; i < chars.length; i++) {
    const window = chars.slice(i - 13, i + 1);
    const set = new Set(window);
    if (set.size === 14) {
      return i + 1;
    }
  }

  return -1;
}

console.info(solve(input));
