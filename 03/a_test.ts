import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { findDuplicates, priority } from "./a.ts";

Deno.test("findDuplicates", () => {
  const input = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`.split("\n").filter((l) => l);
  const result = findDuplicates(input);

  assertEquals(result.length, 6);
  assertArrayIncludes(result, ["p", "L", "P", "v", "t", "s"]);
});

Deno.test("priority", () => {
  assertEquals(priority("a"), 1);
  assertEquals(priority("z"), 26);
  assertEquals(priority("A"), 27);
  assertEquals(priority("Z"), 52);
});
