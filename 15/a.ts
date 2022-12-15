import { loadMap } from "./beacon.ts";

export function solve(Y: number): number {
  const map = loadMap();
  const coveredPos = new Set<string>();

  map.forEach(({ sensor }) => {
    const dist = sensor.radius - Math.abs(Y - sensor.y);

    for (let dx = -dist; dx <= dist; dx++) {
      coveredPos.add(`${sensor.x + dx},${Y}`);
    }
  });

  map.forEach(({ beacon }) => {
    coveredPos.delete(`${beacon.x},${beacon.y}`);
  });

  return coveredPos.size;
}

console.info(solve(2000000));
