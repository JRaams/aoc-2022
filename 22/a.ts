import { loadBoard, Tile } from "./board.ts";

function solve(): number {
  const [tiles, tileMap, moves] = loadBoard();

  const firstTile = Object.values(tileMap[0]).find((l) => l)!;
  let currentTile: Tile = firstTile;
  let dir = 0;

  for (let i = 0; i < moves.length; i++) {
    const { amount, direction } = moves[i];

    switch (dir) {
      // Right
      case 0: {
        for (let j = 0; j < amount; j++) {
          if (currentTile.right!.isOpen) {
            currentTile = currentTile.right!;
          }
        }
        break;
      }
      // Down
      case 1: {
        for (let j = 0; j < amount; j++) {
          if (currentTile.bottom!.isOpen) {
            currentTile = currentTile.bottom!;
          }
        }
        break;
      }
      // Left
      case 2: {
        for (let j = 0; j < amount; j++) {
          if (currentTile.left!.isOpen) {
            currentTile = currentTile.left!;
          }
        }
        break;
      }
      // Up
      case 3: {
        for (let j = 0; j < amount; j++) {
          if (currentTile.top!.isOpen) {
            currentTile = currentTile.top!;
          }
        }
        break;
      }

      default:
        break;
    }

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
  }

  const row = currentTile.y + 1;
  const col = currentTile.x + 1;
  const password = 1000 * row + 4 * col + dir;
  return password;
}

console.info(solve());
