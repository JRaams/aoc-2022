import { getCubeSides, loadDroplets } from "./droplet.ts";

function solve(): number {
  const [drops, seen] = loadDroplets();

  const exteriorDroplets = drops
    .flatMap((drop) => getCubeSides(drop))
    .filter((side) => seen.has(`${side.x},${side.y},${side.z}`));

  return exteriorDroplets.length;
}

console.info(solve());
