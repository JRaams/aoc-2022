import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { loadCrates } from "./a.ts";

Deno.test("loadCrates", () => {
  const input = `   [D]    
[N] [C]    
[Z] [M] [P]
1   2   3 `;

  const result = loadCrates(input);

  assertEquals(result.length, 3);
  assertEquals(result[0].length, 2);
  assertEquals(result[1].length, 3);
  assertEquals(result[2].length, 1);
});
