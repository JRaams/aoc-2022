import { calcDistances, DistMap, loadValves, Valve } from "./valve.ts";

function totalFlowRate(valves: Valve[]): number {
  return valves.reduce((sum: number, current: Valve) => sum + current.rate, 0);
}

function dfs(
  current: Valve,
  time: number,
  total: number,
  open: Valve[],
  usefulValves: Valve[],
  dists: DistMap,
): number {
  let max: number = total + totalFlowRate(open) * (30 - time);

  usefulValves.forEach((next) => {
    if (open.find((o) => o.name === next.name)) return;

    const dt: number = dists[current.name][next.name] + 1;
    if (time + dt >= 30) return;

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
