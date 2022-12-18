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
  open: Valve[],
  usefulValves: Valve[],
  dists: DistMap,
): number {
  // Calculate total cumulative flow for every open valve in the remaining time
  let max: number = total + totalFlowRate(open) * (30 - time);

  usefulValves.forEach((next) => {
    // If next is already open, don't bother
    if (open.find((o) => o.name === next.name)) return;

    // If next is unreachable in the remaining time, don't bother
    const dt: number = dists[current.name][next.name] + 1;
    if (time + dt >= 30) return;

    // Move to next valve and open it
    const newTotal: number = total + dt * totalFlowRate(open);
    open.push(next);
    const value: number = dfs(
      next,
      time + dt,
      newTotal,
      open,
      usefulValves,
      dists,
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

  return dfs(valveAA, 0, 0, [], usefulValves, dists);
}

console.info(solve());
