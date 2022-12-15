export interface Pos {
  x: number;
  y: number;
}

export interface Sensor extends Pos {
  index: number;
  radius: number;
}

export interface SensorBeacon {
  sensor: Sensor;
  beacon: Pos;
}

export function loadMap(): SensorBeacon[] {
  const lines: string = Deno.readTextFileSync("./input.txt");
  const input: string[] = lines.split("\n").filter((l) => l);
  const result: SensorBeacon[] = [];

  input.forEach((line, index) => {
    const parts = line.replace("Sensor at ", "").replace(
      ": closest beacon is",
      "",
    ).split(" at ");

    const [sensorParts, beaconParts] = parts.map((p) =>
      p.split(", ").map((l) => Number(l.split("=")[1]))
    );
    const radius = Math.abs(sensorParts[0] - beaconParts[0]) +
      Math.abs(sensorParts[1] - beaconParts[1]);

    result.push({
      sensor: { x: sensorParts[0], y: sensorParts[1], radius, index },
      beacon: { x: beaconParts[0], y: beaconParts[1] },
    });
  });

  return result;
}
