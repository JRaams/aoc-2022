const lines: string = await Deno.readTextFile("./input.txt");
const input: string[] = lines.split("\n").filter((l) => l);

class Pos {
  x: number;
  y: number;
  char: string;
  height: number;
  neighBours: Pos[];

  // A*
  parent: Pos | undefined;
  f = 0; // total cost
  g = 0; // cost from start to current pos
  h = 0; // estimated cost from current post to target pos

  constructor(x: number, y: number, char: string) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.height = char.charCodeAt(0) - 97;
    this.neighBours = [];
  }
}

interface HeightMap {
  heights: Pos[][];
  currentPos: Pos;
  targetPos: Pos;
}

export function load(i: string[]): HeightMap {
  const heights: Pos[][] = [];
  let currentPos!: Pos;
  let targetPos!: Pos;

  // Create Pos objects
  for (let y = 0; y < i.length; y++) {
    heights[y] = [];

    for (let x = 0; x < i[y].length; x++) {
      const char = i[y][x];
      const pos = new Pos(x, y, char);

      if (char === "S") {
        pos.height = 0;
        currentPos = pos;
      } else if (char === "E") {
        pos.height = 25;
        targetPos = pos;
      }

      heights[y].push(pos);
    }
  }

  // Link neighbours
  for (let y = 0; y < i.length; y++) {
    for (let x = 0; x < i[y].length; x++) {
      const pos = heights[y][x];

      if (y > 0) {
        const nb = heights[y - 1][x];
        if (Math.abs(nb.height - pos.height) <= 1 || nb.height < pos.height) {
          pos.neighBours.push(nb);
        }
      }
      if (y < i.length - 1) {
        const nb = heights[y + 1][x];
        if (Math.abs(nb.height - pos.height) <= 1 || nb.height < pos.height) {
          pos.neighBours.push(nb);
        }
      }
      if (x > 0) {
        const nb = heights[y][x - 1];
        if (Math.abs(nb.height - pos.height) <= 1 || nb.height < pos.height) {
          pos.neighBours.push(nb);
        }
      }
      if (x < i[y].length - 1) {
        const nb = heights[y][x + 1];
        if (Math.abs(nb.height - pos.height) <= 1 || nb.height < pos.height) {
          pos.neighBours.push(nb);
        }
      }
    }
  }

  return { heights, currentPos, targetPos };
}

function heuristic(position0: Pos, position1: Pos) {
  let d1 = Math.abs(position1.x - position0.x);
  let d2 = Math.abs(position1.y - position0.y);

  return d1 + d2;
}

export function solve(i: string[]): number {
  const { heights, currentPos, targetPos } = load(i);

  let openSet: Pos[] = [currentPos];
  let closedSet: Pos[] = [];
  let path: Pos[] = [];

  while (openSet.length > 0) {
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }
    let current: Pos = openSet[lowestIndex];

    if (current.char === "E") {
      let temp = current;
      path.push(temp);
      while (temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
      }
      console.log("DONE");
      break;
    }

    openSet.splice(lowestIndex, 1);
    closedSet.push(current);

    let neighBours = current.neighBours;
    for (let i = 0; i < neighBours.length; i++) {
      let neighBour = neighBours[i];
      if (neighBour.char === "E") {
        const a = 5;
      }

      if (!closedSet.find((c) => c.x === neighBour.x && c.y === neighBour.y)) {
        let possibleG = current.g + 1;

        if (!openSet.find((c) => c.x === neighBour.x && c.y === neighBour.y)) {
          openSet.push(neighBour);
        } else if (possibleG >= neighBour.g) {
          continue;
        }

        neighBour.g = possibleG;
        neighBour.h = heuristic(neighBour, targetPos);
        neighBour.f = neighBour.g + neighBour.h;
        neighBour.parent = current;
      }
    }
  }

  return path.length - 1;
}

console.info(solve(input));
