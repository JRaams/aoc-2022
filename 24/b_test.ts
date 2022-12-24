import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { createForecast, loadValley } from "./valley.ts";

const input2 = `
#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#
`.split("\n").filter((l) => l);

Deno.test("traverse", () => {
  const [valley, blizzards] = loadValley(input2);
  createForecast(blizzards, valley);

  const minutes1 = valley.traverse(valley.entrance, valley.exit, 0);
  assertEquals(minutes1, 18);

  const minutes2 = valley.traverse(valley.exit, valley.entrance, minutes1);
  assertEquals(minutes2, 41);

  const minutes3 = valley.traverse(valley.entrance, valley.exit, minutes2);
  assertEquals(minutes3, 54);
});
