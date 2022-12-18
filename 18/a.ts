interface Droplet {
  x: number;
  y: number;
  z: number;
  neighbours: Droplet[];
}

export function loadDroplets(): Droplet[] {
  const line: string = Deno.readTextFileSync("./input.txt");
  const droplets: Droplet[] = line.split("\n").filter((l) => l).map((l) => {
    const [x, y, z] = l.split(",").map(Number);
    return { x, y, z, neighbours: [] };
  });

  droplets.forEach((d) => {
    droplets.forEach((nb) => {
      const dist = Math.abs(d.x - nb.x) + Math.abs(d.y - nb.y) +
        Math.abs(d.z - nb.z);
      if (dist === 1) {
        d.neighbours.push(nb);
      }
    });
  });

  return droplets;
}

export function solve(): number {
  const dropLets: Droplet[] = loadDroplets();
  let surfaceArea = 0;

  dropLets.forEach((d) => {
    surfaceArea += 6 - d.neighbours.length;
  });

  return surfaceArea;
}

console.info(solve());
