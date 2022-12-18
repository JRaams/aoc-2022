import {
  calcDistances,
  DistMap,
  loadValves,
  totalFlowRate,
  Valve,
} from "./valve.ts";

function dfs(
  current: Valve,
  time: number,
  total: number,
  isElephant: boolean,
  open: Valve[],
  usefulValves: Valve[],
  dists: DistMap,
  valveAA: Valve,
): number {
  // Calculate total cumulative flow for every open valve in the remaining time
  // 30 - 4 minutes to train the elephant = 26
  let max: number = total + totalFlowRate(open) * (26 - time);

  // Let elephant open valves that we havent opened yet
  if (!isElephant) {
    const unOpened: Valve[] = [...usefulValves];
    open.forEach((o) => {
      const idx = unOpened.findIndex((uo) => uo.name === o.name);
      unOpened.splice(idx, 1);
    });

    const elephantMax = dfs(
      valveAA,
      0,
      0,
      true,
      [],
      unOpened,
      dists,
      valveAA,
    );
    max = total + totalFlowRate(open) * (26 - time) + elephantMax;
  }

  usefulValves.forEach((next) => {
    // If next is already open, don't bother
    if (open.find((o) => o.name === next.name)) return;

    // If next is unreachable in the remaining time, don't bother
    const dt: number = dists[current.name][next.name] + 1;
    if (time + dt >= 26) return;

    // Move to next valve and open it
    const newTotal: number = total + dt * totalFlowRate(open);
    open.push(next);
    const value: number = dfs(
      next,
      time + dt,
      newTotal,
      isElephant,
      open,
      usefulValves,
      dists,
      valveAA,
    );

    // Close valve again, if the found route is better than 'max', save it
    if (max < value) max = value;
    const nextIndex = open.findIndex((o) => o.name === next.name);
    open.splice(nextIndex, 1);
  });

  return max;
}

function solve(): number {
  const valves: Valve[] = loadValves();
  const usefulValves: Valve[] = valves.filter((v) => v.rate !== 0);
  const dists: DistMap = calcDistances(valves);
  const valveAA = valves.find((v) => v.name === "AA")!;

  return dfs(valveAA, 0, 0, false, [], usefulValves, dists, valveAA);
}

console.info(solve());
