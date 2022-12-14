export interface Pos {
  x: number;
  y: number;
}

export interface Map {
  coords: Record<string, Pos>;
  lowestPoint: number;
}

function traceLine(map: Map, start: Pos, end: Pos): void {
  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      const key = `${x},${y}`;
      if (!map.coords[key]) {
        const pos: Pos = { x, y };
        map.coords[key] = pos;
      }

      if (y > map.lowestPoint) {
        map.lowestPoint = y;
      }
    }
  }
}

export function loadMap(): Map {
  const line: string = Deno.readTextFileSync("./input.txt");
  const traces: Pos[][] = line.split("\n").filter((l) => l)
    .map((l) =>
      l.split(" -> ")
        .map((l) => l.split(",").map(Number))
        .map((l) => ({ x: l[0], y: l[1] }))
    );

  const map: Map = {
    coords: {},
    lowestPoint: 0,
  };

  traces.forEach((trace: Pos[]) => {
    let start = trace[0];

    for (let i = 1; i < trace.length; i++) {
      const end = trace[i];
      traceLine(map, start, end);
      start = end;
    }
  });

  return map;
}
