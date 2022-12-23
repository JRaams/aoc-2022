export interface Tile {
  x: number;
  y: number;
  isOpen: boolean;
  top?: Tile;
  right?: Tile;
  bottom?: Tile;
  left?: Tile;
}

export interface Move {
  amount: number;
  direction?: string;
}

export type TileMap = Record<number, Record<number, Tile>>;

export function loadBoard(): [Tile[], TileMap, Move[]] {
  const lines: string = Deno.readTextFileSync("./input.txt");
  const [board, path] = lines.split("\n\n").filter((l) => l);

  const tiles: Tile[] = [];
  const tileMap: TileMap = {};

  // Load initial tiles
  const boardLines = board.split("\n").filter((l) => l);
  for (let y = 0; y < boardLines.length; y++) {
    const boardLine = boardLines[y];
    for (let x = 0; x < boardLine.length; x++) {
      const c = boardLine[x];
      if (c === " ") continue;
      const tile = { x, y, isOpen: c === "." };
      tiles.push(tile);

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
  return [tiles, tileMap, moves];
}
