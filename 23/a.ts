import { loadState, State } from "./elf.ts";

function solve(): number {
  const state: State = loadState();

  for (let round = 0; round < 10; round++) {
    if (!state.doRound()) break;
  }

  let minX = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;
  state.elves.forEach((e) => {
    if (e.x < minX) {
      minX = e.x;
    }
    if (e.x > maxX) {
      maxX = e.x;
    }
    if (e.y < minY) {
      minY = e.y;
    }
    if (e.y > maxY) {
      maxY = e.y;
    }
  });

  const sizeX = maxX - minX + 1;
  const sizeY = maxY - minY + 1;
  const totalTiles = sizeX * sizeY;
  return totalTiles - state.elves.length;
}

console.info(solve());
