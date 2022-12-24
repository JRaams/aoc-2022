import { getPassword, loadBoard, TileMap } from "./board.ts";

const FW = 50;

export function markFaces(tileMap: TileMap): void {
  for (let x = 1 * FW; x < 2 * FW; x++) {
    for (let y = 0; y < 1 * FW; y++) {
      tileMap[y][x].face = 1;
    }
  }

  for (let x = 2 * FW; x < 3 * FW; x++) {
    for (let y = 0; y < 1 * FW; y++) {
      tileMap[y][x].face = 2;
    }
  }

  for (let x = 1 * FW; x < 2 * FW; x++) {
    for (let y = 1 * FW; y < 2 * FW; y++) {
      tileMap[y][x].face = 3;
    }
  }

  for (let x = 0; x < 1 * FW; x++) {
    for (let y = 2 * FW; y < 3 * FW; y++) {
      tileMap[y][x].face = 4;
    }
  }

  for (let x = 1 * FW; x < 2 * FW; x++) {
    for (let y = 2 * FW; y < 3 * FW; y++) {
      tileMap[y][x].face = 5;
    }
  }

  for (let x = 0; x < 1 * FW; x++) {
    for (let y = 3 * FW; y < 4 * FW; y++) {
      tileMap[y][x].face = 6;
    }
  }
}

export function stitchEdges(tileMap: TileMap): void {
  // Face 1, left -> Face 4, left
  for (let y = 0; y < FW; y++) {
    const f1 = tileMap[y][FW];
    const f4 = tileMap[3 * FW - y - 1][0];

    f1.left = f4;
    f4.left = f1;
  }
  // Face 1, top -> Face 6, left
  for (let x = 0; x < FW; x++) {
    const f1 = tileMap[0][1 * FW + x];
    const f6 = tileMap[3 * FW + x][0];

    f1.top = f6;
    f6.left = f1;
  }
  // Face 2, top -> Face 6, bottom
  for (let x = 0; x < FW; x++) {
    const f2 = tileMap[0][2 * FW + x];
    const f6 = tileMap[FW * 4 - 1][x];

    f2.top = f6;
    f6.bottom = f2;
  }
  // Face 2, right -> Face 5, right
  for (let y = 0; y < FW; y++) {
    const f2 = tileMap[y][3 * FW - 1];
    const f5 = tileMap[3 * FW - y - 1][2 * FW - 1];
    f2.right = f5;
    f5.right = f2;
  }
  // Face 2, bottom -> Face 3, right
  for (let x = 0; x < FW; x++) {
    const f2 = tileMap[1 * FW - 1][2 * FW + x];
    const f3 = tileMap[1 * FW + x][2 * FW - 1];

    f2.bottom = f3;
    f3.right = f2;
  }
  // Face 3, right -> Face 2, bottom (Done)
  // Face 5, right -> Face 2, right (Done)
  // Face 5, bottom -> Face 6, right
  for (let x = 0; x < FW; x++) {
    const f5 = tileMap[3 * FW - 1][1 * FW + x];
    const f6 = tileMap[3 * FW + x][1 * FW - 1];

    f5.bottom = f6;
    f6.right = f5;
  }
  // Face 6, right -> Face 5, bottom (Done)
  // Face 6, bottom -> Face 2, top (Done)
  // Face 6, left -> Face 1, top (Done)
  // Face 4, left -> Face 1, left (Done)
  // Face 4, top -> Face 3, left
  for (let x = 0; x < FW; x++) {
    const f4 = tileMap[2 * FW][x];
    const f3 = tileMap[1 * FW + x][1 * FW];

    f4.top = f3;
    f3.left = f4;
  }
  // Face 3, left -> Face 4, top (Done)
}

function solve(): number {
  const [tileMap, moves] = loadBoard();
  markFaces(tileMap);
  stitchEdges(tileMap);

  const password = getPassword(tileMap, moves);
  return password;
}

console.info(solve());
