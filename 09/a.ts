import { Motion, moveTail } from "./motion.ts";

const lines: string = await Deno.readTextFile("./input.txt");
const input: Motion[] = lines.split("\n").filter((l) => l).map((l) => {
  const [dir, stepsStr] = l.split(" ");
  return { dir, steps: Number(stepsStr) };
});

function solve(motions: Motion[]): number {
  const head = { x: 0, y: 0 };
  const tail = { x: 0, y: 0 };
  const visited = new Set<string>();

  motions.forEach((m) => {
    for (let i = 0; i < m.steps; i++) {
      if (m.dir === "U") head.y--;
      else if (m.dir === "R") head.x++;
      else if (m.dir === "D") head.y++;
      else if (m.dir === "L") head.x--;

      moveTail(tail, head);
      visited.add(JSON.stringify(tail));
    }
  });

  return visited.size;
}

console.info(solve(input));
