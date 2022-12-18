export interface Pos {
  x: number;
  y: number;
  z: number;
}

export function getCubeSides({ x, y, z }: Pos): Pos[] {
  return [
    { x: x - 1, y, z },
    { x: x + 1, y, z },
    { x, y: y - 1, z },
    { x, y: y + 1, z },
    { x, y, z: z - 1 },
    { x, y, z: z + 1 },
  ];
}

export function loadDroplets(): [Pos[], Set<string>] {
  const line: string = Deno.readTextFileSync("./input.txt");
  const drops: Pos[] = line.split("\n").filter((l) => l).map((l) => {
    const [x, y, z] = l.split(",").map(Number);
    return { x, y, z };
  });
  const maxValue: number =
    drops.flatMap((d) => [d.x, d.y, d.z]).sort((a, b) => b - a)[0];

  const seen = new Set<string>();
  const stack: Pos[] = [{ x: 0, y: 0, z: 0 }];
  while (stack.length) {
    const current: Pos = stack.pop()!;
    getCubeSides(current).forEach((side) => {
      if (
        side.x < -1 || side.x > maxValue + 1 ||
        side.y < -1 || side.y > maxValue + 1 ||
        side.z < -1 || side.z > maxValue + 1
      ) return;

      const hash = `${side.x},${side.y},${side.z}`;
      if (seen.has(hash)) return;

      const isDrop = drops.find((d) =>
        d.x === side.x && d.y === side.y && d.z === side.z
      );
      if (isDrop) return;

      seen.add(hash);
      stack.push(side);
    });
  }

  return [drops, seen];
}
