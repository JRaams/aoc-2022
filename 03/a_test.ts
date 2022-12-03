import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { findDuplicates, priority, RuckSack } from "./a.ts";

Deno.test("RuckSack, vJrwpWtwJgWrhcsFMMfFFhFp -> p", () => {
  const input = "vJrwpWtwJgWrhcsFMMfFFhFp";
  const result = new RuckSack(input);

  assertEquals(result.itemsA.length, 12);
  assertEquals(result.itemsB.length, 12);
  assertEquals(result.duplicateItem, "p");
});

Deno.test("RuckSack, jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL -> L", () => {
  const input = "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL";
  const result = new RuckSack(input);

  assertEquals(result.itemsA.length, 16);
  assertEquals(result.itemsB.length, 16);
  assertEquals(result.duplicateItem, "L");
});

Deno.test("RuckSack, PmmdzqPrVvPwwTWBwg -> P", () => {
  const input = "PmmdzqPrVvPwwTWBwg";
  const result = new RuckSack(input);

  assertEquals(result.duplicateItem, "P");
});

Deno.test("RuckSack, wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn -> v", () => {
  const input = "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn";
  const result = new RuckSack(input);

  assertEquals(result.duplicateItem, "v");
});

Deno.test("RuckSack, ttgJtRGJQctTZtZT -> t", () => {
  const input = "ttgJtRGJQctTZtZT";
  const result = new RuckSack(input);

  assertEquals(result.duplicateItem, "t");
});

Deno.test("RuckSack, CrZsJsPPZsGzwwsLwLmpwMDw -> s", () => {
  const input = "CrZsJsPPZsGzwwsLwLmpwMDw";
  const result = new RuckSack(input);

  assertEquals(result.duplicateItem, "s");
});

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
