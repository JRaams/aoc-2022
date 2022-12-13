import { GeneratePairs, Pair } from "../helpers/pairs.ts";
import { compare, TRUE, Val } from "./compare.ts";

const lines: string = await Deno.readTextFile("./input.txt");
const input: Val[] = lines.split("\n").filter((l) => l).map((l) =>
  JSON.parse(l)
);

function solve(packets: Val[]): number {
  const packetPairs: Pair<Val>[] = GeneratePairs<Val>(packets);

  let indexSum = 0;
  packetPairs.forEach(({ left, right }, index) => {
    if (compare(left, right) === TRUE) {
      indexSum += index + 1;
    }
  });

  return indexSum;
}

console.info(solve(input));
