// Dict for every face
// Value is another dict for the next face
// 0: Right, 1: Bottom, 2: Left, 3: Up
const dirs: Record<number, Record<number, number>> = {
  1: {
    // Top, right, bottom, left
    6: 0,
    2: 0,
    3: 1,
    4: 0,
  },
  2: {
    6: 3,
    5: 2,
    3: 2,
    1: 2,
  },
  3: {
    1: 3,
    2: 3,
    5: 1,
    4: 1,
  },
  4: {
    3: 0,
    5: 0,
    6: 1,
    1: 0,
  },
  5: {
    3: 3,
    2: 2,
    6: 2,
    4: 2,
  },
  6: {
    4: 3,
    5: 3,
    2: 1,
    1: 1,
  },
};

export class Tile {
  x: number;
  y: number;
  isOpen: boolean;
  face?: number;
  top?: Tile;
  right?: Tile;
  bottom?: Tile;
  left?: Tile;

  constructor(x: number, y: number, isOpen: boolean) {
    this.x = x;
    this.y = y;
    this.isOpen = isOpen;
  }

  public move(amount: number, dir: number): [Tile, number] {
    // deno-lint-ignore no-this-alias
    let current: Tile = this;

    for (let i = 0; i < amount; i++) {
      // Right
      if (dir === 0) {
        if (!current.right!.isOpen) return [current, dir];

        if (current.face !== current.right!.face) {
          dir = dirs[current.face!][current.right!.face!];
        }
        current = current.right!;
        // Down
      } else if (dir === 1) {
        if (!current.bottom!.isOpen) return [current, dir];
        if (current.face !== current.bottom!.face) {
          dir = dirs[current.face!][current.bottom!.face!];
        }
        current = current.bottom!;
        // Left
      } else if (dir === 2) {
        if (!current.left!.isOpen) return [current, dir];
        if (current.face !== current.left!.face) {
          dir = dirs[current.face!][current.left!.face!];
        }
        current = current.left!;
        // Top
      } else if (dir === 3) {
        if (!current.top!.isOpen) return [current, dir];
        if (current.face !== current.top!.face) {
          dir = dirs[current.face!][current.top!.face!];
        }
        current = current.top!;
      } else {
        throw new Error("Unknown dir: " + dir.toString());
      }
    }

    return [current, dir];
  }
}

export interface Move {
  amount: number;
  direction?: string;
}

export type TileMap = Record<number, Record<number, Tile>>;

export function loadBoard(): [TileMap, Move[]] {
  const lines: string = Deno.readTextFileSync("./input.txt");
  const [board, path] = lines.split("\n\n").filter((l) => l);

  // Load initial tiles
  const tileMap: TileMap = {};
  const boardLines = board.split("\n").filter((l) => l);
  for (let y = 0; y < boardLines.length; y++) {
    const boardLine = boardLines[y];
    for (let x = 0; x < boardLine.length; x++) {
      const c = boardLine[x];
      if (c === " ") continue;
      const tile = new Tile(x, y, c === ".");

      if (tileMap[y] === undefined) {
        tileMap[y] = {};
      }
      tileMap[y][x] = tile;
    }
  }

  // Add neighbouring tiles
  for (let y = 0; y < boardLines.length; y++) {
    const boardLine = boardLines[y];
    for (let x = 0; x < boardLine.length; x++) {
      const c = boardLine[x];
      if (c === " ") continue;
      const tile = tileMap[y][x];

      // Top
      if (tileMap[y - 1] && tileMap[y - 1][x]) {
        tile.top = tileMap[y - 1][x];
      } else {
        for (let y2 = boardLines.length - 1; y2 > 0; y2--) {
          if (y2 !== y && tileMap[y2] && tileMap[y2][x]) {
            tile.top = tileMap[y2][x];
            break;
          }
        }
      }

      // Right
      if (tileMap[y][x + 1]) {
        tile.right = tileMap[y][x + 1];
      } else {
        for (let x2 = 0; x2 < boardLine.length; x2++) {
          if (x2 !== x && tileMap[y][x2]) {
            tile.right = tileMap[y][x2];
            break;
          }
        }
      }

      // Bottom
      if (tileMap[y + 1] && tileMap[y + 1][x]) {
        tile.bottom = tileMap[y + 1][x];
      } else {
        for (let y2 = 0; y2 < boardLines.length; y2++) {
          if (y2 !== y && tileMap[y2] && tileMap[y2][x]) {
            tile.bottom = tileMap[y2][x];
            break;
          }
        }
      }

      // Left
      if (tileMap[y][x - 1]) {
        tile.left = tileMap[y][x - 1];
      } else {
        for (let x2 = boardLine.length - 1; x2 > 0; x2--) {
          if (x2 !== x && tileMap[y][x2]) {
            tile.left = tileMap[y][x2];
            break;
          }
        }
      }
    }
  }

  // Load moves
  const moves: Move[] = [...path.matchAll(/(\d+)([A-Z])?/g)].map(
    (l) => ({ amount: Number(l[1]), direction: l[2] }),
  );
  return [tileMap, moves];
}

export function move(
  currentTile: Tile,
  dir: number,
  amount: number,
  direction: string | undefined,
): [Tile, number] {
  const [t, d] = currentTile.move(amount, dir);
  currentTile = t;
  dir = d;

  switch (direction) {
    case "L": {
      dir = (dir - 1 + 4) % 4;
      break;
    }
    case "R": {
      dir = (dir + 1 + 4) % 4;
      break;
    }
    default:
      break;
  }

  return [currentTile, dir];
}

export function getPassword(tileMap: TileMap, moves: Move[]): number {
  const firstTile = Object.values(tileMap[0]).find((l) => l)!;
  let currentTile: Tile = firstTile;
  let dir = 0;
  // 0: Right, 1: Bottom, 2: Left, 3: Up
  for (let i = 0; i < moves.length; i++) {
    const { amount, direction } = moves[i];
    if (i === 55) {
      const a = 5;
    }
    const [a, b] = move(currentTile, dir, amount, direction);
    currentTile = a;
    dir = b;
  }

  const row = currentTile.y + 1;
  const col = currentTile.x + 1;
  const password = 1000 * row + 4 * col + dir;
  console.info("row", row, "col", col, "dir", dir);
  return password;
}
