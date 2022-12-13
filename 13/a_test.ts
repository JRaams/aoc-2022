import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { compare, FALSE, TRUE, Val } from "./a.ts";

Deno.test("compare [1,1,3,1,1] vs [1,1,5,1,1] -> true", () => {
  const a = [1, 1, 3, 1, 1];
  const b = [1, 1, 5, 1, 1];

  const result = compare(a, b);
  assertEquals(result, TRUE);
});

Deno.test("compare [[1],[2,3,4]] vs [[1],4] -> true", () => {
  const a = [[1], [2, 3, 4]];
  const b = [[1], 4];

  const result = compare(a, b);
  assertEquals(result, TRUE);
});

Deno.test("compare [9] vs [[8,7,6]] -> false", () => {
  const a = [9];
  const b = [[8, 7, 6]];

  const result = compare(a, b);
  assertEquals(result, FALSE);
});

Deno.test("compare [[4,4],4,4] vs [[4,4],4,4,4] -> true", () => {
  const a = [[4, 4], 4, 4];
  const b = [[4, 4], 4, 4, 4];

  const result = compare(a, b);
  assertEquals(result, TRUE);
});

Deno.test("compare [7,7,7,7] vs [7,7,7] -> false", () => {
  const a = [7, 7, 7, 7];
  const b = [7, 7, 7];

  const result = compare(a, b);
  assertEquals(result, FALSE);
});

Deno.test("compare [] vs [3] -> true", () => {
  const a: Val = [];
  const b = [3];

  const result = compare(a, b);
  assertEquals(result, TRUE);
});

Deno.test("compare [[[]]] vs [[]] -> false", () => {
  const a: Val = [[[]]];
  const b: Val = [[]];

  const result = compare(a, b);
  assertEquals(result, FALSE);
});

Deno.test("compare [1,[2,[3,[4,[5,6,7]]]],8,9] vs [1,[2,[3,[4,[5,6,0]]]],8,9] -> false", () => {
  const a = [1, [2, [3, [4, [5, 6, 7]]]], 8, 9];
  const b = [1, [2, [3, [4, [5, 6, 0]]]], 8, 9];

  const result = compare(a, b);
  assertEquals(result, FALSE);
});
