import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { findBadge, RuckSack } from "./b.ts";

Deno.test("findBadge r", () => {
  const input = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg`.split("\n").filter((l) => l);
  const sacks: RuckSack[] = input.map((line) => new RuckSack(line));

  const result = findBadge(sacks[0], sacks[1], sacks[2]);
  assertEquals(result, "r");
});

Deno.test("findBadge Z", () => {
  const input = `
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`.split("\n").filter((l) => l);
  const sacks: RuckSack[] = input.map((line) => new RuckSack(line));

  const result = findBadge(sacks[0], sacks[1], sacks[2]);
  assertEquals(result, "Z");
});
