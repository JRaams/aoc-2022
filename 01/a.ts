import { loadElves } from "./elf.ts";

const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n");

function solve(lines: string[]): number {
  const elves = loadElves(lines);
  elves.sort((a, b) => a > b ? -1 : 1);
  return elves[0];
}

const result = solve(input);
console.info(result);
