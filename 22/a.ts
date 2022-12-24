import { getPassword, loadBoard } from "./board.ts";

function solve(): number {
  const [tileMap, moves] = loadBoard();

  const password = getPassword(tileMap, moves);
  return password;
}

console.info(solve());
