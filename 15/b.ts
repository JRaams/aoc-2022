import { loadMap, Pos, Sensor } from "./beacon.ts";

function isDetected(sensors: Sensor[], pos: Pos): boolean {
  return sensors.some((s) => {
    return (Math.abs(s.x - pos.x) + Math.abs(s.y - pos.y)) <= s.radius;
  });
}

function solve(LIMIT: number): number {
  const sensors: Sensor[] = loadMap().map((l) => l.sensor);

  for (let i = 0; i < sensors.length; i++) {
    const sensor = sensors[i];
    const minY = Math.max(sensor.y - sensor.radius - 1, 0);
    const maxY = Math.min(sensor.y + sensor.radius + 1, LIMIT);

    // Walk around every sensors edges (radius + 1) to see if the positions are detected by other sensors
    let dx = 0;
    for (let dy = minY; dy <= maxY; dy++) {
      const edges: Pos[] = [
        { x: sensor.x + dx, y: dy },
        { x: sensor.x - dx, y: dy },
      ];

      const isolatedPos = edges.filter(({ x }) => x >= 0 && x <= LIMIT)
        .find((pos) => !isDetected(sensors, pos));

      if (isolatedPos) {
        return isolatedPos.x * 4_000_000 + isolatedPos.y;
      }

      dx++;
    }
  }

  return -1;
}

console.info(solve(4_000_000));
