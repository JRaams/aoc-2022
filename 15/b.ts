import { loadMap, Pos, Sensor } from "./beacon.ts";

function isDetected(sensors: Sensor[], pos: Pos): boolean {
  return sensors.some((s) => {
    return (Math.abs(s.x - pos.x) + Math.abs(s.y - pos.y)) <= s.radius;
  });
}

function solve(): number {
  const sensors: Sensor[] = loadMap().map((l) => l.sensor);
  const LIMIT = 4_000_000;

  for (let i = 0; i < sensors.length; i++) {
    const sensor = sensors[i];
    let dx = 0;
    const minY = Math.max(sensor.y - sensor.radius + 1, 0);
    const maxY = Math.min(sensor.y + sensor.radius + 1, LIMIT);

    // Walk around every sensors edges (radius + 1) to see if the positions are detected by other sensors
    for (let dy = minY; dy <= maxY; dy++) {
      const edges: Pos[] = dx === 0 ? [{ x: sensor.x, y: dy }] : [
        { x: sensor.x + dx, y: dy },
        { x: sensor.x - dx, y: dy },
      ];

      const isolatedPos = edges.filter(({ x, y }) =>
        x >= 0 && x <= LIMIT && y >= 0 && y <= LIMIT
      ).find((
        pos,
      ) => !isDetected(sensors, pos));

      if (isolatedPos) {
        return isolatedPos.x * 4_000_000 + isolatedPos.y;
      }

      if (dy <= sensor.y) {
        dx++;
      } else {
        dx--;
      }
    }
  }

  return -1;
}

console.info(solve());
