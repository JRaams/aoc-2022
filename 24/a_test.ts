import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { createForecast, loadValley } from "./valley.ts";

const input1 = `
#.#####
#.....#
#>....#
#.....#
#...v.#
#.....#
#####.#
`.split("\n").filter((l) => l);

Deno.test("loadValley 1", () => {
  const [valley, blizzards] = loadValley(input1);
  const { map, entrance, exit } = valley;

  assertEquals(valley.width, 7);
  assertEquals(valley.height, 7);

  assertEquals(Object.keys(map).length, 7);
  assertEquals(Object.keys(map[0]).length, 7);

  assertEquals(entrance.x, 1);
  assertEquals(entrance.y, 0);
  assertEquals(entrance.isWall, false);

  assertEquals(exit.x, 5);
  assertEquals(exit.y, 6);
  assertEquals(exit.isWall, false);

  assertEquals(blizzards.length, 2);
});

const input2 = `
#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#
`.split("\n").filter((l) => l);

Deno.test("loadValley 2", () => {
  const [valley, blizzards] = loadValley(input2);
  const { map, entrance, exit } = valley;

  assertEquals(valley.width, 8);
  assertEquals(valley.height, 6);

  assertEquals(Object.keys(map).length, 6);
  assertEquals(Object.keys(map[0]).length, 8);

  assertEquals(entrance.x, 1);
  assertEquals(entrance.y, 0);
  assertEquals(entrance.isWall, false);

  assertEquals(exit.x, 6);
  assertEquals(exit.y, 5);
  assertEquals(exit.isWall, false);

  assertEquals(blizzards.length, 19);
});

Deno.test("createForecast", () => {
  const [valley, blizzards] = loadValley(input1);
  const [forecast, period] = createForecast(blizzards, valley);

  assertEquals(period, 5);

  const p0 = forecast[0];
  assertEquals(p0[0].x, 1);
  assertEquals(p0[0].y, 2);
  assertEquals(p0[1].x, 4);
  assertEquals(p0[1].y, 4);

  const p1 = forecast[1];
  assertEquals(p1[0].x, 2);
  assertEquals(p1[0].y, 2);
  assertEquals(p1[1].x, 4);
  assertEquals(p1[1].y, 5);

  const p2 = forecast[2];
  assertEquals(p2[0].x, 3);
  assertEquals(p2[0].y, 2);
  assertEquals(p2[1].x, 4);
  assertEquals(p2[1].y, 1);

  const p3 = forecast[3];
  assertEquals(p3[0].x, 4);
  assertEquals(p3[0].y, 2);
  assertEquals(p3[1].x, 4);
  assertEquals(p3[1].y, 2);

  const p4 = forecast[4];
  assertEquals(p4[0].x, 5);
  assertEquals(p4[0].y, 2);
  assertEquals(p4[1].x, 4);
  assertEquals(p4[1].y, 3);

  // Period is 5, 6th should be equal to state 0
  const p5 = forecast[5 % 5];
  assertEquals(p5[0].x, 1);
  assertEquals(p5[0].y, 2);
  assertEquals(p5[1].x, 4);
  assertEquals(p5[1].y, 4);
});

Deno.test("traverse", () => {
  const [valley, blizzards] = loadValley(input2);
  createForecast(blizzards, valley);

  const minutes = valley.traverse(valley.entrance, valley.exit, 0);
  assertEquals(minutes, 18);
});
