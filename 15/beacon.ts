export interface Pos {
  x: number;
  y: number;
}

export interface SensorBeacon {
  sensor: Pos;
  beacon: Pos;
}

export function loadMap(): SensorBeacon[] {
  const lines: string = Deno.readTextFileSync("./input.txt");
  const input: string[] = lines.split("\n").filter((l) => l);
  const result: SensorBeacon[] = [];

  input.forEach((line) => {
    const parts = line.replace("Sensor at ", "").replace(
      ": closest beacon is",
      "",
    ).split(" at ");

    const [sensorParts, beaconParts] = parts.map((p) =>
      p.split(", ").map((l) => Number(l.split("=")[1]))
    );

    result.push({
      sensor: { x: sensorParts[0], y: sensorParts[1] },
      beacon: { x: beaconParts[0], y: beaconParts[1] },
    });
  });

  return result;
}
