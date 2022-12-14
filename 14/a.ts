import { loadMap, Pos } from "./trace.ts";

const line: string = await Deno.readTextFile("./input.txt");
const input: Pos[][] = line.split("\n").filter((l) => l)
  .map((l) =>
    l.split(" -> ")
      .map((l) => l.split(",").map(Number))
      .map((l) => ({ x: l[0], y: l[1], type: "rock" }))
  );

export function solve(i: Pos[][]): number {
  const [map, lowestPoint] = loadMap(i);

  let sandCount = 0;
  while (true) {
    const sand: Pos = { x: 500, y: 0, type: "sand" };

    let falling = true;
    while (falling) {
      // ... all further sand flows out the bottom, falling into the endless void.
      if (sand.y > lowestPoint) {
        return sandCount;
      }

      // A unit of sand always falls down one step if possible.
      if (!map[`${sand.x},${sand.y + 1}`]) {
        sand.y++;
        continue;
      }

      // If the tile immediately below is blocked (by rock or sand), the unit of sand attempts to instead move diagonally one step down and to the left.
      if (!map[`${sand.x - 1},${sand.y + 1}`]) {
        sand.x--;
        sand.y++;
        continue;
      }

      // If that tile is blocked, the unit of sand attempts to instead move diagonally one step down and to the right.
      if (!map[`${sand.x + 1},${sand.y + 1}`]) {
        sand.x++;
        sand.y++;
        continue;
      }

      // If all three possible destinations are blocked, the unit of sand comes to rest and no longer moves ...
      falling = false;
    }

    // ... at which point the next unit of sand is created back at the source.
    map[`${sand.x},${sand.y}`] = sand;
    sandCount++;
  }
}

console.info(solve(input));
