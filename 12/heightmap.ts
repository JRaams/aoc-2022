import { AStarNode } from "../helpers/astar.ts";

export class Pos extends AStarNode {
  char: string;
  height: number;

  constructor(x: number, y: number, char: string) {
    super(x, y);
    this.char = char;
    this.height = char.charCodeAt(0) - 97;
  }
}

export interface HeightMap {
  heights: Pos[][];
  currentPos: Pos;
  targetPos: Pos;
}

export function LoadHeightMap(i: string[]): HeightMap {
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
