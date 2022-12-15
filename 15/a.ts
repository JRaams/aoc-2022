import { loadMap } from "./beacon.ts";

export function solve(): number {
  const map = loadMap();
  const coveredPos = new Set<string>();
  //   const Y = 10;
  const Y = 2000000;

  map.forEach(({ sensor, beacon }) => {
    const dist = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
    const radius = dist - Math.abs(Y - sensor.y);

    for (let dx = -radius; dx <= radius; dx++) {
      //   const pos = { x: sensor.x + dx, y: Y };
      //   coveredPos.add(JSON.stringify(pos));
      coveredPos.add(`${sensor.x + dx},${Y}`);
    }
  });

  map.forEach(({ beacon }) => {
    coveredPos.delete(`${beacon.x},${beacon.y}`);
  });

  return coveredPos.size;
}

console.info(solve());
