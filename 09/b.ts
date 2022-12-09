const lines: string = await Deno.readTextFile("./input.txt");
const input: Motion[] = lines.split("\n").filter((l) => l).map((l) => {
  const [dir, stepsStr] = l.split(" ");
  return { dir, steps: Number(stepsStr) };
});

interface Motion {
  dir: string;
  steps: number;
}

interface Pos {
  x: number;
  y: number;
}

function dist(a: Pos, b: Pos): number {
  return Math.floor(Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)));
}

function moveTail(tail: Pos, head: Pos): void {
  const d = dist(tail, head);
  if (d < 2) return;

  let dx = head.x - tail.x;
  dx = dx !== 0 ? dx > 0 ? 1 : -1 : 0;
  let dy = head.y - tail.y;
  dy = dy !== 0 ? dy > 0 ? 1 : -1 : 0;

  tail.x += dx;
  tail.y += dy;
}

function solve(i: Motion[]): number {
  const head = { x: 0, y: 0 };
  const tails: Pos[] = [];
  for (let j = 0; j < 9; j++) {
    tails.push({ x: 0, y: 0 });
  }
  const visited = new Set<string>();

  i.forEach((m) => {
    for (let i = 0; i < m.steps; i++) {
      switch (m.dir) {
        case "U":
          head.y--;
          break;
        case "R":
          head.x++;
          break;
        case "D":
          head.y++;
          break;
        case "L":
          head.x--;
          break;
        default:
          break;
      }

      moveTail(tails[0], head);
      for (let j = 1; j < tails.length; j++) {
        moveTail(tails[j], tails[j - 1]);
      }

      visited.add(JSON.stringify(tails[tails.length - 1]));
    }
  });

  return visited.size;
}

console.info(solve(input));
