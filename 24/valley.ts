import { lcm } from "../helpers/math.ts";
import { Queue } from "../helpers/queue.ts";

interface Pos {
  x: number;
  y: number;
}
export interface Tile extends Pos {
  isWall: boolean;
}
export interface Blizzard extends Pos {
  dir: string;
}
export interface Node extends Tile {
  time: number;
}

// { y: { x: Tile }}
export type Map = Record<number, Record<number, Tile>>;
// { [minute]: Blizzard[] }
export type Forecast = Record<number, Blizzard[]>;

const dirs: Record<string, Pos> = {
  ">": { x: 1, y: 0 },
  "<": { x: -1, y: 0 },
  "^": { x: 0, y: -1 },
  "v": { x: 0, y: 1 },
};

export class Valley {
  map: Map;
  entrance: Tile;
  exit: Tile;
  width: number;
  height: number;

  forecast!: Forecast;
  period!: number;

  constructor(map: Map, entrance: Tile, exit: Tile) {
    this.map = map;
    this.entrance = entrance;
    this.exit = exit;
    this.width = Object.values(map[0]).length;
    this.height = Object.keys(map).length;
  }

  getTileAt(y: number, x: number): Tile | undefined {
    if (!this.map[y]) return;
    return this.map[y][x];
  }

  getPossibleMoves(node: Node): Node[] {
    const moves: Node[] = [];
    const time = node.time + 1;

    const up = this.getTileAt(node.y - 1, node.x);
    if (up && !up.isWall) {
      moves.push({ ...up, time });
    }
    const down = this.getTileAt(node.y + 1, node.x);
    if (down && !down.isWall) {
      moves.push({ ...down, time });
    }
    const left = this.getTileAt(node.y, node.x - 1);
    if (left && !left.isWall) {
      moves.push({ ...left, time });
    }
    const right = this.getTileAt(node.y, node.x + 1);
    if (right && !right.isWall) {
      moves.push({ ...right, time });
    }
    moves.push({ ...this.map[node.y][node.x], time });

    return moves;
  }

  traverse(start: Tile, end: Tile, time: number): number {
    const startNode: Node = { ...start, time };

    const queue = new Queue<Node>();
    queue.enqueue(startNode);

    const visited = new Set<string>();
    visited.add(`${startNode.x},${startNode.y},${startNode.time}`);

    const prev: Record<string, string | null> = {};
    prev[`${startNode.x},${startNode.y},${startNode.time}`] = null;

    for (let node: Node | undefined; node = queue.dequeue();) {
      if (node.x === end.x && node.y === end.y) {
        let hash: string | null = `${node!.x},${node!.y},${node!.time}`;

        while (hash) {
          console.info(hash);
          hash = prev[hash];
        }

        console.info("reached the end");
        return node.time;
      }

      const possibleMoves = this.getPossibleMoves(node);
      possibleMoves.forEach((move) => {
        if (visited.has(`${move.x},${move.y},${move.time}`)) return;

        const currentWeather: Blizzard[] =
          this.forecast[move.time % this.period];
        if (currentWeather.find((b) => b.x === move.x && b.y === move.y)) {
          return;
        }

        queue.enqueue(move);
        visited.add(`${move.x},${move.y},${move.time}`);
        prev[`${move.x},${move.y},${move.time}`] = `${node!.x},${node!.y},${
          node!.time
        }`;
      });
    }

    throw new Error("No path found...");
  }
}

export function loadValley(input: string[]): [Valley, Blizzard[]] {
  const map: Map = {};
  const blizzards: Blizzard[] = [];

  for (let y = 0; y < input.length; y++) {
    const line = input[y];
    map[y] = {};
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char === "#") {
        map[y][x] = { x, y, isWall: true };
        continue;
      }
      map[y][x] = { x, y, isWall: false };

      if ([">", "^", "v", "<"].includes(char)) {
        blizzards.push({ x, y, dir: char });
      }
    }
  }
  const entrance: Tile = map[0][1];
  const exit: Tile = map[input.length - 1][input[0].length - 2];
  const valley = new Valley(map, entrance, exit);
  return [valley, blizzards];
}

/**
 * Create a forecast of all possible blizzard states, key = minute % period
 */
export function createForecast(b: Blizzard[], v: Valley): [Forecast, number] {
  const forecast: Forecast = {
    0: JSON.parse(JSON.stringify(b)),
  };
  const period = lcm(v.width - 2, v.height - 2);

  for (let i = 1; i < period; i++) {
    tickBlizzards(b, v);
    forecast[i] = JSON.parse(JSON.stringify(b));
  }

  v.forecast = forecast;
  v.period = period;

  return [forecast, period];
}

function tickBlizzards(b: Blizzard[], v: Valley): void {
  // In one minute, each blizzard moves one position in the direction it is pointing:
  b.forEach((b) => {
    const { x, y } = b;
    const { x: dx, y: dy } = dirs[b.dir];
    const newX = x + dx;
    const newY = y + dy;

    if (!v.map[newY][newX].isWall) {
      b.x = newX;
      b.y = newY;
      return;
    }

    // as a blizzard reaches the wall of the valley, a new blizzard forms on the opposite side of the valley moving in the same direction.
    if (b.dir === ">") b.x = 1;
    else if (b.dir === "<") b.x = v.width - 2;
    else if (b.dir === "^") b.y = v.height - 2;
    else if (b.dir === "v") b.y = 1;
  });
}
