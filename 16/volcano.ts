import { calcDistances, DistMap, loadValves, Valve } from "./valve.ts";

export class Volcano {
  private totalTime: number;
  private withElephant: boolean;

  private valves: Valve[];
  private usefulValves: Valve[];
  private dists: DistMap;
  private valveAA: Valve;

  constructor(totalTime: number, withElephant: boolean = false) {
    this.totalTime = totalTime;
    this.withElephant = withElephant;

    this.valves = loadValves();
    this.usefulValves = this.valves.filter((v) => v.rate !== 0);
    this.dists = calcDistances(this.valves);
    this.valveAA = this.valves.find((v) => v.name === "AA")!;
  }

  public findMaxPressure(): number {
    return this.dfs(this.valveAA, 0, 0, false, [], this.usefulValves);
  }

  private totalRate(valves: Valve[]): number {
    return valves.reduce(
      (sum: number, current: Valve) => sum + current.rate,
      0,
    );
  }

  private dfs(
    current: Valve,
    time: number,
    total: number,
    isElephant: boolean,
    open: Valve[],
    nextValves: Valve[],
  ): number {
    // Calculate total cumulative flow for every open valve in the remaining time
    let max: number = total + this.totalRate(open) * (this.totalTime - time);

    // Let elephant open valves that we havent opened yet
    if (this.withElephant && !isElephant) {
      const unOpened: Valve[] = nextValves.filter((nv) =>
        !open.find((o) => o.name === nv.name)
      );
      const elephantMax = this.dfs(this.valveAA, 0, 0, true, [], unOpened);
      max = total + elephantMax +
        this.totalRate(open) * (this.totalTime - time);
    }

    nextValves.forEach((next: Valve) => {
      // If next is already open, don't bother
      if (open.find((o) => o.name === next.name)) return;

      // If next is unreachable in the remaining time, don't bother
      const dt: number = this.dists[current.name][next.name] + 1;
      if (time + dt >= this.totalTime) return;

      // Move to next valve and open it
      const newTotal: number = total + dt * this.totalRate(open);
      open.push(next);
      const value: number = this.dfs(
        next,
        time + dt,
        newTotal,
        isElephant,
        open,
        nextValves,
      );

      // Close valve again, if the found route is better than 'max', save it
      if (max < value) max = value;
      const nextIndex = open.findIndex((o) => o.name === next.name);
      open.splice(nextIndex, 1);
    });

    return max;
  }
}
