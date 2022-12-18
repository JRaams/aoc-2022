import { getCubeSides, loadDroplets, Pos } from "./droplet.ts";

function hasPos(drops: Pos[], pos: Pos): boolean {
  return !!drops.find((d) => d.x === pos.x && d.y === pos.y && d.z === pos.z);
}

function solve(): number {
  const [drops, _] = loadDroplets();

  const surfaceDroplets = drops
    .flatMap((drop) => getCubeSides(drop))
    .filter((side) => !hasPos(drops, side));

  return surfaceDroplets.length;
}

console.info(solve());
