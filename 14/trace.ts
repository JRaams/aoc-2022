export interface Pos {
  x: number;
  y: number;
  type: "rock" | "sand";
}

export function loadMap(traces: Pos[][]): [Record<string, Pos>, number] {
  const coords: Record<string, Pos> = {};
  let lowestPoint = 0;

  traces.forEach((trace: Pos[]) => {
    let start = trace[0];

    for (let i = 1; i < trace.length; i++) {
      const end = trace[i];

      for (
        let x = Math.min(start.x, end.x);
        x <= Math.max(start.x, end.x);
        x++
      ) {
        for (
          let y = Math.min(start.y, end.y);
          y <= Math.max(start.y, end.y);
          y++
        ) {
          const key = `${x},${y}`;
          if (!coords[key]) {
            const pos: Pos = { x, y, type: "rock" };
            coords[key] = pos;
          }

          if (y > lowestPoint) {
            lowestPoint = y;
          }
        }
      }

      start = end;
    }
  });

  return [coords, lowestPoint];
}
