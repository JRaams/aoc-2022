const lines: string = await Deno.readTextFile("./input.txt");
const input: number[] = lines
  .split("\n\n")
  .map((s) => s.split("\n").map(Number).reduce((a, b) => a + b, 0));

function solve(input: number[]): number {
  input.sort((a, b) => a > b ? -1 : 1);
  return input[0] + input[1] + input[2];
}

console.info(solve(input));
