export interface Valve {
  name: string;
  rate: number;
  neighBours: Valve[];
  nbStr: string;
}

const REGEX = /Valve (\w+).*=(\d+).*valves? (.*)/g;

export function loadValves(): Valve[] {
  const input: string = Deno.readTextFileSync("./input.txt");
  const lines: string[] = input.split("\n").filter((l) => l);
  const valves: Valve[] = lines.map((line) => {
    const _ = [...line.matchAll(REGEX)][0];

    return {
      name: _[1],
      rate: Number(_[2]),
      nbStr: _[3],
      neighBours: [],
    };
  });

  valves.forEach((valve) => {
    valve.nbStr.split(", ").forEach((nb) => {
      valve.neighBours.push(valves.find((v) => v.name === nb)!);
    });
  });

  return valves;
}

// https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm
export type DistMap = Record<string, Record<string, number>>;
export function calcDistances(valves: Valve[]): DistMap {
  const dists: DistMap = {};
  valves.forEach((valve) => {
    dists[valve.name] = {};
    valves.forEach((v2) => {
      dists[valve.name][v2.name] = Number.MAX_SAFE_INTEGER;
    });

    dists[valve.name][valve.name] = 0;
    valve.neighBours.forEach((nb) => {
      dists[valve.name][nb.name] = 1;
    });
  });

  valves.forEach((k) => {
    valves.forEach((i) => {
      valves.forEach((j) => {
        const ij = dists[i.name][j.name];
        const ik = dists[i.name][k.name];
        const kj = dists[k.name][j.name];
        if (ij > ik + kj) {
          dists[i.name][j.name] = ik + kj;
        }
      });
    });
  });

  return dists;
}
