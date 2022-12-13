import { compare, Val } from "./compare.ts";

const lines: string = await Deno.readTextFile("./input.txt");
const input: Val[] = lines.split("\n").filter((l) => l).map((l) =>
  JSON.parse(l)
);

function solve(i: Val[]): number {
  i.push([[[2]]]);
  i.push([[[6]]]);
  i.sort(compare);

  const a = 1 +
    i.findIndex((x) => JSON.stringify(x) === JSON.stringify([[[2]]]));
  const b = 1 +
    i.findIndex((x) => JSON.stringify(x) === JSON.stringify([[[6]]]));

  return a * b;
}

console.info(solve(input));
